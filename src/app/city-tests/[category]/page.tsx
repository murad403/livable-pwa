"use client";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, MoveRight } from "lucide-react";
import { useGetCityTestCategoryQuery } from "@/redux/api/api";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const catKey = resolvedParams.category;

  const { data: categoryData, isLoading, isError, refetch } = useGetCityTestCategoryQuery(catKey);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white max-w-md mx-auto w-full min-h-100">
        <Loader2 className="w-8 h-8 text-[#FF3B30] animate-spin mb-3" />
        <p className="text-sm font-medium text-title">Loading category tests...</p>
      </div>
    );
  }

  if (isError || !categoryData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white max-w-md mx-auto w-full min-h-100 text-center space-y-4">
        <p className="text-sm font-medium text-red-600">Failed to load category details.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-[#FF3B30] text-white text-xs font-semibold rounded-full hover:bg-primary-hover transition-all cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  const tests = categoryData.tests || [];

  return (
    <div className="flex-1 flex flex-col px-5 pt-4 pb-8 bg-white max-w-md mx-auto w-full space-y-6">
      {/* Back Button */}
      <Link
        href="/city-tests"
        className="w-10 h-10 rounded-full bg-[#EFEFEF] flex items-center justify-center text-title hover:bg-gray-200 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 stroke-2" />
      </Link>

      {/* Header Title & Description */}
      <div>
        <h1 className="text-[36px] leading-tight font-medium tracking-tight text-title">
          {categoryData.name}
        </h1>
        {categoryData.description && (
          <p className="text-xl leading-relaxed text-title font-medium mt-3">
            {categoryData.description}
          </p>
        )}
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-2 gap-3.5 pt-2">
        {tests.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-title text-sm font-normal border border-dashed border-gray-200 rounded-3xl">
            No tests available in this category.
          </div>
        ) : (
          tests.map((mod, idx) => {
            const codeStr = mod.order ? String(mod.order).padStart(2, "0") : String(idx + 1).padStart(2, "0");

            return (
              <Link
                key={mod.id}
                href={`/city-tests/${catKey}/${mod.id}`}
                className="bg-[#F3F4F6] rounded-3xl p-5 flex flex-col justify-between hover:bg-gray-200/80 transition-all min-h-55 relative group"
              >
                <div>
                  <span className="text-base font-medium text-title leading-snug block">
                    {categoryData.name}
                  </span>
                  <span className="text-sm font-medium text-title block mt-0.5">
                    {codeStr}
                  </span>

                  <h3 className="text-xl font-medium text-title leading-snug mt-3">
                    {mod.title}
                  </h3>
                </div>

                <div className="flex items-center justify-end pt-4">
                  {/* {mod.is_completed ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </span>
                  ) : (
                    <div />
                  )} */}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#FF3B30] group-hover:translate-x-0.5 transition-transform">
                    <MoveRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

