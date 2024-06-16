import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { WidgetSchema, widgetSchema } from "./widgetSchema";
import { WidgetFeeWallet, WidgetToken, WidgetWebsiteURL } from "./WidgetInput";
import { axios } from "@/lib/axios";
import { mutate } from "swr";
import { Button } from "../ui/button";

export const EditWidget = ({
  onClose,
  tokens,
  widget,
}: {
  onClose: () => void;
  tokens: TokenDetails[];
  widget: WidgetDetails;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<WidgetSchema>({
    resolver: zodResolver(widgetSchema),
    defaultValues: {
      feeWalletAddress: widget.feeWalletAddress,
      tokenId: widget.tokenId,
      website: widget.website || "",
    },
  });

  const handleSubmit = async (updatedWidget: WidgetSchema) => {
    try {
      setIsLoading(true);
      await axios.post("/widget/update", {
        ...updatedWidget,
        id: widget.id,
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
          Updat{isLoading ? "ing..." : "e"}
        </Button>
      </form>
    </Form>
  );
};
