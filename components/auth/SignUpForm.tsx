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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import axios from "axios";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
import { User } from "lucide-react";
import Image from "next/image";
import { createUser, verifyEmailToken } from "@/actions/user";
import { authenticate } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import Spinner from "../intractive/Spinner";
// import { uploadImage } from "@/actions/upoladImg";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "email must be in the form of email",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  address: z.object({
    street: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
  }),
  phoneNumber: z
    .string()
    .refine((val) => val === "" || val.length === 10, {
      message: "Phone number must be exactly 10 characters or empty.",
    })
    .optional(),
});

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
      },
      phoneNumber: "",
    },
  });
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState(1);
  const [emailToken, setEmailToken] = useState("");
  const [pending, startTransition] = useTransition()
  const searchParams = useSearchParams();
  // 2. Define a submit handler.

   function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async()=>{
      try {
        const cartId = localStorage.getItem("cartId");
        const orderIds = JSON.parse(localStorage.getItem("orderIds") || "[]");
        let imageUrl;
        // if (file) {
        //       imageUrl = await uploadImage(file);
        //     }
        const payload:{
          name: string;
          email: string;
          password: string;
          address: { street?: string; city?: string; postalCode?: string };
          phoneNumber: string;
          cartId?: string | null;
          orderIds?: string[] | null;
          imageUrl?: string;
        } = {
          ...values,
          phoneNumber: values.phoneNumber || "",
        };
        
        if (cartId) payload.cartId = cartId;
        if (orderIds) payload.orderIds = orderIds;
        if (file) payload.imageUrl = imageUrl;
  
        console.log(payload);
        const response = await createUser(payload);
  
        if (response.success) {
          setError("");
          setStep(2); // Move to the next step on success
        } else {
          setError(response.error || "Failed to sign up.In step 1 Please try again.");
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred. Please try again.");
      }
    })
  }
  const verifyEmail =  () => {
    if (!emailToken || emailToken.length !== 6) {
      setError("Phone token must contain 6 digit.");
      return;
    }
    startTransition(async()=>{
      try {
        const response = await verifyEmailToken({
          emailToken,
          email: form.getValues("email"),
        });
        if (response.success) {
          setError("");
          localStorage.removeItem("cartId");
          localStorage.removeItem("orderIds");
          const callbackUrl = searchParams.get("callbackUrl") || "/shop";
          const formData = new FormData();
          formData.append("email", form.getValues("email"));
          formData.append("password", form.getValues("password"));
          formData.append("redirectTo", callbackUrl);
          const err = await authenticate(formData);
  
          if (err) {
            setError(err);
            console.log(err);
          }
        } else {
          setError("Failed to sign up.In step 2 Please try again.");
        }
      } catch (error) {
        console.error("Email Verification failed :", error);
      }
    })
  };

  return (
    <div className="">
      {step === 1 ? (
        <div className="">
          <Form {...form}>
            <form
              className="space-y-3  mx-auto"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex gap-3">
                <div className="">
                  <input
                    type="file"
                    hidden
                    id="file-inp"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    accept="image/*"
                  />
                  <div
                    className="rounded-full bg-gray-200 w-20 h-20 flex items-center justify-center mx-auto mb-5 cursor-pointer"
                    onClick={(e) => {
                      document.getElementById("file-inp")?.click();
                    }}
                  >
                    {file ? (
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="Profile Picture"
                        className="rounded-full object-cover h-full w-full"
                        width={80}
                        height={80}
                      />
                    ) : (
                      <User className="text-black" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input placeholder="name" {...field} type="text" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input placeholder="email" {...field} type="email" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        type="password"
                      />
                    </FormControl>

                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Address Details</AccordionTrigger>
                  <AccordionContent className="space-y-5">
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="city" {...field} type="text" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="street"
                              {...field}
                              type="text"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Postal Code"
                              {...field}
                              type="text"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Postal Code"
                              {...field}
                              type="text"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="+91 9080706050"
                        {...field}
                        type="number"
                      />
                    </FormControl>

                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormMessage className="text-xs">{error}</FormMessage>
              <Button type="submit" className="w-full rounded-xl" disabled={pending}>
                {pending ? <Spinner size="sm" color="white" /> : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      ) : step === 2 ? (
        <div className="flex flex-col justify-center gap-2 items-center ">
          <InputOTP
            maxLength={6}
            value={emailToken}
            onChange={(value) => setEmailToken(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button onClick={verifyEmail} className="w-max" disabled={pending}>
          {pending ? <Spinner size="sm" color="white" /> : "Verify Email Address"}
          </Button>
        </div>
      ) : (
        <div>Completed your registration</div>
      )}
    </div>
  );
}
