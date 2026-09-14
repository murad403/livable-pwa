import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CityTestsPage() {
  return (
    <div className="flex-1 flex flex-col px-5 pt-4 pb-8 bg-white max-w-md mx-auto w-full space-y-6">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-[32px] leading-tight font-normal tracking-tight text-gray-900 flex items-start justify-center gap-0.5">
          Livable City Tests<span className="text-xs font-normal align-top mt-1">™</span>
        </h1>
      </div>

      {/* Intro Description */}
      <div className="text-center text-[13.5px] leading-relaxed text-gray-700 space-y-3 font-normal px-1">
        <p>
          These city tests are your toolkit for active, independent discovery.
        </p>
        <p>
          They are designed to get you out into the streets to gather real information, test the local systems, and feel how each space could fit your life.
        </p>
        <p>
          Use your open time blocks to deliberately dive into the city. When you finish an outing, drop your raw impressions right into the fields.
        </p>
        <p>
          This is your chance to discover the environment on your own terms and bring your real-world questions back to the Livable team so we can discuss them together during your next session.
        </p>
      </div>

      {/* Main City Test Cards */}
      <div className="space-y-4">
        {/* Daily Food Systems Card */}
        <Link
          href="/city-tests/food"
          className="bg-[#FF3B30] text-white rounded-[28px] p-6 block hover:brightness-[0.98] transition-all shadow-xs relative flex-col justify-between min-h-40"
        >
          <div>
            <div className="flex items-start justify-between">
              <h2 className="text-[22px] font-medium tracking-tight leading-tight max-w-50">
                Daily Food Systems
              </h2>
            </div>
            <p className="text-[14px] leading-snug mt-4 opacity-95 max-w-xs font-normal">
              Try cafés, markets, bakeries, and everyday meals to discover where you could imagine eating and shopping in the city.
            </p>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#FF3B30] shadow-xs">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        </Link>

        {/* Micro-Social Free Time Card */}
        <Link
          href="/city-tests/free_time"
          className="bg-[#DFBDFF] text-gray-950 rounded-[28px] p-6 block hover:brightness-[0.98] transition-all shadow-xs relative flex-col justify-between min-h-40"
        >
          <div>
            <div className="flex items-start justify-between">
              <h2 className="text-[22px] font-medium tracking-tight leading-tight max-w-50">
                Micro-Social Free Time
              </h2>
            </div>
            <p className="text-[14px] leading-snug mt-4 opacity-95 max-w-xs font-normal">
              Test how you might spend an afternoon, a Saturday, or an evening if this became home.
            </p>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div className="w-9 h-9 rounded-full bg-gray-950 flex items-center justify-center text-white shadow-xs">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        </Link>

        {/* Practical Infrastructure Card */}
        <Link
          href="/city-tests/infrastructure"
          className="bg-[#DAF566] text-gray-950 rounded-[28px] p-6 block hover:brightness-[0.98] transition-all shadow-xs relative flex-col justify-between min-h-40"
        >
          <div>
            <div className="flex items-start justify-between">
              <h2 className="text-[22px] font-medium tracking-tight leading-tight max-w-50">
                Practical Infrastructure
              </h2>
            </div>
            <p className="text-[14px] leading-snug mt-4 opacity-95 max-w-xs font-normal">
              Run the small errands that become part of everyday life — groceries and pharmacies — and learn how the city works by trying public transit.
            </p>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div className="w-9 h-9 rounded-full bg-gray-950 flex items-center justify-center text-white shadow-xs">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        </Link>
      </div>

      {/* Staying in town longer? Section */}
      <div className="pt-2">
        <h2 className="text-[20px] font-medium text-gray-900 tracking-tight">
          Staying in town longer?
        </h2>
      </div>

      {/* Solo Discovery Micro-Tests Card */}
      <Link
        href="/micro-tests"
        className="bg-[#F5F5F7] border border-gray-100 rounded-[28px] p-5 block hover:border-gray-200 transition-all space-y-4 shadow-xs"
      >
        <div className="flex items-start justify-between">
          <h2 className="text-[18px] font-semibold text-gray-900 leading-snug">
            Solo Discovery Micro-Tests
          </h2>
          <span className="text-[12px] font-medium text-gray-500">
            Infrastructure · 1
          </span>
        </div>

        <div className="bg-white rounded-[20px] p-4 text-[13.5px] leading-relaxed text-gray-700 border border-gray-100/80">
          We&apos;ve put together these fun, low-stakes suggestions—no data logging required—to offer some creative ways to continue discovering local lifestyle rhythms, step outside your comfort zone, and experience the environment of your potential new home
        </div>

        <div className="flex justify-end pt-1">
          <div className="w-9 h-9 rounded-full bg-gray-950 flex items-center justify-center text-white shadow-xs">
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>
      </Link>
    </div>
  );
}
