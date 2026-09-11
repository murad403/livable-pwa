"use client";
import React, { useState } from "react";
import { ArrowRight, ArrowLeft, ChevronUp, ChevronDown, CheckCircle2, Search } from "lucide-react";

export function CityTestsScreen() {
  // Navigation State: 'main' | 'category-list' | 'test-detail' | 'micro-tests'
  const [viewState, setViewState] = useState<"main" | "category-list" | "test-detail" | "micro-tests">("main");
  const [selectedCategory, setSelectedCategory] = useState<string>("Daily Food Systems");
  const [selectedModule, setSelectedModule] = useState<any>(null);
  
  // Completed test tracking
  const [completedTests, setCompletedTests] = useState<string[]>([]);
  const [notesText, setNotesText] = useState("");
  const [questionsText, setQuestionsText] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Accordion state for Micro-Tests
  const [expandedMicroCard, setExpandedMicroCard] = useState<string>("social");

  // Sample modules data per category
  const categoryModules: Record<string, any[]> = {
    "Daily Food Systems": [
      {
        id: "food-01",
        code: "01",
        title: "Everyday Lunch",
        categoryCode: "Daily Food Systems 01",
        description: [
          "Menús del día are traditional set lunches that usually cost €12–15 for two or three courses, often including a drink.",
          "Most authentic spots post the day’s menu on a chalkboard outside.",
          "Search “menú del día” in Google Maps, or choose one of our verified neighborhood favorites below.",
          "Observe the ratio of locals to tourists while you eat."
        ],
        searchLinks: [
          "Search 'menú del día' nearby",
          "Search 'authentic tasca' nearby",
          "Search 'pastelaria' nearby"
        ],
        notesPlaceholder: "Price...\nMostly locals...\nTried...",
        questionsPlaceholder: "Typical price for this neighborhood? · Did we handle the tipping etiquette correctly? · Any similar local spots nearby?"
      },
      {
        id: "food-02",
        code: "02",
        title: "Bakery Run",
        categoryCode: "Daily Food Systems 02",
        description: [
          "Visit a neighborhood padaria in the morning between 8:00 AM and 10:00 AM.",
          "Try a fresh pão de Deus or torrada (toasted bread with butter) alongside a meia de leite (milky coffee).",
          "Pay attention to how locals interact with the counter staff and how fast the morning queue moves."
        ],
        searchLinks: [
          "Search 'padaria tradicional' nearby",
          "Search 'pastelaria' nearby"
        ],
        notesPlaceholder: "Tried fresh pão de Deus...\nVery fast service...",
        questionsPlaceholder: "What is the customary greeting when walking into a small neighborhood bakery?"
      }
    ],
    "Micro-Social Free Time": [
      {
        id: "free-01",
        code: "01",
        title: "Afternoon Miradouro Hangout",
        categoryCode: "Micro-Social Free Time 01",
        description: [
          "Head to Miradouro de Santa Catarina or Miradouro de São Pedro de Alcântara at 5:00 PM.",
          "Grab a drink from the kiosk (kiosque) and sit for at least 45 minutes.",
          "Notice the mix of remote workers, locals catching up after work, and musicians."
        ],
        searchLinks: [
          "Search 'miradouro' nearby",
          "Search 'kiosque' nearby"
        ],
        notesPlaceholder: "Great sunset vibe...\nLots of young professionals...",
        questionsPlaceholder: "Are kiosks open year-round in all weather?"
      }
    ],
    "Practical Infrastructure": [
      {
        id: "infra-01",
        code: "01",
        title: "Public Transit & Errands",
        categoryCode: "Practical Infrastructure 01",
        description: [
          "Purchase a Navegante / Viva Viagem transit card at a Metro station kiosk.",
          "Take Tram 28 or Metro line to a neighborhood pharmacy and supermarket.",
          "Compare essential grocery prices between Continente and Pingo Doce."
        ],
        searchLinks: [
          "Search 'Metro station' nearby",
          "Search 'Pingo Doce' nearby"
        ],
        notesPlaceholder: "Easy metro system...\nSupermarket prices reasonable...",
        questionsPlaceholder: "Is a monthly Navegante pass valid across all buses and trams?"
      }
    ]
  };

  const handleOpenCategory = (catTitle: string) => {
    setSelectedCategory(catTitle);
    setViewState("category-list");
  };

  const handleOpenModule = (mod: any) => {
    setSelectedModule(mod);
    setNotesText("");
    setQuestionsText("");
    setViewState("test-detail");
  };

  const handleCompleteTest = () => {
    if (selectedModule && !completedTests.includes(selectedModule.id)) {
      setCompletedTests([...completedTests, selectedModule.id]);
    }
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      setViewState("category-list");
    }, 1200);
  };

  // 1. MAIN CITY TESTS SCREEN (IMAGE FROM ORIGINAL BATCH)
  if (viewState === "main") {
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
          <div
            onClick={() => handleOpenCategory("Daily Food Systems")}
            className="bg-[#FF3B30] text-white rounded-[28px] p-6 cursor-pointer hover:brightness-[0.98] transition-all shadow-xs relative flex flex-col justify-between min-h-40"
          >
            <div>
              <div className="flex items-start justify-between">
                <h2 className="text-[22px] font-medium tracking-tight leading-tight max-w-50">
                  Daily Food Systems
                </h2>
                <span className="text-[12px] font-medium opacity-90 tracking-wide pt-0.5">
                  Food · {completedTests.filter(id => id.startsWith("food")).length}
                </span>
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
          </div>

          {/* Micro-Social Free Time Card */}
          <div
            onClick={() => handleOpenCategory("Micro-Social Free Time")}
            className="bg-[#DFBDFF] text-gray-950 rounded-[28px] p-6 cursor-pointer hover:brightness-[0.98] transition-all shadow-xs relative flex flex-col justify-between min-h-40"
          >
            <div>
              <div className="flex items-start justify-between">
                <h2 className="text-[22px] font-medium tracking-tight leading-tight max-w-50">
                  Micro-Social Free Time
                </h2>
                <span className="text-[12px] font-medium opacity-90 tracking-wide pt-0.5">
                  Free Time · {completedTests.filter(id => id.startsWith("free")).length}
                </span>
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
          </div>

          {/* Practical Infrastructure Card */}
          <div
            onClick={() => handleOpenCategory("Practical Infrastructure")}
            className="bg-[#DAF566] text-gray-950 rounded-[28px] p-6 cursor-pointer hover:brightness-[0.98] transition-all shadow-xs relative flex flex-col justify-between min-h-40"
          >
            <div>
              <div className="flex items-start justify-between">
                <h2 className="text-[22px] font-medium tracking-tight leading-tight max-w-50">
                  Practical Infrastructure
                </h2>
                <span className="text-[12px] font-medium opacity-90 tracking-wide pt-0.5">
                  Infrastructure · {completedTests.filter(id => id.startsWith("infra")).length}
                </span>
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
          </div>
        </div>

        {/* Staying in town longer? Section */}
        <div className="pt-2">
          <h2 className="text-[20px] font-medium text-gray-900 tracking-tight">
            Staying in town longer?
          </h2>
        </div>

        {/* Solo Discovery Micro-Tests Card */}
        <div
          onClick={() => setViewState("micro-tests")}
          className="bg-[#F5F5F7] border border-gray-100 rounded-[28px] p-5 cursor-pointer hover:border-gray-200 transition-all space-y-4 shadow-xs"
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
        </div>
      </div>
    );
  }

  // 2. CATEGORY TESTS LISTING (MATCHES NEW SCREENSHOT 1)
  if (viewState === "category-list") {
    const modules = categoryModules[selectedCategory] || categoryModules["Daily Food Systems"];

    return (
      <div className="flex-1 flex flex-col px-5 pt-4 pb-8 bg-white max-w-md mx-auto w-full space-y-6">
        {/* Back Button */}
        <button
          onClick={() => setViewState("main")}
          className="w-10 h-10 rounded-full bg-[#EFEFEF] flex items-center justify-center text-gray-800 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 stroke-2" />
        </button>

        {/* Header Title */}
        <div>
          <h1 className="text-[36px] leading-tight font-semibold tracking-tight text-gray-900">
            {selectedCategory}
          </h1>
          <p className="text-[15px] leading-relaxed text-gray-700 font-normal mt-3">
            Swipe through your active city tests below. Select a module to review your field prompts, access local maps, and log your observations.
          </p>
        </div>

        {/* Modules Grid / Cards */}
        <div className="grid grid-cols-2 gap-3.5 pt-2">
          {modules.map((mod) => (
            <div
              key={mod.id}
              onClick={() => handleOpenModule(mod)}
              className="bg-[#F3F4F6] rounded-3xl p-5 cursor-pointer hover:bg-gray-200/80 transition-all flex flex-col justify-between min-h-55"
            >
              <div>
                <span className="text-[12px] font-medium text-gray-800 leading-snug block">
                  {selectedCategory}
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
                {completedTests.includes(mod.id) && (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. TEST DETAIL SCREEN (MATCHES NEW SCREENSHOTS 2 & 3)
  if (viewState === "test-detail" && selectedModule) {
    return (
      <div className="flex-1 flex flex-col px-5 pt-4 pb-8 bg-white max-w-md mx-auto w-full space-y-6">
        {/* Back Button */}
        <button
          onClick={() => setViewState("category-list")}
          className="w-10 h-10 rounded-full bg-[#EFEFEF] flex items-center justify-center text-gray-800 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 stroke-2" />
        </button>

        {/* Category breadcrumb */}
        <div>
          <span className="text-[13px] font-medium text-gray-600">
            City Test • {selectedModule.categoryCode}
          </span>
          <h1 className="text-[38px] leading-tight font-bold tracking-tight text-gray-900 mt-1">
            {selectedModule.title}
          </h1>
        </div>

        {/* Description Paragraphs */}
        <div className="space-y-4 text-[15px] leading-relaxed text-gray-800 font-normal">
          {selectedModule.description.map((p: string, idx: number) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Search Links */}
        <div className="space-y-2 pt-2 border-b border-gray-100 pb-6">
          {selectedModule.searchLinks.map((linkText: string, idx: number) => (
            <a
              key={idx}
              href={`https://maps.google.com/?q=${encodeURIComponent(linkText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[14px] text-gray-900 underline font-normal hover:text-black"
            >
              <span>{linkText}</span>
              <ArrowRight className="w-3.5 h-3.5 no-underline" />
            </a>
          ))}
        </div>

        {/* Post-Discovery Notes */}
        <div className="space-y-4 pt-2">
          <div>
            <h2 className="text-[22px] font-semibold tracking-tight text-gray-900">
              Post-Discovery Notes
            </h2>
            <p className="text-[14px] text-gray-600 font-normal mt-1">
              When you finish, jot down a few quick impressions.
            </p>
          </div>

          {/* Field 1: Notes & Observations */}
          <div className="space-y-2">
            <label className="text-[14px] font-medium text-gray-800 block">
              Notes & Observations
            </label>
            <textarea
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder={selectedModule.notesPlaceholder}
              className="w-full h-32 p-4 bg-[#F8F9FA] border border-gray-100 rounded-[20px] text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF3B30] resize-none"
            />
          </div>

          {/* Field 2: Questions for Liv Team */}
          <div className="space-y-2 pt-2">
            <label className="text-[14px] font-medium text-gray-800 block">
              Questions for the Liv Team (Optional):
            </label>
            <textarea
              value={questionsText}
              onChange={(e) => setQuestionsText(e.target.value)}
              placeholder={selectedModule.questionsPlaceholder}
              className="w-full h-28 p-4 bg-[#F8F9FA] border border-gray-100 rounded-[20px] text-[13.5px] leading-relaxed text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF3B30] resize-none"
            />
          </div>

          {/* Complete Button */}
          <div className="pt-4">
            <button
              onClick={handleCompleteTest}
              className="w-full bg-[#FF3B30] hover:bg-[#e03126] text-white font-medium text-[15px] tracking-wider py-4 px-6 rounded-full flex items-center justify-center gap-2 uppercase transition-all shadow-xs"
            >
              {showSuccessToast ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>TEST COMPLETED!</span>
                </>
              ) : (
                <span>COMPLETE TEST</span>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. DISCOVERY MICRO-TESTS SCREEN (MATCHES NEW SCREENSHOT 4)
  if (viewState === "micro-tests") {
    return (
      <div className="flex-1 flex flex-col px-5 pt-4 pb-8 bg-white max-w-md mx-auto w-full space-y-6">
        {/* Back Button */}
        <button
          onClick={() => setViewState("main")}
          className="w-10 h-10 rounded-full bg-[#EFEFEF] flex items-center justify-center text-gray-800 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 stroke-2" />
        </button>

        {/* Title */}
        <div>
          <h1 className="text-[34px] leading-tight font-normal tracking-tight text-gray-900">
            Discovery Micro-Tests
          </h1>

          <div className="space-y-3 text-[14.5px] leading-relaxed text-gray-800 font-normal mt-4">
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
                setExpandedMicroCard(expandedMicroCard === "social" ? "" : "social")
              }
              className="flex items-center justify-between cursor-pointer"
            >
              <h2 className="text-[17px] font-medium text-gray-900">
                Social Infrastructure
              </h2>
              <div className="w-9 h-9 rounded-full bg-[#E3C7FC] flex items-center justify-center text-gray-900 shrink-0">
                {expandedMicroCard === "social" ? (
                  <ChevronUp className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                )}
              </div>
            </div>

            {expandedMicroCard === "social" && (
              <div className="mt-4 space-y-3.5 text-[13.5px] leading-relaxed text-gray-800 font-normal border-t border-gray-100 pt-3.5">
                <p>
                  <span className="font-semibold">01. After-Work Drinks:</span> Find a crowded sidewalk bar or neighborhood bodega at 7:30 PM to map out where local professionals decompress.
                </p>
                <p>
                  <span className="font-semibold">02. Live Music Check:</span> Locate a jazz cellar, fado house, or small indie music venue to sample the city&apos;s evening cultural depth.
                </p>
                <p>
                  <span className="font-semibold">03. Book a Class:</span> Enroll in a one-off fitness, language, or cooking workshop to test how easy it is to enter a local learning environment.
                </p>
                <p>
                  <span className="font-semibold">04. Open Studio Walk:</span> Locate a hidden gallery corridor or creative workspace street to check the active footprint of local working artists and see if they have an ongoing events list.
                </p>
              </div>
            )}
          </div>

          {/* Card 2: Wellness & Recreation (Lime) */}
          <div className="border border-gray-200/90 rounded-3xl p-5 bg-white shadow-xs">
            <div
              onClick={() =>
                setExpandedMicroCard(expandedMicroCard === "wellness" ? "" : "wellness")
              }
              className="flex items-center justify-between cursor-pointer"
            >
              <h2 className="text-[17px] font-medium text-gray-900">
                Wellness & Recreation
              </h2>
              <div className="w-9 h-9 rounded-full bg-[#DAF566] flex items-center justify-center text-gray-900 shrink-0">
                {expandedMicroCard === "wellness" ? (
                  <ChevronUp className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                )}
              </div>
            </div>

            {expandedMicroCard === "wellness" && (
              <div className="mt-4 space-y-3.5 text-[13.5px] leading-relaxed text-gray-800 font-normal border-t border-gray-100 pt-3.5">
                <p>
                  <span className="font-semibold">05. Try Padel:</span> Book a court at a local racket club via the Playtomic app to experience the ultimate Iberian community sports scene.
                </p>
                <p>
                  <span className="font-semibold">06. Test the Gym Vibe:</span> Get a day pass at a local training gym or group fitness studio to gauge the local health and community energy.
                </p>
                <p>
                  <span className="font-semibold">07. Get on the Water:</span> Rent a kayak, book a sailing slip, or find a coastal ferry to cross the bay or river and see the city from the water.
                </p>
                <p>
                  <span className="font-semibold">08. The Scenic Path:</span> Ditch the main roads to map a dedicated running or cycling route that locals use for their daily morning workouts.
                </p>
              </div>
            )}
          </div>

          {/* Card 3: Civic & Neighborhood Spaces (Red) */}
          <div className="border border-gray-200/90 rounded-3xl p-5 bg-white shadow-xs">
            <div
              onClick={() =>
                setExpandedMicroCard(expandedMicroCard === "civic" ? "" : "civic")
              }
              className="flex items-center justify-between cursor-pointer"
            >
              <h2 className="text-[17px] font-medium text-gray-900">
                Civic & Neighborhood Spaces
              </h2>
              <div className="w-9 h-9 rounded-full bg-[#FF3B30] flex items-center justify-center text-white shrink-0">
                {expandedMicroCard === "civic" ? (
                  <ChevronUp className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                )}
              </div>
            </div>

            {expandedMicroCard === "civic" && (
              <div className="mt-4 space-y-3.5 text-[13.5px] leading-relaxed text-gray-800 font-normal border-t border-gray-100 pt-3.5">
                <p>
                  <span className="font-semibold">09. The Dog Park Test:</span> Visit a community pet zone or green square to watch neighborhood residents interact and connect over their animals.
                </p>
                <p>
                  <span className="font-semibold">10. The Central Library:</span> Spend an hour in the main public reading room to evaluate the city&apos;s quiet working infrastructure and civic spaces.
                </p>
                <p>
                  <span className="font-semibold">11. The Hardware Store:</span> Visit a small, packed neighborhood ferreteria or loja de ferragens to purchase a baseline household item.
                </p>
                <p>
                  <span className="font-semibold">12. Find Your Wine Shop:</span> Browse a dedicated local bottle shop (vinoteca or garrafeira) to check regional imports and chat with the merchant.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
