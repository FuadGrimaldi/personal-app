"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  FolderOpen,
  Settings,
  BarChart3,
  FileText,
  Award,
  BookOpen,
  School,
  UserCheck,
  GraduationCap,
  Shield,
  User,
  Users,
  LogOut,
  Newspaper,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/services/api";
import { useSidebar } from "@/context/SidebarContext";
import Swal from "sweetalert2";

const AdminDesSidabar = () => {
  const { isExpanded, isMobileOpen, toggleSidebar, toggleMobileSidebar } =
    useSidebar();

  const [activeItem, setActiveItem] = useState("dashboard");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const confirm = await Swal.fire({
        title: "Yakin ingin keluar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
      });
      if (!confirm.isConfirmed) return;
      await logout();
      router.push("/login");
      router.refresh();
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
      path: "/dashboard/comment",
      badge: "12",
    },
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
    const isItemExpanded = expandedItems.includes(item.id);
    const isActive = activeItem === item.id;

    const handleItemClick = () => {
      setActiveItem(item.id);
      if (hasSubItems) {
        toggleExpanded(item.id);
      }
      // Close mobile sidebar when clicking on a link
      if (isMobile && item.path) {
        toggleMobileSidebar();
      }
    };

    return (
      <div className="w-full">
        <div
          onClick={handleItemClick}
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
            {item.path ? (
              <Link href={item.path} className="flex items-center w-full">
                <Icon
                  size={isSubItem ? 16 : 18}
                  className={`flex-shrink-0 transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-500 group-hover:text-gray-700"
                  }`}
                />
                <span
                  className={`ml-3 font-medium text-sm transition-all duration-300 ease-in-out ${
                    isMobile || isExpanded
                      ? "opacity-100 w-auto"
                      : "opacity-0 w-0"
                  } overflow-hidden whitespace-nowrap`}
                >
                  {item.label}
                </span>
              </Link>
            ) : (
              <>
                <Icon
                  size={isSubItem ? 16 : 18}
                  className={`flex-shrink-0 transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-500 group-hover:text-gray-700"
                  }`}
                />
                <span
                  className={`ml-3 font-medium text-sm transition-all duration-300 ease-in-out ${
                    isMobile || isExpanded
                      ? "opacity-100 w-auto"
                      : "opacity-0 w-0"
                  } overflow-hidden whitespace-nowrap`}
                >
                  {item.label}
                </span>
              </>
            )}
          </div>

          {(isMobile || isExpanded) && hasSubItems && (
            <ChevronRight
              size={16}
              className={`ml-auto transition-transform duration-200 text-gray-400 ${
                isItemExpanded ? "rotate-90" : "rotate-0"
              }`}
            />
          )}

          {/* Tooltip hanya muncul kalau sidebar collapsed dan bukan mobile */}
          {!isMobile && !isExpanded && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
              {item.label}
            </div>
          )}
        </div>

        {/* Sub Items */}
        {(isMobile || isExpanded) && hasSubItems && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isItemExpanded ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
            }`}
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
    <>
      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          flex flex-col h-screen bg-white border-r border-gray-200 shadow-sm
          transition-all duration-300 ease-in-out
          ${
            isMobile
              ? `fixed top-0 left-0 z-40 w-64 ${
                  isMobileOpen ? "translate-x-0" : "-translate-x-full"
                }`
              : `${isExpanded ? "w-64" : "w-16"}`
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-[22px] border-b border-gray-200">
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isMobile || isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
            }`}
          >
            <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">
              Portal Admin
            </h1>
          </div>
          <button
            onClick={isMobile ? toggleMobileSidebar : toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
          >
            {isMobile ? (
              <X size={20} />
            ) : isExpanded ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-1">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 p-3 space-y-1">
          <div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-3 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-60"
            >
              <LogOut size={18} />
              {(isMobile || isExpanded) && (
                <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Mobile Hamburger Button Component
export const MobileMenuButton = () => {
  const { toggleMobileSidebar } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed top-0 w-full bg-gray-100 p-3 flex justify-start border-b border-gray-200">
      <button
        onClick={toggleMobileSidebar}
        className="p-2 rounded-lg border border-gray-200 md:hidden"
      >
        <Menu size={20} className="text-gray-600" />
      </button>
    </div>
  );
};

export default AdminDesSidabar;
