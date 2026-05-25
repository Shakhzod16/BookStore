"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  LayoutDashboard,
  ShoppingBag,
  Users,
  LogOut,
  ExternalLink,
} from "lucide-react";
import {
  adminLogout,
  isAdminLoggedIn,
  ADMIN_CREDENTIALS,
} from "@/lib/adminAuth";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/book", label: "Edit Book", icon: BookOpen },
  { href: "/admin/users", label: "Customers", icon: Users },
] as const;

const PAGE_TITLES: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/orders": "Orders",
  "/admin/book": "Edit Book",
  "/admin/users": "Customers",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setReady(true);
      return;
    }
    if (!isAdminLoggedIn()) {
      router.replace("/admin/login");
    } else {
      setReady(true);
    }
  }, [pathname, router, isLoginPage]);

  if (isLoginPage) {
    return (
      <>
        <style>{`
          header { display: none !important; }
          footer { display: none !important; }
        `}</style>
        {children}
      </>
    );
  }

  if (!ready) {
    return null;
  }

  const pageTitle = PAGE_TITLES[pathname] ?? "Admin";

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        header { display: none !important; }
        footer { display: none !important; }
      `}</style>
      <aside className="fixed left-0 top-0 z-40 hidden h-full w-64 flex-col bg-slate-800 text-white lg:flex">
        <div className="border-b border-slate-700 p-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-indigo-400" />
            <span className="text-lg font-bold">LearnBooks</span>
          </Link>
          <p className="mt-1 text-xs text-gray-400">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-700"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-700 p-4">
          <p className="truncate text-xs text-gray-400">
            {ADMIN_CREDENTIALS.email}
          </p>
          <button
            type="button"
            onClick={() => {
              adminLogout();
              router.push("/admin/login");
            }}
            className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-red-900/30 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="lg:ml-64">
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 shadow-sm md:px-8">
          <h1 className="text-xl font-bold text-gray-900">{pageTitle}</h1>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            View Site
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        <main className="mx-auto max-w-7xl p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
