import { useMemo, useState } from "react";
import type { MutableRefObject } from "react";
import FadeIn from "./FadeIn";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "../data/projects";

export default function ProjectsSection() {
  // Reverse so TalkLaws (index 0 in data) sits on top of the sticky stack.
  const reversed = useMemo(() => [...PROJECTS].reverse(), []);

  const cardRefs = useMemo(
    () => reversed.map(() => ({ current: null } as MutableRefObject<HTMLDivElement | null>)),
    [reversed]
  );

  // Modal state: which index in `reversed` is open (-1 = none)
  const [openIndex, setOpenIndex] = useState<number>(-1);

  const close = () => setOpenIndex(-1);
  const goTo = (i: number) => setOpenIndex(i);

  return (
    <section
      id="projects"
      className="relative rounded-t-[32px] sm:rounded-t-[40px] md:rounded-t-[48px] -mt-7 sm:-mt-9 md:-mt-10 z-10 pb-14 sm:pb-17 md:pb-21"
      style={{ backgroundColor: "#0C0C0C" }}
    >
      <FadeIn>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center pt-14 sm:pt-17 md:pt-21 mb-32 sm:mb-40 md:mb-52"
          style={{ fontSize: "clamp(2.4rem, 10vw, 130px)" }}
        >
          Projects
        </h2>
      </FadeIn>

      <div className="relative">
        {reversed.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            total={reversed.length}
            displayNumber={String(i + 1).padStart(2, "0")}
            cardRef={cardRefs[i]}
            nextCardRef={cardRefs[i + 1]}
            modalOpen={openIndex === i}
            onOpenModal={() => goTo(i)}
            onCloseModal={close}
            onPrev={() => goTo(i - 1)}
            onNext={() => goTo(i + 1)}
            hasPrev={i > 0}
            hasNext={i < reversed.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
