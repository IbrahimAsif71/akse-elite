<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    strength?: number;
    as?: string;
  }>(),
  {
    strength: 0.25,
    as: "div",
  },
);

const { $gsap } = useNuxtApp();
const wrapperRef = ref<HTMLElement | null>(null);
const isPointer = ref(false);

function onMouseMove(e: MouseEvent) {
  if (!wrapperRef.value || !isPointer.value) return;
  const rect = wrapperRef.value.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = e.clientX - cx;
  const dy = e.clientY - cy;
  $gsap.set(wrapperRef.value, {
    x: dx * props.strength,
    y: dy * props.strength,
  });
}

function onMouseLeave() {
  if (!wrapperRef.value || !isPointer.value) return;
  $gsap.to(wrapperRef.value, {
    x: 0,
    y: 0,
    duration: 0.8,
    ease: "elastic.out(1, 0.3)",
  });
}

onMounted(() => {
  isPointer.value = window.matchMedia("(pointer: fine)").matches;
});
</script>

<template>
  <component
    :is="props.as"
    ref="wrapperRef"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <slot />
  </component>
</template>
