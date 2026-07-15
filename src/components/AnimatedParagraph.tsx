import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface AnimatedParagraphProps {
  text: string;
}

interface CharProps {
  char: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function Char({ char, index, total, scrollYProgress }: CharProps) {
  const start = index / total;
  const end = Math.min(start + 0.05, 1);
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

export default function AnimatedParagraph({ text }: AnimatedParagraphProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const chars = text.split("");

  return (
    <p
      ref={ref}
      className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[470px] mx-auto"
      style={{ fontSize: "clamp(0.86rem, 1.65vw, 1.13rem)" }}
    >
      {chars.map((c, i) => (
        <Char key={i} char={c} index={i} total={chars.length} scrollYProgress={scrollYProgress} />
      ))}
    </p>
  );
}
