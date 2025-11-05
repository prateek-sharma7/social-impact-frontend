import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Input } from "./Input";
import { debounce } from "../../utils/helpers";

export interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = "Search...",
  debounceMs = 300,
  className,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      onSearch(value);
    }, debounceMs);

    debouncedSearch();
  }, [value, onSearch, debounceMs]);

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      leftIcon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
      rightIcon={
        value && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )
      }
      className={className}
    />
  );
};
