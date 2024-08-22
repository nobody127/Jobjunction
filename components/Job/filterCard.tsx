"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

const items = [
  {
    id: "entry",
    label: "Entry Level",
  },
  {
    id: "intermediate",
    label: "Intermediate",
  },
  {
    id: "experienced",
    label: "Experienced",
  },
] as const;

export default function FilterSideBar() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchExperience = watch("entry");

  useEffect(() => {
    if (watchExperience) console.log("hi", watchExperience);
  }, [watchExperience]);
  return (
    <div className="hidden lg:flex flex-col gap-4 border-r-2 min-w-[300px] w-1/5 bg-white rounded-md max-h-screen overflow-y-scroll filter-scrollbar">
      <div className="py-8 px-6">
        <p className="font-bold">Experience Level</p>
        {items.map((item: any) => {
          return (
            <div className="flex gap-2 mt-4">
              <input type="checkbox" value={item.id} {...register(item.id)} />
              <label>{item.label}</label>
            </div>
          );
        })}
      </div>

      <div className=" py-4 px-6">
        <p className="font-bold">Job Type</p>
        {items.map((item: any) => {
          return (
            <div className="flex gap-2 mt-4">
              <input
                type="checkbox"
                value={item.id}
                onChange={(e) => console.log(e.target.value)}
                // {...register(item)}
              />
              <label>{item.label}</label>
            </div>
          );
        })}
      </div>

      <div className=" py-4 px-6">
        <p className="font-bold">Location Wise</p>
        {items.map((item: any) => {
          return (
            <div className="flex gap-2 mt-4">
              <input
                type="checkbox"
                value={item.id}
                onChange={(e) => console.log(e.target.value)}
                // {...register(item)}
              />
              <label>{item.label}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
