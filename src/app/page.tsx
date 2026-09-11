"use client";

import React, { useState } from "react";
import { AuthScreen } from "@/components/AuthScreen";
import { HomeScreen } from "@/components/HomeScreen";
import { useRouter } from "next/navigation";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  if (!isLoggedIn) {
    return <AuthScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <HomeScreen
      onNavigate={(tab) => {
        if (tab === "today") router.push("/today");
        else if (tab === "city-tests") router.push("/city-tests");
        else if (tab === "profile") router.push("/profile");
        else router.push("/");
      }}
    />
  );
}
