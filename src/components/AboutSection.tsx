import FadeIn from "./FadeIn";
import ContactButton from "./ContactButton";
import AnimatedParagraph from "./AnimatedParagraph";
import { ABOUT_TEXT } from "../data/about";

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
        background: "radial-gradient(circle, rgba(118,33,176,0.18) 0%, rgba(182,0,168,0.07) 50%, transparent 75%)",
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
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-9 py-20 md:py-28"
      style={{ overflowX: "clip" }}
    >
      <CornerGlow position="tl" />
      <CornerGlow position="tr" />
      <CornerGlow position="bl" />
      <CornerGlow position="br" />

      {/* Section heading — centred above the two-column layout */}
      <FadeIn delay={0} y={40} className="w-full text-center mb-12 sm:mb-14 md:mb-16">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(2.4rem, 10vw, 130px)" }}
        >
          About me
        </h2>
      </FadeIn>

      {/* ── Two-column layout ─────────────────────────────────────────── */}
      {/* Mobile / tablet: stacked. Desktop (md+): side by side.         */}
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-14 lg:gap-20">

        {/* Left column — professional photograph */}
        <FadeIn delay={0.1} x={-24} y={0} className="flex-shrink-0 flex justify-center md:justify-end">
          <div
            className="relative"
            style={{ width: "clamp(180px, 22vw, 300px)" }}
          >
            {/* Purple glow layer */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "radial-gradient(circle, rgba(182,0,168,0.30) 0%, rgba(118,33,176,0.15) 50%, transparent 78%)",
                filter: "blur(24px)",
                transform: "scale(1.35)",
              }}
            />
            <img
              src="/images/dhwani-agarwal.jpg"
              alt="Dhwani Agarwal — professional photograph"
              loading="lazy"
              decoding="async"
              draggable={false}
              className="relative w-full h-auto rounded-2xl object-cover object-top"
              style={{
                aspectRatio: "3/4",
                border: "1px solid rgba(182,0,168,0.28)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(182,0,168,0.12)",
              }}
            />
          </div>
        </FadeIn>

        {/* Right column — text content */}
        <FadeIn delay={0.18} x={24} y={0} className="flex-1 flex flex-col justify-center">
          {/* Description */}
          <div className="mb-8">
            <AnimatedParagraph text={ABOUT_TEXT} />
          </div>

          {/* Quick facts */}
          <FadeIn delay={0.28} y={16}>
            <div className="flex flex-wrap gap-2.5 mb-8 justify-center md:justify-start">
              {[
                "Computer Engineering @ TIET",
                "Software Engineer",
                "AI / ML Enthusiast",
                "Full-Stack Developer",
                "Mechanical Designer",
              ].map((fact) => (
                <span
                  key={fact}
                  className="text-[0.65rem] font-medium uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{
                    color: "rgba(215,226,234,0.72)",
                    background: "rgba(215,226,234,0.06)",
                    border: "1px solid rgba(215,226,234,0.12)",
                  }}
                >
                  {fact}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
            <FadeIn delay={0.35} y={12}>
              <ContactButton />
            </FadeIn>
            <FadeIn delay={0.42} y={12}>
              <a
                href="/Dhwani_Agarwal_Resume.pdf"
                download="Dhwani_Agarwal_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full font-medium uppercase tracking-widest inline-flex items-center gap-2 transition-colors duration-200"
                style={{
                  fontSize: "clamp(0.55rem, 0.9vw, 0.75rem)",
                  padding: "0.6rem 1.75rem",
                  color: "#D7E2EA",
                  border: "1.5px solid rgba(215,226,234,0.35)",
                  background: "rgba(215,226,234,0.04)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "rgba(215,226,234,0.10)";
                  el.style.borderColor = "rgba(215,226,234,0.6)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "rgba(215,226,234,0.04)";
                  el.style.borderColor = "rgba(215,226,234,0.35)";
                }}
              >
                ↓ Download Resume
              </a>
            </FadeIn>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
