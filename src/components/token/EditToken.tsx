import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { TokenContractAddress } from "./TokenContractAddress";
import {
  TokenChainId,
  TokenDecimals,
  TokenImageUrl,
  TokenName,
  TokenSymbol,
} from "./TokenInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { TokenSchema, tokenSchema } from "./tokenSchema";
import { mutate } from "swr";
import { axios } from "@/lib/axios";

export const EditToken = ({
  editToken,
  onClose,
}: {
  editToken: TokenDetails;
  onClose: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const form = useForm<TokenSchema>({
    resolver: zodResolver(tokenSchema),
    defaultValues: {
      name: editToken.name,
      symbol: editToken.symbol,
      imageUrl: editToken.imageUrl,
      chainId: editToken.chainId,
      decimals: editToken.decimals,
      address: editToken.address,
    },
  });
  const handleSubmit = async (token: TokenSchema) => {
    try {
      setIsUpdating(true);
      await axios.put("/token/update", {
        ...editToken,
        ...token,
        coingeckoId: "",
        id: editToken.id,
      });
      onClose();
      mutate("/token");
    } catch (e) {
      console.log(e);
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <TokenContractAddress
          disable={isLoading || isUpdating}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          editing
        />
        <TokenName isLoading={isLoading || isUpdating} />
        <TokenSymbol isLoading={isLoading || isUpdating} />
        <TokenImageUrl isLoading={isLoading || isUpdating} />
        <TokenDecimals isLoading={isLoading || isUpdating} />
        <TokenChainId isLoading={isLoading || isUpdating} />
        <Button
          type="submit"
          className="w-full"
          disabled={isUpdating || isLoading}
        >
          Updat{isUpdating ? "ing..." : "e"}
        </Button>
      </form>
    </Form>
  );
};
