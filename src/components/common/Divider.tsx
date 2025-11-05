import React from "react";
import { cn } from "../../utils/helpers";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  children?: React.ReactNode;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  className,
  children,
}) => {
  if (orientation === "vertical") {
    return (
      <div
        className={cn("h-full w-px bg-gray-200", className)}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  if (children) {
    return (
      <div
        className={cn("relative flex items-center", className)}
        role="separator"
      >
        <div className="flex-grow border-t border-gray-200" />
        <span className="px-4 text-sm text-gray-500 bg-white">{children}</span>
        <div className="flex-grow border-t border-gray-200" />
      </div>
    );
  }

  return (
    <hr
      className={cn("border-t border-gray-200", className)}
      role="separator"
      aria-orientation="horizontal"
    />
  );
};
