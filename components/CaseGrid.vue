<template>
  <section class="wrap">
    <h2>Selected work</h2>
    <p class="muted">A growing archive of immersive pathways created for heritage and commercial environments.</p>

    <div class="grid">
      <NuxtLink class="case" to="/tours">
        <div class="thumb"></div>
        <div class="meta">
          <div class="k">Heritage</div>
          <div class="t">Golra Railway Station</div>
          <div class="d">Rawalpindi</div>
        </div>
      </NuxtLink>

      <NuxtLink class="case" to="/tours">
        <div class="thumb"></div>
        <div class="meta">
          <div class="k">Museum</div>
          <div class="t">Gallery Experience</div>
          <div class="d">Coming Soon</div>
        </div>
      </NuxtLink>

      <NuxtLink class="case" to="/tours">
        <div class="thumb"></div>
        <div class="meta">
          <div class="k">Commercial</div>
          <div class="t">Venue Walkthrough</div>
          <div class="d">Coming Soon</div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.wrap{ max-width:1100px; margin:0 auto; padding: 90px 18px; color:white; }
h2{ font-size:44px; font-weight:300; margin:0 0 10px; }
.muted{ opacity:.85; line-height:1.8; }
.grid{ margin-top: 22px; display:grid; grid-template-columns: repeat(auto-fit,minmax(260px,1fr)); gap:18px; }
.case{
  display:block; text-decoration:none; color:white;
  background: linear-gradient(180deg, var(--surface-2), var(--surface));
  border-top: 1px solid rgba(30,107,114,0.25);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
  overflow:hidden;
  transition: transform .35s ease;
}
.case:hover{ transform: translateY(-10px); }
.thumb{ height: 180px; background: radial-gradient(circle at 20% 20%, rgba(201,123,46,0.18), rgba(8,20,26,0.2)); }
.meta{ padding: 18px; }
.k{ color:var(--rust); text-transform:uppercase; letter-spacing:1px; font-size:12px; }
.t{ margin-top: 10px; font-weight:600; }
.d{ margin-top: 6px; opacity:.85; }
</style>