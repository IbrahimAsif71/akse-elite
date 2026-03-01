<script setup>
import { ref, computed, onMounted } from 'vue'
import { sanity, urlFor } from '~/utils/sanity'

/* ---------------------------
   PREMIUM TOP INTERACTIONS
---------------------------- */
const cap = ref('Preserve')
const caps = [
  {
    key: 'Preserve',
    title: 'Preserve Heritage',
    desc: 'Archival-grade capture and documentation-first workflows for cultural memory.'
  },
  {
    key: 'Experience',
    title: 'Cinematic Experiences',
    desc: 'Immersive 360 pathways with guided narratives, hotspots, and premium motion.'
  },
  {
    key: 'Convert',
    title: 'Commercial Impact',
    desc: 'Spatial marketing that increases engagement and drives bookings, visits, and trust.'
  }
]
const setCap = (k) => (cap.value = k)

// Subtle mouse parallax for hero orb
const mx = ref(0)
const my = ref(0)
const onHeroMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  mx.value = ((e.clientX - r.left) / r.width - 0.5) * 12
  my.value = ((e.clientY - r.top) / r.height - 0.5) * 12
}

/* ---------------------------
   ARCHIVE DATA (SANITY)
---------------------------- */
const filter = ref('All')
const types = ['All', 'Photo', 'Scan', '3D Model', '360 Tour', 'Story']

const { data: archive, pending, error, refresh } = await useAsyncData(
  'archive',
  () =>
    sanity.fetch(`*[_type=="archiveItem"] | order(year desc, _createdAt desc){
      _id, title, type, location, year, description, thumbnail, images, url
    }`),
  { server: true }
)

onMounted(() => refresh())

const filtered = computed(() => {
  const list = archive.value || []
  if (filter.value === 'All') return list
  return list.filter((i) => (i.type || '') === filter.value)
})

/* ---------------------------
   INLINE EXPAND GALLERY
---------------------------- */
const expandedId = ref(null)
const activeImgIndex = ref(0)

