'use client';

import { Customer } from '@/lib/types/customer';

interface ProfileHeaderProps {
  customer: Customer;
}

export default function ProfileHeader({ customer }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Customer Info */}
        <div className="flex items-center space-x-4">
            {/* profile picture comes here */}
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-semibold">
              {customer.first_name[0]}{customer.last_name[0]}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {customer.first_name} {customer.last_name}
            </h1>
            <p className="text-gray-600">
              Member Since {new Date(customer.date_joined).toLocaleDateString()}, 12:16AM
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-3xl font-semibold hover:bg-blue-50 transition-colors">
            Send Email
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-3xl font-semibold hover:bg-gray-50 transition-colors">
            Edit User
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-3xl font-semibold hover:bg-red-700 transition-colors">
            Suspend User
          </button>
        </div>
      </div>
    </div>
  );
}