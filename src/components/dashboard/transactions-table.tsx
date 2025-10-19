"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownLeft, Smartphone, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Transaction {
  id: string
  user: string
  transactionId: string
  type: "Deposit" | "Transfer" | "Airtime"
  amount: string
  dateTime: string
  status: "SUCCESSFUL" | "PENDING"
}

const transactions: Transaction[] = [
  {
    id: "1",
    user: "Dominic Praise",
    transactionId: "TXN-00123456789",
    type: "Deposit",
    amount: "₦9,900",
    dateTime: "09/03/2025 · 09:34PM",
    status: "SUCCESSFUL",
  },
  {
    id: "2",
    user: "Martha Dokubo",
    transactionId: "TXN-00123456790",
    type: "Transfer",
    amount: "₦4,000",
    dateTime: "09/04/2025 · 10:00AM",
    status: "SUCCESSFUL",
  },
  {
    id: "3",
    user: "Elizabeth Bashir",
    transactionId: "TXN-00123456791",
    type: "Airtime",
    amount: "₦6,500",
    dateTime: "09/05/2025 · 11:15PM",
    status: "PENDING",
  },
  {
    id: "4",
    user: "John Bozimo",
    transactionId: "TXN-00123456792",
    type: "Deposit",
    amount: "₦3,250",
    dateTime: "09/06/2025 · 12:45PM",
    status: "SUCCESSFUL",
  },
]

export function TransactionsTable() {
  const [activeTab, setActiveTab] = useState<"new-users" | "transactions">("new-users")

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Deposit":
        return <ArrowDownLeft className="w-4 h-4 text-green-500" />
      case "Transfer":
        return <ArrowUpRight className="w-4 h-4 text-red-500" />
      case "Airtime":
        return <Smartphone className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("new-users")}
            className={`text-sm pb-4 border-b-2 transition-all duration-300 hover:cursor-pointer ${
              activeTab === "new-users"
                ? "text-gray-900 border-blue-400 font-medium"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            New Users
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`text-sm pb-4 border-b-2 transition-all duration-300 hover:cursor-pointer ${
              activeTab === "transactions"
                ? "text-gray-900 border-blue-400 font-medium"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            Transactions
          </button>
        </div>
        <Button variant="link" size="sm" className=" text-[0.7rem] sm:text-sm pb-4 font-medium transition-all duration-200 hover:scale-105">
          View All →
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4">
                <input type="checkbox" className="rounded transition-all duration-200" />
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">User</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Transaction ID</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Type</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Amount</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Date & Time</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="text-left py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr
                key={tx.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="py-4 px-4">
                  <input type="checkbox" className="rounded transition-all duration-200" />
                </td>
                <td className="py-4 px-4 text-sm font-medium text-gray-900">{tx.user}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{tx.transactionId}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(tx.type)}
                    <span className="text-sm text-gray-600">{tx.type}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm font-medium text-gray-900">{tx.amount}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{tx.dateTime}</td>
                <td className="py-4 px-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full transition-all duration-200 ${
                      tx.status === "SUCCESSFUL" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
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
  )
}
