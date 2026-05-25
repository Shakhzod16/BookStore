export const ADMIN_CREDENTIALS = {
  email: "admin@learnbooks.com",
  password: "admin123",
};

export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("adminToken") === "learnbooks-admin-2024";
}

export function adminLogin(email: string, password: string): boolean {
  if (
    email === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  ) {
    localStorage.setItem("adminToken", "learnbooks-admin-2024");
    return true;
  }
  return false;
}

export function adminLogout(): void {
  localStorage.removeItem("adminToken");
}
