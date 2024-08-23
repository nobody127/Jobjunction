import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tally3 } from "lucide-react";
import FilterSideBar from "./filterCard";

export default function MobileFilterCard() {
  return (
    <div className="lg:hidden p-4 ">
      <Sheet>
        <SheetTrigger>
          <Tally3 className="rotate-90" />
        </SheetTrigger>
        <SheetContent side={"left"} className="overflow-y-scroll">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription>
              <FilterSideBar />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
