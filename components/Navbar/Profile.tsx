import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, PlusCircle } from "lucide-react";
import { TbHandClick } from "react-icons/tb";
import TextComponent from "../TextComp";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Profile() {
  const session = useSession();
  const imageUrl = session.data?.user?.image;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <img
            src={imageUrl || "Images/avatar.png"}
            alt=""
            className="w-12 h-12 rounded-full shadow-md"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/jobs" className="flex gap-2 items-center ">
              <TextComponent text="Get Job" className=" font-bebas" />
              <TbHandClick />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href={"/jobs/create"} className="flex gap-2 items-center">
              <TextComponent text="Post Job" className=" font-bebas" />
              <PlusCircle className="size-4" />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <div onClick={() => signOut()} className="flex gap-2 items-center">
              <p>Logout</p>
              <LogOut className="mx-auto size-4 " />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
