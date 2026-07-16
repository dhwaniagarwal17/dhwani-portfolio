import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

/**
 * Initialises a single Lenis smooth-scroll instance for the page.
 * Returns the instance so callers can use lenis.scrollTo() for anchor nav.
 *
 * Options are tuned for a premium dark portfolio:
 *  - duration 1.1s — smooth without feeling sluggish
 *  - easeOutQuart — fast start, gentle deceleration
 *  - wheelMultiplier 0.9 — slightly reduced to feel weighty
 *  - touchMultiplier 1.5 — responsive on mobile
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 4), // easeOutQuart
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      smoothWheel: true,
      // Respect prefers-reduced-motion
      prevent: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });

    lenisRef.current = lenis;

    // Expose on window so Navbar can call lenis.scrollTo() for anchor nav
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    let raf: number;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return lenisRef;
}
