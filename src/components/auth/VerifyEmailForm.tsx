"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { verifyEmail, verifyPasswordReset } from "@/lib/auth";

interface VerifyEmailFormProps {
  initialEmail?: string;
  initialType?: string;
}

export default function VerifyEmailForm({
  initialEmail,
  initialType,
}: VerifyEmailFormProps) {
  const router = useRouter();
  const [userEmail] = useState(initialEmail || "dominic@gmail.com");
  const [type] = useState(initialType || "");

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTime, setResendTime] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Countdown timer for resend
  useEffect(() => {
    if (resendTime > 0) {
      const timer = setTimeout(() => setResendTime(resendTime - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTime]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are filled
    if (newCode.every((digit) => digit !== "") && index === 5) {
      handleVerify(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Move to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newCode = pastedData.split("").slice(0, 6);
      const filledCode = [...newCode, ...Array(6 - newCode.length).fill("")];
      setCode(filledCode as string[]);

      // Focus the last input
      const lastFilledIndex = Math.min(newCode.length - 1, 5);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  const handleVerify = async (verificationCode?: string) => {
    const verifyCode = verificationCode || code.join("");

    if (verifyCode.length !== 6) {
      setError("Please enter the 6-digit verification code");
      return;
    }

    setLoading(true);
    setError("");

    let result;
    if (type === "password-reset") {
      result = await verifyPasswordReset(verifyCode);
    } else {
      result = await verifyEmail(verifyCode);
    }

    setLoading(false);

    if (result.success) {
      if (type === "password-reset") {
        // Redirect to update password page with token
        router.push(
          `/auth/update-password?token=valid-reset-token&email=${encodeURIComponent(
            userEmail
          )}`
        );
      } else {
        router.push("/dashboard");
      }
    } else {
      setError(result.message || "Verification failed");
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setLoading(true);
    setError("");

    // Simulate resend API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    setLoading(false);
    setResendTime(30);
    setCanResend(false);

    console.log(`Verification code resent to: ${userEmail}`);
  };

  return (
    <div className="space-y-6 max-w-md">
      {/* 6-Digit Code Input */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-black mb-4">
          6 - Digit Code
        </label>
        <div className="flex gap-3 justify-between max-w-md">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-6 h-6 md:w-12 md:h-12 text-center text-lg font-semibold border-b-2 border-gray-300 focus:border-[#0066FF] focus:outline-none bg-transparent"
              disabled={loading}
            />
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      {/* Verify Button */}
      <button
        onClick={() => handleVerify()}
        disabled={loading || code.join("").length !== 6}
        className="w-full max-w-md bg-[#0E70FC] hover:bg-[#0052CC] hover:cursor-pointer disabled:bg-gray-400 text-white py-4 text-base font-medium rounded-full mb-6 transition-colors"
      >
        {loading ? "Verifying..." : "Verify Email"}
      </button>

      {/* Resend Code */}
      <div className="text-center">
        <p className="text-gray-600">
          Didn&apos;t Receive A Code?{" "}
          <button
            onClick={handleResendCode}
            disabled={!canResend || loading}
            className={`font-semibold ${
              canResend && !loading
                ? "text-[#0E70FC] hover:underline cursor-pointer"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            {canResend ? "Resend Now" : `Resend in ${resendTime}s`}
          </button>
        </p>
      </div>
    </div>
  );
}
