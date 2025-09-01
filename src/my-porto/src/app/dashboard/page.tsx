// pages/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Breadcrumb from "@/components/Ui/breadchum/Breadchumb";
import DashboardIndex from "@/components/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard User",
  description: "This is dashboard page for my-porto application",
};

const DashboardPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Simple token check
  if (!token) {
    redirect("/login");
  }
  const link = [{ to: "/dashboard", label: "Dashboard" }];

  // Just render the component, no complex validation
  return (
    <main>
      <Breadcrumb links={link} />
      <DashboardIndex username={"Fuad"} />
    </main>
  );
};

export default DashboardPage;
