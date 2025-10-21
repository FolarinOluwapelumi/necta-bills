
'use client';

import { useState } from 'react';

interface SentNotification {
  id: string;
  title: string;
  description: string;
  recipients: string;
  type: 'Email' | 'Push Notification';
  sentAt: string;
  status: 'DELIVERED' | 'PENDING' | 'FAILED';
}

export default function SentHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Mock data - replace with actual API call
  const notifications: SentNotification[] = [
    {
      id: '1',
      title: 'Welcome to FinTech Platform',
      description: 'Thank you for joining our platform. Complete your KYC to explore a variety of financial services including investment opportunities and budgeting tools.',
      recipients: 'All New Users',
      type: 'Email',
      sentAt: '09/03/2025. 09:34PM',
      status: 'DELIVERED',
    },
    {
      id: '2',
      title: 'Easy Account Setup',
      description: 'Sign up in minutes and start managing your finances.',
      recipients: 'All Users',
      type: 'Email',
      sentAt: '09/05/2025. 11:59PM',
      status: 'PENDING',
    },
    {
      id: '3',
      title: 'Robust Security Features',
      description: 'Your data is protected with state-of-the-art encryption.',
      recipients: 'Active Users',
      type: 'Push Notification',
      sentAt: '09/06/2025. 12:45PM',
      status: 'DELIVERED',
    },
    {
      id: '4',
      title: 'Access to Expert Advisors',
      description: 'Connect with financial advisors for personalized insights.',
      recipients: 'Inactive Users',
      type: 'Email',
      sentAt: '09/07/2025. 01:30AM',
      status: 'DELIVERED',
    },
    {
      id: '5',
      title: 'User-Friendly Interface',
      description: 'Navigate effortlessly with our intuitive design.',
      recipients: 'All New Users',
      type: 'Push Notification',
      sentAt: '09/08/2025. 09:00PM',
      status: 'PENDING',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(notifications.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedNotifications = notifications.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Sent Notifications
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        History of all sent notifications
      </p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TITLE
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                RECIPIENTS
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TYPE
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SENT AT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedNotifications.map((notification) => (
              <tr key={notification.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </div>
                    <div className="text-sm text-gray-500 max-w-xs">
                      {notification.description}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {notification.recipients}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {notification.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {notification.sentAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      notification.status
                    )}`}
                  >
                    {notification.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Show</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-700">per page</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}