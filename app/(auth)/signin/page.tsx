import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import SignUpForm from "@/components/auth/SignUpForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
function page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-zinc-300 to-white p-4">
      <Tabs defaultValue="login" className="w-[400px] min-w-fit">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <Card className="w-full max-w-md border-zinc-200 bg-zinc-50 rounded-3xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">kosmo</CardTitle>
            <CardDescription>
              Welcome back! Please sign in to your account or create a new one
              to continue shopping.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="signup">
                <SignUpForm />
              </TabsContent>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-xs text-zinc-500">
              By continuing, you agree to our
              <Link href="/terms" className="hover:underline">Terms of Service and Privacy Policy.</Link>
            </p>
          </CardFooter>
        </Card>
      </Tabs>
    </div>
  );
}

export default page;
