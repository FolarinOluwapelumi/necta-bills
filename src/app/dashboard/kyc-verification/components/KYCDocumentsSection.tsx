'use client';

import { useState, useEffect } from 'react';
import { KYCDocument } from '@/app/dashboard/customers/components/types/kyc';

interface KYCDocumentsSectionProps {
  customerId: string;
}

// Mock documents data - in real app, this would come from API
const mockDocuments: KYCDocument[] = [
  {
    id: 'DOC001',
    type: 'Travel Passport',
    documentNumber: 'P1234567',
    uploadedDate: '2024-01-15',
    expiryDate: '2028-05-15',
    verifiedDate: '2024-01-16',
    verifiedBy: 'admin@fintech.com',
    status: 'verified'
  },
  {
    id: 'DOC002',
    type: 'Driver License',
    documentNumber: 'DL9876543',
    uploadedDate: '2024-02-20',
    expiryDate: '2026-08-15',
    verifiedDate: '2024-02-21',
    verifiedBy: 'admin@fintech.com',
    status: 'verified'
  }
];

export default function KYCDocumentsSection({ customerId }: KYCDocumentsSectionProps) {
  const [documents, setDocuments] = useState<KYCDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDocuments(mockDocuments);
      setLoading(false);
    }, 500);
  }, [customerId]);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2].map(i => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-shrink-0 lg:w-[30%]">
                <div className="border-4 border-black rounded-md">
                  <div className="w-full h-40 bg-gray-200"></div>
                </div>
              </div>
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

  return (
    <div className="space-y-6">
      {documents.map((document) => (
        <div key={document.id} className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Document Image */}
            <div className="flex-shrink-0 lg:w-[30%]">
              <div className="border-4 border-black rounded-md overflow-hidden">
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                  <div className="text-center p-4">
                    <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-xs text-gray-500 mt-2">{document.type}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Details */}
            <div className="flex-1 lg:w-[70%]">
              <div className="space-y-3 mb-5">
                {/* Row 1 */}
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <div>
                    <span className="text-xs font-medium text-gray-600">Document ID:</span>
                    <p className="text-sm font-semibold text-gray-900">{document.id}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-gray-600">Expiry Date:</span>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(document.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <div>
                    <span className="text-xs font-medium text-gray-600">Document Number:</span>
                    <p className="text-sm font-semibold text-gray-900">{document.documentNumber}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-gray-600">Verified Date:</span>
                    <p className="text-sm font-semibold text-gray-900">
                      {document.verifiedDate ? new Date(document.verifiedDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <div>
                    <span className="text-xs font-medium text-gray-600">Uploaded Date:</span>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(document.uploadedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-gray-600">Verified By:</span>
                    <p className="text-sm font-semibold text-gray-900">{document.verifiedBy || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 hover:shadow-md transition-all duration-200">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Full Document
                </button>
                
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 hover:shadow-md transition-all duration-200">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </button>
                
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 hover:shadow-md transition-all duration-200">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Request Re-Verification
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}