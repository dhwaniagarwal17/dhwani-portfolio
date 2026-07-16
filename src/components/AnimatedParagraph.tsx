import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

interface AnimatedParagraphProps {
  text: string;
}

/**
 * Single word — isolated component so useTransform is called at the
 * top level of a component (rules of hooks compliant).
 */
function Word({
  word,
  index,
  total,
  scrollYProgress,
  isLast,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  isLast: boolean;
}) {
  const start = (index / total) * 0.9;
  const end = Math.min(start + 0.08, 1);
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity, willChange: "opacity" }}>
      {word}
      {!isLast ? " " : ""}
    </motion.span>
  );
}

/**
 * Reveals text word-by-word as the section scrolls into view.
 *
 * Performance vs the previous character-level approach:
 *  - ~60 motion nodes instead of ~340 — far fewer useTransform subscriptions
 *  - Each word animates only opacity — no colour, layout or paint recalc
 *  - willChange: "opacity" hints the browser to promote to compositor layer
 *  - Scroll target is the paragraph itself for a tight IntersectionObserver
 */
export default function AnimatedParagraph({ text }: AnimatedParagraphProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[470px] mx-auto"
      style={{ fontSize: "clamp(0.86rem, 1.65vw, 1.13rem)" }}
    >
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          index={i}
          total={words.length}
          scrollYProgress={scrollYProgress}
          isLast={i === words.length - 1}
        />
      ))}
    </p>
  );
}
