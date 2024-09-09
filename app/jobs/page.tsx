"use client";

import MobileFilterCard from "@/components/Job/mobFilterCard";
import DesktopFilterCard from "@/components/Job/deskFilterCard";
import AllJobsComp from "@/components/Job/Jobs";

export default function AllJobs() {
  return (
    <div className="lg:flex lg:gap-8">
      <DesktopFilterCard />

      <MobileFilterCard />

      <div className="lg:w-4/5">
        <AllJobsComp />
      </div>
    </div>
  );
}
