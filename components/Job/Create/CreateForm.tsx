"use client";

import { CreateJob } from "@/app/actions/jobs";
import { Button } from "@/components/ui/button";
import { createJobSchema, createJobSchemaType } from "@/schema/jobs";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Briefcase, Building, IndianRupee, Link } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { PiOfficeChair } from "react-icons/pi";
import { toast } from "sonner";

export default function CreateForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createJobSchemaType>({
    resolver: zodResolver(createJobSchema),
  });

  const session: any = useSession();
  const router = useRouter();

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<{
    status: boolean;
    message: string;
  }>({
    status: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: any) {
    setLoading(true);
    try {
      const response = await CreateJob(data);

      if (response.status !== 200) throw new Error(response.message);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1500);

      router.push("/jobs");
    } catch (error) {
      setError({
        status: true,
        message: (error as Error).message,
      });

      setTimeout(() => {
        setError({
          status: false,
          message: "",
        });
      }, 1500);
    } finally {
      reset();
      setLoading(false);
    }
  }

  return (
    <div className="p-12 bg-white">
      {success ? toast("Successfully created") : ""}

      {error.status ? toast(error.message) : ""}

      <p className="text-2xl font-Heebo font-bold">List a new Job</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-8  mt-8">
          <div>
            <label
              className="text-black font-bold font-bebas"
              htmlFor="position"
            >
              Position
            </label>
            <div className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md w-full outline-none font-kanit mt-2">
              <PiOfficeChair className="size-6" />
              <input
                className="bg-transparent outline-none w-full "
                placeholder="Senior Web Developer"
                {...register("position")}
                id="position"
              />
            </div>
            {errors.position?.message && (
              <p className="mt-2 font-bold text-red-500">
                {errors.position?.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="text-black font-bold font-bebas"
              htmlFor="company"
            >
              Company
            </label>
            <div className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md w-full outline-none font-kanit mt-2">
              <Building className="size-6" />
              <input
                className="bg-transparent outline-none w-full "
                placeholder="Microsoft India"
                {...register("company")}
                id="company"
              />
            </div>
            {errors.company?.message && (
              <p className="mt-2 font-bold text-red-500">
                {errors.company?.message}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <label
              className="text-black font-bold font-bebas"
              htmlFor="role_description"
            >
              Role Description
            </label>
            <div className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md w-full outline-none font-kanit mt-2 ">
              <textarea
                className="bg-transparent outline-none w-full resize-none no-scrollbar "
                placeholder="Write Description.."
                {...register("role_description")}
                id="role_description"
              />
            </div>
            {errors.role_description?.message && (
              <p className="mt-2 font-bold text-red-500">
                {errors.role_description?.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="text-black font-bold font-bebas"
              htmlFor="location"
            >
              Location
            </label>
            <div className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md w-full outline-none font-kanit mt-2">
              <select
                id="location"
                className="bg-transparent outline-none w-full"
                {...register("location")}
              >
                <option value="Remote">Remote</option>
                <option value="Onsite">Onsite</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            {errors.location?.message && (
              <p className="mt-2 font-bold text-red-500">
                {errors.location?.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="text-black font-bold font-bebas"
              htmlFor="job_type"
            >
              Job Type
            </label>
            <div className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md w-full outline-none font-kanit mt-2">
              <select
                id="job_type"
                className="bg-transparent outline-none w-full"
                {...register("job_type")}
              >
                <option value="Fulltime">Fulltime</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            {errors.job_type?.message && (
              <p className="mt-2 font-bold text-red-500">
                {errors.job_type?.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="text-black font-bold font-bebas"
              htmlFor="role_name"
            >
              Role Name
            </label>
            <div className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md w-full outline-none font-kanit mt-2">
              <Briefcase className="size-6" />
              <input
                className="bg-transparent outline-none w-full "
                placeholder="Frontend Engineer"
                {...register("role_name")}
                id="role_name"
              />
            </div>
            {errors.role_name?.message && (
              <p className="mt-2 font-bold text-red-500">
                {errors.role_name?.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="text-black font-bold font-bebas"
              htmlFor="experience_level"
            >
              Experience
            </label>
            <div className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md w-full outline-none font-kanit mt-2">
              <select
                id="experience_level"
                className="bg-transparent outline-none w-full"
                {...register("experience_level")}
              >
                <option value="Fresher">Fresher</option>
                <option value="0-1">0-1</option>
                <option value="1+">1+ years</option>
                <option value="3+">3+ years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>
            {errors.experience_level?.message && (
              <p className="mt-2 font-bold text-red-500">
                {errors.experience_level?.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="text-black font-bold font-bebas"
              htmlFor="salary_min"
            >
              Min Salary (per month)
            </label>
            <div className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md w-full outline-none font-kanit mt-2">
              <IndianRupee className="size-6" />
              <input
                type="number"
                className="bg-transparent outline-none w-full "
                placeholder="5000"
                {...register("salary_min", { valueAsNumber: true })}
                id="salary_min"
              />
            </div>
            {errors.salary_min?.message && (
              <p className="mt-2 font-bold text-red-500">
                {errors.salary_min?.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="text-black font-bold font-bebas"
              htmlFor="salary_max"
            >
              Max Salary (per month)
            </label>
            <div className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md w-full outline-none font-kanit mt-2">
              <IndianRupee className="size-6" />
              <input
                type="number"
                className="bg-transparent outline-none w-full "
                placeholder="5,00,000"
                {...register("salary_max", { valueAsNumber: true })}
                id="salary_max"
              />
            </div>
            {errors.salary_max?.message && (
              <p className="mt-2 font-bold text-red-500">
                {errors.salary_max.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="text-black font-bold font-bebas"
              htmlFor="apply_link"
            >
              Apply Link
            </label>
            <div className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md w-full outline-none font-kanit mt-2">
              <Link className="size-6" />
              <input
                className="bg-transparent outline-none w-full "
                placeholder="https://job-junction-olive.vercel.app"
                {...register("apply_link")}
                id="apply_link"
              />
            </div>
            {errors.apply_link?.message && (
              <p className="mt-2 font-bold text-red-500">
                {errors.apply_link?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button className={`border-2 mt-4`} disabled={loading}>
            {loading ? <FaSpinner className="animate-spin" /> : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
