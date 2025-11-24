import React from "react";
import type { NavItems } from "../ui/Navbar";
import { NavLink } from "react-router-dom";

interface SideNavItemsProps {
  sideNavItems: NavItems[];
}

const SideNavItems: React.FC<SideNavItemsProps> = ({ sideNavItems }) => {
  return (
    <nav className="flex flex-col gap-2">
      {sideNavItems.map((_nav, index) => (
        <NavLink
          className={({ isActive }) =>
            `py-2 px-4 rounded-md cursor-pointer hover:scale-105 duration-200 ease-in-out ${
              isActive
                ? "border border-purple-600 text-white bg-purple-600 shadow-lg"
                : "text-purple-600 bg-white"
            }`
          }
          key={`nav-${index}`}
          to={_nav.to}
        >
          {_nav.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default SideNavItems;
