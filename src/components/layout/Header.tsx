import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import {
  Bars3Icon,
  BellIcon,
  ChatBubbleLeftIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Badge,
  Avatar,
  Dropdown,
  SearchInput,
} from "@/components/common";
import { ROUTES, APP_NAME } from "@/utils/constants";
import { NotificationDropdown } from "../../components/notifications/NotificationDropdown";
import { useAuth } from "@/hooks/useAuth";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { toggleMobileMenu } = useUIStore();
  const { logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(query)}`);
      setShowSearch(false);
    }
  };

  const userMenuItems = [
    {
      label: "My Profile",
      icon: <UserCircleIcon className="h-5 w-5" />,
      onClick: () => navigate(ROUTES.PROFILE),
    },
    {
      label: "Dashboard",
      onClick: () =>
        navigate(
          user?.role === "VOLUNTEER"
            ? ROUTES.VOLUNTEER_DASHBOARD
            : ROUTES.ORGANIZATION_DASHBOARD
        ),
    },
    // FIX: Added a dummy onClick function to satisfy the type
    { label: "divider-1", divider: true, onClick: () => {} },
    {
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
    {
      label: "Help & Support",
      onClick: () => navigate("/help"),
    },
    // FIX: Added a dummy onClick function to satisfy the type
    { label: "divider-2", divider: true, onClick: () => {} },
    {
      label: "Logout",
      onClick: logout,
      danger: true,
    },
  ];

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Left section */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={toggleMobileMenu}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>

              {/* Logo */}
              <Link to={ROUTES.HOME} className="flex items-center ml-2 md:ml-0">
                <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SI</span>
                </div>
                <span className="ml-3 text-xl font-display font-bold text-gray-900 hidden sm:block">
                  {APP_NAME}
                </span>
              </Link>
            </div>

            {/* Center section - Navigation */}
            <nav className="hidden md:flex items-center space-x-8 ml-10">
              <Link
                to={ROUTES.HOME}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to={ROUTES.PROJECTS}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Projects
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                About
              </Link>
              <Link
                to="/impact"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Our Impact
              </Link>
            </nav>

            {/* Right section */}
            <div className="flex items-center space-x-4">
              {/* Search button */}
              <button
                type="button"
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setShowSearch(true)}
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>

              {isAuthenticated ? (
                <>
                  {/* Messages */}
                  <button
                    type="button"
                    className="p-2 rounded-md text-gray-700 hover:bg-gray-100 relative"
                    onClick={() => navigate(ROUTES.MESSAGES)}
                  >
                    <ChatBubbleLeftIcon className="h-5 w-5" />
                    <Badge
                      variant="danger"
                      size="sm"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full"
                    >
                      3
                    </Badge>
                  </button>

                  {/* Notifications */}
                  <button
                    type="button"
                    className="p-2 rounded-md text-gray-700 hover:bg-gray-100 relative"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <BellIcon className="h-5 w-5" />
                    <Badge
                      variant="danger"
                      size="sm"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full"
                    >
                      5
                    </Badge>
                  </button>

                  {/* User menu */}
                  <Dropdown
                    trigger={
                      <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
                        <Avatar
                          name={`${user?.firstName} ${user?.lastName}`}
                          src={user?.profilePictureUrl}
                          size="sm"
                        />
                        <span className="hidden sm:block text-sm font-medium text-gray-700">
                          {user?.firstName}
                        </span>
                      </button>
                    }
                    items={userMenuItems}
                  />
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    onClick={() => navigate(ROUTES.LOGIN)}
                  >
                    Sign in
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate(ROUTES.REGISTER)}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 animate-fade-in">
          <div className="flex items-start justify-center pt-20 px-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl animate-slide-down">
              <div className="p-4">
                <SearchInput
                  onSearch={handleSearch}
                  placeholder="Search projects, organizations, or volunteers..."
                  className="text-lg"
                  debounceMs={0}
                />
              </div>
              <button
                onClick={() => setShowSearch(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Dropdown */}
      {showNotifications && (
        <NotificationDropdown onClose={() => setShowNotifications(false)} />
      )}
    </>
  );
};
