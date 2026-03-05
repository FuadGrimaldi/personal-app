// pages/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Breadcrumb from "@/components/Ui/breadchum/Breadchumb";

export const metadata: Metadata = {
  title: "Portfolio Reset Password",
  description: "This is reset password page for my-porto application",
};

const ProfileEditPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Simple token check
  if (!token) {
    redirect("/login");
  }

  const link = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/profile", label: "Profile" },
    { to: "/dashboard/profile/edit", label: "Edit Profile" },
  ];

  // Just render the component, no complex validation
  return (
    <main>
      <Breadcrumb links={link} />
      <div className="">
        <h1>Edit Profile</h1>
      </div>
    </main>
  );
};

export default ProfileEditPage;
