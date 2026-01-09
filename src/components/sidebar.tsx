"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Briefcase,
  Info,
  Share2,
  Calendar,
} from "lucide-react";

const navItems = [
  { label: "Business Profile", href: "/business", icon: <Briefcase size={18} /> },
  { label: "Product Info", href: "/product-info", icon: <Info size={18} /> },
  { label: "Socials", href: "/socials", icon: <Share2 size={18} /> },
  { label: "Planner", href: "/planner", icon: <Calendar size={18} /> },
];


const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Default Brand";
const brandLogo = process.env.NEXT_PUBLIC_BRAND_LOGO || "/next.svg";


export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 shrink-0 bg-main-content border-r border-border flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <div className="flex flex-col items-center justify-center px-4 py-4 space-y-3">
          <span className="font-bold text-lg text-primary">{brandName}</span>

        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-6">
          {/* Main Links (Home & Settings) */}
          <div className="space-y-1">
            <Link
              href="/"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === "/"
                ? "text-success bg-success/10"
                : "text-secondary hover:text-primary hover:bg-gray-100"
                }`}
            >
              <LayoutDashboard size={18} />
              Home
            </Link>
            <Link
              href="/settings"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === "/settings"
                ? "text-success bg-success/10"
                : "text-secondary hover:text-primary hover:bg-gray-100"
                }`}
            >
              <Settings size={18} />
              Settings
            </Link>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-secondary mb-2">PLAYGROUND</h4>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === item.href
                  ? "text-success bg-success/10"
                  : "text-secondary hover:text-primary hover:bg-gray-100"
                  }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Bottom Empty Space */}
      <div className="p-4 text-xs text-gray-400 text-center">
        {/* you can put footer/help text here if needed */}
      </div>
    </aside>
  );
}
