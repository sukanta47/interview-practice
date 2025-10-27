import React from "react";
import Navbar, { type NavItems } from "../../components/ui/Navbar";
import { Outlet } from "react-router-dom";

const TimerAppTabs = () => {
  const timerNavItems: NavItems[] = [
    {
      to: "stopwatch",
      title: "Stopwatch",
    },
    {
      to: "countdown",
      title: "Countdown",
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <Navbar navItems={timerNavItems} />
      <div className="mt-5 h-screen">
        <Outlet/>
      </div>
    </div>
  );
};

export default TimerAppTabs;
