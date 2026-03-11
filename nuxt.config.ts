import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  nitro: {
    preset: "netlify",
  },

  css: ["~/assets/css/main.css"],

  modules: ["shadcn-nuxt", "@nuxt/fonts", "@nuxtjs/color-mode"],

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },

  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      sanityProjectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID || "44elzz3z",
      sanityDataset: process.env.NUXT_PUBLIC_SANITY_DATASET || "production",
      sanityApiVersion:
        process.env.NUXT_PUBLIC_SANITY_API_VERSION || "2026-03-01",
    },
  },

  compatibilityDate: "2025-01-01",
});
