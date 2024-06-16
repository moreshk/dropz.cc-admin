import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axios } from "@/lib/axios";
import ax from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
import { useSessionStore } from "@/stores/auth-store";
import { useNavigate } from "react-router-dom";

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});
export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { updateSession } = useSessionStore();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const handleSubmit = async (value: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    try {
      const {
        data: { token },
      } = await axios.post<{ token: string }>("/auth/sign-in", {
        email: value.email,
        password: value.password,
      });
      localStorage.setItem("x-dropz-token", token);
      const { data } = await axios.get<{ user: Session }>("/user");
      updateSession(data.user);
      setIsLoading(false);
      navigate("/dashboard");
    } catch (err: unknown) {
      if (ax.isAxiosError(err)) {
        toast.error(err?.response?.data.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-4"}>
        <div className="flex justify-center items-center">
          <Card className="w-full max-w-sm text-left">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading || field.disabled}
                        placeholder="tim@apple.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        {...field}
                        disabled={isLoading || field.disabled}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "signing in...." : "Sign In"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  );
}
