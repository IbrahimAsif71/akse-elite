<script setup lang="ts">
interface Tour {
  _id: string;
  title: string;
  slug: { current: string };
  category?: string;
  location?: string;
  summary?: string;
  heroImage?: any;
  status?: string;
}

const props = defineProps<{
  tours: Tour[];
  activeCategory: string;
  urlFor: (source: any) => { width: (w: number) => { url: () => string } };
}>();

const { $gsap, $ScrollTrigger } = useNuxtApp();
const gridRef = ref<HTMLElement>();
let batchTriggers: ScrollTrigger[] = [];

function isLive(tour: Tour) {
  return (tour.status || "").toLowerCase() !== "in-production";
}

function tourImage(tour: Tour) {
  if (tour.heroImage) {
    return props.urlFor(tour.heroImage).width(900).url();
  }
  return "/images/tours/rohtas_fort_heritage_1773010968806.png";
}

function setupBatch() {
  killBatch();
  if (!gridRef.value) return;
  const cards = gridRef.value.querySelectorAll(".tour-card");
  if (!cards.length) return;

  $gsap.set(cards, { y: 48, opacity: 0 });

  batchTriggers = $ScrollTrigger.batch(cards, {
    onEnter: (batch: Element[]) => {
      $gsap.to(batch, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
      });
    },
    once: true,
  }) as unknown as ScrollTrigger[];
}

function killBatch() {
  if (Array.isArray(batchTriggers)) {
    batchTriggers.forEach((st: ScrollTrigger) => st.kill());
  }
  batchTriggers = [];
}

onMounted(() => nextTick(() => setupBatch()));

watch(
  () => props.activeCategory,
  () =>
    nextTick(() => {
      setupBatch();
      $ScrollTrigger.refresh();
    }),
);

onUnmounted(() => killBatch());
</script>

<template>
  <section ref="gridRef" class="mx-auto max-w-7xl px-6 py-14">
    <!-- Section header row -->
    <div class="mb-10 flex items-center gap-6">
      <p class="shrink-0 text-sm text-muted-foreground">
        <span class="font-semibold text-foreground">{{ tours.length }}</span>
        {{ tours.length === 1 ? "experience" : "experiences" }}
      </p>
      <div class="h-px flex-1 bg-border/50" />
    </div>

    <!-- Empty state -->
    <div v-if="tours.length === 0" class="py-24 text-center">
      <p class="text-muted-foreground">No tours in this category yet.</p>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <template v-for="tour in tours" :key="tour._id">
        <!-- Live tour -->
        <NuxtLink
          v-if="isLive(tour)"
          :to="`/tours/${tour.slug.current}`"
          class="tour-card group block"
        >
          <div class="relative overflow-hidden rounded-2xl">
            <!-- Image -->
            <div class="aspect-[4/3] overflow-hidden">
              <img
                :src="tourImage(tour)"
                :alt="tour.title"
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
            </div>

            <!-- Bottom gradient -->
            <div
              class="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/5 to-transparent"
            />

            <!-- Live badge -->
            <div
              class="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1"
            >
              <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-foreground" />
              <span
                class="text-[10px] font-bold uppercase tracking-widest text-primary-foreground"
              >
                Live
              </span>
            </div>

            <!-- Text overlay -->
            <div class="absolute inset-x-0 bottom-0 p-5">
              <h3 class="text-base font-semibold leading-snug text-white">
                {{ tour.title }}
              </h3>
              <p v-if="tour.location" class="mt-1 text-sm text-white/60">
                {{ tour.location }}
              </p>
            </div>
          </div>
        </NuxtLink>

        <!-- In-production tour -->
        <div
          v-else
          class="tour-card cursor-not-allowed"
          aria-disabled="true"
          role="img"
          :aria-label="`${tour.title} — coming soon`"
        >
          <div class="relative overflow-hidden rounded-2xl">
            <!-- Image (greyscale + blur) -->
            <div class="aspect-[4/3] overflow-hidden">
              <img
                :src="tourImage(tour)"
                :alt="tour.title"
                loading="lazy"
                class="h-full w-full scale-[1.05] object-cover grayscale"
                style="filter: grayscale(1) blur(3px)"
              />
            </div>

            <!-- Dark overlay -->
            <div class="absolute inset-0 bg-foreground/50" />

            <!-- Centred lock + label -->
            <div
              class="absolute inset-0 flex flex-col items-center justify-center gap-3"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
              >
                <svg
                  class="h-4 w-4 text-white/70"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="7"
                    width="10"
                    height="8"
                    rx="1.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                  <path
                    d="M5 7V5a3 3 0 0 1 6 0v2"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <span
                class="rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-[11px] font-medium uppercase tracking-widest text-white/80 backdrop-blur-sm"
              >
                In Production
              </span>
            </div>

            <!-- Text overlay at bottom -->
            <div class="absolute inset-x-0 bottom-0 p-5">
              <h3 class="text-base font-semibold leading-snug text-white/55">
                {{ tour.title }}
              </h3>
              <p v-if="tour.location" class="mt-1 text-sm text-white/35">
                {{ tour.location }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>
