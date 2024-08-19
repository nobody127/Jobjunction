"use client";

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
    formState: { errors },
  } = useForm();

  return (
    <div className="mt-4 fixed  flex flex-col gap-8 border-r-2 min-w-[350px] bg-white rounded-sm">
      <div className="py-4 px-6 min-w-[250px]">
        <p className="font-bold">Experience Level</p>
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

      <div className=" py-4 px-6 min-w-[250px]">
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

      <div className=" py-4 px-6 min-w-[250px]">
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
