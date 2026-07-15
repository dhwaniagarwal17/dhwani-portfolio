import FadeIn from "./FadeIn";
import ContactButton from "./ContactButton";
import AnimatedParagraph from "./AnimatedParagraph";
import { ABOUT_TEXT, CORNER_IMAGES } from "../data/about";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-9 py-14"
      style={{ overflowX: "clip" }}
    >
      {CORNER_IMAGES.map((c, i) => (
        <FadeIn
          key={i}
          delay={c.delay}
          x={c.x}
          y={0}
          duration={0.9}
          className={`absolute ${c.pos} ${c.w} pointer-events-none`}
        >
          <img src={c.src} alt="" className="w-full h-auto" loading="lazy" />
        </FadeIn>
      ))}

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
