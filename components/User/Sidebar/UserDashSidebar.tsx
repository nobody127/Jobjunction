"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tally3 } from "lucide-react";
import SidebarComp from "./SideBarComp";
import { useState } from "react";

export default function UserDashboardSidebar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <>
      <div className=" border-r-2 border-slate-200 hidden md:block min-h-screen">
        <SidebarComp />
      </div>

      <div className="block md:hidden">
        <Sheet open={sheetOpen}>
          <SheetTrigger onClick={() => setSheetOpen(true)}>
            <Tally3 className="rotate-90" />
          </SheetTrigger>
          <SheetContent side={"left"} onClick={() => setSheetOpen(false)}>
            <SheetHeader>
              <SheetDescription className="mt-8">
                <SidebarComp />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
