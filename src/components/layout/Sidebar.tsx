import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import {
  HomeIcon,
  BriefcaseIcon,
  CalendarIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  XMarkIcon,
  PlusIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/utils/helpers";
import { ROUTES } from "@/utils/constants";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
}

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const { isSidebarOpen, closeSidebar } = useUIStore();

  const volunteerItems: SidebarItem[] = [
    {
      label: "Dashboard",
      href: ROUTES.VOLUNTEER_DASHBOARD,
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      label: "Browse Projects",
      href: ROUTES.PROJECTS,
      icon: <BriefcaseIcon className="h-5 w-5" />,
    },
    {
      label: "My Applications",
      href: ROUTES.MY_APPLICATIONS,
      icon: <DocumentTextIcon className="h-5 w-5" />,
      badge: 3,
    },
    {
      label: "My Schedule",
      href: "/schedule",
      icon: <CalendarIcon className="h-5 w-5" />,
    },
    {
      label: "Analytics",
      href: ROUTES.ANALYTICS,
      icon: <ChartBarIcon className="h-5 w-5" />,
    },
  ];

  const organizationItems: SidebarItem[] = [
    {
      label: "Dashboard",
      href: ROUTES.ORGANIZATION_DASHBOARD,
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      label: "Create Project",
      href: ROUTES.CREATE_PROJECT,
      icon: <PlusIcon className="h-5 w-5" />,
    },
    {
      label: "My Projects",
      href: ROUTES.MY_PROJECTS,
      icon: <BriefcaseIcon className="h-5 w-5" />,
    },
    {
      label: "Applications",
      href: "/applications",
      icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
      badge: 12,
    },
    {
      label: "Volunteers",
      href: "/volunteers",
      icon: <UserGroupIcon className="h-5 w-5" />,
    },
    {
      label: "Analytics",
      href: ROUTES.ANALYTICS,
      icon: <ChartBarIcon className="h-5 w-5" />,
    },
  ];

  const commonItems: SidebarItem[] = [
    {
      label: "Settings",
      href: "/settings",
      icon: <Cog6ToothIcon className="h-5 w-5" />,
    },
  ];

  const sidebarItems =
    user?.role === "VOLUNTEER" ? volunteerItems : organizationItems;

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30",
          "lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Mobile close button */}
          <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b">
            <h3 className="font-semibold text-gray-900">Menu</h3>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center justify-between px-3 py-2 rounded-lg transition-colors group",
                        isActive
                          ? "bg-primary-50 text-primary-700"
                          : "text-gray-700 hover:bg-gray-100"
                      )
                    }
                    onClick={() => closeSidebar()}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="group-hover:text-primary-600">
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="bg-primary-100 text-primary-600 text-xs font-semibold px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="my-4 border-t border-gray-200" />

            {/* Common items */}
            <ul className="space-y-1">
              {commonItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center justify-between px-3 py-2 rounded-lg transition-colors group",
                        isActive
                          ? "bg-primary-50 text-primary-700"
                          : "text-gray-700 hover:bg-gray-100"
                      )
                    }
                    onClick={() => closeSidebar()}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="group-hover:text-primary-600">
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* User info */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
