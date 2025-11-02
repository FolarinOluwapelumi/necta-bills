'use client';

import { KYCRequest } from '../types/kyc';

interface KYCReviewHeaderProps {
  request: KYCRequest;
  onApprove: (customerId: string) => void;
  onReject: (customerId: string, reason: string) => void;
}

export default function KYCReviewHeader({ request, onApprove, onReject }: KYCReviewHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      {/* Left Section - Avatar and Info */}
      <div className="flex items-center space-x-4 mb-4 lg:mb-0">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
          <span className="text-white text-2xl font-bold">
            {request.firstName[0]}{request.lastName[0]}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {request.firstName} {request.lastName}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Member Since {request.joinedDate}, 12:16AM
          </p>
        </div>
      </div>

      {/* Right Section - Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button className="px-6 py-2 border border-blue-600 text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-colors font-medium">
          Send Email
        </button>
        <button 
          onClick={() => onApprove(request.customerId)}
          className="px-6 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Approve
        </button>
        <button 
          onClick={() => onReject(request.customerId, 'Manual rejection')}
          className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors font-medium"
        >
          Reject
        </button>
      </div>
    </div>
  );
}