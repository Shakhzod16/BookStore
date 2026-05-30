"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Clock,
  HelpCircle,
  AlertCircle,
  Check,
  Loader2,
} from "lucide-react";

const SUBJECTS = [
  "General Question",
  "Download Issue",
  "Payment Problem",
  "Refund Request",
  "Other",
] as const;

const TOPIC_PILLS = [
  "Download issues",
  "Payment help",
  "Refund request",
  "Book content",
  "Technical support",
];

const FAQ_PREVIEW = [
  {
    q: "I didn't receive my download link",
    a: "Check your spam folder first. If still missing, contact us with your order ID.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes, we offer a full refund within 30 days, no questions asked.",
  },
  {
    q: "Is the book updated regularly?",
    a: "Yes! All updates are free for life once you purchase.",
  },
];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: SUBJECTS[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }
    if (!form.email.trim() || !isValidEmail(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      subject: SUBJECTS[0],
      message: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="flex flex-col">
      <section
        className="px-4 py-16 text-center md:px-6 lg:px-8"
        style={{ backgroundColor: "#0f172a" }}
      >
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Have a question? We typically respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-100 p-5">
              <Mail className="h-6 w-6 text-indigo-600" />
              <h3 className="mt-3 font-semibold text-gray-900">Email Us</h3>
              <p className="mt-1 font-medium text-gray-800">
                support@learnbooks.com
              </p>
              <p className="mt-1 text-sm text-gray-500">
                We reply within 24 hours
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 p-5">
              <Clock className="h-6 w-6 text-indigo-600" />
              <h3 className="mt-3 font-semibold text-gray-900">
                Response Time
              </h3>
              <p className="mt-1 font-medium text-gray-800">Within 24 hours</p>
              <p className="mt-1 text-sm text-gray-500">Monday to Friday</p>
            </div>

            <div className="rounded-xl border border-gray-100 p-5">
              <HelpCircle className="h-6 w-6 text-indigo-600" />
              <h3 className="mt-3 font-semibold text-gray-900">
                Check our FAQ
              </h3>
              <p className="mt-1 text-gray-600">Common questions answered</p>
              <Link
                href="/#faq"
                className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                View FAQ тЖТ
              </Link>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Common Topics</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {TOPIC_PILLS.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-8 w-8 text-green-600" strokeWidth={2.5} />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-gray-900">
                  Message Sent!
                </h2>
                <p className="mt-3 text-gray-600">
                  Thank you {form.name}! We have received your message and will
                  reply to {form.email} within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-8 rounded-lg border border-indigo-600 px-6 py-2.5 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900">
                  Send a Message
                </h2>
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
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
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.email && (
                      <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      value={form.subject}
                      onChange={(e) => updateField("subject", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className="mt-1 w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.message && (
                      <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="bg-gray-50 px-4 py-16 md:px-6 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Quick Answers
          </h2>
          <div className="mt-10 space-y-8">
            {FAQ_PREVIEW.map((item) => (
              <div key={item.q}>
                <h3 className="font-semibold text-gray-900">{item.q}</h3>
                <p className="mt-2 leading-relaxed text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
