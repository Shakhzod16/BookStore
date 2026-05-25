"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Star, ChevronDown } from "lucide-react";
import { THE_BOOK } from "@/lib/constants";
import { formatPrice, formatDate } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    q: "What format is the book?",
    a: "The book is delivered as a PDF file (12.4 MB), compatible with all devices.",
  },
  {
    q: "How do I receive the book after purchase?",
    a: "Immediately after payment, a download link is sent to your email address.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes, we offer a 30-day money-back guarantee, no questions asked.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept cryptocurrency wallets, international cards (Visa/Mastercard), Click and Payme for Uzbekistan.",
  },
  {
    q: "Do I get free updates?",
    a: "Yes! You will receive all future updates to the book at no extra charge.",
  },
];

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col">
      {/* SECTION 1: HERO */}
      <section
        className="min-h-screen bg-[#0f172a] px-4 py-16 md:px-6 lg:px-8"
        style={{ backgroundColor: "#0f172a" }}
      >
        <div className="mx-auto flex max-w-7xl min-h-[calc(100vh-8rem)] flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl text-center lg:text-left">
            <span className="inline-block rounded-full bg-indigo-600 px-4 py-1 text-sm font-medium text-white">
              New Release 2024
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Master JavaScript & Web Development
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              {THE_BOOK.description}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-indigo-500"
              >
                Get the Book — {formatPrice(THE_BOOK.price)}
              </Link>
              <Link
                href="/#includes"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-white/10"
              >
                Preview Chapters
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-400">
              ★ {THE_BOOK.rating} Rating &nbsp;•&nbsp; {THE_BOOK.reviewCount}+
              students &nbsp;•&nbsp; PDF Download
            </p>
          </div>

          <div className="relative w-full max-w-sm shrink-0">
            <div className="rotate-3 overflow-hidden rounded-2xl shadow-2xl ring-2 ring-white/10 transition-transform hover:rotate-1">
              <img
                src={THE_BOOK.coverImage}
                alt={THE_BOOK.title}
                className="aspect-[4/5.6] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SOCIAL PROOF */}
      <section className="bg-gray-800 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 text-center md:grid-cols-4 md:px-6 lg:px-8">
          {[
            `${THE_BOOK.reviewCount}+ Students`,
            `★ ${THE_BOOK.rating}/5 Rating`,
            `${THE_BOOK.pages} Pages`,
            `${THE_BOOK.chaptersCount} Chapters`,
          ].map((stat) => (
            <p key={stat} className="text-lg font-semibold text-white">
              {stat}
            </p>
          ))}
        </div>
      </section>

      {/* SECTION 3: WHAT YOU GET */}
      <section id="includes" className="bg-white px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything You Need to Succeed
          </h2>
          <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {THE_BOOK.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="relative mx-auto w-full max-w-xs">
              <img
                src={THE_BOOK.coverImage}
                alt={THE_BOOK.title}
                className="rounded-xl shadow-xl"
              />
              <span className="absolute -right-2 -top-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
                Best Value
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: TABLE OF CONTENTS */}
      <section id="contents" className="bg-gray-50 px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            What&apos;s Inside
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {THE_BOOK.tableOfContents.map((item) => (
              <div
                key={item.chapter}
                className="flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-indigo-50"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                  {item.chapter}
                </span>
                <span className="font-medium text-gray-800">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PRICING */}
      <section id="pricing" className="bg-white px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-md">
          <div className="overflow-hidden rounded-2xl border-2 border-indigo-500 bg-white shadow-xl">
            <div className="bg-indigo-600 py-2 text-center text-sm font-semibold text-white">
              Most Popular
            </div>
            <div className="p-8">
              <img
                src={THE_BOOK.coverImage}
                alt={THE_BOOK.title}
                className="mx-auto h-40 w-auto rounded-lg object-cover shadow-md"
              />
              <h3 className="mt-6 text-center text-lg font-bold text-gray-900">
                {THE_BOOK.title}
              </h3>
              <p className="mt-2 text-center text-sm text-gray-500 line-through">
                {formatPrice(THE_BOOK.originalPrice)}
              </p>
              <p className="text-center text-4xl font-bold text-indigo-600">
                {formatPrice(THE_BOOK.price)}
              </p>
              <p className="mt-2 text-center text-sm font-medium text-green-600">
                Save $50.00 (62% off)
              </p>
              <ul className="mt-6 space-y-2">
                {THE_BOOK.includes.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="h-4 w-4 shrink-0 text-indigo-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/checkout"
                className="mt-8 flex w-full items-center justify-center rounded-lg bg-indigo-600 py-4 text-lg font-bold text-white transition-colors hover:bg-indigo-700"
              >
                Buy Now — {formatPrice(THE_BOOK.price)}
              </Link>
              <p className="mt-4 text-center text-xs text-gray-500">
                Secure payment • Instant PDF delivery • 30-day guarantee
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["Crypto", "Visa/MC", "Click", "Payme"].map((method) => (
                  <span
                    key={method}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: REVIEWS */}
      <section className="bg-gray-50 px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            What Students Say
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {THE_BOOK.reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(review.date)}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <ReviewStars rating={review.rating} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {review.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section
        id="faq"
        className="bg-white px-4 py-16 md:px-6 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl border border-gray-200"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-gray-900 transition-colors hover:bg-gray-50"
                >
                  {item.q}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-gray-500 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <p className="border-t border-gray-100 px-5 py-4 text-gray-600">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section
        className="px-4 py-16 text-center md:px-6 lg:px-8 lg:py-20"
        style={{ backgroundColor: "#4f46e5" }}
      >
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Start Your Journey?
          </h2>
          <Link
            href="/checkout"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-10 py-4 text-lg font-bold text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Get the Book Now
          </Link>
          <p className="mt-4 text-sm text-indigo-100">
            30-Day Money Back Guarantee
          </p>
        </div>
      </section>
    </div>
  );
}
