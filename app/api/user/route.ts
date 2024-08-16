import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, res: NextResponse) {
  return NextResponse.json({
    message: "hi",
  });
}
