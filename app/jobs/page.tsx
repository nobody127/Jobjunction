"use client";

import JobCard from "@/components/Job/jobCard";
import { useEffect } from "react";
import { GetAllPost } from "../actions/jobs";
import { toast } from "sonner";
import { GetAllPostResponseType, JobLisitingType } from "@/types/types";
import MobileFilterCard from "@/components/Job/mobFilterCard";
import DesktopFilterCard from "@/components/Job/deskFilterCard";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allJobListings,
  joblistingError,
  universalError,
  universalLoader,
} from "@/store/store";

export default function AllJobs() {
  const [allJobs, setAllJobs] = useRecoilState(allJobListings);
  const [loading, setLoading] = useRecoilState(universalLoader);
  const [error, setError] = useRecoilState(universalError);
  const errorNoPost = useRecoilValue(joblistingError);

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

  return (
    <div className="lg:flex lg:gap-8">
      {error.status ? toast(error.message) : ""}

      <DesktopFilterCard />

      <MobileFilterCard />

      <div className="lg:w-4/5">
        {errorNoPost ? (
          <div className="w-full h-full flex items-center justify-center">
            <p>No Post found</p>
          </div>
        ) : (
          <div className="lg:flex lg:flex-col gap-8 py-6 h-screen max-h-screen overflow-y-scroll no-scrollbar ">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center ">
                <p className="bg-white border-2 border-b-8 border-r-8 border-black p-4 rounded-md font-bold animate-bounce ">
                  JJ
                </p>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
