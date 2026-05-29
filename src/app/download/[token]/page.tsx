"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Download,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Loader,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

export default function DownloadPage() {
  const params = useParams();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = params.token as string;
    if (!token) {
      setStatus("error");
      setErrorMessage("Invalid download link");
      return;
    }

    const downloadUrl = `${API_URL}/api/download/${token}`;

    window.location.href = downloadUrl;
    setStatus("success");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        {status === "loading" && (
          <>
            <Loader className="mx-auto h-12 w-12 animate-spin text-purple-600" />
            <p className="mt-6 text-lg text-gray-700">
              Preparing your download...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="mx-auto h-20 w-20 text-green-600" />
            <h1 className="mt-6 text-2xl font-bold text-gray-900">
              Download Started!
            </h1>
            <p className="mt-3 text-gray-600">
              Your book should be downloading now.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Go to Home
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <AlertCircle className="mx-auto h-20 w-20 text-red-600" />
            <h1 className="mt-6 text-2xl font-bold text-gray-900">
              Invalid Download Link
            </h1>
            <p className="mt-3 text-gray-600">{errorMessage}</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Contact Support
            </Link>
            <Link
              href="/"
              className="mt-4 block text-sm text-gray-500 transition-colors hover:text-indigo-600"
            >
              Go Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
