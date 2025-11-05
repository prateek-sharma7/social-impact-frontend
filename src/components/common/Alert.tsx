import React from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { cn } from "../../utils/helpers";

export interface AlertProps {
  variant?: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  title,
  message,
  closable = false,
  onClose,
  className,
}) => {
  const variants = {
    success: {
      container: "bg-green-50 border-green-200",
      icon: "text-green-600",
      title: "text-green-800",
      message: "text-green-700",
      IconComponent: CheckCircleIcon,
    },
    error: {
      container: "bg-red-50 border-red-200",
      icon: "text-red-600",
      title: "text-red-800",
      message: "text-red-700",
      IconComponent: ExclamationCircleIcon,
    },
    warning: {
      container: "bg-yellow-50 border-yellow-200",
      icon: "text-yellow-600",
      title: "text-yellow-800",
      message: "text-yellow-700",
      IconComponent: ExclamationTriangleIcon,
    },
    info: {
      container: "bg-blue-50 border-blue-200",
      icon: "text-blue-600",
      title: "text-blue-800",
      message: "text-blue-700",
      IconComponent: InformationCircleIcon,
    },
  };

  const style = variants[variant];
  const Icon = style.IconComponent;

  return (
    <div
      className={cn(
        "rounded-lg border p-4 animate-fade-in",
        style.container,
        className
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={cn("h-5 w-5", style.icon)} />
        </div>

        <div className="ml-3 flex-1">
          {title && (
            <h3 className={cn("text-sm font-medium", style.title)}>{title}</h3>
          )}
          <div className={cn("text-sm", title ? "mt-1" : "", style.message)}>
            {message}
          </div>
        </div>

        {closable && onClose && (
          <div className="ml-auto pl-3">
            <button
              type="button"
              className={cn(
                "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
                style.icon
              )}
              onClick={onClose}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
