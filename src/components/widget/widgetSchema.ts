import { z } from "zod";

export const widgetSchema = z.object({
  feeWalletAddress: z.string(),
  tokenId: z.string(),
  website: z.string().url(),
});

export type WidgetSchema = z.infer<typeof widgetSchema>;
