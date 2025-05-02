"use client";
import { getOrders } from "@/actions/orders";
import { IOrder } from "@/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Spinner from "@/components/intractive/Spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { deleteReplacementById, getReplacements } from "@/actions/replacement";
import { toast } from "sonner";

interface IReplacement {
  _id: string;
  productId: string;
  userId: string;
  orderId: string;
  status: string;
  reason: string;
  quantity: number;
  requestedAt: string;
  resolvedAt: string;
  product: {
    size: string;
    name: string;
    price: number;
    image: string;
  };
}
const ReplacementsPage = () => {
  const { data: session } = useSession();
  const [replacements, setReplacements] = useState<IReplacement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReplacements = async () => {
      try {
        if (session?.user?.id) {
          const res = await getReplacements(session.user.id);

          if (res?.replacements) {
            setReplacements(res.replacements);
          }
        }
      } catch (err) {
        setError("Failed to fetch replacements. Please try again later.");
        console.error("Error fetching replacements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReplacements();
  }, [session]);

  if (!session?.user) {
    return (
      <div className="container mx-auto py-8 min-h-screen">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Your Replacements</h1>
          <p className="text-gray-600 mb-6">
            You haven't loggedIn so first login.
          </p>
          <Button asChild>
            <Link
              href="/signin"
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              Login Now
            </Link>
          </Button>
          <Button asChild>
            <Link
              href="/"
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  if (replacements.length === 0) {
    return (
      <div className="container mx-auto py-8 min-h-screen">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Your Orders</h1>
          <p className="text-gray-600 mb-6">
            You haven't placed any replacements yet.
          </p>
          <Link
            href="/"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm items-center py-8">
      <h1 className="text-5xl font-extrabold  mb-8">Your Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 px-10">
        {replacements.map((replacement) => (
          <Card className="pb-0" key={replacement._id}>
            <CardHeader>
              <div className="flex justify-between">
                <div className=" flex flex-col gap-2">
                  <CardTitle className="text-gray-400/70">Order ID</CardTitle>
                  <CardTitle>#{replacement._id}</CardTitle>
                </div>
                <div className="flex gap-2">
                  <Badge className="rounded-full" variant={"outline"}>
                    Estimated Delivery {formatDate(replacement.resolvedAt)}
                  </Badge>
                  <Badge className="bg-green-200/30 border-none text-green-600 uppercase rounded-full text-sm px-4 py-2">
                    {replacement.status}
                  </Badge>
                </div>
              </div>
              {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="">
                <h2 className="text-lg font-bold">Order Summary</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2  mt-4">
                  <div className="flex items-center gap-4 shadow p-2 rounded-lg">
                    <Image
                      src={replacement.product.image || "/payment.png"}
                      alt={replacement.product.name || ""}
                      className="w-16 h-16 rounded-lg object-cover"
                      width={64}
                      height={64}
                    />
                    <div className="flex flex-col">
                      <p>{replacement.product.name}</p>
                      <p className="text-sm text-gray-500">
                        Size: {replacement.product.size}
                      </p>
                      <p className="text-sm font-medium">
                        {formatCurrency(replacement.product.price || 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-300/30 rounded-b-xl ">
              <div className="p-5 flex justify-between items-center w-full">
                <div className="flex">
                  <p>{replacement.quantity} item</p>
                </div>
                <div className="flex gap-2">
                  {replacement.status === "requested" && (
                    <Button
                      className="rounded-full"
                      variant={"destructive"}
                      onClick={async () => {
                        const res = await deleteReplacementById(
                          replacement._id
                        );
                        if (res.success) {
                          toast.success(res.message);
                        }
                      }}
                    >
                      Cancel Replacement
                    </Button>
                  )}
                  <Button asChild className="rounded-full">
                    <Link href={`/orders/${replacement.orderId}`}>
                      {" "}
                      View Order
                    </Link>
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReplacementsPage;
