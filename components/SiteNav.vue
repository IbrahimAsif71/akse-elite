<script setup lang="ts">
import { computed, nextTick, onMounted, onBeforeUnmount, ref, watch } from 'vue'

const route = useRoute()

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Tours', to: '/tours' },
  { label: 'Blog', to: '/blog' }
]

const isActive = (path: string) => route.path === path || route.path.startsWith(path + '/')

// Desktop underline
const rail = ref<HTMLElement | null>(null)
const underline = ref<HTMLElement | null>(null)
const activeIdx = computed(() => navItems.findIndex(i => isActive(i.to)))

const positionUnderline = async () => {
  await nextTick()
  if (!rail.value || !underline.value) return
  const anchors = Array.from(rail.value.querySelectorAll('a.link')) as HTMLElement[]
  const idx = activeIdx.value >= 0 ? activeIdx.value : 0
  const target = anchors[idx]
  if (!target) return
  underline.value.style.transform = `translateX(${target.offsetLeft}px)`
  underline.value.style.width = `${target.offsetWidth}px`
}

// Mobile menu
const menuOpen = ref(false)
const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const closeMenu = () => (menuOpen.value = false)

watch(
  () => route.path,
  async () => {
    closeMenu()
    await positionUnderline()
  }
)

watch(menuOpen, (open) => {
  // lock scroll on mobile drawer open
  document.documentElement.style.overflow = open ? 'hidden' : ''
})

onMounted(positionUnderline)
onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header class="nav">
    <NuxtLink class="brand" to="/" @click="closeMenu">
      <img src="/logo.png" alt="akse" />
    </NuxtLink>

    <!-- Desktop -->
    <nav class="links desktop">
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

        <div ref="underline" class="underline" />
      </div>

      <NuxtLink class="cta rust-glow" to="/contact">Start Project</NuxtLink>
    </nav>

    <!-- Mobile -->
    <button class="burger mobile" type="button" :aria-expanded="menuOpen" aria-label="Open menu" @click="toggleMenu">
      <span />
      <span />
      <span />
    </button>

    <!-- Mobile drawer + backdrop -->
    <div class="backdrop" :class="{ on: menuOpen }" @click="closeMenu" />

    <aside class="drawer" :class="{ on: menuOpen }">
      <div class="drawerTop">
        <div class="drawerTitle">Menu</div>
        <button class="close" type="button" aria-label="Close menu" @click="closeMenu">✕</button>
      </div>

      <div class="drawerLinks">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="drawerLink"
          :class="{ active: isActive(item.to) }"
          @click="closeMenu"
        >
          {{ item.label }}
        </NuxtLink>
      </div>

      <NuxtLink class="drawerCta rust-glow" to="/contact" @click="closeMenu">Start Project</NuxtLink>
    </aside>
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
  padding: 14px 18px;
  background: rgba(20, 10, 8, 0.35);
  border-bottom: 1px solid rgba(255,255,255,0.14);
  backdrop-filter: blur(14px);
}

.brand img{ height: 38px; width:auto; }

/* Desktop links */
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
  width: 40px;
  border-radius: 999px;
  background: rgba(20, 10, 8, 0.35);
  border: 1px solid rgba(255,255,255,0.12);
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

/* Mobile controls */
.burger{
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(14px);
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap: 6px;
  padding: 0 12px;
  cursor: pointer;
}
.burger span{
  height: 2px;
  width: 100%;
  background: rgba(255,255,255,0.92);
  border-radius: 999px;
  opacity: .9;
}

/* Drawer */
.backdrop{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  opacity: 0;
  pointer-events: none;
  transition: opacity .25s ease;
  z-index: 49;
}
.backdrop.on{
  opacity: 1;
  pointer-events: auto;
}

.drawer{
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: min(86vw, 360px);
  background: rgba(20, 10, 8, 0.75);
  border-left: 1px solid rgba(255,255,255,0.12);
  backdrop-filter: blur(18px);
  transform: translateX(110%);
  transition: transform .28s cubic-bezier(.2,.8,.2,1);
  z-index: 50;
  padding: 16px;
  display:flex;
  flex-direction:column;
  gap: 14px;
}
.drawer.on{ transform: translateX(0); }

.drawerTop{
  display:flex;
  justify-content:space-between;
  align-items:center;
}
.drawerTitle{
  color: rgba(255,255,255,0.9);
  letter-spacing: .08em;
  text-transform: uppercase;
  font-size: 12px;
}
.close{
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.04);
  color: white;
  cursor: pointer;
}

.drawerLinks{
  display:flex;
  flex-direction:column;
  gap: 10px;
  margin-top: 6px;
}
.drawerLink{
  padding: 12px 12px;
  border-radius: 14px;
  text-decoration:none;
  color: rgba(255,255,255,0.88);
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
}
.drawerLink.active{
  border-color: rgba(201,123,46,0.45);
  background: rgba(201,123,46,0.14);
  color: white;
}

.drawerCta{
  margin-top: auto;
  display:block;
  text-align:center;
  background: var(--rust);
  color:white;
  text-decoration:none;
  padding: 12px 16px;
  border-radius: 999px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.25);
}

/* Responsive switching */
.desktop{ display:none; }
.mobile{ display:flex; }

@media (min-width: 900px){
  .nav{ padding: 14px 26px; }
  .desktop{ display:flex; }
  .mobile{ display:none; }
  .backdrop, .drawer{ display:none; }
}
</style>