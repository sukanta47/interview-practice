import React from "react";
import SideNavItems from "./SideNavItems";
import type { NavItems } from "../ui/Navbar";

const Sidebar = () => {
  const sideNavItems: NavItems[] = [
    { to: "/array-programs", title: "Array Programs" },
    { to: "/timer", title: "Timer App" },
    { to: "/calculator", title: "Calculator" },
    { to: "/forms", title: "Forms" },
    { to: "/debouncing-throttling", title: "Debouncing" },
    { to: "/todo-list", title: "Todo List" },
    { to: "/list-swapping", title: "List Swapping" },
    { to: "/products", title: "Products" },
    { to: "/infinite-scroll", title: "Infinite Scroll" },
    { to: "/virtualization", title: "React Virtualization" },
    { to: "/redux-toolkit", title: "Redux Toolkit" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#c0bfc1] shadow-md">
      <h2 className="hidden md:block text-2xl font-semibold text-violet-700 shadow-md border-b p-4 pb-2 mb-4">
        Interview Practice
      </h2>

      {/* Scrollable nav */}
      <div className="h-[calc(100vh - 4rem)] overflow-y-auto p-4">
        <SideNavItems sideNavItems={sideNavItems} />
      </div>
    </div>
  );
};

export default Sidebar;
