"use client";
import React, { useEffect, useState } from "react";
import { BlogCard, BlogCardSingle } from "../Card/CardLanding";
import { getBlog } from "@/services/apiBlog";
import { motion } from "framer-motion";
import SectionHeader from "../Common/SectionHeader";
import SidebarLanding from "../Sidebar/SidebarBlog";

interface BlogLandingProps {
  id: number;
  idUser: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogComp() {
  const [blogs, setBlogs] = useState<BlogLandingProps[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getBlog();
        setBlogs(res?.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
    fetchData();
  }, []);

  const displayedBlog = blogs.slice(0, 4);

  if (displayedBlog.length === 0) {
    return (
      <section
        className="relative px-6 lg:px-[120px] pb-6 lg:pt-[70px] pt-[50px] -z-1"
        id="blogLanding"
      >
        {/* Header */}

        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0 z-10 relative">
          <SectionHeader
            headerInfo={{
              title: "------",
              color: "text-[#131D4F]",
              colorTitle: "text-[#131D4F]",
              subtitle: "Blogspot",
              description:
                "insights, tips, and stories about my journey in the world of technology and programming.",
            }}
          />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* MAIN */}
            <motion.div
              className="w-full lg:w-3/4 space-y-6 bg-white p-4 rounded-2xl border border-gray-200"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Highlight (1st blog) */}
              <div className="bg-white hover:bg-blue-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="flex flex-col md:flex-row h-[400px]">
                  <div className="relative md:w-1/2 w-full h-48 md:h-auto bg-gray-200"></div>

                  {/* CONTENT */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex gap-2 mb-2 bg-gray-100 px-2 py-3 rounded"></div>
                      <div className="bg-gray-100 px-2 h-8 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* List blog */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
                  <div className="relative h-48 bg-gray-200"></div>

                  <div className="p-4">
                    <div className=" mb-2 px-2 py-3 bg-gray-100 rounded"></div>

                    <div className="px-2 h-6 bg-gray-100 rounded"></div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
                  <div className="relative h-48 bg-gray-200"></div>

                  <div className="p-4">
                    <div className=" mb-2 px-2 py-3 bg-gray-100 rounded"></div>

                    <div className="px-2 h-6 bg-gray-100 rounded"></div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
                  <div className="relative h-48 bg-gray-200"></div>

                  <div className="p-4">
                    <div className=" mb-2 px-2 py-3 bg-gray-100 rounded"></div>

                    <div className="px-2 h-6 bg-gray-100 rounded"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SIDEBAR */}
            <div className="flex flex-col w-full lg:w-1/4">
              <SidebarLanding />
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section
      className="px-6 lg:px-[120px] pb-6 lg:pt-[70px] pt-[50px] -z-1"
      id="blogLanding"
    >
      {/* Header */}

      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0 z-10 relative">
        <SectionHeader
          headerInfo={{
            title: "------",
            color: "text-[#131D4F]",
            colorTitle: "text-[#131D4F]",
            subtitle: "Blogspot",
            description:
              "insights, tips, and stories about my journey in the world of technology and programming.",
          }}
        />
        <div className="flex flex-col lg:flex-row gap-8">
          {/* MAIN */}
          <div className="w-full lg:w-3/4 space-y-6 bg-white p-4 rounded-2xl border border-gray-200">
            {/* Highlight (1st blog) */}
            {displayedBlog.slice(0, 1).map((blog) => (
              <BlogCardSingle key={blog.id} article={blog} />
            ))}

            {/* List blog */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {displayedBlog.slice(1).map((blog) => (
                <BlogCard key={blog.id} article={blog} />
              ))}
            </div>

            {/* Button */}
            <div className="mt-8">
              <a
                href={`/blog/`}
                className="inline-flex items-center border border-blue-500 rounded-lg px-3 py-1.5 text-gray-600 text-sm hover:bg-gray-100 hover:shadow transition-colors duration-200"
              >
                Lihat Semua Blog
              </a>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="flex flex-col w-full lg:w-1/4">
            <SidebarLanding />
          </div>
        </div>
      </div>
    </section>
  );
}
