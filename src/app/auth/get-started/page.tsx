"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signUpUser } from "@/lib/auth";
import Image from "next/image";
import Illustration from "@/assets/illustration.png";
import Icon1 from "@/assets/asset 1.png";
import { Eye, EyeOff, Check, Loader2 } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  general?: string;
}

//  TO BE USED WHEN BACKEND IS READY
// const signUpUser = async (userData: FormData): Promise<{ success: boolean; message?: string }> => {
//   try {
//     const response = await fetch('/api/auth/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     })

//     const data = await response.json()

//     if (response.ok) {
//       return { success: true }
//     } else {
//       return { success: false, message: data.message || 'Registration failed' }
//     }
//   } catch (error) {
//     return { success: false, message: 'Network error. Please try again.' }
//   }
// }

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

export default function GetStartedPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: "Dominic",
    lastName: "Praise",
    email: "dominic@mail.com",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear erors when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const result = await signUpUser(formData); // This now uses your auth.ts function
    setLoading(false);

    if (result.success) {
      router.push(
        `/auth/verify-email?email=${encodeURIComponent(formData.email)}`
      );
    } else {
      setErrors({ general: result.message });
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const isPasswordValid = validatePassword(formData.password);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-12">
        {/* Icon */}
        <div className="mb-6 w-16 h-16 flex items-center justify-center">
          <Image
            src={Icon1}
            alt="Get started illustration"
            className="w-full h-full object-contain"
          />
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold text-black mb-6">
          GET STARTED
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
          {/* First Name & Last Name Row */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                First Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full text-sm font-medium py-3 border-b border-gray-300 focus:border-[#0066FF] focus:outline-none bg-transparent text-[#b8b5b5]"
                  disabled={loading}
                />
                {formData.firstName && (
                  <Check className="absolute right-0 top-3 h-5 w-5 text-[#10B981]" />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Last Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full text-sm font-medium py-3 border-b border-gray-300 focus:border-[#0066FF] focus:outline-none bg-transparent text-[#b8b5b5]"
                  disabled={loading}
                />
                {formData.lastName && (
                  <Check className="absolute right-0 top-3 h-5 w-5 text-[#10B981]" />
                )}
              </div>
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-sm font-medium py-3 border-b border-gray-300 focus:border-[#0066FF] focus:outline-none bg-transparent text-[#b8b5b5]"
                disabled={loading}
              />
              {formData.email && (
                <Check className="absolute right-0 top-3 h-5 w-5 text-[#10B981]" />
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-black">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-3 border-b border-gray-300 focus:border-[#0066FF] focus:outline-none bg-transparent text-[#b8b5b5]"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-8 top-3 text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                {showPassword ? (
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
                  ? "text-[#10B981]"
                  : passwordStrength === "Fair"
                  ? "text-[#F59E0B]"
                  : "text-[#EF4444]"
              }`}
            >
              Password Strength: {passwordStrength}{" "}
              {!isPasswordValid && "(Include A Special Character)"}
            </div>
          )}

          {/* Error Message */}
          {errors.general && (
            <div className="text-sm font-medium text-[#EF4444]">
              {errors.general}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0E70FC] hover:bg-[#0052CC] hover:cursor-pointer text-white py-6 text-[1rem] font-light rounded-full mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Get Started"
            )}
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="flex justify-center text-gray-600 text-sm text-center mt-6">
          <p>Already have an account? </p>
          <button
            onClick={() => router.push("/auth/sign-in")}
            className="text-[#0E70FC] underline font-semibold hover:cursor-pointer"
            disabled={loading}
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden md:flex w-1/2 bg-[#F3F4F6] items-center justify-center p-12">
        <Image
          src={Illustration}
          alt="Get started illustration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
