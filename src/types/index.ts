export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: "pending" | "paid" | "delivered" | "refunded";
  paymentMethod: "crypto" | "card" | "click" | "payme";
  createdAt: string;
  downloadToken?: string;
}

export interface AdminUser {
  email: string;
  password: string;
}
