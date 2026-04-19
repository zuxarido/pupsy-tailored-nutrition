import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const { planType, amount, dogProfileId } = await req.json();

    // In production, create a Razorpay order via their API
    // For now, return a mock order for testing
    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    if (!razorpayKeyId || razorpayKeyId === "rzp_test_your_key_id") {
      // Demo mode — return a mock order
      return NextResponse.json({
        orderId: `order_demo_${Date.now()}`,
        amount: amount * 100, // Razorpay expects paise
        currency: "INR",
        keyId: razorpayKeyId,
        demo: true,
      });
    }

    // Real Razorpay integration
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`,
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: amount * 100,
        currency: "INR",
        receipt: `pupsy_${dogProfileId || "guest"}_${Date.now()}`,
        notes: { planType, dogProfileId },
      }),
    });

    const order = await response.json();

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: razorpayKeyId,
      demo: false,
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}
