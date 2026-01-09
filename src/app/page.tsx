"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BusinessIllustration from "@/components/illustrations/BusinessIllustration";
import ProductIllustration from "@/components/illustrations/ProductIllustration";
import SocialsIllustration from "@/components/illustrations/SocialsIllustration";
import PlannerIllustration from "@/components/illustrations/PlannerIllustration";

export default function DashboardPage() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        // Fallback to "User" if name is missing or empty
        setUserName(user.name || "User");
      }
    } catch (error) {
      console.error("Failed to parse user data", error);
    }
  }, []);

  const tools = [
    {
      title: "Business Profile",
      href: "/business",
      illustration: <BusinessIllustration className="w-28 h-28" />,
    },
    {
      title: "Product Info",
      href: "/product-info",
      illustration: <ProductIllustration className="w-28 h-28" />,
    },
    {
      title: "Socials",
      href: "/socials",
      illustration: <SocialsIllustration className="w-28 h-28" />,
    },
    {
      title: "Planner",
      href: "/planner",
      illustration: <PlannerIllustration className="w-28 h-28" />,
    },
  ];

  return (
    <div className="px-8 py-10 max-w-7xl mx-auto h-full flex flex-col min-w-0 overflow-hidden">
      {/* Header Section */}
      <div className="mb-12 flex-shrink-0">
        <p className="text-gray-500 font-medium mb-1">My Workspace</p>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Good morning, {userName}</h1>
      </div>

      {/* Single Row Grid Section - No Scrollbar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {tools.map((tool, index) => (
          <Link key={index} href={tool.href} className="flex flex-col items-center gap-3 group cursor-pointer w-full">
            {/* Card Box - Illustration */}
            <div
              className="flex items-center justify-center w-full aspect-square rounded-[1.75rem] bg-gray-50 group-hover:bg-white border border-gray-100/50 group-hover:border-gray-200 group-hover:shadow-lg transition-all duration-300"
            >
              <div className="p-4 transition-transform duration-300 group-hover:scale-110">
                {tool.illustration}
              </div>
            </div>

            {/* Text Outside */}
            <h3 className="text-sm font-medium text-gray-700 group-hover:text-black text-center transition-colors">
              {tool.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
