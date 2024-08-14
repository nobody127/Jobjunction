"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SigninInputType, signinSchema } from "@/schema/auth";
import { AtSign, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export default function SigninForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SigninInputType>({
    resolver: zodResolver(signinSchema),
  });

  async function onSubmit(data: any) {
    const res = await signIn("credentials", data);
    console.log(res);
  }

  return (
    <div className=" mx-auto mt-6 border-2 border-b-8 border-r-8 border-black  rounded-xl bg-white p-4 md:p-8 w-1/3 ">
      <>
        <p className="p-2 bg-white w-fit font-bold font-kanit text-3xl rounded-sm mb-6 border-2 border-b-8 border-r-8 border-black ">
          JJ
        </p>
        <p className="text-2xl font-radio font-bold mb-2">Sign In</p>
        <p className="mb-6">To continue your journey with jobjunction</p>
      </>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8">
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
                type="password"
                placeholder="Hello@1"
                className="w-full outline-none"
                {...register("password")}
              />
            </div>
            {errors.password?.message && (
              <p className="text-red-500">{errors.password?.message}</p>
            )}
          </div>

          <Button type="submit">Submit</Button>
        </div>
      </form>

      <Separator className="my-4" />
      <div>
        <Button
          className="bg-green-700"
          onClick={() => signIn("google", { redirectTo: "/" })}
        >
          <p>Signin With Google </p>
        </Button>
      </div>
    </div>
  );
}
