import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TokenSchema, tokenSchema } from "./dropSchema";
import { axios } from "@/lib/axios";
import { mutate } from "swr";
import { Button } from "../ui/button";
import { WidgetToken } from "../widget/WidgetInput";
import {
  Exhausted,
  MaxDuration,
  StartTime,
  Tokens,
  Winners,
} from "./dropsInput";

export const EditDrop = ({
  onClose,
  tokens,
  drop,
}: {
  onClose: () => void;
  tokens: TokenDetails[];
  drop: Drop;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TokenSchema>({
    resolver: zodResolver(tokenSchema),
    defaultValues: {
      tokenId: drop.tokenId,
      tokens: `${drop.tokens}`,
      exhausted: drop.exhausted,
      maxDuration: `${drop.maxDuration}`,
      startTime: drop.startTime,
      winners: `${drop.winners}`,
    },
  });

  const handleSubmit = async (updatedDrop: TokenSchema) => {
    try {
      setIsLoading(true);
      await axios.post("/drop/edit", {
        ...updatedDrop,
        id: drop.id,
        tokenId: updatedDrop.tokenId,
        tokens: +updatedDrop.tokens,
        exhausted: updatedDrop.exhausted,
        maxDuration: +updatedDrop.maxDuration,
        startTime: updatedDrop.startTime,
        winners: +updatedDrop.winners,
      });
      mutate("/drop/all");
      onClose();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <WidgetToken isLoading={isLoading} tokens={tokens} />
        <Tokens isLoading={isLoading} />
        <MaxDuration isLoading={isLoading} />
        <Winners isLoading={isLoading} />
        <StartTime />
        <Exhausted isLoading={isLoading} />
        <Button type="submit" className="w-full" disabled={isLoading}>
          Updat{isLoading ? "ing..." : "e"}
        </Button>
      </form>
    </Form>
  );
};
