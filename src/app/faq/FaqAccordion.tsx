"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const FAQ_CATEGORIES = [
  {
    title: "About the Book",
    items: [
      {
        q: "What is included in the book?",
        a: "The Complete JavaScript & Web Development Guide includes 487 pages covering JavaScript fundamentals, ES6+, React, Node.js, REST APIs, databases, authentication, deployment, and 10 real-world projects with source code.",
      },
      {
        q: "What skill level is this book for?",
        a: "The book is designed for beginners and intermediate developers. We start from absolute basics and progressively cover advanced topics.",
      },
      {
        q: "Is the content up to date?",
        a: "Yes! The book covers modern JavaScript (ES2024), React 18, Node.js 20, and current industry best practices.",
      },
    ],
  },
  {
    title: "Purchase & Payment",
    items: [
      {
        q: "How much does the book cost?",
        a: "The book costs $29.99 — a one-time payment with lifetime access including all future updates.",
      },
      {
        q: "What payment methods are accepted?",
        a: "We accept cryptocurrency (USDT, BTC, ETH), international cards (Visa/Mastercard), Click and Payme for Uzbekistan users.",
      },
      {
        q: "Is my payment secure?",
        a: "Yes. All transactions are protected with 256-bit SSL encryption.",
      },
    ],
  },
  {
    title: "Download & Access",
    items: [
      {
        q: "How do I receive the book after purchase?",
        a: "Immediately after payment, a download link is sent to your email address. Check your spam folder if you don't see it within 5 minutes.",
      },
      {
        q: "What format is the book?",
        a: "The book is delivered as a PDF file (12.4 MB), compatible with all devices — Windows, Mac, iOS, Android, and Kindle.",
      },
      {
        q: "Can I read it on my phone?",
        a: "Yes! PDF format works perfectly on all smartphones and tablets.",
      },
    ],
  },
  {
    title: "Refunds & Support",
    items: [
      {
        q: "Is there a refund policy?",
        a: "Yes! We offer a full 30-day money-back guarantee, no questions asked. Contact support@learnbooks.com with your order ID.",
      },
      {
        q: "What if I don't receive my email?",
        a: "First check your spam folder. If still missing after 10 minutes, contact us at support@learnbooks.com with your order ID and we'll resend it immediately.",
      },
      {
        q: "How do I contact support?",
        a: "Email us at support@learnbooks.com. We respond within 24 hours, Monday to Friday.",
      },
    ],
  },
] as const;

export default function FaqAccordion() {
  const [openItems, setOpenItems] = useState<Record<number, number | null>>({});

  function toggle(categoryIndex: number, itemIndex: number) {
    setOpenItems((prev) => ({
      ...prev,
      [categoryIndex]:
        prev[categoryIndex] === itemIndex ? null : itemIndex,
    }));
  }

  return (
    <>
      <section className="bg-white px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          {FAQ_CATEGORIES.map((category, categoryIndex) => (
            <div key={category.title} className={categoryIndex > 0 ? "mt-12" : ""}>
              <h2 className="text-xl font-bold text-gray-900">
                {category.title}
              </h2>
              <div className="mt-4 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
                {category.items.map((item, itemIndex) => {
                  const isOpen = openItems[categoryIndex] === itemIndex;

                  return (
                    <div key={item.q}>
                      <button
                        type="button"
                        onClick={() => toggle(categoryIndex, itemIndex)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50"
                        aria-expanded={isOpen}
                      >
                        <span className="font-medium text-gray-900">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-sm leading-relaxed text-gray-600">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 text-center md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Still have questions?
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-indigo-600 px-8 py-3 font-semibold text-indigo-600 transition-colors hover:bg-indigo-50"
            >
              Contact Us
            </Link>
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Get the Book
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
