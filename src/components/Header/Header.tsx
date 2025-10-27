import React from "react";
import Navbar, { type NavItems } from "../ui/Navbar";

const Header = () => {

  const navItems: NavItems[] = [
    {
      to: "/home",
      title: "Home",
    },
  ];

  return (
    <div className="flex gap-5 justify-around p-5 bg-purple-300">
      <Navbar navItems={navItems} />
      <div>Profile</div>
    </div>
  );
};

export default Header;
