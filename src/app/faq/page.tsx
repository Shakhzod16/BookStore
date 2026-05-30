import FaqAccordion from "./FaqAccordion";

export const metadata = {
  title: "LearnBooks | FAQ",
  description:
    "Frequently asked questions about LearnBooks — payments, downloads, refunds and more.",
};

export default function FaqPage() {
  return (
    <div className="flex flex-col">
      <section
        style={{ background: "#0f172a" }}
        className="py-20 text-center"
      >
        <div className="mx-auto max-w-3xl px-4">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-indigo-400">
            Support
          </p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-400">
            Everything you need to know about LearnBooks
          </p>
        </div>
      </section>

      <FaqAccordion />
    </div>
  );
}
