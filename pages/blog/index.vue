<script setup lang="ts">
import { LOCAL_BLOG_POSTS, type BlogPost } from "~/utils/blogData";

useSeoMeta({
  title: "Journal — AKSE",
  description:
    "Insights on heritage-tech design, cinematic web experiences, and the intersection of tradition and technology.",
  ogTitle: "Journal — AKSE",
  ogDescription:
    "Insights on digital heritage, immersive storytelling, and heritage-tech design.",
});

const activeCategory = ref("all");

const {
  data: posts,
  pending,
  error,
} = await useAsyncData<BlogPost[]>("blog-posts", async () => LOCAL_BLOG_POSTS);

// Featured post = first one marked featured, or the latest
const featured = computed<BlogPost | null>(() => {
  const list = posts.value || [];
  return list.find((p) => p.featured) || list[0] || null;
});

// Unique categories for filter chips
const categories = computed(() => {
  const list = posts.value || [];
  const cats = [...new Set(list.map((p) => p.category).filter(Boolean))] as string[];
  return cats;
});

// Filtered posts (excluding featured)
const filteredPosts = computed(() => {
  const list = (posts.value || []).filter(
    (p) => p._id !== featured.value?._id
  );
  if (activeCategory.value === "all") return list;
  return list.filter(
    (p) =>
      (p.category || "").toLowerCase().replace(/\s+/g, "-") ===
      activeCategory.value
  );
});

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function categorySlug(cat: string) {
  return cat.toLowerCase().replace(/\s+/g, "-");
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden pb-12 pt-32 md:pb-20 md:pt-40">
      <div class="mx-auto max-w-7xl px-6">
        <p
          class="text-xs font-semibold uppercase tracking-[0.25em] text-primary"
        >
          Journal
        </p>
        <h1
          class="mt-3 max-w-2xl text-4xl font-light leading-tight tracking-tight text-foreground md:text-6xl"
        >
          Insights on Digital Heritage &amp; Immersive Storytelling
        </h1>
        <p
          class="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Exploring the intersection of tradition and technology — from motion
          design philosophy to heritage preservation techniques.
        </p>
      </div>
    </section>

    <!-- Featured Post -->
    <section
      v-if="featured"
      class="mx-auto max-w-7xl px-6 pb-16"
    >
      <NuxtLink
        :to="`/blog/${featured.slug.current}`"
        class="group grid grid-cols-1 gap-6 overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-xl md:grid-cols-2 md:gap-0"
      >
        <!-- Image -->
        <div class="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[380px]">
          <img
            v-if="featured.mainImage"
            :src="featured.mainImage"
            :alt="featured.title"
            loading="lazy"
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            v-else
            class="flex h-full w-full items-center justify-center bg-muted text-muted-foreground"
          >
            <span class="text-sm">No image</span>
          </div>
          <!-- Featured badge -->
          <div
            class="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-primary-foreground"
          >
            Featured
          </div>
        </div>
        <!-- Content -->
        <div class="flex flex-col justify-center p-6 md:p-10">
          <div class="flex items-center gap-3">
            <span
              v-if="featured.category"
              class="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary"
            >
              {{ featured.category }}
            </span>
            <span class="text-xs text-muted-foreground">
              {{ formatDate(featured.publishedAt) }}
            </span>
          </div>
          <h2
            class="mt-3 text-2xl font-medium leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary md:text-3xl"
          >
            {{ featured.title }}
          </h2>
          <p
            v-if="featured.excerpt"
            class="mt-3 line-clamp-3 text-base leading-relaxed text-muted-foreground"
          >
            {{ featured.excerpt }}
          </p>
          <div class="mt-6">
            <span
              class="inline-flex items-center gap-2 text-sm font-medium text-primary transition-all group-hover:gap-3"
            >
              Read Article
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </NuxtLink>
    </section>

    <!-- Category Filter -->
    <section class="mx-auto max-w-7xl px-6 pb-10">
      <div class="flex flex-wrap items-center gap-2">
        <button
          :class="[
            'rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-all',
            activeCategory === 'all'
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
          ]"
          @click="activeCategory = 'all'"
        >
          All
        </button>
        <button
          v-for="cat in categories"
          :key="cat"
          :class="[
            'rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-all',
            activeCategory === categorySlug(cat)
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
          ]"
          @click="activeCategory = categorySlug(cat)"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- Loading / Error -->
    <div v-if="pending" class="py-20 text-center text-muted-foreground">
      Loading posts…
    </div>
    <div v-else-if="error" class="py-20 text-center text-muted-foreground">
      Error loading posts.
    </div>

    <!-- Empty state -->
    <div
      v-else-if="!filteredPosts.length && !featured"
      class="mx-auto max-w-7xl px-6 py-20 text-center"
    >
      <p class="text-lg text-muted-foreground">
        No blog posts published yet. Check back soon.
      </p>
    </div>

    <!-- Blog Grid -->
    <section
      v-else-if="filteredPosts.length"
      class="mx-auto max-w-7xl px-6 pb-20"
    >
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="post in filteredPosts"
          :key="post._id"
          :to="`/blog/${post.slug.current}`"
          class="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg"
        >
          <!-- Image -->
          <div class="relative aspect-[16/10] overflow-hidden">
            <img
              v-if="post.mainImage"
              :src="post.mainImage"
              :alt="post.title"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              v-else
              class="flex h-full w-full items-center justify-center bg-muted text-muted-foreground"
            >
              <span class="text-sm">No image</span>
            </div>
          </div>
          <!-- Content -->
          <div class="flex flex-1 flex-col p-5">
            <div class="flex items-center gap-3">
              <span
                v-if="post.category"
                class="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary"
              >
                {{ post.category }}
              </span>
              <span class="text-[11px] text-muted-foreground">
                {{ formatDate(post.publishedAt) }}
              </span>
            </div>
            <h3
              class="mt-2 text-lg font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary"
            >
              {{ post.title }}
            </h3>
            <p
              v-if="post.excerpt"
              class="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground"
            >
              {{ post.excerpt }}
            </p>
            <div class="mt-auto pt-4">
              <span
                class="inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-all group-hover:gap-2.5"
              >
                Read more
                <svg
                  class="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="border-t border-border bg-card py-20">
      <div class="mx-auto max-w-7xl px-6 text-center">
        <h2
          class="text-2xl font-light tracking-tight text-foreground md:text-3xl"
        >
          Have a heritage site to preserve?
        </h2>
        <p class="mt-3 text-base text-muted-foreground">
          Let's craft an immersive digital experience together.
        </p>
        <NuxtLink
          to="/commercial"
          class="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
        >
          Start a Project
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
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
