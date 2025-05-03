"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useTransition } from "react";
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

import axios from "axios";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getUserById, updateUserById } from "@/actions/user";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
const formSchema1 = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "email must be in the form of email",
  }),
  phoneNumber: z
    .string()
    .refine((val) => val === "" || val.length === 10, {
      message: "Phone number must be exactly 10 characters or empty.",
    })
    .optional(),
});
const formSchema2 = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
});
const formSchema3 = z.object({
  current_password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  new_password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  re_password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
const page = () => {
  const { data: session } = useSession();
  const [pending, startTransition] = useTransition();
  const [password, setPassword] = useState("");
  const form1 = useForm<z.infer<typeof formSchema1>>({
    resolver: zodResolver(formSchema1),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      phoneNumber: "",
    },
  });
  const form2 = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      city: "",
      postalCode: "",
      street: "",
    },
  });
  const form3 = useForm<z.infer<typeof formSchema3>>({
    resolver: zodResolver(formSchema3),
    defaultValues: {
      current_password: "",
      new_password: "",
      re_password: "",
    },
  });
  useEffect(() => {
    const fetchUserData = async () => {
      startTransition(async () => {
        try {
          const sessionId = session?.user?.id; // Replace with actual session ID retrieval logic
          if (sessionId) {
            const response = await getUserById(sessionId?.toString());
            if (response.success && response.user) {
              form1.setValue("name", response.user.name);
              form1.setValue("email", response.user.email);
              form1.setValue("phoneNumber", response.user.phoneNumber);
              form2.setValue("city", response.user.address.city);
              form2.setValue(
                "postalCode",
                response.user.address.postalCode
              );
              form2.setValue("street", response.user.address.street);
              console.log(response.user.password);
              setPassword(response.user.password);
            } else console.log(response.error);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      });
    };

    if (session?.user?.id) {
      // Only fetch if sessionId is available
      fetchUserData();
    }
  }, [session]);

  if (!session?.user) {
    return redirect("/signin");
  }
  function onSubmit1(values: z.infer<typeof formSchema1>) {
    startTransition(async () => {
      try {
        if (session?.user?.id) {
          const res = await updateUserById(session.user.id, values);
          if (res.success) {
            toast.success(res.message);
          }
        } else {
          console.error("User ID is undefined");
        }
      } catch (error) {
        toast.error("An error occurred while updating the user.");
        console.error("Error updating user:", error);
      }
    });
  }

  function onSubmit2(values: z.infer<typeof formSchema2>) {
    startTransition(async () => {
      try {
        if (session?.user?.id) {
          const res = await updateUserById(session.user.id, {
            address: values,
          });
          if (res.success) {
            toast.success(res.message);
          }
        } else {
          console.error("User ID is undefined");
        }
      } catch (error) {
        toast.error("An error occurred while updating the user.");
        console.error("Error updating user:", error);
      }
    });
  }

  async function onSubmit3(values: z.infer<typeof formSchema3>) {
    if(values.new_password !== values.re_password){
      toast.error("new password and renetered password not match");
        return;
    }
    let isMatch;
    if (password) {
      isMatch = await bcrypt.compare(values.current_password, password);
      if (!isMatch) {
        toast.error("Current password is incorrect.");
        return;
      }
    } else {
      toast.error("Password is not loaded yet.");
      return;
    }
    if (isMatch) {
      startTransition(async () => {
        try {
          if (session?.user?.id) {
            const res = await updateUserById(session.user.id, { password: values.new_password, });
            if (res.success) {
              toast.success(res.message);
            }
          } else {
            console.error("User ID is undefined");
          }
        } catch (error) {
          toast.error("An error occurred while updating the user.");
          console.error("Error updating user:", error);
        }
      });
    }
  }

  return (
    <div className="flex  h-full min-h-screen items-center justify-center">
      <div className=" gap-10 flex ">
        <div className="flex ">
          <Tabs defaultValue="account" className="w-[400px] md:w-[600px] ">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Form {...form1}>
                <form
                  className="space-y-3  mx-auto"
                  onSubmit={form1.handleSubmit(onSubmit1)}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Account</CardTitle>
                      <CardDescription>
                        Make changes to your account here. Click save when
                        you're done.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <FormField
                          control={form1.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="space-y-1">
                        <FormField
                          control={form1.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="space-y-1">
                        <FormField
                          control={form1.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Phone Number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Save changes</Button>
                    </CardFooter>
                  </Card>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="address">
              <Form {...form2}>
                <form
                  className="space-y-3  mx-auto"
                  onSubmit={form2.handleSubmit(onSubmit2)}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Address</CardTitle>
                      <CardDescription>
                        Change your password here. After saving, you'll be
                        logged out.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <FormField
                          control={form2.control}
                          name="street"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street</FormLabel>
                              <FormControl>
                                <Input placeholder="Street" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="space-y-1">
                        <FormField
                          control={form2.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="City" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="space-y-1">
                        <FormField
                          control={form2.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input placeholder="Postal Code" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Save Address</Button>
                    </CardFooter>
                  </Card>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="password">
              <Form {...form3}>
                <form
                  className="space-y-3  mx-auto"
                  onSubmit={form3.handleSubmit(onSubmit3)}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>
                        Change your password here. After saving, you'll be
                        logged out.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <FormField
                          control={form3.control}
                          name="current_password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Currrent Password</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Currrent Password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="space-y-1">
                        <FormField
                          control={form3.control}
                          name="new_password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input placeholder="New Password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="space-y-1">
                        <FormField
                          control={form3.control}
                          name="re_password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Re Enter New Password</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Re Enter New Password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Save password</Button>
                    </CardFooter>
                  </Card>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default page;
