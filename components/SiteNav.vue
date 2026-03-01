<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'

const route = useRoute()

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Tours', to: '/tours' },
  { label: 'Blog', to: '/blog' }
]

const isActive = (path: string) => route.path === path || route.path.startsWith(path + '/')

const rail = ref<HTMLElement | null>(null)
const linkRefs = ref<HTMLElement[]>([])
const underline = ref<HTMLElement | null>(null)

const setLinkRef = (el: any) => {
  if (!el) return
  // NuxtLink renders an <a>, but Vue passes a component instance sometimes
  const node = el.$el ? el.$el : el
  linkRefs.value.push(node)
}

const activeIdx = computed(() => navItems.findIndex(i => isActive(i.to)))

const positionUnderline = async () => {
  await nextTick()
  if (!rail.value || !underline.value) return

  // reset refs each time for safety (prevents duplicates in dev hot reload)
  const anchors = Array.from(rail.value.querySelectorAll('a.link')) as HTMLElement[]
  const idx = activeIdx.value >= 0 ? activeIdx.value : 0
  const target = anchors[idx]
  if (!target) return

  const left = target.offsetLeft
  const width = target.offsetWidth

  underline.value.style.transform = `translateX(${left}px)`
  underline.value.style.width = `${width}px`
}

onMounted(positionUnderline)
watch(() => route.path, positionUnderline)
</script>

<template>
  <header class="nav">
    <NuxtLink class="brand" to="/">
      <img src="/logo.png" alt="akse" />
    </NuxtLink>

    <nav class="links">
      <div ref="rail" class="rail">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="link"
          :class="{ active: isActive(item.to) }"
        >
          {{ item.label }}
        </NuxtLink>

        <!-- underline that matches actual link width + position -->
        <div ref="underline" class="underline" />
      </div>

      <NuxtLink class="cta rust-glow" to="/contact">
  Start Project
</NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
.nav{
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding: 14px 26px;
  background: rgba(20, 10, 8, 0.35);
border-bottom: 1px solid rgba(255,255,255,0.14);
backdrop-filter: blur(14px);
}

.brand img{ height: 38px; width:auto; }

.links{
  display:flex;
  gap: 16px;
  align-items:center;
}

.rail{
  position: relative;
  display:flex;
  align-items:center;
  padding: 6px;
  border-radius: 999px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
}

.link{
  position: relative;
  z-index: 2;
  padding: 10px 16px;
  color:white;
  text-decoration:none;
  opacity: 0.86;
  transition: opacity .2s ease;
  white-space: nowrap;
}
.link:hover{ opacity: 1; }
.link.active{ opacity: 1; }

.underline{
  position:absolute;
  left: 6px;
  top: 6px;
  height: calc(100% - 12px);
  width: 40px; /* will be overwritten by JS */
  border-radius: 999px;
  background: rgba(20, 10, 8, 0.35);
border-bottom: 1px solid rgba(255,255,255,0.14);
backdrop-filter: blur(14px);
  z-index: 1;
  transition:
    transform 420ms cubic-bezier(.2,.8,.2,1),
    width 420ms cubic-bezier(.2,.8,.2,1);
}

.cta{
  background:var(--rust);
  padding:10px 16px;
  border-radius:999px;
  color:white;
  text-decoration:none;
  box-shadow: 0 10px 30px rgba(0,0,0,0.25);
}
</style>