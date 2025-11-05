import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUIStore } from "@/store/uiStore";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils/helpers";
import { ROUTES } from "@/utils/constants";

export const MobileMenu: React.FC = () => {
  const location = useLocation();
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();

  const menuItems = [
    { label: "Home", href: ROUTES.HOME },
    { label: "Projects", href: ROUTES.PROJECTS },
    { label: "About", href: "/about" },
    { label: "Our Impact", href: "/impact" },
  ];

  if (!isMobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={closeMobileMenu}
      />

      {/* Menu panel */}
      <div className="fixed right-0 top-0 h-full w-72 bg-white shadow-xl animate-slide-in-right">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    "block px-4 py-3 rounded-lg transition-colors",
                    location.pathname === item.href
                      ? "bg-primary-50 text-primary-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
