import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { axios } from "@/lib/axios";
import { mutate } from "swr";
import { Button } from "../ui/button";
import { WidgetToken } from "../widget/WidgetInput";
import { Tokens } from "./dropsInput";
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
    },
  });

  const handleSubmit = async (drop: TokenSchema) => {
    try {
      setIsLoading(true);
      await axios.post("/drop/add", {
        id: drop.tokenId,
        tokens: +drop.tokens,
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          Creat{isLoading ? "ing..." : "e"}
        </Button>
      </form>
    </Form>
  );
};
