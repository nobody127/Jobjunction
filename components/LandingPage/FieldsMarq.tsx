import { FieldsMarqueeType } from "@/types/types";
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import reviews from "@/data/Fields.json";
import { BadgeCheck } from "lucide-react";
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ field, jobs, applied }: FieldsMarqueeType) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl  p-4 border-r-8 border-b-8 border-l-2 border-t-2 border-darkBg bg-white hover:scale-110 duration-200",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row justify-between w-full">
          <figcaption className="text-sm lg:text-md font-medium dark:text-white">
            {field}
          </figcaption>
          <div className="flex gap-2 items-center">
            <BadgeCheck />
            <p className="text-xs font-medium dark:text-white/40">{applied} </p>
          </div>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{jobs} Jobs Avaiable</blockquote>
    </figure>
  );
};

export default function FieldsMarqueeComponent() {
  return (
    <div className="mt-44 relative flex my-20 w-full flex-col items-center justify-center overflow-hidden rounded-lg ">
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.field} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.field} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
