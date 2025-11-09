import React from "react";
import { Card, CardContent } from "@/components/common";
import { cn } from "@/utils/helpers";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  color?: "primary" | "secondary" | "accent" | "purple";
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = "primary",
}) => {
  const colorClasses = {
    primary: "bg-primary-100 text-primary-600",
    secondary: "bg-secondary-100 text-secondary-600",
    accent: "bg-accent-100 text-accent-600",
    purple: "bg-purple-100 text-purple-600",
  };

  const trendColor =
    trend && trend.value > 0 ? "text-green-600" : "text-red-600";

  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
              {subtitle && (
                <span className="ml-2 text-sm text-gray-500">{subtitle}</span>
              )}
            </div>
            {trend && (
              <p className={cn("mt-2 text-sm", trendColor)}>
                {trend.value > 0 ? "+" : ""}
                {trend.value}% {trend.label}
              </p>
            )}
          </div>
          <div className={cn("p-3 rounded-lg", colorClasses[color])}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
