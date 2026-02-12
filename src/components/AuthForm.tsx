"use client";

import { Phone, Lock, Mail, KeyRound, User } from "lucide-react";
import { useState } from "react";
import API from "@/lib/axios"; // axios instance
import GoogleLoginButton from "./googleAuthBtn/GoogleLoginButton";
// ForgotPassword component is hidden to follow strictly given docs

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Default Brand";
const brandLogo = process.env.NEXT_PUBLIC_BRAND_LOGO || "/next.svg";

interface AuthFormProps {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export default function AuthForm({ isLogin, setIsLogin }: AuthFormProps) {
  const [activeMethod, setActiveMethod] = useState("magic"); // "magic" = OTP, "password"

  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // OTP login states
  const [contactNumber, setContactNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState(""); // comes from sendotp response
  const [otpSent, setOtpSent] = useState(false);

  // Signup states
  const [name, setName] = useState("");
  const [signupContactNumber, setSignupContactNumber] = useState("");
  const [category, setCategory] = useState("student");
  const [countryCode, setCountryCode] = useState("+91");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Password Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeMethod === "password") {
      setLoading(true);
      setError("");

      try {
        const { data } = await API.post("auth/login/", { email, password });
        if (!data.success) throw new Error(data.message || "Login failed");

        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user?.initialsetup === "1") {
          window.location.href = "/brand-onboarding";
        } else {
          window.location.href = "/";
        }
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Login failed");
      } finally {
        setLoading(false);
      }
    }
  };

  // Send OTP
  const handleSendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await API.post("auth/sendotp/", {
        contactnumber: contactNumber,
      });

      if (!data.success) throw new Error(data.message || "OTP sending failed");

      setUsername(data.username);
      setOtpSent(true);
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "OTP sending failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await API.post("auth/loginviaotp/", {
        contact_number: contactNumber,
        username,
        otp,
      });

      if (!data.success) throw new Error(data.message || "OTP verification failed");

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user?.initialsetup === "1") {
        window.location.href = "/brand-onboarding";
      } else {
        window.location.href = "/";
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // Register (Signup)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await API.post("auth/register/", {
        category,
        name,
        email,
        password,
        contact_number: signupContactNumber,
        country_code: countryCode,
      });

      if (!data.success) throw new Error(data.message || "Signup failed");

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user?.initialsetup === "1") {
        window.location.href = "/brand-onboarding";
      } else {
        window.location.href = "/";
      }
    } catch (err: any) {
      const errorData = err.response?.data;
      let errorMessage = "Signup failed";

      if (errorData) {
        if (typeof errorData === "string") {
          errorMessage = errorData;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (typeof errorData === "object") {
          // Handle DRF validation errors like {"email": ["already exists"]}
          errorMessage = Object.entries(errorData)
            .map(([field, msgs]: [string, any]) => `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`)
            .join(" | ");
        }
      } else {
        errorMessage = err.message || "Signup failed";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="px-6 py-4">
        <h1 className="text-[17px] font-semibold mb-1 text-gray-900">
          {isLogin ? `Login to ${brandName}` : `Sign up to ${brandName}`}
        </h1>

        <p className="text-dimmed">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <a
            onClick={() => setIsLogin(!isLogin)}
            className="link-login-signup font-medium hover:underline cursor-pointer"
          >
            {isLogin ? "Sign up" : "Login"}
          </a>
        </p>
      </div>

      {/* Auth Methods Toggle (only for login) */}
      {isLogin && (
        <div className="px-6">
          <div className="relative flex bg-gray-100 rounded-lg p-1">
            <span
              className={`absolute top-1 bottom-1 w-[calc(50%-0.5rem)] bg-white rounded-md shadow-sm transition-transform duration-300 ease-in-out ${activeMethod === "magic"
                ? "translate-x-0"
                : "translate-x-[calc(100%+0.5rem)]"
                }`}
            />

            <button
              type="button"
              onClick={() => {
                setActiveMethod("magic");
                setOtpSent(false);
                setOtp("");
              }}
              className={`relative z-10 flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeMethod === "magic" ? "text-gray-900" : "text-gray-600"
                }`}
            >
              OTP
            </button>

            <button
              type="button"
              onClick={() => setActiveMethod("password")}
              className={`relative z-10 flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeMethod === "password" ? "text-gray-900" : "text-gray-600"
                }`}
            >
              Password
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      <form
        className="px-6 py-4"
        onSubmit={isLogin ? handleLogin : handleRegister}
      >
        <div className="space-y-4">
          {isLogin ? (
            <>
              {activeMethod === "password" ? (
                <>
                  {/* Login Fields */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* OTP Method */}
                  {!otpSent ? (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
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
                </>
              )}
            </>
          ) : (
            <>
              {/* Signup Fields (Strictly 7 fields) */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="student">Student</option>
                  <option value="professional">Professional</option>
                  <option value="business">Business</option>
                  <option value="employee">Employee</option>
                </select>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>


              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  placeholder="Contact Number"
                  value={signupContactNumber}
                  onChange={(e) => setSignupContactNumber(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 pl-3 text-sm font-medium">+</span>
                </div>
                <input
                  type="text"
                  placeholder="Country Code (e.g. 91)"
                  value={countryCode.startsWith('+') ? countryCode.slice(1) : countryCode}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    setCountryCode('+' + val);
                  }}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Submit buttons */}
          {isLogin && activeMethod === "magic" ? (
            !otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="btn-color w-full text-white py-2 px-4 rounded-lg font-medium transition-colors mt-4"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={loading}
                className="btn-color w-full text-white py-2 px-4 rounded-lg font-medium transition-colors mt-4"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            )
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="btn-color w-full text-white py-2 px-4 rounded-lg font-medium transition-colors mt-4"
            >
              {loading ? "Loading..." : isLogin ? "Sign in" : "Sign up"}
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="relative flex items-center my-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Google Sign In */}
        <GoogleLoginButton />

        {!isLogin && (
          <p className="text-sm text-gray-500 mt-6">
            By continuing, you agree to the Terms of Service and Privacy Policy
          </p>
        )}
      </form>
    </>
  );
}
