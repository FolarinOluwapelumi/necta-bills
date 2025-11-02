"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { CustomerService } from "@/lib/services/customerService";
import { Customer, Transaction } from "@/lib/types/customer";
import ProfileHeader from "../components/ProfileHeader";
import TransactionTable from "../components/TransactionTable";
import TransactionModal from "../components/TransactionModal";
import { useCustomer } from "@/contexts/CustomerContext";
import KYCDocumentsTab from "../components/KYCDocumentsTab";

type TabType = "overview" | "transactions" | "kYC-documents";

export default function CustomerProfilePage() {
  const params = useParams();
  const customerId = params.id as string;
  const { setCustomerName } = useCustomer();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // FIXED: Wrap loadCustomerData in useCallback
  const loadCustomerData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [customerData, transactionsData] = await Promise.all([
        CustomerService.getCustomerById(customerId),
        CustomerService.getCustomerTransactions(customerId),
      ]);

      setCustomer(customerData);
      setTransactions(transactionsData.transactions);

      // UPDATE CUSTOMER NAME IN HEADER USING CONTEXT
      const fullName = `${customerData.first_name} ${customerData.last_name}`;
      setCustomerName(fullName);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load customer data"
      );
    } finally {
      setLoading(false);
    }
  }, [customerId, setCustomerName]); // Add dependencies

  // FIXED: Add loadCustomerData to dependency array
  useEffect(() => {
    loadCustomerData();
  }, [customerId, loadCustomerData]);

  // Clean up customer name when leaving the page
  useEffect(() => {
    return () => {
      setCustomerName("");
    };
  }, [setCustomerName]);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-red-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-red-800">
              {error || "Customer not found"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <ProfileHeader customer={customer} />

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {(["overview", "transactions", "kYC-documents"] as TabType[]).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Stats */}
            <div className="space-y-6">
              {/* Wallet Balance */}
              <div className="bg-black text-white rounded-xl p-6 shadow-lg">
                <div className="text-sm text-gray-300">Wallet Balance</div>
                <div className="text-3xl font-bold mt-2">
                  ₦{customer.wallet_balance.toLocaleString()}
                </div>
                <div className="flex items-center mt-2 text-green-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">24.3% July 2025</span>
                </div>
              </div>

              {/* Total Transactions */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-600">Total Transactions</div>
                <div className="text-2xl font-bold mt-2">
                  {customer.total_transactions}
                </div>
                <div className="flex items-center mt-2 text-orange-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">22.1% July 2025</span>
                </div>
              </div>
            </div>

            {/* Middle Column - Personal Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">First Name</div>
                  <div className="text-sm font-medium text-gray-900">
                    {customer.first_name}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Last Name</div>
                  <div className="text-sm font-medium text-gray-900">
                    {customer.last_name}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Phone Number</div>
                  <div className="text-sm font-medium text-gray-900">
                    {customer.phone}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Email Address</div>
                  <div className="text-sm font-medium text-gray-900">
                    {customer.email}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Address</div>
                  <div className="text-sm font-medium text-gray-900">
                    {customer.address}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">
                    Email Verification
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-green-700">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Account Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Account Information
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">Date Of Birth</div>
                  <div className="text-sm font-medium text-gray-900">
                    {customer.date_of_birth}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Joined Date</div>
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(customer.date_joined).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Last Login</div>
                  <div className="text-sm font-medium text-gray-900">
                    {customer.last_login}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Last IP Address</div>
                  <div className="text-sm font-medium text-gray-900">
                    {customer.last_ip_address}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">KYC Status</div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {customer.kyc_status.toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="text-sm text-gray-600">KYC Level</div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-gray-900">
                      {customer.kyc_level}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <TransactionTable
            transactions={transactions}
            onTransactionClick={handleTransactionClick}
          />
        )}

        {activeTab === "kYC-documents" && (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            {activeTab === "kYC-documents" && (
              <KYCDocumentsTab customerId={customerId} />
            )}
          </div>
        )}
      </div>

      {/* Transaction Modal */}
      <TransactionModal
        transaction={selectedTransaction}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}