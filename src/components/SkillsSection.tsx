import FadeIn from "./FadeIn";
import { SKILLS } from "../data/skills";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="px-4 sm:px-6 md:px-9 py-18 sm:py-21 md:py-24 border-t border-[#D7E2EA]/08"
      style={{ backgroundColor: "#0C0C0C" }}
    >
      <FadeIn>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-10 sm:mb-12"
          style={{ fontSize: "clamp(2.4rem, 10vw, 130px)" }}
        >
          Skills
        </h2>
      </FadeIn>
      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.entries(SKILLS).map(([cat, items], i) => (
          <FadeIn key={cat} delay={i * 0.08}>
            <h3
              className="text-xs uppercase tracking-widest mb-3 font-medium"
              style={{ color: "rgba(215,226,234,0.48)" }}
            >
              {cat}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((s) => (
                <span
                  key={s}
                  className="text-[0.75rem] font-medium rounded-full px-3 py-0.5"
                  style={{
                    color: "rgba(215,226,234,0.82)",
                    background: "rgba(215,226,234,0.06)",
                    border: "1px solid rgba(215,226,234,0.12)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
