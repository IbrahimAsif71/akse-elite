<script setup lang="ts">
const packages = [
  {
    name: "Essentials",
    badge: null,
    price: "$1,200",
    priceNote: "starting from",
    tagline:
      "For small commercial spaces that need a clean, professional virtual presence.",
    features: [
      "Up to 500 sq. ft capture",
      "Standard 360° panoramas",
      "Web-embeddable tour link",
      "Basic hotspot navigation",
      "1 revision round",
      "2-week delivery",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Studio",
    badge: "Most Popular",
    price: "$3,500",
    priceNote: "starting from",
    tagline:
      "For brands that want a polished, fully branded experience that commands attention.",
    features: [
      "Up to 3,000 sq. ft capture",
      "Cinematic 360° + depth mapping",
      "Custom-branded web player",
      "Interactive hotspots & floor plan",
      "3 revision rounds",
      "4-week delivery",
      "1 year hosting included",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Flagship",
    badge: null,
    price: "Custom",
    priceNote: "let's talk",
    tagline:
      "Full-scale productions for museums, large venues, and premium brand experiences.",
    features: [
      "Unlimited space & multi-location",
      "Full cinematic 3D production",
      "WebXR & VR headset ready",
      "Custom interactive features",
      "White-label delivery",
      "Dedicated project manager",
      "Ongoing support & updates",
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
  <section id="packages" ref="gridRef" class="mx-auto max-w-6xl px-6 py-16">
    <div class="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
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
