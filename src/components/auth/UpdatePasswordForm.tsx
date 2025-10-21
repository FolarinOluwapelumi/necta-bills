"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePassword } from "@/lib/auth";
import { Eye, EyeOff} from "lucide-react";


interface UpdatePasswordFormProps {
  initialToken?: string;
  initialEmail?: string;
  isValidToken?: boolean;
}

export default function UpdatePasswordForm({
  initialToken,
  initialEmail,
  isValidToken = true,
}: UpdatePasswordFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password: string): boolean => {
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    const hasMinLength = password.length >= 8;
    return hasSpecialChar && hasMinLength;
  };

  const getPasswordStrength = (password: string): string => {
    if (!password) return "";
    if (validatePassword(password)) return "Good";
    if (password.length >= 6) return "Fair";
    return "Weak";
  };

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

    if (!isValidToken) {
      setError("Invalid or expired reset link");
      return;
    }

    setLoading(true);
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters with a special character"
      );
      setLoading(false);
      return;
    }

    const result = await updatePassword(
      initialEmail || null,
      formData.password,
      initialToken || null
    );
    setLoading(false);

    if (result.success) {
      // Redirect to sign in page with success message
      router.push("/auth/sign-in?message=Password updated successfully");
    } else {
      setError(result.message);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const isPasswordValid = validatePassword(formData.password);

  if (!isValidToken) {
    return (
      <div className="max-w-md">
        <div className="text-red-500 text-sm bg-red-50 p-4 rounded mb-4">
          Invalid or expired password reset link. Please request a new one.
        </div>
        <button
          onClick={() => router.push("/auth/forgot-password")}
          className="w-full bg-[#0E70FC] hover:bg-[#0052CC] text-white py-4 text-base font-medium rounded-full transition-colors"
        >
          Request New Reset Link
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full py-3 border-b border-gray-300 focus:border-[#0066FF] focus:outline-none bg-transparent text-black pr-10"
            disabled={loading}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full py-3 border-b border-gray-300 focus:border-[#0066FF] focus:outline-none bg-transparent text-black pr-10"
            disabled={loading}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-0 top-3 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
          </button>
        </div>
      </div>

      {/* Password Strength */}
      {formData.password && (
        <div
          className={`text-sm font-medium ${
            passwordStrength === "Good"
              ? "text-green-600"
              : passwordStrength === "Fair"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          Password Strength: {passwordStrength}{" "}
          {!isPasswordValid && "(Include A Special Character)"}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      {/* Update Password Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0E70FC] hover:bg-[#0052CC] hover:cursor-pointer disabled:bg-gray-400 text-white py-4 text-base font-medium rounded-full mt-2 transition-colors"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}
