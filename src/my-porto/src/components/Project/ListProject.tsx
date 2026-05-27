"use client";
import { getPortofolio } from "@/services/apiPortofolio";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import parse from "html-react-parser";
import { Dropdown } from "@/components/Ui/dropdown/Dropdown";

interface Portfolio {
  id: number;
  title: string;
  projectImage: string;
  description: string;
  type: string;
  featured: string;
}

const projectTypes = [
  { label: "All", value: "" },
  { label: "Website", value: "website" },
  { label: "Mobile", value: "mobile" },
  { label: "IoT", value: "iot" },
];

const featuredOptions = [
  { label: "All", value: "" },
  { label: "Y", value: "Y" },
  { label: "N", value: "N" },
];

const limit = 6; // Jumlah item per halaman

export default function ListProject() {
  const [data, setData] = useState<Portfolio[]>([]);
  const [page, setPage] = useState(1); // ✅ mulai dari 1
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState({
    type: "",
    featured: "",
  });

  const fetchPortofolio = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPortofolio(page.toString(), limit.toString(), {
        type: filter.type,
        featured: filter.featured,
      });
      setData(res?.data?.item || []); // ✅ res.data.data bukan res.data.item
      setTotalItems(res?.data?.total || 0); // ✅ total items dari meta
    } catch (err) {
      console.error("Error fetching acara:", err);
      setData([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [filter.featured, filter.type, page]);

  const updateURL = useCallback(
    (nextPage: number, nextFilter: { type: string; featured: string }) => {
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);

        if (nextPage === 1) {
          url.searchParams.delete("page");
        } else {
          url.searchParams.set("page", nextPage.toString());
        }

        if (nextFilter.type) {
          url.searchParams.set("type", nextFilter.type);
        } else {
          url.searchParams.delete("type");
        }

        if (nextFilter.featured) {
          url.searchParams.set("featured", nextFilter.featured);
        } else {
          url.searchParams.delete("featured");
        }

        window.history.pushState({}, "", url.toString());
      }
    },
    [],
  );

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
      const typeParam = urlParams.get("type");
      const featuredParam = urlParams.get("featured");

      if (typeParam || featuredParam) {
        setFilter({
          type: typeParam ?? "",
          featured: featuredParam ?? "",
        });
      }

      if (pageParam) {
        const pageNum = parseInt(pageParam);
        if (!isNaN(pageNum) && pageNum > 0) {
          setPage(pageNum);
        }
      }
    }
  }, []);

  // Update URL ketika page berubah
  useEffect(() => {
    updateURL(page, filter);
  }, [filter, page, updateURL]);

  const setProjectType = useCallback((type: string) => {
    setPage(1);
    setFilter((current) => ({
      ...current,
      type,
    }));
  }, []);

  const setFeaturedFilter = useCallback((featured: string) => {
    setPage(1);
    setFilter((current) => ({
      ...current,
      featured,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setPage(1);
    setFilter({
      type: "",
      featured: "",
    });
  }, []);

  const toggleFilterDropdown = useCallback(() => {
    setIsFilterOpen((prev) => !prev);
  }, []);

  const closeFilterDropdown = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

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
    <div className="z-1 min-h-screen bg-gradient-to-b from-[#07111f] via-[#0b1d31] to-[#0f172a] lg:pt-[70px] pt-[50px]">
      <div className="relative z-2 mx-auto max-w-7xl backdrop-blur-sm">
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
          className="animate_top mb-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="mb-4 lg:text-5xl text-3xl font-bold tracking-tight text-[#EFE4D2]">
                Portofolio
              </h2>
              <p className="max-w-2xl text-[#E7D8C2] lg:text-xl text-base leading-relaxed">
                Technical Projects that I have and continue to develop.
              </p>
            </div>

            <div className="relative w-full sm:w-auto">
              <button
                type="button"
                onClick={toggleFilterDropdown}
                className="dropdown-toggle inline-flex w-full items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-left text-[#08111d] shadow-lg shadow-black/10 transition-all duration-300 hover:border-white/25 hover:bg-white/15 sm:w-[220px]"
              >
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#EFE4D2]/70">
                    Filters
                  </span>
                  <span className="block text-sm font-medium text-[#EFE4D2]">
                    {filter.type || filter.featured
                      ? `${filter.type || "Any type"} · ${filter.featured || "Any featured"}`
                      : "All projects"}
                  </span>
                </span>
                <svg
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <Dropdown
                isOpen={isFilterOpen}
                onClose={closeFilterDropdown}
                className="left-0 right-0 mt-3 w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0b1d31]/95 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:left-auto sm:right-0 sm:w-[420px]"
              >
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#08111d]/80">
                      Filter Projects
                    </h3>
                    <p className="mt-1 text-xs text-[#08111d]/60">
                      Choose type and featured status.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      resetFilters();
                      closeFilterDropdown();
                    }}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-[#08111d] transition-colors hover:border-white/25 hover:bg-white/10"
                  >
                    Reset
                  </button>
                </div>

                <div className="mt-2 flex flex-col gap-4">
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#08111d]/80">
                        Type
                      </h4>
                      <span className="text-[11px] text-[#08111d]/50">
                        Top row
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {projectTypes.map((item) => {
                        const active = filter.type === item.value;

                        return (
                          <button
                            key={item.value || "all-type"}
                            type="button"
                            onClick={() => setProjectType(item.value)}
                            className={`rounded-full border px-3 py-2 text-sm font-semibold transition-all duration-300 ${
                              active
                                ? "border-[#254d70] bg-[#254d70] text-white shadow-lg shadow-[#254d70]/20"
                                : "border-white/15 bg-white/5 text-[#08111d] hover:border-white/30 hover:bg-white/10"
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-2">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#08111d]/80">
                        Featured
                      </h4>
                      <span className="text-[11px] text-[#08111d]/50">
                        Bottom row
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {featuredOptions.map((item) => {
                        const active = filter.featured === item.value;

                        return (
                          <button
                            key={item.value || "all-featured"}
                            type="button"
                            onClick={() => setFeaturedFilter(item.value)}
                            className={`rounded-full border px-3 py-2 text-sm font-semibold transition-all duration-300 ${
                              active
                                ? "border-[#254d70] bg-[#254d70] text-white shadow-[#254d70]"
                                : "border-white/15 bg-white/5 text-[#08111d] hover:border-white/30 hover:bg-white/10"
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
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
            <div className="grid grid-cols-1 gap-6 pb-12 md:grid-cols-2 xl:grid-cols-3">
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
              <div className="z-1 mt-16 flex flex-col items-center space-y-4 pb-8">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
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
                  <div className="flex flex-wrap justify-center gap-1">
                    {getPageNumbers().map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          page === pageNum
                            ? "bg-gradient-to-r from-[#254d70] to-sky-600 text-white shadow-sm"
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
                    className="flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
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
                <div className="text-center text-sm text-white/90">
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
