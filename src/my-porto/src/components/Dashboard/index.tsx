"use client";
import { getComments } from "@/services/apiComment";
import DashboardMetrics from "./DashboardMetrics";
import { getPortofolio } from "@/services/apiPortofolio";
import { useEffect, useState } from "react";

type DashboardIndexProps = {
  username: string;
};

export default function DashboardIndex({ username }: DashboardIndexProps) {
  const [dataProject, setDataProject] = useState([]);
  const [dataComment, setDataComment] = useState([]);
  // const [dataBlog, setDataBlog] = useState([]);
  useEffect(() => {
    async function fetchDataProject() {
      try {
        const res = await getPortofolio();
        const resComment = await getComments();
        setDataComment(resComment?.data.comments || []);
        setDataProject(res?.data || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    }
    fetchDataProject();
  }, []);

  return (
    <div>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {username}
            </h1>
            <p className="text-blue-100">
              Here&#39;s what&#39;s happening with your projects today.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">
            Dashboard Overview
          </h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
        <DashboardMetrics
          countProjects={dataProject.length}
          countUsers={1}
          countBlogs={0}
          countComents={dataComment.length}
        />
      </div>
    </div>
  );
}
