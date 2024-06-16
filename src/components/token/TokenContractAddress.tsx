import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axios } from "@/lib/axios";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export const TokenContractAddress = ({
  setIsLoading,
  isLoading,
  disable,
  editing,
}: {
  editing?: boolean;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
  disable: boolean;
}) => {
  const { control, watch, setValue } = useFormContext();
  const address = watch("address") as string;

  const fetchTokenMetadata = async () => {
    if (address.length >= 40) {
      try {
        setIsLoading(true);
        const { data } = await axios.post<{
          metadata: {
            name: string;
            symbol: string;
            image: string;
            decimals: string;
          };
        }>(`/token/metadata`, {
          id: address,
        });
        setValue("name", data.metadata.name);
        setValue("symbol", data.metadata.symbol);
        setValue("imageUrl", data.metadata.image);
        setValue("decimals", data.metadata.decimals);
        setIsLoading(false);
      } catch (error) {
        setValue("name", "");
        setValue("symbol", "");
        setValue("imageUrl", "");
        setValue("decimals", 1);
        setIsLoading(false);
        console.error("Error fetching token metadata:", error);
      }
    } else {
      setValue("name", "");
      setValue("symbol", "");
      setValue("imageUrl", "");
      setValue("decimals", 1);
    }
  };

  useEffect(() => {
    if (!editing) fetchTokenMetadata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <FormField
      control={control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Token Contract Address</FormLabel>
          <FormControl>
            <div className="flex items-center relative">
              <Input
                {...field}
                disabled={disable || field.disabled || isLoading}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  fetchTokenMetadata();
                }}
              />
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin absolute right-0" />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
