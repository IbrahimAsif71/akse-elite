import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default defineNuxtPlugin(() => {
  // Skip Lenis entirely when reduced motion is preferred
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReduced) {
    return {
      provide: {
        lenis: null,
      },
    };
  }

  // Create single Lenis instance
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
  });

  // Run Lenis on GSAP ticker for single unified RAF loop
  const tickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  // Wire ScrollTrigger updates to Lenis scroll events
  lenis.on("scroll", ScrollTrigger.update);

  // Reset scroll on route change
  const router = useRouter();
  const unregisterGuard = router.afterEach(() => {
    lenis.scrollTo(0, { immediate: true });
  });

  // HMR cleanup
  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
      unregisterGuard();
    });
  }

  return {
    provide: {
      lenis,
    },
  };
});
