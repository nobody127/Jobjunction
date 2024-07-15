"use client";
import { useRouter } from "next/navigation";
import TextComponent from "../TextComp";
import { useSession } from "next-auth/react";
import ModeBtn from "./ModeBtn";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function DesktopNav() {
  const router = useRouter();

  const { data, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Option section  */}
      <div>
        {status === "authenticated" ? (
          <div className="flex gap-24 items-center">
            <Link href="/jobs">
              <TextComponent
                text="Get Job"
                className="text-lg text-slate-700 font-bold font-kanit cursor-pointer dark:text-slate-200"
              />
            </Link>
            <Link href={"/jobs/create"}>
              <TextComponent
                text="Post Job"
                className="text-lg text-white font-bold font-bebas bg-primaryPurple px-2 py-1 rounded-md cursor-pointer"
              />
            </Link>
            <img
              src={data.user?.image || ""}
              className="w-8 h-8 rounded-full cursor-pointer"
            />
            <ModeBtn />
            <button onClick={() => signOut()}>Signout</button>
          </div>
        ) : (
          <div className="flex gap-24">
            <Button
              className="text-lg font-bold font-kanit cursor-pointer  dark:text-white border-primaryPurple border-2 hover:text-black hover:bg-secondaryPurple"
              variant="outline"
              onClick={() => {
                router.push("/signin");
              }}
            >
              Login
            </Button>
            <Button
              className="text-lg text-slate-700 font-bold font-kanit cursor-pointer bg-primaryPurple text-white hover:text-black"
              onClick={() => {
                router.push("/signup");
              }}
            >
              Signup
            </Button>
            <ModeBtn />
          </div>
        )}
      </div>
    </div>
  );
}
