"use client";

import { GetUserDetailById } from "@/app/actions/checkUser";
import {
  isProfileVisitorUser,
  refetchAtom,
  universalError,
  universalLoader,
} from "@/store/store";
import { GetUserDetailByIdType } from "@/types/types";
import {
  Calendar,
  Linkedin,
  Mail,
  Notebook,
  RefreshCcw,
  User2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { useRecoilState } from "recoil";
import EditUserProfileDialog from "./EditDialog";
import { TbExternalLink } from "react-icons/tb";
import Link from "next/link";

export default function UserProfileDashboard() {
  const [accountCreated, setAccountCreated] = useState<string>();
  const [loader, setLoader] = useRecoilState(universalLoader);
  const [error, setError] = useRecoilState(universalError);
  const [refetch, setRefetch] = useRecoilState(refetchAtom);
  const [isVisitorUser, setIsVisitorUser] =
    useRecoilState(isProfileVisitorUser);

  const [user, setUser] = useState<GetUserDetailByIdType>({
    id: "",
    username: "",
    email: "",
    linkedin_url: null,
    instagram_url: null,
    twitter_url: null,
    bio: null,
    avatar: null,
    createdAt: new Date(Date.now()),
    skills: [],
    role: "",
  });

  const { userId } = useParams();
  const session = useSession();

  const getFormattedDate = (createdAt: Date) => {
    const date = new Date(createdAt);

    const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth()
    ).padStart(2, "0")}/${String(date.getFullYear()).padStart(2, "0")}`;

    setAccountCreated(formattedDate);
  };

  function checkForVisitor(id: string) {
    if (session.data) {
      if (session.data.user?.id === id) {
        return setIsVisitorUser(true);
      }
    }

    setIsVisitorUser(false);
  }

  useEffect(() => {
    const getUser = async () => {
      setLoader(true);
      try {
        const res: {
          status: number;
          message: string;
          data: GetUserDetailByIdType | null;
        } = await GetUserDetailById(userId as string);

        if (res.status !== 200 || !res.data) throw new Error(res.message);

        setUser(res.data);
        getFormattedDate(res.data.createdAt);
        checkForVisitor(res.data.id);
      } catch (error) {
        setError({
          status: true,
          message: (error as Error).message,
        });
      } finally {
        setLoader(false);
      }
    };

    getUser();
  }, [refetch]);

  if (loader) {
    return (
      <div className="w-full h-full flex items-center justify-center ">
        <p className="bg-white border-2 border-b-8 border-r-8 border-black p-4 rounded-md font-bold animate-bounce ">
          JJ
        </p>
      </div>
    );
  }

  if (error.status) {
    return (
      <div className="w-full h-full flex items-center justify-center text-xl">
        Error...
        <RefreshCcw
          onClick={() => {
            setError({
              status: false,
              message: "",
            });
            setRefetch((prev) => !prev);
          }}
          className="cursor-pointer size-4"
        />
      </div>
    );
  }

  return (
    <div className="mb-6">
      <p className="text-bold font-kanit font-bold text-xl mt-4 md:mt-0">
        My Profile
      </p>
      <div className="flex justify-between items-center border-2 border-slate-200 p-4 rounded-xl mt-12">
        <div className="flex gap-6 items-center">
          <Image
            src={user.avatar || ""}
            width={100}
            height={100}
            alt="Picture of the author"
            className="rounded-full"
          />

          <div>
            <p className="text-sm sm:text-lg md:text-xl font-kanit font-bold">
              {user.username}
            </p>

            <div className="flex gap-2 items-center mt-2">
              <MdAdminPanelSettings className="text-gray-400 size-4" />
              <p className="text-sm text-gray-400 font-bold">
                {user.role?.toLowerCase()}
              </p>
            </div>

            <div className="flex gap-2 items-center mt-2">
              <Calendar className="text-gray-400 size-4" />
              <p className="text-sm text-gray-400 font-bold text-sm">
                {accountCreated}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" border-2 border-slate-200 p-4 rounded-xl mt-12">
        <div className="flex justify-between items-center">
          <p className="text-bold font-kanit font-bold text-xl">More Details</p>

          {isVisitorUser ? (
            <EditUserProfileDialog
              id={user.id}
              bio={user.bio}
              linkedin_url={user.linkedin_url}
              twitter_url={user.twitter_url}
              instagram_url={user.instagram_url}
            />
          ) : (
            ""
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 md:gap-y-8 mt-4">
          <div>
            <p className="flex gap-2 items-center text-gray-400 font-kanit text-lg font-bebas">
              <User2 className="size-4" />
              <span>User Name</span>
            </p>
            <p className="font-bold font-kanit text-sm sm:text-lg md:text-lg text-slate-700">
              {user.username}
            </p>
          </div>

          <div>
            <p className="flex gap-2 items-center text-gray-400 font-kanit text-lg font-bebas">
              <Mail className="size-4" />
              <span> Email Id</span>
            </p>
            <p className="font-bold font-kanit text-sm sm:text-lg md:text-lg text-slate-700">
              {user.email}
            </p>
          </div>

          <div>
            <p className="flex gap-2 items-center text-gray-400 font-kanit text-lg font-bebas">
              <Notebook className="size-4" />
              <span>Bio</span>
            </p>
            <p className="font-bold font-kanit text-sm sm:text-lg md:text-lg text-slate-700">
              {user.bio || "null"}
            </p>
          </div>

          <div>
            <p className="flex gap-2 items-center text-gray-400 font-kanit text-lg font-bebas">
              <Linkedin className="size-4" />
              <span>Linkedin</span>
            </p>
            <p className=" flex gap-2 items-center font-bold font-kanit text-sm sm:text-lg  md:text-lg text-slate-600">
              {user.linkedin_url || "null"}
              {user.linkedin_url ? (
                <Link href={user.linkedin_url}>
                  <TbExternalLink />
                </Link>
              ) : (
                ""
              )}
            </p>
          </div>

          <div>
            <p className="flex gap-2 items-center text-gray-400 font-kanit text-lg font-bebas">
              <FaTwitter />
              <span>Twitter</span>
            </p>
            <p className="flex gap-2 items-center font-bold font-kanit text-sm sm:text-lg  md:text-lg text-slate-600">
              {user.twitter_url || "null"}
              {user.twitter_url ? (
                <Link href={user.twitter_url}>
                  <TbExternalLink />
                </Link>
              ) : (
                ""
              )}
            </p>
          </div>

          <div>
            <p className="flex gap-2 items-center text-gray-400 font-kanit text-lg font-bebas">
              <FaInstagram />
              <span>Instagram</span>
            </p>
            <p className="flex gap-2 items-center font-bold font-kanit text-sm  sm:text-lg  md:text-lg text-slate-600">
              {user.instagram_url || "null"}
              {user.instagram_url ? (
                <Link href={user.instagram_url}>
                  <TbExternalLink />
                </Link>
              ) : (
                ""
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
