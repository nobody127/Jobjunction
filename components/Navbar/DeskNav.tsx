import { useRouter } from "next/navigation";
import TextComponent from "../TextComp";
import Link from "next/link";
import { Button } from "../ui/button";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function DesktopNav() {
  const router = useRouter();
  const session = useSession();

  if (session.status === "loading") {
    return <div>Loading....</div>;
  }
  return (
    <div>
      {/* Option section  */}
      <div>
        {session.status === "authenticated" ? (
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
            <Button
              className="border-b-8  border-r-8 border-darkBg  bg-white  rounded-md cursor-pointer hover:-translate-y-1 font-bebas text-black hover:bg-white"
              onClick={() => signOut()}
            >
              SignOut
            </Button>
          </div>
        ) : (
          <div className="flex gap-16 justify-end items-center">
            <Button
              className="border-b-8  border-r-8 border-darkBg  bg-white  rounded-md cursor-pointer hover:-translate-y-1 font-bebas text-black hover:bg-white"
              size={"lg"}
              onClick={() => signIn()}
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
          </div>
        )}
      </div>
    </div>
  );
}
