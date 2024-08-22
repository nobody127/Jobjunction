"use client";

import Link from "next/link";
import TextComponent from "../TextComp";
import DesktopNav from "./DeskNav";
import MobileNav from "./MobNav";

export default function Navbar() {
  return (
    <div className="p-2 sm:p-4 sm:px-12  flex justify-between items-center w-full bg-white dark:bg-darkBg ">
      <div>
        <Link href={"/"}>
          <TextComponent
            text="JobJunction"
            className="border-b-8  border-r-8 border-darkBg  bg-white px-2 py-1 rounded-md cursor-pointer hover:-translate-y-1 font-bebas"
          />
        </Link>
      </div>

      <div className="hidden sm:block ">
        <DesktopNav />
      </div>

      <div className="block sm:hidden">
        <MobileNav />
      </div>
    </div>
  );
}
