<script setup>
import { sanity, urlFor } from '~/utils/sanity'
import { PortableText } from '@portabletext/vue'

const route = useRoute()
const slug = route.params.slug

const { data: post } = await useAsyncData(
  `blog-${slug}`,
  () =>
    sanity.fetch(
      `*[_type=="blogPost" && slug.current==$slug][0]{
        _id,
        title,
        slug,
        excerpt,
        category,
        author,
        publishedAt,
        mainImage,
        body
      }`,
      { slug }
    ),
  { server: true }
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

const formattedDate = computed(() => {
  if (!post.value?.publishedAt) return ''
  return new Date(post.value.publishedAt).toLocaleDateString()
})
</script>

<template>
  <section class="wrap" v-if="post">
    <NuxtLink class="back" to="/blog">← Back to Blog</NuxtLink>

    <div class="tag">{{ post.category }}</div>
    <h1 class="title">{{ post.title }}</h1>

    <div class="meta">
      <span>{{ post.author }}</span>
      <span>•</span>
      <span>{{ formattedDate }}</span>
    </div>

    <p class="excerpt" v-if="post.excerpt">
      {{ post.excerpt }}
    </p>

    <img
      v-if="post.mainImage"
      :src="urlFor(post.mainImage).width(2000).url()"
      class="heroImg"
    />

    <div class="content">
      <PortableText :value="post.body" />
    </div>
  </section>
</template>

<style scoped>
.wrap{ max-width:900px; margin:0 auto; padding:120px 20px; color:white; }
.title{ font-size:48px; font-weight:300; margin:12px 0; }
.tag{ color:var(--rust); text-transform:uppercase; font-size:12px; }
.meta{ opacity:.7; margin-bottom:16px; display:flex; gap:8px; }
.heroImg{ width:100%; border-radius:20px; margin:20px 0; }
.excerpt{ font-size:18px; opacity:.9; margin-bottom:20px; }
.content{ line-height:1.8; }
.back{ color:var(--rust); text-decoration:none; }
.back:hover{ text-decoration:underline; }
</style>