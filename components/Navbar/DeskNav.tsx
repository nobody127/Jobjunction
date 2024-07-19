"use client";
import { useRouter } from "next/navigation";
import TextComponent from "../TextComp";
import { useSession } from "next-auth/react";
import ModeBtn from "./ModeBtn";
import Link from "next/link";
import { signOut } from "next-auth/react";

import { Button } from "../ui/button";

export default function DesktopNav() {
  const router = useRouter();

  const { data, status } = useSession();
  console.log(data);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Option section  */}
      <div>
        {status === "authenticated" ? (
          <div className="flex gap-16 justify-end items-center">
            <Link href="/jobs">
              <TextComponent
                text="Get Job"
                className="border-b-8  border-r-8 border-darkBg  bg-white px-2 py-1 rounded-md cursor-pointer hover:-translate-y-1 font-bebas"
              />
            </Link>
            <Link href={"/jobs/create"}>
              <TextComponent
                text="Post Job"
                className="border-b-8  border-r-8 border-darkBg  bg-white px-2 py-1 rounded-md cursor-pointer hover:-translate-y-1 font-bebas"
              />
            </Link>
            <button onClick={() => signOut()}>Signout</button>

            {/* <img
              src={data.user?.image || ""}
              className="w-8 h-8 rounded-full cursor-pointer"
            />
            <ModeBtn /> */}
          </div>
        ) : (
          <div className="flex gap-16 justify-end items-center">
            <Button
              className="border-b-8  border-r-8 border-darkBg  bg-white  rounded-md cursor-pointer hover:-translate-y-1 font-bebas text-black hover:bg-white"
              size={"lg"}
              onClick={() => {
                router.push("/signin");
              }}
            >
              Login
            </Button>
            <Button
              className="border-b-8  border-r-8 border-darkBg  bg-white  rounded-md cursor-pointer hover:-translate-y-1 hover:bg-white font-bebas text-black"
              onClick={() => {
                router.push("/signup");
              }}
            >
              Signup
            </Button>
            {/* <ModeBtn /> */}
          </div>
        )}
      </div>
    </div>
  );
}