const toggleExpand = (item) => {
  if (expandedId.value === item._id) {
    expandedId.value = null
    return
  }
  expandedId.value = item._id
  activeImgIndex.value = 0

  // Smooth scroll to expanded panel
  requestAnimationFrame(() => {
    const el = document.getElementById(`exp-${item._id}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}

const setImg = (i) => {
  activeImgIndex.value = i
}
</script>

<template>
  <section class="wrap">
    <!-- =========================
         PREMIUM ABOUT TOP
    ========================== -->

    <!-- HERO -->
    <section class="hero" @mousemove="onHeroMove">
      <div class="heroLeft">
        <div class="k">About akse</div>
        <h1>We build digital heritage that feels cinematic and lasts like an archive.</h1>
        <p class="muted">
          akse creates archival-grade 3D and 360° pathways for heritage sites, museums, and premium spaces —
          designed to educate, protect, and inspire future generations.
        </p>

        <div class="heroActions">
         <Magnetic>
  <NuxtLink class="btn" to="/contact">Start a Project</NuxtLink>
</Magnetic>
          <NuxtLink class="ghost" to="/tours">Explore Tours</NuxtLink>
        </div>

        <div class="trust">
          <div class="trustItem"><span class="dot"></span> Heritage-first workflow</div>
          <div class="trustItem"><span class="dot"></span> Museum-grade capture</div>
          <div class="trustItem"><span class="dot"></span> Global-ready delivery</div>
        </div>
      </div>

      <div class="heroRight">
        <div class="orb" :style="{ transform: `translate(${mx}px, ${my}px)` }"></div>

        <div class="glassCard">
          <div class="miniK">Positioning</div>
          <div class="miniT">Preserve • Present • Elevate</div>
          <div class="miniP">
            We don’t just “make tours”. We turn spaces into living digital archives with premium UX and storytelling.
          </div>
        </div>

        <div class="stats">
          <div class="stat">
            <div class="n">3D</div>
            <div class="l">Capture</div>
          </div>
          <div class="stat">
            <div class="n">360°</div>
            <div class="l">Pathways</div>
          </div>
          <div class="stat">
            <div class="n">Archive</div>
            <div class="l">Intent</div>
          </div>
          <div class="stat">
            <div class="n">Global</div>
            <div class="l">Ready</div>
          </div>
        </div>
      </div>
    </section>

    <!-- WHO WE ARE / WHAT WE DO -->
    <section class="pillars">
      <div class="p">
        <div class="pk">Who we are</div>
        <div class="pt">A heritage-tech studio</div>
        <div class="pd">We combine preservation ethics with cinematic interaction design.</div>
      </div>
      <div class="p">
        <div class="pk">What we do</div>
        <div class="pt">3D + 360 + storytelling</div>
        <div class="pd">We capture spaces, craft guided journeys, and publish beautiful experiences.</div>
      </div>
      <div class="p">
        <div class="pk">Why it matters</div>
        <div class="pt">Digital memory outlives time</div>
        <div class="pd">Our work helps future generations experience spaces that may change or disappear.</div>
      </div>
    </section>

    <!-- CAPABILITIES (Interactive Tabs) -->
    <section class="caps">
      <div class="capsHead">
        <h2>Capabilities</h2>
        <p class="muted">
          Click to explore what akse delivers — preservation-first, globally presented.
        </p>
      </div>

      <div class="capsRow">
        <button
          v-for="c in caps"
          :key="c.key"
          class="capBtn"
          :class="{ on: cap === c.key }"
          @click="setCap(c.key)"
        >
          {{ c.title }}
        </button>
      </div>

      <div class="capPanel">
        <div class="capTitle">{{ caps.find(x => x.key === cap)?.title }}</div>
        <div class="capDesc">{{ caps.find(x => x.key === cap)?.desc }}</div>

        <div class="capGrid">
          <div class="capCard">Cinematic hero + guided narrative</div>
          <div class="capCard">Hotspots, galleries, and archives</div>
          <div class="capCard">Embeddable web + VR-ready delivery</div>
          <div class="capCard">Performance + SEO authority architecture</div>
        </div>
      </div>
    </section>

    <!-- PROCESS TEASER -->
    <section class="processTeaser">
      <div>
        <h2>How we work</h2>
        <p class="muted">A precision workflow — built to preserve detail, story, and experience.</p>
      </div>

      <div class="steps">
        <NuxtLink class="step" to="/blog">
          <div class="sK">01</div>
          <div class="sT">Capture</div>
          <div class="sD">Scan + shoot the space with archival intent.</div>
        </NuxtLink>

        <NuxtLink class="step" to="/blog">
          <div class="sK">02</div>
          <div class="sT">Craft</div>
          <div class="sD">Design pathways, story points, and interactions.</div>
        </NuxtLink>

        <NuxtLink class="step" to="/blog">
          <div class="sK">03</div>
          <div class="sT">Publish</div>
          <div class="sD">Deliver fast, embeddable experiences and archives.</div>
        </NuxtLink>
      </div>
    </section>

    <!-- =========================
         ARCHIVE SECTION (KEEP)
    ========================== -->

    <div class="archiveHead">
      <div>
        <h2>Gallery & Archive</h2>
        <p class="muted">A growing library of scans, captures, models, and stories.</p>
      </div>

      <div class="filters">
        <button
          v-for="t in types"
          :key="t"
          class="chip"
          :class="{ on: filter === t }"
          @click="filter = t"
        >
          {{ t }}
        </button>
      </div>
    </div>

    <div v-if="pending" class="state">Loading archive…</div>
    <div v-else-if="error" class="state">Error loading archive.</div>

    <div v-else class="grid">
      <div v-for="item in filtered" :key="item._id" class="slot">
        <!-- Card -->
        <div class="card" @click="toggleExpand(item)">
          <img
            v-if="item.thumbnail"
            :src="urlFor(item.thumbnail).width(1200).url()"
            alt=""
          />
          <div v-else class="ph">No thumbnail</div>

          <div class="meta">
            <div class="tag">{{ item.type }}</div>
            <div class="title">{{ item.title }}</div>
            <div class="sub">{{ item.location }}</div>
          </div>
        </div>

        <!-- Expanded panel under the card -->
        <div
          v-if="expandedId === item._id"
          class="expand"
          :id="`exp-${item._id}`"
        >
          <div class="expandTop">
            <div>
              <div class="expandTitle">{{ item.title }}</div>
              <div class="expandMeta">
                <span v-if="item.location">{{ item.location }}</span>
                <span v-if="item.year"> • {{ item.year }}</span>
                <span v-if="item.type"> • {{ item.type }}</span>
              </div>
            </div>

            <button class="closeBtn" @click="expandedId = null">Close ✕</button>
          </div>

          <!-- Main image: album first, else thumbnail -->
          <img
            v-if="item.images?.length"
            class="bigImg"
            :src="urlFor(item.images[activeImgIndex]).width(2200).url()"
            alt=""
          />
          <img
            v-else-if="item.thumbnail"
            class="bigImg"
            :src="urlFor(item.thumbnail).width(2200).url()"
            alt=""
          />

          <!-- Thumbnails -->
          <div v-if="item.images?.length" class="thumbRow">
            <button
              v-for="(img, i) in item.images"
              :key="i"
              class="thumb"
              :class="{ on: i === activeImgIndex }"
              @click="setImg(i)"
            >
              <img :src="urlFor(img).width(320).url()" alt="" />
            </button>
          </div>

          <p v-if="item.description" class="desc">
            {{ item.description }}
          </p>

          <a
            v-if="item.url"
            class="link"
            :href="item.url"
            target="_blank"
            rel="noreferrer"
          >
            Open external link →
          </a>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="ctaBlock surface">
      <div>
        <div class="k">Want your site archived?</div>
        <div class="big">We can digitize your space with museum-grade detail.</div>
      </div>
      <NuxtLink class="cta" to="/contact">Start a Project</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
/* Base */
.wrap{ max-width:1100px; margin:0 auto; padding:120px 18px; color:white; }
.muted{ opacity:.85; line-height:1.85; max-width: 80ch; }
.k{ color:var(--rust); letter-spacing:1px; text-transform:uppercase; font-size:12px; }
h2{ font-size:40px; font-weight:300; margin:0; }

/* HERO */
.hero{
  display:grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 18px;
  padding: 18px;
  margin-top: 10px;
  border-radius: 26px;
  background: radial-gradient(circle at 20% 10%, rgba(201,123,46,0.16), rgba(19,43,53,0.45));
  border: 1px solid rgba(255,255,255,0.08);
  overflow:hidden;
}
.heroLeft{ padding: 18px; }
.hero h1{ font-size:56px; font-weight:300; margin: 10px 0 12px; }

.heroActions{ display:flex; gap:12px; flex-wrap:wrap; margin-top: 16px; }
.cta{
  display:inline-block;
  background:var(--rust);
  padding: 12px 18px;
  border-radius:999px;
  color:white;
  text-decoration:none;
}
.ghost{
  display:inline-block;
  padding: 12px 18px;
  border-radius:999px;
  color:white;
  text-decoration:none;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.04);
}

.trust{ margin-top: 18px; display:flex; gap:14px; flex-wrap:wrap; opacity:.9; }
.trustItem{ display:flex; align-items:center; gap:8px; }
.dot{ width:8px; height:8px; border-radius:999px; background: rgba(201,123,46,0.9); }

.heroRight{ position: relative; padding: 18px; min-height: 360px; }
.orb{
  position:absolute;
  width: 360px;
  height: 360px;
  border-radius: 999px;
  right: -80px;
  top: -90px;
  background: radial-gradient(circle at 30% 30%, rgba(201,123,46,0.35), rgba(8,20,26,0) 60%);
  filter: blur(2px);
  transition: transform 120ms ease-out;
}
.glassCard{
  position: relative;
  z-index: 2;
  padding: 18px;
  border-radius: 20px;
  background: rgba(8,20,26,0.45);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
}
.miniK{ opacity:.75; font-size:12px; letter-spacing:1px; text-transform:uppercase; }
.miniT{ margin-top: 10px; font-weight:700; }
.miniP{ margin-top: 10px; opacity:.85; line-height:1.7; }

.stats{
  margin-top: 14px;
  display:grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 12px;
  position: relative;
  z-index: 2;
}
.stat{
  padding: 14px;
  border-radius: 18px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  transition: transform .35s ease;
}
.stat:hover{ transform: translateY(-6px); }
.n{ color:var(--rust); font-size: 22px; }
.l{ opacity:.85; margin-top: 6px; }

/* PILLARS */
.pillars{
  margin-top: 22px;
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(240px,1fr));
  gap: 18px;
}
.p{
  padding: 22px;
  border-radius: 20px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  transition: transform .35s ease;
}
.p:hover{ transform: translateY(-8px); }
.pk{ color:var(--rust); text-transform:uppercase; letter-spacing:1px; font-size:12px; }
.pt{ margin-top: 10px; font-weight:800; }
.pd{ margin-top: 8px; opacity:.85; line-height:1.7; }

/* CAPABILITIES */
.caps{ margin-top: 34px; }
.capsHead p{ margin-top: 10px; }
.capsRow{ margin-top: 14px; display:flex; gap:10px; flex-wrap:wrap; }
.capBtn{
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.04);
  color:white;
  cursor:pointer;
}
.capBtn.on{
  background: rgba(201,123,46,0.18);
  border-color: rgba(201,123,46,0.35);
}
.capPanel{
  margin-top: 14px;
  padding: 18px;
  border-radius: 22px;
  background:#0b1d26;
  border: 1px solid rgba(255,255,255,0.08);
}
.capTitle{ font-weight:800; font-size: 18px; }
.capDesc{ margin-top: 8px; opacity:.85; line-height:1.7; }
.capGrid{ margin-top: 14px; display:grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr)); gap: 12px; }
.capCard{
  padding: 14px;
  border-radius: 18px;
  background: linear-gradient(180deg, var(--surface-2), var(--surface));
  border-top: 1px solid rgba(30,107,114,0.25);
  border: 1px solid rgba(255,255,255,0.06);
  opacity:.92;
  transition: transform .35s ease;
}
.capCard:hover{ transform: translateY(-6px); }

/* PROCESS TEASER */
.processTeaser{ margin-top: 34px; }
.steps{ margin-top: 14px; display:grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap: 14px; }
.step{
  text-decoration:none;
  color:white;
  padding: 18px;
  border-radius: 20px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  transition: transform .35s ease, border-color .35s ease;
}
.step:hover{ transform: translateY(-8px); border-color: rgba(201,123,46,0.35); }
.sK{ color:var(--rust); letter-spacing:1px; font-weight:800; }
.sT{ margin-top: 10px; font-weight:800; }
.sD{ margin-top: 8px; opacity:.85; line-height:1.7; }

/* ARCHIVE HEAD */
.archiveHead{
  margin-top: 38px;
  display:flex;
  justify-content:space-between;
  align-items:flex-end;
  gap: 12px;
  flex-wrap:wrap;
}
.filters{ display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end; }
.chip{
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  color:white;
  padding: 10px 14px;
  border-radius:999px;
  cursor:pointer;
  opacity:.9;
}
.chip.on{
  background: rgba(201,123,46,0.18);
  border-color: rgba(201,123,46,0.35);
  opacity:1;
}
.state{ opacity:.7; margin-top: 18px; }

/* ARCHIVE GRID */
.grid{
  margin-top: 18px;
  display:grid;
  grid-template-columns: repeat(auto-fit,minmax(240px,1fr));
  gap: 18px;
}
.slot{ display:block; }

.card{
  padding: 18px;
  border-radius: 18px;
  background: rgba(32,16,14,0.55);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  transition: all .35s ease;
  font-weight: 600;
}

.card:hover{
  background: rgba(201,101,61,0.16);
  border-color: rgba(201,101,61,0.45);
  transform: translateY(-6px);
}
.card img{ width:100%; height: 170px; object-fit:cover; display:block; }
.ph{ height:170px; display:flex; align-items:center; justify-content:center; opacity:.75; }
.meta{ padding: 16px; }
.tag{ color:var(--rust); text-transform:uppercase; letter-spacing:1px; font-size:12px; }
.title{ margin-top: 10px; font-weight:800; }
.sub{ margin-top: 6px; opacity:.85; font-size: 14px; }

/* Expanded panel */
.expand{
  margin-top: 12px;
  border-radius: 20px;
  overflow:hidden;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  animation: expandIn .22s ease;
}
@keyframes expandIn{
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.expandTop{
  display:flex;
  justify-content:space-between;
  gap:12px;
  align-items:flex-start;
  padding: 14px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.expandTitle{ font-weight: 900; }
.expandMeta{ margin-top: 6px; opacity:.8; font-size: 14px; }

.closeBtn{
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  color: white;
  border-radius: 12px;
  padding: 10px 12px;
  cursor:pointer;
}
.closeBtn:hover{ border-color: rgba(201,123,46,0.45); }

.bigImg{
  width:100%;
  max-height: 460px;
  object-fit: cover;
  display:block;
  background:#000;
}

.thumbRow{
  display:flex;
  gap:10px;
  padding: 14px;
  overflow:auto;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.thumb{
  border: 1px solid rgba(255,255,255,0.10);
  background: transparent;
  padding: 0;
  border-radius: 12px;
  overflow:hidden;
  cursor:pointer;
  flex: 0 0 auto;
  opacity: .85;
}
.thumb.on{
  border-color: rgba(201,123,46,0.55);
  opacity: 1;
}
.thumb img{
  width: 90px;
  height: 64px;
  object-fit: cover;
  display:block;
}

.desc{
  padding: 0 14px 14px;
  margin: 0;
  opacity:.9;
  line-height:1.85;
}
.link{
  display:block;
  padding: 0 14px 16px;
  color:var(--rust);
  text-decoration:none;
}
.link:hover{ text-decoration: underline; }

/* CTA Block */
.ctaBlock{
  margin-top: 42px;
  padding: 22px;
  border-radius: 22px;
  background: radial-gradient(circle at 20% 10%, rgba(201,123,46,0.18), rgba(19,43,53,0.55));
  border: 1px solid rgba(255,255,255,0.08);
  display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;
}
.big{ margin-top: 8px; font-size: 18px; opacity:.9; }

@media(max-width: 900px){
  .hero{ grid-template-columns: 1fr; }
  .hero h1{ font-size: 44px; }
  .heroRight{ min-height: 260px; }
}
</style>