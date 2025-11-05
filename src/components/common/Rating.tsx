import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { cn } from "../../utils/helpers";

export interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  showValue?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  max = 5,
  size = "md",
  readonly = false,
  showValue = false,
  className,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const sizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const displayValue = hoverValue !== null ? hoverValue : value;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-1">
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= displayValue;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => !readonly && setHoverValue(starValue)}
              onMouseLeave={() => !readonly && setHoverValue(null)}
              disabled={readonly}
              className={cn(
                "transition-colors",
                !readonly && "cursor-pointer hover:scale-110",
                readonly && "cursor-default"
              )}
            >
              {isFilled ? (
                <StarIcon className={cn(sizes[size], "text-yellow-400")} />
              ) : (
                <StarOutlineIcon className={cn(sizes[size], "text-gray-300")} />
              )}
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className="text-sm font-medium text-gray-700">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};
