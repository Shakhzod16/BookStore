"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  Lock,
  CreditCard,
  Bitcoin,
  Smartphone,
  Check,
  ArrowLeft,
  BookOpen,
  Mail,
  User,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { THE_BOOK } from "@/lib/constants";
import { createOrder } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

type PaymentMethod = "card" | "crypto" | "click" | "payme";

const PAYMENT_OPTIONS: {
  id: PaymentMethod;
  icon: typeof CreditCard;
  title: string;
  subtitle: string;
  badge: string;
}[] = [
  {
    id: "card",
    icon: CreditCard,
    title: "Credit / Debit Card",
    subtitle: "Visa, Mastercard, American Express",
    badge: "International",
  },
  {
    id: "crypto",
    icon: Bitcoin,
    title: "Cryptocurrency",
    subtitle: "USDT, BTC, ETH — any network",
    badge: "Recommended",
  },
  {
    id: "click",
    icon: Smartphone,
    title: "Click",
    subtitle: "Uzbekistan payment system",
    badge: "Uzbekistan",
  },
  {
    id: "payme",
    icon: Smartphone,
    title: "Payme",
    subtitle: "Uzbekistan payment system",
    badge: "Uzbekistan",
  },
];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function OrderSummary() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm lg:sticky lg:top-24">
      <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

      <div className="mt-4 flex gap-4">
        <img
          src={THE_BOOK.coverImage}
          alt={THE_BOOK.title}
          className="h-28 w-20 shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <p className="line-clamp-2 text-sm font-semibold text-gray-900">
            {THE_BOOK.title}
          </p>
          <p className="mt-1 text-sm text-gray-500">by {THE_BOOK.author}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Original price</span>
          <span className="line-through">
            {formatPrice(THE_BOOK.originalPrice)}
          </span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Your price</span>
          <span className="font-medium">{formatPrice(THE_BOOK.price)}</span>
        </div>
        <div className="flex justify-between font-medium text-green-600">
          <span>You save</span>
          <span>$50.00 (62% off)</span>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="flex justify-between">
        <span className="font-semibold text-gray-900">Total</span>
        <span className="text-xl font-bold text-gray-900">
          {formatPrice(THE_BOOK.price)}
        </span>
      </div>

      <ul className="mt-6 space-y-2 text-sm text-gray-600">
        {[
          `PDF Download (${THE_BOOK.fileSize})`,
          "Instant delivery via email",
          "Lifetime access + free updates",
          "30-day money back guarantee",
        ].map((item) => (
          <li key={item} className="flex items-center gap-2">
            <Check className="h-4 w-4 shrink-0 text-indigo-600" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 space-y-2 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Lock className="h-4 w-4 text-green-600" />
          256-bit SSL Encryption
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Shield className="h-4 w-4 text-green-600" />
          Secure Checkout
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [form, setForm] = useState({ name: "", email: "", confirmEmail: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = "Please enter your full name (at least 2 characters).";
    }
    if (!form.email.trim() || !isValidEmail(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (form.confirmEmail !== form.email) {
      newErrors.confirmEmail = "Email addresses do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPaymentInfo = () => {
    switch (paymentMethod) {
      case "card":
        return "You will be redirected to our secure payment processor after clicking Pay Now. We accept Visa, Mastercard, and Amex.";
      case "crypto":
        return "After clicking Pay Now, you will receive wallet address and payment instructions via email. Payment confirmed within 1-30 minutes.";
      case "click":
        return "You will be redirected to Click to complete your payment securely.";
      case "payme":
        return "You will be redirected to Payme to complete your payment securely.";
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const order = await createOrder({
        customer_name: form.name,
        customer_email: form.email,
        payment_method: paymentMethod,
      });

      localStorage.setItem(
        "lastOrder",
        JSON.stringify({
          orderId: order.id,
          customerName: order.customer_name,
          customerEmail: order.customer_email,
          paymentMethod: order.payment_method,
          amount: order.amount,
          bookTitle: "The Complete JavaScript & Web Development Guide",
          createdAt: order.created_at,
          status: order.status,
        })
      );

      router.push("/order-success");
    } catch (error) {
      console.error("Order creation failed:", error);
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="min-w-0 flex-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-indigo-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              Complete Your Purchase
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {step === 1
                ? "Step 1 of 2 — Your Details"
                : "Step 2 of 2 — Payment Method"}
            </p>

            <div className="mt-6 lg:hidden">
              <OrderSummary />
            </div>

            {step === 1 ? (
              <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">
                  Contact Information
                </h2>

                <div className="mt-6 space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        id="name"
                        type="text"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Your download link will be sent here
                    </p>
                    {errors.email && (
                      <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmEmail"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Email
                    </label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        id="confirmEmail"
                        type="email"
                        placeholder="john@example.com"
                        value={form.confirmEmail}
                        onChange={(e) =>
                          updateField("confirmEmail", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    {errors.confirmEmail && (
                      <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {errors.confirmEmail}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleContinue}
                  className="mt-8 w-full rounded-lg bg-indigo-600 py-3.5 text-base font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  Continue to Payment
                </button>
              </div>
            ) : (
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {PAYMENT_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const selected = paymentMethod === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setPaymentMethod(option.id)}
                        className={`rounded-xl p-4 text-left transition-all ${
                          selected
                            ? "border-2 border-indigo-600 bg-indigo-50"
                            : "border border-gray-200 hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <Icon
                            className={`h-6 w-6 shrink-0 ${
                              selected ? "text-indigo-600" : "text-gray-500"
                            }`}
                          />
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              selected
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {option.badge}
                          </span>
                        </div>
                        <p className="mt-3 font-semibold text-gray-900">
                          {option.title}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {option.subtitle}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {errors.general && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.general}</span>
                  </div>
                )}

                <div className="rounded-xl bg-gray-100 p-4 text-sm text-gray-700">
                  {getPaymentInfo()}
                </div>

                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5" />
                      Pay {formatPrice(THE_BOOK.price)} Securely
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-gray-600 transition-colors hover:text-indigo-600"
                >
                  ← Back to Details
                </button>
              </div>
            )}
          </div>

          <aside className="hidden w-full shrink-0 lg:block lg:w-80">
            <OrderSummary />
          </aside>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
          <BookOpen className="h-4 w-4" />
          <span>LearnBooks — Secure checkout powered by SSL encryption</span>
        </div>
      </div>
    </div>
  );
}
