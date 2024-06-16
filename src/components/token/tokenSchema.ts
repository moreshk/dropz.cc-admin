import { z } from "zod";

export const tokenSchema = z.object({
  symbol: z.string(),
  address: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  chainId: z.number(),
  decimals: z.number(),
});

export type TokenSchema = z.infer<typeof tokenSchema>;
