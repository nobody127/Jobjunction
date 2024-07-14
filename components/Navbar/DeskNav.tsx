"use client";
import { useRouter } from "next/navigation";
import TextComponent from "../TextComp";
import { useSession } from "next-auth/react";
import ModeBtn from "./ModeBtn";

export default function DesktopNav() {
  const router = useRouter();
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Option section  */}
      <div>
        {status === "authenticated" ? (
          <div className="flex gap-4 items-center">
            <TextComponent text="Dashboard" />
            <TextComponent text="Post Job" />

            <img
              src={data.user?.image || ""}
              className="w-8 h-8 rounded-full"
            />
          </div>
        ) : (
          <div className="flex gap-2">
            <TextComponent text="Login" />
            <TextComponent text="Signup" />
          </div>
        )}

        <ModeBtn />
      </div>
    </div>
  );
}
