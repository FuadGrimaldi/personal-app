"use client";
import React from "react";
import Link from "next/link";
import {
  LucideIcon,
  TrendingUp,
  TrendingDown,
  Users,
  FolderOpen,
  DollarSign,
  FileText,
  Home,
  Settings,
  MessageCircle,
  GraduationCap,
} from "lucide-react";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  users: Users,
  folder: FolderOpen,
  dollar: DollarSign,
  file: FileText,
  home: Home,
  Coment: MessageCircle,
  graduationCap: GraduationCap, // Assuming graduationCap maps to FolderOpen
  settings: Settings,
};

type CardDashboardProps = {
  title: string;
  iconName: string; // Ubah dari icon ke iconName (string)
  count: number;
  percentageChange: string;
  isPositive?: boolean;
  href?: string;
  gradient?: string;
};

const CardDashboard: React.FC<CardDashboardProps> = ({
  title,
  iconName, // Terima string
  count,
  percentageChange,
  isPositive = true,
  href = "/dashboard",
  gradient = "from-blue-500 to-purple-600",
}) => {
  // Get icon component from mapping
  const Icon = iconMap[iconName] || Users; // Fallback ke Users icon

  // Helper function to format number consistently
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-gray-200"
    >
      {/* Background Gradient Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      {/* Icon Container */}
      <div
        className={`relative mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      {/* Content */}
      <div className="relative">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
          {title}
        </p>

        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-gray-900">
            {formatNumber(count)}
          </h3>

          {/* Percentage Badge */}
          <div
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
              isPositive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{percentageChange}</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 opacity-10">
        <div
          className={`w-full h-full rounded-full bg-gradient-to-br ${gradient}`}
        />
      </div>

      {/* Hover Effect Line */}
      <div
        className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${gradient} group-hover:w-full transition-all duration-300`}
      />
    </Link>
  );
};

export default CardDashboard;
