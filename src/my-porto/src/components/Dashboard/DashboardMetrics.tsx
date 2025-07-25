"use client";
import React from "react";
import Badge from "../Ui/badge/Badge";
import Image from "next/image";
import Link from "next/link";

export const DashboardMetrics = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <Link
        href="/dashboard/user"
        className="relative z-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1  md:p-6"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl ">
          <Image
            src="/assets/icons/user-circle.svg"
            alt="Revenue Icon"
            width={24}
            height={24}
            className="text-gray-600 size-6 "
          />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm lg:text-xl text-gray-500 ">Users</span>
            <h4 className="mt-2 font-bold text-gray-600 text-title-sm ">1</h4>
          </div>
          <Badge color="success">
            {/* <ArrowUpIcon /> */}
            <Image
              width={24}
              height={24}
              src="/assets/icons/arrow-up.svg"
              className="h-4 w-4"
              style={{ width: "auto", height: "auto" }}
              alt="Arrow up"
            />
            100,0%
          </Badge>
        </div>
      </Link>
      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}
      <Link
        href="/dashboard/blog"
        className="relative z-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1  md:p-6"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl ">
          <Image
            src="/assets/icons/pencil.svg"
            alt="Revenue Icon"
            width={24}
            height={24}
            className="text-gray-600 size-6 "
          />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm lg:text-xl text-gray-500 ">Blogs</span>
            <h4 className="mt-2 font-bold text-gray-600 text-title-sm ">0</h4>
          </div>
          <Badge color="success">
            {/* <ArrowUpIcon /> */}
            <Image
              width={24}
              height={24}
              src="/assets/icons/arrow-up.svg"
              className="h-4 w-4"
              style={{ width: "auto", height: "auto" }}
              alt="Arrow up"
            />
            100,0%
          </Badge>
        </div>
      </Link>
      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}
      <Link
        href="/dashboard/education"
        className="relative z-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1  md:p-6"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl ">
          <Image
            src="/assets/icons/folder.svg"
            alt="Revenue Icon"
            width={24}
            height={24}
            className="text-gray-600 size-6 "
          />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm lg:text-xl text-gray-500 ">
              Educations
            </span>
            <h4 className="mt-2 font-bold text-gray-600 text-title-sm ">2</h4>
          </div>
          <Badge color="success">
            {/* <ArrowUpIcon /> */}
            <Image
              width={24}
              height={24}
              src="/assets/icons/arrow-up.svg"
              className="h-4 w-4"
              style={{ width: "auto", height: "auto" }}
              alt="Arrow up"
            />
            100,0%
          </Badge>
        </div>
      </Link>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <Link
        href="/dashboard/project"
        className="relative z-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1  md:p-6"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl ">
          <Image
            src="/assets/icons/box.svg"
            alt="Orders Icon"
            width={24}
            height={24}
            className="text-gray-600 size-6 "
          />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm lg:text-xl text-gray-500 ">Project</span>
            <h4 className="mt-2 font-bold text-gray-600 text-title-sm ">4</h4>
          </div>

          <Badge color="success">
            <Image
              src="/assets/icons/arrow-down.svg"
              alt="Decrease Icon"
              width={16}
              height={16}
              className="text-error-500"
            />
            100,0%
          </Badge>
        </div>
      </Link>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
