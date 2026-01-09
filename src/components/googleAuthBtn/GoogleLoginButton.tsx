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
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    const loadGoogleScript = () => {
      if (document.getElementById("google-client-script")) return;

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.id = "google-client-script";
      script.onload = () => {
        if (window.google) {
          try {
            if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
              console.error("Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID");
              setError("Google Client ID is missing in environment variables.");
              return;
            }

            // Initialize OAuth2 client (popup flow, not one-tap)
            const oauthClient = window.google.accounts.oauth2.initTokenClient({
              client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
              scope: "email profile openid",
              callback: async (tokenResponse: any) => {
                if (!tokenResponse || !tokenResponse.access_token) {
                  setError("No token returned");
                  return;
                }

                console.log("Google Access Token:", tokenResponse.access_token);

                try {
                  setLoading(true);
                  // send token to backend for verification
                  const res = await API.post("/auth/google/", {
                    access_token: tokenResponse.access_token // Sent as access_token since we acquired an access token
                  });

                  console.log(res, 'backend response');

                  const data = res.data;
                  if (data) {
                    // Normalize response handling to match AuthForm
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
                  setError(apiErr.response?.data?.message || "Google Login failed on server.");
                } finally {
                  setLoading(false);
                }
              },
            });
            setClient(oauthClient);
          } catch (err) {
            console.error("Google init error:", err);
            setError("Google SDK initialization failed");
          }
        }
      };

      document.body.appendChild(script);
    };

    loadGoogleScript();
  }, []);

  const handleLoginClick = () => {
    setError("");
    if (!client) {
      setError("Google client not ready");
      return;
    }

    setLoading(true);
    try {
      client.requestAccessToken(); // <-- opens the account picker popup
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Custom SVG Google Button */}
      <button
        type="button"
        onClick={handleLoginClick}
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
      >
        {/* Your original Google SVG */}
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

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
