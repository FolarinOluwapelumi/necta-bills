// Create: src/app/dashboard/wallet-transactions/transactions/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { CustomerService } from '@/lib/services/customerService';
import { Transaction } from '@/lib/types/customer';
import { TransactionsTable } from '@/app/dashboard/wallet-transactions/components/TransactionsTable';
import { TransactionFilters } from '@/app/dashboard/wallet-transactions/components/TransactionFilter';
import { TransactionPagination } from '@/app/dashboard/wallet-transactions/components/TransactionPagination';



export default function TransactionsListPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);


  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setIsLoading(true);
        const result = await CustomerService.getAllTransactions({
          page: currentPage,
          limit: rowsPerPage,
          type: selectedType,
          status: selectedStatus,
          search: searchQuery,
        });
        
        setTransactions(result.transactions);
        setTotalItems(result.total);
      } catch (error) {
        console.error('Error loading transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, [currentPage, rowsPerPage, selectedType, selectedStatus, searchQuery]);

  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const showingStart = totalItems > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0;
  const showingEnd = Math.min(currentPage * rowsPerPage, totalItems);

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="flex space-x-4 mb-6">
            <div className="h-10 bg-gray-200 rounded w-48"></div>
            <div className="h-10 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Filters Section - FIXED: Now shows proper default text */}
      <TransactionFilters
        selectedType={selectedType}
        selectedStatus={selectedStatus}
        onTypeChange={setSelectedType}
        onStatusChange={setSelectedStatus}
      />

      {/* Transactions Table */}
      <TransactionsTable transactions={transactions} />

      {/* Pagination */}
      {transactions.length > 0 && (
        <TransactionPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          totalItems={totalItems}
          showingStart={showingStart}
          showingEnd={showingEnd}
        />
      )}

      {/* Empty State */}
      {transactions.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m0 0V9m0 8h6m-6 0H7m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}