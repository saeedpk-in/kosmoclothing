"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

import { Button } from "@/components/ui/button";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTrigger,
} from "@/components/ui/stepper";
import {
  CheckCircle,
  ChevronLeftIcon,
  ChevronRightIcon,
  Clock,
} from "lucide-react";
import { useEffect, useId, useState, useTransition } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createOrder } from "@/actions/orders";
import { Cart, IOrder } from "@/types";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import PaymentButton from "./PaymentButton";
import { useSession } from "next-auth/react";
import { emptyCart } from "@/actions/cart";
import Spinner from "../intractive/Spinner";
import { getUserById } from "@/actions/user";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be in the email format",
  }),
  mobile: z.string().min(10, {
    message: "Mobile number must be minimum 10 numbers",
  }),
  name: z.string().min(2, {
    message: "Mobile number must be minimum 10 characters",
  }),
  address: z.string().min(10, {
    message: "Address must be minimum 10 characters",
  }),
  street: z.string().min(6, {
    message: "Street must be minimum 6 characters",
  }),
  city: z.string().min(3, {
    message: "City must be minimum 3 characters",
  }),
  state: z.string().min(2, {
    message: "Please Select a state",
  }),
  pinCode: z.string().min(6, {
    message: "Pin Code must be minimum 6 numbers",
  }),
  paymentMethod: z.enum(["COD", "online-payment"]),
});
export default function CheckOutForm({ cart }: { cart: Cart | null }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const { data: session } = useSession();
  const [payStep, setPayStep] = useState(false);
  const [donation, setDonation] = useState(0);
  const [pending, startTransition] = useTransition();
  const id = useId();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      mobile: "",
      name: "",
      address: "",
      street: "",
      city: "",
      state: "",
      pinCode: "",
      paymentMethod: undefined,
    },
  });

  useEffect(() => {
    async function setDefaultvalues() {
      const res = await getUserById(session?.user?.id as string);
      if (res.success && res.user) {
        form.setValue("name", res.user.name);
        form.setValue("email", res.user.email);
        form.setValue("mobile", res.user.phoneNumber);
        form.setValue("street", res.user.address?.street);
        form.setValue("city", res.user.address?.city);
        form.setValue("pinCode", res.user.address?.postalCode);
      }
    }
    if (session?.user) {
      setDefaultvalues();
    }
  }, []);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (values.paymentMethod === "COD") {
      handleOrderSuccess();
    }
    if (values.paymentMethod === "online-payment") {
      setPayStep(true);
    }
  }
  function handleOrderSuccess() {
    startTransition(async () => {
      try {
        if (cart) {
          let payload: IOrder = {
            email: form.getValues("email"),
            customerName: form.getValues("name"),
            totalAmount: Number(cart?.cartTotal),
            address: form.getValues("address"),
            city: form.getValues("city"),
            mobile: form.getValues("mobile"),
            paymentMethod: form.getValues("paymentMethod"),
            pinCode: form.getValues("pinCode"),
            state: form.getValues("state"),
            street: form.getValues("street"),
            products: cart.items.map((item) => ({
              productId: item.productId,
              size: item.size,
              quantity: item.quantity,
            })),
            status: "confirmed",
          };
          if (session?.user) {
            payload = {
              ...payload,
              userId: session.user.id as string,
            };
          }
          // Send the product data and uploaded URLs to your backend
          const response = await createOrder(payload);

          if (response.success) {
            if (!session?.user) {
              const existing = JSON.parse(
                localStorage.getItem("orderIds") || "[]"
              );
              existing.push(response.orderId);
              localStorage.setItem("orderIds", JSON.stringify(existing));
            }
            if (mode === "cart") {
              if (session?.user) {
                emptyCart({ userId: session.user.id });
              } else {
                emptyCart({ cartId: localStorage.getItem("cartId") as string });
              }
            }

            router.push(`/order-success/${response.orderId}`); // Navigate to product list page
          } else {
            toast("Failed to create order.");
          }
        }
      } catch (error) {
        console.error("Error during submission:", error);
        toast("An error occurred. Please try again.");
      }
    });
  }

  if (payStep) {
    return (
      <div className="flex flex-col  space-y-4 p-6">
        <h2 className="text-xl font-bold">Secure Online Payment</h2>
        <p className=" text-sm text-gray-600">
          We use Razorpay to process your payment securely. Razorpay ensures
          your payment details are encrypted and processed safely.
        </p>
        <Image
          src="/payment.png"
          alt="payment image"
          width={300}
          height={200}
          className="object-cover rounded-2xl w-full h-64"
        />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Support a Cause</h3>
          <p className="text-sm text-gray-600">
            Would you like to donate to a charity or cause? Select an amount
            below to contribute.
          </p>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => {
                if (donation === 20) {
                  setDonation(0);
                  toast("Oops you are not donating now");
                } else {
                  toast("Thank you for donating ₹20!");
                  setDonation(20);
                }
              }}
              className={donation === 20 ? "bg-zinc-300 hover:bg-zinc-400" : ""}
            >
              ₹20
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                if (donation === 50) {
                  setDonation(0);
                  toast("Oops you are not donating now");
                } else {
                  toast("Thank you for donating ₹50!");
                  setDonation(50);
                }
              }}
              className={donation === 50 ? "bg-zinc-300 hover:bg-zinc-400" : ""}
            >
              ₹50
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                if (donation === 100) {
                  setDonation(0);
                  toast("Oops you are not donating now");
                } else {
                  toast("Thank you for donating ₹100!");
                  setDonation(100);
                }
              }}
              className={
                donation === 100 ? "bg-zinc-300 hover:bg-zinc-400" : ""
              }
            >
              ₹100
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                if (donation === 200) {
                  setDonation(0);
                  toast("Oops you are not donating now");
                } else {
                  toast("Thank you for donating ₹200!");
                  setDonation(200);
                }
              }}
              className={
                donation === 200 ? "bg-zinc-300 hover:bg-zinc-400" : ""
              }
            >
              ₹200
            </Button>
          </div>
        </div>
        <PaymentButton
          pending={pending}
          handleSuccess={handleOrderSuccess}
          amount={(Number(cart?.cartTotal) + donation) * 100}
          customerName={form.getValues("name")}
          customerEmail={form.getValues("email")}
          customerPhone={form.getValues("mobile")}
          className="bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors"
        />
      </div>
    );
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 font-semibold"
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Contact</h1>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} className="h-12" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="mobile number"
                      {...field}
                      className="h-12"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    This mobile number used to contact you when delivery time
                  </FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight ">Shipping</h1>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Road, Apartment, Near by hotel, etc.."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="flex  w-full justify-between">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        {...field}
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {indianStates.map((state) => (
                            <SelectItem
                              key={state}
                              value={state.toLowerCase().replace(/\s+/g, "-")}
                            >
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pinCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Pin Code" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight ">Payment Method</h1>

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="gap-2"
                  >
                    <FormItem>
                      <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                        <FormControl>
                          <RadioGroupItem
                            value="COD"
                            id={`${id}-1`}
                            aria-describedby={`${id}-1-description`}
                            className="order-1 after:absolute after:inset-0"
                          />
                        </FormControl>
                        <div className="grid grow gap-2">
                          <FormLabel htmlFor={`${id}-1`}>
                            Cash On Delivery{" "}
                            <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                              (COD)
                            </span>
                          </FormLabel>
                          <FormDescription
                            id={`${id}-1-description`}
                            className="text-muted-foreground text-xs"
                          >
                            Pay with cash upon delivery. Please ensure you have
                            the exact amount ready as change may not be
                            available.
                          </FormDescription>
                        </div>
                      </div>
                    </FormItem>
                    <FormItem>
                      <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                        <FormControl>
                          <RadioGroupItem
                            value="online-payment"
                            id={`${id}-2`}
                            aria-describedby={`${id}-2-description`}
                            className="order-1 after:absolute after:inset-0"
                          />
                        </FormControl>
                        <div className="grid grow gap-2">
                          <FormLabel htmlFor={`${id}-2`}>
                            Online Payment{" "}
                            <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                              (prepaid)
                            </span>
                          </FormLabel>
                          <FormDescription
                            id={`${id}-2-description`}
                            className="text-muted-foreground text-xs"
                          >
                            Pay securely using your credit card, debit card, or
                            net banking. Your payment details are encrypted and
                            processed securely.
                          </FormDescription>
                        </div>
                      </div>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? (
            <Spinner size="sm" color="white" />
          ) : form.watch("paymentMethod") ? (
            form.watch("paymentMethod") === "COD" ? (
              "Place Order"
            ) : (
              "Continue to Payment"
            )
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
