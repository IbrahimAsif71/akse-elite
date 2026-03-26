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

  let lenis: Lenis | null = null;
  let tickerCallback: ((time: number) => void) | null = null;

  function createLenis() {
    if (lenis) return; // already active

    lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    tickerCallback = (time: number) => {
      lenis!.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);
  }

  function destroyLenis() {
    if (!lenis) return;

    lenis.destroy();
    if (tickerCallback) {
      gsap.ticker.remove(tickerCallback);
      tickerCallback = null;
    }
    lenis = null;

    // Clean up any Lenis classes on html
    document.documentElement.classList.remove(
      "lenis",
      "lenis-smooth",
      "lenis-stopped",
    );
  }

  // Only create Lenis on non-admin routes
  const router = useRouter();
  const route = useRoute();

  function updateForRoute(path: string) {
    if (path.startsWith("/admin")) {
      destroyLenis();
    } else {
      createLenis();
      lenis?.scrollTo(0, { immediate: true });
    }
  }

  updateForRoute(route.path);

  const unregisterGuard = router.afterEach((to) => {
    updateForRoute(to.path);
  });

  // HMR cleanup
  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      destroyLenis();
      unregisterGuard();
    });
  }

  return {
    provide: {
      lenis,
    },
  };
});
