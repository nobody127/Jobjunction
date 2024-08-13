import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        username: {},
        password: {},
      },

      authorize: async (credentials) => {
        let users = {};
        users = credentials;
        return users;
      },
    }),
    Google,
  ],
  pages: {
    signIn: "/signin",
  },
});
