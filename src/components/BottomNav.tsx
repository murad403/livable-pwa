"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Compass, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    {
      id: "home",
      label: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/" || pathname === "",
    },
    {
      id: "today",
      label: "Today",
      href: "/today",
      icon: Calendar,
      isActive: pathname.startsWith("/today"),
    },
    {
      id: "city-tests",
      label: "City Tests",
      href: "/city-tests",
      icon: Compass,
      isActive: pathname.startsWith("/city-tests") || pathname.startsWith("/micro-tests"),
    },
    {
      id: "profile",
      label: "Profile",
      href: "/profile",
      icon: User,
      isActive: pathname.startsWith("/profile"),
    },
  ];

  return (
    <div className="w-full bg-white border-t border-gray-100 px-3 py-2 flex items-center justify-around z-30">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`flex flex-col items-center justify-center py-1 px-4 rounded-2xl transition-all duration-200 ${
              tab.isActive
                ? "text-[#FF3B30]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <div
              className={`p-1.5 rounded-xl transition-all duration-200 ${
                tab.isActive && tab.id === "home"
                  ? "bg-[#FFF0F0]"
                  : ""
              }`}
            >
              <Icon
                className={`w-6 h-6 stroke-[1.8] ${
                  tab.isActive ? "text-[#FF3B30]" : "text-gray-600"
                }`}
              />
            </div>
            <span
              className={`text-[12px] font-medium mt-0.5 ${
                tab.isActive ? "text-[#FF3B30] font-semibold" : "text-gray-600"
              }`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
