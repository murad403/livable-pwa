import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { NavigationLayout } from "@/components/NavigationLayout";
import ReduxProvider from "@/providers/ReduxProvider";
import "./globals.css";

const neueMontreal = localFont({
  src: [
    {
      path: "./fonts/NeueMontreal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Livable",
  description: "A premium, full-service relocation advisory platform helping intentional relocators plan scouting trips and streamline moving to European destinations.",
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
  themeColor: "#FE3F39",
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
    <html
      lang="en"
      className={`${neueMontreal.variable} font-sans h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400,300&display=swap"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="h-full bg-gray-100 text-gray-900 antialiased selection:bg-red-500 selection:text-white">
        <ReduxProvider>
          <NavigationLayout>{children}</NavigationLayout>
          <Toaster position="top-center" richColors />
        </ReduxProvider>
      </body>
    </html>
  );
}
