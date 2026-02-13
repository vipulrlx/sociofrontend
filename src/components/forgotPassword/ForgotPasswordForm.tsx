"use client";

import { useState } from "react";
import { Mail, KeyRound } from "lucide-react";
import API from "@/lib/axios";

interface ForgotPasswordFormProps {
  onBack: () => void; // go back to login form
}

export default function ForgotPasswordForm({ onBack }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Send OTP
  const handleSendOtp = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const { data } = await API.post("auth/forgot-password/", { email });
      if (!data.success) throw new Error(data.message || "Failed to send OTP");

      setOtpSent(true);
      setSuccess("OTP sent to your registered email.");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const { data } = await API.post("auth/verify-forgot-otp/", { email, otp });
      if (!data.success) throw new Error(data.message || "OTP verification failed");

      setSuccess("OTP verified successfully. You can now reset your password.");
      // you may redirect to reset-password page here
    } catch (err: any) {
      const errorData = err.response?.data;
      let errorMessage = "OTP verification failed";
      if (errorData) {
        if (typeof errorData === "object") {
          errorMessage = Object.entries(errorData)
            .map(([field, msgs]: [string, any]) => `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`)
            .join(" | ");
        } else {
          errorMessage = String(errorData);
        }
      } else {
        errorMessage = err.message || "OTP verification failed";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-4">
      <h1 className="text-[17px] font-semibold mb-1 text-gray-900">Forgot Password</h1>
      <p className="text-dimmed text-sm mb-4">Enter your registered email to reset password</p>

      <div className="space-y-4">
        {!otpSent ? (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ) : (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyRound size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        {/* Error/Success messages */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        {/* Buttons */}
        {!otpSent ? (
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={loading}
            className="btn-color w-full text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={loading}
            className="btn-color w-full text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        )}

        <button
          type="button"
          onClick={onBack}
          className="w-full text-gray-600 text-sm mt-3 hover:underline"
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
}
