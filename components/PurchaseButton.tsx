"use client";

import { useState } from "react";

export default function PurchaseButton({ courseSlug }: { courseSlug: string }) {
  const [message, setMessage] = useState("");
  const [couponCode, setCouponCode] = useState("");

  async function purchase() {
    setMessage("Creating order...");
    const orderRes = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseSlug, couponCode })
    });

    if (!orderRes.ok) {
      setMessage("Please login as student to purchase.");
      return;
    }

    const order = await orderRes.json();
    const verifyRes = await fetch("/api/payment/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId: order.paymentId, txnId: `SIM-${Date.now()}` })
    });

    if (!verifyRes.ok) {
      setMessage("Payment verification failed.");
      return;
    }

    setMessage(`Payment success. ₹${order.amountInr} paid. Full course unlocked in dashboard.`);
  }

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <p>One-time full payment only.</p>
      <label>
        Coupon code (optional)
        <input value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} />
      </label>
      <button className="btn" style={{ marginTop: 10 }} onClick={purchase}>Pay & Unlock Course</button>
      <p>{message}</p>
    </div>
  );
}
