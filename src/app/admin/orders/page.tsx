"use client";

import { useState } from "react";
import {
  Search,
  Eye,
  CheckCircle,
  X,
} from "lucide-react";
import { MOCK_ORDERS } from "@/lib/mockOrders";
import { formatPrice, formatDate } from "@/lib/utils";
import { StatusBadge, PAYMENT_LABELS } from "@/lib/adminUi";
import type { Order } from "@/types";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === "paid";
    return matchesSearch && matchesStatus;
  });

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...updates } : o))
    );
    setSelectedOrder((prev) =>
      prev?.id === id ? { ...prev, ...updates } : prev
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-900">Orders</h2>
          <span className="rounded-full bg-indigo-600 px-3 py-1 text-sm font-medium text-white">
            {filteredOrders.length}
          </span>
        </div>
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setStatusFilter("all")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            statusFilter === "all"
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter("paid")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            statusFilter === "paid"
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          Paid
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Payment Method</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                  <td className="px-6 py-4 font-medium">{order.customerName}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {order.customerEmail}
                  </td>
                  <td className="px-6 py-4">
                    {PAYMENT_LABELS[order.paymentMethod]}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-900">
                    {formatPrice(order.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
                        aria-label="View order"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {order.status === "pending" && (
                        <button
                          type="button"
                          onClick={() =>
                            updateOrder(order.id, { status: "paid" })
                          }
                          className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                          aria-label="Mark as paid"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-bold text-gray-900">Order Details</h3>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-1 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="font-mono text-sm text-gray-600">
                {selectedOrder.id}
              </span>
              <StatusBadge status={selectedOrder.status} />
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">Customer</dt>
                <dd className="font-medium text-gray-900">
                  {selectedOrder.customerName}
                </dd>
                <dd className="text-gray-600">{selectedOrder.customerEmail}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Payment</dt>
                <dd className="font-medium text-gray-900">
                  {PAYMENT_LABELS[selectedOrder.paymentMethod]} —{" "}
                  {formatPrice(selectedOrder.amount)}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Created</dt>
                <dd className="text-gray-900">
                  {formatDate(selectedOrder.createdAt)}
                </dd>
              </div>
              {selectedOrder.downloadToken && (
                <div>
                  <dt className="text-gray-500">Download token</dt>
                  <dd className="font-mono text-xs text-gray-800">
                    {selectedOrder.downloadToken}
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedOrder.status === "pending" && (
                <button
                  type="button"
                  onClick={() =>
                    updateOrder(selectedOrder.id, { status: "paid" })
                  }
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Mark as Paid
                </button>
              )}
              {selectedOrder.status === "paid" && (
                <button
                  type="button"
                  onClick={() => alert("Email sent!")}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  Send Download Link
                </button>
              )}
              {selectedOrder.status !== "refunded" && (
                <button
                  type="button"
                  onClick={() =>
                    updateOrder(selectedOrder.id, { status: "refunded" })
                  }
                  className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Mark as Refunded
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
