"use client";
import DashboardMetrics from "./DashboardMetrics";
import { useEffect, useState } from "react";
import axios from "axios";

type DashboardIndexProps = {
  username: string;
};

export default function DashboardIndex({ username }: DashboardIndexProps) {
  const [dataProject, setDataProject] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.BACKEND_URL;
        if (!apiUrl) {
          console.error("❌ BACKEND_URL is not defined");
          return;
        }

        const response = await axios.get(`${apiUrl}/api/v2/portofolio`);
        setDataProject(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching portofolio:", error);
      }
    };

    fetchData();
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
        <DashboardMetrics countProjects={dataProject.length} countUsers={1} />
      </div>
    </div>
  );
}
