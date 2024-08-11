"use client";

import { signIn } from "@/auth";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "@/schema/signin";
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { SigninInputType } from "@/schema/signin";
import { useRouter } from "next/navigation";
import { AtSign, ChevronLeft, ChevronRight, X } from "lucide-react";

export default function SigninForm() {
  const [items, setItems] = useState<string[] | undefined>([]);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(2);
  const {
    register,
    handleSubmit,
    trigger,
    reset,

    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SigninInputType>({
    resolver: zodResolver(signinSchema),
  });

  async function onSubmit(data: any) {
    console.log(data);
    reset();
    router.push("/");
  }

  const filedValues = [
    ["username", "email", "password"],
    ["bio", "instagram_url", "linkedin_url", "twitter_url"],
    ["interest"],
  ];
  async function next() {
    const fields = filedValues[currentIndex];

    const output = await trigger(fields as any);

    if (!output) return;

    if (currentIndex > -1 && currentIndex < 3) {
      if (currentIndex === 2) {
        await handleSubmit(onSubmit)();
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
    <div className=" mx-auto mt-6 border-2 border-b-8 border-r-8 border-black  rounded-xl bg-white p-4 md:p-8 w-1/2 ">
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
        <p className="text-2xl font-radio font-bold mb-2">Sign In</p>
        <p className="mb-6">To continue your journey with jobjunction</p>
      </>

      <form onSubmit={handleSubmit(onSubmit)}>
        {currentIndex === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
            <div>
              <label>Username</label>
              <input
                type="text"
                placeholder="Ramu_09"
                className="border-2 border-black p-2 rounded-md text-black w-full"
                {...register("username")}
              />
              {errors.username?.message && (
                <p className="text-red-500">{errors.username?.message}</p>
              )}
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="ramu@gmail.com"
                className="border-2 border-black p-2 rounded-md text-black w-full"
                {...register("email")}
              />
              {errors.email?.message && (
                <p className="text-red-500">{errors.email?.message}</p>
              )}
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Hello@1"
                className="border-2 border-black p-2 rounded-md text-black w-full"
                {...register("password")}
              />
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
              <input
                type="text"
                placeholder="Instagram url"
                className="border-2 border-black p-2 rounded-md text-black w-full"
                {...register("instagram_url")}
              />
              {errors.instagram_url?.message && (
                <p className="text-red-500">{errors.instagram_url?.message}</p>
              )}
            </div>

            <div>
              <label>Twitter Link</label>
              <input
                type="text"
                placeholder="Twitter url"
                className="border-2 border-black p-2 rounded-md text-black w-full"
                {...register("twitter_url")}
              />
              {errors.twitter_url?.message && (
                <p className="text-red-500">{errors.twitter_url?.message}</p>
              )}
            </div>

            <div className="col-span-2">
              <label>Linkedin Link</label>
              <input
                type="text"
                placeholder="linkedin url"
                className="border-2 border-black p-2 rounded-md text-black w-full "
                {...register("linkedin_url")}
              />

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
              className="w-full border-2 rounded-lg border-black"
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
              {items?.map((e: string) => {
                return (
                  <div className=" bg-gray-300 rounded-full p-2 w-fit flex items-center gap-2">
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

        <Button onClick={next} className="flex mt-4 ml-auto">
          {currentIndex === 2 ? "Submit" : "Next Step"}
        </Button>
      </form>
    </div>
  );
}
