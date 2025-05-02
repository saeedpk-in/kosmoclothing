import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { RazorpayPaymentVerificationResponse } from '@/types/razorpay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature === razorpay_signature) {
      // Payment successful - save to database here
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Verification failed' },
      { status: 500 }
    );
  }
}