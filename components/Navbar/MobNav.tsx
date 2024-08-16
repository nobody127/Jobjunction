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

import TextComponent from "../TextComp";
import Link from "next/link";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MobileNav() {
  const session = useSession();
  const router = useRouter();
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Tally3 className="rotate-90" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription>
              <div className="mt-8">
                {session.status === "authenticated" ? (
                  <div>
                    <Link href="/jobs">
                      <TextComponent
                        text="Get Job"
                        className="border-b-8  border-r-8 border-darkBg  bg-white px-2 py-1 rounded-md cursor-pointer hover:-translate-y-1 font-bebas mb-8 text-black"
                      />
                    </Link>
                    <Link href={"/jobs/create"}>
                      <TextComponent
                        text="Post Job"
                        className="border-b-8  border-r-8 border-darkBg  bg-white px-2 py-1 rounded-md cursor-pointer hover:-translate-y-1 font-bebas mb-8 text-black"
                      />
                    </Link>

                    <Button
                      className="border-b-8  border-r-8 border-darkBg  bg-white  rounded-md cursor-pointer hover:-translate-y-1 font-bebas text-black hover:bg-white w-full"
                      onClick={() => signOut()}
                    >
                      SignOut
                    </Button>
                  </div>
                ) : (
                  <div>
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
                )}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
