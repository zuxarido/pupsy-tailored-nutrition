"use client";

import { useEffect, useState } from "react";

type Props = {
  amount: number;
  planType: string;
  dogName: string;
  userEmail?: string;
  onSuccess: (paymentData: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => void;
  onFailure: (error: string) => void;
};

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export function RazorpayButton({ amount, planType, dogName, userEmail, onSuccess, onFailure }: Props) {
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Create order
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planType, amount }),
      });
      const order = await res.json();

      if (order.demo) {
        // Demo mode — simulate success
        onSuccess({
          razorpay_order_id: order.orderId,
          razorpay_payment_id: `pay_demo_${Date.now()}`,
          razorpay_signature: "demo_signature",
        });
        setLoading(false);
        return;
      }

      // Open Razorpay checkout
      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Pupsy",
        description: `${planType} meal plan for ${dogName}`,
        order_id: order.orderId,
        prefill: { email: userEmail || "" },
        theme: { color: "#C2703E" },
        handler: (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          onSuccess(response);
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      onFailure("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading || !scriptLoaded}
      className="btn-pill-primary mt-4 w-full disabled:opacity-60"
    >
      {loading ? "Processing..." : `Pay \\u20B9${amount.toLocaleString("en-IN")}`}
    </button>
  );
}
