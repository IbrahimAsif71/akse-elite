<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Luxury page transitions */
.page-enter-active,
.page-leave-active{
  transition:
    opacity .55s cubic-bezier(.2,.8,.2,1),
    transform .55s cubic-bezier(.2,.8,.2,1),
    filter .55s cubic-bezier(.2,.8,.2,1);
  will-change: opacity, transform, filter;
}
.page-enter-from{
  opacity: 0;
  transform: translateY(10px) scale(0.995);
  filter: blur(6px);
}
.page-leave-to{
  opacity: 0;
  transform: translateY(-8px) scale(0.995);
  filter: blur(6px);
}
</style>