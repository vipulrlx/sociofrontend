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

    if (!token && !PUBLIC_ROUTES.includes(pathname)) {
      router.replace("/auth"); // replace avoids back button flicker
    } else if (token && PUBLIC_ROUTES.includes(pathname)) {
      router.replace("/"); // already logged in, push to dashboard
    } else {
      setChecking(false); // safe to render children
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
