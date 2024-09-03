"use server";

import { userProfileUpdateSchema } from "@/schema/auth";
import { CheckUser } from "./checkUser";
import prisma from "@/db";

export async function UpdateUserInfo(
  id: string,
  bio: string | undefined,
  instagram_url: string | undefined,
  twitter_url: string | undefined,
  linkedin_url: string | undefined
) {
  try {
    const { success }: { success: boolean } = userProfileUpdateSchema.safeParse(
      {
        bio,
        instagram_url,
        twitter_url,
        linkedin_url,
      }
    );

    if (!success) throw new Error("Schema Vlidation failed");

    const checkForUser = await CheckUser();

    if (checkForUser.status !== 200) throw new Error(checkForUser.message);

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        bio: bio,
        instagram_url: instagram_url,
        linkedin_url: linkedin_url,
        twitter_url: twitter_url,
      },
    });

    if (!updatedUser) throw new Error("Error while updating information");

    return {
      status: 200,
      message: "Updated Successfully",
    };
  } catch (error) {
    return {
      status: 404,
      message: (error as Error).message,
    };
  }
}
