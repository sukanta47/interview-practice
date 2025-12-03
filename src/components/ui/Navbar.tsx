import React from "react";
import { NavLink } from "react-router-dom";

export type NavItems = {
  to: string;
  title: string;
};

export interface NavbarProps {
  navItems: NavItems[];
  color?: string;
}

const Navbar = ({ navItems, color = "purple" }: NavbarProps) => {
  return (
    <div
      className={`w-full overflow-x-auto scrollbar-hide border-b border-${color}-400`}
    >
      <nav className="flex whitespace-nowrap">
        {navItems.map((_nav, index) => (
          <NavLink
            key={`nav-${index}`}
            to={_nav.to}
            className={({ isActive }) =>
              `${
                isActive ? `bg-${color}-400 shadow-inner` : `bg-${color}-300`
              } text-sm md:text-base text-white px-4 py-2 border-r-2 border-${color}-200 flex-shrink-0`
            }
          >
            {_nav.title}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
