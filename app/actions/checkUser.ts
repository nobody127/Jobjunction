"use server";

import { auth } from "@/auth";
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

    if (!isUser) throw new Error("User Not exist in database");

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
