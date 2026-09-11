"use client";
import { AuthScreen } from "@/components/AuthScreen";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/");
  };

  return <AuthScreen onLogin={handleLogin} />;
}
