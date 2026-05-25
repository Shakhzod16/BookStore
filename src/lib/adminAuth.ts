export const ADMIN_CREDENTIALS = {
  email: "admin@learnbooks.com",
  password: "admin123",
};

export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("adminToken");
  return !!token && token.length > 10;
}

export function adminLogout(): void {
  localStorage.removeItem("adminToken");
}
