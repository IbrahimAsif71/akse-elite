<script setup lang="ts">
import { Button } from "~/components/ui/button";
import { useSanity, urlFor } from "~/utils/sanity";

const route = useRoute();
const slug = route.params.slug as string;
const sanity = useSanity();

const {
  data: tour,
  pending,
  error,
} = await useAsyncData(`tour-${slug}`, () =>
  sanity.fetch(
    `*[_type=="tour" && slug.current==$slug][0]{
      title,
      category,
      location,
      summary,
      heroImage,
      tourUrl
    }`,
    { slug },
  ),
);

useHead(() => ({
  title: tour.value?.title ? `${tour.value.title} — AKSE` : "Tour — AKSE",
  meta: [
    {
      name: "description",
      content: tour.value?.summary || "Immersive 360 tour powered by AKSE.",
    },
    { property: "og:title", content: tour.value?.title || "AKSE Tour" },
    {
      property: "og:description",
      content: tour.value?.summary || "Immersive 360 tour powered by AKSE.",
    },
  ],
}));

const { $gsap } = useNuxtApp();

const wrap = ref<HTMLElement | null>(null);
const titleEl = ref<HTMLElement | null>(null);
const metaEl = ref<HTMLElement | null>(null);
const heroImg = ref<HTMLElement | null>(null);
const embedEl = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!wrap.value || !titleEl.value) return;

  const tl = $gsap.timeline();

  tl.from(titleEl.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  })
    .from(
      metaEl.value,
      { y: 30, opacity: 0, duration: 0.9, ease: "power3.out" },
      "-=0.7",
    )
    .from(
      heroImg.value,
      { scale: 1.03, opacity: 0, duration: 1.1, ease: "power2.out" },
      "-=0.8",
    )
    .from(
      embedEl.value,
      { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" },
      "-=0.6",
    );
});
</script>

<template>
  <section ref="wrap" class="mx-auto max-w-5xl px-6 pb-24 pt-32">
    <div v-if="pending" class="py-20 text-muted-foreground">Loading tour…</div>
    <div v-else-if="error" class="py-20 text-muted-foreground">
      Error loading tour.
    </div>

    <div v-else-if="tour">
      <!-- Top: info + hero image -->
      <div class="grid items-start gap-8 md:grid-cols-2">
        <div>
          <div
            v-if="tour.category"
            class="text-xs font-semibold uppercase tracking-widest text-primary"
          >
            {{ tour.category }}
          </div>

          <h1
            ref="titleEl"
            class="mt-3 text-4xl font-light tracking-tight text-foreground md:text-5xl"
          >
            {{ tour.title }}
          </h1>

          <div ref="metaEl" class="mt-4">
            <div v-if="tour.location" class="text-muted-foreground">
              {{ tour.location }}
            </div>
            <p
              v-if="tour.summary"
              class="mt-3 max-w-prose leading-relaxed text-muted-foreground"
            >
              {{ tour.summary }}
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <NuxtLink to="/tours">
                <Button variant="outline"> Back to Tours </Button>
              </NuxtLink>
              <MagneticWrapper>
                <NuxtLink to="/contact">
                  <Button variant="default"> Start a Project </Button>
                </NuxtLink>
              </MagneticWrapper>
            </div>
          </div>
        </div>

        <img
          v-if="tour.heroImage"
          ref="heroImg"
          :src="urlFor(tour.heroImage).width(1600).url()"
          :alt="tour.title"
          class="w-full rounded-2xl border border-border object-cover md:h-85"
        />
        <div
          v-else
          ref="heroImg"
          class="flex h-85 items-center justify-center rounded-2xl border border-border bg-muted text-muted-foreground"
        >
          No hero image added
        </div>
      </div>

      <!-- 3D Tour Embed -->
      <div ref="embedEl" class="mt-16">
        <h2 class="text-3xl font-light text-foreground">Enter Experience</h2>

        <div
          v-if="tour.tourUrl"
          class="mt-4 overflow-hidden rounded-2xl border border-border bg-black"
        >
          <iframe
            :src="tour.tourUrl"
            loading="lazy"
            allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
            allowfullscreen
            class="block h-160 w-full border-0 max-md:h-130"
          />
        </div>

        <div v-else class="mt-4 text-muted-foreground">
          No tour URL added yet. Add an iframe URL in Sanity → Tour → "360 Tour
          URL".
        </div>
      </div>
    </div>

    <div v-else class="py-20 text-muted-foreground">Tour not found.</div>
  </section>
</template>
