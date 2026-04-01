<template>
  <div ref="wrapperRef" class="absolute inset-0 w-full h-full">
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(InertiaPlugin);

const throttle = <T extends unknown[]>(func: (...args: T) => void, limit: number) => {
  let lastCall = 0;
  return (...args: T) => {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
};

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied: boolean;
}

export interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
}

const props = withDefaults(defineProps<DotGridProps>(), {
  dotSize: 6,
  gap: 22,
  baseColor: '#c2410c',
  activeColor: '#fb923c',
  proximity: 130,
  speedTrigger: 80,
  shockRadius: 220,
  shockStrength: 5,
  maxSpeed: 5000,
  resistance: 750,
  returnDuration: 1.5,
});

const wrapperRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const dots = ref<Dot[]>([]);

const pointer = {
  x: -9999,
  y: -9999,
  vx: 0,
  vy: 0,
  speed: 0,
  lastTime: 0,
  lastX: 0,
  lastY: 0,
};

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1]!, 16),
    g: parseInt(m[2]!, 16),
    b: parseInt(m[3]!, 16),
  };
}

const baseRgb = computed(() => hexToRgb(props.baseColor || '#c2410c'));
const activeRgb = computed(() => hexToRgb(props.activeColor || '#fb923c'));

const buildGrid = () => {
  const wrap = wrapperRef.value;
  const canvas = canvasRef.value;
  if (!wrap || !canvas) return;

  const { width, height } = wrap.getBoundingClientRect();
  if (width === 0 || height === 0) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const ctx = canvas.getContext('2d');
  if (ctx) ctx.scale(dpr, dpr);

  const cell = props.dotSize + props.gap;
  const cols = Math.floor((width + props.gap) / cell);
  const rows = Math.floor((height + props.gap) / cell);

  const gridW = cell * cols - props.gap;
  const gridH = cell * rows - props.gap;
  const startX = (width - gridW) / 2 + props.dotSize / 2;
  const startY = (height - gridH) / 2 + props.dotSize / 2;

  const newDots: Dot[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      newDots.push({
        cx: startX + col * cell,
        cy: startY + row * cell,
        xOffset: 0,
        yOffset: 0,
        _inertiaApplied: false,
      });
    }
  }
  dots.value = newDots;
};

let rafId = 0;

const draw = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

  const dotsList = dots.value;
  const px = pointer.x;
  const py = pointer.y;
  const proxSq = props.proximity * props.proximity;
  const br = baseRgb.value;
  const ar = activeRgb.value;
  const halfSize = props.dotSize / 2;

  for (const dot of dotsList) {
    const ox = dot.cx + dot.xOffset;
    const oy = dot.cy + dot.yOffset;
    const dx = dot.cx - px;
    const dy = dot.cy - py;
    const dsq = dx * dx + dy * dy;

    let fillStyle = props.baseColor || '#c2410c';
    if (dsq <= proxSq) {
      const t = 1 - Math.sqrt(dsq) / props.proximity;
      const r = Math.round(br.r + (ar.r - br.r) * t);
      const g = Math.round(br.g + (ar.g - br.g) * t);
      const b = Math.round(br.b + (ar.b - br.b) * t);
      fillStyle = `rgb(${r},${g},${b})`;
    }

    ctx.beginPath();
    ctx.arc(ox, oy, halfSize, 0, Math.PI * 2);
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }

  rafId = requestAnimationFrame(draw);
};

// Convert a window-space mouse event to canvas-local coords (accounts for scroll)
const toCanvasCoords = (clientX: number, clientY: number) => {
  const canvas = canvasRef.value;
  if (!canvas) return { x: -9999, y: -9999 };
  const rect = canvas.getBoundingClientRect();
  return { x: clientX - rect.left, y: clientY - rect.top };
};

const onMove = (e: MouseEvent) => {
  const now = performance.now();
  const dt = pointer.lastTime ? now - pointer.lastTime : 16;
  const dx = e.clientX - pointer.lastX;
  const dy = e.clientY - pointer.lastY;
  let vx = (dx / dt) * 1000;
  let vy = (dy / dt) * 1000;
  let speed = Math.hypot(vx, vy);

  if (speed > props.maxSpeed) {
    const scale = props.maxSpeed / speed;
    vx *= scale; vy *= scale; speed = props.maxSpeed;
  }

  pointer.lastTime = now;
  pointer.lastX = e.clientX;
  pointer.lastY = e.clientY;
  pointer.vx = vx;
  pointer.vy = vy;
  pointer.speed = speed;

  const { x, y } = toCanvasCoords(e.clientX, e.clientY);
  pointer.x = x;
  pointer.y = y;

  const dotsList = dots.value;
  for (const dot of dotsList) {
    const dist = Math.hypot(dot.cx - x, dot.cy - y);
    if (speed > props.speedTrigger && dist < props.proximity && !dot._inertiaApplied) {
      dot._inertiaApplied = true;
      gsap.killTweensOf(dot);
      gsap.to(dot, {
        inertia: {
          xOffset: dot.cx - x + vx * 0.005,
          yOffset: dot.cy - y + vy * 0.005,
          resistance: props.resistance,
        },
        onComplete: () => {
          gsap.to(dot, { xOffset: 0, yOffset: 0, duration: props.returnDuration, ease: 'elastic.out(1,0.75)' });
          dot._inertiaApplied = false;
        },
      });
    }
  }
};

const onClick = (e: MouseEvent) => {
  // Only trigger if the click landed inside the canvas bounds
  const canvas = canvasRef.value;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  if (
    e.clientX < rect.left || e.clientX > rect.right ||
    e.clientY < rect.top  || e.clientY > rect.bottom
  ) return;

  const cx = e.clientX - rect.left;
  const cy = e.clientY - rect.top;

  for (const dot of dots.value) {
    const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
    if (dist < props.shockRadius && !dot._inertiaApplied) {
      dot._inertiaApplied = true;
      gsap.killTweensOf(dot);
      const falloff = Math.max(0, 1 - dist / props.shockRadius);
      gsap.to(dot, {
        inertia: {
          xOffset: (dot.cx - cx) * props.shockStrength * falloff,
          yOffset: (dot.cy - cy) * props.shockStrength * falloff,
          resistance: props.resistance,
        },
        onComplete: () => {
          gsap.to(dot, { xOffset: 0, yOffset: 0, duration: props.returnDuration, ease: 'elastic.out(1,0.75)' });
          dot._inertiaApplied = false;
        },
      });
    }
  }
};

const throttledMove = throttle(onMove, 16);

let resizeObserver: ResizeObserver | null = null;

onMounted(async () => {
  await nextTick();
  buildGrid();
  draw();

  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(() => {
      buildGrid();
    });
    if (wrapperRef.value) resizeObserver.observe(wrapperRef.value);
  }

  window.addEventListener('mousemove', throttledMove, { passive: true });
  window.addEventListener('click', onClick);
});

onUnmounted(() => {
  cancelAnimationFrame(rafId);
  resizeObserver?.disconnect();
  window.removeEventListener('mousemove', throttledMove);
  window.removeEventListener('click', onClick);
});

watch([() => props.dotSize, () => props.gap], () => buildGrid());
</script>
