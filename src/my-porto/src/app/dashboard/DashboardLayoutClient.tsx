"use client";

import { SidebarProvider } from "@/context/SidebarContext";
import AppSidebar, { MobileMenuButton } from "@/components/Layout/AppSidebar";
import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { useSidebar } from "@/context/SidebarContext";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar();
  return (
    <div className="min-h-screen">
      {/* Sidebar Fixed */}
      <div className="fixed z-30  md:hidden">
        <MobileMenuButton />
      </div>
      <div className="fixed z-40">
        <AppSidebar />
      </div>
      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded ? "ml-64" : "lg:ml-16 ml-0"
        }`}
      >
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6 lg:mt-0 mt-16">
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
