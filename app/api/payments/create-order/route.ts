import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { RazorpayOrderResponse } from '@/types/razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID !,
  key_secret: process.env.RAZORPAY_KEY_SECRET !,
});

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    const options = {
      amount: amount, // amount in paise (₹100 = 10000)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json<RazorpayOrderResponse>({
      ...order,
      amount: Number(order.amount),
      receipt: order.receipt || '', // Ensure receipt is always a string
    });
  } catch (error: any) {
    console.log(error);
    
    return NextResponse.json(
      { error: error.message || 'Error creating order' },
      { status: 500 }
    );
  }
}