<script setup lang="ts">
import {
  Camera,
  RotateCcw,
  Wind,
  Globe,
  Glasses,
  Layers,
  MapPin,
} from "lucide-vue-next";
import type { Component } from "vue";

interface TechItem {
  name: string;
  description: string;
  category: "Hardware" | "Software" | "Platform";
  icon: string;
  size: "sm" | "md" | "lg";
}

const iconMap: Record<string, Component> = {
  Camera,
  RotateCcw,
  Wind,
  Globe,
  Glasses,
  Layers,
  MapPin,
};

const techItems: TechItem[] = [
  {
    name: "Matterport Pro3",
    description:
      "High-fidelity 3D spatial data capture with 20MP colour camera and LiDAR precision.",
    category: "Hardware",
    icon: "Camera",
    size: "md",
  },
  {
    name: "Insta360 Pro 2",
    description:
      "8K spherical capture for richly detailed 360° photography and video.",
    category: "Hardware",
    icon: "RotateCcw",
    size: "sm",
  },
  {
    name: "DJI Aerial Platform",
    description: "Exterior envelope coverage and overhead spatial mapping.",
    category: "Hardware",
    icon: "Wind",
    size: "sm",
  },
  {
    name: "WebGL 2.0 Renderer",
    description:
      "Custom-built tour viewer leveraging GPU acceleration for smooth 360° navigation on any browser.",
    category: "Software",
    icon: "Globe",
    size: "md",
  },
  {
    name: "WebXR / VR Integration",
    description:
      "Full headset support for Quest 3, Quest 2, and PSVR2 — no app install required.",
    category: "Platform",
    icon: "Glasses",
    size: "lg",
  },
  {
    name: "Adaptive Tile Streaming",
    description:
      "Progressive resolution loading from global CDN — high quality on broadband, functional on 3G.",
    category: "Platform",
    icon: "Layers",
    size: "md",
  },
  {
    name: "Hotspot & Annotation Engine",
    description:
      "Author rich information panels, audio, and embedded media at any point in the tour.",
    category: "Software",
    icon: "MapPin",
    size: "sm",
  },
];

function sizeClass(size: TechItem["size"]): string {
  switch (size) {
    case "sm":
      return "col-span-1";
    case "md":
      return "col-span-2";
    case "lg":
      return "col-span-2 md:col-span-4";
  }
}
</script>

<template>
  <section class="px-6 py-24 md:py-32 lg:px-12">
    <div class="mx-auto max-w-7xl">
      <h2
        class="mb-12 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
      >
        Our Technology
      </h2>

      <div class="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        <div
          v-for="item in techItems"
          :key="item.name"
          :class="sizeClass(item.size)"
        >
          <Card
            class="h-full cursor-default transition-shadow duration-300 hover:shadow-[0_0_0_1.5px_hsl(var(--primary)),_0_0_18px_2px_hsl(var(--primary)/0.3)]"
          >
            <CardContent class="flex h-full flex-col gap-3 p-5 md:p-6">
              <div class="flex items-center gap-3">
                <component
                  :is="iconMap[item.icon]"
                  class="h-5 w-5 shrink-0 text-primary"
                />
                <span
                  class="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  {{ item.category }}
                </span>
              </div>
              <h3 class="text-lg font-semibold text-foreground">
                {{ item.name }}
              </h3>
              <p class="text-sm leading-relaxed text-muted-foreground">
                {{ item.description }}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>
