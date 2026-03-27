import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Breadcrumb from "@/components/Ui/breadchum/Breadchumb";
import DefaultInputsBlog from "@/components/form/form-elements/InputEditBlog";

export const metadata: Metadata = {
  title: "Edit Blog",
  description: "This is Blog page for my-porto application",
};

type Params = Promise<{ id: string }>;

export default async function DashboardBlogEditPage({
  params,
}: {
  params: Params;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { id } = await params;

  if (!token) {
    redirect("/login");
  }

  const link = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/blog", label: "Blog" },
    { to: `/dashboard/blog/edit/`, label: `Edit Blog` },
    { to: `/dashboard/blog/edit/${id}`, label: `${id}` },
  ];

  return (
    <main>
      <Breadcrumb links={link} />
      <div className="space-y-6">
        <DefaultInputsBlog id={id} />
      </div>
    </main>
  );
}
