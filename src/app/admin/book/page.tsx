"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { THE_BOOK } from "@/lib/constants";

type BookFormData = {
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  description: string;
  pages: number;
  fileSize: string;
  chaptersCount: number;
  includes: string[];
};

export default function AdminBookPage() {
  const [bookData, setBookData] = useState<BookFormData>({
    title: THE_BOOK.title,
    author: THE_BOOK.author,
    price: THE_BOOK.price,
    originalPrice: THE_BOOK.originalPrice,
    description: THE_BOOK.description,
    pages: THE_BOOK.pages,
    fileSize: THE_BOOK.fileSize,
    chaptersCount: THE_BOOK.chaptersCount,
    includes: [...THE_BOOK.includes],
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateInclude = (index: number, value: string) => {
    setBookData((prev) => ({
      ...prev,
      includes: prev.includes.map((item, i) => (i === index ? value : item)),
    }));
  };

  const addInclude = () => {
    setBookData((prev) => ({
      ...prev,
      includes: [...prev.includes, ""],
    }));
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="flex-1">
        {saved && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
            <Check className="h-5 w-5" />
            Changes saved successfully!
          </div>
        )}

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">
            Edit Book Information
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={bookData.title}
                onChange={(e) =>
                  setBookData((p) => ({ ...p, title: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <input
                type="text"
                value={bookData.author}
                onChange={(e) =>
                  setBookData((p) => ({ ...p, author: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={bookData.price}
                    onChange={(e) =>
                      setBookData((p) => ({
                        ...p,
                        price: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-200 py-2 pl-8 pr-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Original Price
                </label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={bookData.originalPrice}
                    onChange={(e) =>
                      setBookData((p) => ({
                        ...p,
                        originalPrice: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-200 py-2 pl-8 pr-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows={4}
                value={bookData.description}
                onChange={(e) =>
                  setBookData((p) => ({ ...p, description: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pages
                </label>
                <input
                  type="number"
                  value={bookData.pages}
                  onChange={(e) =>
                    setBookData((p) => ({
                      ...p,
                      pages: parseInt(e.target.value, 10) || 0,
                    }))
                  }
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  File Size
                </label>
                <input
                  type="text"
                  value={bookData.fileSize}
                  onChange={(e) =>
                    setBookData((p) => ({ ...p, fileSize: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Chapters Count
                </label>
                <input
                  type="number"
                  value={bookData.chaptersCount}
                  onChange={(e) =>
                    setBookData((p) => ({
                      ...p,
                      chaptersCount: parseInt(e.target.value, 10) || 0,
                    }))
                  }
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">Includes</h3>
              <div className="mt-3 space-y-2">
                {bookData.includes.map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    value={item}
                    onChange={(e) => updateInclude(index, e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={addInclude}
                className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                + Add Include
              </button>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-indigo-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <aside className="w-full shrink-0 lg:w-72">
        <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm">
          <img
            src={THE_BOOK.coverImage}
            alt={bookData.title}
            className="w-full rounded-lg shadow-md"
          />
          <Link
            href="/"
            target="_blank"
            className="mt-4 block text-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Preview on Site →
          </Link>
        </div>
      </aside>
    </div>
  );
}
