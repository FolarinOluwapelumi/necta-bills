'use client';

import { useState, useEffect } from 'react';
import { KYCDocument } from './types/kyc';
import KYCDocumentCard from './KYCDocumentCard';

interface KYCDocumentsTabProps {
  customerId: string;
}

export default function KYCDocumentsTab({ customerId }: KYCDocumentsTabProps) {
  const [documents, setDocuments] = useState<KYCDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadKYCDocuments();
  }, [customerId]);

  const loadKYCDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock data matching the exact structure from the image
      const mockDocuments: KYCDocument[] = [
        {
          id: 'DOC001',
          type: 'Travel Passport',
          documentNumber: 'P1234567',
          uploadedDate: '2024-01-15',
          expiryDate: '2028-05-15',
          verifiedDate: '2024-01-16',
          verifiedBy: 'admin@nectabills.com',
          status: 'verified'
        },
        {
          id: 'DOC002',
          type: 'Travel Passport',
          documentNumber: 'P1234567',
          uploadedDate: '2024-01-15',
          expiryDate: '2028-05-15',
          verifiedDate: '2024-01-16',
          verifiedBy: 'admin@nectabills.com',
          status: 'verified'
        },
        {
          id: 'DOC003',
          type: 'Travel Passport',
          documentNumber: 'P1234567',
          uploadedDate: '2024-01-15',
          expiryDate: '2028-05-15',
          verifiedDate: '2024-01-16',
          verifiedBy: 'admin@nectabills.com',
          status: 'pending'
        }
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDocuments(mockDocuments);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load KYC documents');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm animate-pulse">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Image Skeleton */}
              <div className="flex-shrink-0 lg:w-[30%]">
                <div className="border-4 border-black rounded-md">
                  <div className="w-full h-40 bg-gray-200"></div>
                </div>
              </div>
              
              {/* Details Skeleton */}
              <div className="flex-1 lg:w-[70%] space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-28"></div>
                    <div className="h-4 bg-gray-200 rounded w-36"></div>
                  </div>
                </div>
                
                {/* Buttons Skeleton */}
                <div className="flex gap-3">
                  <div className="h-8 bg-gray-200 rounded-lg w-36"></div>
                  <div className="h-8 bg-gray-200 rounded-lg w-24"></div>
                  <div className="h-8 bg-gray-200 rounded-lg w-40"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-red-800">{error}</span>
        </div>
        <button
          onClick={loadKYCDocuments}
          className="mt-3 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">KYC Documents</h1>
        <p className="text-sm text-gray-600 mt-1">
          Verification documents submitted by the user
        </p>
      </div>

      {/* Document Cards */}
      {documents.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No KYC documents</h3>
          <p className="mt-1 text-sm text-gray-500">No KYC documents have been uploaded yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {documents.map((document) => (
            <KYCDocumentCard key={document.id} document={document} />
          ))}
        </div>
      )}
    </div>
  );
}