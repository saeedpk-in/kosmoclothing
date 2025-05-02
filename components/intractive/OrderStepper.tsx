"use client"
import {
    Stepper,
    StepperDescription,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger,
  } from "@/components/ui/stepper"
import { formatDate } from "@/lib/utils";
  
  const steps = [
    {
      step: 1,
      title: "Order confirmed",
      description: "We've received your order.",
    },
    {
      step: 2,
      title: "Dispatched",
      description: "Your order has left our warehouse.",
    },
    {
      step: 3,
      title: "Shipped",
      description: "Your order is on its way.",
    },
    {
      step: 4,
      title: "Out of delivery",
      description: "Your order is almost there.",
    },
    {
      step: 5,
      title: "Delivered",
      description: "Expected by ",
    },
  ]
  
  export default function OrderStepper({ currentStatusIndex , deliveryDate }: { currentStatusIndex: number; deliveryDate?: Date  }) {
    return (
      <div className="space-y-8 text-center">
        <Stepper defaultValue={currentStatusIndex + 1 } orientation="vertical">
          {steps.map(({ step, title, description }) => (
            <StepperItem
              key={step}
              step={step}
              className="relative items-start not-last:flex-1"
            >
              <StepperTrigger className="items-start rounded pb-12 last:pb-0" onClick={(e)=>e.preventDefault()}>
                <StepperIndicator />
                <div className="mt-0.5 space-y-0.5 px-2 text-left">
                  <StepperTitle>{title}</StepperTitle>
                  <StepperDescription>{step === 5 ? description + formatDate(deliveryDate) : description}</StepperDescription>
                </div>
              </StepperTrigger>
              {step < steps.length && (
                <StepperSeparator className="absolute inset-y-0 top-[calc(1.5rem+0.125rem)] left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)]" />
              )}
            </StepperItem>
          ))}
        </Stepper>
      </div>
    )
  }
  