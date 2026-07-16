import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";
import { LEARNING_PROJECTS, type LearningProject } from "../data/projects";
import { useScrollLock } from "../hooks/useScrollLock";
import ModalPortal from "./ModalPortal";

// ─── Badge colour map ─────────────────────────────────────────────────────────
// Intentionally softer than the Experience section — this section should feel
// lighter and less prominent than Featured Work.
const BADGE_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  "JavaScript Fundamentals": {
    color: "rgba(220,180,60,0.85)",
    bg: "rgba(220,180,60,0.07)",
    border: "rgba(220,180,60,0.2)",
  },
  "CRUD Application": {
    color: "rgba(91,140,255,0.85)",
    bg: "rgba(91,140,255,0.07)",
    border: "rgba(91,140,255,0.2)",
  },
  "JavaScript Timing": {
    color: "rgba(80,190,140,0.85)",
    bg: "rgba(80,190,140,0.07)",
    border: "rgba(80,190,140,0.2)",
  },
  "Responsive UI": {
    color: "rgba(182,0,168,0.85)",
    bg: "rgba(182,0,168,0.07)",
    border: "rgba(182,0,168,0.2)",
  },
};

function getBadgeStyle(badge: string) {
  return (
    BADGE_STYLE[badge] ?? {
      color: "rgba(215,226,234,0.6)",
      bg: "rgba(215,226,234,0.06)",
      border: "rgba(215,226,234,0.15)",
    }
  );
}

