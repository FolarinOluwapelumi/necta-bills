// Create: src/app/dashboard/wallet-transactions/components/TransactionStatsCards.tsx
'use client';

interface TransactionStats {
  totalVolume: number;
  totalTransactions: number;
  completed: number;
  pending: number;
  failed: number;
}

interface TransactionStatsCardsProps {
  stats: TransactionStats;
}

export function TransactionStatsCards({ stats }: TransactionStatsCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-NG').format(num);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Transaction Volume */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-600 mb-2">
            Total Transaction Volume
          </span>
          <span className="text-3xl font-bold text-gray-900">
            {formatCurrency(stats.totalVolume)}
          </span>
          <span className="text-sm text-gray-500 mt-1">
            {formatNumber(stats.totalTransactions)} Transactions
          </span>
        </div>
      </div>

      {/* Completed */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-600 mb-2">
            Completed
          </span>
          <span className="text-2xl font-bold text-gray-900">
            {formatNumber(stats.completed)}
          </span>
          <div className="flex items-center mt-1">
            <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-green-500">22.1% July 2025</span>
          </div>
        </div>
      </div>

      {/* Pending */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-600 mb-2">
            Pending
          </span>
          <span className="text-2xl font-bold text-gray-900">
            {formatNumber(stats.pending)}
          </span>
          <div className="flex items-center mt-1">
            <svg className="w-4 h-4 text-orange-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-orange-500">22.1% July 2025</span>
          </div>
        </div>
      </div>

      {/* Failed */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-600 mb-2">
            Failed
          </span>
          <span className="text-2xl font-bold text-gray-900">
            {formatNumber(stats.failed)}
          </span>
          <div className="flex items-center mt-1">
            <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-red-500">22.1% July 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
}