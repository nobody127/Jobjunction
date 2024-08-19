import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Profile from "./Profile";

export default function DesktopNav() {
  const router = useRouter();
  const session = useSession();
  if (session.status === "loading") {
    return <div>Loading....</div>;
  }

  return (
    <div>
      {session.status === "authenticated" ? (
        <Profile />
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
  );
}
