<script setup lang="ts">
const props = withDefaults(defineProps<{ strength?: number }>(), {
  strength: 0.25,
});

const { $gsap } = useNuxtApp();
const wrapperRef = ref<HTMLDivElement>();
let tween: gsap.core.Tween | null = null;
let enabled = false;

onMounted(() => {
  if (typeof window === "undefined") return;
  const pointer = window.matchMedia("(pointer: fine)").matches;
  const motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  enabled = pointer && motion;
});

function onMouseMove(e: MouseEvent) {
  if (!enabled || !wrapperRef.value) return;
  const rect = wrapperRef.value.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = (e.clientX - cx) * props.strength;
  const dy = (e.clientY - cy) * props.strength;
  $gsap.set(wrapperRef.value, { x: dx, y: dy });
}

function onMouseLeave() {
  if (!enabled || !wrapperRef.value) return;
  tween?.kill();
  tween = $gsap.to(wrapperRef.value, {
    x: 0,
    y: 0,
    duration: 0.8,
    ease: "elastic.out(1, 0.3)",
  });
}

onUnmounted(() => {
  tween?.kill();
});
</script>

<template>
  <div ref="wrapperRef" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
    <slot />
  </div>
</template>
