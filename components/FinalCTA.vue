<template>
  <section class="wrap">
    <div class="panel">
      <h2>Ready to preserve your space?</h2>
      <p class="muted">Tell us what you want to digitize. We’ll propose a cinematic pathway and delivery timeline.</p>
      <div class="actions">
        <Magnetic>
  <NuxtLink class="btn" to="/contact">Start a Project</NuxtLink>
</Magnetic>
        <a class="btn ghost" href="mailto:hello@akse.com">Email</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wrap{ max-width:1100px; margin:0 auto; padding: 40px 18px 120px; color:white; }
.panel{
  border-radius: 26px;
  padding: 42px 26px;
  background: radial-gradient(circle at 20% 10%, rgba(201,123,46,0.18), rgba(19,43,53,0.55));
  border: 1px solid rgba(255,255,255,0.08);
}
h2{ font-size:44px; font-weight:300; margin:0 0 10px; }
.muted{ opacity:.85; line-height:1.8; max-width: 72ch; }
.actions{ margin-top: 18px; display:flex; gap: 12px; flex-wrap:wrap; }
.btn{ display:inline-block; background:var(--rust); color:white; text-decoration:none; padding: 12px 18px; border-radius:999px; }
.ghost{ background:transparent; border: 1px solid rgba(255,255,255,0.35); }
</style>