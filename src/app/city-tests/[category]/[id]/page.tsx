"use client";
import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

interface TestDetailPageProps {
  params: Promise<{ category: string; id: string }>;
}

const moduleDetails: Record<string, any> = {
  "everyday-lunch": {
    categoryCode: "City Test • Daily Food Systems 01",
    title: "Everyday Lunch",
    description: [
      "Menús del día are traditional set lunches that usually cost €12–15 for two or three courses, often including a drink.",
      "Most authentic spots post the day’s menu on a chalkboard outside.",
      "Search “menú del día” in Google Maps, or choose one of our verified neighborhood favorites below.",
      "Observe the ratio of locals to tourists while you eat."
    ],
    searchLinks: [
      "Search 'menú del día' nearby",
      "Search 'menú del día' nearby",
      "Search 'menú del día' nearby"
    ],
    notesPlaceholder: "Price...\nMostly locals...\nTried...",
    questionsPlaceholder: "Typical price for this neighborhood? · Did we handle the tipping etiquette correctly? · Any similar local spots nearby?"
  },
  "bakery-run": {
    categoryCode: "City Test • Daily Food Systems 02",
    title: "Bakery Run",
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
};

export default function TestDetailPage({ params }: TestDetailPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const catKey = resolvedParams.category;
  const modKey = resolvedParams.id;

  const currentModule = moduleDetails[modKey] || moduleDetails["everyday-lunch"];

  const [notesText, setNotesText] = useState("");
  const [questionsText, setQuestionsText] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompleteTest = () => {
    setIsCompleted(true);
    setTimeout(() => {
      router.push(`/city-tests/${catKey}`);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col px-5 pt-4 pb-8 bg-white max-w-md mx-auto w-full space-y-6">
      {/* Back Button */}
      <Link
        href={`/city-tests/${catKey}`}
        className="w-10 h-10 rounded-full bg-[#EFEFEF] flex items-center justify-center text-gray-800 hover:bg-gray-200 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 stroke-2" />
      </Link>

      {/* Category breadcrumb */}
      <div>
        <span className="text-[13px] font-medium text-gray-600">
          {currentModule.categoryCode}
        </span>
        <h1 className="text-[38px] leading-tight font-bold tracking-tight text-gray-900 mt-1">
          {currentModule.title}
        </h1>
      </div>

      {/* Description Paragraphs */}
      <div className="space-y-4 text-[15px] leading-relaxed text-gray-800 font-normal">
        {currentModule.description.map((p: string, idx: number) => (
          <p key={idx}>{p}</p>
        ))}
      </div>

      {/* Search Links */}
      <div className="space-y-2 pt-2 border-b border-gray-100 pb-6">
        {currentModule.searchLinks.map((linkText: string, idx: number) => (
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
            placeholder={currentModule.notesPlaceholder}
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
            placeholder={currentModule.questionsPlaceholder}
            className="w-full h-28 p-4 bg-[#F8F9FA] border border-gray-100 rounded-[20px] text-[13.5px] leading-relaxed text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF3B30] resize-none"
          />
        </div>

        {/* Complete Button */}
        <div className="pt-4">
          <button
            onClick={handleCompleteTest}
            className="w-full bg-[#FF3B30] hover:bg-[#e03126] text-white font-medium text-[15px] tracking-wider py-4 px-6 rounded-full flex items-center justify-center gap-2 uppercase transition-all shadow-xs"
          >
            {isCompleted ? (
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
