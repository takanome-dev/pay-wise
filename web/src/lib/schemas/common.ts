import * as z from 'zod';

export const errorSchema = z.object({
  message: z.array(z.string()),
  error: z.string(),
  statusCode: z.number(),
});
