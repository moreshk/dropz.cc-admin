import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { DateTimePicker } from "../time-picker/date-time-picker";

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

export const MaxDuration = ({ isLoading }: { isLoading: boolean }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="maxDuration"
      rules={{ required: true }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Max Duration</FormLabel>
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

export const StartTime = () => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="startTime"
      rules={{ required: true }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Start Time</FormLabel>
          <FormControl>
            <DateTimePicker
              date={field.value || new Date()}
              setDate={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const Exhausted = ({ isLoading }: { isLoading: boolean }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="exhausted"
      rules={{ required: true }}
      render={({ field: { value, onChange } }) => (
        <FormItem>
          <FormLabel>Is Drop Exhausted?</FormLabel>
          <FormControl>
            <Switch
              aria-disabled={!!isLoading}
              checked={value}
              onCheckedChange={onChange}
              disabled
              aria-readonly
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
