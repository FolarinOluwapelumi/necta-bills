// Update: src/app/dashboard/wallet-transactions/components/TransactionFilters.tsx
'use client';

import { useState } from 'react';

interface TransactionFiltersProps {
  selectedType: string;
  selectedStatus: string;
  onTypeChange: (type: string) => void;
  onStatusChange: (status: string) => void;
}

export function TransactionFilters({
  selectedType,
  selectedStatus,
  onTypeChange,
  onStatusChange,
}: TransactionFiltersProps) {
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const transactionTypes = [
    'All Type',
    'deposit',
    'transfer',
    'airtime',
    'data',
    'e-sim',
    'refund'
  ];

  const statusTypes = [
    'All Status',
    'successful',
    'pending',
    'failed'
  ];

  // FIXED: Helper functions to get display text
  const getTypeDisplayText = (type: string) => {
    if (type === '') return 'All Type';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getStatusDisplayText = (status: string) => {
    if (status === '') return 'All Status';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Type Filter - FIXED: Shows proper default text */}
      <div className="relative">
        <button
          onClick={() => setIsTypeOpen(!isTypeOpen)}
          className="flex items-center justify-between w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-2xl bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <span>{getTypeDisplayText(selectedType)}</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isTypeOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsTypeOpen(false)}
            />
            <div className="absolute left-0 mt-1 w-full sm:w-48 bg-white border border-gray-200 rounded-2xl shadow-lg z-20">
              {transactionTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    onTypeChange(type === 'All Type' ? '' : type);
                    setIsTypeOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${
                    (selectedType === '' && type === 'All Type') || selectedType === type
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700'
                  }`}
                >
                  <span>{type === 'All Type' ? 'All Type' : type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  {(selectedType === '' && type === 'All Type') || selectedType === type ? (
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : null}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Status Filter - FIXED: Shows proper default text */}
      <div className="relative">
        <button
          onClick={() => setIsStatusOpen(!isStatusOpen)}
          className="flex items-center justify-between w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-2xl bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <span>{getStatusDisplayText(selectedStatus)}</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isStatusOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsStatusOpen(false)}
            />
            <div className="absolute left-0 mt-1 w-full sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              {statusTypes.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    onStatusChange(status === 'All Status' ? '' : status);
                    setIsStatusOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${
                    (selectedStatus === '' && status === 'All Status') || selectedStatus === status
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700'
                  }`}
                >
                  <span>{status === 'All Status' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}</span>
                  {(selectedStatus === '' && status === 'All Status') || selectedStatus === status ? (
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : null}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}