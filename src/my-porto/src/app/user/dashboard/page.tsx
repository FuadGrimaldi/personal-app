import DashboardClient from "@/components/Dashboard/DashboardUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard User",
  description: "This is dashboard page for my-porto application",
  // other metadata
};

const SigninPage = () => {
  return (
    <>
      <DashboardClient />
    </>
  );
};

export default SigninPage;
