"use server";

import { signIn } from "@/auth";

export async function handleSignin() {
  await signIn();
}
