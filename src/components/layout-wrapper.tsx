"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Script from "next/script";


export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Any routes under /auth should skip the dashboard layout
  const isAuthPage = pathname?.startsWith("/auth");

  if (isAuthPage) {
    return <>
      {children}
    </>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-white min-w-0 overflow-x-hidden">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto px-4 md:px-6">{children}</main>
      </div>
    </div>
  );
}
