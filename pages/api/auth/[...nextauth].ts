import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';
import userService from '../../../lib/user-service';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, options);
}

const options = {
  adapter: PrismaAdapter(prisma),
  secret: 'secret1234', //TODO
  site: process.env.NEXTAUTH_URL,
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",

      session: {
        strategy: "jwt",
      },

      credentials: {
        email: { label: "Email", type: "text", placeholder: "email address" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials, req) {
        //TODO need to cater for the user already being created and reporting that back to the user
        const user = await userService.authorize({ email: credentials?.email, password: credentials?.password });
        console.log(`Authorizing User: ${JSON.stringify(user)}`);
        return user;
        // // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        // return null;
      }
    }),
  ],
};
