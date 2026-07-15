import { useRef, useState, useEffect } from "react";
import type { MutableRefObject } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, X, ChevronLeft, ChevronRight } from "lucide-react";
import GhostButton from "./GhostButton";
import type { Project } from "../data/projects";

export interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  displayNumber: string;
  cardRef?: MutableRefObject<HTMLDivElement | null>;
  nextCardRef?: MutableRefObject<HTMLDivElement | null>;
  /** If provided, modal is controlled externally (for prev/next nav) */
  modalOpen?: boolean;
  onOpenModal?: () => void;
  onCloseModal?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

// ─── Lightbox (inside modal) ──────────────────────────────────────────────────
function Lightbox({ images, labels, startIndex, onClose }: {
  images: string[]; labels: string[]; startIndex: number; onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setCurrent(c => (c - 1 + images.length) % images.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setCurrent(c => (c + 1) % images.length); };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12"
      style={{ backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", background: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }} transition={{ duration: 0.22, ease: [0.22,1,0.36,1] }}
        onClick={e => e.stopPropagation()} className="relative w-full max-w-5xl"
      >
        <button onClick={onClose} aria-label="Close" className="absolute -top-10 right-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(215,226,234,0.7)" }}>
          <X size={14} />
        </button>
        <AnimatePresence mode="wait">
          <motion.img key={current} src={images[current]} alt={labels[current]}
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18 }} className="w-full h-auto rounded-xl object-contain" draggable={false}
            style={{ maxHeight: "72vh", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 24px 80px rgba(0,0,0,0.7)" }} />
        </AnimatePresence>
        <p className="text-center mt-3 uppercase tracking-widest font-medium"
          style={{ color: "rgba(215,226,234,0.4)", fontSize: "0.62rem" }}>
          {labels[current]}{images.length > 1 && <span style={{ color: "rgba(215,226,234,0.22)" }}> · {current + 1}/{images.length}</span>}
        </p>
        {images.length > 1 && <>
          <button onClick={prev} aria-label="Previous" className="absolute left-0 top-[40%] -translate-x-12 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(215,226,234,0.7)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.16)")}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)")}>
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} aria-label="Next" className="absolute right-0 top-[40%] translate-x-12 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(215,226,234,0.7)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.16)")}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)")}>
            <ChevronRight size={16} />
          </button>
          <div className="flex justify-center gap-1.5 mt-3">
            {images.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setCurrent(i); }} aria-label={`Image ${i+1}`}
                className="rounded-full transition-all duration-200"
                style={{ width: i===current?16:6, height:6, background: i===current?"rgba(215,226,234,0.7)":"rgba(215,226,234,0.2)" }} />
            ))}
          </div>
        </>}
      </motion.div>
    </motion.div>
  );
}

// ─── Modal section helper ─────────────────────────────────────────────────────
function MSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h4 className="font-semibold uppercase tracking-widest mb-2.5 pb-2"
        style={{ color: "rgba(215,226,234,0.32)", fontSize: "0.6rem", letterSpacing: "0.16em", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {title}
      </h4>
      {children}
    </div>
  );
}

