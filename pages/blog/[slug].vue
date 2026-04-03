<script setup lang="ts">
import { LOCAL_BLOG_POSTS } from "~/utils/blogData";

const route = useRoute();
const slug = route.params.slug as string;

const {
  data: post,
  pending,
  error,
} = await useAsyncData(`blog-${slug}`, async () => {
  const found = LOCAL_BLOG_POSTS.find((p) => p.slug.current === slug);
  return found || null;
});

// 404 if not found
if (!pending.value && !post.value) {
  throw createError({ statusCode: 404, statusMessage: "Post not found" });
}

useHead(() => ({
  title: post.value?.title ? `${post.value.title} — AKSE` : "Blog — AKSE",
  meta: [
    {
      name: "description",
      content: post.value?.excerpt || "Blog post on AKSE Journal.",
    },
    {
      property: "og:title",
      content: post.value?.title || "AKSE Journal",
    },
    {
      property: "og:description",
      content: post.value?.excerpt || "Blog post on AKSE Journal.",
    },
  ],
}));

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Gallery / lightbox ───────────────────────────────────────────────────────
const lightboxIndex = ref<number | null>(null);
const lightboxVisible = computed(() => lightboxIndex.value !== null);
const lightboxPhoto = computed(() =>
  lightboxIndex.value !== null
    ? post.value?.gallery?.[lightboxIndex.value]
    : null
);
const galleryLength = computed(() => post.value?.gallery?.length ?? 0);

function openLightbox(i: number) { lightboxIndex.value = i; }
function closeLightbox()        { lightboxIndex.value = null; }
function prevPhoto() {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value = (lightboxIndex.value - 1 + galleryLength.value) % galleryLength.value;
}
function nextPhoto() {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value = (lightboxIndex.value + 1) % galleryLength.value;
}

onMounted(() => window.addEventListener("keydown", onKey));
onUnmounted(() => window.removeEventListener("keydown", onKey));
function onKey(e: KeyboardEvent) {
  if (!lightboxVisible.value) return;
  if (e.key === "ArrowRight") nextPhoto();
  else if (e.key === "ArrowLeft") prevPhoto();
  else if (e.key === "Escape") closeLightbox();
}
</script>

