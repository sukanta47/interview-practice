import React from "react";
import SideNavItems from "./SideNavItems";
import type { NavItems } from "../ui/Navbar";

const Sidebar = () => {
  const sideNavItems: NavItems[] = [
    {
      to: "array-programs",
      title: "Array Programs",
    },
    {
      to: "/timer",
      title: "Timer App",
    },
    {
      to: "/calculator",
      title: "Calculator",
    },
    {
      to: "/forms",
      title: "Forms",
    },
    {
      to: "/debouncing-throttling",
      title: "Debouncing",
    },
    {
      to: "/todo-list",
      title: "Todo List",
    },
    {
      to: "/list-swapping",
      title: "List Swapping",
    },
    {
      to: "/products",
      title: "Products",
    },
    {
      to: "/infinite-scroll",
      title: "Infinite Scroll",
    },
    {
      to: "/virtualization",
      title: "React Virtualization",
    },
    {
      to: "/redux-toolkit",
      title: "Redux Toolkit",
    },
  ];

  return (
    <div className="w-1/5 min-w-[13rem] p-2 flex flex-col gap-5 bg-[#c0bfc1] shadow-md">
      <div className=" py-2 px-4 text-violet-600 text-lg font-semibold border-b border-b-2 border-violet-600">
        Interview Practice
      </div>
      <div className="h-[calc(94vh - 4rem)] p-2 overflow-y-auto">
        <SideNavItems sideNavItems={sideNavItems} />
      </div>
    </div>
  );
};

export default Sidebar;
