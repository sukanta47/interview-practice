import React from "react";
import Sidebar from "../SideBar/Sidebar";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <main className="p-5 flex w-4/5 justify-center h-screen w-full bg-[#f7f7f7] text-pink-600 overflow-hidden overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
