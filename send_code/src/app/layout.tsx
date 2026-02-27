import "./globals.css";
import LayoutWrapper from "@/components/layout-wrapper";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "Ocoya Dashboard",
  description: "Social Media Dashboard built with Next.js + Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900">
        {/* Protect everything except login/signup */}
        <ProtectedRoute>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ProtectedRoute>
      </body>
    </html>
  );
}
