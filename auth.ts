import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { signinSchema } from "./schema/signin";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      authorize: async (credentials, req: Request) => {
        let body = await req.json();
        body.skills = body.skills.split(",");
        const { success } = signinSchema.safeParse(body);
        if (!success)
          return {
            status: 400,
            message: "Schema validation failed",
          };

        const user = await prisma.user.findFirst({
          where: {
            username: body.username,
          },
          select: {
            id: true,
          },
        });
        if (!user) {
          const response = await prisma.user.create({
            data: {
              username: body.username,
              email: body.email,
              password: body.password,
              avatar: body.avatar,
              bio: body.bio,
              instagram_url: body.instagram_url,
              linkedin_url: body.linkedin_url,
              twitter_url: body.twitter_url,
              skills: body.skills,
            },
          });

          console.log("user created", response);
          return {
            id: response.id,
            username: response.username,
          };
        }

        return credentials;
      },
    }),
    Google,
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return "/";
    },
  },
  pages: {
    signIn: "/signin",
  },
});
