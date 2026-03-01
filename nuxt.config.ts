export default defineNuxtConfig({
  nitro: {
    preset: 'netlify'
  },
  runtimeConfig: {
    public: {
      sanityProjectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID || '44elzz3z',
      sanityDataset: process.env.NUXT_PUBLIC_SANITY_DATASET || 'production',
      sanityApiVersion: process.env.NUXT_PUBLIC_SANITY_API_VERSION || '2026-03-01'
    }
  }
})