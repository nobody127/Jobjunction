"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

const experienceValues = ["Fresher", "0-1", "1+", "3+", "5+"];
const jobTypeValues = ["Fulltime", "Internship", "Contract", "Freelance"];
const locationTypeValue = ["Remote", "Onsite", "Hybrid"];

export default function FilterSideBar() {
  const { register, watch } = useForm();

  const watchExperience = watch(experienceValues);
  const watchJob = watch(jobTypeValues);
  const watchLocation = watch(locationTypeValue);

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
