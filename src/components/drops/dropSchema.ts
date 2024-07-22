import { z } from "zod";

export const tokenSchema = z.object({
  tokenId: z.string(),
  tokens: z.string(),
  exhausted: z.boolean(),
  maxDuration: z.string(),
});

export type TokenSchema = z.infer<typeof tokenSchema>;
