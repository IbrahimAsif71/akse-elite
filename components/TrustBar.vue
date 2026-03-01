<template>
  <section class="wrap">
    <div class="bar">
      <div class="label">Trusted by</div>
      <div class="logos">
        <div class="logo">Museums</div>
        <div class="logo">Heritage Sites</div>
        <div class="logo">Hospitality</div>
        <div class="logo">Public Sector</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wrap{ max-width:1100px; margin:0 auto; padding: 24px 18px; color:white; }
.bar{
  display:flex; align-items:center; justify-content:space-between; gap:16px;
  padding: 16px 18px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px;
  backdrop-filter: blur(10px);
}
.label{ opacity:.8; font-size:14px; letter-spacing:.4px; }
.logos{ display:flex; gap:12px; flex-wrap:wrap; justify-content:flex-end; }
.logo{
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(19,43,53,0.7);
  border: 1px solid rgba(255,255,255,0.06);
  opacity:.9;
}
</style>