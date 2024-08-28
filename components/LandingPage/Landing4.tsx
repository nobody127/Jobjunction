"use client";

import NumberTicker from "@/components/magicui/number-ticker";
import TextComponent from "../TextComp";
import { Plus } from "lucide-react";

function NumberTickerDemo({ value }: { value: number }) {
  return (
    <p className="whitespace-pre-wrap text-5xl font-medium tracking-tighter text-black dark:text-white">
      <NumberTicker value={value} />
    </p>
  );
}

export default function LandingPart4() {
  return (
    <div className=" flex flex-col items-center gap-12 md:gap-0 md:flex-row md:justify-evenly bg-white px-4 md:px-8 mt-28 md:mt-52 ">
      <div>
        <div className="flex items-center">
          <NumberTickerDemo value={220} />
          <Plus className="size-8" />
        </div>
        <TextComponent
          text="Job Openings"
          className="text-lg md:text-xl text-gray-500 font-bold mt-4"
        />
      </div>

      <div>
        <div className="flex items-center">
          <NumberTickerDemo value={101} />
          <Plus className="size-8" />
        </div>
        <TextComponent
          text="Got Placed"
          className="text-xl text-gray-500 font-bold mt-4"
        />
      </div>

      <div>
        <div className="flex items-center">
          <NumberTickerDemo value={300} />
          <Plus className="size-8" />
        </div>
        <TextComponent
          text="Unique Users"
          className="text-xl text-gray-500 font-bold mt-4"
        />
      </div>
    </div>
  );
}
