"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

function NavLink({
  href,
  name,
  onClick,
}: {
  href: string;
  name: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {name}
    </Link>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 md:h-16 md:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-gray-900 transition-opacity hover:opacity-80"
        >
          <BookOpen className="h-6 w-6 text-indigo-600 md:h-7 md:w-7" />
          <span className="text-lg font-bold tracking-tight md:text-xl">
            LearnBooks
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} name={link.name} />
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="/#pricing"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Get the Book
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/#pricing"
            className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Get the Book
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 ease-in-out md:hidden ${
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-3">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              name={link.name}
              onClick={() => setMenuOpen(false)}
            />
          ))}
          <Link
            href="/#pricing"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Get the Book
          </Link>
        </div>
      </div>
    </header>
  );
}
