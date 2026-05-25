"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Mail } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface LastOrder {
  orderId?: string;
  token?: string;
  customerName?: string;
  customerEmail?: string;
  paymentMethod?: string;
  amount?: number;
  bookTitle?: string;
  createdAt?: string;
  status?: string;
}

const PAYMENT_LABELS: Record<string, string> = {
  card: "Credit / Debit Card",
  crypto: "Cryptocurrency",
  click: "Click",
  payme: "Payme",
};

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<LastOrder>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lastOrder");
      if (stored) {
        setOrder(JSON.parse(stored) as LastOrder);
      }
    } catch {
      setOrder({});
    }
  }, []);

  const paymentLabel =
    PAYMENT_LABELS[order.paymentMethod ?? ""] ?? order.paymentMethod ?? "—";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <Check className="h-10 w-10 text-green-600" strokeWidth={2.5} />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Payment Successful!
        </h1>
        <p className="mt-3 text-gray-600">
          Thank you, {order.customerName || "there"}! Your order has been
          confirmed.
        </p>

        <div className="mt-8 rounded-xl bg-white p-6 text-left shadow-sm">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Order ID</dt>
              <dd className="font-mono font-medium text-gray-900">
                {order.orderId || "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Email sent to</dt>
              <dd className="font-medium text-gray-900">
                {order.customerEmail || "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Amount paid</dt>
              <dd className="font-medium text-gray-900">
                {order.amount != null ? formatPrice(order.amount) : "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Payment method</dt>
              <dd className="font-medium text-gray-900">{paymentLabel}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 rounded-xl bg-blue-50 p-6 text-left">
          <div className="flex items-start gap-3">
            <Mail className="h-6 w-6 shrink-0 text-blue-600" />
            <div>
              <p className="font-semibold text-blue-900">Check your email!</p>
              <p className="mt-2 text-sm leading-relaxed text-blue-800">
                We&apos;ve sent a download link to{" "}
                <strong>{order.customerEmail || "your email"}</strong>. The email
                may take 2-5 minutes to arrive. Check your spam folder if you
                don&apos;t see it.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-white p-6 text-left shadow-sm">
          <h2 className="font-semibold text-gray-900">What&apos;s next?</h2>
          <ol className="mt-4 space-y-3 text-sm text-gray-700">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                1
              </span>
              Check your email inbox
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                2
              </span>
              Click the download link
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                3
              </span>
              Start learning!
            </li>
          </ol>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 py-3.5 text-base font-semibold text-white transition-colors hover:bg-indigo-700 sm:w-auto sm:px-10"
        >
          Back to Home
        </Link>

        <Link
          href="/contact"
          className="mt-4 block text-sm text-gray-500 transition-colors hover:text-indigo-600"
        >
          Didn&apos;t receive email? Contact us
        </Link>
      </div>
    </div>
  );
}
