"use client";

import {
  allJobListings,
  joblistingError,
  universalLoader,
} from "@/store/store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

const experienceValues = ["Fresher", "0-1y", "1y", "3y", "5y"];
const jobTypeValues = ["Fulltime", "Internship", "Contract", "Freelance"];
const locationTypeValue = ["Remote", "Onsite", "Hybrid"];

export default function FilterSideBar() {
  const { register, watch } = useForm();

  const setAllJobs = useSetRecoilState(allJobListings);
  const setLoading = useSetRecoilState(universalLoader);
  const setError = useSetRecoilState(joblistingError);

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

  const callBackend = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/jobs`, {
        method: "POST",
        body: JSON.stringify(filter),
      });

      const finalData = await response.json();

      if (finalData.status !== 200) throw new Error(finalData.message);
      setError(false);
      setAllJobs(finalData.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  let timer: any;

  useEffect(() => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callBackend();
    }, 2000);

    return () => clearTimeout(timer);
  }, [filter]);

  return (
    <div>
      <div className="py-4 px-2 lg:py-8 lg:px-6">
        <p className="font-bold text-left">Experience Level</p>
        {experienceValues.map((e: string, i: number) => {
          return (
            <div className="flex gap-2 mt-4" key={i}>
              <input
                type="checkbox"
                value={e}
                {...register(e)}
                className="accent-green-700"
              />
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
              <input
                type="checkbox"
                value={e}
                {...register(e)}
                className="accent-green-700"
              />
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
              <input
                type="checkbox"
                value={e}
                {...register(e)}
                className="accent-green-700"
              />
              <label>{e}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
