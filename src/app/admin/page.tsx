"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAdminLoggedIn } from "@/lib/adminAuth";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    if (isAdminLoggedIn()) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/admin/login");
    }
  }, [router]);

  return null;
}
