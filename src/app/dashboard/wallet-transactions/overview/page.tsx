
'use client';

import { useState, useEffect, useMemo } from 'react';
import { CustomerService } from '@/lib/services/customerService';
import { Transaction } from '@/lib/types/customer';
import { TransactionStatsCards } from '@/app/dashboard/wallet-transactions/components/TransactionStatsCards';
import { TransactionsTable } from '@/app/dashboard/wallet-transactions/components//TransactionsTable';
import { TransactionPagination } from '@/app/dashboard/wallet-transactions/components/TransactionPagination';
import Link from 'next/link';

export default function TransactionsOverviewPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({
    totalVolume: 0,
    totalTransactions: 0,
    completed: 0,
    pending: 0,
    failed: 0,
  });
  const [searchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const rowsPerPage = 10;

  // Load transactions and stats
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [transactionsData, statsData] = await Promise.all([
          CustomerService.getAllTransactions(),
          CustomerService.getTransactionStats(),
        ]);
        
        setTransactions(transactionsData.transactions);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading transaction data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter transactions based on search query
  const filteredTransactions = useMemo(() => {
    if (!searchQuery) return transactions;

    const query = searchQuery.toLowerCase();
    return transactions.filter(transaction =>
      transaction.transaction_id.toLowerCase().includes(query) ||
      transaction.user.name.toLowerCase().includes(query) ||
      transaction.user.first_name.toLowerCase().includes(query) ||
      transaction.user.last_name.toLowerCase().includes(query)
    );
  }, [transactions, searchQuery]);

  // Paginate transactions
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredTransactions.slice(0, endIndex); // For overview, we only show first 10
  }, [filteredTransactions, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const showingStart = (currentPage - 1) * rowsPerPage + 1;
  const showingEnd = Math.min(currentPage * rowsPerPage, filteredTransactions.length);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Statistics Cards */}
      <TransactionStatsCards stats={stats} />

      {/* Recent Transactions Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
          <Link
            href="/dashboard/wallet-transactions/transactions"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        {/* Transactions Table */}
        <TransactionsTable transactions={paginatedTransactions} showPagination={false} />

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <TransactionPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            rowsPerPage={rowsPerPage}
            totalItems={filteredTransactions.length}
            showingStart={showingStart}
            showingEnd={showingEnd}
          />
        )}
      </div>
    </div>
  );
}