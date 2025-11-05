import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/utils/helpers";

export const DashboardLayout: React.FC = () => {
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main
          className={cn(
            "flex-1 transition-all duration-300 w-full",
            "lg:ml-64",
            isSidebarOpen ? "ml-64" : "ml-0"
          )}
        >
          <div className="p-4 sm:p-6 lg:p-8 max-w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
