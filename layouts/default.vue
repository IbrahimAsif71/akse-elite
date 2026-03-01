<template>
  <div class="layoutRoot">
    <ScrollProgress />
    <div class="bg-anim" aria-hidden="true"></div>

    <PageVeil />
    <SiteNav />

    <main class="main">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>

<style>
/* IMPORTANT: global (NOT scoped) so Netlify/prod never falls back to white */
html, body {
  background: var(--bg) !important;
  margin: 0;
}

/* Your luxury background tokens (match what we built before) */
:root{
  --bg: #0e1516;          /* dark teal-black (not pure black) */
  --surface: #141d1e;     /* panels */
  --surface-2: #101718;   /* deeper panels */
  --rust: #b35a2e;        /* luxury rust */
  --teal: #2c7a83;        /* accent teal */
  color-scheme: dark;
}

.layoutRoot{
  min-height: 100vh;
  background: var(--bg);
  position: relative;
  overflow-x: hidden;
}

/* animated ambient background layer (subtle, luxury) */
.bg-anim{
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(900px 600px at 20% 15%, rgba(179,90,46,0.22), transparent 60%),
    radial-gradient(700px 520px at 78% 22%, rgba(44,122,131,0.14), transparent 60%),
    radial-gradient(1000px 700px at 50% 85%, rgba(255,255,255,0.05), transparent 60%),
    linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0));
  filter: saturate(1.05);
  animation: drift 14s ease-in-out infinite alternate;
}

@keyframes drift{
  from{ transform: translate3d(0,0,0) scale(1); }
  to{ transform: translate3d(0,-12px,0) scale(1.02); }
}

.main{
  position: relative;
  z-index: 1; /* ensures content above bg-anim */
}
</style>