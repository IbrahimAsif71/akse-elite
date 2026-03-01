<template>
  <section class="wrap">
    <div class="panel">
      <h2>Preservation impact</h2>
      <div class="grid">
        <div class="stat"><div class="num">25+</div><div class="lbl">Sites Digitized</div></div>
        <div class="stat"><div class="num">150K+</div><div class="lbl">Sq Ft Captured</div></div>
        <div class="stat"><div class="num">300+</div><div class="lbl">Years Preserved</div></div>
        <div class="stat"><div class="num">Global</div><div class="lbl">Ready Architecture</div></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wrap{ max-width:1100px; margin:0 auto; padding: 20px 18px 90px; color:white; }
.panel{
  background:#0b1d26;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 24px;
  padding: 32px;
}
h2{ font-size:38px; font-weight:300; margin:0 0 18px; }
.grid{ display:grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap: 14px; }
.stat{ background: linear-gradient(180deg, var(--surface-2), var(--surface));; border-radius: 18px; padding: 22px; text-align:center; }
.num{ color:var(--rust); font-size:40px; }
.lbl{ opacity:.85; margin-top: 10px; }
</style>