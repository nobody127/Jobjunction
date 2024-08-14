import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import { signinSchema } from "./schema/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials: any) => {
        const data = {
          username: credentials.username as string,
          password: credentials.password as string,
        };
        try {
          const { success } = signinSchema.safeParse(data);

          if (!success) throw new Error("Schema validation failed");

          const isUserExist = await prisma.user.findFirst({
            where: {
              username: data.username,
              password: data.password,
            },
          });

          if (!isUserExist) {
            throw new Error("Please Give Correct username & password");
          }

          return {
            id: isUserExist?.id,
            username: isUserExist?.username,
          };
        } catch (error) {
          return null;
        }
      },
    }),
    Google,
  ],
  callbacks: {
    async signIn({ user, account }) {
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

      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
