import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeIndianRupee, BriefcaseBusiness } from "lucide-react";
import { Button } from "../ui/button";
import { TbHandClick } from "react-icons/tb";
import Link from "next/link";
import { JobLisitingType } from "@/types/types";
import { HiExternalLink } from "react-icons/hi";
import MoreOptionDialog from "./MoreDialog";

import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

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
  const editor = useEditor({
    content: role_description.slice(0, 100),
    editable: false,
    editorProps: {
      attributes: {
        class: "outline-none mt-4",
      },
    },
    extensions: [Document, Paragraph, Text],
  });

  return (
    <div className="flex flex-col gap-8 mt-4 lg:mt-0 p-4 md:p-6 shadow-lg mx-auto w-11/12  lg:w-3/4 bg-white rounded-md border-2 ">
      {/* first section  */}

      <div className="flex justify-between">
        <Popover>
          <PopoverTrigger>
            <Avatar className="cursor-pointer size-8 md:size-10">
              <AvatarImage
                src={author.avatar ? author.avatar : "/Images/avatar.png"}
              />
              <AvatarFallback>CO</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="flex gap-2 items-center flex-wrap  overflow-x-scroll no-scrollbar">
            <p>{author.username}</p>
            <Link href={`/user/${author.id}/profile`}>
              <HiExternalLink />
            </Link>
          </PopoverContent>
        </Popover>

        <div>
          <p className="text-radio text-md md:text-2xl text-black tracking-wide font-bold">
            {position}
          </p>
          <p className="text-gray-400 text-sm">{company}</p>
        </div>

        <MoreOptionDialog postId={id} authorId={author.id} />
      </div>

      {/* second section  */}

      <div>
        <EditorContent editor={editor} />

        <div className="flex w-fit gap-4 mt-6 flex-wrap">
          <Button className="text-xs text-black bg-gray-300 hover:bg-gray-400 hover:text-white">
            {location}
          </Button>
          <Button className="text-xs text-black bg-gray-300 hover:bg-gray-400 hover:text-white">
            {role_name}
          </Button>
          <Button className="text-xs text-black bg-gray-300 hover:bg-gray-400 hover:text-white">
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
            ₹{salary_min} - <span>₹{salary_max}</span>/month
          </p>
        </div>

        <div className="flex gap-2">
          <BriefcaseBusiness />
          <p>{experience_level}</p>
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
