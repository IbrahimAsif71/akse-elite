<script setup lang="ts">
import { reactive } from "vue";

const form = reactive({
  name: "",
  email: "",
  message: "",
  "bot-field": ""
});

const encode = (data: Record<string, any>) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key] ?? "")}`)
    .join("&");

const handleSubmit = async () => {
  try {
    await $fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: encode({
        "form-name": "contact",
        ...form
      })
    });

    // go to your Nuxt page (you already have thank-you.vue)
    await navigateTo("/thank-you");
  } catch (e) {
    alert("Form submission failed. Open DevTools > Network and try again.");
  }
};
</script>

<template>
  <section class="wrap">
    <!-- IMPORTANT: This static form markup helps Netlify detect the form at build time -->
    <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <textarea name="message"></textarea>
    </form>

    <h1>Start a Project</h1>

    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      @submit.prevent="handleSubmit"
    >
      <input type="hidden" name="form-name" value="contact" />

      <p class="hidden">
        <label>
          Don’t fill this out:
          <input name="bot-field" v-model="form['bot-field']" />
        </label>
      </p>

      <label>
        Name
        <input name="name" v-model="form.name" required />
      </label>

      <label>
        Email
        <input name="email" type="email" v-model="form.email" required />
      </label>

      <label>
        Message
        <textarea name="message" v-model="form.message" rows="6" required />
      </label>

      <button type="submit">Send</button>
    </form>
  </section>
</template>

<style scoped>
.wrap { max-width: 820px; margin: 0 auto; padding: 120px 18px; color: white; }
label { display:block; margin: 14px 0 6px; opacity: .9; }
input, textarea { width: 100%; padding: 12px 14px; border-radius: 12px; border: 1px solid rgba(255,255,255,.14); background: rgba(0,0,0,.25); color: white; }
button { margin-top: 16px; padding: 12px 18px; border-radius: 999px; border: 0; background: var(--rust); color: white; cursor: pointer; }
.hidden { display:none; }
</style>