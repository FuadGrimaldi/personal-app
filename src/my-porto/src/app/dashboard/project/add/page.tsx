// pages/dashboard/page.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Breadcrumb from "@/components/Ui/breadchum/Breadchumb";
import DefaultAdd from "@/components/form/form-elements/InputAddPortofolio";

export const metadata: Metadata = {
  title: "Add Porto",
  description: "This is portofolio page for my-porto application",
};

const DashboardPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Simple token check
  if (!token) {
    redirect("/login");
  }

  const link = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/project", label: "Project" },
    { to: `/dashboard/project/add`, label: `Add Project` },
  ];

  // Just render the component, no complex validation
  return (
    <main>
      <Breadcrumb links={link} />
      <div className="">
        <div className="space-y-6">
          <DefaultAdd />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
