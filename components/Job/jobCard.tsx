import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeIndianRupee, Bookmark, BriefcaseBusiness } from "lucide-react";
import { Button } from "../ui/button";
import { TbHandClick } from "react-icons/tb";

export default function JobCard() {
  return (
    <div className="flex flex-col gap-8 p-6 shadow-lg mx-auto w-1/2 bg-white rounded-md border-2 mt-4">
      {/* first section  */}

      <div className="flex justify-between">
        <Avatar>
          <AvatarImage src="Images/avatar.png" />
          <AvatarFallback>CO</AvatarFallback>
        </Avatar>

        <div>
          <p className="text-radio text-2xl text-black tracking-wide font-bold">
            Senior Rust Developer
          </p>
          <p className="text-gray-400 text-sm">Microsoft India</p>
        </div>

        <Bookmark className="cursor-pointer" />
      </div>

      {/* second section  */}

      <div>
        <p className="text-gray-500">
          A job description is a document that explains the responsibilities,
          duties, and tasks of a job role. It also details how the work is to be
          completed, how often, and why it's important to the organization's
          goals and mission. Job descriptions are often used in job postings on
          websites like Indeed and Monster.
        </p>

        <div className="flex w-fit gap-4 mt-6">
          <Button className="text-black bg-gray-300 hover:bg-gray-400 hover:text-white">
            Remote
          </Button>
          <Button className="text-black bg-gray-300 hover:bg-gray-400 hover:text-white">
            Frontend Developer
          </Button>
          <Button className="text-black bg-gray-300 hover:bg-gray-400 hover:text-white">
            Fulltime
          </Button>
        </div>
      </div>

      <hr />

      {/* third section  */}

      <div className="flex justify-between">
        <div className="flex gap-2">
          <BadgeIndianRupee />
          <p>15k-25k/month</p>
        </div>

        <div className="flex gap-2">
          <BriefcaseBusiness />
          <p>Freshers</p>
        </div>

        <Button className="bg-white text-black border-2 border-b-8 border-r-8 border-black hover:bg-white flex gap-2">
          <p>Apply Now</p>
          <TbHandClick className="size-4" />
        </Button>
      </div>
    </div>
  );
}
