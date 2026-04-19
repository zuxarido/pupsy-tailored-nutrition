import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createServerSupabase } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dogProfileId, userId, planType, amount } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;

    // Skip verification in demo mode
    if (!secret || secret === "your_key_secret_here") {
      // Demo mode — just save to Supabase if we have credentials
      const supabase = createServerSupabase();

      if (userId && dogProfileId) {
        await supabase.from("subscriptions").insert({
          user_id: userId,
          dog_profile_id: dogProfileId,
          razorpay_order_id: razorpay_order_id || `demo_${Date.now()}`,
          razorpay_payment_id: razorpay_payment_id || `pay_demo_${Date.now()}`,
          plan_type: planType || "monthly",
          amount: amount || 0,
          status: "active",
        });
      }

      return NextResponse.json({ verified: true, demo: true });
    }

    // Verify Razorpay signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Save verified subscription to Supabase
    const supabase = createServerSupabase();

    if (userId && dogProfileId) {
      await supabase.from("subscriptions").insert({
        user_id: userId,
        dog_profile_id: dogProfileId,
        razorpay_order_id,
        razorpay_payment_id,
        plan_type: planType || "monthly",
        amount: amount || 0,
        status: "active",
      });
    }

    return NextResponse.json({ verified: true, demo: false });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 },
    );
  }
}
