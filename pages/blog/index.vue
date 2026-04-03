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

// ─── Photo Gallery ────────────────────────────────────────────────────────────
const galleryPhotos = [
  { src: "/golra.jpeg",   location: "Golra Railway Station",  year: "2024" },
  { src: "/image1.jpeg",  location: "Dome Restaurant",        year: "2024" },
  { src: "/image2.jpeg",  location: "Dome Restaurant",        year: "2024" },
  { src: "/saidpur.jpeg", location: "Saidpur Village",        year: "2024" },
  { src: "/image3.jpeg",  location: "Dome Restaurant",        year: "2024" },
  { src: "/image4.jpeg",  location: "Saidpur Village",        year: "2024" },
  { src: "/image5.jpeg",  location: "Heritage Archive",       year: "2024" },
  { src: "/image6.jpeg",  location: "Saidpur Village",        year: "2024" },
  { src: "/image7.jpeg",  location: "Heritage Archive",       year: "2024" },
  { src: "/image8.jpeg",  location: "Heritage Archive",       year: "2024" },
  { src: "/dome.jpeg",    location: "Dome Restaurant",        year: "2024" },
  { src: "/image9.jpeg",  location: "Heritage Archive",       year: "2024" },
  { src: "/image10.jpeg", location: "Heritage Archive",       year: "2024" },
  { src: "/image11.jpeg", location: "Heritage Archive",       year: "2024" },
  { src: "/image12.jpeg", location: "Heritage Archive",       year: "2024" },
  { src: "/serena.jpeg",  location: "Serena Hotel",           year: "2024" },
];

const lightboxIndex = ref<number | null>(null);
const lightboxVisible = computed(() => lightboxIndex.value !== null);
const lightboxPhoto = computed(() =>
  lightboxIndex.value !== null ? galleryPhotos[lightboxIndex.value] : null
);

function openLightbox(i: number) {
  lightboxIndex.value = i;
}
function closeLightbox() {
  lightboxIndex.value = null;
}
function prevPhoto() {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value =
    (lightboxIndex.value - 1 + galleryPhotos.length) % galleryPhotos.length;
}
function nextPhoto() {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value = (lightboxIndex.value + 1) % galleryPhotos.length;
}

// Keyboard navigation for lightbox
onMounted(() => {
  window.addEventListener("keydown", handleKey);
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleKey);
});
function handleKey(e: KeyboardEvent) {
  if (!lightboxVisible.value) return;
  if (e.key === "ArrowRight") nextPhoto();
  else if (e.key === "ArrowLeft") prevPhoto();
  else if (e.key === "Escape") closeLightbox();
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

    <!-- ─── Photo Archives Gallery ──────────────────────────────────────────── -->
    <section class="mx-auto max-w-7xl px-6 pb-24 pt-4">
      <!-- Section header -->
      <div class="mb-10 flex items-end justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Archives</p>
          <h2 class="mt-2 text-3xl font-light tracking-tight text-foreground md:text-4xl">
            Photo Gallery
          </h2>
          <p class="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Behind-the-scenes captures from our virtual tour productions across Pakistan's heritage sites.
          </p>
        </div>
        <span class="hidden text-xs text-muted-foreground sm:block">
          {{ galleryPhotos.length }} photographs
        </span>
      </div>

      <!-- Masonry grid -->
      <div class="columns-2 gap-3 sm:columns-3 lg:columns-4">
        <div
          v-for="(photo, i) in galleryPhotos"
          :key="i"
          class="group relative mb-3 cursor-zoom-in overflow-hidden rounded-xl break-inside-avoid"
          @click="openLightbox(i)"
        >
          <img
            :src="photo.src"
            :alt="photo.location"
            loading="lazy"
            class="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <!-- Hover overlay -->
          <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-3">
            <p class="text-xs font-semibold text-white/90 leading-tight">{{ photo.location }}</p>
            <p class="text-[10px] text-white/50">{{ photo.year }}</p>
          </div>
          <!-- Expand icon -->
          <div class="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <svg class="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Lightbox ──────────────────────────────────────────────────────────── -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="lightboxVisible && lightboxPhoto"
          class="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 backdrop-blur-md"
          @click.self="closeLightbox"
        >
          <!-- Close -->
          <button
            class="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            @click="closeLightbox"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Prev -->
          <button
            class="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            @click="prevPhoto"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Image -->
          <div class="flex max-h-[85vh] max-w-[90vw] flex-col items-center gap-4">
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              mode="out-in"
            >
              <img
                :key="lightboxIndex ?? -1"
                :src="lightboxPhoto.src"
                :alt="lightboxPhoto.location"
                class="max-h-[78vh] max-w-[88vw] rounded-xl object-contain shadow-2xl"
              />
            </Transition>
            <div class="flex items-center gap-3 text-center">
              <p class="text-sm font-medium text-white/80">{{ lightboxPhoto.location }}</p>
              <span class="text-white/30">·</span>
              <p class="text-xs text-white/40">{{ lightboxPhoto.year }}</p>
              <span class="text-white/30">·</span>
              <p class="text-xs text-white/30">
                {{ (lightboxIndex ?? 0) + 1 }} / {{ galleryPhotos.length }}
              </p>
            </div>
          </div>

          <!-- Next -->
          <button
            class="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            @click="nextPhoto"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>

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

