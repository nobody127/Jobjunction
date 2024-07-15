"use client";

import Link from "next/link";
import TextComponent from "../TextComp";
import DesktopNav from "./DeskNav";

export default function Navbar() {
  return (
    <div className="p-4 border-b-2 flex justify-between fixed top-0 left-0 w-full bg-white dark:bg-darkBg dark:border-b-slate-500">
      <div>
        <Link href={"/"}>
          <TextComponent
            text="JobJunction"
            className="font-bebas lg:text-2xl text-primaryPurple font-bold tracking-wide w-1/2 cursor-pointer"
          />
        </Link>
      </div>

      <div className="sm:hidden md:block w-1/2 ">
        <DesktopNav />
      </div>
    </div>
  );
}
