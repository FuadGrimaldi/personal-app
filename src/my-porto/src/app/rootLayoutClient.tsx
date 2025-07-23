"use client";

import Navbar from "@/components/Navbar/navbar";
import { useState, useEffect } from "react";
import Lines from "@/components/Lines";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import "./globals.css";

const disableNavbar = [
  "/dashboard",
  "/admin/user",
  "/admin/dashboard",
  "/admin",
  "/user",
  "/user/dashboard",
  "/user/report",
  "/user/input-telur",
  "/user/controlling",
  "/user/setting",
  "/user/setting/edit-profile",
  "/user/setting/add-address",
  "/user/setting/edit-address",
];

declare global {
  interface Window {
    particlesJS: {
      load: (tagId: string, path: string, callback?: () => void) => void;
    };
  }
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

  useEffect(() => {
    // Cegah duplikasi
    if (document.getElementById("particles-js")) return;

    // Tambahkan elemen container
    const container = document.createElement("div");
    container.id = "particles-js";
    container.className = "fixed top-0 left-0 w-full h-full z-1";
    document.body.prepend(container);

    // Tambahkan script jika belum ada
    const existingScript = document.querySelector(
      "script[src='/particles.js']"
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "/particles.js";
      script.async = true;
      script.onload = () => {
        if (window.particlesJS) {
          window.particlesJS.load("particles-js", "/particles.json", () => {
            console.log("Particles.js loaded from RootLayout");
          });
        }
      };
      document.body.appendChild(script);
    } else {
      // Script sudah ada, langsung load config
      if (window.particlesJS) {
        window.particlesJS.load("particles-js", "/particles.json", () => {
          console.log("Particles.js loaded (script already present)");
        });
      }
    }

    // Clean-up saat unmount layout
    return () => {
      const el = document.getElementById("particles-js");
      if (el) el.remove();
    };
  }, []);

  return (
    <>
      {!disableNavbar.includes(pathname) && <Navbar scrollTop={scrollTop} />}
      <Lines />
      {children}
      {!disableNavbar.includes(pathname) && <Footer />}
    </>
  );
}
