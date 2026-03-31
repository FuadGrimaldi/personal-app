"use client";
import { getPortofolio } from "@/services/apiPortofolio";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import parse from "html-react-parser";

interface Portfolio {
  id: number;
  title: string;
  projectImage: string;
  description: string;
  type: string;
  featured: string;
}

const limit = 6; // Jumlah item per halaman

export default function ListProject() {
  const [data, setData] = useState<Portfolio[]>([]);
  const [page, setPage] = useState(1); // ✅ mulai dari 1
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getPortofolio(page.toString(), limit.toString());
        setData(res?.data?.item || []); // ✅ res.data.data bukan res.data.item
        setTotalItems(res?.data?.total || 0); // ✅ total items dari meta
      } catch (error) {
        console.error("Failed to fetch portfolio:", error);
        setData([]);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page]); // ✅ re-fetch saat page berubah
  console.log("Fetched data:", data); // Debug: cek data yang diterima
  console.log("Total items:", totalItems); // Debug: cek total items

  const fetchPortofolio = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPortofolio(page.toString(), limit.toString());
      setData(res?.data?.item || []); // ✅ res.data.data bukan res.data.item
      setTotalItems(res?.data?.total || 0); // ✅ total items dari meta
    } catch (err) {
      console.error("Error fetching acara:", err);
      setData([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [page]);

  // Fetch data ketika kecamatanId atau page berubah
  useEffect(() => {
    if (page) {
      fetchPortofolio();
    } else {
      setLoading(false);
      setData([]);
      setTotalItems(0);
    }
  }, [page, fetchPortofolio]);

  // Initialize page from URL on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get("page");
      if (pageParam) {
        const pageNum = parseInt(pageParam);
        if (!isNaN(pageNum) && pageNum > 0) {
          setPage(pageNum);
        }
      }
    }
  }, []);

  // Function to update URL with page param
  const updateURL = useCallback((page: number) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (page === 1) {
        url.searchParams.delete("page");
      } else {
        url.searchParams.set("page", page.toString());
      }
      window.history.pushState({}, "", url.toString());
    }
  }, []);

  // Update URL ketika page berubah
  useEffect(() => {
    updateURL(page);
  }, [page, updateURL]);

  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      const totalPages = Math.ceil(totalItems / limit);
      if (page >= 1 && page <= totalPages) {
        setPage(page);
      }
    },
    [totalItems],
  );

  // Generate page numbers for pagination
  const getPageNumbers = useCallback(() => {
    const totalPages = Math.ceil(totalItems / limit);
    const pageNumbers: number[] = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  }, [totalItems, page]);

  // Calculate pagination values
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;

  const limitWords = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <div className="z-1 min-h-screen lg:pt-[70px] pt-[50px]">
      <div className="relative z-2 backdrop-blur-sm">
        {/* Section Title */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="animate_top"
        >
          <h2 className="mb-4 lg:text-5xl text-3xl font-bold text-[#EFE4D2]">
            Portofolio
          </h2>
          <p className="text-[#EFE4D2] lg:text-xl text-lg mb-6">
            Technical Projects that I have and continue to develop.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
            {Array.from({ length: limit }).map((_, i) => (
              <div
                key={i}
                className="bg-white/20 rounded-2xl h-72 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
              {data.map((project, index) => (
                <div
                  key={project.id}
                  className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl hover:border-white/40 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#254d70]/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      fill
                      src={`${project.projectImage}`}
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={project.title}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#254d70]/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded">
                      {project.type || "Project"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-[#254d70] group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                      {project.title}
                    </h3>
                    <div className="text-gray-600 text-sm leading-relaxed mb-6">
                      {parse(limitWords(project.description, 20))}
                    </div>

                    <div className="flex items-center justify-between">
                      <Link
                        href={`/project/${project.id}`}
                        className="group/btn relative px-4 py-2 bg-gradient-to-r from-[#254d70] to-purple-600 text-white font-medium text-sm rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#254d70]/25"
                      >
                        <span className="relative z-10">View Details</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
                      </Link>
                      <div className="w-10 h-10 bg-gradient-to-br from-[#254d70]/10 to-purple-500/10 rounded-full flex items-center justify-center group-hover:from-[#254d70]/20 group-hover:to-purple-500/20 transition-all duration-300 group-hover:scale-110">
                        <svg
                          className="w-5 h-5 text-[#254d70] group-hover:translate-x-1 transition-all duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center space-y-4 mt-16 z-1">
                <div className="flex items-center justify-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex space-x-1">
                    {getPageNumbers().map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          page === pageNum
                            ? "bg-gradient-to-r from-[#254d70] to-purple-600 text-white shadow-sm"
                            : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                  >
                    Next
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Page Info */}
                <div className="text-sm text-white">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(startIndex + limit, totalItems)} of {totalItems}{" "}
                  Portofolio
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
