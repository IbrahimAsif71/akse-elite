<script setup lang="ts">
const { $gsap } = useNuxtApp();

const cursorRef = ref<HTMLElement | null>(null);
const labelRef = ref<HTMLElement | null>(null);
const isPointer = ref(false);
const cursorLabel = ref("");
const isExpanded = ref(false);

let quickToX: ((value: number) => void) | null = null;
let quickToY: ((value: number) => void) | null = null;

function onMouseMove(e: MouseEvent) {
  quickToX?.(e.clientX);
  quickToY?.(e.clientY);
}

function onMouseEnterTarget(e: Event) {
  const target = (e.target as HTMLElement).closest("[data-cursor]");
  if (!target) return;
  const label = target.getAttribute("data-cursor") || "";
  isExpanded.value = true;

  if (label === "explore") cursorLabel.value = "Explore";
  else if (label === "drag") cursorLabel.value = "Drag";
  else cursorLabel.value = "";

  if (cursorRef.value) {
    $gsap.to(cursorRef.value, {
      scale: label === "action" ? 2 : 3,
      duration: 0.3,
      ease: "power2.out",
    });
  }
}

function onMouseLeaveTarget() {
  isExpanded.value = false;
  cursorLabel.value = "";
  if (cursorRef.value) {
    $gsap.to(cursorRef.value, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }
}

onMounted(() => {
  // Only activate on pointer devices
  if (!window.matchMedia("(pointer: fine)").matches) return;
  isPointer.value = true;

  // Hide default cursor
  document.documentElement.classList.add("cursor-none");

  // Wait for v-if DOM update before accessing cursorRef
  nextTick(() => {
    if (cursorRef.value) {
      quickToX = $gsap.quickTo(cursorRef.value, "x", {
        duration: 0.3,
        ease: "power3",
      });
      quickToY = $gsap.quickTo(cursorRef.value, "y", {
        duration: 0.3,
        ease: "power3",
      });
    }
  });

  // Global listeners
  window.addEventListener("mousemove", onMouseMove);

  // Event delegation for data-cursor elements
  document.addEventListener("mouseenter", onMouseEnterTarget, true);
  document.addEventListener("mouseleave", onMouseLeaveTarget, true);
});

onBeforeUnmount(() => {
  document.documentElement.classList.remove("cursor-none");
  window.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseenter", onMouseEnterTarget, true);
  document.removeEventListener("mouseleave", onMouseLeaveTarget, true);
});
</script>

<template>
  <div v-if="isPointer">
    <div
      ref="cursorRef"
      class="pointer-events-none fixed left-0 top-0 z-[9999] flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground mix-blend-difference"
    >
      <span
        ref="labelRef"
        v-if="cursorLabel"
        class="whitespace-nowrap text-[5px] font-semibold uppercase tracking-wider text-background"
      >
        {{ cursorLabel }}
      </span>
    </div>
  </div>
</template>
