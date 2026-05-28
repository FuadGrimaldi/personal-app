"use client";
import { getComments } from "@/services/apiComment";
import { getBlog } from "@/services/apiBlog";
import DashboardChart from "./DashboardChart";
import { getPortofolio } from "@/services/apiPortofolio";
import { useEffect, useState } from "react";
import { getUser } from "@/services/apiUser";

type DashboardIndexProps = {
  username: string;
};

type ProjectItem = {
  title?: string;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
};

type BlogItem = {
  title?: string;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
};

type CommentItem = {
  fullname?: string;
  message?: string;
  createdAt?: string;
  updatedAt?: string;
};

type UserItem = {
  name?: string;
  username?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
};

type DashboardChartSummary = {
  label: string;
  value: string | number;
  change: string;
  tone: "positive" | "neutral" | "warning" | "info";
};

export default function DashboardIndex({ username }: DashboardIndexProps) {
  const page = 1;
  const limit = 100;
  const [dataProject, setDataProject] = useState<ProjectItem[]>([]);
  const [dataComment, setDataComment] = useState<CommentItem[]>([]);
  const [dataBlog, setDataBlog] = useState<BlogItem[]>([]);
  const [dataUser, setDataUser] = useState<UserItem[]>([]);

  const chartSummary: DashboardChartSummary[] = [
    {
      label: "Total Users",
      value: dataUser.length,
      change: `${dataUser.length ? "+" : ""}${dataUser.length} active profiles`,
      tone: "positive",
    },
    {
      label: "Projects",
      value: dataProject.length,
      change: `${dataProject.length ? "+" : ""}${dataProject.length} portfolio items`,
      tone: "info",
    },
    {
      label: "Blog Posts",
      value: dataBlog.length,
      change: `${dataBlog.length ? "+" : ""}${dataBlog.length} published entries`,
      tone: "neutral",
    },
    {
      label: "Comments",
      value: dataComment.length,
      change: `${dataComment.length ? "+" : ""}${dataComment.length} interactions`,
      tone: "warning",
    },
  ];

  useEffect(() => {
    async function fetchDataProject() {
      try {
        const res = await getPortofolio(page.toString(), limit.toString(), {
          type: "",
          featured: "",
        });
        const resComment = await getComments(
          page.toString(),
          limit.toString(),
          {
            portofolio: "",
          },
        );
        const resUser = await getUser();
        const resBlog = await getBlog(page.toString(), limit.toString(), {
          type: "",
        });
        setDataComment(resComment?.data.comments || []);
        setDataUser(resUser?.data || []);
        setDataProject(res?.data?.item || []);
        setDataBlog(resBlog?.data?.item || []);
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
        {/* <DashboardMetrics
          countProjects={dataProject.length}
          countUsers={dataUser.length}
          countBlogs={dataBlog.length}
          countComents={dataComment.length}
        /> */}
        <DashboardChart
          title="Operational Activity"
          subtitle="A live view of the latest users, projects, blog posts, and comments pulled from the current dashboard data."
          summary={chartSummary}
          projects={dataProject}
          blogs={dataBlog}
          comments={dataComment}
          users={dataUser}
        />
      </div>
    </div>
  );
}
