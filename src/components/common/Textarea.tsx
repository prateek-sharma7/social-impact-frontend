import React, { forwardRef } from "react";
import { cn } from "../../utils/helpers";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  showCount?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      showCount,
      className,
      id,
      maxLength,
      value,
      ...props
    },
    ref
  ) => {
    const textareaId =
      id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const currentLength = value?.toString().length || 0;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="input-label">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={cn("textarea-field", error && "input-error", className)}
          value={value}
          maxLength={maxLength}
          {...props}
        />

        <div className="flex items-center justify-between mt-1">
          <div className="flex-1">
            {error && <p className="input-error-message">{error}</p>}
            {hint && !error && <p className="input-hint">{hint}</p>}
          </div>

          {showCount && maxLength && (
            <p className="text-sm text-gray-500">
              {currentLength} / {maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