<template>
  <div>
    <!-- Loading -->
    <div
      v-if="pending"
      class="flex min-h-[60vh] items-center justify-center text-muted-foreground"
    >
      <span class="animate-pulse text-sm uppercase tracking-widest"
        >Loading…</span
      >
    </div>

    <!-- Error -->
    <div
      v-else-if="error || !post"
      class="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-muted-foreground"
    >
      <span>Post not found.</span>
      <NuxtLink
        to="/blog"
        class="rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground"
      >
        Back to Journal
      </NuxtLink>
    </div>

    <template v-else>
      <!-- Article Header -->
      <article class="pb-20 pt-28 md:pt-36">
        <div class="mx-auto max-w-3xl px-6">
          <!-- Back link -->
          <NuxtLink
            to="/blog"
            class="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg
              class="h-4 w-4 transition-transform group-hover:-translate-x-1"
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
            Back to Journal
          </NuxtLink>

          <!-- Meta -->
          <div class="flex flex-wrap items-center gap-3">
            <span
              v-if="post.category"
              class="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary"
            >
              {{ post.category }}
            </span>
            <span class="text-xs text-muted-foreground">
              {{ formatDate(post.publishedAt) }}
            </span>
          </div>

          <!-- Title -->
          <h1
            class="mt-4 text-3xl font-medium leading-tight tracking-tight text-foreground md:text-5xl"
          >
            {{ post.title }}
          </h1>

          <!-- Author -->
          <div v-if="post.author" class="mt-4 flex items-center gap-3">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
            >
              {{ post.author.charAt(0) }}
            </div>
            <div>
              <p class="text-sm font-medium text-foreground">
                {{ post.author }}
              </p>
            </div>
          </div>

          <!-- Excerpt -->
          <p
            v-if="post.excerpt"
            class="mt-6 text-lg leading-relaxed text-muted-foreground"
          >
            {{ post.excerpt }}
          </p>
        </div>

        <!-- Hero Image -->
        <div
          v-if="post.mainImage"
          class="mx-auto mt-10 max-w-4xl px-6"
        >
          <div class="overflow-hidden rounded-2xl">
            <img
              :src="post.mainImage"
              :alt="post.title"
              loading="lazy"
              class="w-full object-cover"
            />
          </div>
        </div>

        <!-- Body -->
        <div
          v-if="post.bodyHtml"
          class="prose-article mx-auto mt-12 max-w-3xl px-6"
          v-html="post.bodyHtml"
        >
        </div>

        <!-- ─── Photo Gallery ──────────────────────────────────────────────── -->
        <div v-if="post.gallery?.length" class="mx-auto mt-20 max-w-4xl px-6">
          <div class="mb-6 flex items-end justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Archives</p>
              <h2 class="mt-1.5 text-2xl font-light tracking-tight text-foreground">Photo Gallery</h2>
            </div>
            <span class="text-xs text-muted-foreground">{{ post.gallery.length }} photographs</span>
          </div>

          <!-- Masonry grid -->
          <div class="columns-2 gap-3 sm:columns-3">
            <div
              v-for="(photo, i) in post.gallery"
              :key="i"
              class="group relative mb-3 cursor-zoom-in overflow-hidden rounded-xl break-inside-avoid"
              @click="openLightbox(i)"
            >
              <img
                :src="photo.src"
                :alt="photo.caption || ''"
                loading="lazy"
                class="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <!-- Hover overlay -->
              <div
                v-if="photo.caption"
                class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-3"
              >
                <p class="text-xs font-medium text-white/90 leading-tight">{{ photo.caption }}</p>
              </div>
              <!-- Expand icon -->
              <div class="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <svg class="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Divider + CTA -->
        <div class="mx-auto mt-20 max-w-3xl px-6">
          <div class="border-t border-border pt-12 text-center">
            <p class="text-sm text-muted-foreground">
              Interested in preserving your heritage site?
            </p>
            <NuxtLink
              to="/commercial"
              class="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Start a Project
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </article>

      <!-- ─── Lightbox ─────────────────────────────────────────────────────── -->
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
                  :alt="lightboxPhoto.caption || ''"
                  class="max-h-[78vh] max-w-[88vw] rounded-xl object-contain shadow-2xl"
                />
              </Transition>
              <div class="flex items-center gap-3 text-center">
                <p v-if="lightboxPhoto.caption" class="text-sm font-medium text-white/80">{{ lightboxPhoto.caption }}</p>
                <span v-if="lightboxPhoto.caption" class="text-white/30">·</span>
                <p class="text-xs text-white/30">{{ (lightboxIndex ?? 0) + 1 }} / {{ galleryLength }}</p>
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
    </template>
  </div>
</template>

<style scoped>
/* Portable Text article body styles */
.prose-article :deep(h2) {
  font-size: 1.75rem;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--foreground);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.prose-article :deep(h3) {
  font-size: 1.35rem;
  font-weight: 500;
  line-height: 1.4;
  color: var(--foreground);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.prose-article :deep(p) {
  font-size: 1.05rem;
  line-height: 1.85;
  color: var(--text-muted);
  margin-bottom: 1.25rem;
}

.prose-article :deep(a) {
  color: var(--orange);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(201, 101, 61, 0.3);
  transition: text-decoration-color 0.2s;
}

.prose-article :deep(a:hover) {
  text-decoration-color: var(--orange);
}

.prose-article :deep(ul),
.prose-article :deep(ol) {
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
  color: var(--text-muted);
}

.prose-article :deep(li) {
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 0.4rem;
}

.prose-article :deep(ul li) {
  list-style-type: disc;
}

.prose-article :deep(ol li) {
  list-style-type: decimal;
}

.prose-article :deep(blockquote) {
  border-left: 3px solid var(--orange);
  padding-left: 1.25rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: var(--text-muted);
}

.prose-article :deep(img) {
  border-radius: 0.75rem;
  margin: 2rem 0;
  width: 100%;
}

.prose-article :deep(strong) {
  font-weight: 600;
  color: var(--foreground);
}

.prose-article :deep(code) {
  background: var(--surface-alt);
  padding: 0.15rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.9rem;
}

.prose-article :deep(pre) {
  background: var(--surface-alt);
  padding: 1.25rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.prose-article :deep(pre code) {
  background: none;
  padding: 0;
}

.prose-article :deep(hr) {
  border: none;
  border-top: 1px solid var(--border);
  margin: 2.5rem 0;
}
</style>
