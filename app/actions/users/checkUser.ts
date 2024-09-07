"use server";

import { auth, signOut } from "@/auth";
import prisma from "@/db";

export async function CheckUser() {
  try {
    const session = await auth();

    if (!session?.user) throw new Error("Not Logged In");

    const isUser = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    if (!isUser) {
      return signOut();
    }

    return {
      status: 200,
      message: "Logged In",
      userId: session.user.id,
    };
  } catch (error: any) {
    return {
      status: 404,
      message: error.message,
    };
  }
}

export async function GetUserDetailById(userId: string) {
  try {
    const response = await CheckUser();

    if (response.status !== 200) throw new Error(response.message);

    const isUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        linkedin_url: true,
        instagram_url: true,
        twitter_url: true,
        bio: true,
        avatar: true,
        createdAt: true,
        skills: true,
        role: true,
      },
    });

    if (!isUser) throw new Error("User Not exist in database");

    return {
      status: 200,
      message: "Logged In",
      data: isUser,
    };
  } catch (error: any) {
    return {
      status: 404,
      message: error.message,
      data: null,
    };
  }
}
