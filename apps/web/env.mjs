import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    // This is optional because it's only used in development.
    // See https://next-auth.js.org/deployment.
    NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
    JWT_SECRET_KEY: z.string().min(1),
    NODE_ENV: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    // GITHUB_ACCESS_TOKEN: z.string().min(1),
    // DATABASE_URL: z.string().min(1),
    // EMAIL_SERVER_USER: z.string().min(1),
    // EMAIL_SERVER_PASSWORD: z.string().min(1),
    // EMAIL_SERVER_HOST: z.string().min(1),
    // EMAIL_SERVER_PORT: z.string().min(1),
    // EMAIL_FROM: z.string().email().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().min(1),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  },
  runtimeEnv: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    NODE_ENV: process.env.NODE_ENV,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    // GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
    // DATABASE_URL: process.env.DATABASE_URL,
    // EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    // EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    // EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    // EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    // EMAIL_FROM: process.env.EMAIL_FROM,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
});
