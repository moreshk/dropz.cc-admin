import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { axios } from "@/lib/axios";
import { mutate } from "swr";
import { Button } from "../ui/button";
import { WidgetToken } from "../widget/WidgetInput";
import { Exhausted, MaxDuration, StartTime, Tokens } from "./dropsInput";
import { tokenSchema, TokenSchema } from "./dropSchema";

export const AddDrop = ({
  onClose,
  tokens,
}: {
  onClose: () => void;
  tokens: TokenDetails[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TokenSchema>({
    resolver: zodResolver(tokenSchema),
    defaultValues: {
      tokenId: "",
      tokens: "",
      exhausted: false,
      maxDuration: `86400`,
      startTime: new Date(),
    },
  });

  const handleSubmit = async (drop: TokenSchema) => {
    try {
      setIsLoading(true);
      await axios.post("/drop/add", {
        id: drop.tokenId,
        tokens: +drop.tokens,
        exhausted: drop.exhausted,
        maxDuration: +drop.maxDuration,
        startTime: drop.startTime,
      });
      onClose();
      mutate("/drop/all");
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
        <StartTime />
        <Exhausted isLoading={isLoading} />
        <Button type="submit" className="w-full" disabled={isLoading}>
          Creat{isLoading ? "ing..." : "e"}
        </Button>
      </form>
    </Form>
  );
};
