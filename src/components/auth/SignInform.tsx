"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInUser } from "@/lib/auth";

interface SignInFormProps {
  initialMessage?: string;
}

export default function SignInForm({ initialMessage }: SignInFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [successMessageState, setSuccessMessageState] = useState(
    initialMessage || ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signInUser(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.message);
    }
  };

   const handleGetStartedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/auth/get-started");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      {/* Email Address */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. dominic@email.com"
          className="w-full text-sm font-medium py-3 border-b border-gray-300 focus:border-[#0066FF] focus:outline-none bg-transparent text-black"
          disabled={loading}
          required
        />
      </div>
      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full text-sm font-medium py-3 border-b border-gray-300 focus:border-[#0066FF] focus:outline-none bg-transparent text-black"
          disabled={loading}
          required
        />
      </div>
      {/* Success Message */}
      {successMessageState && (
        <div className="text-green-600 text-sm bg-green-50 p-3 rounded">
          {successMessageState}
        </div>
      )}
      {/* Error Message */}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {/* Sign In Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0E70FC] hover:bg-[#0052CC] disabled:bg-gray-400 text-white py-4 text-base font-medium rounded-full mt-2 transition-colors"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
      {/* Forgot Password Link */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => router.push("/auth/forgot-password")}
          className="text-[#0E70FC] hover:cursor-pointer font-medium hover:underline"
          disabled={loading}
        >
          Forgot Password?
        </button>
      </div>

      <div>
        <div className="flex justify-center items-center text-gray-600 text-sm gap-2 mt-[-5]">
          <p>Don&apos;t have an account?</p>
          <button
            type="button" // IMPORTANT: type="button" prevents form submission
            onClick={handleGetStartedClick}
            className="text-[#0E70FC] underline font-medium hover:text-[#0052CC] transition-colors hover:cursor-pointer"
            disabled={loading}
          >
            Get Started
          </button>
        </div>
      </div>
    </form>
  );
}
