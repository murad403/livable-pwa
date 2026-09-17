"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useGetProfileQuery } from "@/redux/api/api";

export default function Page() {
  const { data: user } = useGetProfileQuery();
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const dateStr = new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    setFormattedDate(`Day 2 — ${dateStr}`);
  }, []);

  const userName = `${user?.first_name} ${user?.last_name}`;

  return (
    <div className="flex-1 flex flex-col px-5 pt-4 pb-8 bg-white max-w-md mx-auto w-full space-y-6">
      {/* Top Header */}
      <div>
        <p className="text-sm font-medium text-title">
          {formattedDate}
        </p>
        <h1 className="text-[48px] leading-tight font-normal tracking-tight text-title mt-1">
          Hello, {userName}
        </h1>
      </div>

      {/* Today Card */}
      <div className="bg-brand-lime rounded-2xl p-6 text-title flex flex-col justify-between shadow-sm">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-title mb-2">
            Today
          </h2>
          <p className="text-base leading-snug text-title font-normal max-w-xs">
            View your schedule, team meetings, recommendations, and open time.
          </p>
        </div>

        <Link
          href="/today"
          className="mt-6 w-full py-3.5 px-6 rounded-full border border-title bg-transparent text-title font-medium text-base flex items-center justify-center gap-2 hover:bg-black/5 transition-all group"
        >
          <span>Open Today</span>
          <div className="w-6 h-6 rounded-full bg-title flex items-center justify-center text-white transition-transform group-hover:translate-x-0.5">
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </Link>
      </div>

      {/* City Tests Card */}
      <div className="bg-brand-purple rounded-2xl p-6 text-title flex flex-col justify-between shadow-sm">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-title mb-2">
            City Tests
          </h2>
          <p className="text-base leading-snug text-title font-normal">
            Use your open time to test ordinary life in the city.
          </p>

          {/* Progress Section */}
          {/* <div className="mt-5 space-y-1.5">
            <span className="text-[13px] font-medium text-gray-800">
              10% Completed
            </span>
            <div className="w-full h-1.5 bg-title/15 rounded-full overflow-hidden">
              <div className="h-full w-[10%] bg-title rounded-full" />
            </div>
          </div> */}
        </div>

        <Link
          href="/city-tests"
          className="mt-6 w-full py-3.5 px-6 rounded-full border border-title bg-transparent text-title font-medium text-base flex items-center justify-center gap-2 hover:bg-black/5 transition-all group"
        >
          <span>Open City Tests</span>
          <div className="w-6 h-6 rounded-full bg-title flex items-center justify-center text-white transition-transform group-hover:translate-x-0.5">
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </Link>
      </div>
    </div>
  );
}


