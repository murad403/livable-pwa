import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { NavigationLayout } from "@/components/NavigationLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Livable™ — 72 Hours in Lisbon",
  description: "Your scouting trip starts here. Test ordinary life in Lisbon.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Livable",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${inter.className}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="h-full bg-gray-100 text-gray-900 antialiased selection:bg-red-500 selection:text-white">
        <NavigationLayout>{children}</NavigationLayout>
      </body>
    </html>
  );
}
