"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Smartphone,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockTransactions } from "@/lib/data/mock-data";
// import type { Transaction } from "@/lib/types/dashboard"

export function TransactionsTable() {
  const [activeTab, setActiveTab] = useState<"new-users" | "transactions">(
    "transactions"
  );
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

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
    if (selectedRows.size === mockTransactions.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(mockTransactions.map((tx) => tx.id)));
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Deposit":
        return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
      case "Transfer":
        return <ArrowUpRight className="w-4 h-4 text-red-500" />;
      case "Airtime":
        return <Smartphone className="w-4 h-4 text-blue-500" />;
      case "Airline":
        return <ArrowUpRight className="w-4 h-4 text-purple-500" />;
      default:
        return null;
    }
  };

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
          variant="link"
          size="sm"
          className="text-sm p-2 font-medium transition-all bg-gray-50 rounded-lg duration-200 hover:scale-105"
        >
          View All →
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full overflow-hidden">
          <thead>
            <tr className="border-b border-t border-gray-200">
              <th className="text-left py-3 px-4">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all duration-200"
                  checked={selectedRows.size === mockTransactions.length}
                  onChange={toggleAllSelection}
                />
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                User
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                Transaction ID
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
            {mockTransactions.map((tx, index) => (
              <tr
                key={tx.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                <td className="py-4 px-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all duration-200"
                    checked={selectedRows.has(tx.id)}
                    onChange={() => toggleRowSelection(tx.id)}
                  />
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {tx.user}
                    </p>
                    <p className="text-xs text-gray-500">{tx.email}</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600 font-mono">
                  {tx.transactionId}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(tx.type)}
                    <span className="text-sm text-gray-600">{tx.type}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm font-medium text-gray-900">
                  {tx.amount}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  <div>
                    <div>{tx.date}</div>
                    <div className="text-xs text-gray-400">{tx.time}</div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full transition-all duration-200 ${
                      tx.status === "SUCCESSFUL"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                    }`}
                  >
                    {tx.status}
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
