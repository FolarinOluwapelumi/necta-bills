"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "@/lib/auth";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const result = await sendPasswordResetEmail(email);
    setLoading(false);

    if (result.success) {
      setSuccess("Password reset email sent! Check your inbox.");
      // Redirect to verify email page after a short delay
      setTimeout(() => {
        router.push(`/auth/verify-email?email=${encodeURIComponent(email)}&type=password-reset`);
      }, 2000);
    } else {
      setError(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      {/* Email Address */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. dominic@email.com"
          className="w-full text-sm font-medium py-3 border-b border-gray-300 focus:border-[#0066FF] focus:outline-none bg-transparent text-black"
          disabled={loading}
          required
        />
      </div>

      {/* Success Message */}
      {success && (
        <div className="text-green-600 text-sm bg-green-50 p-3 rounded">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      {/* Reset Password Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0E70FC] hover:bg-[#0052CC] hover:cursor-pointer disabled:bg-gray-400 text-white py-4 text-base font-medium rounded-full mt-2 transition-colors"
      >
        {loading ? "Sending..." : "Reset Password"}
      </button>
    </form>
  );
}