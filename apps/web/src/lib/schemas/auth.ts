import * as z from 'zod';

export const userEmailSchema = z.object({
  email: z.string().email(),
});

export const userCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = userCredentialsSchema.extend({
  username: z.string().min(3),
});

export const errorSchema = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number(),
});

export const successAuthSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string(),
    role: z.string(),
    username: z.string(),
  }),
});

export type ErrorSchemaType = z.infer<typeof errorSchema>;
export type SuccessAuthSchemaType = z.infer<typeof successAuthSchema>;
