import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    const response = await prisma.post.findMany({
      where: {
        OR: [
          { experience_level: { in: body.experience } },
          { job_type: { in: body.job } },
          { location: { in: body.location } },
        ],
      },
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

    return NextResponse.json({
      status: 200,
      message: "Succesfully fetched Posts",
      data: response,
    });
  } catch (error) {
    return NextResponse.json({
      status: 404,
      message: (error as Error).message,
      data: [],
    });
  }
}
