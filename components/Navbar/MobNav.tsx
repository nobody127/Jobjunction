"use client";
import { X } from "lucide-react";
import { Tally3 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import TextComponent from "../TextComp";
import Link from "next/link";
import ModeBtn from "./ModeBtn";
import { Button } from "../ui/button";

export default function MobileNav() {
  const router = useRouter();

  const { data, status } = useSession();
  console.log(data);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

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
                {status === "authenticated" ? (
                  <div>
                    <Link href="/jobs">
                      <TextComponent
                        text="Get Job"
                        className="border-b-8  border-r-8 border-darkBg  bg-white px-2 py-1 rounded-md cursor-pointer hover:-translate-y-1 font-bebas mb-8"
                      />
                    </Link>
                    <Link href={"/jobs/create"}>
                      <TextComponent
                        text="Post Job"
                        className="border-b-8  border-r-8 border-darkBg  bg-white px-2 py-1 rounded-md cursor-pointer hover:-translate-y-1 font-bebas mb-8"
                      />
                    </Link>
                    {/* <img
                      src={data.user?.image || ""}
                      className="w-8 h-8 rounded-full cursor-pointer mb-8  mx-auto"
                    />
                    <ModeBtn className="  mx-auto" /> */}
                  </div>
                ) : (
                  <div>
                    <Button
                      className="border-b-8  border-r-8 border-darkBg  bg-white  rounded-md cursor-pointer hover:-translate-y-1 font-bebas text-black hover:bg-white w-full"
                      onClick={() => {
                        router.push("/signin");
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      className="border-b-8  border-r-8 border-darkBg  bg-white  rounded-md cursor-pointer hover:-translate-y-1 font-bebas text-black hover:bg-white w-full mt-8"
                      onClick={() => {
                        router.push("/signup");
                      }}
                    >
                      Signup
                    </Button>
                    {/* <ModeBtn className="mx-auto" /> */}
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
