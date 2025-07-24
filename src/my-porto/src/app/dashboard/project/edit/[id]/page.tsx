// pages/dashboard/page.tsx
import DefaultInputs from "@/components/form/form-elements/InputEditPortofolio";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Breadcrumb from "@/components/Ui/breadchum/Breadchumb";

export const metadata: Metadata = {
  title: "Edit Porto",
  description: "This is portofolio page for my-porto application",
};

interface PageProps {
  params: { id: string };
}

const DashboardPage = async ({ params }: PageProps) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { id } = params;
  // Simple token check
  if (!token) {
    redirect("/login");
  }

  const link = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/project", label: "Project" },
    { to: `/dashboard/project/edit/${id}`, label: `Edit Project` },
  ];

  // Just render the component, no complex validation
  return (
    <main>
      <Breadcrumb links={link} />
      <div className="">
        <div className="space-y-6">
          <DefaultInputs id={id} />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
