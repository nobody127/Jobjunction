"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schema/auth";
import React, { useState } from "react";
import { SignupInputType } from "@/schema/auth";
import { useRouter } from "next/navigation";
import {
  AtSign,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  X,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { CreateUser } from "@/app/actions/signup";
import Link from "next/link";
import { FaGoogle, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { toast } from "sonner";
import { TbFidgetSpinner } from "react-icons/tb";

export default function SignupForm() {
  const [items, setItems] = useState<string[] | undefined>([]);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<SignupInputType>({
    resolver: zodResolver(signupSchema),
  });

  const [error, setError] = useState<{
    status: boolean;
    message: string;
  }>({
    status: false,
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [passwordClick, setPasswordClick] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  async function onSubmit(data: any) {
    setSubmitting(true);
    try {
      const response = await CreateUser(data);
      if (response.status !== 200) throw new Error(response.message);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      router.push("/signin");

      setCurrentIndex(0);
    } catch (error: any) {
      setError({
        status: true,
        message: error.message,
      });
      setTimeout(() => {
        setError({
          status: false,
          message: "",
        });
      }, 2000);
    } finally {
      setSubmitting(false);
      reset();
    }
  }

  const filedValues = [
    ["username", "email", "password"],
    ["bio", "instagram_url", "linkedin_url", "twitter_url"],
    ["skills"],
  ];

  async function next() {
    const fields = filedValues[currentIndex];

    const output = await trigger(fields as any);

    if (!output) return;

    if (currentIndex > -1 && currentIndex < 3) {
      if (currentIndex === 2) {
        return await handleSubmit(onSubmit)();
      }
      setCurrentIndex((prev) => prev + 1);
    }
  }

  async function handleNext() {
    if (currentIndex >= 2) return;
    setCurrentIndex((prev) => prev + 1);
  }

  async function handlePrevious() {
    if (currentIndex <= 0) return;
    setCurrentIndex((prev) => prev - 1);
  }

  function handleInterestChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    setItems((prev: string[] | undefined) => {
      if (prev) {
        const isInArray = prev.indexOf(e.target.value);
        if (isInArray === -1) {
          return [...prev, e.target.value];
        }
        return prev;
      }
    });
  }

  function deleteField(value: string) {
    setItems((prev) => {
      if (prev) {
        const toremove = prev?.indexOf(value);
        prev?.splice(toremove, 1);
        return [...prev];
      }
    });
  }
  return (
    <div>
      {success &&
        toast("Account created Successfully.", {
          duration: 2000,
        })}

      {error.status &&
        toast(error.message, {
          duration: 2000,
        })}

      <div className=" mx-auto  mt-6 border-2 border-b-8 border-r-8 border-black  rounded-xl bg-white p-4 md:p-6 w-11/12 sm:w-1/2 ">
        <div className="flex gap-2 ">
          {currentIndex > 0 ? (
            <ChevronLeft className="cursor-pointer" onClick={handlePrevious} />
          ) : (
            ""
          )}
          <p className="text-gray-600 mb-6">Step {currentIndex + 1} / 3</p>
          {currentIndex >= 0 ? (
            <ChevronRight className="cursor-pointer" onClick={handleNext} />
          ) : (
            ""
          )}
        </div>

        <>
          <p className="p-2 bg-white w-fit font-bold font-kanit text-3xl rounded-sm mb-6 border-2 border-b-8 border-r-8 border-black ">
            JJ
          </p>
          <p className="text-2xl font-radio font-bold mb-2">Sign Up</p>
          <p className="mb-6">Start your journey with jobjunction</p>
        </>

        <form onSubmit={handleSubmit(onSubmit)}>
          {currentIndex === 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-8">
              <div>
                <label>Username</label>
                <div className="flex gap-2 items-center border-2 border-black p-2 rounded-md text-black w-full col-span-2">
                  <AtSign className="bg-white text-gray-400 size-5" />
                  <input
                    type="text"
                    placeholder="Ramu_09"
                    className="outline-none w-full"
                    {...register("username")}
                  />
                </div>
                {errors.username?.message && (
                  <p className="text-red-500">{errors.username?.message}</p>
                )}
              </div>

              <div>
                <label>Email</label>

                <div className="flex gap-2 items-center border-2 border-black p-2 rounded-md text-black">
                  <Mail className=" bg-white text-gray-400 size-5" />
                  <input
                    type="email"
                    placeholder="ramu@gmail.com"
                    className=" w-full outline-none"
                    {...register("email")}
                  />
                </div>
                {errors.email?.message && (
                  <p className="text-red-500">{errors.email?.message}</p>
                )}
              </div>

              <div>
                <label>Password</label>
                <div className="border-2 border-black p-2 rounded-md text-black w-full flex gap-2 items-center">
                  <Lock className=" bg-white text-gray-400 size-5" />
                  <input
                    type={passwordClick ? "text" : "password"}
                    placeholder="Hello@1"
                    className="w-full outline-none"
                    {...register("password")}
                  />
                  <div onClick={() => setPasswordClick((prev) => !prev)}>
                    {passwordClick ? (
                      <Eye className="cursor-pointer" />
                    ) : (
                      <EyeOff className="cursor-pointer" />
                    )}
                  </div>
                </div>
                {errors.password?.message && (
                  <p className="text-red-500">{errors.password?.message}</p>
                )}
              </div>
            </div>
          ) : (
            ""
          )}

          {currentIndex === 1 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8">
              <div className=" col-span-2">
                <label>Bio</label>
                <input
                  type="text"
                  placeholder="Write"
                  className="border-2 border-black p-2 rounded-md text-black w-full"
                  {...register("bio")}
                />
                {errors.bio?.message && (
                  <p className="text-red-500">{errors.bio?.message}</p>
                )}
              </div>

              <div>
                <label>Instagram Link</label>
                <div className="border-2 border-black p-2 rounded-md text-black w-full flex gap-2 items-center">
                  <FaInstagram className="bg-white text-gray-400" />
                  <input
                    type="text"
                    placeholder="Instagram url"
                    className="outline-none w-full"
                    {...register("instagram_url")}
                  />
                </div>

                {errors.instagram_url?.message && (
                  <p className="text-red-500">
                    {errors.instagram_url?.message}
                  </p>
                )}
              </div>

              <div>
                <label>Twitter Link</label>

                <div className="border-2 border-black p-2 rounded-md text-black w-full flex gap-2 items-center">
                  <FaTwitter className=" bg-white text-gray-400 " />
                  <input
                    type="text"
                    placeholder="Twitter url"
                    className="outline-none w-full"
                    {...register("twitter_url")}
                  />
                </div>

                {errors.twitter_url?.message && (
                  <p className="text-red-500">{errors.twitter_url?.message}</p>
                )}
              </div>

              <div className="col-span-2">
                <label>Linkedin Link</label>
                <div className="border-2 border-black p-2 rounded-md text-black w-full flex gap-2 items-center">
                  <FaLinkedin className="bg-white text-gray-400" />
                  <input
                    type="text"
                    placeholder="linkedin url"
                    className=" w-full outline-none"
                    {...register("linkedin_url")}
                  />
                </div>

                {errors.linkedin_url?.message && (
                  <p className="text-red-500">{errors.linkedin_url?.message}</p>
                )}
              </div>
            </div>
          ) : (
            ""
          )}

          {currentIndex === 2 ? (
            <div className="mt-8 ">
              {/* <p className="text-lg font-bold">Interested Fields</p> */}
              <select
                {...register("skills")}
                multiple
                className="w-full border-2 rounded-lg border-black no-scrollbar"
                onChange={handleInterestChange}
              >
                <option value={"reactjs"} className="mt-4">
                  Reactjs
                </option>
                <option value={"nextjs"} className="mt-4">
                  Nextjs
                </option>
                <option value={"javascript"} className="mt-4">
                  Javascript
                </option>
                <option value={"typescript"} className="mt-4">
                  Typescript
                </option>
                <option value={"express"} className="mt-4">
                  Express
                </option>
                <option value={"nodejs"} className="mt-4">
                  Nodejs
                </option>
                <option value="mongodb" className="mt-4">
                  Mongodb
                </option>
              </select>

              {errors.skills?.message && (
                <p className="text-red-500">{errors.skills?.message}</p>
              )}

              <div className="flex gap-4 flex-wrap mt-4">
                {items?.map((e: string, i: number) => {
                  return (
                    <div
                      className=" bg-gray-300 rounded-full p-2 w-fit flex items-center gap-2"
                      key={i}
                    >
                      <p>{e}</p>
                      <X
                        className="cursor-pointer"
                        onClick={() => {
                          deleteField(e);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}

          <Button
            onClick={next}
            className="flex mt-4 ml-auto"
            disabled={submitting}
          >
            {currentIndex === 2 ? (
              <div>
                {submitting ? (
                  <TbFidgetSpinner className="animate-spin text-2xl " />
                ) : (
                  <p>Submit</p>
                )}
              </div>
            ) : (
              "Next Step"
            )}
          </Button>
        </form>

        <Separator className="my-4" />
        <div>
          <Button
            className="bg-green-700 w-full flex gap-4"
            onClick={() => signIn("google", { callbackUrl: "/jobs" })}
          >
            <p>Signup With Google </p>
            <FaGoogle />
          </Button>

          <p className="mt-2 text-center text-gray-400">
            Existing User ?
            <Link href="/signin">
              <span className="cursor-pointer"> Login to Account</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
