import React, { useState, KeyboardEvent } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Badge, Input } from "@/components/common";
import { cn } from "@/utils/helpers";

interface SkillsInputProps {
  label?: string;
  value: string[];
  onChange: (skills: string[]) => void;
  suggestions?: readonly string[];
  placeholder?: string;
  maxItems?: number;
  className?: string;
}

export const SkillsInput: React.FC<SkillsInputProps> = ({
  label,
  value,
  onChange,
  suggestions = [],
  placeholder = "Add item...",
  maxItems = 10,
  className,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !value.includes(suggestion)
  );

  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (
      trimmedSkill &&
      !value.includes(trimmedSkill) &&
      value.length < maxItems
    ) {
      onChange([...value, trimmedSkill]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(value.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(inputValue);
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeSkill(value[value.length - 1]);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <Input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={
            value.length >= maxItems ? `Maximum ${maxItems} items` : placeholder
          }
          disabled={value.length >= maxItems}
        />

        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-48 overflow-y-auto">
            {filteredSuggestions.slice(0, 10).map((suggestion, index) => (
              <button
                key={index}
                type="button"
                className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 text-sm"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => addSkill(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((skill, index) => (
            <Badge key={index} variant="secondary" className="group">
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-2 text-secondary-700 hover:text-secondary-900"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500">
        {value.length} / {maxItems} items
      </p>
    </div>
  );
};
