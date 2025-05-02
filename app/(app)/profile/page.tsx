"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import { uploadImage } from "@/actions/upoladImg";
import { toast } from "sonner";
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
interface UserInfo {
  name: string;
  email: string;
  password?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
  };
  phoneNumber?: string;
}
const page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    password: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
    },
    phoneNumber: "",
  });
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const sessionId = session?.user?.id; // Replace with actual session ID retrieval logic
        if (sessionId) {
          const response = await getUserById(sessionId?.toString());
          if (response.success && response.user) setUserInfo(response.user);
          else console.log(response.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (session?.user?.id) {
      // Only fetch if sessionId is available
      fetchUserData();
    }
  }, [session]);

  async function onSubmit() {
    // values: z.infer<typeof formSchema>
    console.log(userInfo);
    const parsed = formSchema.safeParse(userInfo);
    if (!parsed.success) {
      console.error(parsed.error.errors);
      return;
    }
    try {
      let updatedUserInfo;
      if (file) {
        const image = await uploadImage(file);
        updatedUserInfo = {
          ...userInfo,
          address: JSON.stringify(userInfo.address),
          password: userInfo.password || "",
          phoneNumber: userInfo.phoneNumber || "",
          image,
        };
      } else {
        updatedUserInfo = {
          ...userInfo,
          address: JSON.stringify(userInfo.address),
          password: userInfo.password || "",
          phoneNumber: userInfo.phoneNumber || "",
        };
      }
      const response = await updateUserById(session?.user?.id as string, updatedUserInfo);
      if(response.success)
        toast(response.message, {
          description: `Updated on ${new Date().toLocaleString()}`,
        });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  }

  if (!userInfo) {
    return <div>Loading...</div>; // Or a more elegant loading state
  }

  return (
    <div className="flex  h-full min-h-screen items-center justify-center">
      <div className=" gap-10 flex ">
        <div className="">
          <input
            type="file"
            hidden
            id="file-inp"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            accept="image/*"
          />
          <div
            className="rounded-full bg-gray-800 w-40 h-40 flex items-center justify-center my-5"
            onClick={(e) => {
              document.getElementById("file-inp")?.click();
            }}
          >
            <Image
              src={
                file
                  ? URL.createObjectURL(file)
                  : session?.user?.image || "/"
              }
              alt="Profile Picture"
              className="rounded-full object-cover h-full w-full"
              width={80}
              height={80}
            />
          </div>
          <h1 className="text-2xl font-semibold">
            {userInfo.name || session?.user?.name}
          </h1>
          <p className="text-primary/70 text-sm max-w-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptates, quidem, doloremque, quod
          </p>
        </div>
        <div className="flex ">
          <Tabs defaultValue="account" className="w-[600px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're
                    done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={userInfo.name}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={userInfo.email}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, email: e.target.value })
                      }
                    />
                  </div>
                  {/* <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Address Details</AccordionTrigger>
                      <AccordionContent className="space-y-5">
                        
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion> */}
                </CardContent>
                <CardFooter>
                  <Button onClick={onSubmit}>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>Address</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you'll be logged
                    out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={userInfo.phoneNumber}
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="street">Street</Label>
                    <Input
                      id="street"
                      value={userInfo.address?.street}
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          address: {
                            ...userInfo.address,
                            street: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={userInfo.address?.city}
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          address: {
                            ...userInfo.address,
                            city: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={userInfo.address?.postalCode}
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          address: {
                            ...userInfo.address,
                            postalCode: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you'll be logged
                    out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          {/* <Form {...form}>
            <form
              className="space-y-3  mx-auto"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex justify-between gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="name" {...field} type="text" />
                      </FormControl>
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                    <FormDescription className="text-xs text-start ">
                      This is your password given from super admin.
                    </FormDescription>
                    <FormMessage />
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
                          <FormMessage />
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
                          <FormMessage />
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
                              placeholder="postalCode"
                              {...field}
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
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
                    <FormDescription className="text-xs text-start ">
                      This is your password given from super admin.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full rounded-xl">
                Submit
              </Button>
            </form>
          </Form> */}
        </div>
      </div>
    </div>
  );
};

export default page;
