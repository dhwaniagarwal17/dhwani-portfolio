import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

/**
 * Renders children into document.body via a React Portal.
 *
 * This escapes any overflow:clip / stacking context created by ancestor
 * containers (e.g. App.tsx's overflowX:"clip" wrapper), ensuring that
 * position:fixed backdrops truly cover the full viewport.
 */
export default function ModalPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
    elRef.current.setAttribute("data-modal-portal", "true");
  }

  useEffect(() => {
    const el = elRef.current!;
    document.body.appendChild(el);
    setMounted(true);
    return () => {
      document.body.removeChild(el);
    };
  }, []);

  if (!mounted) return null;
  return createPortal(children, elRef.current!);
}
