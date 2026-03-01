<template>
  <div>
    <ScrollProgress />
    <div class="bg-anim"></div>

    <PageVeil />
    <SiteNav />

    <main class="main">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.main{
  position: relative;
  z-index: 1; /* ensures content above bg-anim */
}
</style>