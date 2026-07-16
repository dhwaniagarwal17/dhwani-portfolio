import { motion } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import Navbar from "./Navbar";
import FadeIn from "./FadeIn";
import ContactButton from "./ContactButton";
import Magnet from "./Magnet";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col justify-between"
      style={{ overflowX: "clip" }}
    >
      <Navbar />

      {/* ── Main composition ─────────────────────────────────────────────── */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden px-4">
        <FadeIn delay={0.15} y={40} className="relative z-10 w-full">

          {/* Three-column hero row: HI, I'M  |  Avatar  |  DHWANI */}
          <div className="flex items-center justify-center w-full">

            {/* Left text – negative right margin pulls it toward the avatar */}
            <div
              className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-right flex-shrink-0"
              style={{
                fontSize: "clamp(1.88rem, 7.61vw, 8.61rem)",
                marginRight: "clamp(-24px, -2.4vw, -62px)",
              }}
              aria-hidden="true"
            >
              Hi, i'm
            </div>

            {/* Avatar column */}
            <div
              className="flex-shrink-0 flex items-center justify-center z-20"
              style={{
                width: "clamp(190px, 25vw, 493px)",
                transform: "translateY(27px)",
              }}
            >
              <Magnet padding={150} strength={3}>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 4.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  whileHover={{ y: -3 }}
                  className="hero-avatar-glow w-[259px] sm:w-[335px] md:w-[426px] lg:w-[493px]"
                  style={{ imageRendering: "auto" }}
                >
                  <img
                    src="/images/avatar.png"
                    alt="Dhwani – portrait"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                    draggable={false}
                    style={{ imageRendering: "auto" }}
                  />
                </motion.div>
              </Magnet>
            </div>

            {/* Right text – negative left margin pulls it toward the avatar */}
            <div
              className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-left flex-shrink-0"
              style={{
                fontSize: "clamp(1.88rem, 7.61vw, 8.61rem)",
                marginLeft: "clamp(-24px, -2.4vw, -62px)",
              }}
              aria-hidden="true"
            >
              Dhwani
            </div>
          </div>

          {/* Hidden accessible full heading for screen readers */}
          <h1 className="sr-only">Hi, I'm Dhwani</h1>

        </FadeIn>
      </div>

      {/* ── Bottom CTA row ───────────────────────────────────────────────── */}
      <div className="w-full flex justify-between items-center px-5 md:px-12 pb-10 sm:pb-12 md:pb-14">

        {/* Left – eyebrow + sentence-case intro */}
        <FadeIn delay={0.35} y={20}>
          <div className="flex flex-col gap-1.5 max-w-[260px] sm:max-w-[340px] md:max-w-[420px]">
            <span
              className="font-medium uppercase tracking-widest"
              style={{
                fontSize: "clamp(0.55rem, 0.85vw, 0.75rem)",
                color: "#B600A8",
                letterSpacing: "0.18em",
              }}
            >
              Software Engineer · AI Builder
            </span>
            <p
              className="text-[#D7E2EA] font-light"
              style={{ fontSize: "clamp(0.65rem, 1.05vw, 1.1rem)", lineHeight: 1.5 }}
            >
              Building thoughtful digital products through software engineering, AI, and intuitive user experiences.
            </p>
          </div>
        </FadeIn>

        {/* Right – two CTA buttons, lifted to align with intro text */}
        <FadeIn delay={0.5} y={20}>
          <div
            className="flex items-center gap-3 sm:gap-4"
            style={{ transform: "translateY(-18px)" }}
          >
            <ContactButton />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full font-medium uppercase tracking-widest inline-flex items-center gap-2 transition-colors duration-200"
              style={{
                fontSize: "clamp(0.55rem, 0.9vw, 0.75rem)",
                padding: "0.6rem 1.75rem",
                color: "#D7E2EA",
                border: "1.5px solid rgba(215,226,234,0.48)",
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
                el.style.borderColor = "rgba(215,226,234,0.48)";
              }}
            >
              <Download size={11} strokeWidth={2} />
              Download Resume
            </a>
          </div>
        </FadeIn>

      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <FadeIn delay={0.9} y={10} className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => {
            const el = document.getElementById("about");
            if (!el) return;
            const lenis = (window as Window & { __lenis?: { scrollTo: (target: HTMLElement, opts: object) => void } }).__lenis;
            if (lenis) { lenis.scrollTo(el, { offset: 0, duration: 1.1 }); }
            else { el.scrollIntoView({ behavior: "smooth" }); }
          }}
          aria-label="Scroll down"
        >
          <ChevronDown
            size={20}
            strokeWidth={1.5}
            style={{ color: "rgba(215,226,234,0.48)" }}
          />
        </motion.div>
      </FadeIn>
    </section>
  );
}
