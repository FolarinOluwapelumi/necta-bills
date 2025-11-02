'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { CustomerService } from '@/lib/services/customerService';
import { Customer, CustomerStatus, KYCStatus } from '@/lib/types/customer';
import Table from './components/Table';
import CustomerFilters from './components/CustomerFilters';

interface Filters {
  status: string;
  kycStatus: string;
  search: string;
}



export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    status: '',
    kycStatus: '',
    search: ''
  });

  // FIXED: Wrap loadCustomers in useCallback
  const loadCustomers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await CustomerService.getCustomers(filters);
      setCustomers(response.customers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load customers');
    } finally {
      setLoading(false);
    }
  }, [filters]); // Add filters as dependency

  // FIXED: Add loadCustomers to dependency array
  useEffect(() => {
    loadCustomers();
  }, [filters, loadCustomers]);

  const handleCustomerClick = (customer: Customer) => {
    router.push(`/dashboard/customers/${customer.user_id}`);
  };

  const customerColumns = [
    {
      key: 'name',
      header: 'NAME',
      render: (customer: Customer) => (
        <div 
          className="text-sm font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors"
          onClick={() => handleCustomerClick(customer)}
        >
          {customer.first_name} {customer.last_name}
        </div>
      )
    },
    {
      key: 'email',
      header: 'EMAIL',
      render: (customer: Customer) => (
        <div className="text-sm text-gray-900">{customer.email}</div>
      )
    },
    {
      key: 'phone',
      header: 'PHONE NUMBER',
      render: (customer: Customer) => (
        <div className="text-sm text-gray-900">{customer.phone}</div>
      )
    },
    {
      key: 'date_joined',
      header: 'DATE JOINED',
      render: (customer: Customer) => (
        <div className="text-sm text-gray-900">{customer.date_joined}</div>
      )
    },
    {
      key: 'kyc_status',
      header: 'KYC STATUS',
      render: (customer: Customer) => {
        const statusConfig: Record<KYCStatus, { class: string; label: string }> = {
          verified: { class: 'bg-green-100 text-green-700', label: 'VERIFIED' },
          pending: { class: 'bg-yellow-100 text-yellow-700', label: 'PENDING' },
          failed: { class: 'bg-red-100 text-red-700', label: 'FAILED' },
          approved: { class: 'bg-green-100 text-green-700', label: 'APPROVED' },
          rejected: { class: 'bg-red-100 text-red-700', label: 'REJECTED' }
        };
        
        const config = statusConfig[customer.kyc_status];
        
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.class}`}>
            {config.label}
          </span>
        );
      }
    },
    {
      key: 'active_status',
      header: 'ACTIVE STATUS',
      render: (customer: Customer) => {
        const statusConfig: Record<CustomerStatus, { class: string; label: string }> = {
          active: { class: 'bg-green-100 text-green-700', label: 'ACTIVE' },
          inactive: { class: 'bg-gray-100 text-gray-700', label: 'INACTIVE' },
          suspended: { class: 'bg-yellow-100 text-yellow-700', label: 'SUSPENDED' },
          restricted: { class: 'bg-red-100 text-red-700', label: 'RESTRICTED' },
          pending: { class: 'bg-blue-100 text-blue-700', label: 'PENDING' }
        };
        
        const status = customer.is_restricted ? 'restricted' : customer.active_status;
        const config = statusConfig[status];
        
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.class}`}>
            {config.label}
          </span>
        );
      }
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <CustomerFilters filters={filters} onFiltersChange={setFilters} />
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}

      {/* Customers Table */}
      <div className="bg-white shadow-sm border border-gray-200">
        <Table
          data={customers}
          columns={customerColumns}
          onRowClick={handleCustomerClick}
          loading={loading}
          keyField="user_id"
          emptyMessage="No customers found"
        />

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">10</span> of <span className="font-medium">70</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Rows per page:</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1 rounded hover:bg-gray-100">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm text-gray-700">Page 1 of 7</span>
              <button className="p-1 rounded hover:bg-gray-100">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}