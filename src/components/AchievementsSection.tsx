import FadeIn from "./FadeIn";
import { ACHIEVEMENTS, EDUCATION } from "../data/achievements";

export default function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="px-4 sm:px-6 md:px-9 py-18 sm:py-21 md:py-24 border-t border-[#D7E2EA]/10"
      style={{ backgroundColor: "#0C0C0C" }}
    >
      <FadeIn>
        <h2 className="text-[#D7E2EA] text-[1.5rem] sm:text-[1.95rem] md:text-[2.4rem] font-semibold mb-10 sm:mb-12 text-center">
          Achievements
        </h2>
      </FadeIn>
      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ACHIEVEMENTS.map((a, i) => (
          <FadeIn key={a.title} delay={i * 0.08}>
            <div className="rounded-lg border border-[#D7E2EA]/15 p-4">
              <p className="text-[#D7E2EA] text-[0.92rem] font-medium">{a.title}</p>
              <p className="text-[#D7E2EA]/50 text-xs uppercase tracking-widest mt-2">{a.tag}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.2}>
        <div className="max-w-2xl mx-auto mt-12 sm:mt-14 rounded-xl border border-[#D7E2EA]/15 p-6 text-center">
          <h3 className="text-[#D7E2EA]/50 text-xs uppercase tracking-widest mb-4">Education</h3>
          <p className="text-[#D7E2EA] text-lg font-medium">{EDUCATION.institute}</p>
          <p className="text-[#D7E2EA]/70 text-[0.86rem] mt-1">{EDUCATION.degree}</p>
          <p className="text-[#D7E2EA] text-base font-semibold mt-3">CGPA {EDUCATION.cgpa}</p>
          <div className="flex justify-center gap-7 mt-4 text-[#D7E2EA]/50 text-[0.75rem]">
            <span>Class XII — {EDUCATION.classXII}</span>
            <span>Class X — {EDUCATION.classX}</span>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
