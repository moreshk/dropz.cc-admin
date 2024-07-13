import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export const Tokens = ({ isLoading }: { isLoading: boolean }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="tokens"
      rules={{ required: true }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Number of Tokens</FormLabel>
          <FormControl>
            <Input
              type="number"
              {...field}
              disabled={isLoading || field.disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
