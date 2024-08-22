import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  publicRoutes,
  authRoutes,
  nextApiRoutes,
  REDIRECT_URL,
} from "@/lib/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isNextApiRoute = nextUrl.pathname.startsWith(nextApiRoutes);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (isNextApiRoute) return NextResponse.next();

  if (isAuthRoute) {
    if (isLoggedIn) {
      const url = new URL(REDIRECT_URL, nextUrl.origin);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    const url = new URL("/signin", nextUrl.origin);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
