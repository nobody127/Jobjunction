import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeIndianRupee, Bookmark, BriefcaseBusiness } from "lucide-react";
import { Button } from "../ui/button";
import { TbHandClick } from "react-icons/tb";
import Link from "next/link";
import { JobLisitingType } from "@/types/types";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { HiExternalLink } from "react-icons/hi";
import { CheckForBookmark, HandleBookmakrClick } from "@/app/actions/bookmark";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function JobCard({
  id,
  author,
  position,
  company,
  role_description,
  job_type,
  location,
  role_name,
  salary_min,
  salary_max,
  experience_level,
  apply_link,
}: JobLisitingType) {
  const session: any = useSession();
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [showBookmarkToast, setShowBookmarkToast] = useState({
    status: false,
    message: "",
  });

  async function handleBookmarkClick() {
    try {
      const response = await HandleBookmakrClick(session.data?.user?.id, id);
      if (response.status !== 200) throw new Error(response.message);
      setBookmarked(true);
      setShowBookmarkToast({
        status: true,
        message: response.message,
      });
    } catch (error) {
      setBookmarked(false);
      setShowBookmarkToast({
        status: true,
        message: (error as Error).message,
      });
    } finally {
      setTimeout(() => {
        setShowBookmarkToast({
          status: false,
          message: "",
        });
      }, 1000);
    }
  }

  useEffect(() => {
    const checkForBookmarkedPost = async () => {
      try {
        const response = await CheckForBookmark(session.data?.user?.id, id);
        if (response.status !== 200) throw new Error(response.message);
        setBookmarked(true);
      } catch (error) {
        setBookmarked(false);
      }
    };

    checkForBookmarkedPost();
  }, []);
  return (
    <div className="flex flex-col gap-8 p-4 md:p-6 shadow-lg mx-auto w-11/12  lg:w-3/4 bg-white rounded-md border-2">
      {showBookmarkToast.status && toast(showBookmarkToast.message)}

      {/* first section  */}

      <div className="flex justify-between">
        <HoverCard>
          <HoverCardTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={author.avatar ? author.avatar : "Images/avatar.png"}
              />
              <AvatarFallback>CO</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent className="flex gap-2 items-center">
            <p>{author.username}</p>
            <Link href={`/user/profile/${author.id}`}>
              {" "}
              <HiExternalLink />
            </Link>
          </HoverCardContent>
        </HoverCard>

        <div>
          <p className="text-radio text-md md:text-2xl text-black tracking-wide font-bold">
            {position}
          </p>
          <p className="text-gray-400 text-sm">{company}</p>
        </div>

        <Bookmark
          className={`cursor-pointer ${bookmarked ? "fill-blue-950" : ""}`}
          onClick={() => handleBookmarkClick()}
        />
      </div>

      {/* second section  */}

      <div>
        <p className="text-gray-500  break-words  ">
          {role_description.slice(0, 250)}
        </p>

        <div className="flex w-fit gap-4 mt-6 flex-wrap">
          <Button className="text-black bg-gray-300 hover:bg-gray-400 hover:text-white">
            {location}
          </Button>
          <Button className="text-black bg-gray-300 hover:bg-gray-400 hover:text-white">
            {role_name}
          </Button>
          <Button className="text-black bg-gray-300 hover:bg-gray-400 hover:text-white">
            {job_type}
          </Button>
        </div>
      </div>

      <hr />

      {/* third section  */}

      <div className="flex flex-col gap-8 sm:flex-row  justify-between">
        <div className="flex gap-2">
          <BadgeIndianRupee />
          <p>
            {salary_min}-<span>{salary_max}</span>/month
          </p>
        </div>

        <div className="flex gap-2">
          <BriefcaseBusiness />
          <p>{experience_level}(y)</p>
        </div>
        <Link href={apply_link}>
          <Button className="bg-white text-black border-2 border-b-8 border-r-8 border-black hover:bg-white flex gap-2">
            <p>Apply Now</p>
            <TbHandClick className="size-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
