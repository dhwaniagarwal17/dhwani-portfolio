import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

// Stable easing — module-level so it's never recreated between renders
const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

/**
 * Initialises a single Lenis smooth-scroll instance for the page.
 *
 * Performance notes:
 *  - easing is module-level, not an inline arrow — no GC pressure, no re-init
 *  - prefers-reduced-motion checked once at mount, not per frame
 *  - RAF loop uses a named function so it shows as "lenisFrame" in DevTools
 *  - Empty dep array guarantees exactly one init per page mount
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: 1.1,
      easing: easeOutQuart,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      smoothWheel: !reducedMotion,
    });

    lenisRef.current = lenis;
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    let raf: number;

    function lenisFrame(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(lenisFrame);
    }

    raf = requestAnimationFrame(lenisFrame);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []); // run once — never re-initialise

  return lenisRef;
}
