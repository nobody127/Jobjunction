"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { filterMobSheet } from "@/store/store";
import { Tally3, X } from "lucide-react";
import { lazy, useState } from "react";
import { useRecoilState } from "recoil";
const FilterSideBar = lazy(() => import("@/components/Job/filterCard"));

export default function MobileFilterCard() {
  const [sheetOpen, setSheetOpen] = useRecoilState(filterMobSheet);
  return (
    <div className="lg:hidden p-4 ">
      <Sheet open={sheetOpen}>
        <SheetTrigger>
          <Tally3 className="rotate-90" onClick={() => setSheetOpen(true)} />
        </SheetTrigger>
        <SheetContent side={"left"} className="overflow-y-scroll">
          <SheetHeader>
            <div className="w-full flex justify-end">
              <X className="size-4" onClick={() => setSheetOpen(false)} />
            </div>
            <SheetDescription>
              <FilterSideBar />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
