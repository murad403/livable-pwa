"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex-1 flex flex-col px-5 pt-4 pb-8 bg-white max-w-md mx-auto w-full space-y-6">
      {/* Top Header */}
      <div>
        <p className="text-sm font-medium text-gray-700">Day 2 — Friday 21 August</p>
        <h1 className="text-[40px] leading-tight font-normal tracking-tight text-gray-900 mt-1">
          Hello, Sarah
        </h1>
      </div>

      {/* Today Card */}
      <div className="bg-[#DAF566] rounded-[28px] p-6 text-gray-900 flex flex-col justify-between shadow-sm">
        <div>
          <h2 className="text-[26px] font-semibold tracking-tight text-gray-900 mb-2">
            Today
          </h2>
          <p className="text-[15px] leading-snug text-gray-950 font-normal max-w-xs">
            View your schedule, team meetings, recommendations, and open time.
          </p>
        </div>

        <Link
          href="/today"
          className="mt-6 w-full py-3.5 px-6 rounded-full border border-gray-950 bg-transparent text-gray-950 font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-black/5 transition-all group"
        >
          <span>Open Today</span>
          <div className="w-6 h-6 rounded-full bg-gray-950 flex items-center justify-center text-white transition-transform group-hover:translate-x-0.5">
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </Link>
      </div>

      {/* City Tests Card */}
      <div className="bg-[#DFBDFF] rounded-[28px] p-6 text-gray-900 flex flex-col justify-between shadow-sm">
        <div>
          <h2 className="text-[26px] font-semibold tracking-tight text-gray-900 mb-2">
            City Tests
          </h2>
          <p className="text-[15px] leading-snug text-gray-950 font-normal">
            Use your open time to test ordinary life in the city.
          </p>

          {/* Progress Section */}
          <div className="mt-5 space-y-1.5">
            <span className="text-[13px] font-medium text-gray-800">
              10% Completed
            </span>
            <div className="w-full h-1.5 bg-gray-900/15 rounded-full overflow-hidden">
              <div className="h-full w-[10%] bg-gray-950 rounded-full" />
            </div>
          </div>
        </div>

        <Link
          href="/city-tests"
          className="mt-6 w-full py-3.5 px-6 rounded-full border border-gray-950 bg-transparent text-gray-950 font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-black/5 transition-all group"
        >
          <span>Open City Tests</span>
          <div className="w-6 h-6 rounded-full bg-gray-950 flex items-center justify-center text-white transition-transform group-hover:translate-x-0.5">
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </Link>
      </div>
    </div>
  );
}


