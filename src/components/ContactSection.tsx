import FadeIn from "./FadeIn";
import ContactButton from "./ContactButton";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="px-5 md:px-12 py-21 md:py-30 border-t border-[#D7E2EA]/08 flex flex-col items-center text-center"
      style={{ backgroundColor: "#0C0C0C" }}
    >
      <FadeIn>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight mb-4"
          style={{ fontSize: "clamp(1.95rem, 5vw, 3.5rem)" }}
        >
          Let's Build Something Together
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p
          className="max-w-md mb-7 leading-relaxed text-[0.86rem] font-light"
          style={{ color: "rgba(215,226,234,0.62)" }}
        >
          Whether it's an internship opportunity, research collaboration, exciting software project, or simply
          discussing technology and AI, I'd love to connect.
        </p>
      </FadeIn>
      <FadeIn delay={0.2}>
        <ContactButton />
      </FadeIn>
      <p
        className="text-[0.65rem] mt-12"
        style={{ color: "rgba(215,226,234,0.28)" }}
      >
        © 2026 Dhwani Agarwal. All rights reserved.
      </p>
    </section>
  );
}
