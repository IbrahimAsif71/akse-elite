<template>
  <section class="wrap">
    <h2>Immersion built for preservation</h2>
    <p class="muted">We capture, model, and publish cinematic 360° pathways that protect cultural memory and elevate visitor experience.</p>

    <div class="grid">
      <div class="card">
        <div class="k">Heritage</div>
        <h3>Digital conservation for future generations</h3>
        <p>Archival-grade capture, story hotspots, and curated pathways.</p>
      </div>
      <div class="card">
        <div class="k">Museums</div>
        <h3>Interactive collections & gallery navigation</h3>
        <p>Exhibit-level experiences with guided narratives and accessibility.</p>
      </div>
      <div class="card">
        <div class="k">Commercial</div>
        <h3>Premium spatial marketing that converts</h3>
        <p>Restaurants, venues, outlets — immersive browsing that drives action.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wrap{ max-width:1100px; margin:0 auto; padding: 90px 18px; color:white; }
h2{ font-size:44px; font-weight:300; margin: 0 0 10px; }
.muted{ opacity:.85; line-height:1.8; max-width: 72ch; }
.grid{ margin-top: 22px; display:grid; grid-template-columns: repeat(auto-fit,minmax(260px,1fr)); gap:18px; }
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
.k{ color:var(--rust); text-transform:uppercase; letter-spacing:1px; font-size:12px; }
h3{ margin: 10px 0 8px; font-weight:500; }
p{ margin:0; opacity:.85; line-height:1.7; }
</style>