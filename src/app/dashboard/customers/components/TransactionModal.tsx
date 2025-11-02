"use client";

import { useState, useEffect } from "react";
import { Transaction, TransactionStatus } from "@/lib/types/customer";
import React from 'react'; 

interface TransactionModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

interface StatusConfig {
  icon: React.JSX.Element;
  bgColor: string;
  statusText: string;
  statusColor: string;
}

export default function TransactionModal({
  transaction,
  isOpen,
  onClose,
}: TransactionModalProps) {
  const [status, setStatus] = useState(transaction?.status || "successful");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Prevent background scroll when modal is open
      document.body.style.overflow = "hidden";
      setIsVisible(true);
    } else {
      document.body.style.overflow = "unset";
      setIsVisible(false);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Update status when transaction changes
  useEffect(() => {
    if (transaction) {
      setStatus(transaction.status);
    }
  }, [transaction]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleStatusUpdate = async () => {
    try {
      setIsUpdating(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Status updated to:", status);
      handleClose();
    } catch (error) {
      console.error("Failed to update transaction status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReverseTransaction = async () => {
    if (!confirm("Are you sure you want to reverse this transaction?")) return;

    try {
      setIsUpdating(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Transaction reversed");
      handleClose();
    } catch (error) {
      console.error("Failed to reverse transaction:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Dynamic status configuration
  const getStatusConfig = (status: TransactionStatus) => {
    const config: Record<TransactionStatus, StatusConfig> = {
      successful: {
        icon: (
          <svg
            className="w-10 h-10 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ),
        bgColor: "bg-green-100",
        statusText: "SUCCESSFUL",
        statusColor: "bg-green-100 text-green-800",
      },
      pending: {
        icon: (
          <svg
            className="w-10 h-10 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
        bgColor: "bg-yellow-100",
        statusText: "PENDING",
        statusColor: "bg-yellow-100 text-yellow-800",
      },
      failed: {
        icon: (
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ),
        bgColor: "bg-red-100",
        statusText: "FAILED",
        statusColor: "bg-red-100 text-red-800",
      },
      completed: {
        icon: (
          <svg
            className="w-10 h-10 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ),
        bgColor: "bg-green-100",
        statusText: "COMPLETED",
        statusColor: "bg-green-100 text-green-800",
      },
      cancelled: {
        icon: (
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ),
        bgColor: 'bg-red-100',
        statusText: 'CANCELLED',
        statusColor: 'bg-red-100 text-red-800'
      }
    };
    return config[status] || config.successful;
  };

  // Extract bank name and account number from recipient
  const getBankDetails = (recipient?: string) => {
    if (!recipient) return { accountNumber: "N/A", bankName: "N/A" };

    // Example recipient format: "80/2345678 - Opay"
    const parts = recipient.split(" - ");
    if (parts.length === 2) {
      return {
        accountNumber: parts[0], // "80/2345678"
        bankName: parts[1], // "Opay"
      };
    }

    return {
      accountNumber: recipient,
      bankName: "Unknown Bank",
    };
  };

  const statusConfig = getStatusConfig(status as TransactionStatus);
  const bankDetails = getBankDetails(transaction?.recipient);

  if (!isOpen && !isVisible) return null;

  return (
    <>
      {/* Full Screen Dark Backdrop with Blur */}
      <div
        className={`fixed inset-0 transition-opacity duration-300 z-40 ${
          isVisible ? "opacity-100 backdrop-blur-md" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal - Scrollable content */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex-shrink-0 flex justify-between items-center border-b border-gray-200 px-6 py-2">
            <h3 className="text-base font-semibold text-gray-900">
              Transaction Receipt
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 font-semibold hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex justify-center">
                <div
                  className={`w-20 h-20 ${statusConfig.bgColor} rounded-full flex items-center justify-center`}
                >
                  {statusConfig.icon}
                </div>
              </div>

              {/* Amount */}
              <div className="text-center">
                <div className="text-3xl font-semibold text-gray-900">
                  ₦{transaction?.amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Sent To {bankDetails.accountNumber} - {bankDetails.bankName}
                </div>
              </div>

              {/* Details Grid */}
              <div className="space-y-2 bg-gray-50 rounded-lg p-4">
                {/* Reference Number - Side by side */}
                <div className="flex justify-between items-center border-b-1">
                  <div className="text-sm text-gray-600">Reference Number</div>
                  <div className="text-sm font-medium text-gray-900 py-2">
                    {transaction?.reference_number}
                  </div>
                </div>

                <div className="flex justify-between items-center border-b-1">
                  <div className="text-sm text-gray-600">Processing Time</div>
                  <div className="text-sm font-medium text-gray-900 py-2">
                    {transaction?.processing_time}
                  </div>
                </div>

                <div className="flex justify-between items-center border-b-1">
                  <div className="text-sm text-gray-600 py-2">Status</div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.statusColor}`}
                  >
                    {statusConfig.statusText}
                  </span>
                </div>

                {/* Date & Time - Side by side */}
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">Date & Time</div>
                  <div className="flex gap-6 text-sm font-medium text-gray-900 text-right py-2">
                    <div>{transaction?.date_time.split(",")[0]}</div>
                    <div className="text-gray-500">
                      {transaction?.date_time.split(",")[1]}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 text-sm">
                <button className="flex-1 bg-blue-600 text-white p-3 rounded-3xl font-light hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download PDF
                </button>
                <button className="flex-1 bg-white border p-3 rounded-3xl border-gray-300 text-blue-600 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  Print
                </button>
              </div>

              {/* Change Status Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Change Transaction Status
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Update the current status of this transaction
                </p>
                <div className="flex gap-3 text-sm">
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as TransactionStatus)
                    }
                    className="flex-1 border border-gray-300 rounded-3xl px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="successful">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={isUpdating}
                    className="bg-blue-600 text-white px-4 py-2 rounded-3xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isUpdating ? "Saving..." : "Save Status"}
                  </button>
                </div>
              </div>

              {/* Reverse Transaction Section */}
              <div className="bg-red-50 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Reverse Transaction
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Reverse this transaction and refund the amount to the user
                </p>
                <button
                  onClick={handleReverseTransaction}
                  disabled={isUpdating}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-3xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  {isUpdating ? "Processing..." : "Reverse Transaction"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
