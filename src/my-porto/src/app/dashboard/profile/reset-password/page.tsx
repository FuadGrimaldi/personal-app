// pages/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Breadcrumb from "@/components/Ui/breadchum/Breadchumb";
import DefaultInputResetPassword from "@/components/form/form-elements/ResetPassword";

export const metadata: Metadata = {
  title: "Portfolio Reset Password",
  description: "This is reset password page for my-porto application",
};

const ProfileResetPasswordPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Simple token check
  if (!token) {
    redirect("/login");
  }

  const link = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/profile", label: "Profile" },
    { to: "/dashboard/profile/reset-password", label: "Reset Password" },
  ];

  // Just render the component, no complex validation
  return (
    <main>
      <Breadcrumb links={link} />
      <div className="">
        <DefaultInputResetPassword />
      </div>
    </main>
  );
};

export default ProfileResetPasswordPage;
