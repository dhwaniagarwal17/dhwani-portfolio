import { useRef } from "react";
import type { ReactNode, MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
}

export default function Magnet({ children, padding = 150, strength = 3 }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 15 });
  const springY = useSpring(y, { stiffness: 120, damping: 15 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    x.set(dx / strength);
    y.set(dy / strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ padding }} className="-m-[150px]">
      <motion.div style={{ x: springX, y: springY, willChange: "transform" }}>{children}</motion.div>
    </div>
  );
}
