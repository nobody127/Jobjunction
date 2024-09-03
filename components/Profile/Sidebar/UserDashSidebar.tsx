import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tally3 } from "lucide-react";
import SidebarComp from "./SideBarComp";

export default function UserDashboardSidebar() {
  return (
    <>
      <div className=" border-r-2 border-slate-200 hidden md:block min-h-screen">
        <SidebarComp />
      </div>

      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger>
            <Tally3 className="rotate-90" />
          </SheetTrigger>
          <SheetContent side={"left"}>
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
