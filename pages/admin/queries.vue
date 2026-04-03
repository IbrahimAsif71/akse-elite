<script setup lang="ts">
import { useQueries, type Query } from "~/composables/useQueries";

definePageMeta({
  layout: "admin",
});

useSeoMeta({
  title: "Queries — AKSE Admin",
  robots: "noindex, nofollow",
});

const { isAuthenticated } = useAdminAuth();
if (!isAuthenticated.value) {
  navigateTo("/admin");
}

const { getAll, markRead, markAllRead, deleteQuery } = useQueries();

const queries = ref<Query[]>([]);
const loading = ref(true);
const filter = ref<"all" | "unread" | "commercial" | "contact">("all");
const expandedId = ref<string | null>(null);

onMounted(async () => {
  queries.value = await getAll();
  loading.value = false;
});

const filtered = computed(() => {
  return queries.value.filter((q) => {
    if (filter.value === "unread") return !q.read;
    if (filter.value === "commercial") return q.source === "commercial";
    if (filter.value === "contact") return q.source === "contact";
    return true;
  });
});

const unreadCount = computed(() => queries.value.filter((q) => !q.read).length);

async function toggleExpand(id: string) {
  if (expandedId.value === id) {
    expandedId.value = null;
  } else {
    expandedId.value = id;
    const q = queries.value.find((q) => q.id === id);
    if (q && !q.read) {
      await markRead(id);
      q.read = true;
    }
  }
}

async function handleMarkAllRead() {
  await markAllRead();
  queries.value = queries.value.map((q) => ({ ...q, read: true }));
}

async function handleDelete(id: string) {
  await deleteQuery(id);
  queries.value = queries.value.filter((q) => q.id !== id);
  if (expandedId.value === id) expandedId.value = null;
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-light tracking-tight text-white/90 md:text-3xl">
          Queries
          <span
            v-if="unreadCount > 0"
            class="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#c9653d] text-[11px] font-bold text-white"
          >{{ unreadCount }}</span>
        </h1>
        <p class="mt-1 text-sm text-white/40">Form submissions from visitors</p>
      </div>

      <button
        v-if="unreadCount > 0"
        @click="handleMarkAllRead"
        class="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white/80"
      >
        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        Mark all as read
      </button>
    </div>

    <!-- Filter tabs -->
    <div class="flex gap-1 rounded-xl border border-white/8 bg-white/[0.03] p-1 w-fit">
      <button
        v-for="tab in [
          { key: 'all', label: 'All' },
          { key: 'unread', label: 'Unread' },
          { key: 'commercial', label: 'Commercial' },
          { key: 'contact', label: 'Contact' },
        ]"
        :key="tab.key"
        @click="filter = tab.key as typeof filter"
        class="rounded-lg px-4 py-1.5 text-xs font-medium transition-all"
        :class="filter === tab.key
          ? 'bg-white/10 text-white'
          : 'text-white/40 hover:text-white/60'"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="space-y-2">
      <div
        v-for="i in 3"
        :key="i"
        class="h-20 animate-pulse rounded-xl border border-white/8 bg-white/[0.02]"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="filtered.length === 0"
      class="flex flex-col items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] py-24 text-center"
    >
      <div class="flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
        <svg class="h-6 w-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
        </svg>
      </div>
      <p class="mt-4 text-sm font-medium text-white/40">No queries yet</p>
      <p class="mt-1 text-xs text-white/20">
        {{ filter === 'all' ? 'Submissions from your forms will appear here.' : 'No queries match this filter.' }}
      </p>
    </div>

    <!-- Query list -->
    <div v-else class="space-y-2">
      <div
        v-for="query in filtered"
        :key="query.id"
        class="overflow-hidden rounded-xl border transition-all"
        :class="query.read
          ? 'border-white/8 bg-white/[0.02]'
          : 'border-[#c9653d]/30 bg-[#c9653d]/[0.04]'"
      >
        <!-- Row header -->
        <button
          class="flex w-full items-start gap-4 p-5 text-left"
          @click="toggleExpand(query.id)"
        >
          <!-- Unread dot -->
          <div class="mt-1 flex-shrink-0">
            <div
              class="h-2 w-2 rounded-full transition-all"
              :class="query.read ? 'bg-white/10' : 'bg-[#c9653d]'"
            />
          </div>

          <!-- Content -->
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-medium text-white/80 truncate">{{ query.name }}</span>
              <span
                class="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                :class="query.source === 'commercial'
                  ? 'bg-[#2c7a83]/20 text-[#2c7a83]'
                  : 'bg-white/10 text-white/40'"
              >{{ query.source }}</span>
            </div>
            <p class="mt-0.5 text-sm text-white/40 truncate">{{ query.email }}</p>
            <p class="mt-1 line-clamp-1 text-sm text-white/30">{{ query.message }}</p>
          </div>

          <!-- Meta -->
          <div class="ml-auto flex-shrink-0 text-right">
            <p class="text-xs text-white/30">{{ formatDate(query.submitted_at) }}</p>
            <svg
              class="ml-auto mt-2 h-4 w-4 text-white/20 transition-transform"
              :class="expandedId === query.id ? 'rotate-180' : ''"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </button>

        <!-- Expanded detail -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="expandedId === query.id" class="border-t border-white/8 px-5 pb-5 pt-4">
            <div class="grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <p class="text-[11px] font-semibold uppercase tracking-widest text-white/25">Name</p>
                <p class="mt-1 text-white/70">{{ query.name }}</p>
              </div>
              <div>
                <p class="text-[11px] font-semibold uppercase tracking-widest text-white/25">Email</p>
                <a
                  :href="`mailto:${query.email}`"
                  class="mt-1 block text-[#c9653d] hover:underline"
                >{{ query.email }}</a>
              </div>
              <div v-if="query.company">
                <p class="text-[11px] font-semibold uppercase tracking-widest text-white/25">Company</p>
                <p class="mt-1 text-white/70">{{ query.company }}</p>
              </div>
              <div v-if="query.space_type">
                <p class="text-[11px] font-semibold uppercase tracking-widest text-white/25">Space Type</p>
                <p class="mt-1 text-white/70">{{ query.space_type }}</p>
              </div>
            </div>

            <div class="mt-4">
              <p class="text-[11px] font-semibold uppercase tracking-widest text-white/25">Message</p>
              <p class="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/60">{{ query.message }}</p>
            </div>

            <div class="mt-5 flex items-center justify-between">
              <a
                :href="`mailto:${query.email}?subject=Re:%20Your%20Inquiry`"
                class="inline-flex items-center gap-2 rounded-lg bg-[#c9653d]/15 px-4 py-2 text-sm font-medium text-[#c9653d] transition-colors hover:bg-[#c9653d]/25"
              >
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                Reply via Email
              </a>

              <button
                @click.stop="handleDelete(query.id)"
                class="inline-flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-400/60 transition-colors hover:border-red-500/40 hover:text-red-400"
              >
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
