export const metadata = {
  title: "LearnBooks | Privacy Policy",
  description: "LearnBooks privacy policy - how we collect and use your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col">
      <section
        className="px-4 py-20 text-center md:px-6 lg:px-8"
        style={{ backgroundColor: "#0f172a" }}
      >
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-lg text-gray-400">Last updated: January 1, 2026</p>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-10 text-gray-600">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Information We Collect
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
              <li>Name and email address (when you make a purchase)</li>
              <li>Payment method type (we do not store card numbers)</li>
              <li>Order history</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              How We Use Your Information
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
              <li>To process your order and send your download link</li>
              <li>To send order confirmation emails</li>
              <li>To respond to your support requests</li>
              <li>We never sell your data to third parties</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
            <p className="mt-4 leading-relaxed">
              We use industry-standard SSL encryption to protect your data. Your
              payment information is processed securely and we never store
              sensitive payment details.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Cookies</h2>
            <p className="mt-4 leading-relaxed">
              Our website uses minimal cookies to ensure proper functionality. We
              do not use tracking cookies or third-party advertising cookies.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
              <li>Access your personal data</li>
              <li>Request deletion of your data</li>
              <li>
                Contact us:{" "}
                <a
                  href="mailto:support@learnbooks.com"
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  support@learnbooks.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Contact</h2>
            <p className="mt-4 leading-relaxed">
              For privacy-related questions:{" "}
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
