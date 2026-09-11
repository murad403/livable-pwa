"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

interface AuthScreenProps {
  onLogin: () => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [email, setEmail] = useState("your@email.com");
  const [password, setPassword] = useState("........");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-12 pb-8 bg-white max-w-md mx-auto w-full">
      {/* Top Header Section */}
      <div className="flex flex-col items-center text-center mt-6">
        {/* Brand Name */}
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 flex items-start gap-0.5">
          Livable<span className="text-sm font-normal align-top leading-none mt-1">™</span>
        </h2>

        {/* Hero Title */}
        <h1 className="text-[38px] leading-tight font-normal tracking-tight text-gray-900 mt-10">
          72 Hours in Lisbon
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-800 mt-3 font-normal">
          Your scouting trip starts here.
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="w-full space-y-5 my-auto pt-8">
        <div>
          <label className="block text-[15px] font-medium text-gray-800 mb-2">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-200 rounded-[18px] text-gray-800 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent transition-all bg-white"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-[15px] font-medium text-gray-800 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-200 rounded-[18px] text-gray-800 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent transition-all bg-white tracking-widest"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-[#FF3B30] hover:bg-[#e03126] text-white font-medium text-[15px] tracking-wider py-4 px-6 rounded-full flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-sm uppercase"
        >
          <span>LETS GET STARTED</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </form>

      {/* Footer spacer */}
      <div className="h-4" />
    </div>
  );
}
