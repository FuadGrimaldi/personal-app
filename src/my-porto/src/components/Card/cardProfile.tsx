import { FaEllipsisV } from "react-icons/fa";
import { getProfile } from "@/services/apiUser";
import parse from "html-react-parser";
import Link from "next/link";
import Image from "next/image";

interface ProfileData {
  id: number;
  email: string;
  username: string;
  name: string;
  age: string;
  avatar: string;
  role: string;
  phone: string;
  job: string;
  country: string;
  province: string;
  city: string;
  address_details: string;
  description: string;
}

export default async function ProfileCard() {
  let profileData: ProfileData | null = null;
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  try {
    const res = await getProfile();
    profileData = (res?.data as ProfileData) || null;
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: { status?: number } }).response?.status ===
        "number" &&
      (error as { response?: { status?: number } }).response?.status === 404
    ) {
      console.error("Unexpected error:", error);
      throw error;
    }
  }

  if (!profileData) {
    return (
      <div className="lg:max-w-md w-full p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="mb-4">
          <div className="text-gray-700 text-lg font-semibold">
            No user data found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="rounded-xl border border-gray-200 bg-white px-4 pb-3 pt-4 sm:px-6 shadow-lg w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Your Profile</h3>
          <FaEllipsisV size={18} className="text-gray-500 cursor-pointer" />
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative w-[130px] h-[130px] rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
            <Image
              fill
              src={`${baseUrl}/${profileData.avatar}`}
              className="object-cover"
              alt={profileData.name}
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
              priority
            />
          </div>

          <div className="text-center mt-4 space-y-1">
            <p className="text-xl font-semibold text-gray-900">
              {profileData.name}
            </p>
            <p className="text-gray-500 text-sm">{profileData.email}</p>
            <p className="text-sm text-gray-400">@{profileData.username}</p>
          </div>
        </div>

        {/* PERSONAL INFO */}
        <div className="mt-8 bg-gray-50 rounded-lg p-5 border border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-4">
            Personal Information
          </h4>

          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <div>
              <p className="text-gray-500">Age</p>
              <p className="font-medium text-gray-900">
                {profileData.age || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Role</p>
              <p className="font-medium text-gray-900">
                {profileData.role || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium text-gray-900">
                {profileData.phone || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Job</p>
              <p className="font-medium text-gray-900">
                {profileData.job || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* LOCATION */}
        <div className="mt-6 bg-gray-50 rounded-lg p-5 border border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-4">Location</h4>

          <p className="text-gray-800 text-sm">
            {[profileData.city, profileData.province, profileData.country]
              .filter(Boolean)
              .join(", ") || "-"}
          </p>

          <div className="mt-3">
            <p className="text-gray-500 text-sm">Address</p>
            <p className="text-gray-800 break-words text-sm">
              {profileData.address_details || "-"}
            </p>
          </div>
        </div>

        {/* ABOUT */}
        <div className="mt-6 bg-gray-50 rounded-lg p-5 border border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">About</h4>

          <div className="text-gray-800 text-sm leading-relaxed">
            {profileData.description ? parse(profileData.description) : "-"}
          </div>
        </div>

        {/* BUTTON */}
        <Link
          href="/dashboard/profile/edit"
          className="block w-full bg-gray-900 text-white text-center py-2 mt-8 rounded-lg font-medium hover:bg-gray-600 transition"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
