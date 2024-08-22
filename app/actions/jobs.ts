"use server";

import { createJobSchema, createJobSchemaType } from "@/schema/jobs";
import { CheckUser } from "./checkUser";
import prisma from "@/db";

export async function CreateJob(postdata: createJobSchemaType) {
  try {
    const { success } = createJobSchema.safeParse(postdata);
    if (!success) throw new Error("Error valiating data");

    const response = await CheckUser();

    if (response.status !== 200) throw new Error("User is not logged In");

    const newJob = await prisma.post.create({
      data: {
        apply_link: postdata.apply_link,
        company: postdata.company,
        experience_level: postdata.experience_level,
        job_type: postdata.job_type,
        location: postdata.location,
        position: postdata.position,
        role_description: postdata.role_description,
        role_name: postdata.role_name,
        salary_max: postdata.salary_max,
        salary_min: postdata.salary_min,
        author: {
          connect: {
            id: response.userId,
          },
        },
      },

      select: {
        id: true,
        authorId: true,
      },
    });

    if (!newJob) throw new Error("Error while creating new Job Listing");

    return {
      status: 200,
      message: "Successfully Created !",
      data: newJob,
    };
  } catch (error) {
    return {
      status: 404,
      message: (error as Error).message,
      data: [],
    };
  }
}

export async function GetAllPost() {
  try {
    const allPosts = await prisma.post.findMany({
      select: {
        id: true,
        apply_link: true,
        company: true,
        experience_level: true,
        job_type: true,
        location: true,
        position: true,
        role_description: true,
        role_name: true,
        salary_max: true,
        salary_min: true,
        author: {
          select: {
            id: true,
            avatar: true,
            username: true,
          },
        },
      },
    });

    if (!allPosts) throw new Error("No Posts Found");

    return {
      status: 200,
      message: "Succesfylly Fetched all Posts",
      data: allPosts,
    };
  } catch (error) {
    return {
      status: 404,
      message: (error as Error).message,
      data: [],
    };
  }
}
