"use client";
import { useSidebar } from "@/context/SidebarContext";
import React from "react";

const Backdrop: React.FC = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 bg-black bg-opacity-50"
      onClick={toggleMobileSidebar}
    />
  );
};

export default Backdrop;
