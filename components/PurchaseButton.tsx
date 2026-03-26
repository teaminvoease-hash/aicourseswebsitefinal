"use client";

import { useState } from "react";

export default function PurchaseButton({ courseSlug }: { courseSlug: string }) {
  const [message, setMessage] = useState("");
  const [couponCode, setCouponCode] = useState("");

  async function purchase() {
    setMessage("Creating PayU order...");
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
    const paymentForm = document.createElement("form");
    paymentForm.method = "POST";
    paymentForm.action = order.payu.action;

    for (const [key, value] of Object.entries(order.payu.fields)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = String(value);
      paymentForm.appendChild(input);
    }

    document.body.appendChild(paymentForm);
    setMessage("Redirecting to PayU secure checkout...");
    paymentForm.submit();
  }

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <p>One-time full payment only through PayU secure gateway.</p>
      <label>
        Coupon code (optional)
        <input value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} />
      </label>
      <button className="btn" style={{ marginTop: 10 }} onClick={purchase}>Pay with PayU & Unlock Course</button>
      <p>{message}</p>
    </div>
  );
}
