"use client";

import { allJobListings } from "@/store/store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";

const experienceValues = ["Fresher", "0-1", "1+", "3+", "5+"];
const jobTypeValues = ["Fulltime", "Internship", "Contract", "Freelance"];
const locationTypeValue = ["Remote", "Onsite", "Hybrid"];

export default function FilterSideBar() {
  const { register, watch } = useForm();
  const [allJobs, setAllJobs] = useRecoilState(allJobListings);
  const [filter, setFilter] = useState<{
    experience: any[];
    job: any[];
    location: any[];
  }>({
    experience: [],
    job: [],
    location: [],
  });

  const selectedExperience = watch(experienceValues);
  const selectedJob = watch(jobTypeValues);
  const selectedLocation = watch(locationTypeValue);

  useEffect(() => {
    const newFilter = {
      experience: selectedExperience.filter((e) => (e ? e : null)),
      job: selectedJob.filter((e) => (e ? e : null)),
      location: selectedLocation.filter((e) => (e ? e : null)),
    };
    if (JSON.stringify(newFilter) !== JSON.stringify(filter))
      setFilter(newFilter);
  }, [selectedExperience, selectedJob, selectedLocation]);

  useEffect(() => {
    const callBackend = async () => {
      try {
        const response = await fetch(`/api/jobs`, {
          method: "POST",
          body: JSON.stringify(filter),
        });
        const finalData = await response.json();
        setAllJobs(finalData.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (
      filter.experience.length <= 0 &&
      filter.job.length <= 0 &&
      filter.location.length <= 0
    )
      return;
    callBackend();
  }, [filter]);

  return (
    <div>
      <div className="py-4 px-2 lg:py-8 lg:px-6">
        <p className="font-bold text-left">Experience Level</p>
        {experienceValues.map((e: string, i: number) => {
          return (
            <div className="flex gap-2 mt-4" key={i}>
              <input type="checkbox" value={e} {...register(e)} />
              <label>{e}</label>
            </div>
          );
        })}
      </div>

      <div className="py-4 px-2 lg:py-8 lg:px-6">
        <p className="font-bold text-left">Job Type</p>
        {jobTypeValues.map((e: string, i: number) => {
          return (
            <div className="flex gap-2 mt-4" key={i}>
              <input type="checkbox" value={e} {...register(e)} />
              <label>{e}</label>
            </div>
          );
        })}
      </div>

      <div className="py-4 px-2 lg:py-8 lg:px-6">
        <p className="font-bold text-left">Location Wise</p>
        {locationTypeValue.map((e: string, i: number) => {
          return (
            <div className="flex gap-2 mt-4" key={i}>
              <input type="checkbox" value={e} {...register(e)} />
              <label>{e}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
