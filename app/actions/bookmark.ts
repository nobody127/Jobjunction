"use server";

import prisma from "@/db";
import { CheckUser } from "./checkUser";

export async function HandleBookmakrClick(userId: string, postId: string) {
  try {
    if (!userId || !postId) throw new Error("User or Post is missing");

    const checkForUser = await CheckUser();

    if (checkForUser.status !== 200) throw new Error("User is not logged In");

    const checkForBookmark = await prisma.bookmark.findFirst({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    if (checkForBookmark) {
      const deletedBookmark = await prisma.bookmark.delete({
        where: {
          id: checkForBookmark.id,
        },
      });

      return {
        status: 201,
        message: "Bookmakr Deleted Successfully",
        data: deletedBookmark,
      };
    }

    const createNewBookmark = await prisma.bookmark.create({
      data: {
        postId: postId,
        userId: userId,
      },
    });

    return {
      status: 200,
      message: "Bookmarked Successfully",
      data: createNewBookmark,
    };
  } catch (error) {
    return {
      status: 404,
      message: (error as Error).message,
      data: [],
    };
  }
}

export async function CheckForBookmark(userId: string, postId: string) {
  try {
    if (!userId || !postId) throw new Error("User or Post is missing");

    const checkForUser = await CheckUser();

    if (checkForUser.status !== 200) throw new Error("User is not logged In");

    const checkForBookmark = await prisma.bookmark.findFirst({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    if (!checkForBookmark) throw new Error("Post is not Bookmarked");

    return {
      status: 200,
      message: "Post is Bookmarked",
      data: [],
    };
  } catch (error) {
    return {
      status: 404,
      message: (error as Error).message,
      data: [],
    };
  }
}
