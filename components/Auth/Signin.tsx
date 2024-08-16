"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SigninInputType, signinSchema } from "@/schema/auth";
import { AtSign, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaGoogle, FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";

export default function SigninForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SigninInputType>({
    resolver: zodResolver(signinSchema),
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [passwordClick, setPasswordClick] = useState<boolean>(false);

  async function onSubmit(data: any) {
    setSubmitting(true);
    try {
      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        callbackUrl: "/jobs",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className=" mx-auto mt-12 border-2 border-b-8 border-r-8 border-black  rounded-xl bg-white p-4 md:p-6 w-11/12 md:w-1/2 lg:w-1/3 ">
      <>
        <p className="p-2 bg-white w-fit font-bold font-kanit text-3xl rounded-sm mb-6 border-2 border-b-8 border-r-8 border-black ">
          JJ
        </p>
        <p className="text-2xl font-radio font-bold mb-2">Sign In</p>
        <p className="mb-6">To continue your journey with jobjunction</p>
      </>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:gap-y-8">
          <div>
            <label>Username</label>
            <div className="flex gap-2 items-center border-2 border-black p-2 rounded-md text-black w-full">
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

          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <TbFidgetSpinner className="animate-spin text-2xl " />
            ) : (
              <p>Submit</p>
            )}
          </Button>
        </div>
      </form>

      <Separator className="my-4" />
      <div>
        <Button
          className="bg-green-700 w-full flex gap-4"
          onClick={() => signIn("google", { callbackUrl: "/jobs" })}
        >
          <p>Signin With Google </p>
          <FaGoogle />
        </Button>

        <p className="mt-2 text-center text-gray-400">
          New User ?
          <Link href="/signup">
            <span className="cursor-pointer"> Create Account</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
