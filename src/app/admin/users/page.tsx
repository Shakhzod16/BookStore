"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { MOCK_ORDERS } from "@/lib/mockOrders";
import { formatPrice, formatDate } from "@/lib/utils";
import { StatusBadge, PAYMENT_LABELS } from "@/lib/adminUi";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");

  const users = useMemo(
    () =>
      MOCK_ORDERS.map((order) => ({
        id: order.id,
        name: order.customerName,
        email: order.customerEmail,
        paymentMethod: order.paymentMethod,
        purchaseDate: order.createdAt,
        status: order.status,
        amount: order.amount,
      })),
    []
  );

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, search]);

  const totalRevenue = users.reduce((sum, u) => sum + u.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-900">Customers</h2>
          <span className="rounded-full bg-indigo-600 px-3 py-1 text-sm font-medium text-white">
            {filteredUsers.length}
          </span>
        </div>
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total customers</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total revenue</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {formatPrice(totalRevenue)}
          </p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Avg order value</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {formatPrice(29.99)}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Payment Method</th>
                <th className="px-6 py-3">Purchase Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                        {getInitials(user.name)}
                      </div>
                      <span className="font-medium text-gray-900">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {PAYMENT_LABELS[user.paymentMethod]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatDate(user.purchaseDate)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-900">
                    {formatPrice(user.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
