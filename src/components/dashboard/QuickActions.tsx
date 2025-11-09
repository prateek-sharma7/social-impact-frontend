import React from "react";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { ROUTES } from "@/utils/constants";

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

export const QuickActions: React.FC = () => {
  const actions: QuickAction[] = [
    {
      title: "Browse Projects",
      description: "Find new volunteer opportunities",
      icon: <MagnifyingGlassIcon className="h-6 w-6" />,
      href: ROUTES.PROJECTS,
      color: "bg-primary-100 text-primary-600",
    },
    {
      title: "My Applications",
      description: "Track your project applications",
      icon: <DocumentTextIcon className="h-6 w-6" />,
      href: ROUTES.MY_APPLICATIONS,
      color: "bg-secondary-100 text-secondary-600",
    },
    {
      title: "View Analytics",
      description: "See your volunteering impact",
      icon: <ChartBarIcon className="h-6 w-6" />,
      href: ROUTES.ANALYTICS,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Schedule",
      description: "Manage your volunteering calendar",
      icon: <CalendarIcon className="h-6 w-6" />,
      href: "/schedule",
      color: "bg-accent-100 text-accent-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Link key={index} to={action.href} className="group">
          <div className={`inline-flex p-3 rounded-lg ${action.color} mb-4`}>
            {action.icon}
          </div>
          <div>
            <h3 className="font-semibold">{action.title}</h3>
            <p className="text-sm text-gray-500">{action.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
