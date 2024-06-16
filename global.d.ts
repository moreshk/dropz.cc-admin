declare global {
  interface Session {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    isVerified: boolean;
    createdAt: Date;
  }
  type TokenDetails = {
    symbol: string;
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    address: string;
    decimals: number;
    imageUrl: string;
    coingeckoId: string | null;
    chainId: number;
  };
  type WidgetDetails = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    feeWalletAddress: string;
    feePercentage: number;
    website: string | null;
    tokenId: string;
    token: CompleteToken;
  };
}
export {};
