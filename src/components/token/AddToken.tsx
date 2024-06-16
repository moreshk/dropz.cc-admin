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
import { tokenSchema, TokenSchema } from "./tokenSchema";
import { mutate } from "swr";
import { axios } from "@/lib/axios";

export const AddToken = ({ onClose }: { onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const form = useForm<TokenSchema>({
    resolver: zodResolver(tokenSchema),
    defaultValues: {
      name: "",
      symbol: "",
      imageUrl: "",
      chainId: 101,
      decimals: 0,
      address: "",
    },
  });
  const handleSubmit = async (token: TokenSchema) => {
    try {
      setIsCreating(true);
      await axios.post("/token/create", {
        ...token,
        coingeckoId: "",
      });
      onClose();
      mutate("/token");
    } catch (e) {
      console.log(e);
    } finally {
      setIsCreating(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <TokenContractAddress
          disable={isLoading || isCreating}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <TokenName isLoading={isLoading || isCreating} />
        <TokenSymbol isLoading={isLoading || isCreating} />
        <TokenImageUrl isLoading={isLoading || isCreating} />
        <TokenDecimals isLoading={isLoading || isCreating} />
        <TokenChainId isLoading={isLoading || isCreating} />
        <Button
          type="submit"
          className="w-full"
          disabled={isCreating || isLoading}
        >
          Creat{isCreating ? "ing..." : "e"}
        </Button>
      </form>
    </Form>
  );
};
