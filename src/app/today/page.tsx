"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import { useGetTodayScheduleQuery, useGetProfileQuery } from "@/redux/api/api";

export default function TodayPage() {
  const { data: user } = useGetProfileQuery();

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const todayDateStr = `${year}-${month}-${day}`;

  const { data: todayData, isLoading, isError, refetch } = useGetTodayScheduleQuery(todayDateStr);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const userName = `${user?.first_name || ""} ${user?.last_name || ""}`.trim();
  const greeting = todayData?.greeting || (userName ? `Good morning, ${userName}.` : "Good morning.");
  const subtitle = todayData?.subtitle || "Here's what's planned for today.";

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white max-w-md mx-auto w-full min-h-100">
        <Loader2 className="w-8 h-8 text-[#FF3B30] animate-spin mb-3" />
        <p className="text-sm font-medium text-gray-500">Loading today&apos;s schedule...</p>
      </div>
    );
  }

  // if (isError) {
  //   return (
  //     <div className="max-w-md mx-auto w-full flex flex-col px-5 justify-center items-center h-full">
  //       <div className="text-center py-12 text-gray-500 text-sm font-normal border border-dashed border-gray-200 rounded-3xl p-6">
  //         No schedule items found for today.
  //       </div>
  //     </div>
  //   );
  // }

  const items = todayData?.items || [];

  return (
    <div className="flex-1 flex flex-col px-5 pt-4 pb-8 bg-white max-w-md mx-auto w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[38px] leading-tight font-normal tracking-tight text-gray-900">
          {greeting}
        </h1>
        <p className="text-base text-gray-700 mt-2 font-normal">
          {subtitle}
        </p>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {items.length === 0 || isError ? (
          <div className="text-center py-12 text-gray-500 text-sm font-normal border border-dashed border-gray-200 rounded-3xl p-6">
            No schedule items found for today.
          </div>
        ) : (
          items.map((item) => {
            const description = item.details?.description || item.short_description;
            const hostName = item.details?.host_name;
            const meetingPoint = item.details?.meeting_point;

            const hasExpandableContent = item.is_expandable !== false && Boolean(description || hostName || meetingPoint);
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="border border-gray-200 rounded-3xl p-5 bg-white transition-all shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[14px] font-medium text-gray-700 pt-0.5 w-14 shrink-0">
                    {item.start_time}
                  </span>

                  <div className="flex-1 pr-2">
                    <h2 className="text-[18px] font-semibold text-gray-900 leading-snug">
                      {item.title}
                    </h2>

                    {isExpanded && (
                      <div className="mt-3 space-y-3.5 text-[14px]">
                        {description && (
                          <p className="text-gray-700 leading-relaxed">
                            {description}
                          </p>
                        )}

                        {(hostName || meetingPoint) && (
                          <div className="grid grid-cols-[60px_1fr] gap-x-2 gap-y-1 text-gray-900 font-medium">
                            {hostName && (
                              <>
                                <span className="text-gray-500 font-normal">Host</span>
                                <span>{hostName}</span>
                              </>
                            )}

                            {meetingPoint && (
                              <>
                                <span className="text-gray-500 font-normal">Meet</span>
                                <span>{meetingPoint}</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {hasExpandableContent && (
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="w-9 h-9 rounded-full bg-[#E3C7FC] flex items-center justify-center text-gray-900 shrink-0 hover:opacity-90 transition-opacity cursor-pointer"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}


