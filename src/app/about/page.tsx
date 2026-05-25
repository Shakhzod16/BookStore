import Link from "next/link";
import { BookOpen, Code, Infinity } from "lucide-react";
import { THE_BOOK } from "@/lib/constants";

const VALUES = [
  {
    icon: BookOpen,
    title: "Quality First",
    description:
      "Every page is carefully crafted and reviewed by industry experts.",
  },
  {
    icon: Code,
    title: "Practical Learning",
    description: "Real projects, real examples. No fluff, no filler.",
  },
  {
    icon: Infinity,
    title: "Lifetime Value",
    description: "Buy once, get all future updates forever. No subscriptions.",
  },
] as const;

const SKILLS = ["JavaScript", "React", "Node.js", "Python", "AWS"];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section
        className="px-4 py-20 text-center md:px-6 lg:px-8"
        style={{ backgroundColor: "#0f172a" }}
      >
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full bg-indigo-600 px-4 py-1 text-sm font-medium text-white">
            Our Story
          </span>
          <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
            About LearnBooks
          </h1>
          <p className="mt-6 text-lg text-gray-400">
            We believe quality education should be accessible to everyone,
            everywhere.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              LearnBooks was founded with a simple goal — to create the most
              comprehensive, practical, and affordable programming guide
              available. We spent 2 years writing, testing, and refining every
              chapter to ensure you get real-world skills, not just theory.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              Our book has helped over 1,200 students land their first developer
              job, build their own projects, and level up their careers.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <div>
                <p className="text-2xl font-bold text-indigo-600">
                  {THE_BOOK.reviewCount}+
                </p>
                <p className="text-sm text-gray-500">Students</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-600">
                  ★ {THE_BOOK.rating}
                </p>
                <p className="text-sm text-gray-500">Rating</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-600">2 Years</p>
                <p className="text-sm text-gray-500">Writing</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <img
              src={THE_BOOK.coverImage}
              alt={THE_BOOK.title}
              className="max-w-sm rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            What We Stand For
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl bg-white p-8 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Meet the Author
          </h2>
          <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600 text-3xl font-bold text-white">
              AJ
            </div>
            <h3 className="mt-6 text-2xl font-bold text-gray-900">
              {THE_BOOK.author}
            </h3>
            <p className="mt-1 text-indigo-600">
              Senior Software Engineer & Educator
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              Alex has 10+ years of experience building web applications at
              companies like Google and Stripe. He has taught over 50,000
              students online and wrote this book to share everything he wished
              he had known when starting out.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-indigo-600 px-4 py-16 text-center md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-white">
            Ready to Start Learning?
          </h2>
          <Link
            href="/checkout"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-lg font-semibold text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Get the Book
          </Link>
        </div>
      </section>
    </div>
  );
}
