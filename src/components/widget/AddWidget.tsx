import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { WidgetSchema, widgetSchema } from "./widgetSchema";
import { WidgetFeeWallet, WidgetToken, WidgetWebsiteURL } from "./WidgetInput";
import { axios } from "@/lib/axios";
import { mutate } from "swr";
import { Button } from "../ui/button";

export const AddWidget = ({
  onClose,
  tokens,
}: {
  onClose: () => void;
  tokens: TokenDetails[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<WidgetSchema>({
    resolver: zodResolver(widgetSchema),
    defaultValues: {
      feeWalletAddress: "",
      tokenId: "",
      website: "",
    },
  });

  const handleSubmit = async (widget: WidgetSchema) => {
    try {
      setIsLoading(true);
      await axios.post("/widget/create", {
        ...widget,
      });
      onClose();
      mutate("/widget");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <WidgetFeeWallet isLoading={isLoading} />
        <WidgetWebsiteURL isLoading={isLoading} />
        <WidgetToken isLoading={isLoading} tokens={tokens} />
        <Button type="submit" className="w-full" disabled={isLoading}>
          Creat{isLoading ? "ing..." : "e"}
        </Button>
      </form>
    </Form>
  );
};
