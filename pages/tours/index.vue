<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { sanity, urlFor } from '~/utils/sanity'

type Tour = {
  _id: string
  title: string
  slug: { current: string }
  category?: string
  location?: string
  summary?: string
  heroImage?: any
}

const q = ref('')
const activeCat = ref<'All' | 'Heritage' | 'Museum' | 'Commercial'>('All')
const categories = ['All', 'Heritage', 'Museum', 'Commercial'] as const

const { data: tours, pending, error, refresh } = await useAsyncData<Tour[]>(
  'tours',
  () =>
    sanity.fetch(`*[_type=="tour" && defined(slug.current)] | order(_createdAt desc){
      _id, title, slug, category, location, summary, heroImage
    }`),
  { server: false } // client-side is fine since you're static
)

onMounted(() => refresh())

const filtered = computed(() => {
  const list = tours.value || []

  const byCat =
    activeCat.value === 'All'
      ? list
      : list.filter(t => (t.category || '').toLowerCase() === activeCat.value.toLowerCase())

  const term = q.value.trim().toLowerCase()
  if (!term) return byCat

  return byCat.filter(t => {
    const hay = `${t.title} ${t.location || ''} ${t.summary || ''} ${t.category || ''}`.toLowerCase()
    return hay.includes(term)
  })
})

const featured = computed(() => (filtered.value.length ? filtered.value[0] : null))
</script>

<template>
  <section class="wrap">
    <!-- Tours Hero -->
    <div class="hero teal-edge">
      <div class="left">
        <div class="k">Tour Library</div>
        <h1>Explore immersive archives</h1>
        <p class="muted">
          Heritage, museums, and premium venues — captured in cinematic 3D & 360° pathways built to preserve.
        </p>

        <div class="searchRow">
          <input v-model="q" class="search" placeholder="Search tours (Golra, museum, Rawalpindi)..." />
          <NuxtLink class="cta rust-glow" to="/blog">Read our stories</NuxtLink>
        </div>

        <div class="chips">
          <button
            v-for="c in categories"
            :key="c"
            class="chip"
            :class="{ on: activeCat === c }"
            @click="activeCat = c"
          >
            {{ c }}
          </button>
        </div>
      </div>

      <!-- Featured -->
      <NuxtLink v-if="featured" class="feat" :to="`/tours/${featured.slug.current}`">
        <div class="featTop">
          <div class="featTag">Featured</div>
          <div class="featTitle">{{ featured.title }}</div>
          <div class="featMeta">{{ featured.category }} • {{ featured.location }}</div>
        </div>

        <img
          v-if="featured.heroImage"
          class="featImg"
          :src="urlFor(featured.heroImage).width(1800).url()"
          alt=""
        />
        <div v-else class="featImg placeholder">Add a hero image in Sanity</div>
      </NuxtLink>

      <div v-else class="feat placeholderCard">
        <div class="placeholder">No tours yet — publish one in Sanity.</div>
      </div>
    </div>

    <!-- Partner strip -->
    <div class="partners teal-edge">
      <div class="pLabel">Built for</div>
      <div class="pRow">
        <div class="pill">Heritage Sites</div>
        <div class="pill">Museums</div>
        <div class="pill">Hospitality</div>
        <div class="pill">Commercial Outlets</div>
      </div>
    </div>

    <!-- List Head -->
    <div class="sectionHead">
      <h2>All tours</h2>
      <div class="count">{{ filtered.length }} items</div>
    </div>

    <div v-if="pending" class="state">Loading tours…</div>
    <div v-else-if="error" class="state">Error loading tours.</div>

    <!-- Grid -->
    <div v-else class="grid">
      <NuxtLink
        v-for="t in filtered"
        :key="t._id"
        class="card"
        :to="`/tours/${t.slug.current}`"
      >
        <img v-if="t.heroImage" :src="urlFor(t.heroImage).width(1400).url()" alt="" />
        <div v-else class="img placeholder">No image</div>

        <div class="meta">
          <div class="tag">{{ t.category }}</div>
          <div class="title">{{ t.title }}</div>
          <div class="sub">{{ t.location }}</div>
          <div class="sum">{{ t.summary }}</div>
        </div>

        <div class="cardFooter">
          <span class="open">Open tour →</span>
        </div>
      </NuxtLink>
    </div>

    <!-- Bottom CTA -->
    <div class="bottomCta teal-edge">
      <div>
        <div class="k">Request a custom tour</div>
        <div class="big">Turn your space into a global experience.</div>
      </div>
      <NuxtLink class="cta rust-glow" to="/contact">Start Project</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.wrap{ max-width:1100px; margin:0 auto; padding:120px 18px; color:white; }

