"use server";

import { createJobSchema, createJobSchemaType } from "@/schema/jobs";
import { CheckUser } from "./checkUser";
import prisma from "@/db";

export async function CreateJob(data: createJobSchemaType) {
  try {
    const { success } = createJobSchema.safeParse(data);
    if (!success) throw new Error("Error valiating data");

    const response = await CheckUser();

    if (response.status !== 200) throw new Error("User is not logged In");

    const newJob = await prisma.post.create({
      data: {
        authorId: response.userId,
        apply_link: data.apply_link,
        company: data.company,
        experience_level: data.experience_level,
        job_type: data.job_type,
        location: data.location,
        position: data.position,
        role_description: data.role_description,
        role_name: data.role_name,
        salary_max: data.salary_max,
        salary_min: data.salary_min,
      } as any,

      select: {
        id: true,
        authorId: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
