// Runs client-side only (before any page guard executes).
// Restores admin auth state from localStorage so reloads don't log the admin out.
export default defineNuxtPlugin(() => {
  const { isAuthenticated } = useAdminAuth();
  if (localStorage.getItem("akse_admin_auth") === "true") {
    isAuthenticated.value = true;
  }
});
