"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronUp, ChevronDown } from "lucide-react";

export default function MicroTestsPage() {
  const [expandedCard, setExpandedCard] = useState<string>("social");

  return (
    <div className="flex-1 flex flex-col px-5 pt-4 pb-8 bg-white max-w-md mx-auto w-full space-y-6">
      {/* Back Button */}
      <Link
        href="/city-tests"
        className="w-10 h-10 rounded-full bg-[#EFEFEF] flex items-center justify-center text-gray-800 hover:bg-gray-200 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 stroke-2" />
      </Link>

      {/* Title */}
      <div>
        <h1 className="text-[32px] leading-tight font-medium tracking-tight text-title">
          Lets put Micro-Tests on the second line so the word isn't broken in two" was my comment to you, not the title of the screen.  The title of the screen is: <br />
          Discovery Mico-Tests
        </h1>

        <div className="space-y-3 text-base leading-relaxed text-gray-800 font-normal mt-4">
          <p>
            We&apos;ve put together these fun, low-stakes suggestions — no data logging required — to offer some creative ways to continue discovering local lifestyle rhythms, step outside your comfort zone, and experience the environment of your potential new home.
          </p>
          <p>
            If you are staying in the city after your final Livable session concludes, these micro-tests are designed to keep your exploration momentum going.
          </p>
        </div>
      </div>

      {/* Accordion Cards */}
      <div className="space-y-4 pt-2">
        {/* Card 1: Social Infrastructure (Purple) */}
        <div className="border border-gray-200/90 rounded-3xl p-5 bg-white shadow-xs">
          <div
            onClick={() =>
              setExpandedCard(expandedCard === "social" ? "" : "social")
            }
            className="flex items-center justify-between cursor-pointer"
          >
            <h2 className="text-base font-medium text-gray-900">
              Social Infrastructure
            </h2>
            <div className="size-10 rounded-full bg-brand-purple-light flex items-center justify-center text-gray-900 shrink-0">
              {expandedCard === "social" ? (
                <ChevronUp className="w-5 h-5 stroke-[2.5]" />
              ) : (
                <ChevronDown className="w-5 h-5 stroke-[2.5]" />
              )}
            </div>
          </div>

          {expandedCard === "social" && (
            <ul className="mt-4 space-y-3.5 text-sm leading-relaxed text-gray-800 font-normal border-t border-gray-100 pt-3.5 list-disc pl-4">
              <li>
                <span>01. After-Work Drinks:</span> Find a crowded sidewalk bar or neighborhood bodega at 7:30 PM to map out where local professionals decompress.
              </li>
              <li>
                <span>02. Live Music Check:</span> Locate a jazz cellar, fado house, or small indie music venue to sample the city&apos;s evening cultural depth.
              </li>
              <li>
                <span>03. Book a Class:</span> Enroll in a one-off fitness, language, or cooking workshop to test how easy it is to enter a local learning environment.
              </li>
              <li>
                <span>04. Open Studio Walk:</span> Locate a hidden gallery corridor or creative workspace street to check the active footprint of local working artists and see if they have an ongoing events list.
              </li>
            </ul>
          )}
        </div>

        {/* Card 2: Wellness & Recreation (Lime) */}
        <div className="border border-gray-200/90 rounded-3xl p-5 bg-white shadow-xs">
          <div
            onClick={() =>
              setExpandedCard(expandedCard === "wellness" ? "" : "wellness")
            }
            className="flex items-center justify-between cursor-pointer"
          >
            <h2 className="text-base font-medium text-gray-900">
              Wellness & Recreation
            </h2>
            <div className="size-10 rounded-full bg-brand-lime flex items-center justify-center text-gray-900 shrink-0">
              {expandedCard === "wellness" ? (
                <ChevronUp className="w-5 h-5 stroke-[2.5]" />
              ) : (
                <ChevronDown className="w-5 h-5 stroke-[2.5]" />
              )}
            </div>
          </div>

          {expandedCard === "wellness" && (
            <ul className="mt-4 space-y-3.5 text-sm leading-relaxed text-gray-800 font-normal border-t border-gray-100 pt-3.5 list-disc pl-4">
              <li>
                <span>05. Try Padel:</span> Book a court at a local racket club via the Playtomic app to experience the ultimate Iberian community sports scene.
              </li>
              <li>
                <span>06. Test the Gym Vibe:</span> Get a day pass at a local training gym or group fitness studio to gauge the local health and community energy.
              </li>
              <li>
                <span>07. Get on the Water:</span> Rent a kayak, book a sailing slip, or find a coastal ferry to cross the bay or river and see the city from the water.
              </li>
              <li>
                <span>08. The Scenic Path:</span> Ditch the main roads to map a dedicated running or cycling route that locals use for their daily morning workouts.
              </li>
            </ul>
          )}
        </div>

        {/* Card 3: Civic & Neighborhood Spaces (Red) */}
        <div className="border border-gray-200/90 rounded-3xl p-5 bg-white shadow-xs">
          <div
            onClick={() =>
              setExpandedCard(expandedCard === "civic" ? "" : "civic")
            }
            className="flex items-center justify-between cursor-pointer"
          >
            <h2 className="text-base font-medium text-gray-900">
              Civic & Neighborhood Spaces
            </h2>
            <div className="size-10 rounded-full bg-[#FF3B30] flex items-center justify-center text-white shrink-0">
              {expandedCard === "civic" ? (
                <ChevronUp className="w-5 h-5 stroke-[2.5]" />
              ) : (
                <ChevronDown className="w-5 h-5 stroke-[2.5]" />
              )}
            </div>
          </div>

          {expandedCard === "civic" && (
            <ul className="mt-4 space-y-3.5 text-sm leading-relaxed text-gray-800 font-normal border-t border-gray-100 pt-3.5 list-disc pl-4">
              <li>
                <span>09. The Dog Park Test:</span> Visit a community pet zone or green square to watch neighborhood residents interact and connect over their animals.
              </li>
              <li>
                <span>10. The Central Library:</span> Spend an hour in the main public reading room to evaluate the city&apos;s quiet working infrastructure and civic spaces.
              </li>
              <li>
                <span>11. The Hardware Store:</span> Visit a small, packed neighborhood ferreteria or loja de ferragens to purchase a baseline household item.
              </li>
              <li>
                <span>12. Find Your Wine Shop:</span> Browse a dedicated local bottle shop (vinoteca or garrafeira) to check regional imports and chat with the merchant.
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