.hero{
  display:grid;
  grid-template-columns: 1.05fr 1fr;
  gap:18px;
  margin-top: 10px;
  padding: 22px;
  border-radius: 26px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  backdrop-filter: blur(12px);
}

.k{ color:var(--rust); letter-spacing:1px; text-transform:uppercase; font-size:12px; }
h1{ font-size:56px; font-weight:300; margin: 10px 0 12px; }
.muted{ opacity:.85; line-height:1.85; max-width: 62ch; }

.searchRow{ margin-top: 14px; display:flex; gap:12px; flex-wrap:wrap; }
.search{
  flex: 1 1 320px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  color: white;
  padding: 12px 14px;
  border-radius: 14px;
  outline: none;
}
.cta{
  display:inline-block;
  background:var(--rust);
  padding: 12px 18px;
  border-radius:999px;
  color:white;
  text-decoration:none;
  white-space:nowrap;
}

.chips{ margin-top: 14px; display:flex; gap:10px; flex-wrap:wrap; }
.chip{
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  color:white;
  padding: 10px 14px;
  border-radius:999px;
  cursor:pointer;
  opacity:.9;
}
.chip.on{
  background: rgba(201,123,46,0.18);
  border-color: rgba(201,123,46,0.35);
  opacity: 1;
}

.feat{
  display:block;
  text-decoration:none;
  color:white;
  border-radius: 22px;
  overflow:hidden;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(0,0,0,0.18);
  position: relative;
  min-height: 320px;
}
.featTop{
  position:absolute;
  inset: 18px 18px auto 18px;
  z-index:2;
  background: rgba(8,20,26,0.55);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 14px 14px;
  backdrop-filter: blur(10px);
}
.featTag{ color:var(--rust); text-transform:uppercase; letter-spacing:1px; font-size:12px; }
.featTitle{ margin-top: 8px; font-size: 18px; font-weight: 700; }
.featMeta{ margin-top: 6px; opacity:.85; font-size: 14px; }
.featImg{ width:100%; height: 360px; object-fit: cover; display:block; }
.placeholder{ display:flex; align-items:center; justify-content:center; opacity:.8; padding: 26px; }
.placeholderCard{ border-radius:22px; }

.partners{
  margin-top: 18px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;
}
.pLabel{ opacity:.75; }
.pRow{ display:flex; gap:10px; flex-wrap:wrap; }
.pill{
  padding: 10px 12px;
  border-radius:999px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  opacity:.92;
}

.sectionHead{
  margin-top: 38px;
  display:flex; justify-content:space-between; align-items:end; gap:12px;
}
h2{ font-size: 34px; font-weight:300; margin:0; }
.count{ opacity:.75; }

.state{ opacity:.7; margin-top: 20px; }

.grid{
  margin-top: 18px;
  display:grid;
  grid-template-columns: repeat(auto-fit,minmax(260px,1fr));
  gap: 18px;
}
.card{
  text-decoration:none;
  color:white;
  border-radius: 18px;
  overflow:hidden;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  transition: all .35s ease;
  backdrop-filter: blur(12px);
}
.card:hover{
  background: rgba(201,101,61,0.16);
  border-color: rgba(201,101,61,0.45);
  transform: translateY(-6px);
}
.card img, .img{
  width:100%;
  height: 170px;
  object-fit:cover;
  display:block;
}
.meta{ padding: 16px; }
.tag{ color:var(--rust); font-size: 12px; letter-spacing:1px; text-transform:uppercase; }
.title{ margin-top: 10px; font-weight: 800; }
.sub{ margin-top: 6px; opacity:.85; font-size: 14px; }
.sum{ margin-top: 10px; opacity:.85; line-height: 1.6; }
.cardFooter{
  padding: 0 16px 16px;
  opacity:.9;
}
.open{ color: rgba(255,255,255,0.85); }

.bottomCta{
  margin-top: 42px;
  padding: 22px;
  border-radius: 22px;
  background: radial-gradient(circle at 20% 10%, rgba(201,123,46,0.18), rgba(44,122,131,0.10));
  border: 1px solid rgba(255,255,255,0.08);
  display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;
}
.big{ margin-top: 8px; font-size: 18px; opacity:.9; }

@media(max-width: 900px){
  .hero{ grid-template-columns: 1fr; }
  .featImg{ height: 300px; }
}
</style>