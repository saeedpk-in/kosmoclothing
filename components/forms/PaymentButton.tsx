'use client';

import { useState } from 'react';
import Script from 'next/script';
import { RazorpayOptions, RazorpayPaymentVerificationResponse } from '@/types/razorpay';
import { Button } from '../ui/button';

interface PaymentButtonProps {
  amount: number;
  currency?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  handleSuccess:()=>void;
  className?: string;
  pending?:boolean
}

export default function PaymentButton({
  amount,
  currency = 'INR',
  customerName = '',
  customerEmail = '',
  customerPhone = '',
  className = '',
  handleSuccess,
  pending
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  const handlePayment = async () => {
    if (!scriptReady) {
      alert('Payment gateway is still loading. Please wait a moment.');
      return;
    }

    setIsLoading(true);

    try {
      // Create order
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      if (!orderResponse.ok) throw new Error('Failed to create order');

      const order = await orderResponse.json();

      // Initialize Razorpay
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency,
        name: "kosmo clothing",
        description: "Order Payment",
        order_id: order.id,
        handler: handlePaymentSuccess,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: {
          color: '#0000', // Indigo color
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initialization failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = async (response: RazorpayPaymentVerificationResponse) => {
    try {
      const verification = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(response),
      });

      const result = await verification.json();
      if (result.success) {
        handleSuccess()
      } else {
        alert('Payment verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert('Error verifying payment');
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log('Razorpay script loaded');
          setScriptReady(true);
        }}
        onError={() => {
          console.error('Razorpay script failed to load');
          setScriptReady(false);
        }}
      />
      <Button
        onClick={handlePayment}
        disabled={isLoading || !scriptReady || pending}
        className={`${className} ${
          isLoading || !scriptReady ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'
        } bg-indigo-600 text-white py-2 px-4 rounded-md transition-all`}
      >
        {isLoading ? 'Processing...' : `Pay ₹${amount / 100}`}
      </Button>
    </>
  );
}