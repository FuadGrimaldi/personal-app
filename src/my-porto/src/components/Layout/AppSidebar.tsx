"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  FolderOpen,
  GraduationCap,
  User,
  Settings,
  BarChart3,
  FileText,
  Users,
  Award,
  BookOpen,
  School,
  UserCheck,
  Shield,
  HelpCircle,
  LogOut,
  Newspaper,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/services/api";

const AppSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [expandedItems, setExpandedItems] = useState(["projects"]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev: string[]) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();

      // Redirect ke login
      router.push("/login");
      router.refresh(); // Refresh untuk memastikan state aplikasi ter-update
    } catch {
      router.push("/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderOpen,
      subItems: [
        {
          id: "all-projects",
          label: "All Projects",
          icon: FileText,
          path: "/dashboard/project",
        },
      ],
    },
    {
      id: "education",
      label: "Education",
      icon: GraduationCap,
      path: "/dashboard/education",
      subItems: [
        { id: "courses", label: "Courses", icon: BookOpen },
        { id: "certifications", label: "Certifications", icon: Award },
        { id: "schools", label: "Schools", icon: School },
        { id: "skills", label: "Skills", icon: Users },
      ],
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      subItems: [
        {
          id: "personal-info",
          label: "Personal Info",
          icon: UserCheck,
          path: "/dashboard/user",
        },
        { id: "security", label: "Security", icon: Shield },
        { id: "preferences", label: "Preferences", icon: Settings },
      ],
    },
    {
      id: "report",
      label: "Reports",
      icon: BarChart3,
      path: "/dashboard",
    },
    {
      id: "user",
      label: "Users",
      icon: Users,
      path: "/dashboard/user",
    },
    {
      id: "blog",
      label: "Blogs",
      icon: Newspaper,
      path: "/dashboard/blog",
      badge: "5",
    },
    {
      id: "comment",
      label: "Comments",
      icon: MessageCircle,
      path: "/dashboard",
      badge: "12",
    },
  ];

  const bottomItems = [
    { id: "help", label: "Help & Support", icon: HelpCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  type MenuSubItem = {
    id: string;
    label: string;
    icon: React.ElementType;
    path?: string;
    badge?: string;
  };

  type MenuItemType = {
    id: string;
    label: string;
    icon: React.ElementType;
    path?: string;
    badge?: string;
    subItems?: MenuSubItem[];
  };

  const MenuItem = ({
    item,
    isSubItem = false,
  }: {
    item: MenuItemType | MenuSubItem;
    isSubItem?: boolean;
  }) => {
    const Icon = item.icon;
    const hasSubItems =
      "subItems" in item && item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = activeItem === item.id;

    return (
      <div className="w-full">
        <div
          onClick={() => {
            setActiveItem(item.id);
            if (hasSubItems) {
              toggleExpanded(item.id);
            }
          }}
          className={`
            flex items-center w-full px-3 py-2.5 rounded-lg cursor-pointer
            transition-all duration-200 ease-in-out group relative
            ${
              isActive
                ? "bg-blue-50 text-blue-600 shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }
            ${isSubItem ? "ml-6 py-2" : ""}
          `}
        >
          <div className="flex items-center flex-1 min-w-0">
            <Link href={item.path || "#"} className="flex items-center w-full">
              <Icon
                size={isSubItem ? 16 : 18}
                className={`
                flex-shrink-0 transition-colors duration-200
                ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500 group-hover:text-gray-700"
                }
              `}
              />
              <span
                className={`
                ml-3 font-medium text-sm transition-all duration-300 ease-in-out
                ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}
                overflow-hidden whitespace-nowrap
              `}
              >
                {item.label}
              </span>
            </Link>
          </div>

          {!isCollapsed && item.badge && (
            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[1.25rem] text-center">
              {item.badge}
            </span>
          )}

          {!isCollapsed && hasSubItems && (
            <ChevronRight
              size={16}
              className={`
                ml-auto transition-transform duration-200 text-gray-400
                ${isExpanded ? "rotate-90" : "rotate-0"}
              `}
            />
          )}

          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
              {item.label}
            </div>
          )}
        </div>

        {/* Sub items */}
        {!isCollapsed && hasSubItems && (
          <div
            className={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${isExpanded ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="mt-1 space-y-1">
              {item.subItems?.map((subItem) => (
                <MenuItem key={subItem.id} item={subItem} isSubItem={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`
      relative flex flex-col h-screen bg-white border-r border-gray-200 shadow-sm
      transition-all duration-300 ease-in-out
      ${isCollapsed ? "w-16" : "w-64"}
    `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-[22px] border-b border-gray-200">
        <div
          className={`
          transition-all duration-300 ease-in-out overflow-hidden
          ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}
        `}
        >
          <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">
            Dashboard
          </h1>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-gray-200 p-3 space-y-1">
        {bottomItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
        <div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-60"
          >
            <LogOut size={18} />
            {!isCollapsed && (
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
