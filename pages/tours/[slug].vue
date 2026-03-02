<script setup lang="ts">
import { sanity, urlFor } from '~/utils/sanity'
import { onMounted, ref } from 'vue'

const route = useRoute()
const slug = route.params.slug as string

const { data: tour, pending, error } = await useAsyncData(`tour-${slug}`, () =>
  sanity.fetch(
    `*[_type=="tour" && slug.current==$slug][0]{
      title,
      category,
      location,
      summary,
      heroImage,
      tourUrl
    }`,
    { slug }
  )
)

// SEO: per-tour meta
useHead(() => ({
  title: tour.value?.title ? `${tour.value.title} — akse` : 'Tour — akse',
  meta: [
    {
      name: 'description',
      content: tour.value?.summary || 'Immersive 360 tour powered by akse.'
    },
    { property: 'og:title', content: tour.value?.title || 'akse Tour' },
    {
      property: 'og:description',
      content: tour.value?.summary || 'Immersive 360 tour powered by akse.'
    }
  ]
}))

// Cinematic entrance
const { $gsap } = useNuxtApp()

const wrap = ref<HTMLElement | null>(null)
const titleEl = ref<HTMLElement | null>(null)
const metaEl = ref<HTMLElement | null>(null)
const heroImg = ref<HTMLElement | null>(null)
const embedEl = ref<HTMLElement | null>(null)

onMounted(() => {
  // Only animate if data exists + refs exist
  if (!wrap.value || !titleEl.value) return

  const tl = $gsap.timeline()

  tl.from(titleEl.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  })
    .from(
      metaEl.value,
      {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      },
      '-=0.7'
    )
    .from(
      heroImg.value,
      {
        scale: 1.03,
        opacity: 0,
        duration: 1.1,
        ease: 'power2.out'
      },
      '-=0.8'
    )
    .from(
      embedEl.value,
      {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      },
      '-=0.6'
    )
})
</script>

<template>
  <section class="wrap" ref="wrap">
    <div v-if="pending" class="state">Loading tour…</div>
    <div v-else-if="error" class="state">Error loading tour.</div>

    <div v-else-if="tour" class="content">
      <div class="top">
        <div class="left">
          <div class="tag">{{ tour.category }}</div>

          <h1 ref="titleEl">{{ tour.title }}</h1>

          <div ref="metaEl" class="meta">
            <div class="loc">{{ tour.location }}</div>
            <p class="sum">{{ tour.summary }}</p>

            <div class="actions">
              <NuxtLink class="btn ghost" to="/tours">Back to Tours</NuxtLink>
              <Magnetic>
  <NuxtLink class="btn" to="/contact">Start a Project</NuxtLink>
</Magnetic>
            </div>
          </div>
        </div>

        <img
          v-if="tour.heroImage"
          ref="heroImg"
          class="heroImg"
          :src="urlFor(tour.heroImage).width(1600).url()"
          alt=""
        />
        <div v-else ref="heroImg" class="heroImg placeholder">
          No hero image added
        </div>
      </div>

      <div ref="embedEl" class="embed">
        <h2>Enter Experience</h2>

        <div v-if="tour.tourUrl" class="frame">
          <iframe
            :src="tour.tourUrl"
            loading="lazy"
            allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
            allowfullscreen
          />
        </div>

        <div v-else class="state inline">
          No tour URL added yet. Add an iframe URL in Sanity → Tour → “360 Tour URL”.
        </div>
      </div>
    </div>

    <div v-else class="state">Tour not found.</div>
  </section>
</template>

<style scoped>
.wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 120px 18px;
  color: white;
}

.state {
  opacity: 0.75;
  padding: 40px 0;
}

.state.inline {
  padding: 18px 0 0;
}

.top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: start;
}

.tag {
  color: ;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 13px;
}

h1 {
  font-size: 56px;
  font-weight: 300;
  margin: 10px 0 14px;
}

.meta {
  margin-top: 6px;
}

.loc {
  opacity: 0.85;
  margin-bottom: 10px;
}

.sum {
  opacity: 0.9;
  line-height: 1.85;
  margin: 0;
  max-width: 52ch;
}

.actions {
  margin-top: 18px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  background: var(--rust);
  padding: 12px 18px;
  border-radius: 999px;
  color: white;
  text-decoration: none;
}

.ghost {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.35);
}

.heroImg {
  width: 100%;
  height: 340px;
  object-fit: cover;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(19, 43, 53, 0.55);
  opacity: 0.85;
}

.embed {
  margin-top: 60px;
}

.embed h2 {
  font-size: 34px;
  font-weight: 300;
  margin: 0 0 16px;
}

.frame {
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #000;
}

iframe {
  width: 100%;
  height: 640px;
  border: 0;
  display: block;
}

@media (max-width: 900px) {
  .top {
    grid-template-columns: 1fr;
  }

  iframe {
    height: 520px;
  }
}
</style>

usePageIntro(() => {
  if (!titleEl.value) return
  const tl = $gsap.timeline()
  tl.from(titleEl.value, { y: 50, opacity: 0, duration: 1, ease: 'power3.out' })
    .from(metaEl.value, { y: 24, opacity: 0, duration: 0.8 }, '-=0.6')
    .from(heroImg.value, { scale: 1.03, opacity: 0, duration: 1.0 }, '-=0.75')
    .from(embedEl.value, { y: 40, opacity: 0, duration: 0.8 }, '-=0.6')
})