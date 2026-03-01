<template>
  <section class="wrap">
    <h2>What partners say</h2>
    <div class="grid">
      <div class="q">
        <p>“akse made our heritage space feel timeless — cinematic, accessible, and deeply respectful.”</p>
        <div class="by">— Cultural Partner</div>
      </div>
      <div class="q">
        <p>“The 360 pathway increased online engagement and gave us a premium global presence.”</p>
        <div class="by">— Commercial Client</div>
      </div>
      <div class="q">
        <p>“Their attention to detail feels like museum-grade archiving, not just marketing.”</p>
        <div class="by">— Curator</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wrap{ max-width:1100px; margin:0 auto; padding: 90px 18px; color:white; }
h2{ font-size:44px; font-weight:300; margin:0 0 18px; }
.grid{ display:grid; grid-template-columns: repeat(auto-fit,minmax(260px,1fr)); gap:18px; }
.q{
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 22px;
}
p{ margin:0; opacity:.9; line-height:1.8; }
.by{ margin-top: 14px; opacity:.75; }
</style>