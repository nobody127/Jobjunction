"use client";

import FilterSideBar from "@/components/Job/filterCard";
import JobCard from "@/components/Job/jobCard";
import { useEffect, useState } from "react";
import { GetAllPost } from "../actions/jobs";

export default function AllJobs() {
  const [allJobs, setAllJobs] = useState<any>([]);

  useEffect(() => {
    const getAllJobs = async () => {
      const response = await GetAllPost();
      setAllJobs(response.data);
    };

    getAllJobs();
  }, []);

  return (
    <div className="flex gap-8">
      <FilterSideBar />

      <div className="flex flex-col gap-8 max-h-screen overflow-y-scroll no-scrollbar mt-8 lg:w-4/5">
        {allJobs.map((e: any) => {
          return (
            <JobCard
              authorUrl={e.author.avatar}
              position={e.position}
              company={e.company}
              description={e.role_description}
              jobType={e.job_type}
              location={e.location}
              roleName={e.role_name}
              salaryMin={e.salary_min}
              salaryMax={e.salary_max}
              experienceLevel={e.experience_level}
              applyLink={e.apply_link}
            />
          );
        })}
      </div>
    </div>
  );
}