// ─── Modal section block ──────────────────────────────────────────────────────
function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h4
        className="font-semibold uppercase tracking-widest mb-2.5 pb-2"
        style={{
          color: "rgba(215,226,234,0.32)",
          fontSize: "0.6rem",
          letterSpacing: "0.16em",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function LearningModal({
  project,
  onClose,
}: {
  project: LearningProject;
  onClose: () => void;
}) {
  const badge = getBadgeStyle(project.badge);

  useScrollLock(true);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: "rgba(0,0,0,0.76)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-2xl"
        style={{
          background: "rgba(12,12,16,0.98)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px ${badge.border}`,
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.07) transparent",
          overscrollBehavior: "contain",
        }}
      >
        {/* Header */}
        <div
          className="relative px-6 pt-7 pb-5"
          style={{
            background: `linear-gradient(135deg, ${badge.bg} 0%, transparent 60%)`,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-150"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(215,226,234,0.67)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)")
            }
          >
            <X size={12} />
          </button>

          <span
            className="inline-block text-[0.58rem] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full mb-2.5"
            style={{
              color: badge.color,
              background: badge.bg,
              border: `1px solid ${badge.border}`,
            }}
          >
            {project.badge}
          </span>

          <h2
            className="font-black uppercase tracking-tight leading-none mb-1"
            style={{ color: "#D7E2EA", fontSize: "clamp(1.3rem, 2.8vw, 1.9rem)" }}
          >
            {project.title}
          </h2>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.techStack.map((t) => (
              <span
                key={t}
                className="text-[0.58rem] font-medium px-1.5 py-0.5 rounded uppercase tracking-wide"
                style={{
                  color: "rgba(215,226,234,0.57)",
                  background: "rgba(215,226,234,0.05)",
                  border: "1px solid rgba(215,226,234,0.08)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {/* Overview */}
          <ModalSection title="Project Overview">
            <p
              className="leading-relaxed"
              style={{ color: "rgba(215,226,234,0.78)", fontSize: "0.86rem" }}
            >
              {project.overview}
            </p>
          </ModalSection>

          {/* Learning Objectives */}
          <ModalSection title="Learning Objectives">
            <div className="flex flex-wrap gap-2">
              {project.learningObjectives.map((obj) => (
                <span
                  key={obj}
                  className="text-[0.68rem] font-medium px-2.5 py-1 rounded-lg uppercase tracking-wide"
                  style={{
                    color: badge.color,
                    background: badge.bg,
                    border: `1px solid ${badge.border}`,
                  }}
                >
                  {obj}
                </span>
              ))}
            </div>
          </ModalSection>

          {/* Concepts Practiced */}
          <ModalSection title="Concepts Practiced">
            <ul className="space-y-1.5">
              {project.conceptsPracticed.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span
                    className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: badge.color }}
                  />
                  <span
                    style={{ color: "rgba(215,226,234,0.78)", fontSize: "0.84rem" }}
                  >
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </ModalSection>

          {/* Challenges */}
          <ModalSection title="Challenges">
            <p
              className="leading-relaxed"
              style={{ color: "rgba(215,226,234,0.78)", fontSize: "0.86rem" }}
            >
              {project.challenges}
            </p>
          </ModalSection>

          {/* Future Improvements */}
          <ModalSection title="Future Improvements">
            <div className="flex flex-wrap gap-2">
              {project.futureImprovements.map((f) => (
                <span
                  key={f}
                  className="text-[0.68rem] px-2.5 py-1 rounded-lg"
                  style={{
                    color: "rgba(215,226,234,0.67)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          </ModalSection>

          {/* Links */}
          <div className="flex flex-wrap gap-3 pt-1">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full font-medium uppercase tracking-widest text-[0.62rem] px-5 py-2 transition-opacity duration-150 hover:opacity-85"
                style={{
                  color: "#ffffff",
                  background:
                    "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                  boxShadow: "0px 4px 4px rgba(181,1,167,0.25), 4px 4px 12px #7721B1 inset",
                }}
              >
                <Github size={10} strokeWidth={2} />
                GitHub Repository
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-1.5 rounded-full font-medium uppercase tracking-widest text-[0.62rem] px-5 py-2 cursor-not-allowed"
                style={{
                  color: "rgba(215,226,234,0.28)",
                  border: "1.5px solid rgba(215,226,234,0.1)",
                  background: "rgba(215,226,234,0.02)",
                }}
              >
                <Github size={10} strokeWidth={2} />
                GitHub Repository
              </span>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full font-medium uppercase tracking-widest text-[0.62rem] px-5 py-2 transition-colors duration-150"
                style={{
                  color: "#D7E2EA",
                  border: "1.5px solid rgba(215,226,234,0.3)",
                  background: "rgba(215,226,234,0.04)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "rgba(215,226,234,0.09)";
                  el.style.borderColor = "rgba(215,226,234,0.67)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "rgba(215,226,234,0.04)";
                  el.style.borderColor = "rgba(215,226,234,0.3)";
                }}
              >
                <ExternalLink size={10} strokeWidth={2} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function LearningCard({
  project,
  index,
  onLearnMore,
}: {
  project: LearningProject;
  index: number;
  onLearnMore: () => void;
}) {
  const badge = getBadgeStyle(project.badge);
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={index * 0.07} y={28}>
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative rounded-xl overflow-hidden h-full flex flex-col"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: `1px solid ${hovered ? badge.border : "rgba(255,255,255,0.07)"}`,
          boxShadow: hovered
            ? `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${badge.border}`
            : "0 2px 12px rgba(0,0,0,0.25)",
          transition: "border-color 0.22s ease, box-shadow 0.22s ease",
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${badge.color}, transparent)`,
            opacity: hovered ? 0.8 : 0.15,
            transition: "opacity 0.25s ease",
          }}
        />

        <div className="p-5 flex flex-col h-full">
          {/* Badge */}
          <span
            className="inline-block self-start text-[0.58rem] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full mb-3"
            style={{
              color: badge.color,
              background: badge.bg,
              border: `1px solid ${badge.border}`,
            }}
          >
            {project.badge}
          </span>

          {/* Title */}
          <h3
            className="font-semibold leading-tight mb-2"
            style={{ color: "#D7E2EA", fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)" }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="leading-relaxed mb-4 flex-1"
            style={{
              color: "rgba(215,226,234,0.67)",
              fontSize: "clamp(0.72rem, 0.95vw, 0.82rem)",
            }}
          >
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[0.58rem] font-medium px-1.5 py-0.5 rounded uppercase tracking-wide"
                style={{
                  color: "rgba(215,226,234,0.62)",
                  background: "rgba(215,226,234,0.04)",
                  border: "1px solid rgba(215,226,234,0.07)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action row */}
          <div className="flex items-center gap-2 mt-auto">
            {/* GitHub button */}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-full font-medium uppercase tracking-widest text-[0.6rem] px-3.5 py-1.5 transition-colors duration-150"
                style={{
                  color: "rgba(215,226,234,0.6)",
                  border: "1px solid rgba(215,226,234,0.15)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "rgba(215,226,234,0.07)";
                  el.style.borderColor = "rgba(215,226,234,0.3)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "transparent";
                  el.style.borderColor = "rgba(215,226,234,0.15)";
                }}
              >
                <Github size={10} strokeWidth={2} />
                GitHub
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-1.5 rounded-full font-medium uppercase tracking-widest text-[0.6rem] px-3.5 py-1.5 cursor-not-allowed"
                style={{
                  color: "rgba(215,226,234,0.22)",
                  border: "1px solid rgba(215,226,234,0.08)",
                }}
              >
                <Github size={10} strokeWidth={2} />
                GitHub
              </span>
            )}

            {/* Learn More button */}
            <button
              onClick={onLearnMore}
              className="inline-flex items-center gap-1.5 rounded-full font-medium uppercase tracking-widest text-[0.6rem] px-3.5 py-1.5 transition-colors duration-150 ml-auto"
              style={{
                color: badge.color,
                border: `1px solid ${badge.border}`,
                background: badge.bg,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              }}
            >
              Learn More
              <motion.span
                animate={{ x: hovered ? 2 : 0 }}
                transition={{ duration: 0.18 }}
              >
                <ArrowRight size={10} strokeWidth={2} />
              </motion.span>
            </button>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function LearningProjectsSection() {
  const [active, setActive] = useState<LearningProject | null>(null);
  const open = useCallback((p: LearningProject) => setActive(p), []);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <section
        id="learning-projects"
        className="relative z-20 px-4 sm:px-6 md:px-9 pt-20 sm:pt-24 md:pt-28 pb-18 sm:pb-21 md:pb-24 border-t border-[#D7E2EA]/08"
        style={{ backgroundColor: "#0C0C0C" }}
      >
        {/* Heading */}
        <FadeIn y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: "clamp(2.4rem, 10vw, 130px)" }}
          >
            Learning Projects
          </h2>
        </FadeIn>

        {/* Section intro */}
        <FadeIn delay={0.1} y={20}>
          <p
            className="text-center mx-auto mt-5 mb-12 sm:mb-14 md:mb-16 leading-relaxed"
            style={{
              color: "rgba(215,226,234,0.62)",
              fontSize: "clamp(0.75rem, 1.05vw, 0.9rem)",
              maxWidth: "520px",
            }}
          >
            Projects built while strengthening my frontend, JavaScript and software
            development fundamentals. Each project helped me explore new concepts
            and improve my engineering skills.
          </p>
        </FadeIn>

        {/* 2×2 card grid */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LEARNING_PROJECTS.map((project, i) => (
            <LearningCard
              key={project.id}
              project={project}
              index={i}
              onLearnMore={() => open(project)}
            />
          ))}
        </div>
      </section>

      <ModalPortal>
        <AnimatePresence>
          {active && <LearningModal project={active} onClose={close} />}
        </AnimatePresence>
      </ModalPortal>
    </>
  );
}
