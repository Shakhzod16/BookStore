export const metadata = {
  title: "LearnBooks | Refund Policy",
  description: "LearnBooks 30-day money back guarantee and refund policy.",
};

export default function RefundPolicyPage() {
  return (
    <div className="flex flex-col">
      <section
        className="px-4 py-20 text-center md:px-6 lg:px-8"
        style={{ backgroundColor: "#0f172a" }}
      >
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Refund Policy
          </h1>
          <p className="mt-6 text-lg text-gray-400">Last updated: January 1, 2026</p>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-10 text-gray-600">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Our Guarantee</h2>
            <p className="mt-4 leading-relaxed">
              At LearnBooks, we stand behind the quality of our product. If you
              are not completely satisfied with your purchase, we offer a full
              refund within 30 days of purchase — no questions asked.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Eligibility</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
              <li>Purchase was made within the last 30 days</li>
              <li>You provide your order ID</li>
              <li>Refund requests are processed within 3-5 business days</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              How to Request a Refund
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-6 leading-relaxed">
              <li>Email support@learnbooks.com</li>
              <li>Include your Order ID (found in your confirmation email)</li>
              <li>We will process your refund within 3-5 business days</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Non-Refundable Cases
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
              <li>Requests made after 30 days of purchase</li>
              <li>Accounts found to be sharing download links</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Contact</h2>
            <p className="mt-4 leading-relaxed">
              For refund requests or questions:{" "}
              <a
                href="mailto:support@learnbooks.com"
                className="text-indigo-600 hover:text-indigo-700"
              >
                support@learnbooks.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
