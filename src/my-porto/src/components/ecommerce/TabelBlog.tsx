"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../Ui/table";
import Badge from "../Ui/badge/Badge";
import Image from "next/image";
import parse from "html-react-parser";
import Link from "next/link";
import DeleteBlogButton from "../Ui/button/ButtonRemoveBlog";
import { getBlog } from "@/services/apiBlog";
import { useState, useEffect } from "react";

// Define the TypeScript interface
interface Blog {
  id: number;
  id_user: number;
  title: string;
  slug: string;
  image: string;
  description: string;
  type: string;
}

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function TabelBlog() {
  const [data, setData] = useState<Blog[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 5;

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const limitWords = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  const fetchData = async (page: number) => {
    setIsLoading(true);
    try {
      const res = await getBlog(page.toString(), limit.toString());
      setData(res?.data.item || res?.data || []);
      setMeta({
        total: res?.data.total ?? 0,
        page: res?.data.page ?? page,
        limit: res?.data.limit ?? limit,
        totalPages: res?.data.totalPages ?? 1,
      });
    } catch (error) {
      console.error("Failed to fetch blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > meta.totalPages) return;
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const { totalPages } = meta;

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="relative z-4">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Blog</h3>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/blog/add"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-blue-500 hover:text-white"
            >
              Add
            </Link>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-blue-500 hover:text-white">
              Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-blue-500 hover:text-white">
              See all
            </button>
          </div>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto rounded-lg">
          <Table className="min-w-full border-collapse text-sm">
            <TableHeader className="bg-gray-200 border-y border-gray-100">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[180px]"
                >
                  User
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[180px]"
                >
                  Blog Title
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[220px]"
                >
                  Description
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[120px]"
                >
                  Category
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[100px]"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[150px]"
                >
                  Option
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100">
              {isLoading ? (
                Array.from({ length: limit }).map((_, i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell className="py-3">
                      <div className="h-4 w-12 bg-gray-200 rounded" />
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-[50px] w-[50px] rounded-md bg-gray-200 flex-shrink-0" />
                        <div className="h-4 w-28 bg-gray-200 rounded" />
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="h-4 w-48 bg-gray-200 rounded" />
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="h-5 w-16 bg-gray-200 rounded-full" />
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="h-7 w-24 bg-gray-200 rounded" />
                    </TableCell>
                  </TableRow>
                ))
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell className="py-10 text-center text-gray-400 colspan-6">
                    No blog data found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell className="py-3 text-gray-600 text-sm">
                      {item.id_user}
                    </TableCell>

                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-[50px] w-[50px] overflow-hidden rounded-md flex-shrink-0">
                          <Image
                            fill
                            src={`${baseUrl}/${item.image}`}
                            className="object-cover"
                            alt={item.title}
                            unoptimized={true}
                            sizes="(max-width: 640px) 100vw, 50px"
                          />
                        </div>
                        <p className="font-medium text-gray-800 text-sm sm:text-base">
                          {item.title}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="py-3 text-gray-600 text-sm">
                      {parse(limitWords(item.description, 10))}
                    </TableCell>

                    <TableCell className="py-3 text-gray-600 text-sm">
                      {parse(limitWords(item.type, 10))}
                    </TableCell>

                    <TableCell className="py-3">
                      <Badge size="sm" color="success">
                        Published
                      </Badge>
                    </TableCell>

                    <TableCell className="py-3">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/dashboard/blog/edit/${item.id}`}
                          className="px-3 py-1 rounded bg-blue-500 text-white text-xs sm:text-sm hover:bg-blue-600 transition"
                        >
                          Edit
                        </Link>
                        <DeleteBlogButton blogId={item.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile hint */}
        <p className="text-xs text-gray-400 mt-2 block sm:hidden text-center">
          Swipe &rarr; untuk melihat seluruh kolom
        </p>

        {/* Pagination */}
        {!isLoading && meta.totalPages > 1 && (
          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            {/* Info */}
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-700">
                {(meta.page - 1) * meta.limit + 1}
              </span>{" "}
              –{" "}
              <span className="font-medium text-gray-700">
                {Math.min(meta.page * meta.limit, meta.total)}
              </span>{" "}
              of <span className="font-medium text-gray-700">{meta.total}</span>{" "}
              results
            </p>

            {/* Page buttons */}
            <div className="flex items-center gap-1">
              {/* Prev */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-500 transition hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Page numbers */}
              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="flex h-8 w-8 items-center justify-center text-gray-400 text-sm"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page as number)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border text-sm font-medium transition ${
                      currentPage === page
                        ? "border-blue-500 bg-blue-500 text-white shadow"
                        : "border-gray-300 bg-white text-gray-600 hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              {/* Next */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === meta.totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-500 transition hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
