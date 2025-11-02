'use client';

import { KYCDocument } from './types/kyc';
import Image from "next/image";

interface KYCDocumentCardProps {
  document: KYCDocument;
}

export default function KYCDocumentCard({ document }: KYCDocumentCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      {/* Horizontal Layout - Image Left, Details Right */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Section - Document Image (30% width) */}
        <div className="flex-shrink-0 lg:w-[30%]">
          <div className="border-4 border-black rounded-sm overflow-hidden">
            {/* Document Thumbnail */}
            <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
              {document.thumbnailUrl ? (
                <Image 
                  src={document.thumbnailUrl} 
                  alt={document.type}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-xs text-gray-500 mt-2">{document.type}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section - Document Details (70% width) */}
        <div className="flex-1 lg:w-[70%]">
          {/* Document Details Grid */}
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
                  {new Date(document.verifiedDate).toLocaleDateString()}
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
                <p className="text-sm font-semibold text-gray-900">{document.verifiedBy}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Full Document
            </button>
            
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
            
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Request Re-Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}