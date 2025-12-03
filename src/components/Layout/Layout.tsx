// import React, { Suspense } from "react";
// import Sidebar from "../SideBar/Sidebar";
// import { Outlet } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// const AppLayout: React.FC = () => {
//   const [isOpen, setIsOpen] = React.useState(false);

//   return (
//     <div className="flex min-h-screen bg-[#f7f7f7]">
//       {/* Desktop Sidebar */}
//       <aside className="hidden md:block w-64 shadow-md bg-white dark:bg-dark-800">
//         <Sidebar />
//       </aside>

//       {/* Mobile Header */}
//       <div className="md:hidden fixed top-0 left-0 w-full z-40 bg-white/95 dark:bg-dark-800/95 backdrop-blur-md shadow-md flex items-center justify-between px-4 py-3">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           aria-expanded={isOpen}
//           className="rounded-md p-2 hover:bg-gray-200 dark:hover:bg-dark-600 focus:outline-none focus:ring-2"
//         >
//           {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//         </button>
//         <span className="font-semibold text-gray-700 dark:text-gray-200">
//           Menu
//         </span>
//       </div>

//       {/* Mobile Sidebar Drawer */}
//       <aside
//         className={`md:hidden fixed top-16 left-0 h-screen w-full bg-white dark:bg-dark-800 shadow-xl z-40 transform transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <Sidebar />
//       </aside>

//       {/* Content */}
//       <main className="flex-1 mt-14 md:mt-0 p-4 md:p-8 overflow-y-auto text-pink-600">
//         <Suspense fallback={<div>Loading...</div>}>
//           <Outlet />
//         </Suspense>
//       </main>
//     </div>
//   );
// };

// export default AppLayout;
import React, { Suspense } from "react";
import Sidebar from "../SideBar/Sidebar";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

const AppLayout: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-[#f7f7f7] relative">
      {/* ---------- Desktop Sidebar ---------- */}
      <aside className="hidden md:block w-64 shrink-0">
        <Sidebar />
      </aside>

      {/* ---------- Mobile Header ---------- */}
      <div className="md:hidden fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md shadow flex items-center justify-between px-4 py-3">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded hover:bg-gray-200"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="block md:hidden text-2xl font-semibold text-violet-700">
          Interview Practice
        </h2>
        <span className="font-semibold text-gray-700"></span>
      </div>

      {/* ---------- Overlay (block background scroll) ---------- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ---------- Mobile Sidebar Drawer ---------- */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-screen w-64 z-50 bg-white shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button inside drawer */}

        <div className="flex justify-between p-3">
          <h2 className="block md:hidden text-lg font-semibold text-violet-700 border-b">
            Interview Practice
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded hover:bg-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Make entire sidebar scrollable */}
        <div className="h-[calc(100vh-3.5rem)] overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* ---------- Main Content ---------- */}
      <main className="flex-1 mt-14 md:mt-0 p-4 md:p-8 text-pink-600 h-screen overflow-y-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default AppLayout;
