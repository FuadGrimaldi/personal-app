// pages/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Breadcrumb from "@/components/Ui/breadchum/Breadchumb";
import TabelComment from "@/components/ecommerce/TabelComment";

export const metadata: Metadata = {
  title: "Comment - Portfolio User",
  description: "This is comment page for my-porto application",
};

const CommentPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Simple token check
  if (!token) {
    redirect("/login");
  }

  const link = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/comment", label: "Comments" },
  ];

  // Just render the component, no complex validation
  return (
    <main>
      <Breadcrumb links={link} />
      <div className="">
        <TabelComment />
      </div>
    </main>
  );
};

export default CommentPage;
