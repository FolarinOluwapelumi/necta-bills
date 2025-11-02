"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { KYCService } from "@/app/dashboard/kyc-verification/services/kycService";
import { KYCRequest } from "@/app/dashboard/kyc-verification/types/kyc";
import KYCReviewHeader from "../components/KYCReviewHeader";
import KYCDocumentsSection from "../components/KYCDocumentsSection";

export default function KYCReviewPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.customerId as string;

  const [request, setRequest] = useState<KYCRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // FIXED: Wrap loadKYCRequest in useCallback to avoid infinite re-renders
  const loadKYCRequest = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const requestData = await KYCService.getKYCRequestById(customerId);
      setRequest(requestData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load KYC request"
      );
    } finally {
      setLoading(false);
    }
  }, [customerId]); // Add dependencies here

  // FIXED: Add loadKYCRequest to dependency array
  useEffect(() => {
    loadKYCRequest();
  }, [customerId, loadKYCRequest]);

  const handleApprove = async (customerId: string) => {
    try {
      await KYCService.approveKYC(customerId);
      // Navigate back to KYC verification page
      router.push("/dashboard/kyc-verification?tab=verified");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to approve KYC");
    }
  };

  const handleReject = async (customerId: string, reason: string) => {
    try {
      await KYCService.rejectKYC(customerId, reason);
      // Navigate back to KYC verification page
      router.push("/dashboard/kyc-verification?tab=rejected");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reject KYC");
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          {/* Breadcrumb Skeleton */}
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>

          {/* Header Skeleton */}
          <div className="h-32 bg-gray-200 rounded-xl mb-6"></div>

          {/* Two Column Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="h-64 bg-gray-200 rounded-xl"></div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>

          {/* Documents Skeleton */}
          <div className="h-48 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (error || !request) {
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
              {error || "KYC request not found"}
            </span>
          </div>
          <button
            onClick={() => router.push("/dashboard/kyc-verification")}
            className="mt-3 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
          >
            Back to KYC Verification
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* User Profile Header with Action Buttons */}
      <KYCReviewHeader
        request={request}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {/* Two-Column Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information Card */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Information
          </h3>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600">First Name</div>
              <div className="text-sm font-medium text-gray-900">
                {request.firstName}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Last Name</div>
              <div className="text-sm font-medium text-gray-900">
                {request.lastName}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Phone Number</div>
              <div className="text-sm font-medium text-gray-900">
                {request.phone}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Email Address</div>
              <div className="text-sm font-medium text-gray-900">
                {request.email}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Address</div>
              <div className="text-sm font-medium text-gray-900">
                {request.address || "No address provided"}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Email Verification</div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-green-700">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information Card */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Account Information
          </h3>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600">Date Of Birth</div>
              <div className="text-sm font-medium text-gray-900">
                {request.dateOfBirth}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Joined Date</div>
              <div className="text-sm font-medium text-gray-900">
                {new Date(request.joinedDate).toLocaleDateString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Last Login</div>
              <div className="text-sm font-medium text-gray-900">
                {request.lastLogin}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Last IP Address</div>
              <div className="text-sm font-medium text-gray-900">
                {request.lastIpAddress || "Not available"}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">KYC Status</div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  request.kycStatus === "verified"
                    ? "bg-green-100 text-green-800"
                    : request.kycStatus === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {request.kycStatus.toUpperCase()}
              </span>
            </div>
            <div>
              <div className="text-sm text-gray-600">KYC Level</div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-900">
                  {request.kycLevel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KYC Documents Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <KYCDocumentsSection customerId={customerId} />
      </div>
    </div>
  );
}