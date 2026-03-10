<script setup lang="ts">
interface ProcessStep {
  number: number;
  title: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
}

const steps: ProcessStep[] = [
  {
    number: 1,
    title: "The Assessment",
    summary: "Planning the shoot",
    description:
      "We begin every project with a full cultural and spatial feasibility study. Our team visits the site, maps access points, evaluates lighting conditions across the day, and produces a shoot blueprint — including equipment manifest, crew logistics, and heritage authority permits.",
    image: "/images/about/step-01-assessment.jpg",
    imageAlt:
      "Site assessment map spread on a survey table at a heritage location",
  },
  {
    number: 2,
    title: "360° Capture & Camera Tech",
    summary: "Details on the hardware",
    description:
      "We deploy Matterport Pro3 and Insta360 Pro 2 rigs, supplemented by DJI aerial platforms for exterior envelope coverage. Structured-light scanning is applied to high-detail architectural surfaces. Capture sessions span multiple lighting conditions to ensure the tour remains visually authentic at any time of day.",
    image: "/images/about/step-02-capture.jpg",
    imageAlt:
      "360° camera rig deployed in a historically significant courtyard",
  },
  {
    number: 3,
    title: "Editing & Post-Production",
    summary: "Colour, stitching, and polish",
    description:
      "Raw spherical imagery is colour-graded to a heritage-neutral profile, aligned to a photometric standard established during the assessment phase. Blinding artefacts, crew reflections, and equipment shadows are removed. Each scan point is reviewed individually before delivery to the stitching stage.",
    image: "/images/about/step-03-editing.jpg",
    imageAlt:
      "Post-production workstation displaying 360° image editing software",
  },
  {
    number: 4,
    title: "Tour Stitching & Digital Development",
    summary: "Assembling the experience",
    description:
      "Individual scan points are stitched into a navigable tour graph. Hotspots, information panels, audio narration anchors, and embedded media layers are authored against a content schema developed with the site custodian. The tour is then packaged for web (WebGL), VR (WebXR), and embedded-app delivery targets.",
    image: "/images/about/step-04-stitching.jpg",
    imageAlt:
      "Digital development interface showing tour node graph and hotspot placement",
  },
  {
    number: 5,
    title: "Deployment & VR Integration",
    summary: "Going live and beyond",
    description:
      "Production builds are deployed to a global CDN with adaptive streaming for image tiles. VR headset compatibility is tested across Quest 3, Quest 2, and PSVR2. Analytics dashboards are handed over to the partner organisation. Post-launch SLA support covers a minimum 90-day monitoring and optimisation window.",
    image: "/images/about/step-05-deployment.jpg",
    imageAlt:
      "Person wearing a VR headset exploring a heritage site virtual tour",
  },
];

const sectionRef = ref<HTMLElement | null>(null);
const stepRefs = ref<HTMLElement[]>([]);
const imageRefs = ref<HTMLElement[]>([]);

function setStepRef(el: any, index: number) {
  if (el) stepRefs.value[index] = el;
}

function setImageRef(el: any, index: number) {
  if (el) imageRefs.value[index] = el;
}

const { $gsap, $ScrollTrigger } = useNuxtApp();
let mm: any = null;

onMounted(() => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const gsap = $gsap as any;
  const ScrollTrigger = $ScrollTrigger as any;

  mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    if (prefersReduced) return;

    // Initial state: first image visible, rest hidden
    imageRefs.value.forEach((img, i) => {
      gsap.set(img, { autoAlpha: i === 0 ? 1 : 0 });
    });

    // Create crossfade ScrollTriggers
    stepRefs.value.forEach((stepEl, i) => {
      ScrollTrigger.create({
        trigger: stepEl,
        start: "top center",
        onEnter: () => {
          gsap.to(imageRefs.value[i], { autoAlpha: 1, duration: 0.6 });
          if (i > 0) {
            gsap.to(imageRefs.value[i - 1], { autoAlpha: 0, duration: 0.6 });
          }
        },
        onLeaveBack: () => {
          gsap.to(imageRefs.value[i], { autoAlpha: 0, duration: 0.4 });
          if (i > 0) {
            gsap.to(imageRefs.value[i - 1], { autoAlpha: 1, duration: 0.4 });
          }
        },
      });
    });
  });
});

onBeforeUnmount(() => {
  if (mm) mm.revert();
});
</script>

<template>
  <section ref="sectionRef" class="px-6 py-24 md:py-32 lg:px-12">
    <div class="mx-auto max-w-7xl md:grid md:grid-cols-2 md:gap-16">
      <!-- Left column: sticky header + image stack (desktop) -->
      <div class="mb-12 md:sticky md:top-24 md:mb-0 md:self-start">
        <p class="text-sm font-semibold uppercase tracking-widest text-primary">
          Our Process
        </p>
        <h2
          class="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
        >
          How We Capture Reality
        </h2>
        <p class="mt-4 text-base text-muted-foreground">
          A five-stage pipeline built around precision, authenticity, and
          immersive delivery.
        </p>

        <!-- Image stack (desktop only) -->
        <div
          class="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-2xl bg-muted md:block"
        >
          <img
            v-for="(step, i) in steps"
            :key="step.number"
            :ref="(el) => setImageRef(el as any, i)"
            :src="step.image"
            :alt="step.imageAlt"
            class="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <!-- Right column: steps -->
      <div>
        <div
          v-for="(step, i) in steps"
          :key="step.number"
          :ref="(el) => setStepRef(el as any, i)"
          class="flex min-h-[50vh] flex-col justify-center border-b border-border py-12 last:border-b-0"
        >
          <!-- Mobile inline image -->
          <div
            class="mb-6 overflow-hidden rounded-xl bg-muted aspect-video md:hidden"
          >
            <img
              :src="step.image"
              :alt="step.imageAlt"
              class="h-full w-full object-cover"
            />
          </div>

          <span class="text-sm font-semibold text-primary">
            {{ String(step.number).padStart(2, "0") }}
          </span>
          <h3 class="mt-2 text-2xl font-bold text-foreground md:text-3xl">
            {{ step.title }}
          </h3>
          <p class="mt-1 text-sm font-medium text-muted-foreground">
            {{ step.summary }}
          </p>
          <p class="mt-4 text-base leading-relaxed text-muted-foreground">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
