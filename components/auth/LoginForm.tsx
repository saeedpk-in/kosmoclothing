"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import axios from "axios";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { authenticate } from "@/actions/login";
import { mergeGuestDataToUserData } from "@/actions/user";
import Spinner from "../intractive/Spinner";

const formSchema = z.object({
  email: z.string().email({
    message: "email must be in the form of email",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition()
  const searchParams = useSearchParams();
  // 2. Define a submit handler.
   function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async()=>{
      try {
        const response = await mergeGuestDataToUserData({
          cartId: localStorage.getItem("cartId"),
          email: values.email,
          orderIds: localStorage.getItem("orderIds") ? JSON.parse(localStorage.getItem("orderIds") || "[]") : null,
        });
  
        if (response.success) {
          localStorage.removeItem("cartId");
          localStorage.removeItem("orderIds");
          const callbackUrl = searchParams.get("callbackUrl") || "/";
          const formData = new FormData();
          formData.append("email", values.email);
          formData.append("password", values.password);
          formData.append("redirectTo", callbackUrl);
          const err = await authenticate(formData);
  
          if (err) {
            setError(err);
            console.log(err);
          }
        } else {
          setError("Failed to sign up.In step 1 Please try again.");
        }
      } catch (error) {
        console.error(error);
      }
    })
  }

  return (
    <>
      <div className="relative mb-10">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-zinc-50 px-2 text-zinc-500">continue with</span>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 w-96 mx-auto"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="email" {...field} type="email" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="password" {...field} type="password" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormMessage className="text-xs">{error}</FormMessage>
          <Button type="submit" className="w-full rounded-xl"disabled={pending}>
          {pending ? <Spinner size="sm" color="white" /> : "Continue to login"}
          </Button>
        </form>
      </Form>
    </>
  );
}
