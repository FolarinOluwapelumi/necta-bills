"use client";

import { KYCRequest } from "../types/kyc";
import KYCTableRow from "./KYCTableRow";

interface KYCDataTableProps {
  requests: KYCRequest[];
  activeTab: "pending" | "verified" | "rejected";
  onReview: (customerId: string) => void;
  onApprove: (customerId: string) => void;
}

export default function KYCDataTable({
  requests,
  activeTab,
  onReview,
  onApprove,
}: KYCDataTableProps) {
  const getColumns = () => {
    switch (activeTab) {
      case "pending":
        return [
          { name: "NAME", span: "col-span-2" },
          { name: "EMAIL ADDRESS", span: "col-span-3" },
          { name: "KYC ID", span: "col-span-2" },
          { name: "SUBMITTED", span: "col-span-2" },
          { name: "KYC STATUS", span: "col-span-2" },
          { name: "ACTIONS", span: "col-span-2 text-left" },
        ];
      case "verified":
        return [
          { name: "NAME", span: "col-span-2" },
          { name: "EMAIL ADDRESS", span: "col-span-3" },
          { name: "KYC ID", span: "col-span-2" },
          { name: "VERIFIED DATE", span: "col-span-2" },
          { name: "KYC STATUS", span: "col-span-2" },
          { name: "ACTIONS", span: "col-span-1 text-right" },
        ];
      case "rejected":
        return [
          { name: "NAME", span: "col-span-2" },
          { name: "EMAIL ADDRESS", span: "col-span-3" },
          { name: "KYC ID", span: "col-span-2" },
          { name: "REJECTED DATE", span: "col-span-2" },
          { name: "REASON", span: "col-span-3" }, // REASON gets 3 columns
          { name: "ACTIONS", span: "col-span-1 text-left" }, // ACTIONS gets 1 column
        ];
      default:
        return [];
    }
  };

  const columns = getColumns();

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        {/* Table Header */}
        <div className="bg-gray-50 min-w-[800px]">
          <div className="grid grid-cols-13 gap-4 px-6 py-3 border-b border-gray-200">
            {columns.map((column) => (
              <div
                key={column.name}
                className={`text-xs font-bold text-gray-600 uppercase tracking-wider ${column.span}`}
              >
                {column.name}
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200 min-w-[800px]">
            {requests.map((request) => (
              <KYCTableRow
                key={request.id}
                request={request}
                activeTab={activeTab}
                onReview={onReview}
                onApprove={onApprove}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="bg-gray-50 px-4 lg:px-6 py-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <select className="text-sm border border-gray-300 rounded px-2 sm:px-3 py-1">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="text-sm text-gray-600 whitespace-nowrap">
              Rows Per Page
            </span>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6">
            <span className="text-sm text-gray-600 whitespace-nowrap">
              Page 1 of 7
            </span>
            <div className="flex space-x-1 sm:space-x-2">
              <button className="p-1 rounded hover:bg-gray-200 transition-colors">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="p-1 rounded hover:bg-gray-200 transition-colors">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <span className="text-sm text-gray-600 whitespace-nowrap">
              Showing {requests.length} of {requests.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
