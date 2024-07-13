import { z } from "zod";

export const tokenSchema = z.object({
  tokenId: z.string(),
  tokens: z.string(),
});

export type TokenSchema = z.infer<typeof tokenSchema>;
