const ADMIN_PASSWORD = "akse2026";

export function useAdminAuth() {
  const isAuthenticated = useState<boolean>("admin-auth", () => false);
  const error = useState<string>("admin-auth-error", () => "");

  function login(password: string): boolean {
    if (password === ADMIN_PASSWORD) {
      isAuthenticated.value = true;
      error.value = "";
      return true;
    }
    error.value = "Invalid password. Please try again.";
    return false;
  }

  function logout() {
    isAuthenticated.value = false;
    error.value = "";
    navigateTo("/admin");
  }

  return { isAuthenticated, error, login, logout };
}
