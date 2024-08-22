import { CreateUser } from "@/app/actions/signup";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    if (!body) throw new Error("Error while parsing body");
    const response = await CreateUser(body);
    if (response.status !== 200) throw new Error(response.message);

    return NextResponse.json({ response: response.newUser });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
