<script setup>
import { ref } from 'vue'
const open = ref(0)
const faqs = [
  { q: 'How long does a tour take?', a: 'Typically 3–10 days depending on size, access, and narrative complexity.' },
  { q: 'Can you embed 360 tours on our website?', a: 'Yes — we provide clean embed links and performance-optimized delivery.' },
  { q: 'Do you work with heritage protection goals?', a: 'Yes — our approach is preservation-first, with archival intent and storytelling.' },
  { q: 'Can this be used on VR headsets?', a: 'Yes — we can deliver VR-ready experiences depending on platform and tour engine.' },
]
</script>

<template>
  <section class="wrap">
    <h2>FAQ</h2>
    <div class="list">
      <button v-for="(f,i) in faqs" :key="i" class="item" @click="open = open===i ? -1 : i">
        <div class="row">
          <div class="q">{{ f.q }}</div>
          <div class="icon">{{ open===i ? '−' : '+' }}</div>
        </div>
        <div v-if="open===i" class="a">{{ f.a }}</div>
      </button>
    </div>
  </section>
</template>

<style scoped>
.wrap{ max-width:1100px; margin:0 auto; padding: 90px 18px; color:white; }
h2{ font-size:44px; font-weight:300; margin:0 0 18px; }
.list{ display:flex; flex-direction:column; gap: 12px; }
.item{
  width:100%;
  text-align:left;
  background: linear-gradient(180deg, var(--surface-2), var(--surface));
  border-top: 1px solid rgba(30,107,114,0.25);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px;
  padding: 18px;
  cursor:pointer;
}
.row{ display:flex; align-items:center; justify-content:space-between; gap:12px; }
.q{ font-weight:600; }
.icon{ opacity:.75; font-size: 18px; }
.a{ margin-top: 12px; opacity:.85; line-height:1.8; }
</style>