// ─── Project modal ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose, onPrev, onNext, hasPrev, hasNext }: {
  project: Project; onClose: () => void;
  onPrev?: () => void; onNext?: () => void; hasPrev?: boolean; hasNext?: boolean;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const imgs = project.images ?? [];
  const labels = project.imageLabels ?? imgs.map((_, i) => `Screenshot ${i + 1}`);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) return; // let lightbox handle it
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev?.();
      if (e.key === "ArrowRight" && hasNext) onNext?.();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext, hasPrev, hasNext, lightboxIndex]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-5 md:p-8"
        style={{ backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)", background: "rgba(0,0,0,0.80)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 28 }} transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl"
          style={{
            background: "rgba(12,12,16,0.98)", border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.75)",
            scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.07) transparent",
          }}
        >
          {/* ── Hero image ── */}
          {imgs[0] && (
            <div className="relative w-full overflow-hidden rounded-t-2xl cursor-zoom-in"
              style={{ height: "clamp(160px, 22vw, 320px)" }}
              onClick={() => setLightboxIndex(0)}>
              <img src={imgs[0]} alt={labels[0]} loading="lazy" draggable={false}
                className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(12,12,16,0.9) 100%)" }} />
            </div>
          )}

          {/* ── Header ── */}
          <div className="relative px-6 sm:px-8 pt-6 pb-5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <button onClick={onClose} aria-label="Close modal"
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(215,226,234,0.6)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.13)")}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)")}>
              <X size={13} />
            </button>
            <span className="inline-block text-[0.6rem] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full mb-2"
              style={{ color: "rgba(215,226,234,0.5)", background: "rgba(215,226,234,0.07)", border: "1px solid rgba(215,226,234,0.12)" }}>
              {project.category}
            </span>
            {project.featured && (
              <span className="inline-block ml-2 text-[0.6rem] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full mb-2"
                style={{ color: "rgba(182,0,168,0.9)", background: "rgba(182,0,168,0.1)", border: "1px solid rgba(182,0,168,0.25)" }}>
                {project.featuredLabel ?? "Featured"}
              </span>
            )}
            <h2 className="font-black uppercase tracking-tight leading-none mb-2"
              style={{ color: "#D7E2EA", fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
              {project.title}
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: "rgba(215,226,234,0.6)", fontSize: "0.87rem" }}>
              {project.copy}
            </p>
            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-full font-medium uppercase tracking-widest text-[0.63rem] px-5 py-2 transition-colors duration-150"
                  style={{ color: "#D7E2EA", border: "1.5px solid rgba(215,226,234,0.3)", background: "rgba(215,226,234,0.04)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="rgba(215,226,234,0.09)"; el.style.borderColor="rgba(215,226,234,0.67)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="rgba(215,226,234,0.04)"; el.style.borderColor="rgba(215,226,234,0.3)"; }}>
                  <Github size={11} strokeWidth={2} /> GitHub Repository
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-full font-medium uppercase tracking-widest text-[0.63rem] px-5 py-2 transition-opacity duration-150 hover:opacity-85"
                  style={{ color: "#fff", background: "linear-gradient(123deg,#18011F 7%,#B600A8 37%,#7621B0 72%,#BE4C00 100%)", boxShadow: "0 4px 4px rgba(181,1,167,0.25),4px 4px 12px #7721B1 inset" }}>
                  <ArrowUpRight size={11} strokeWidth={2} /> Live Demo
                </a>
              )}
            </div>
          </div>

          {/* ── Body ── */}
          <div className="px-6 sm:px-8 py-6">
            {project.overview && <MSection title="Overview"><p className="leading-relaxed" style={{ color:"rgba(215,226,234,0.7)", fontSize:"0.87rem" }}>{project.overview}</p></MSection>}
            {project.problem && <MSection title="Problem"><p className="leading-relaxed" style={{ color:"rgba(215,226,234,0.7)", fontSize:"0.87rem" }}>{project.problem}</p></MSection>}
            {project.solution && <MSection title="Solution"><p className="leading-relaxed" style={{ color:"rgba(215,226,234,0.7)", fontSize:"0.87rem" }}>{project.solution}</p></MSection>}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <MSection title="Key Features">
                <ul className="space-y-1.5">
                  {project.keyFeatures.map((f,i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0" style={{ background:"rgba(182,0,168,0.8)" }} />
                      <span style={{ color:"rgba(215,226,234,0.7)", fontSize:"0.85rem" }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </MSection>
            )}
            {project.techStack && project.techStack.length > 0 && (
              <MSection title="Technology Stack">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(t => (
                    <motion.span key={t} initial={{ opacity:0, scale:0.85 }} whileInView={{ opacity:1, scale:1 }}
                      viewport={{ once:true }} transition={{ duration:0.25, ease:[0.22,1,0.36,1] }}
                      className="text-[0.7rem] font-medium px-3 py-1 rounded-lg uppercase tracking-wide"
                      style={{ color:"rgba(215,226,234,0.7)", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)" }}>
                      {t}
                    </motion.span>
                  ))}
                </div>
              </MSection>
            )}
            {/* Image gallery */}
            {imgs.length > 0 && (
              <MSection title="Screenshots">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {imgs.map((src, i) => (
                    <motion.div key={i} className="overflow-hidden rounded-xl cursor-zoom-in"
                      style={{ border:"1px solid rgba(215,226,234,0.1)" }}
                      whileHover={{ scale:1.03 }} transition={{ duration:0.2 }}
                      onClick={() => setLightboxIndex(i)}>
                      <img src={src} alt={labels[i]} loading="lazy" draggable={false}
                        className="w-full h-auto object-cover object-top"
                        style={{ aspectRatio:"16/10" }} />
                    </motion.div>
                  ))}
                </div>
              </MSection>
            )}
            {project.challenges && project.challenges.length > 0 && (
              <MSection title="Challenges">
                <ul className="space-y-1.5">
                  {project.challenges.map((c,i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0" style={{ background:"rgba(91,140,255,0.8)" }} />
                      <span style={{ color:"rgba(215,226,234,0.7)", fontSize:"0.85rem" }}>{c}</span>
                    </li>
                  ))}
                </ul>
              </MSection>
            )}
            {project.whatILearned && project.whatILearned.length > 0 && (
              <MSection title="What I Learned">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.whatILearned.map((l,i) => (
                    <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
                      style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)" }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background:"rgba(80,200,120,0.7)" }} />
                      <span style={{ color:"rgba(215,226,234,0.76)", fontSize:"0.8rem" }}>{l}</span>
                    </div>
                  ))}
                </div>
              </MSection>
            )}
          </div>

          {/* ── Prev / Next navigation ── */}
          {(hasPrev || hasNext) && (
            <div className="flex items-center justify-between px-6 sm:px-8 py-4"
              style={{ borderTop:"1px solid rgba(255,255,255,0.07)" }}>
              <button onClick={e => { e.stopPropagation(); onPrev?.(); }} disabled={!hasPrev}
                className="inline-flex items-center gap-2 rounded-full font-medium uppercase tracking-widest text-[0.62rem] px-4 py-2 transition-colors duration-150 disabled:opacity-25 disabled:cursor-not-allowed"
                style={{ color:"rgba(215,226,234,0.7)", border:"1px solid rgba(215,226,234,0.15)", background:"transparent" }}
                onMouseEnter={e => !(!hasPrev) && ((e.currentTarget as HTMLButtonElement).style.background="rgba(215,226,234,0.07)")}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background="transparent")}>
                <ChevronLeft size={12} /> Previous Project
              </button>
              <button onClick={e => { e.stopPropagation(); onNext?.(); }} disabled={!hasNext}
                className="inline-flex items-center gap-2 rounded-full font-medium uppercase tracking-widest text-[0.62rem] px-4 py-2 transition-colors duration-150 disabled:opacity-25 disabled:cursor-not-allowed"
                style={{ color:"rgba(215,226,234,0.7)", border:"1px solid rgba(215,226,234,0.15)", background:"transparent" }}
                onMouseEnter={e => !(!hasNext) && ((e.currentTarget as HTMLButtonElement).style.background="rgba(215,226,234,0.07)")}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background="transparent")}>
                Next Project <ChevronRight size={12} />
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Lightbox above modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={imgs} labels={labels} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Screenshot tile (card image area) ───────────────────────────────────────
function ScreenshotTile({ src, alt, className, style, onClick }: {
  src:string; alt:string; className?:string; style?:React.CSSProperties; onClick:()=>void;
}) {
  return (
    <motion.div className={`overflow-hidden rounded-[20px] sm:rounded-[28px] md:rounded-[32px] cursor-zoom-in ${className??""}`}
      style={{ border:"1px solid rgba(215,226,234,0.12)", ...style }}
      whileHover={{ scale:1.02 }} transition={{ duration:0.22, ease:[0.22,1,0.36,1] }}
      onClick={e => { e.stopPropagation(); onClick(); }}>
      <img src={src} alt={alt} loading="lazy" draggable={false} className="w-full h-full object-cover object-top" />
    </motion.div>
  );
}

