import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

export const TokenName = ({ isLoading }: { isLoading: boolean }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input {...field} disabled={isLoading || field.disabled} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const TokenSymbol = ({ isLoading }: { isLoading: boolean }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="symbol"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Symbol</FormLabel>
          <FormControl>
            <Input {...field} disabled={isLoading || field.disabled} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const TokenImageUrl = ({ isLoading }: { isLoading: boolean }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="imageUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Image Url</FormLabel>
          <FormControl>
            <Input {...field} disabled={isLoading || field.disabled} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const TokenDecimals = ({ isLoading }: { isLoading: boolean }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="decimals"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Decimal</FormLabel>
          <FormControl>
            <Input {...field} disabled={isLoading || field.disabled} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const TokenChainId = ({ isLoading }: { isLoading: boolean }) => {
  const form = useFormContext();
  return (
    <div className="hidden">
      <FormField
        control={form.control}
        name="chainId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Chain Id</FormLabel>
            <FormControl>
              <Input {...field} disabled={isLoading || field.disabled} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
