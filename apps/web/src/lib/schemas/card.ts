import * as z from 'zod';

export const cardSchema = z.object({
  id: z.string(),
  cc_number: z.string(),
  brand: z.string(),
  type: z.string(),
  exp_month: z.number(),
  exp_year: z.number(),
  cvv: z.string(),
  currency: z.string(),
  status: z.string(),
  balance: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type CardSchemaType = z.infer<typeof cardSchema>;
