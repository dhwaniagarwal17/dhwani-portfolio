import FadeIn from "./FadeIn";
import { SKILLS, CORE_TECHNOLOGIES } from "../data/skills";

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

      {/* ── Core Technologies ─────────────────────────────────────────── */}
      <FadeIn delay={0.05} y={20}>
        <div className="max-w-3xl mx-auto mb-12 sm:mb-14">
          <h3
            className="text-xs uppercase tracking-widest mb-4 font-medium text-center"
            style={{ color: "rgba(215,226,234,0.48)" }}
          >
            Core Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {CORE_TECHNOLOGIES.map((tech) => (
              <span
                key={tech}
                className="text-[0.78rem] font-semibold rounded-full px-4 py-1"
                style={{
                  color: "rgba(215,226,234,0.92)",
                  background: "rgba(182,0,168,0.10)",
                  border: "1px solid rgba(182,0,168,0.28)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* ── All skill categories ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {Object.entries(SKILLS).map(([cat, items], i) => (
          <FadeIn key={cat} delay={i * 0.05} y={18}>
            <h3
              className="text-xs uppercase tracking-widest mb-3 font-medium"
              style={{ color: "rgba(215,226,234,0.48)" }}
            >
              {cat}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {items.map((s) => (
                <span
                  key={s}
                  className="text-[0.72rem] font-medium rounded-full px-2.5 py-0.5"
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
