import React from "react";
import { NavLink } from "react-router-dom";

export type NavItems = {
    to:string,
    title:string,

}
export interface NavbarProps {
    navItems: NavItems[]
}
const Navbar = ({navItems}:NavbarProps) => {
  return (
    <nav className="flex shadow-md bg-purple-300 ">
      {navItems.map((_nav, index) => (
        <NavLink className={({isActive})=>`${isActive? "bg-purple-400 shadow-inner" : "bg-purple-300" } text-white px-5 py-2 border border-r-1 border-gray-200`} key={`nav-${index}`} to={_nav.to}>{_nav.title}</NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
