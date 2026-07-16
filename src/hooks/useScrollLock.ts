import { useEffect, useRef } from "react";
import type Lenis from "@studio-freight/lenis";

/**
 * Freezes page scroll while a modal is open.
 *
 * Strategy:
 *  1. Pauses Lenis smooth-scroll so the RAF loop can't move the page.
 *  2. Locks the <body> in place with `position: fixed` at the current
 *     scroll offset — this prevents visual jump AND background scrolling.
 *  3. Does NOT set overflow:hidden on <html>, because that aggressively
 *     blocks ALL scroll events including inside nested scroll containers
 *     (like the modal content). The body-fixed trick is sufficient.
 *  4. Compensates scrollbar width to prevent layout shift.
 *  5. Restores everything cleanly on unmount.
 */
export function useScrollLock(active: boolean) {
  const savedScrollY = useRef(0);

  useEffect(() => {
    if (!active) return;

    // ─── 1. Capture scroll position ──────────────────────────────────
    savedScrollY.current = window.scrollY;

    // ─── 2. Pause Lenis ──────────────────────────────────────────────
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.stop();
    }

    // ─── 3. Lock background scroll ───────────────────────────────────
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const bodyStyle = document.body.style;

    // Save previous values
    const prevBodyOverflow = bodyStyle.overflow;
    const prevBodyPaddingRight = bodyStyle.paddingRight;
    const prevBodyPosition = bodyStyle.position;
    const prevBodyTop = bodyStyle.top;
    const prevBodyLeft = bodyStyle.left;
    const prevBodyRight = bodyStyle.right;
    const prevBodyWidth = bodyStyle.width;

    // Fix the body in place at the current scroll offset.
    // This prevents background scrolling without blocking nested
    // scrollable elements (like the modal content).
    bodyStyle.position = "fixed";
    bodyStyle.top = `-${savedScrollY.current}px`;
    bodyStyle.left = "0";
    bodyStyle.right = "0";
    bodyStyle.width = "100%";
    bodyStyle.overflow = "hidden";

    // Compensate for scrollbar disappearance
    if (scrollbarWidth > 0) {
      bodyStyle.paddingRight = `${scrollbarWidth}px`;
    }

    // ─── Cleanup ─────────────────────────────────────────────────────
    return () => {
      // Restore body styles
      bodyStyle.overflow = prevBodyOverflow;
      bodyStyle.paddingRight = prevBodyPaddingRight;
      bodyStyle.position = prevBodyPosition;
      bodyStyle.top = prevBodyTop;
      bodyStyle.left = prevBodyLeft;
      bodyStyle.right = prevBodyRight;
      bodyStyle.width = prevBodyWidth;

      // Restore scroll position BEFORE resuming Lenis
      window.scrollTo({ top: savedScrollY.current, behavior: "instant" as ScrollBehavior });

      // Resume Lenis
      if (lenis) {
        lenis.start();
      }
    };
  }, [active]);
}
