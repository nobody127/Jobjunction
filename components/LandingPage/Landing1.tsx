"use client";

import React from "react";
import GradualSpacing from "../magicui/gradual-spacing";
import TextComponent from "../TextComp";
import { Button } from "../ui/button";
import { ArrowBigRightDash, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPart1() {
  return (
    <div>
      <GradualSpacing
        text="Discover, Apply & Grow "
        className="text-xl sm:text-4xl xl:text-8xl font-kanit mt-28 font-bold break-before"
      />

      <div className="flex gap-6 w-full mt-12 justify-center">
        <motion.div
          animate={{
            x: [-300, 0],
            opacity: [0, 1],
          }}
          transition={{
            delay: 1,
          }}
        >
          <Button
            variant={"outline"}
            className="border-b-8  border-r-8 border-darkBg  bg-white  rounded-md cursor-pointer hover:-translate-y-1 font-bebas text-black hover:bg-white w-full"
          >
            <p className="text-md"> Get Job Free</p>
            <ArrowBigRightDash className="size-6" />
          </Button>
        </motion.div>

        <motion.div
          animate={{
            x: [300, 0],
            opacity: [0, 1],
          }}
          transition={{
            delay: 1,
          }}
        >
          <Button
            variant={"outline"}
            className="border-b-8  border-r-8 border-darkBg  bg-white  rounded-md cursor-pointer hover:-translate-y-1 font-bebas text-black hover:bg-white w-full"
          >
            <p className="text-md"> Post Job</p>
            <Briefcase className="size-6 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
