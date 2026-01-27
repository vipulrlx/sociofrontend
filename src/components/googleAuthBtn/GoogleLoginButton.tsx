"use client";
import { useEffect, useState } from "react";
import API from "@/lib/axios";

declare global {
  interface Window {
    google?: any;
  }
}

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGoogleScript = () => {
      // If script is already loaded, try to initialize/render if possible
      if (typeof window !== 'undefined' && window.google?.accounts?.id && document.getElementById("google-client-script")) {
        initializeGoogle();
        return;
      }

      if (document.getElementById("google-client-script")) return;

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.id = "google-client-script";
      script.onload = () => {
        initializeGoogle();
      };

      document.body.appendChild(script);
    };

    const initializeGoogle = () => {
      if (!window.google?.accounts?.id) {
        return;
      }
      if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        setError("Google Client ID is missing.");
        return;
      }

      try {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        const buttonDiv = document.getElementById("google-sign-in-button");
        if (buttonDiv) {
          window.google.accounts.id.renderButton(buttonDiv, {
            theme: "outline",
            size: "large",
            width: "100%"
          });
        }
      } catch (err) {
        console.error("Google Init Error:", err);
      }
    };

    loadGoogleScript();
  }, []);

  const handleCredentialResponse = async (response: any) => {
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/google/", {
        id_token: response.credential
      });

      const data = res.data;
      if (data) {
        const accessToken = data.access || data.key || data.token || data.jwt;
        const refreshToken = data.refresh;
        const userData = data.user;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
          if (userData) localStorage.setItem("user", JSON.stringify(userData));

          window.location.href = "/";
        } else {
          setError("Login successful but no access token received.");
        }
      }
    } catch (apiErr: any) {
      console.error("Backend auth error:", apiErr);
      const errorData = apiErr.response?.data;
      const errorMessage = errorData?.message ||
        (typeof errorData === 'object' ? JSON.stringify(errorData) : String(errorData)) ||
        "Google Login failed on server.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* 
        This is the "trick":
        1. Render the Google Button (opacity 0) absolutely positioned over the container.
        2. Render the Custom Button (visible) below it.
        When user clicks, they are actually clicking the Google Button iframe.
      */}
      <div
        id="google-sign-in-button"
        className="absolute inset-0 z-50"
        style={{ height: "100%", opacity: 0.01, cursor: "pointer" }}
      ></div>

      {/* Visual Custom Button (Not clickable directly, just for looks) */}
      <button
        type="button"
        className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition pointer-events-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="24px"
          height="24px"
        >
          <path
            fill="#4285F4"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.61 30.47 0 24 0 14.64 0 6.63 5.46 2.69 13.41l7.98 6.19C12.43 13.04 17.74 9.5 24 9.5z"
          />
          <path
            fill="#34A853"
            d="M46.13 24.5c0-1.57-.14-3.08-.39-4.5H24v9h12.59c-.54 2.9-2.13 5.36-4.49 7.04l7.02 5.45C43.72 37.58 46.13 31.43 46.13 24.5z"
          />
          <path
            fill="#FBBC05"
            d="M10.67 28.59c-.48-1.39-.75-2.87-.75-4.59s.27-3.2.75-4.59l-7.98-6.19C.95 16.64 0 20.19 0 24c0 3.81.95 7.36 2.69 10.78l7.98-6.19z"
          />
          <path
            fill="#EA4335"
            d="M24 48c6.47 0 11.9-2.14 15.87-5.82l-7.02-5.45c-2 1.36-4.53 2.17-8.85 2.17-6.26 0-11.57-3.54-13.33-8.09l-7.98 6.19C6.63 42.54 14.64 48 24 48z"
          />
        </svg>
        <span className="text-gray-700 font-medium">
          {loading ? "Loading..." : "Continue with Google"}
        </span>
      </button>

      {error && <p className="text-red-500 text-sm mt-2 text-center break-words">{error}</p>}
    </div>
  );
}
