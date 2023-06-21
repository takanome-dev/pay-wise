/* eslint-disable no-param-reassign */
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
// import EmailProvider from 'next-auth/providers/email';
import GitHubProvider from 'next-auth/providers/github';

import {
  type ErrorSchemaType,
  type SuccessAuthSchemaType,
  errorSchema,
  successAuthSchema,
} from './schemas/auth';

import type { NextAuthOptions } from 'next-auth';

// import { siteConfig } from '~/config/site';
import { env } from '~/env';
// import { db } from '~/lib/db';

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(db),
  secret: env.JWT_SECRET_KEY,
  debug: env.NODE_ENV !== 'production',
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    // EmailProvider({
    //   server: {
    //     host: env.EMAIL_SERVER_HOST,
    //     port: env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: env.EMAIL_SERVER_USER,
    //       pass: env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: env.EMAIL_FROM,
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const resp = await fetch('http://localhost:3000/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = (await resp.json()) as
          | ErrorSchemaType
          | SuccessAuthSchemaType;

        // console.log({ data });
        const parsedError = errorSchema.safeParse(data);

        if (parsedError.success) {
          throw new Error(parsedError.data.message);
        }

        const parsedData = successAuthSchema.safeParse(data);

        if (!parsedData.success) {
          throw new Error(parsedData.error.message);
        }

        return parsedData.data.user;

        // if (user) {
        //   // Any object returned will be saved in `user` property of the JWT
        //   return user;
        // }
        // If you return null then an error will be displayed advising the user to check their details.
        // return null;

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
  ],
  callbacks: {
    session({ token, session }) {
      // TODO: test this
      console.log('------------------- IN SESSION ---------------------------');
      console.log({ token, session });
      console.log('------------------- IN SESSION ---------------------------');
      if (token) {
        session.user.id = token.sub!;
        session.user.email = token.email;
        session.user.role = token.role;
        // session.user.name = token.name;
        // session.user.image = token.picture;
      }

      return session;
    },
    jwt({ token, user }) {
      console.log('------------------- IN JWT ---------------------------');
      console.log({ token, user });
      console.log('------------------- IN JWT ---------------------------');
      return {
        id: token.sub!,
        email: token.email,
        role: token.role,
        name: token.username as string,
      };
      // return token;
    },
    // async jwt({ token, user }) {
    //   console.log({ token, user });
    //   const dbUser = await db.user.findFirst({
    //     where: {
    //       email: token.email,
    //     },
    //   });

    //   if (!dbUser) {
    //     if (user) {
    //       token.id = user?.id;
    //     }
    //     return token;
    //   }

    //   return {
    //     id: dbUser.id,
    //     name: dbUser.name,
    //     email: dbUser.email,
    //     picture: dbUser.image,
    //   };
    // },
  },
};
