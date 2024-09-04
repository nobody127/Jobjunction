"use client";

import { isProfileVisitorUser } from "@/store/store";
import { useCheckForVisitor } from "@/utils/hooks/useCheckVisitor";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function SidebarComp() {
  const [activeTab, setActiveTab] = useState("profile");
  const isVisitorUser = useRecoilValue(isProfileVisitorUser);
  const session = useSession();
  const { userId }: { userId: string } = useParams();
  const pathname = usePathname();

  if (!session.data?.user) {
    return <div>No User found</div>;
  }

  useCheckForVisitor(userId);

  useEffect(() => {
    if (pathname.includes("profile")) setActiveTab("profile");
    if (pathname.includes("jobs/me")) setActiveTab("posts");
    if (pathname.includes("jobs/bookmarks")) setActiveTab("bookmark");
    if (pathname.includes("settings/delete")) setActiveTab("destroy");
  }, []);

  return (
    <>
      <Link
        href={`/user/${session.data?.user.id}/profile`}
        onClick={() => setActiveTab("profile")}
        className="min-w-40 text-center"
      >
        <p
          className={` duration-500 ${
            activeTab === "profile"
              ? "bg-sideBarBgColor text-sideBarColor w-fit p-2 rounded-full  font-kanit w-full "
              : ""
          }`}
        >
          My Profile
        </p>
      </Link>

      <Link
        href={`/user/${session.data?.user.id}/jobs/me`}
        onClick={() => setActiveTab("posts")}
        className="min-w-40 text-center"
      >
        <p
          className={` mt-8  duration-500 ${
            activeTab === "posts"
              ? "bg-sideBarBgColor text-sideBarColor w-fit p-2 rounded-full  font-kanit w-full"
              : ""
          }`}
        >
          Posts
        </p>
      </Link>

      {isVisitorUser ? (
        <>
          <Link
            href={`/user/${session.data?.user.id}/jobs/bookmarks`}
            onClick={() => setActiveTab("bookmark")}
            className="min-w-40 text-center"
          >
            <p
              className={` mt-8  duration-500 ${
                activeTab === "bookmark"
                  ? "bg-sideBarBgColor text-sideBarColor w-fit p-2 rounded-full  font-kanit w-full"
                  : ""
              }`}
            >
              Saved Job
            </p>
          </Link>

          <Link
            href={`/user/${session.data?.user.id}/settings/delete`}
            onClick={() => setActiveTab("destroy")}
            className="min-w-40 text-center"
          >
            <p
              className={` mt-8  duration-500 text-red-500 ${
                activeTab === "destroy"
                  ? "bg-sideBarBgColor  w-fit p-2 rounded-full  font-kanit w-full"
                  : ""
              }`}
            >
              Delete Account
            </p>
          </Link>
        </>
      ) : (
        ""
      )}
    </>
  );
}
