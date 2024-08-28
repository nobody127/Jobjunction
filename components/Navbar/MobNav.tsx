"use client";

import { Tally3 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "./Profile";

export default function MobileNav() {
  const session = useSession();
  const router = useRouter();
  return (
    <div>
      {session.status === "authenticated" ? (
        <div>
          <Profile />
        </div>
      ) : (
        <Sheet>
          <SheetTrigger>
            <Tally3 className="rotate-90" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                <div className="mt-8">
                  <Button
                    className="border-b-8  border-r-8 border-darkBg  bg-white  rounded-md cursor-pointer hover:-translate-y-1 font-bebas text-black hover:bg-white w-full"
                    onClick={() => signIn()}
                  >
                    Login
                  </Button>
                  <Button
                    className="border-b-8  border-r-8 border-darkBg  bg-white  rounded-md cursor-pointer hover:-translate-y-1 font-bebas text-black hover:bg-white w-full mt-8"
                    onClick={() => router.push("/signup")}
                  >
                    Signup
                  </Button>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
