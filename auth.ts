import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import { signinSchema } from "./schema/auth";
import { NextConfig } from "next";
import bcrypt from "bcryptjs";

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
            },
          });

          if (!isUserExist) {
            throw new Error("User not found");
          }

          const checkPassword = await bcrypt.compare(
            data.password,
            isUserExist.password as string
          );

          if (!checkPassword) {
            throw new Error("Password is wrong");
          }

          return {
            id: isUserExist?.id,
            username: isUserExist?.username,
            email: isUserExist.email,
          };
        } catch (error: any) {
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

            if (!createdUser) throw new Error("Error while saving the user");
            //pushing the db id here instead of custom google id
            user.id = createdUser.id as string;
            return true;
          }
          //pushing the db id here instead of custom google id
          user.id = userDetials.id as string;
          return true;
        } catch (error) {
          return false;
        }
      }

      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.username = user.username ?? user.email;
      }
      return token;
    },

    async session({ session, token }: any) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.username = token.username as string;

      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/error",
  },

  session: {
    strategy: "jwt",
  },
}) satisfies NextConfig;
