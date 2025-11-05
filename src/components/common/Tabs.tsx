import React, { useState } from "react";
import { cn } from "../../utils/helpers";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: "default" | "pills";
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultTab,
  onChange,
  variant = "default",
  className,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeContent = items.find((item) => item.id === activeTab)?.content;

  return (
    <div className={className}>
      <div
        className={cn(
          "flex",
          variant === "default" && "border-b border-gray-200",
          variant === "pills" && "bg-gray-100 rounded-lg p-1 gap-1"
        )}
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => !item.disabled && handleTabChange(item.id)}
            disabled={item.disabled}
            className={cn(
              "flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors",
              variant === "default" && [
                "border-b-2 -mb-px",
                activeTab === item.id
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300",
              ],
              variant === "pills" && [
                "rounded-md flex-1",
                activeTab === item.id
                  ? "bg-white text-primary-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900",
              ],
              item.disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {item.icon && <span>{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-6">{activeContent}</div>
    </div>
  );
};
