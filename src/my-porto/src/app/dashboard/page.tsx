// pages/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { DashboardMetrics } from "@/components/Dashboard/DashboardMetrics";
import Breadcrumb from "@/components/Ui/breadchum/Breadchumb";

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
      <div className="grid grid-cols-6 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <DashboardMetrics />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
