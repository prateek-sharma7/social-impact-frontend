import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { cn } from "../../utils/helpers";

export interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  position?: "left" | "right";
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  position = "right",
  className,
}) => {
  const positionClasses = {
    left: "left-0 origin-top-left",
    right: "right-0 origin-top-right",
  };

  return (
    <Menu as="div" className={cn("relative inline-block text-left", className)}>
      <Menu.Button as={Fragment}>{trigger}</Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={cn(
            "absolute z-10 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            positionClasses[position]
          )}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.divider ? (
                  <div className="border-t border-gray-100 my-1" />
                ) : (
                  <Menu.Item disabled={item.disabled}>
                    {({ active }) => (
                      <button
                        onClick={item.onClick}
                        className={cn(
                          "flex w-full items-center px-4 py-2 text-sm transition-colors",
                          active && !item.disabled && "bg-gray-100",
                          item.disabled && "opacity-50 cursor-not-allowed",
                          item.danger ? "text-red-700" : "text-gray-700"
                        )}
                        disabled={item.disabled}
                      >
                        {item.icon && (
                          <span className="mr-3 h-5 w-5">{item.icon}</span>
                        )}
                        {item.label}
                      </button>
                    )}
                  </Menu.Item>
                )}
              </React.Fragment>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
