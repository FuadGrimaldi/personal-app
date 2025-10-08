"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
interface ProjectDetail {
  id: number;
  title: string;
  projectImage: string;
  description: string;
}

interface ProjectDetailPageProps {
  projectId: string;
}

export default function ProjectDetail({ projectId }: ProjectDetailPageProps) {
  const [data, setData] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!baseUrl) {
          console.error("❌ NEXT_PUBLIC_BACKEND_URL is not defined");
          return;
        }

        const response = await axios.get(
          `${baseUrl}/api/v2/portofolio/${projectId}`
        );
        const projectData = response.data?.data;

        // Jika tidak ada data (null / undefined), set ke null
        if (!projectData) {
          setData(null);
        } else {
          setData(projectData);
        }
      } catch (error) {
        console.error("Error fetching portofolio:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId, baseUrl]);

  if (loading) {
    return (
      <section className="px-6 lg:px-[120px] pb-6 lg:pt-[70px] pt-[50px] text-center">
        <p className="text-gray-500 animate-pulse">Loading project...</p>
      </section>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-[#254d70]/5 to-transparent rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-60 right-20 w-96 h-96 bg-gradient-to-br from-gray-300/10 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-[#254d70]/3 to-transparent rounded-full blur-3xl animate-float-slow"></div>
        </div>

        <section className="z-10">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            The project youre looking for doesnt exist or may have been removed.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-[#254d70]/5 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-gradient-to-br from-gray-300/10 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-[#254d70]/3 to-transparent rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <section className="z-10">
        <div className=" mx-auto py-16 lg:py-24">
          <div>
            <Link
              href="/project"
              className="group inline-flex items-center px-3 py-2 bg-[#EFE4D2] text-slate-600 rounded-lg hover:bg-[#EFE4D2] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden mb-3"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <svg
                className="w-5 h-5 mr-3 transition-transform group-hover:-translate-x-1 duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="font-medium lg:text-sm text-[12px]">
                Back to Projects
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-17 xl:gap-16 items-start">
            {/* Project Content */}
            <div className="space-y-8 animate-slide-up">
              {/* Title with subtle background */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#254d70]/5 to-transparent rounded-2xl blur-xl"></div>
                <h1 className="relative text-3xl lg:text-4xl xl:text-5xl font-bold text-[#EFE4D2] leading-tight">
                  <span className="inline-block hover:scale-105 transition-transform duration-500">
                    {data.title}
                  </span>
                </h1>
              </div>

              {/* Description with enhanced typography */}
              <div className="relative">
                <div className="w-16 h-1 bg-gradient-to-r from-[#254d70] to-gray-300 mb-6 rounded-full"></div>
                <div className="text-lg lg:text-xl text-white leading-relaxed font-light tracking-wide">
                  {parse(data.description)}
                </div>
              </div>

              {/* Interactive Back Button */}
            </div>

            {/* Enhanced Image Section */}
            <div className="relative animate-slide-up-delayed">
              {/* Main Image Container */}
              <div className="relative group">
                <div className="aspect-[4/3] relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-3xl group-hover:scale-[1.02]">
                  <Image
                    fill
                    src={`${baseUrl}/${data.projectImage}`}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={data.title}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized={true}
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#254d70]/10 to-transparent rounded-full animate-pulse-slow"></div>
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-br from-gray-300/20 to-transparent rounded-full animate-pulse-slower"></div>
                {/* Border accent */}
                <div className="absolute -inset-2 bg-gradient-to-br from-[#254d70]/20 via-transparent to-gray-300/20 rounded-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
