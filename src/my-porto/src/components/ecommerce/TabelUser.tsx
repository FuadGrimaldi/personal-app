"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../Ui/table";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

// Define the TypeScript interface
interface Users {
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

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function TabelUser() {
  const [data, setData] = useState<Users[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const limit = 5;
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/v2/users`);
      const result = await response.json();
      const users: Users[] = result?.data || [];

      setData(users);
      setMeta({
        total: users.length,
        page: currentPage,
        limit,
        totalPages: Math.max(1, Math.ceil(users.length / limit)),
      });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setData([]);
      setMeta({
        total: 0,
        page: 1,
        limit,
        totalPages: 1,
      });
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl, currentPage]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (currentPage > meta.totalPages) {
      setCurrentPage(meta.totalPages);
    }
  }, [currentPage, meta.totalPages]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > meta.totalPages) return;
    setCurrentPage(page);
  };

  const handleRefresh = () => {
    void fetchData();
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

  const visibleData = data.slice(
    (currentPage - 1) * limit,
    currentPage * limit,
  );

  return (
    <div className="relative z-4">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-gray-800">User</h3>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-blue-500 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M21 12a9 9 0 1 1-3-6.7" />
                <path d="M21 3v6h-6" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* ✅ Responsive Table Wrapper */}
        <div className="overflow-x-auto rounded-lg">
          <Table className="min-w-full border-collapse text-sm">
            <TableHeader className="bg-gray-200 border-y border-gray-100">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[180px]"
                >
                  Name
                </TableCell>

                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[200px]"
                >
                  Email
                </TableCell>

                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[80px]"
                >
                  Age
                </TableCell>

                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[150px]"
                >
                  Job
                </TableCell>

                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[200px]"
                >
                  Location
                </TableCell>

                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[220px]"
                >
                  Address
                </TableCell>

                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[120px]"
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
                      <div className="h-4 w-32 rounded bg-gray-200" />
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="h-4 w-40 rounded bg-gray-200" />
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="h-4 w-12 rounded bg-gray-200" />
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="h-4 w-28 rounded bg-gray-200" />
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="h-4 w-40 rounded bg-gray-200" />
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="h-4 w-48 rounded bg-gray-200" />
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="h-7 w-24 rounded bg-gray-200" />
                    </TableCell>
                  </TableRow>
                ))
              ) : visibleData.length === 0 ? (
                <TableRow>
                  <td className="py-10 text-center text-gray-400" colSpan={7}>
                    No user data found.
                  </td>
                </TableRow>
              ) : (
                visibleData.map((user: Users) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    {/* NAME */}
                    <TableCell className="py-3 font-medium text-gray-800">
                      {user.name}
                    </TableCell>

                    {/* EMAIL */}
                    <TableCell className="py-3 text-gray-600">
                      {user.email}
                    </TableCell>

                    {/* AGE */}
                    <TableCell className="py-3 text-gray-600">
                      {user.age || "-"}
                    </TableCell>

                    {/* JOB */}
                    <TableCell className="py-3 text-gray-600">
                      {user.job || "-"}
                    </TableCell>

                    {/* LOCATION */}
                    <TableCell className="py-3 text-gray-600">
                      {[user.city, user.province, user.country]
                        .filter(Boolean)
                        .join(", ") || "-"}
                    </TableCell>

                    {/* ADDRESS */}
                    <TableCell className="py-3 text-gray-600 max-w-[250px]">
                      <p className="truncate">{user.address_details || "-"}</p>
                    </TableCell>

                    {/* OPTION */}
                    <TableCell className="py-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/dashboard/users/edit/${user.id}`}
                          className="px-3 py-1 rounded bg-blue-500 text-white text-xs hover:bg-blue-600 transition"
                        >
                          Edit
                        </Link>

                        <button className="px-3 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600 transition">
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* ✅ Mobile hint */}
        <p className="text-xs text-gray-400 mt-2 block sm:hidden text-center">
          Swipe &rarr; untuk melihat seluruh kolom
        </p>

        {!isLoading && meta.totalPages > 1 && (
          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-700">
                {(currentPage - 1) * limit + 1}
              </span>{" "}
              –{" "}
              <span className="font-medium text-gray-700">
                {Math.min(currentPage * limit, meta.total)}
              </span>{" "}
              of <span className="font-medium text-gray-700">{meta.total}</span>{" "}
              results
            </p>

            <div className="flex items-center gap-1">
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

              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="flex h-8 w-8 items-center justify-center text-sm text-gray-400"
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
