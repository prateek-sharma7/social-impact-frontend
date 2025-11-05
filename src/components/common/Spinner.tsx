import React from "react";
import { cn } from "../../utils/helpers";

export interface SpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "white" | "gray";
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "primary",
  className,
}) => {
  const sizes = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  const colors = {
    primary: "text-primary-600",
    secondary: "text-secondary-600",
    white: "text-white",
    gray: "text-gray-600",
  };

  return (
    <svg
      className={cn("animate-spin", sizes[size], colors[color], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray="31.415, 31.415"
        strokeDashoffset="0"
      />
    </svg>
  );
};

export const LoadingOverlay: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="text-center text-white">
        {message && <p className="text-lg">{message}</p>}
        <Spinner size="lg" color="white" />
      </div>
    </div>
  );
};
