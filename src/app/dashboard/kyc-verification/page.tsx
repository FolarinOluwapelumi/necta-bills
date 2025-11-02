'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { KYCService } from './services/kycService';
import { CustomerService } from '@/lib/services/customerService';
import { KYCRequest, KYCStats } from './types/kyc';
import KYCStatsCards from './components/KYCStatsCards';
import KYCTabs from './components/KYCTabs';
import KYCDataTable from './components/KYCDataTable';

// Create a component that uses useSearchParams
function KYCVerificationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = (searchParams.get('tab') as 'pending' | 'verified' | 'rejected') || 'pending';

  const [requests, setRequests] = useState<KYCRequest[]>([]);
  const [stats, setStats] = useState<KYCStats | null>(null);
  const [counts, setCounts] = useState({
    pending: 0,
    verified: 0,
    rejected: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadKYCData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { customers: allCustomers } = await CustomerService.getCustomers();
      
      const calculatedCounts = {
        pending: allCustomers.filter(c => c.kyc_status === 'pending').length,
        verified: allCustomers.filter(c => c.kyc_status === 'verified').length,
        rejected: allCustomers.filter(c => c.kyc_status === 'rejected').length
      };
      setCounts(calculatedCounts);
      
      const [requestsData, statsData] = await Promise.all([
        KYCService.getKYCRequests(activeTab),
        KYCService.getKYCStats()
      ]);
      
      setRequests(requestsData.requests);
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load KYC data');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    loadKYCData();
  }, [activeTab, loadKYCData]);

  const handleTabChange = (tab: 'pending' | 'verified' | 'rejected') => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.push(`?${params.toString()}`);
  };

  const handleReview = (customerId: string) => {
    router.push(`/dashboard/kyc-verification/${customerId}`);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-800">{error || 'Failed to load KYC data'}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Statistics Cards */}
      <KYCStatsCards stats={stats} />

      {/* KYC Requests Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">KYC Requests</h2>
        <p className="text-sm text-gray-600 mt-1">
          Review and approve user verification documents
        </p>
      </div>

      {/* Tabs */}
      <KYCTabs 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        counts={counts}
      />

      {/* Data Table */}
      <KYCDataTable
        requests={requests}
        activeTab={activeTab}
        onReview={handleReview}
        onApprove={KYCService.approveKYC}
      />
    </div>
  );
}

// Main component with Suspense boundary
export default function KYCVerificationPage() {
  return (
    <Suspense fallback={
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    }>
      <KYCVerificationContent />
    </Suspense>
  );
}