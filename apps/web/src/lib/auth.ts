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
import { avatarImages } from './utils';

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
      name: 'credentials',
      credentials: {},
      async authorize(credentials, _) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // TODO: do not hard code the url here
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

        const parsedError = errorSchema.safeParse(data);

        if (parsedError.success) {
          throw new Error(parsedError.data.message);
        }

        return successAuthSchema.parse(data);
      },
    }),
  ],
  callbacks: {
    session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.name = token.username;
        session.user.image = token.picture;
        session.user.token = token.access_token;
      }

      return session;
    },
    jwt({ token, user }) {
      return {
        ...token,
        ...user,
        picture: avatarImages[Math.floor(Math.random() * avatarImages.length)],
      };
    },
  },
};
