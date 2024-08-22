import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeIndianRupee, Bookmark, BriefcaseBusiness } from "lucide-react";
import { Button } from "../ui/button";
import { TbHandClick } from "react-icons/tb";
import Link from "next/link";

export default function JobCard({
  authorUrl,
  position,
  company,
  description,
  jobType,
  location,
  roleName,
  salaryMin,
  salaryMax,
  experienceLevel,
  applyLink,
}: any) {
  return (
    <div className="flex flex-col gap-8 p-6 shadow-lg mx-auto w-11/12  lg:w-3/4 bg-white rounded-md border-2">
      {/* first section  */}

      <div className="flex justify-between">
        <Avatar>
          <AvatarImage src={authorUrl ? authorUrl : "Images/avatar.png"} />
          <AvatarFallback>CO</AvatarFallback>
        </Avatar>

        <div>
          <p className="text-radio text-2xl text-black tracking-wide font-bold">
            {position}
          </p>
          <p className="text-gray-400 text-sm">{company}</p>
        </div>

        <Bookmark className="cursor-pointer" />
      </div>

      {/* second section  */}

      <div>
        <p className="text-gray-500 break-all">{description.slice(0, 450)}</p>

        <div className="flex w-fit gap-4 mt-6">
          <Button className="text-black bg-gray-300 hover:bg-gray-400 hover:text-white">
            {location}
          </Button>
          <Button className="text-black bg-gray-300 hover:bg-gray-400 hover:text-white">
            {roleName}
          </Button>
          <Button className="text-black bg-gray-300 hover:bg-gray-400 hover:text-white">
            {jobType}
          </Button>
        </div>
      </div>

      <hr />

      {/* third section  */}

      <div className="flex justify-between">
        <div className="flex gap-2">
          <BadgeIndianRupee />
          <p>
            {salaryMin}-<span>{salaryMax}</span>/month
          </p>
        </div>

        <div className="flex gap-2">
          <BriefcaseBusiness />
          <p>{experienceLevel}(y)</p>
        </div>
        <Link href={applyLink}>
          <Button className="bg-white text-black border-2 border-b-8 border-r-8 border-black hover:bg-white flex gap-2">
            <p>Apply Now</p>
            <TbHandClick className="size-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
