"use client";

import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerService } from "@/lib/services/customerService";
import { useRouter } from "next/navigation";

// Fixed: Same interface for both tabs
interface TableRow {
  id: string;
  user: string;
  email: string;
  transactionId?: string;
  type?: "Deposit" | "Transfer" | "Airtime" | "Data" | "E-Sim" | "Refund";
  amount?: string;
  date: string;
  time: string;
  status: "SUCCESSFUL" | "PENDING" | "FAILED" | "ACTIVE" | "SUSPENDED";
  // Additional fields for user tab to match transaction structure
  joinedDate?: string;
  lastLogin?: string;
}

export function TransactionsTable() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"new-users" | "transactions">("transactions");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fixed: Fetch data from CustomerService
// FIXED VERSION - Move the functions inside useEffect
useEffect(() => {
  const loadTransactions = async () => {
    const result = await CustomerService.getAllTransactions({ limit: 5 });
    const formattedData: TableRow[] = result.transactions.slice(0, 5).map(tx => ({
      id: tx.id,
      user: tx.user.name,
      email: `${tx.user.first_name.toLowerCase()}.${tx.user.last_name.toLowerCase()}@example.com`,
      transactionId: tx.transaction_id,
      type: formatTypeForDisplay(tx.type),
      amount: `₦${tx.amount.toLocaleString()}`,
      date: tx.date_time.split(',')[0].trim(),
      time: tx.date_time.split(',')[1].trim(),
      status: formatStatusForDisplay(tx.status)
    }));
    
    setTableData(formattedData);
  };

  const loadUsers = async () => {
    const { customers } = await CustomerService.getLatestUsers({ limit: 5 });
    const formattedData: TableRow[] = customers.map(customer => {
      const joinDate = new Date(customer.date_joined.split('/').reverse().join('-'));
      const formattedDate = joinDate.toLocaleDateString('en-US');
      const formattedTime = joinDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });

      return {
        id: customer.user_id,
        user: `${customer.first_name} ${customer.last_name}`,
        email: customer.email,
        transactionId: `USER-${customer.user_id}`,
        type: "Deposit",
        amount: `₦${customer.wallet_balance.toLocaleString()}`,
        date: formattedDate,
        time: formattedTime,
        status: formatUserStatusForDisplay(customer.active_status),
      };
    });
    
    setTableData(formattedData);
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      if (activeTab === "transactions" || "new-users") {
        await loadTransactions();
      } else {
        await loadUsers();
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setTableData(activeTab === "transactions" ? getFallbackTransactions() : getFallbackUsers());
    } finally {
      setIsLoading(false);
    }
  };

  loadData();
}, [activeTab]); 

  // Helper functions
  const formatTypeForDisplay = (type: string): TableRow['type'] => {
    const typeMap: Record<string, TableRow['type']> = {
      'deposit': 'Deposit',
      'transfer': 'Transfer', 
      'airtime': 'Airtime',
      'data': 'Data',
      'e-sim': 'E-Sim',
      'refund': 'Refund'
    };
    return typeMap[type] || 'Transfer';
  };

  const formatStatusForDisplay = (status: string): TableRow['status'] => {
    const statusMap: Record<string, TableRow['status']> = {
      'successful': 'SUCCESSFUL',
      'completed': 'SUCCESSFUL',
      'pending': 'PENDING',
      'failed': 'FAILED',
      'cancelled': 'FAILED'
    };
    return statusMap[status] || 'PENDING';
  };

  const formatUserStatusForDisplay = (status: string): TableRow['status'] => {
    const statusMap: Record<string, TableRow['status']> = {
      'active': 'ACTIVE',
      'pending': 'PENDING',
      'suspended': 'SUSPENDED',
      'inactive': 'SUSPENDED',
      'restricted': 'SUSPENDED'
    };
    return statusMap[status] || 'PENDING';
  };

  // Fallback data
  const getFallbackTransactions = (): TableRow[] => {
    return [
      {
        id: "1",
        user: "John Doe",
        email: "john@example.com",
        transactionId: "TX123456",
        type: "Deposit",
        amount: "₦1,250.00",
        date: "09/03/2025",
        time: "09:34 AM",
        status: "SUCCESSFUL"
      },
      {
        id: "2", 
        user: "Sarah Wilson",
        email: "sarah@example.com",
        transactionId: "TX123457",
        type: "Transfer",
        amount: "₦350.00",
        date: "09/03/2025",
        time: "10:15 AM", 
        status: "PENDING"
      },
    ];
  };

  const getFallbackUsers = (): TableRow[] => {
    return [
      {
        id: "1",
        user: "John Doe",
        email: "john@example.com",
        transactionId: "USER-001",
        type: "Deposit",
        amount: "₦84,343,000",
        date: "09/03/2025",
        time: "09:34 AM",
        status: "ACTIVE"
      },
      {
        id: "2",
        user: "Sarah Wilson",
        email: "sarah@example.com",
        transactionId: "USER-002",
        type: "Deposit", 
        amount: "₦5,421,000",
        date: "09/02/2025",
        time: "10:15 AM",
        status: "PENDING"
      },
    ];
  };

  const toggleRowSelection = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAllSelection = () => {
    if (selectedRows.size === tableData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(tableData.map((item) => item.id)));
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Deposit":
      case "Refund":
        return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
      case "Transfer":
      case "Airtime":
      case "Data":
      case "E-Sim":
        return <ArrowUpRight className="w-4 h-4 text-red-500" />;
      default:
        return <ArrowDownLeft className="w-4 h-4 text-green-500" />; // Default to deposit icon for users
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SUCCESSFUL":
      case "ACTIVE":
        return "bg-green-100 text-green-700 hover:bg-green-200";
      case "PENDING":
        return "bg-orange-100 text-orange-700 hover:bg-orange-200";
      case "FAILED":
      case "SUSPENDED":
        return "bg-red-100 text-red-700 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
  };

  const handleViewAll = () => {
    if (activeTab === "transactions" || "new-users") {
      router.push("/dashboard/wallet-transactions/transactions");
    } 
  };

  if (isLoading) {
    return (
      <div className="pt-4 transition-all duration-300">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4 transition-all duration-300">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("new-users")}
            className={`text-sm pb-4 border-b-2 transition-all duration-300 hover:cursor-pointer ${
              activeTab === "new-users"
                ? "text-gray-900 border-blue-500 font-medium"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            New Users
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`text-sm pb-4 border-b-2 transition-all duration-300 hover:cursor-pointer ${
              activeTab === "transactions"
                ? "text-gray-900 border-blue-500 font-medium"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            Transactions
          </button>
        </div>
        <Button
          onClick={handleViewAll}
          variant="link"
          size="sm"
          className="text-sm p-2 font-medium transition-all bg-gray-50 rounded-lg duration-200 hover:scale-105"
        >
          View All →
        </Button>
      </div>

      {/* Table - FIXED: Same columns for both tabs */}
      <div className="overflow-x-auto">
        <table className="w-full overflow-hidden">
          <thead>
            <tr className="border-b border-t border-gray-200">
              <th className="text-left py-3 px-4">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all duration-200"
                  checked={selectedRows.size === tableData.length && tableData.length > 0}
                  onChange={toggleAllSelection}
                />
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                User
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                {activeTab === "transactions" ? "Transaction ID" : "User ID"}
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                Type
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                Amount
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                Date & Time
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="text-left py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                <td className="py-4 px-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all duration-200"
                    checked={selectedRows.has(row.id)}
                    onChange={() => toggleRowSelection(row.id)}
                  />
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {row.user}
                    </p>
                    <p className="text-xs text-gray-500">{row.email}</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600 font-mono">
                  {row.transactionId}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(row.type || "Deposit")}
                    <span className="text-sm text-gray-600">{row.type || "Deposit"}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm font-medium text-gray-900">
                  {row.amount || "₦0.00"}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  <div>
                    <div>{row.date}</div>
                    <div className="text-xs text-gray-400">{row.time}</div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full transition-all duration-200 ${getStatusBadge(row.status)}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}