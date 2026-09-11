"use client";
import { HomeScreen } from "@/components/HomeScreen";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

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

