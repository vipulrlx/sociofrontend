"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const PUBLIC_ROUTES = ["/auth"]; // pages that don’t need login

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true); // loading state
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const token = localStorage.getItem("accessToken");
    const userStr = localStorage.getItem("user");
    let initialSetup = "0";

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        // Default to "0" if missing, meaning assumed complete or not required unless explicitly "1"
        initialSetup = user.initialsetup ? String(user.initialsetup) : "0";
      } catch (e) {
        console.error("Error parsing user data");
      }
    }

    if (!token) {
      // Not logged in
      if (!PUBLIC_ROUTES.includes(pathname)) {
        router.replace("/auth");
      } else {
        setChecking(false);
      }
    } else {
      // Logged in
      if (initialSetup === "1") {
        // Must complete onboarding
        if (pathname !== "/brand-onboarding") {
          router.replace("/brand-onboarding");
        } else {
          setChecking(false);
        }
      } else {
        // Onboarding complete (initialSetup is "0", "2", etc.)
        if (pathname === "/brand-onboarding") {
          // Prevent re-entry to onboarding
          router.replace("/");
        } else if (PUBLIC_ROUTES.includes(pathname)) {
          // If on auth page but logged in, go home
          router.replace("/");
        } else {
          // Allowed access to protected pages
          setChecking(false);
        }
      }
    }
  }, [pathname, router, mounted]);

  // Prevent hydration mismatch by not rendering anything until mounted
  if (!mounted) return null;

  if (checking) {
    // You can show a spinner or blank screen while checking auth
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
