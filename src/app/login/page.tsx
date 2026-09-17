"use client";
import { useState } from "react";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLoginMutation } from "@/redux/api/api";
import { saveToken } from "@/utils/auth";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const [login, { isLoading }] = useLoginMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      // email: "mahmudtasin028@gmail.com",
      // password: "newpassword123",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setApiError(null);
    try {
      const res = await login(data).unwrap();

      if (res?.access && res?.refresh) {
        await saveToken(res.access, res.refresh);
        router.push("/");
        router.refresh();
      } else {
        setApiError("Authentication failed. Invalid response from server.");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      const errorMessage =
        err?.data?.detail ||
        err?.data?.message ||
        err?.data?.non_field_errors?.[0] ||
        "Invalid email or password. Please try again.";
      setApiError(errorMessage);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-12 pb-8 bg-white max-w-md mx-auto w-full">
      {/* Top Header Section */}
      <div className="flex flex-col items-center text-center mt-6">
        {/* Brand Name */}
        <h2 className="text-3xl font-semibold tracking-tight text-title flex items-start gap-0.5">
          Livable™
        </h2>

        {/* Hero Title */}
        <h1 className="text-[38px] leading-tight font-normal tracking-tight text-title mt-10">
          72 Hours in Lisbon
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-title mt-3 font-normal">
          Your scouting trip starts here.
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 my-auto pt-8">
        {apiError && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-[18px] text-red-600 text-xs flex items-center gap-2 font-medium animate-in fade-in-50">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{apiError}</span>
          </div>
        )}

        <div>
          <label className="block text-[15px] font-medium text-title mb-2">
            Email address
          </label>
          <input
            type="email"
            {...register("email")}
            disabled={isLoading}
            className={`w-full px-4 py-3.5 border rounded-[18px] text-title text-[15px] focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent transition-all bg-white ${errors.email ? "border-red-500 bg-red-50/20" : "border-gray-200"
              }`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-[15px] font-medium text-title mb-2">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            disabled={isLoading}
            className={`w-full px-4 py-3.5 border rounded-[18px] text-title text-[15px] focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent transition-all bg-white tracking-widest ${errors.password ? "border-red-500 bg-red-50/20" : "border-gray-200"
              }`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>SIGNING IN...</span>
            </>
          ) : (
            <>
              <span>LET&apos;S GET STARTED</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
