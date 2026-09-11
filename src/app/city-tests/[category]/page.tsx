"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const categoryData: Record<string, { title: string; modules: any[] }> = {
  food: {
    title: "Daily Food Systems",
    modules: [
      {
        id: "everyday-lunch",
        code: "01",
        title: "Everyday Lunch",
      },
      {
        id: "bakery-run",
        code: "02",
        title: "Bakery Run",
      },
    ],
  },
  "free-time": {
    title: "Micro-Social Free Time",
    modules: [
      {
        id: "miradouro-hangout",
        code: "01",
        title: "Afternoon Miradouro Hangout",
      },
    ],
  },
  infrastructure: {
    title: "Practical Infrastructure",
    modules: [
      {
        id: "public-transit",
        code: "01",
        title: "Public Transit & Errands",
      },
    ],
  },
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const catKey = resolvedParams.category;
  const currentCategory = categoryData[catKey] || categoryData["food"];

  return (
    <div className="flex-1 flex flex-col px-5 pt-4 pb-8 bg-white max-w-md mx-auto w-full space-y-6">
      {/* Back Button */}
      <Link
        href="/city-tests"
        className="w-10 h-10 rounded-full bg-[#EFEFEF] flex items-center justify-center text-gray-800 hover:bg-gray-200 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 stroke-2" />
      </Link>

      {/* Header Title */}
      <div>
        <h1 className="text-[36px] leading-tight font-semibold tracking-tight text-gray-900">
          {currentCategory.title}
        </h1>
        <p className="text-[15px] leading-relaxed text-gray-700 font-normal mt-3">
          Swipe through your active city tests below. Select a module to review your field prompts, access local maps, and log your observations.
        </p>
      </div>

      {/* Modules Grid (Matches Screenshot 1) */}
      <div className="grid grid-cols-2 gap-3.5 pt-2">
        {currentCategory.modules.map((mod) => (
          <Link
            key={mod.id}
            href={`/city-tests/${catKey}/${mod.id}`}
            className="bg-[#F3F4F6] rounded-3xl p-5 block hover:bg-gray-200/80 transition-all flex-col justify-between min-h-55"
          >
            <div>
              <span className="text-[12px] font-medium text-gray-800 leading-snug block">
                {currentCategory.title}
              </span>
              <span className="text-[12px] font-medium text-gray-500 block mt-0.5">
                {mod.code}
              </span>

              <h3 className="text-[20px] font-semibold text-gray-900 leading-snug mt-3">
                {mod.title}
              </h3>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#FF3B30]">
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
