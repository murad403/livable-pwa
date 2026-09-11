"use client";

import React from "react";
import { TodayScreen } from "@/components/TodayScreen";
import { useRouter } from "next/navigation";

export default function TodayPage() {
  const router = useRouter();

  return (
    <TodayScreen
      onNavigate={(tab) => {
        if (tab === "city-tests") router.push("/city-tests");
        else if (tab === "profile") router.push("/profile");
        else if (tab === "home") router.push("/");
        else router.push("/today");
      }}
    />
  );
}
