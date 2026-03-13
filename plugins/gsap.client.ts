import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Reduced motion: set near-zero defaults as a safety net
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReduced) {
    gsap.defaults({ duration: 0.05 });
  }

  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  };
});
