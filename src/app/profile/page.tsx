"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Pencil, Check, X, Loader2, Camera, Lock, LogOut } from "lucide-react";
import { useGetProfileQuery, useUpdateProfileMutation, useGetTripsQuery } from "@/redux/api/api";
import { removeToken } from "@/utils/auth";

export default function ProfilePage() {
  const router = useRouter();
  const { data: user, isLoading, isError, refetch } = useGetProfileQuery();
  const { data: tripsData } = useGetTripsQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const currentTrip = tripsData?.trips?.[0];

  const handleLogout = async () => {
    await removeToken();
    router.push("/login");
    router.refresh();
  };

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedFile(null);
    setImagePreview(null);
    setFeedbackMsg(null);
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMsg(null);

    try {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      await updateProfile(formData).unwrap();
      setIsEditing(false);
      setSelectedFile(null);
      setImagePreview(null);
      setFeedbackMsg({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => setFeedbackMsg(null), 3000);
    } catch (err: any) {
      console.error("Failed to update profile:", err);
      const errorMsg =
        err?.data?.detail ||
        err?.data?.message ||
        "Failed to update profile. Please try again.";
      setFeedbackMsg({ type: "error", text: errorMsg });
    }
  };

  const displayImage = imagePreview || user?.image || "/sarah_avatar.jpg";
  const isRemoteImage = typeof displayImage === "string" && (displayImage.startsWith("http://") || displayImage.startsWith("https://") || displayImage.startsWith("blob:"));
  const fullName = user ? `${user.first_name} ${user.last_name}`.trim() : "Sarah Johnson";

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white max-w-md mx-auto w-full min-h-100">
        <Loader2 className="w-8 h-8 text-[#FF3B30] animate-spin mb-3" />
        <p className="text-sm font-medium text-gray-500">Loading profile details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white max-w-md mx-auto w-full min-h-100 text-center space-y-4">
        <p className="text-sm font-medium text-red-600">Failed to load profile details.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-[#FF3B30] text-white text-xs font-semibold rounded-full hover:bg-primary-hover transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col px-5 pt-4 pb-8 bg-white max-w-md mx-auto w-full space-y-6">
      {/* Title & Edit Toggle Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[40px] leading-tight font-normal tracking-tight text-gray-900">
          Profile
        </h1>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium transition-all cursor-pointer"
            title="Edit Profile"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              disabled={isUpdating}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all cursor-pointer"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {feedbackMsg && (
        <div
          className={`p-3 rounded-2xl text-xs font-medium border flex items-center gap-2 ${feedbackMsg.type === "success"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-600"
            }`}
        >
          {feedbackMsg.type === "success" ? (
            <Check className="w-4 h-4 text-green-600 shrink-0" />
          ) : (
            <X className="w-4 h-4 text-red-500 shrink-0" />
          )}
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      <div className="border-b border-gray-200/80 -mx-5 px-5" />

      {/* User Info View / Edit Form */}
      {!isEditing ? (
        <div className="flex items-center gap-4 py-1">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-gray-200 bg-gray-50 shadow-xs">
            <Image
              src={displayImage}
              alt={fullName || "User Avatar"}
              fill
              className="object-cover"
              priority
              unoptimized={isRemoteImage}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[19px] font-semibold text-gray-900 leading-snug truncate">
              {fullName || "Anonymous User"}
            </h2>
            <p className="text-[14px] text-gray-500 font-normal truncate mt-0.5">
              {user?.email}
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-4 py-1">
          {/* Avatar Upload */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-gray-200 bg-gray-50 group">
              <Image
                src={displayImage}
                alt="Profile Preview"
                fill
                className="object-cover"
                unoptimized={isRemoteImage}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-semibold text-[#FF3B30] hover:underline cursor-pointer block"
              >
                Change Avatar Image
              </button>
              <p className="text-[11px] text-gray-400 mt-0.5">JPG, PNG or WEBP</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={isUpdating}
                className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-2xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF3B30] transition-all"
                placeholder="First Name"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={isUpdating}
                className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-2xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF3B30] transition-all"
                placeholder="Last Name"
              />
            </div>
          </div>

          {/* Email (Disabled / Non-editable) */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-gray-700">
                Email Address
              </label>
              <span className="text-[10px] text-gray-400 flex items-center gap-1 font-medium">
                <Lock className="w-3 h-3 text-gray-400" />
                Cannot be edited
              </span>
            </div>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              readOnly
              className="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-200 rounded-2xl text-xs font-medium text-gray-500 cursor-not-allowed select-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isUpdating}
              className="px-4 py-2.5 rounded-full border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-5 py-2.5 rounded-full bg-[#FF3B30] hover:bg-primary-hover text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs disabled:opacity-70 cursor-pointer"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      <div className="border-b border-gray-200/80 -mx-5 px-5" />

      {/* Current Trip Section */}
      <div className="space-y-4">
        <h3 className="text-[20px] font-medium text-gray-900 tracking-tight">
          Current Trip
        </h3>

        <div className="grid grid-cols-[100px_1fr] gap-y-3.5 text-[15px]">
          <span className="text-gray-700 font-normal">City</span>
          <span className="text-gray-900 font-normal">{currentTrip?.city || "Lisbon, Portugal"}</span>
          <span className="text-gray-700 font-normal">Host</span>
          <span className="text-gray-900 font-normal">{currentTrip?.guide_name || "Ana Ferreira"}</span>
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

      <div className="border-b border-gray-200/80 -mx-5 px-5" />

      {/* Logout Action */}
      <div className="pt-2">
        <button
          onClick={handleLogout}
          className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-semibold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer text-sm shadow-xs"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
