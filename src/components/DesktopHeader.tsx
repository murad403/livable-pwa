"use client";

import { useEffect, useState } from "react";
import { Smartphone, Monitor } from "lucide-react";
import { TabType } from "./BottomNav";

interface DesktopHeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  viewMode: "mobile-frame" | "desktop-wide";
  setViewMode: (mode: "mobile-frame" | "desktop-wide") => void;
  isLoggedIn: boolean;
}

export function DesktopHeader({
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
  isLoggedIn,
}: DesktopHeaderProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

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

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        "To install Livable PWA on your device:\n\n• On iOS: Tap Share icon -> 'Add to Home Screen'\n• On Chrome/Android: Click 3-dots menu -> 'Install App'"
      );
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Tab Links for Desktop Wide View */}
        {isLoggedIn && (
          <nav className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-full border border-gray-200">
            {[
              { id: "home", label: "Home" },
              { id: "today", label: "Today Timeline" },
              { id: "city-tests", label: "City Tests" },
              { id: "profile", label: "Profile" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#FF3B30] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        )}

        {/* Layout Switcher (Mobile Mock vs Desktop Wide) */}
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 p-1 rounded-lg border border-gray-200 flex items-center gap-1">
            <button
              onClick={() => setViewMode("mobile-frame")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === "mobile-frame"
                  ? "bg-white text-gray-900 shadow-xs border border-gray-200"
                  : "text-gray-500 hover:text-gray-800"
              }`}
              title="Mobile Device App View"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#FF3B30]" />
              <span className="hidden sm:inline">Mobile PWA Frame</span>
            </button>

            <button
              onClick={() => setViewMode("desktop-wide")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === "desktop-wide"
                  ? "bg-white text-gray-900 shadow-xs border border-gray-200"
                  : "text-gray-500 hover:text-gray-800"
              }`}
              title="Wide Web View"
            >
              <Monitor className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Web Desktop View</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
