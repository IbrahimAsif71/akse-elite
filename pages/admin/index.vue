<script setup lang="ts">
definePageMeta({
  layout: false,
});

useSeoMeta({
  title: "Admin — AKSE",
  robots: "noindex, nofollow",
});

const { isAuthenticated, error: authError, login } = useAdminAuth();
const passwordInput = ref("");
const isLoading = ref(false);

// If already authenticated, redirect to dashboard
if (isAuthenticated.value) {
  navigateTo("/admin/dashboard");
}

async function handleSubmit() {
  isLoading.value = true;
  // Simulate a tiny delay for UX feel
  await new Promise((r) => setTimeout(r, 400));
  const success = login(passwordInput.value);
  isLoading.value = false;
  if (success) {
    navigateTo("/admin/dashboard");
  }
}
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center bg-[#1a1714] px-4"
  >
    <!-- Ambient glow -->
    <div
      class="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
      style="
        background: radial-gradient(
          circle,
          rgba(201, 101, 61, 0.3) 0%,
          transparent 70%
        );
      "
    />

    <div class="relative w-full max-w-sm">
      <!-- Logo -->
      <div class="mb-10 flex flex-col items-center">
        <img src="/akse.png" alt="AKSE" class="mb-4 h-8 w-auto" />
        <span
          class="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30"
          >Admin Console</span
        >
      </div>

      <!-- Login Card -->
      <form
        class="rounded-2xl border border-white/8 bg-[#141210] p-8 shadow-2xl"
        @submit.prevent="handleSubmit"
      >
        <h1 class="mb-1 text-xl font-light tracking-tight text-white/90">
          Welcome back
        </h1>
        <p class="mb-8 text-sm text-white/40">
          Enter your password to access the dashboard.
        </p>

        <!-- Password input -->
        <div class="relative mb-4">
          <label class="sr-only" for="admin-password">Password</label>
          <div class="relative">
            <svg
              class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <input
              id="admin-password"
              v-model="passwordInput"
              type="password"
              placeholder="Password"
              autocomplete="current-password"
              class="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#c9653d]/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-[#c9653d]/30"
              :class="{ 'border-red-500/50': authError }"
            />
          </div>
        </div>

        <!-- Error message -->
        <Transition name="slide-fade">
          <p
            v-if="authError"
            class="mb-4 flex items-center gap-2 text-xs text-red-400"
          >
            <svg
              class="h-3.5 w-3.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {{ authError }}
          </p>
        </Transition>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading || !passwordInput"
          class="relative w-full overflow-hidden rounded-xl bg-[#c9653d] py-3 text-sm font-medium text-white transition-all hover:bg-[#b5572f] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span
            :class="{ 'opacity-0': isLoading }"
            class="transition-opacity"
          >
            Sign In
          </span>
          <!-- Loading spinner -->
          <span
            v-if="isLoading"
            class="absolute inset-0 flex items-center justify-center"
          >
            <svg
              class="h-5 w-5 animate-spin text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          </span>
        </button>
      </form>

      <p class="mt-6 text-center text-[11px] text-white/20">
        AKSE Studio &middot; Internal Use Only
      </p>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}
.slide-fade-enter-from {
  transform: translateY(-4px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-4px);
  opacity: 0;
}
</style>
