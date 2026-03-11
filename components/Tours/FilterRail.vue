<script setup lang="ts">
defineProps<{ modelValue: string }>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const categories = [
  { label: "All", slug: "all" },
  { label: "Heritage Sites", slug: "heritage-sites" },
  { label: "Museums", slug: "museums" },
  { label: "Commercial", slug: "commercial" },
  { label: "In Production", slug: "in-production" },
];
</script>

<template>
  <div class="sticky top-0 z-30 border-b border-border bg-background">
    <div
      class="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-6 py-3 scrollbar-hide"
    >
      <button
        v-for="cat in categories"
        :key="cat.slug"
        type="button"
        :class="[
          'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors',
          modelValue === cat.slug
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        ]"
        @click="emit('update:modelValue', cat.slug)"
      >
        {{ cat.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
