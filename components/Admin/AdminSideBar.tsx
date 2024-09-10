"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tally3 } from "lucide-react";
import { useState } from "react";

import AdminSideBarComp from "@/components/Admin/AdminSideBarComp";

export default function AdminSideBar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <>
      <div className=" border-r-2 border-slate-200 hidden md:block min-h-screen">
        <AdminSideBarComp />
      </div>

      <div className="block md:hidden">
        <Sheet open={sheetOpen}>
          <SheetTrigger onClick={() => setSheetOpen(true)}>
            <Tally3 className="rotate-90" />
          </SheetTrigger>
          <SheetContent side={"left"} onClick={() => setSheetOpen(false)}>
            <SheetHeader>
              <SheetDescription className="mt-8">
                <AdminSideBarComp />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
