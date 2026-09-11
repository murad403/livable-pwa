"use client";
import Image from "next/image";

export function ProfileScreen() {
  return (
    <div className="flex-1 flex flex-col px-5 pt-4 pb-8 bg-white max-w-md mx-auto w-full space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-[40px] leading-tight font-normal tracking-tight text-gray-900">
          Profile
        </h1>
      </div>

      <div className="border-b border-gray-200/80 -mx-5 px-5" />

      {/* User Info */}
      <div className="flex items-center gap-4 py-1">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-gray-200">
          <Image
            src="/sarah_avatar.jpg"
            alt="Sarah Johnson"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div>
          <h2 className="text-[18px] font-medium text-gray-900 leading-snug">
            Sarah Johnson
          </h2>
          <p className="text-[14px] text-gray-500 font-normal">
            sarah@johnson.com
          </p>
        </div>
      </div>

      <div className="border-b border-gray-200/80 -mx-5 px-5" />

      {/* Current Trip Section */}
      <div className="space-y-4">
        <h3 className="text-[20px] font-medium text-gray-900 tracking-tight">
          Current Trip
        </h3>

        <div className="grid grid-cols-[100px_1fr] gap-y-3.5 text-[15px]">
          <span className="text-gray-700 font-normal">City</span>
          <span className="text-gray-900 font-normal">Lisbon, Portugal</span>
          <span className="text-gray-700 font-normal">Host</span>
          <span className="text-gray-900 font-normal">Ana Ferreira</span>
        </div>
      </div>

      <div className="border-b border-gray-200/80 -mx-5 px-5" />

      {/* Livable™ Contact Section */}
      <div className="space-y-4">
        <h3 className="text-[20px] font-medium text-gray-900 tracking-tight">
          Livable™ Contact
        </h3>

        <div className="grid grid-cols-[100px_1fr] gap-y-3.5 text-[15px]">
          <span className="text-gray-700 font-normal">Email</span>
          <a
            href="mailto:team@livable.com"
            className="text-gray-900 underline font-normal hover:text-black"
          >
            team@livable.com
          </a>
        </div>
      </div>
    </div>
  );
}
