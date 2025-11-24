import React, { Suspense } from "react";
import Sidebar from "../SideBar/Sidebar";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <main className="p-5 flex w-4/5 justify-center min-h-screen h-full w-full bg-[#f7f7f7] text-pink-600 overflow-hidden overflow-y-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default AppLayout;
