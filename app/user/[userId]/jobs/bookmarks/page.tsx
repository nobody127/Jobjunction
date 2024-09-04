"use client";

import { isProfileVisitorUser } from "@/store/store";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export default function MySavedJobs() {
  const { userId }: { userId: string } = useParams();
  const isVisitorUser = useRecoilValue(isProfileVisitorUser);
  useEffect(() => {
    if (!isVisitorUser) redirect(`/user/${userId}/profile`);
  }, []);
  return <div> hi you have 3posts bookmarked</div>;
}
