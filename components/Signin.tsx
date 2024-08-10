"use client";

import { signIn } from "@/auth";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "@/schema/signin";

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signinSchema),
  });

  async function onSubmit(data: any) {
    setTimeout(() => {
      console.log("hello wrold");
      reset();
    }, 5000);
  }
  console.log(isSubmitSuccessful);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 w-1/2 mx-auto mt-2"
    >
      <input
        type="text"
        placeholder="Username"
        {...register("username")}
        className="p-2 bg-gray-200 rounded-md w-1/2 mx-auto"
      />

      {errors.username?.message && (
        <p className="text-red-500 font-bold">{errors?.username?.message}</p>
      )}
      <input
        type="text"
        placeholder="Email"
        {...register("email")}
        className="p-2 bg-gray-200 rounded-md w-1/2 mx-auto"
      />

      {errors.email?.message && (
        <p className="text-red-500 font-bold">{errors?.email?.message}</p>
      )}

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="p-2 bg-gray-200 rounded-md w-1/2 mx-auto"
      />

      {errors.password?.message && (
        <p className="text-red-500 font-bold">{errors?.password?.message}</p>
      )}

      {isSubmitting ? (
        <Button className="w-1/2 mx-auto" disabled={true}>
          Loading
        </Button>
      ) : (
        <Button className="w-1/2 mx-auto" disabled={isSubmitSuccessful}>
          Submit
        </Button>
      )}
    </form>
  );
}
