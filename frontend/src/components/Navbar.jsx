import React from "react";
import Logo from "@/assets/leetdevlogo.svg";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="py-4 md:px-24">
      <nav className="hidden md:flex md:justify-between md:items-center">
        <Link to="/">
          <div className="flex justify-center items-center gap-2">
            <img src={Logo} alt="leetdev" className="size-8" />
            <span>LeetDev</span>
          </div>
        </Link>
        <ul className="flex justify-center items-center gap-3">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="#">
            <li>About</li>
          </Link>
          <Link to="#">
            <li>Contact</li>
          </Link>
        </ul>
        <div>
          <Link to="/signup">
            <Button className="cursor-pointer bg-[#f97215] hover:bg-[#f97015b2]">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
