"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getOrderProductsByIdForReplacement } from "@/actions/orders";
import Spinner from "@/components/intractive/Spinner";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createReplacement } from "@/actions/replacement";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const formSchema = z.object({
  reason: z.string().min(6, {
    message: "Reason must be at least 6 characters.",
  }),
  product: z.string().min(1, {
    message: "Please select a product.",
  }),
  quantity: z
    .number({
      required_error: "Please select a quantity.",
      invalid_type_error: "Quantity must be a number.",
    })
    .min(1, {
      message: "Quantity must be at least 1.",
    }),
});

const ReplacementRequestPage = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<
    { productId: string; name: string; quantity: number }[]
  >([]);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter()

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await getOrderProductsByIdForReplacement(id);
        if (response.success && response.products) {
          setProducts(response.products);
        } else {
          setError(response.message || "Failed to load order details");
        }
      } catch (error) {
        setError("An unexpected error occurred");
        console.error("Error fetching data:", error);
      }
    });
  }, [id]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
      product: "",
    },
  });

  const selectedProductId = form.watch("product");
  const selectedProduct = products.find(
    (item) => item.productId === selectedProductId
  );

   function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async()=>{
      try {
        // Here you would typically call your API endpoint
        console.log("Submitting replacement request:", values);
  
        const res = await createReplacement({
          productId: values.product,
          orderId: id,
          reason: values.reason,
          quantity: values.quantity,
        });
        if (res.success) {
          toast.success(res.message)
          setError("");
          form.reset();
          router.push(`/orders/${id}`)
        } else {
          setError(res.message);
        }
      } catch (err) {
        setError("Failed to submit replacement request");
        console.error("Submission error:", err);
      }
    })
  }

  // if (pending) {
  //   return (
  //     <div className="flex items-center justify-center h-64">
  //       <Spinner />
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Replacement Request
          </h1>
          <p className="text-muted-foreground">
            Request a replacement for items from order #{id}
          </p>
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <Card>
          <CardHeader>
            <CardTitle>Replacement Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {!pending && (
                  <FormField
                    control={form.control}
                    name="product"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product to Replace</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select a product" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {products.map((item) => (
                              <SelectItem
                                key={item.productId}
                                value={item.productId}
                              >
                                {item.name} (Available: {item.quantity})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the product you'd like to replace
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {selectedProduct && (
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => {
                      const quantityOptions = Array.from(
                        { length: selectedProduct.quantity },
                        (_, i) => i + 1
                      ).reverse();

                      return (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <Select
                            onValueChange={(val) => field.onChange(Number(val))}
                            value={field.value?.toString()}
                          >
                            <FormControl className="w-full">
                              <SelectTrigger>
                                <SelectValue placeholder="Select quantity" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {quantityOptions.map((qty) => (
                                <SelectItem key={qty} value={qty.toString()}>
                                  {qty}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Maximum available: {selectedProduct.quantity}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                )}

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Replacement</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe the reason for replacement..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Be specific about any issues with the product
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button variant="outline" type="button" asChild>
                    <Link href={`/orders/${id}`}>Cancel</Link>
                  </Button>
                  <Button type="submit" disabled={pending}>
                    {pending ? <Spinner /> : "Submit Request"}
                    
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReplacementRequestPage;