function TintTile({ tint, className, style }: { tint:string; className?:string; style?:React.CSSProperties; }) {
  return <div className={`rounded-[20px] sm:rounded-[28px] md:rounded-[32px] bg-gradient-to-br ${tint} ${className??""}`} style={style} />;
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export default function ProjectCard({
  project, index, total, displayNumber, cardRef, nextCardRef,
  modalOpen, onOpenModal, onCloseModal, onPrev, onNext, hasPrev, hasNext,
}: ProjectCardProps) {
  const selfRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const [cardLightboxIndex, setCardLightboxIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: selfRef, offset: ["start end","start start"] });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0,1], [1, targetScale]);

  const { scrollYProgress: coverProgress } = useScroll({
    target: nextCardRef ?? fallbackRef, offset: ["start end","start start"],
  });
  const [compact, setCompact] = useState(false);
  useMotionValueEvent(coverProgress, "change", latest => { setCompact(latest > 0.5); });

  const assignRootRef = (el: HTMLDivElement | null) => {
    selfRef.current = el;
    if (cardRef) cardRef.current = el;
  };

  const imgs = project.images ?? [];
  const imgLabels = project.imageLabels ?? imgs.map((_, i) => `Screenshot ${i + 1}`);
  const hasImages = imgs.length > 0;

  return (
    <>
      <div ref={assignRootRef} className="sticky h-[73vh] flex items-center px-4 sm:px-6 md:px-9"
        style={{ top: `${145 + index * 25}px` }}>
        <motion.div style={{ scale }}
          className="w-full rounded-[32px] sm:rounded-[40px] md:rounded-[48px] border-2 border-[#D7E2EA] p-3 sm:p-4 md:p-6">
          <motion.div style={{ backgroundColor:"#0C0C0C" }} whileHover={{ boxShadow:"0 0 0 1px rgba(215,226,234,0.15)" }}
            className={`rounded-[25px] sm:rounded-[33px] md:rounded-[40px] transition-[padding] duration-500 ease-out cursor-pointer ${compact?"p-2 sm:p-3 md:p-4":"p-3 sm:p-4 md:p-6"}`}
            onClick={onOpenModal}>
            {/* Header */}
            <div className={`flex flex-wrap items-start justify-between gap-4 transition-[margin] duration-500 ease-out ${compact?"mb-3 sm:mb-3.5":"mb-4 sm:mb-6"}`}>
              <span className="font-black" style={{ color:"#D7E2EA", opacity:0.3, fontSize:"clamp(2.4rem,8.5vw,115px)", lineHeight:1 }}>
                {displayNumber}
              </span>
              <div className="text-right">
                {project.featured && (
                  <span className="inline-block text-[#D7E2EA]/70 text-[9px] uppercase tracking-widest border border-[#D7E2EA]/25 rounded-full px-2.5 py-0.5 mb-1.5">
                    {project.featuredLabel ?? "Featured Project"}
                  </span>
                )}
                <span className="block text-[#D7E2EA]/50 text-xs uppercase tracking-widest mb-1">{project.category}</span>
                <h3 className="text-[#D7E2EA] text-lg sm:text-xl md:text-2xl font-semibold">{project.title}</h3>
              </div>
            </div>
            <p className={`text-[#D7E2EA]/70 text-[0.75rem] sm:text-[0.86rem] leading-relaxed max-w-lg transition-all duration-500 ease-out ${compact?"mb-3 line-clamp-2":"mb-4"}`}>
              {project.copy}
            </p>
            <div className={`flex flex-wrap items-center gap-3 transition-all duration-500 ease-out ${compact?"mb-3":"mb-6"}`}
              onClick={e => e.stopPropagation()}>
              {project.liveDemo && <GhostButton icon={ArrowUpRight}>Live Demo</GhostButton>}
              {project.github && <GhostButton icon={Github}>GitHub</GhostButton>}
            </div>
            {/* Image area */}
            {hasImages ? (
              <div className="flex gap-2.5" onClick={e => e.stopPropagation()}>
                <div className="flex flex-col gap-2.5 transition-[width] duration-500 ease-out flex-shrink-0" style={{ width:compact?"28%":"38%" }}>
                  {imgs[1] && <ScreenshotTile src={imgs[1]} alt={imgLabels[1]} style={{ height:"clamp(100px,12vw,175px)" }} onClick={() => setCardLightboxIndex(1)} />}
                  {imgs[2] && <ScreenshotTile src={imgs[2]} alt={imgLabels[2]} style={{ height:"clamp(125px,17vw,260px)" }} onClick={() => setCardLightboxIndex(2)} />}
                </div>
                {imgs[0] && <ScreenshotTile src={imgs[0]} alt={imgLabels[0]} className="flex-1" style={{ height:"clamp(235px,30vw,450px)" }} onClick={() => setCardLightboxIndex(0)} />}
              </div>
            ) : (
              <div className="flex gap-2.5">
                <div className="flex flex-col gap-2.5 transition-[width] duration-500 ease-out" style={{ width:compact?"28%":"40%" }}>
                  <TintTile tint={project.tint} style={{ height:"clamp(105px,13vw,185px)" }} />
                  <TintTile tint={project.tint} style={{ height:"clamp(130px,18vw,275px)" }} />
                </div>
                <TintTile tint={project.tint} className="flex items-center justify-center" style={{ width:compact?"72%":"60%" }} />
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Card-level lightbox (when modal is closed) */}
      <AnimatePresence>
        {cardLightboxIndex !== null && !modalOpen && (
          <Lightbox images={imgs} labels={imgLabels} startIndex={cardLightboxIndex} onClose={() => setCardLightboxIndex(null)} />
        )}
      </AnimatePresence>

      {/* Project modal */}
      <AnimatePresence>
        {modalOpen && (
          <ProjectModal project={project} onClose={onCloseModal!}
            onPrev={onPrev} onNext={onNext} hasPrev={hasPrev} hasNext={hasNext} />
        )}
      </AnimatePresence>
    </>
  );
}
