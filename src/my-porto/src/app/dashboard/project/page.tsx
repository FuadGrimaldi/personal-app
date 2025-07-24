// pages/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import Breadcrumb from "@/components/Ui/breadchum/Breadchumb";

export const metadata: Metadata = {
  title: "Portfolio User",
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
  ];

  // Just render the component, no complex validation
  return (
    <main>
      <Breadcrumb links={link} />
      <div className="">
        <RecentOrders />
      </div>
    </main>
  );
};

export default DashboardPage;
