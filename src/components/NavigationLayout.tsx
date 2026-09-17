"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";

export function NavigationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isStandalonePwa, setIsStandalonePwa] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkStandalone = () => {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (navigator as any).standalone ||
        document.referrer.includes("android-app://");
      setIsStandalonePwa(Boolean(isStandalone));
    };

    checkStandalone();
    window.addEventListener("resize", checkStandalone);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("Livable Service Worker registered");
          reg.update();
        })
        .catch((err) => console.log("SW error:", err));
    }

    return () => {
      window.removeEventListener("resize", checkStandalone);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const navTabs = [
    { label: "Home", href: "/", isActive: pathname === "/" },
    { label: "Today", href: "/today", isActive: pathname.startsWith("/today") },
    {
      label: "City Tests",
      href: "/city-tests",
      isActive: pathname.startsWith("/city-tests") || pathname.startsWith("/micro-tests"),
    },
    { label: "Profile", href: "/profile", isActive: pathname.startsWith("/profile") },
  ];

  const isAuthPage = pathname === "/login";

  if (isStandalonePwa) {
    return (
      <main className="h-dvh bg-white flex flex-col justify-between max-w-md mx-auto relative shadow-xl overflow-hidden font-sans">
        <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
          {children}
        </div>
        {!isAuthPage && (
          <div className="shrink-0 bg-white border-t border-gray-100 pb-[env(safe-area-inset-bottom)] z-30">
            <BottomNav />
          </div>
        )}
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-[#FF3B30] selection:text-white">
      {/* Website Top Header Bar */}
      {!isAuthPage && (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-center">
            {/* Navigation Links */}
            <nav className="flex items-center gap-1 bg-gray-100 p-1 rounded-full border border-gray-200">
              {navTabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    tab.isActive
                      ? "bg-[#FF3B30] text-white shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span>{tab.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </header>
      )}

      {/* Main Website Content Container */}
      <main className={`max-w-md w-full mx-auto bg-white rounded-none sm:rounded-3xl sm:border border-gray-200 sm:shadow-sm overflow-hidden flex flex-col relative ${!isAuthPage ? "flex-1 my-0 sm:my-6 pb-20 sm:pb-0" : "my-auto flex-none"}`}>
        <div className={`flex flex-col ${!isAuthPage ? "flex-1 py-2" : ""}`}>
          {children}
        </div>

        {/* Bottom Tab Navigation - Fixed at bottom for mobile screens, hidden on desktop and auth page */}
        {!isAuthPage && (
          <div className="fixed sm:hidden bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 pb-[env(safe-area-inset-bottom)]">
            <div className="max-w-md mx-auto">
              <BottomNav />
            </div>
          </div>
        )}
      </main>

    </div>
  );
}
