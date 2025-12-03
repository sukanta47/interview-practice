import { Transition } from "@headlessui/react";
import React from "react";

interface MobileMenuProps {
  isOpen: boolean;
  navItems: { title: string; href: string }[];
  activeSection: string;
  handleItemClick: (href: string) => void;
}

const MobileMenu = ({
  isOpen,
  navItems,
  activeSection,
  handleItemClick,
}: MobileMenuProps) => {
  return (
    <Transition
      show={isOpen}
      enter="transition ease-out duration-200 transform"
      enterFrom="opacity-0 -translate-y-4"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150 transform"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-4"
    >
      <div className="md:hidden bg-white/95 dark:bg-dark-800/95 backdrop-blur-md shadow-lg">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(item.href);
              }}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeSection === item.href.substring(1)
                  ? "bg-primary-50 dark:bg-primary-900 text-primary-500 dark:text-primary-400"
                  : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700"
              }`}
              aria-current={
                activeSection === item.href.substring(1) ? "page" : undefined
              }
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </Transition>
  );
};

export default MobileMenu;
