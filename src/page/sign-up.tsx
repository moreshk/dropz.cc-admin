import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Link, useNavigate } from "react-router-dom";

const signUpSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  name: z.string().min(3, "Minimum 3 character"),
});

export function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSubmit = async (value: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);
    try {
      await axios.post<{ token: string }>("/auth/sign-up", {
        email: value.email,
        password: value.password,
        name: value.name,
      });
      navigate("/");
      setIsLoading(false);
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="flex justify-center items-center">
          <Card className="mx-auto max-w-sm text-left w-full">
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="tim"
                          {...field}
                          disabled={isLoading || field.disabled}
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <Button type="submit" className="w-full">
                  {isLoading ? "Creating Account..." : "Create an account"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/sign-in" className="underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}
