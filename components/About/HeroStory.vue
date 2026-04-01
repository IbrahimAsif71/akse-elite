<script setup lang="ts">
interface HeroCopy {
  headline: string;
  tagline: string;
  heroImage: string;
  heroImageAlt: string;
}

const heroCopy: HeroCopy = {
  headline: "Preserving the Past. Building the Future.",
  tagline: "A behind-the-lens look at how AKSE works.",
  heroImage: "/image1.jpeg",
  heroImageAlt: "AKSE camera rig set up at a heritage site",
};

const words = computed(() => heroCopy.headline.split(" "));

const heroRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLElement | null>(null);
const wordRefs = ref<HTMLElement[]>([]);
const taglineRef = ref<HTMLElement | null>(null);

function setWordRef(el: any, index: number) {
  if (el) wordRefs.value[index] = el;
}

const { $gsap, $ScrollTrigger } = useNuxtApp();
let tl: any = null;
let st: any = null;

onMounted(() => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReduced) return;

  const gsap = $gsap as any;
  const ScrollTrigger = $ScrollTrigger as any;

  // Word reveal stagger timeline
  tl = gsap.timeline();
  tl.from(wordRefs.value, {
    y: "110%",
    opacity: 0,
    stagger: 0.08,
    ease: "power3.out",
    duration: 0.9,
  });
  tl.from(
    taglineRef.value,
    {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
    },
    "-=0.3",
  );

  // Scroll-scrubbed hero image effect
  if (heroRef.value && imageRef.value) {
    st = ScrollTrigger.create({
      trigger: heroRef.value,
      start: "top top",
      end: "bottom top",
      scrub: true,
      animation: gsap.fromTo(
        imageRef.value,
        { scale: 1.08, filter: "blur(8px)" },
        { scale: 1, filter: "blur(0px)", ease: "none" },
      ),
    });
  }
});

onBeforeUnmount(() => {
  if (tl) tl.kill();
  if (st) st.kill();
});
</script>

<template>
  <section
    ref="heroRef"
    class="relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
  >
    <h1
      class="text-center text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl"
    >
      <span
        v-for="(word, i) in words"
        :key="i"
        class="inline-block overflow-hidden"
      >
        <span :ref="(el) => setWordRef(el, i)" class="inline-block">
          {{ word }}
        </span>
        <span v-if="i < words.length - 1">&nbsp;</span>
      </span>
    </h1>

    <p
      ref="taglineRef"
      class="mt-6 text-center text-lg text-muted-foreground md:text-xl"
    >
      {{ heroCopy.tagline }}
    </p>
  </section>
</template>
