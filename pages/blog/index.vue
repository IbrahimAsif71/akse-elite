<script setup>
import { ref, computed, onMounted } from 'vue'
import { sanity, urlFor } from '~/utils/sanity'

/* ===============================
   BLOG DATA (Sanity)
================================ */

const category = ref('All')

const { data: posts, pending, error, refresh } = await useAsyncData(
  'blogPosts',
  () =>
    sanity.fetch(`*[_type=="blogPost"] | order(publishedAt desc){
      _id,
      title,
      slug,
      excerpt,
      category,
      featured,
      publishedAt,
      mainImage
    }`),
  { server: true }
)

onMounted(() => refresh())

const categories = computed(() => {
  const list = posts.value || []
  const unique = [...new Set(list.map(p => p.category).filter(Boolean))]
  return ['All', ...unique]
})

const filteredPosts = computed(() => {
  const list = posts.value || []
  if (category.value === 'All') return list
  return list.filter(p => p.category === category.value)
})

const featuredPost = computed(() => {
  const list = posts.value || []
  return list.find(p => p.featured) || list[0]
})

/* ===============================
   CONTACT FORM
================================ */

const sending = ref(false)
const sent = ref(false)

const handleSubmit = async (e) => {
  sending.value = true
  const form = e.target
  const data = new FormData(form)

  await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString()
  })

  sending.value = false
  sent.value = true
  form.reset()
}
</script>

<template>
<section class="wrap">

  <!-- =======================
       BLOG HERO
  ======================== -->
  <section class="blogHero">
    <div>
      <div class="k">Journal</div>
      <h1>Insights on Digital Heritage & Immersive Storytelling</h1>
      <p class="muted">
        We document preservation, immersive design, 3D capture workflows,
        and the future of cultural storytelling.
      </p>
    </div>
  </section>

  <!-- =======================
       FEATURED POST
  ======================== -->
  <div v-if="featuredPost" class="featured">
    <div class="featuredImg">
      <img
        v-if="featuredPost.mainImage"
        :src="urlFor(featuredPost.mainImage).width(1600).url()"
        alt=""
      />
    </div>
    <div class="featuredContent">
      <div class="tag">{{ featuredPost.category }}</div>
      <h2>{{ featuredPost.title }}</h2>
      <p>{{ featuredPost.excerpt }}</p>

      <NuxtLink
        class="readBtn"
        :to="`/blog/${featuredPost.slug?.current}`"
      >
        Read Article →
      </NuxtLink>
    </div>
  </div>

  <!-- =======================
       CATEGORY FILTER
  ======================== -->
  <div class="filters">
    <button
      v-for="c in categories"
      :key="c"
      class="chip"
      :class="{ on: category === c }"
      @click="category = c"
    >
      {{ c }}
    </button>
  </div>

  <!-- =======================
       BLOG GRID
  ======================== -->
  <div v-if="pending" class="state">Loading posts...</div>
  <div v-else-if="error" class="state">Error loading posts.</div>

  <div v-else class="grid">
    <NuxtLink
      v-for="post in filteredPosts"
      :key="post._id"
      class="card"
      :to="`/blog/${post.slug?.current}`"
    >
      <img
        v-if="post.mainImage"
        :src="urlFor(post.mainImage).width(800).url()"
      />
      <div class="meta">
        <div class="tag">{{ post.category }}</div>
        <div class="title">{{ post.title }}</div>
        <div class="excerpt">{{ post.excerpt }}</div>
      </div>
    </NuxtLink>
  </div>

  <!-- =======================
       CONTACT SECTION
  ======================== -->
  <section class="contactSection">
    <div class="contactLeft">
      <div class="k">Start a Project</div>
      <h2>Let’s Preserve Something Meaningful.</h2>
      <p class="muted">
        Tell us about your site, museum, commercial space, or archival need.
        We’ll design a cinematic digital preservation strategy for you.
      </p>
    </div>

    <div class="contactRight">

      <form
  name="start-project"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  action="/thank-you"
>
  <input type="hidden" name="form-name" value="start-project" />

  <p hidden>
    <input name="bot-field" />
  </p>

  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>

  <button type="submit">Send</button>
</form>

    </div>
  </section>

</section>
</template>

<style scoped>
.wrap{ max-width:1100px; margin:0 auto; padding:120px 18px; color:white; }
.k{ color:var(--rust); text-transform:uppercase; font-size:12px; letter-spacing:1px; }
.muted{ opacity:.85; line-height:1.8; }

.blogHero h1{ font-size:52px; font-weight:300; margin:10px 0 12px; }

/* Featured */
.featured{
  margin-top:30px;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
  background: linear-gradient(180deg, var(--surface-2), var(--surface));
  border-top: 1px solid rgba(30,107,114,0.25);
  border-radius:24px;
  overflow:hidden;
}
.featuredImg img{
  width:100%;
  height:100%;
  object-fit:cover;
}
.featuredContent{ padding:30px; }
.featuredContent h2{ margin:12px 0; }
.readBtn{
  display:inline-block;
  margin-top:14px;
  color:var(--rust);
  text-decoration:none;
}

/* Filters */
.filters{ margin-top:30px; display:flex; gap:10px; flex-wrap:wrap; }
.chip{
  padding:10px 14px;
  border-radius:999px;
  background: linear-gradient(180deg, var(--surface-2), var(--surface));
  border-top: 1px solid rgba(30,107,114,0.25);
  border:1px solid rgba(255,255,255,0.1);
  cursor:pointer;
}
.chip.on{ background:var(--rust); }

/* Grid */
.grid{
  margin-top:30px;
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:20px;
}
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
.card img{ width:100%; height:180px; object-fit:cover; }
.meta{ padding:16px; }
.title{ font-weight:700; margin-top:10px; }
.excerpt{ margin-top:6px; opacity:.8; }

/* Contact */
.contactSection{
  margin-top:80px;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:40px;
  padding:40px;
  background:#0b1d26;
  border-radius:30px;
}
.contactRight form{
  display:flex;
  flex-direction:column;
  gap:14px;
}
input, select, textarea{
  padding:12px;
  border-radius:12px;
  border:1px solid rgba(255,255,255,0.2);
  background: linear-gradient(180deg, var(--surface-2), var(--surface));
  border-top: 1px solid rgba(30,107,114,0.25);
  color:white;
}
button{
  padding:14px;
  border-radius:999px;
  background:var(--rust);
  border:none;
  color:white;
  cursor:pointer;
}
.success{ margin-top:10px; color:var(--rust); }

@media(max-width:900px){
  .featured{ grid-template-columns:1fr; }
  .contactSection{ grid-template-columns:1fr; }
}
</style>