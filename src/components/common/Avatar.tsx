import React from "react";
import { cn, getInitials, generateColorFromString } from "../../utils/helpers";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  online?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = "md",
  className,
  online,
}) => {
  const sizes = {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
    xl: "h-16 w-16 text-xl",
    "2xl": "h-20 w-20 text-2xl",
  };

  const onlineSizes = {
    xs: "h-1.5 w-1.5",
    sm: "h-2 w-2",
    md: "h-2.5 w-2.5",
    lg: "h-3 w-3",
    xl: "h-3.5 w-3.5",
    "2xl": "h-4 w-4",
  };

  const initials = name ? getInitials(name) : "?";
  const backgroundColor = name ? generateColorFromString(name) : "#9CA3AF";

  return (
    <div className={cn("relative inline-block", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-semibold text-white overflow-hidden",
          sizes[size]
        )}
        style={{ backgroundColor: src ? "transparent" : backgroundColor }}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {online !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-white",
            onlineSizes[size],
            online ? "bg-green-500" : "bg-gray-400"
          )}
        />
      )}
    </div>
  );
};

export const AvatarGroup: React.FC<{
  children: React.ReactNode;
  max?: number;
  className?: string;
}> = ({ children, max, className }) => {
  const childrenArray = React.Children.toArray(children);
  const displayChildren = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingCount = max ? childrenArray.length - max : 0;

  return (
    <div className={cn("flex -space-x-2", className)}>
      {displayChildren}
      {remainingCount > 0 && (
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 ring-2 ring-white">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
