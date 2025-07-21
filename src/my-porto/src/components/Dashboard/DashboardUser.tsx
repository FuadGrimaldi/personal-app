"use client";

import { useEffect, useState } from "react";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { PacmanLoader } from "react-spinners";

const DashboardClient = () => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!hasCookie("Authorization")) {
      router.push("/");
    } else {
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <PacmanLoader color="#254d70" size={50} />
      </div>
    );
  }

  return (
    <>
      <h1>Dashboard User</h1>
      {/* Add your dashboard user content here */}
    </>
  );
};

export default DashboardClient;
