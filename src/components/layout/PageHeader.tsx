import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";
import { Button } from "@/components/common";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  className,
}) => {
  return (
    <div className={className}>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-4" />}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {title}
          </h1>
          {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
        </div>

        {actions && (
          <div className="mt-4 sm:mt-0 sm:ml-6 flex items-center space-x-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
