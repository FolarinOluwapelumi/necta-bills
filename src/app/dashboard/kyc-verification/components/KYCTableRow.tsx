'use client';

import { useEffect } from 'react';
import { KYCRequest } from '../types/kyc';

interface KYCTableRowProps {
  request: KYCRequest;
  activeTab: 'pending' | 'verified' | 'rejected';
  onReview: (customerId: string) => void;
  onApprove: (customerId: string) => void;
}

export default function KYCTableRow({ 
  request, 
  activeTab, 
  onReview, 
  onApprove 
}: KYCTableRowProps) {

  useEffect(() => {
    if (activeTab === 'rejected') {
      console.log('Rejected Request Data:', {
        customer: `${request.firstName} ${request.lastName}`,
        rejectedDate: request.rejectedDate,
        rejectionReason: request.rejectionReason,
        fullRequest: request
      });
    }
  }, [request, activeTab]);

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold";
    
    switch (status) {
      case 'verified':
        return `${baseClasses} bg-green-100 text-green-700`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-700`;
      case 'under_review':
        return `${baseClasses} bg-blue-100 text-blue-600`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-700`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  const getDateColumn = () => {
    switch (activeTab) {
      case 'pending':
        return new Date(request.submittedDate).toLocaleDateString();
      case 'verified':
        return request.verifiedDate ? new Date(request.verifiedDate).toLocaleDateString() : 'N/A';
      case 'rejected':
        return request.rejectedDate ? new Date(request.rejectedDate).toLocaleDateString() : 'N/A';
      default:
        return 'N/A';
    }
  };

  const renderActions = () => {
    switch (activeTab) {
      case 'pending':
        return (
          <div className="flex space-x-2 justify-end">
            <button
              onClick={() => onReview(request.customerId)}
              className="px-3 py-1.5 border border-gray-300 text-blue-600 bg-white rounded-lg hover:cursor-pointer hover:bg-gray-50 transition-colors text-[.7rem] whitespace-nowrap"
            >
              Review
            </button>
            <button
              onClick={() => onApprove(request.customerId)}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-full hover:cursor-pointer hover:bg-blue-700 transition-colors text-[.7rem] whitespace-nowrap"
            >
              Approve
            </button>
          </div>
        );
      case 'verified':
        return (
          <div className="text-left">
            <button
              onClick={() => onReview(request.customerId)}
              className="px-3 py-1.5 border border-gray-300 text-gray-600 hover:cursor-pointer font-medium bg-white rounded-lg hover:bg-gray-50 transition-colors text-[.7rem] whitespace-nowrap"
            >
              View Details
            </button>
          </div>
        );
      case 'rejected':
        return (
          <div className="text-right">
            <button
              onClick={() => onReview(request.customerId)}
              className="px-3 py-1.5 border border-gray-300 text-gray-600 hover:cursor-pointer font-medium bg-white rounded-lg hover:bg-gray-50 transition-colors text-[.7rem] whitespace-nowrap"
              >
              Review Again
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-13 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center ">
      {/* NAME - 2 columns */}
      <div className="col-span-2">
        <div className="text-sm font-medium text-gray-900 whitespace-nowrap">
          {request.firstName} {request.lastName}
        </div>
      </div>

      {/* EMAIL ADDRESS - 3 columns */}
      <div className="col-span-3">
        <div className="text-sm text-gray-900 truncate">{request.email}</div>
      </div>

      {/* KYC ID - 2 columns */}
      <div className="col-span-2">
        <div className="text-sm text-gray-900">{request.kycId}</div>
      </div>

      {/* DATE COLUMN (Submitted/Verified/Rejected) - 2 columns */}
      <div className="col-span-2">
        <div className="text-sm text-gray-900 whitespace-nowrap">{getDateColumn()}</div>
      </div>

      {/* STATUS/REASON COLUMN - 2 columns */}
      <div className="col-span-2">
        {activeTab === 'rejected' ? (
          // FOR REJECTED TAB: Show rejection reason
          <span className="text-sm text-gray-600">{request.rejectionReason || 'No reason provided'}</span>
        ) : (
          // FOR OTHER TABS: Show status badge
          <span className={getStatusBadge(request.status)}>
            {request.status.replace('_', ' ').toUpperCase()}
          </span>
        )}
      </div>

      {/* ACTIONS - 2 column */}
      <div className="col-span-2 text-left">
        {renderActions()}
      </div>
    </div>
  );
}