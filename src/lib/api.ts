const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"

export interface CreateOrderPayload {
  customer_name: string
  customer_email: string
  payment_method: "card" | "crypto" | "click" | "payme"
}

export interface OrderResponse {
  id: string
  customer_name: string
  customer_email: string
  amount: number
  status: string
  payment_method: string
  created_at: string
  download_token?: string
}

export async function createOrder(payload: CreateOrderPayload): Promise<OrderResponse> {
  const res = await fetch(`${API_URL}/api/orders/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || "Failed to create order")
  }
  return res.json()
}

export async function getOrder(orderId: string): Promise<OrderResponse> {
  const res = await fetch(`${API_URL}/api/orders/${orderId}`)
  if (!res.ok) throw new Error("Order not found")
  return res.json()
}

export async function adminLogin(email: string, password: string): Promise<string> {
  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error("Invalid credentials")
  const data = await res.json()
  return data.access_token
}

export async function adminGetOrders(token: string): Promise<OrderResponse[]> {
  const res = await fetch(`${API_URL}/api/admin/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Unauthorized")
  return res.json()
}

export async function adminGetStats(token: string) {
  const res = await fetch(`${API_URL}/api/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Unauthorized")
  return res.json()
}

export async function adminUpdateStatus(
  token: string,
  orderId: string,
  status: string
) {
  const res = await fetch(`${API_URL}/api/admin/orders/${orderId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error("Failed to update")
  return res.json()
}

export async function adminSendEmail(token: string, orderId: string) {
  const res = await fetch(`${API_URL}/api/admin/orders/${orderId}/send-email`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Failed to send email")
  return res.json()
}
