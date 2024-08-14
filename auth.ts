import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { signinSchema } from "./schema/signin";
import prisma from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, profile, account, email, credentials }) {
      if (account?.provider === "google") {
        try {
          const userDetials = await prisma.user.findFirst({
            where: {
              email: user.email as string,
            },
          });

          if (!userDetials) {
            const createdUser = await prisma.user.create({
              data: {
                username: user.email as string,
                email: user.email as string,
                avatar: user.image,
                provider: account.provider,
                provider_id: account.providerAccountId,
              },
            });

            console.log("user details", createdUser);
            return true;
          }
          console.log("already exits", userDetials);
          return true;
        } catch (error) {
          console.log("error", error);
          return false;
        }
      }
      return false;
    },
  },
});
