declare global {
    interface Window {
      Razorpay: any;
    }
  }

export interface RazorpayOrderResponse {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    status: string;
    attempts: number;
    created_at: number;
  }
  
  export interface RazorpayPaymentVerificationResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }
  
  export interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image?: string;
    order_id: string;
    handler: (response: RazorpayPaymentVerificationResponse) => void;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    notes?: {
      address?: string;
    };
    theme?: {
      color?: string;
    };
  }