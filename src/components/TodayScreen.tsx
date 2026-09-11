"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronUp, ChevronDown, ExternalLink } from "lucide-react";
import { TabType } from "./BottomNav";

interface TodayScreenProps {
  onNavigate: (tab: TabType) => void;
}

export function TodayScreen({ onNavigate }: TodayScreenProps) {
  const [expandedId, setExpandedId] = useState<string | null>("09:00");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex-1 flex flex-col px-5 pt-4 pb-8 bg-white max-w-md mx-auto w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[38px] leading-tight font-normal tracking-tight text-gray-900">
          Good morning, Sarah.
        </h1>
        <p className="text-base text-gray-700 mt-2 font-normal">
          Here&apos;s what&apos;s planned for today.
        </p>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {/* Card 1: 09:00 Neighborhood Guide */}
        <div className="border border-gray-200 rounded-3xl p-5 bg-white transition-all shadow-xs">
          <div className="flex items-start justify-between">
            <span className="text-[14px] font-medium text-gray-700 pt-0.5 w-14">
              09:00
            </span>

            <div className="flex-1 pr-2">
              <h2 className="text-[18px] font-semibold text-gray-900 leading-snug">
                Neighborhood Guide
              </h2>

              {expandedId === "09:00" && (
                <div className="mt-3 space-y-3.5 text-[14px]">
                  <p className="text-gray-700 leading-relaxed">
                    A walking orientation through the Príncipe Real and Santos
                    neighborhoods with your Livable host.
                  </p>

                  <div className="grid grid-cols-[60px_1fr] gap-x-2 gap-y-1 text-gray-900 font-medium">
                    <span className="text-gray-500 font-normal">Host</span>
                    <span>Ana Ferreira</span>

                    <span className="text-gray-500 font-normal">Meet</span>
                    <span>Jardim das Amoreiras entrance</span>
                  </div>

                  <a
                    href="https://maps.google.com/?q=Jardim+das+Amoreiras+Lisbon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gray-900 underline font-medium text-[14px] hover:text-black mt-1"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 no-underline opacity-70" />
                  </a>
                </div>
              )}
            </div>

            <button
              onClick={() => toggleExpand("09:00")}
              className="w-9 h-9 rounded-full bg-[#E3C7FC] flex items-center justify-center text-white shrink-0 hover:opacity-90 transition-opacity"
              aria-label="Toggle details"
            >
              {expandedId === "09:00" ? (
                <ChevronUp className="w-5 h-5 stroke-[2.5]" />
              ) : (
                <ChevronDown className="w-5 h-5 stroke-[2.5]" />
              )}
            </button>
          </div>
        </div>

        {/* Card 2: 12:30 Lunch Recommendation */}
        <div className="border border-gray-200 rounded-3xl p-5 bg-white flex items-center justify-between shadow-xs hover:border-gray-300 transition-all">
          <span className="text-[14px] font-medium text-gray-700 w-14">
            12:30
          </span>
          <div className="flex-1 pr-2">
            <h2 className="text-[17px] font-semibold text-gray-900 leading-snug">
              Lunch Recommendation
            </h2>
            <p className="text-[14px] text-gray-600 font-normal mt-0.5">
              La Cocina del Mar
            </p>
          </div>
          <button className="w-9 h-9 rounded-full bg-[#FF3B30] flex items-center justify-center text-white shrink-0 hover:bg-[#e03126] transition-colors">
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Card 3: 02:00 Open Time */}
        <div
          onClick={() => onNavigate("city-tests")}
          className="border border-gray-200 rounded-3xl p-5 bg-white flex items-center justify-between shadow-xs hover:border-gray-300 transition-all cursor-pointer"
        >
          <span className="text-[14px] font-medium text-gray-700 w-14">
            02:00
          </span>
          <div className="flex-1 pr-2">
            <h2 className="text-[17px] font-semibold text-gray-900 leading-snug">
              Open Time
            </h2>
            <p className="text-[14px] text-gray-600 font-normal mt-0.5">
              You have time for 1–2 City Tests.
            </p>
          </div>
          <button className="w-9 h-9 rounded-full bg-[#DAF566] flex items-center justify-center text-gray-950 shrink-0 hover:brightness-95 transition-all">
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Card 4: 03:30 Local Host Meeting */}
        <div className="border border-gray-200 rounded-3xl p-5 bg-white flex items-center justify-between shadow-xs hover:border-gray-300 transition-all">
          <span className="text-[14px] font-medium text-gray-700 w-14">
            03:30
          </span>
          <div className="flex-1 pr-2">
            <h2 className="text-[17px] font-semibold text-gray-900 leading-snug">
              Local Host Meeting
            </h2>
          </div>
          <button className="w-9 h-9 rounded-full bg-[#E3C7FC] flex items-center justify-center text-white shrink-0 hover:opacity-90 transition-opacity">
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Card 5: 08:30 Dinner Recommendation */}
        <div className="border border-gray-200 rounded-3xl p-5 bg-white flex items-center justify-between shadow-xs hover:border-gray-300 transition-all">
          <span className="text-[14px] font-medium text-gray-700 w-14">
            08:30
          </span>
          <div className="flex-1 pr-2">
            <h2 className="text-[17px] font-semibold text-gray-900 leading-snug">
              Dinner Recommendation
            </h2>
          </div>
          <button className="w-9 h-9 rounded-full bg-[#FF3B30] flex items-center justify-center text-white shrink-0 hover:bg-[#e03126] transition-colors">
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
