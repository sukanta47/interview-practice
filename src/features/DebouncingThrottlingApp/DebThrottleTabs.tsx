import { Outlet } from "react-router-dom";
import Navbar, { type NavItems } from "../../components/ui/Navbar";

const DebThrottleTabs = () => {
  const formNavItems: NavItems[] = [
    {
      to: "debounce-app",
      title: "Debounce",
    },
    {
      to: "throttling-app",
      title: "Throttling",
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <Navbar navItems={formNavItems} />
      <div className="h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default DebThrottleTabs;
