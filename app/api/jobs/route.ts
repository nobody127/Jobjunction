import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const experience = req.nextUrl.searchParams.getAll("experience");
  const job = req.nextUrl.searchParams.getAll("job");
  const location = req.nextUrl.searchParams.getAll("location");

  console.log(experience, job, location);
  return NextResponse.json({ experience, job, location });
}
