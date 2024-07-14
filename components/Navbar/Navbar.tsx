"use client";

import TextComponent from "../TextComp";
import DesktopNav from "./DeskNav";

export default function Navbar() {
  return (
    <div className="p-2 border-b-2 flex justify-between fixed top-0 left-0 w-full">
      <div>
        <TextComponent
          text="JobJunction"
          className="font-Bebas lg:text-2xl text-primaryPurple font-bold tracking-wide"
        />
      </div>

      <div className="sm:hidden md:block">
        <DesktopNav />
      </div>
    </div>
  );
}
