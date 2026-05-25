import type { Order } from "@/types";

export function StatusBadge({ status }: { status: Order["status"] }) {
  const styles: Record<Order["status"], string> = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    refunded: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export const PAYMENT_LABELS: Record<Order["paymentMethod"], string> = {
  card: "Card",
  crypto: "Crypto",
  click: "Click",
  payme: "Payme",
};
