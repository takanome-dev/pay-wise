import * as z from 'zod';

export const userEmailSchema = z.object({
  email: z.string().email(),
});

export const userCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
