import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: NextRequest, res: NextResponse) {
  const user = await prisma.user.findFirst({
    where: {
      username: "Ankit",
    },
    select: {
      username: true,
      profile: true,
    },
  });

  return NextResponse.json({
    user: user,
  });
}
