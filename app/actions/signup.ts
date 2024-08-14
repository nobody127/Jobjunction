"use server";
import prisma from "@/db";
import { signupSchema, SignupInputType } from "@/schema/auth";
import { redirect } from "next/navigation";

export async function CreateUser(data: SignupInputType) {
  try {
    const { success } = signupSchema.safeParse(data);
    if (!success) throw new Error("Schema validation Error");
    const isUserExist = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: data.username,
          },
          {
            email: data.email,
          },
        ],
      },
    });

    if (isUserExist) throw new Error("User already exist");

    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        avatar: data.avatar,
        bio: data.bio,
        instagram_url: data.instagram_url,
        linkedin_url: data.linkedin_url,
        twitter_url: data.twitter_url,
        skills: data.skills,
        provider: "credentials",
      },

      select: {
        id: true,
        username: true,
        email: true,
        provider: true,
      },
    });

    if (!newUser) throw new Error("Error while saving the user in the databse");

    return {
      status: 200,
      message: "user doesn't exist in the database",
      newUser,
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: 400,
      message: error.message,
    };
  }
}
