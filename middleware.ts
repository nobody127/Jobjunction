import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((req) => {
  if (
    (req.auth && req.nextUrl.pathname === "/signin") ||
    req.nextUrl.pathname === "/signup"
  ) {
    const newUrl = new URL("/jobs", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/signin/:path*", "/signup/:path*"],
};
