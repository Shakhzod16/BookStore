"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, ShoppingBag, Check, Clock } from "lucide-react";
import {
  adminGetStats,
  adminGetOrders,
  type OrderResponse,
} from "@/lib/api";
import { MOCK_ORDERS } from "@/lib/mockOrders";
import { formatPrice, formatDate } from "@/lib/utils";
import { StatusBadge, PAYMENT_LABELS } from "@/lib/adminUi";
import type { Order } from "@/types";

interface AdminStats {
  total_orders: number;
  total_revenue: number;
  paid_orders: number;
  pending_orders: number;
  delivered_orders: number;
}

function mapOrder(o: OrderResponse): Order {
  return {
    id: o.id,
    customerName: o.customer_name,
    customerEmail: o.customer_email,
    amount: o.amount,
    status: o.status as Order["status"],
    paymentMethod: o.payment_method as Order["paymentMethod"],
    createdAt:
      typeof o.created_at === "string"
        ? o.created_at
        : new Date(o.created_at).toISOString(),
    downloadToken: o.download_token,
  };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLoading(false);
      return;
    }

    let statsLoaded = false;
    let ordersLoaded = false;

    const finishLoading = () => {
      if (statsLoaded && ordersLoaded) setLoading(false);
    };

    adminGetStats(token)
      .then(setStats)
      .catch(console.error)
      .finally(() => {
        statsLoaded = true;
        finishLoading();
      });

    adminGetOrders(token)
      .then((data) => setOrders(data.map(mapOrder).slice(0, 5)))
      .catch(console.error)
      .finally(() => {
        ordersLoaded = true;
        finishLoading();
      });
  }, []);

  const paidOrDeliveredMock = MOCK_ORDERS.filter(
    (o) => o.status === "paid" || o.status === "delivered"
  );
  const pendingCountMock = MOCK_ORDERS.filter(
    (o) => o.status === "pending"
  ).length;
  const totalRevenueMock = paidOrDeliveredMock.reduce(
    (sum, o) => sum + o.amount,
    0
  );

  const paymentCounts = (orders.length > 0 ? orders : MOCK_ORDERS).reduce(
    (acc, o) => {
      acc[o.paymentMethod] = (acc[o.paymentMethod] ?? 0) + 1;
      return acc;
    },
    {} as Record<Order["paymentMethod"], number>
  );
  const mostUsedPayment = Object.entries(paymentCounts).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const today = new Date().toDateString();
  const sourceOrders = orders.length > 0 ? orders : MOCK_ORDERS;
  const todayRevenue = sourceOrders
    .filter(
      (o) =>
        new Date(o.createdAt).toDateString() === today &&
        (o.status === "paid" || o.status === "delivered")
    )
    .reduce((sum, o) => sum + o.amount, 0);

  const recentOrders =
    orders.length > 0
      ? orders
      : [...MOCK_ORDERS]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          )
          .slice(0, 5);

  const paidCount =
    stats != null
      ? stats.paid_orders + stats.delivered_orders
      : paidOrDeliveredMock.length;

  const statCards = [
    {
      label: "Total Revenue",
      value: formatPrice(stats?.total_revenue ?? totalRevenueMock),
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Total Orders",
      value: String(stats?.total_orders ?? MOCK_ORDERS.length),
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Paid Orders",
      value: String(paidCount),
      icon: Check,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Pending Orders",
      value: String(stats?.pending_orders ?? pendingCountMock),
      icon: Clock,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              {loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="h-8 w-20 rounded bg-gray-200" />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="mt-2 text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl bg-white p-4 shadow-sm"
              >
                <div className="h-4 w-32 rounded bg-gray-200" />
                <div className="mt-2 h-6 w-24 rounded bg-gray-200" />
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-500">Most used payment</p>
              <p className="mt-1 font-semibold text-gray-900">
                {mostUsedPayment
                  ? PAYMENT_LABELS[
                      mostUsedPayment[0] as Order["paymentMethod"]
                    ]
                  : "—"}
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-500">Today&apos;s revenue</p>
              <p className="mt-1 font-semibold text-gray-900">
                {formatPrice(todayRevenue)}
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-500">Conversion rate</p>
              <p className="mt-1 font-semibold text-gray-900">87%</p>
            </div>
          </>
        )}
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Method</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((__, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 animate-pulse rounded bg-gray-200" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {order.customerName}
                    </td>
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
                    <td className="px-6 py-4 font-medium">
                      {formatPrice(order.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
