'use client';

import { Transaction } from '@/lib/types/customer';
import Table from './Table';

interface TransactionTableProps {
  transactions: Transaction[];
  onTransactionClick: (transaction: Transaction) => void;
  loading?: boolean;
}

export default function TransactionTable({ 
  transactions, 
  onTransactionClick, 
  loading = false 
}: TransactionTableProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'refund':
        return '↓';
      case 'transfer':
      case 'withdrawal':
      case 'airtime':
      case 'data':
      case 'e-sim':
        return '↑';
      default:
        return '•';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'deposit' || type === 'refund' ? 'text-green-600' : 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'successful':
        return `${baseClasses} bg-green-100 text-green-700`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-700`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-700`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  const columns = [
    {
      key: 'user',
      header: 'USER',
      render: (transaction: Transaction) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {transaction.user.first_name[0]}{transaction.user.last_name[0]}
            </span>
          </div>
          <div className="text-sm font-medium text-gray-900">
            {transaction.user.name}
          </div>
        </div>
      )
    },
    {
      key: 'transactionId',
      header: 'TRANSACTION ID',
      render: (transaction: Transaction) => (
        <div className="text-sm text-gray-900 font-mono">
          {transaction.transaction_id}
        </div>
      )
    },
    {
      key: 'type',
      header: 'TYPE',
      render: (transaction: Transaction) => (
        <div className={`flex items-center space-x-2 text-sm font-medium ${getTypeColor(transaction.type)}`}>
          <span>{getTypeIcon(transaction.type)}</span>
          <span className="capitalize">{transaction.type}</span>
        </div>
      )
    },
    {
      key: 'amount',
      header: 'AMOUNT',
      render: (transaction: Transaction) => (
        <div className="text-sm font-medium text-gray-900">
          ₦{transaction.amount.toLocaleString()}
        </div>
      )
    },
    {
      key: 'dateTime',
      header: 'DATE & TIME',
      render: (transaction: Transaction) => (
        <div className="text-sm text-gray-900">
          {transaction.date_time}
        </div>
      )
    },
    {
      key: 'status',
      header: 'STATUS',
      render: (transaction: Transaction) => (
        <span className={getStatusBadge(transaction.status)}>
          {transaction.status.toUpperCase()}
        </span>
      )
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">Transactions</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-wrap  gap-3">
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Start Date"
              />
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="End Date"
              />
            </div>
          </div>
        </div>
      </div>

      <Table
        data={transactions}
        columns={columns}
        onRowClick={onTransactionClick}
        loading={loading}
        keyField="id"
        emptyMessage="No transactions found"
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
  );
}