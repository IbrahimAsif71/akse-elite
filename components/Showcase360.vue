<template>
  <section class="wrap">
    <div class="shell">
      <div class="copy">
        <div class="k">Featured Experience</div>
        <h2>Step inside a preserved story</h2>
        <p class="muted">A flagship 360° pathway — designed to feel like a film, built to endure like an archive.</p>

        <div class="actions">
          <NuxtLink class="btn" to="/tours">Explore Tours</NuxtLink>
          <Magnetic>
  <NuxtLink class="btn" to="/contact">Start a Project</NuxtLink>
</Magnetic>
        </div>
      </div>

      <div class="frame">
        <!-- Replace with your real tour iframe URL -->
        <iframe
          src="https://example.com"
          loading="lazy"
          allowfullscreen
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.wrap{ max-width:1100px; margin:0 auto; padding: 40px 18px 90px; color:white; }
.shell{
  display:grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 18px;
  padding: 22px;
  border-radius: 24px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
}
.k{ color:var(--rust); letter-spacing:1px; text-transform:uppercase; font-size:12px; }
h2{ font-size:40px; font-weight:300; margin: 10px 0 10px; }
.muted{ opacity:.85; line-height:1.8; }
.actions{ margin-top: 16px; display:flex; gap: 12px; flex-wrap:wrap; }
.btn{ display:inline-block; background:var(--rust); color:white; text-decoration:none; padding: 12px 18px; border-radius:999px; }
.ghost{ background: transparent; border: 1px solid rgba(255,255,255,0.35); }
.frame{ border-radius: 18px; overflow:hidden; background:#000; border: 1px solid rgba(255,255,255,0.08); }
iframe{ width:100%; height: 420px; border:0; display:block; }
@media(max-width:900px){
  .shell{ grid-template-columns:1fr; }
  iframe{ height: 520px; }
}
</style>