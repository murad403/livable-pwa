"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useGetCityTestDetailQuery, useSaveCityTestMutation } from "@/redux/api/api";
import { Button } from "@/components/ui/button";

interface TestDetailPageProps {
  params: Promise<{ category: string; id: string }>;
}

export default function TestDetailPage({ params }: TestDetailPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const catKey = resolvedParams.category;
  const modKey = resolvedParams.id;

  const { data: testData, isLoading, isError, refetch } = useGetCityTestDetailQuery(modKey);
  const [saveCityTest, { isLoading: isSaving }] = useSaveCityTestMutation();

  const [notesText, setNotesText] = useState("");
  const [questionsText, setQuestionsText] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (testData?.previous_submission) {
      if (testData.previous_submission.notes) {
        setNotesText(testData.previous_submission.notes);
      }
      if (testData.previous_submission.question_for_liv_team) {
        setQuestionsText(testData.previous_submission.question_for_liv_team);
      }
    }
  }, [testData]);

  const handleCompleteTest = async () => {
    try {
      await saveCityTest({
        test_id: modKey,
        notes: notesText,
        question_for_liv_team: questionsText,
      }).unwrap();
    } catch (err) {
      console.error("Failed to save city test:", err);
    } finally {
      setIsCompleted(true);
      setTimeout(() => {
        router.push(`/city-tests/${catKey}`);
      }, 1000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white max-w-md mx-auto w-full min-h-100">
        <Loader2 className="w-8 h-8 text-[#FF3B30] animate-spin mb-3" />
        <p className="text-sm font-medium text-gray-500">Loading test details...</p>
      </div>
    );
  }

  if (isError || !testData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white max-w-md mx-auto w-full min-h-100 text-center space-y-4">
        <p className="text-sm font-medium text-red-600">Failed to load test details.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-[#FF3B30] text-white text-xs font-semibold rounded-full hover:bg-primary-hover transition-all cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  const notesPlaceholder = testData.note_prompts?.length
    ? testData.note_prompts.join("\n")
    : "Price...\nMostly locals...\nTried...";

  const questionsPlaceholder = testData.question_prompts?.length
    ? testData.question_prompts.join(" · ")
    : "Questions for the Liv Team...";

  const hasLinks = Boolean(testData.google_maps_link || (testData.external_links && testData.external_links.length > 0));

  return (
    <div className="flex-1 flex flex-col px-5 pt-4 pb-8 bg-white max-w-md mx-auto w-full space-y-6">
      {/* Back Button */}
      <Link
        href={`/city-tests/${catKey}`}
        className="w-10 h-10 rounded-full bg-[#EFEFEF] flex items-center justify-center text-title hover:bg-gray-200 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 stroke-2" />
      </Link>

      {/* Category breadcrumb & Title */}
      <div>
        <span className="text-[13px] font-medium text-title capitalize">
          City Test • {testData.category_id || catKey}
        </span>
        <h1 className="text-[38px] leading-tight font-bold tracking-tight text-title mt-1">
          {testData.title}
        </h1>
      </div>

      {/* Description */}
      {testData.short_description && (
        <div className="space-y-4 text-[15px] leading-relaxed text-title font-normal">
          <p>{testData.short_description}</p>
        </div>
      )}

      {/* Links (Google Maps & External Links) */}
      {hasLinks && (
        <div className="space-y-2.5 pt-2 border-b border-gray-100 pb-6">
          {testData.google_maps_link && (
            <a
              href={testData.google_maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[14px] text-title underline font-medium hover:text-black"
            >
              <span>View on Google Maps</span>
              <ArrowRight className="w-3.5 h-3.5 no-underline" />
            </a>
          )}

          {testData.external_links?.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[14px] text-title underline font-medium hover:text-black"
            >
              <span>{link.label}</span>
              <ArrowRight className="w-3.5 h-3.5 no-underline" />
            </a>
          ))}
        </div>
      )}

      {/* Post-Discovery Notes Form */}
      <div className="space-y-4 pt-2">
        <div>
          <h2 className="text-[22px] font-semibold tracking-tight text-title">
            Post-Discovery Notes
          </h2>
          <p className="text-[14px] text-title font-normal mt-1">
            When you finish, jot down a few quick impressions.
          </p>
        </div>

        {/* Field 1: Notes & Observations */}
        <div className="space-y-2">
          <label className="text-[14px] font-medium text-title block">
            Notes & Observations
          </label>

          {/* Note Prompts */}
          {testData.note_prompts && testData.note_prompts.length > 0 && (
            <div className="flex flex-wrap gap-1.5 py-1">
              {testData.note_prompts.map((prompt, idx) => (
                <span
                  key={idx}
                  className="text-[12px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg font-medium"
                >
                  {prompt}
                </span>
              ))}
            </div>
          )}

          <textarea
            value={notesText}
            onChange={(e) => setNotesText(e.target.value)}
            placeholder={notesPlaceholder}
            className="w-full h-32 p-4 bg-[#F8F9FA] border border-gray-100 rounded-[20px] text-[14px] text-title placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF3B30] resize-none"
          />
        </div>

        {/* Field 2: Questions for Liv Team */}
        <div className="space-y-2 pt-2">
          <label className="text-[14px] font-medium text-title block">
            Questions for the Liv Team (Optional):
          </label>

          {/* Question Prompts */}
          {testData.question_prompts && testData.question_prompts.length > 0 && (
            <div className="space-y-1 py-1">
              {testData.question_prompts.map((prompt, idx) => (
                <div key={idx} className="text-[12.5px] text-title flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] shrink-0 mt-1.5" />
                  <span>{prompt}</span>
                </div>
              ))}
            </div>
          )}

          <textarea
            value={questionsText}
            onChange={(e) => setQuestionsText(e.target.value)}
            placeholder={questionsPlaceholder}
            className="w-full h-28 p-4 bg-[#F8F9FA] border border-gray-100 rounded-[20px] text-[13.5px] leading-relaxed text-title placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF3B30] resize-none"
          />
        </div>

        {/* Complete Button */}
        <div className="pt-4">
          <Button
            onClick={handleCompleteTest}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>SAVING...</span>
              </>
            ) : isCompleted ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>TEST COMPLETED!</span>
              </>
            ) : (
              <span>COMPLETE TEST</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

