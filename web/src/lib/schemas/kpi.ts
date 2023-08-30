import * as z from 'zod';

export const kpisSchema = z.object({
  cards: z.number(),
  customers: z.number(),
  transactions: z.number(),
  totalAmountReceived: z.number(),
});

export type KpisSchemaType = z.infer<typeof kpisSchema>;
