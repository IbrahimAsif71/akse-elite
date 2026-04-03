<script setup lang="ts">
import { useQueries } from "~/composables/useQueries";

const route = useRoute();
const { isAuthenticated, logout } = useAdminAuth();
const { unreadCount } = useQueries();

const sidebarOpen = ref(false);
const queriesUnread = ref(0);

onMounted(async () => {
  queriesUnread.value = await unreadCount();
});

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: "grid" },
  { label: "Queries", to: "/admin/queries", icon: "mail" },
];

function isActive(to: string) {
  return route.path === to;
}

// Kill Lenis smooth scroll on admin pages — use normal native scroll
onMounted(() => {
  const html = document.documentElement;
  html.classList.remove("lenis", "lenis-smooth", "lenis-stopped");
  html.style.overflow = "auto";
  document.body.style.overflow = "auto";
});

onUnmounted(() => {
  const html = document.documentElement;
  html.style.overflow = "";
  document.body.style.overflow = "";
  html.classList.add("lenis", "lenis-smooth");
});
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-[#1a1714] text-[#f3ebdf]">
    <!-- Mobile sidebar backdrop -->
    <Transition name="fade">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        @click="sidebarOpen = false"
      />
    </Transition>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/8 bg-[#141210] transition-transform duration-300 md:relative md:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <!-- Logo -->
      <div class="flex h-16 items-center gap-3 border-b border-white/8 px-5">
        <img src="/akse.png" alt="AKSE" class="h-6 w-auto" />
        <span
          class="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40"
          >Admin</span
        >
      </div>

      <!-- Nav -->
      <nav class="mt-4 flex flex-1 flex-col gap-1 px-3">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
          :class="
            isActive(item.to)
              ? 'bg-white/10 text-white'
              : 'text-white/50 hover:bg-white/5 hover:text-white/80'
          "
          @click="sidebarOpen = false"
        >
          <!-- Dashboard icon -->
          <svg
            v-if="item.icon === 'grid'"
            class="h-4 w-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          <!-- Queries icon -->
          <svg
            v-else-if="item.icon === 'mail'"
            class="h-4 w-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
          </svg>
          <span class="flex-1">{{ item.label }}</span>
          <span
            v-if="item.icon === 'mail' && queriesUnread > 0"
            class="ml-auto flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-[#c9653d] px-1 text-[10px] font-bold text-white leading-none"
          >{{ queriesUnread }}</span>
        </NuxtLink>
      </nav>

      <!-- Bottom actions -->
      <div class="border-t border-white/8 p-3 space-y-1">
        <NuxtLink
          to="/"
          class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-white/80"
        >
          <svg
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Site
        </NuxtLink>
        <button
          class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-red-400"
          @click="logout"
        >
          <svg
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Top bar -->
      <header
        class="flex h-16 items-center gap-4 border-b border-white/8 px-6"
      >
        <button
          class="inline-flex items-center justify-center rounded-lg p-2 text-white/50 hover:bg-white/5 hover:text-white md:hidden"
          @click="sidebarOpen = !sidebarOpen"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>

        <div class="flex-1" />

        <div
          class="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
            />
            <span
              class="relative inline-flex h-2 w-2 rounded-full bg-green-500"
            />
          </span>
          <span class="text-xs font-medium text-white/60">Live Data</span>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-6 md:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
