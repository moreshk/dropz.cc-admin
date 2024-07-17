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
import { TimePicker12Demo } from "../time-picker/time-picker-12hour-demo";

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

export const Winners = ({ isLoading }: { isLoading: boolean }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="winners"
      rules={{ required: true }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Number of Winners</FormLabel>
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
            <TimePicker12Demo
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
