"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { deleteOrderById } from "@/actions/orders";
import { Checkbox } from "../ui/checkbox";
import { Card } from "../ui/card";
import { toast } from "sonner";
export default function OrderDangerButton({
  orderId,
  orderStatus,
  deliveryDate,
}: {
  orderId: string;
  orderStatus: string;
  deliveryDate?: Date;
}) {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <>
      {(orderStatus === "confirmed" || orderStatus === "dispatched") && (
        <Card className="w-full mt-4 px-10 bg-red-500/10">
          <h2 className="">Danger Zone</h2>
          <p className="text-sm text-muted-foreground px-4 py-2">
            You can cancel your order before it is shipped. Once shipped,
            cancellation is not allowed.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full bg-red-400/40 hover:bg-red-400/60"
              >
                Cancel Order
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you absolutely sure to cancel this order?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will cancel the order And
                  the Cancelled Orders not be appear in the orders page, and you
                  will not be able to recover it. You can cancel this action if
                  you are not sure.
                </AlertDialogDescription>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      setIsChecked(checked === true)
                    }
                    id="terms"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={!isChecked}
                  onClick={async () => {
                    const res = await deleteOrderById(orderId);
                    if(res.success){
                      toast.success(res.message)
                      window.location.href = "/orders"
                    }
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Card>
      )}
      {orderStatus === "delivered" &&
        deliveryDate &&
        new Date(deliveryDate).getTime() + 5 * 24 * 60 * 60 * 1000 >
          Date.now() && (
          <Card className="w-full mt-4 px-10 bg-red-500/10">
            <h2 className="">Danger Zone</h2>
            <p className="text-sm text-muted-foreground px-4 py-2">
              You can replace your order within 5 days after delivery. Once the
              replacement tag will teared , replacement is not allowed. And the
              replacement is only for damages of products or wrong products.
            </p>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Replace Product</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely sure to replace the product?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    The replacement is only for product damages or wrong
                    product.And the replacement tag is mandedatory. You can
                    cancel this action if you are not sure.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      window.location.href = `/replacement/${orderId}/`;
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Card>
        )}
    </>
  );
}
