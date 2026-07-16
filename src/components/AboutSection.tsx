import FadeIn from "./FadeIn";
import ContactButton from "./ContactButton";
import AnimatedParagraph from "./AnimatedParagraph";
import { ABOUT_TEXT } from "../data/about";

/**
 * Corner decorations are pure CSS radial gradients — zero network requests,
 * no layout shift, no additional motion nodes.
 */
function CornerGlow({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const coords: Record<string, React.CSSProperties> = {
    tl: { top: "4%", left: "2%" },
    tr: { top: "4%", right: "2%" },
    bl: { bottom: "8%", left: "6%" },
    br: { bottom: "8%", right: "6%" },
  };
  return (
    <div
      aria-hidden="true"
      className="absolute pointer-events-none"
      style={{
        ...coords[position],
        width: "clamp(80px, 12vw, 180px)",
        height: "clamp(80px, 12vw, 180px)",
        background:
          "radial-gradient(circle, rgba(118,33,176,0.18) 0%, rgba(182,0,168,0.07) 50%, transparent 75%)",
        borderRadius: "50%",
        filter: "blur(18px)",
        willChange: "transform",
      }}
    />
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-9 py-14"
      style={{ overflowX: "clip" }}
    >
      {/* Decorative corner glows — CSS only, no network requests */}
      <CornerGlow position="tl" />
      <CornerGlow position="tr" />
      <CornerGlow position="bl" />
      <CornerGlow position="br" />

      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: "clamp(2.4rem, 10vw, 130px)" }}
        >
          About me
        </h2>
      </FadeIn>

      <div className="mt-7 sm:mt-9 md:mt-10">
        <AnimatedParagraph text={ABOUT_TEXT} />
      </div>

      <div className="mt-12 sm:mt-14 md:mt-17">
        <FadeIn delay={0.1}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
