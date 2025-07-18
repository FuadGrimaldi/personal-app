"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = ({ scrollTop }: { scrollTop: number }) => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/home" },
    { label: "Project", href: "/#project" },
    { label: "Support", href: "/support" },
    { label: "Docs", href: "/docs" },
  ];

  return (
    <>
      {/* Navbar Fixed */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrollTop < 50 ? "bg-transparent" : "bg-[#254d70]"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 lg:px-0 py-4">
          {/* Logo */}
          <div className="relative h-20 w-[120px] sm:w-[150px] md:w-[200px]">
            <Link href="/">
              <Image
                src="/assets/logo-fuad.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden btn btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-2 text-xl">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`hover:bg-[#EFE4D2] hover:text-black rounded-[15px] px-3 py-2 transition-all duration-300 ${
                    pathName === href ? "text-black" : "text-white"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/login"
                className={`rounded-[15px] px-6 py-2 font-semibold ${
                  pathName === "/login"
                    ? "bg-[#10375C] text-white"
                    : "bg-gray-100 text-[#3f2013]"
                }`}
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
            />

            {/* Sidebar */}
            <motion.aside
              className="fixed top-0 right-0 h-full w-[70%] max-w-sm bg-white z-50 shadow-lg p-6 flex flex-col gap-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Menu</h2>
                <button onClick={() => setIsOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <ul className="flex flex-col gap-4 text-lg">
                {navLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={`hover:underline transition-all ${
                        pathName === href ? "text-[#10375C]" : "text-black"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
