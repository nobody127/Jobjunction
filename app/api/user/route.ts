import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({
    message: "hi",
  });
}
