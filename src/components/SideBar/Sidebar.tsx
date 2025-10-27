import React from "react";
import SideNavItems from "./SideNavItems";
import type { NavItems } from "../ui/Navbar";

const Sidebar = () => {
  const sideNavItems: NavItems[] = [
    {
      to: "/timer",
      title: "Timer App",
    },
    {
      to: "/forms",
      title: "Forms",
    },
    {
      to: "/debouncing",
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
      to: "/redux-toolkit",
      title: "Redux Toolkit",
    },
    {
      to: "/context-api",
      title: "Context API",
    },
    {
      to: "/router-app",
      title: "Route App",
    }
  ];

  return (
    <div className="w-1/5 min-w-[13rem] p-2 flex flex-col gap-5 bg-[#c0bfc1] shadow-md h-full">
      <div className=" py-2 px-4 text-violet-600 text-lg font-semibold border-b border-b-2 border-violet-600">Interview Practice</div>
      <div className="h-[32rem] p-2 overflow-auto">
        <SideNavItems sideNavItems={sideNavItems} />
      </div>
    </div>
  );
};

export default Sidebar;
