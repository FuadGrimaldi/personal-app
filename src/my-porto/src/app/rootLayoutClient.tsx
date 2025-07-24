"use client";

import Navbar from "@/components/Navbar/navbar";
import { useState, useEffect } from "react";
import Lines from "@/components/Lines";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import "./globals.css";

const disableNavbar = [
  "/dashboard",
  "/dashboard/project",
  "/dashboard/project/edit",
  "/dashboard/project/add",
  "/dashboard/project/edit/[id]",
];

function isNavbarDisabled(pathname: string) {
  return (
    disableNavbar.includes(pathname) ||
    pathname.startsWith("/dashboard/project/edit/")
  );
}

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // Scroll handler
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {!isNavbarDisabled(pathname) && <Navbar scrollTop={scrollTop} />}
      <Lines />
      {children}
      {!isNavbarDisabled(pathname) && <Footer />}
    </>
  );
}
