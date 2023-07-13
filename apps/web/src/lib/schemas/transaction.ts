import * as z from 'zod';

export const transactionSchema = z.object({
  id: z.string(),
  amount: z.number(),
  status: z.string(),
  type: z.string(),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type TransactionSchemaType = z.infer<typeof transactionSchema>;
