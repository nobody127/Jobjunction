"use client";

import JobCard from "@/components/Job/jobCard";
import { useEffect, useState } from "react";
import { GetAllPost } from "../actions/jobs";
import { toast } from "sonner";
import { GetAllPostResponseType, JobLisitingType } from "@/types/types";
import MobileFilterCard from "@/components/Job/mobFilterCard";
import DesktopFilterCard from "@/components/Job/deskFilterCard";
import { useRecoilState } from "recoil";
import { allJobListings } from "@/store/store";

export default function AllJobs() {
  const [allJobs, setAllJobs] = useRecoilState(allJobListings);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{
    status: boolean;
    message: string;
  }>({
    status: false,
    message: "",
  });
  useEffect(() => {
    const getAllJobs = async () => {
      setLoading(true);
      try {
        const response: GetAllPostResponseType = await GetAllPost();
        if (response.status !== 200) throw new Error(response.message);
        setAllJobs(response.data);
      } catch (error) {
        setError({
          status: false,
          message: (error as Error).message,
        });

        setTimeout(() => {
          setError({
            status: true,
            message: "",
          });
        }, 1500);
      } finally {
        setLoading(false);
      }
    };

    getAllJobs();
  }, []);

  if (loading) {
    return (
      <div className="bg-white flex w-screen h-screen justify-center items-center  ">
        <p className="border-2 border-b-8 border-r-8 border-black p-4 rounded-md font-bold animate-bounce ">
          JJ
        </p>
      </div>
    );
  }

  return (
    <div className="lg:flex lg:gap-8">
      {error.status ? toast(error.message) : ""}

      <DesktopFilterCard />

      <MobileFilterCard />

      <div className="flex flex-col gap-8 max-h-screen overflow-y-scroll no-scrollbar lg:mt-8 lg:w-4/5 py-6">
        {allJobs.map((e: JobLisitingType) => {
          return (
            <JobCard
              key={e.id}
              id={e.id}
              author={e.author}
              position={e.position}
              company={e.company}
              role_description={e.role_description}
              job_type={e.job_type}
              location={e.location}
              role_name={e.role_name}
              salary_min={e.salary_min}
              salary_max={e.salary_max}
              experience_level={e.experience_level}
              apply_link={e.apply_link}
            />
          );
        })}
      </div>
    </div>
  );
}
