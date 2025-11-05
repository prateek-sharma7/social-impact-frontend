import React, { useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { cn } from "../../utils/helpers";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className,
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => (
        <Disclosure
          key={item.id}
          as="div"
          className="border border-gray-200 rounded-lg"
        >
          {({ open }) => {
            const isOpen = openItems.includes(item.id);
            return (
              <>
                <Disclosure.Button
                  onClick={() => !item.disabled && toggleItem(item.id)}
                  disabled={item.disabled}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-3 text-left font-medium transition-colors",
                    "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                    item.disabled && "opacity-50 cursor-not-allowed",
                    isOpen && "bg-gray-50"
                  )}
                >
                  <span className="text-gray-900">{item.title}</span>
                  <ChevronDownIcon
                    className={cn(
                      "h-5 w-5 text-gray-500 transition-transform duration-200",
                      isOpen && "transform rotate-180"
                    )}
                  />
                </Disclosure.Button>

                <Transition
                  show={isOpen}
                  enter="transition duration-200 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-150 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel
                    static
                    className="px-4 py-3 text-gray-700 border-t border-gray-200"
                  >
                    {item.content}
                  </Disclosure.Panel>
                </Transition>
              </>
            );
          }}
        </Disclosure>
      ))}
    </div>
  );
};
