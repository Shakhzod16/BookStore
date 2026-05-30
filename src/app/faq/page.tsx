import FaqAccordion from "./FaqAccordion";

export const metadata = {
  title: "LearnBooks | FAQ",
  description:
    "Frequently asked questions about LearnBooks - payments, downloads, refunds and more.",
};

export default function FaqPage() {
  return (
    <div className="flex flex-col">
      <section
        className="px-4 py-20 text-center md:px-6 lg:px-8"
        style={{ backgroundColor: "#0f172a" }}
      >
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-lg text-gray-400">
            Everything you need to know about LearnBooks
          </p>
        </div>
      </section>

      <FaqAccordion />
    </div>
  );
}
