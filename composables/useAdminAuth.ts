const ADMIN_PASSWORD = "akse2026";
const STORAGE_KEY = "akse_admin_auth";

export function useAdminAuth() {
  // Initial value is always false on SSR.
  // The admin-auth.client.ts plugin restores it from localStorage before any page guard runs.
  const isAuthenticated = useState<boolean>("admin-auth", () => false);
  const error = useState<string>("admin-auth-error", () => "");

  function login(password: string): boolean {
    if (password === ADMIN_PASSWORD) {
      isAuthenticated.value = true;
      error.value = "";
      if (import.meta.client) {
        localStorage.setItem(STORAGE_KEY, "true");
      }
      return true;
    }
    error.value = "Invalid password. Please try again.";
    return false;
  }

  function logout() {
    isAuthenticated.value = false;
    error.value = "";
    if (import.meta.client) {
      localStorage.removeItem(STORAGE_KEY);
    }
    navigateTo("/admin");
  }

  return { isAuthenticated, error, login, logout };
}
