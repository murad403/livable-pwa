"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";
import { Download, CheckCircle2 } from "lucide-react";

export function NavigationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isStandalonePwa, setIsStandalonePwa] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);

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

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
      } catch (err) {
        setShowInstallModal(true);
      }
    } else {
      setShowInstallModal(true);
    }
  };

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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FF3B30] text-white font-bold flex items-center justify-center text-base">
              L
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900 leading-none">
              Livable<span className="text-xs font-normal align-top">™</span>
            </h1>
          </Link>

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

          {/* PWA Download Button */}
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-1.5 bg-[#FF3B30] hover:bg-[#e03126] text-white font-medium px-4 py-2 rounded-full text-xs transition-all shadow-xs cursor-pointer active:scale-95 ml-2"
            title="Download & Install App (PWA)"
          >
            {isInstalled ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>App Installed</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 stroke-[2.2]" />
                <span className="hidden sm:inline font-semibold">Install App (PWA)</span>
                <span className="sm:hidden font-semibold">Install</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Website Content Container */}
      <main className={`flex-1 max-w-md w-full mx-auto bg-white my-0 sm:my-6 sm:rounded-3xl sm:border border-gray-200 sm:shadow-sm overflow-hidden flex flex-col relative ${!isAuthPage ? "pb-20 sm:pb-0" : ""}`}>
        <div className="flex-1 flex flex-col py-2">
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

      {/* PWA Install Instructions Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FF3B30] text-white font-bold flex items-center justify-center text-sm">
                  L
                </div>
                <h3 className="font-bold text-gray-900 text-lg">
                  Install Livable™ PWA
                </h3>
              </div>
              <button
                onClick={() => setShowInstallModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              To install this Progressive Web App on your mobile device or computer home screen:
            </p>

            <div className="space-y-2 text-xs">
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 space-y-1">
                <span className="font-bold text-gray-900 block">📱 iPhone / iPad (Safari)</span>
                <p className="text-gray-600">Tap the <span className="font-bold text-gray-900">Share icon</span> at the bottom, then scroll and select <span className="font-bold text-gray-900">&quot;Add to Home Screen&quot;</span>.</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 space-y-1">
                <span className="font-bold text-gray-900 block">🤖 Android (Chrome / Brave)</span>
                <p className="text-gray-600">Tap the <span className="font-bold text-gray-900">3-dots menu</span> top right, then select <span className="font-bold text-gray-900">&quot;Install App&quot;</span> or <span className="font-bold text-gray-900">&quot;Add to Home screen&quot;</span>.</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 space-y-1">
                <span className="font-bold text-gray-900 block">💻 Desktop (Chrome / Edge)</span>
                <p className="text-gray-600">Click the <span className="font-bold text-gray-900">Install icon ⊕</span> on the right side of your browser address bar above.</p>
              </div>
            </div>

            <button
              onClick={() => setShowInstallModal(false)}
              className="w-full bg-[#FF3B30] text-white font-medium py-3 rounded-full text-xs hover:bg-[#e03126] transition-all"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
