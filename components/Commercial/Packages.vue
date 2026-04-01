<script setup lang="ts">
const packages = [
  {
    name: "Silver Package",
    badge: null,
    price: "Rs 300",
    priceNote: "per m²",
    tagline: "Essential Immersion",
    features: [
      "4-6 high-quality 360° nodes",
      "Simple linear pathway",
      "Basic stitching & color correction",
      "Web embedding",
      "Branding",
      "Mobile-friendly",
      "Delivered in 3-5 days",
      "1 month free hosting",
    ],
    cta: "Request Quote",
    highlighted: false,
  },
  {
    name: "Gold Package",
    badge: "Most Popular",
    price: "Rs 340",
    priceNote: "per m²",
    tagline: "Enhanced Digital Tour",
    features: [
      "8-12 nodes",
      "Hotspots (menu, offers, details)",
      "HDR quality",
      "Color grading",
      "Optional music",
      "Social media-ready",
      "2 months hosting",
    ],
    cta: "Request Quote",
    highlighted: true,
  },
  {
    name: "Sapphire Package",
    badge: null,
    price: "Rs 400",
    priceNote: "per m²",
    tagline: "Premium Immersive Experience",
    features: [
      "15-25 nodes",
      "Multi-floor",
      "Narration",
      "Custom branding",
      "Analytics",
      "6 months hosting",
      "Teaser video",
    ],
    cta: "Request Quote",
    highlighted: false,
  },
  {
    name: "Diamond Package",
    badge: "Flagship",
    price: "Rs 500",
    priceNote: "per m²",
    tagline: "Flagship Digital Twin",
    features: [
      "40+ nodes",
      "Drone pathway",
      "Full 3D twin",
      "Storytelling layers",
      "AI analytics",
      "Microsite",
      "1-year hosting",
      "Press kit",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const { $gsap, $ScrollTrigger } = useNuxtApp();
const gridRef = ref<HTMLElement>();
let st: any = null;

onMounted(() => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReduced || !gridRef.value) return;

  const cards = gridRef.value.querySelectorAll(".pricing-card");
  $gsap.set(cards, { y: 40, opacity: 0 });

  st = $ScrollTrigger.batch(cards, {
    onEnter: (batch: Element[]) => {
      $gsap.to(batch, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    once: true,
  });
});

onUnmounted(() => {
  if (Array.isArray(st)) st.forEach((t: any) => t.kill());
});
</script>

<template>
  <section id="packages" ref="gridRef" class="mx-auto max-w-[1400px] px-6 py-16">
    <div class="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="pkg in packages"
        :key="pkg.name"
        class="pricing-card relative flex h-full flex-col rounded-[2rem] p-8 lg:p-10 transition-all duration-300"
        :class="[
          pkg.highlighted
            ? 'bg-foreground text-background shadow-2xl shadow-foreground/10 ring-1 ring-foreground'
            : 'bg-card/40 text-foreground ring-1 ring-border/50 hover:bg-card hover:shadow-sm',
        ]"
      >
        <!-- Badge -->
        <div
          v-if="pkg.badge"
          class="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-primary-foreground shadow-md shadow-primary/20"
        >
          {{ pkg.badge }}
        </div>

        <!-- Plan name -->
        <p :class="['text-[12px] font-semibold uppercase tracking-widest', pkg.highlighted ? 'text-primary' : 'text-primary']">
          {{ pkg.name }}
        </p>

        <!-- Price -->
        <div class="mt-5 flex items-baseline gap-2">
          <span :class="['text-5xl font-bold tracking-tight', pkg.highlighted ? 'text-background' : 'text-foreground']">
            {{ pkg.price }}
          </span>
        </div>
        <p :class="['mt-1 text-sm', pkg.highlighted ? 'text-background/50' : 'text-muted-foreground']">
          {{ pkg.priceNote }}
        </p>

        <!-- Tagline -->
        <p :class="['mt-6 text-[15px] leading-relaxed', pkg.highlighted ? 'text-background/70' : 'text-muted-foreground']">
          {{ pkg.tagline }}
        </p>

        <!-- Divider -->
        <div :class="['my-7 h-px', pkg.highlighted ? 'bg-background/10' : 'bg-border/40']" />

        <!-- Features -->
        <ul class="space-y-3.5">
          <li
            v-for="f in pkg.features"
            :key="f"
            class="flex items-start gap-3 text-[14px]"
          >
            <svg
              class="mt-0.5 h-4 w-4 shrink-0 text-primary"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8.5l3 3 7-7"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span :class="pkg.highlighted ? 'text-background/80' : 'text-foreground/80'">
              {{ f }}
            </span>
          </li>
        </ul>

        <!-- CTA -->
        <div class="mt-auto pt-9">
          <a
            href="#contact"
            :class="[
              'block w-full rounded-full py-3.5 text-center text-[15px] font-medium transition-all duration-300',
              pkg.highlighted
                ? 'bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5'
                : 'bg-transparent ring-1 ring-border text-foreground hover:bg-background/80',
            ]"
          >
            {{ pkg.cta }}
          </a>
        </div>
      </div>
    </div>

    <!-- Trust note -->
    <p class="mt-10 text-center text-sm text-muted-foreground">
      All packages include project scoping, on-site capture, and a final
      web-ready deliverable. Prices vary by location and complexity.
    </p>
  </section>
</template>
