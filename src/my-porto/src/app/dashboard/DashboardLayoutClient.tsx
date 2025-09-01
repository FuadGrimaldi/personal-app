"use client";

import { SidebarProvider } from "@/context/SidebarContext";
import AppSidebar from "@/components/Layout/AppSidebar";
import Backdrop from "@/components/Layout/Backdrop";
import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ease-in-out `}>
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
      </SidebarProvider>
    </ThemeProvider>
  );
}
