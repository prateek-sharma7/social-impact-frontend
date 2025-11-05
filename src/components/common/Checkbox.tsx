import React, { forwardRef } from "react";
import { cn } from "../../utils/helpers";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, className, id, ...props }, ref) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              className={cn("checkbox-field", className)}
              {...props}
            />
          </div>

          {(label || description) && (
            <div className="ml-3 text-sm">
              {label && (
                <label
                  htmlFor={checkboxId}
                  className="font-medium text-gray-700 cursor-pointer"
                >
                  {label}
                </label>
              )}
              {description && <p className="text-gray-500">{description}</p>}
            </div>
          )}
        </div>

        {error && <p className="input-error-message mt-1">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
