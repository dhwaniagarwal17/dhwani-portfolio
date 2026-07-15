import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, ExternalLink, ChevronLeft, ChevronRight, Star } from "lucide-react";
import FadeIn from "./FadeIn";
import { CASE_STUDIES, type CaseStudyItem, type CaseStudyStatus } from "../data/experience";

// ─── Palette ──────────────────────────────────────────────────────────────────
const CATEGORY_ACCENT: Record<string, { color: string; bg: string; border: string }> = {
  "Client Project": { color: "rgba(182,0,168,0.9)",  bg: "rgba(182,0,168,0.10)",  border: "rgba(182,0,168,0.25)" },
  Internship:       { color: "rgba(118,33,176,0.95)", bg: "rgba(118,33,176,0.10)", border: "rgba(118,33,176,0.28)" },
  Research:         { color: "rgba(91,140,255,0.9)",  bg: "rgba(91,140,255,0.08)", border: "rgba(91,140,255,0.22)" },
  Engineering:      { color: "rgba(180,140,60,0.9)",  bg: "rgba(180,140,60,0.08)", border: "rgba(180,140,60,0.22)" },
};

const STATUS_STYLE: Record<CaseStudyStatus, { color: string; bg: string; border: string }> = {
  Completed:    { color: "rgba(80,200,120,0.85)",  bg: "rgba(80,200,120,0.08)",  border: "rgba(80,200,120,0.22)"  },
  Ongoing:      { color: "rgba(91,140,255,0.85)",  bg: "rgba(91,140,255,0.08)",  border: "rgba(91,140,255,0.20)"  },
  "In Progress":{ color: "rgba(220,160,40,0.85)",  bg: "rgba(220,160,40,0.08)",  border: "rgba(220,160,40,0.22)"  },
};

function getAccent(category: string) {
  return CATEGORY_ACCENT[category] ?? CATEGORY_ACCENT["Client Project"];
}

// ─── Shared badge ─────────────────────────────────────────────────────────────
function Badge({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  return (
    <span className="inline-block text-[0.6rem] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full"
      style={{ color, background: bg, border: `1px solid ${border}` }}>
      {label}
    </span>
  );
}

// ─── Card cover image ─────────────────────────────────────────────────────────
function CardImage({ item, accent, featured }: {
  item: CaseStudyItem;
  accent: { color: string; bg: string; border: string };
  featured?: boolean;
}) {
  const heightClass = featured ? "h-44 sm:h-52" : "h-32";
  const coverSrc = item.images?.[0];
  const isSingleLogo = item.images?.length === 1;

  if (coverSrc) {
    return (
      <div className={`w-full overflow-hidden rounded-xl ${heightClass} flex items-center justify-center`}
        style={{ background: "rgba(10,10,14,0.9)", border: `1px solid ${accent.border}` }}>
        <img src={coverSrc} alt={item.imageLabels?.[0] ?? item.title} loading="lazy" draggable={false}
          className={isSingleLogo ? "max-w-[65%] max-h-[70%] object-contain" : "w-full h-full object-cover object-center"}
          style={{ imageRendering: "auto" }} />
      </div>
    );
  }

  // Placeholder
  return (
    <div className={`w-full overflow-hidden rounded-xl ${heightClass}`}
      style={{ background: `linear-gradient(135deg, ${accent.bg} 0%, rgba(255,255,255,0.02) 100%)`, border: `1px solid ${accent.border}` }}>
      <div className="w-full h-full flex items-center justify-center opacity-20">
        <div className="w-8 h-8 rounded-full" style={{ background: accent.color }} />
      </div>
    </div>
  );
}

// ─── Modal gallery ────────────────────────────────────────────────────────────
function ModalGallery({ images, labels, accent }: {
  images: string[]; labels: string[]; accent: { color: string; bg: string; border: string };
}) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number>(0);

  const prev = useCallback(() => setCurrent(c => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(c => (c + 1) % images.length), [images.length]);

  // Keyboard (only when gallery is mounted)
  useEffect(() => {
    if (images.length <= 1) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, images.length]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  };

  const single = images.length === 1;

  return (
    <div>
      {/* Main image */}
      <div className="relative w-full overflow-hidden rounded-xl mb-3"
        style={{ border: `1px solid ${accent.border}` }}
        onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <AnimatePresence mode="wait">
          <motion.img key={current} src={images[current]} alt={labels[current]}
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}
            loading="lazy" draggable={false}
            className="w-full h-auto object-contain rounded-xl"
            style={{ maxHeight: "340px", background: "rgba(8,8,12,1)" }} />
        </AnimatePresence>

        {/* Prev / Next overlays */}
        {!single && (
          <>
            <button onClick={prev} aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150"
              style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(215,226,234,0.8)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.8)")}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.55)")}>
              <ChevronLeft size={14} />
            </button>
            <button onClick={next} aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150"
              style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(215,226,234,0.8)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.8)")}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.55)")}>
              <ChevronRight size={14} />
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      <p className="text-center text-[0.65rem] font-medium uppercase tracking-widest mb-3"
        style={{ color: "rgba(215,226,234,0.48)" }}>
        {labels[current]}
        {!single && <span style={{ color: "rgba(215,226,234,0.24)" }}> · {current + 1}/{images.length}</span>}
      </p>

      {/* Thumbnail strip */}
      {!single && (
        <div className="flex gap-2 justify-center flex-wrap">
          {images.map((src, i) => (
            <button key={i} onClick={() => setCurrent(i)} aria-label={`View ${labels[i]}`}
              className="overflow-hidden rounded-lg transition-all duration-200 flex-shrink-0"
              style={{
                width: 64, height: 42,
                border: `1.5px solid ${i === current ? accent.color : "rgba(255,255,255,0.1)"}`,
                opacity: i === current ? 1 : 0.45,
                background: "rgba(8,8,12,1)",
              }}>
              <img src={src} alt={labels[i]} loading="lazy" draggable={false}
                className="w-full h-full object-cover object-center" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Featured card ─────────────────────────────────────────────────────────
function FeaturedCard({ item, onClick }: { item: CaseStudyItem; onClick: () => void }) {
  const accent = getAccent(item.category);
  const statusStyle = STATUS_STYLE[item.status];
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={0} y={32}>
      <motion.div onClick={onClick} role="button" tabIndex={0}
        onKeyDown={e => e.key === "Enter" && onClick()}
        aria-label={`Open case study: ${item.title}`}
        whileHover={{ y: -5, transition: { duration: 0.22, ease: [0.22,1,0.36,1] } }}
        onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
        className="group relative rounded-2xl cursor-pointer overflow-hidden w-full"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? accent.border : "rgba(255,255,255,0.08)"}`,
          boxShadow: hovered ? `0 16px 56px rgba(0,0,0,0.5), 0 0 0 1px ${accent.border}` : "0 4px 24px rgba(0,0,0,0.3)",
          transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)`, opacity: hovered ? 1 : 0.3, transition: "opacity 0.3s ease" }} />
        <div className="p-6 sm:p-8 md:p-9">
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[0.6rem] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                  style={{ color: accent.color, background: accent.bg, border: `1px solid ${accent.border}` }}>Featured</span>
                <Badge label={item.category} {...accent} />
                <Badge label={item.status} {...statusStyle} />
                {item.featuredAchievement && (
                  <span className="inline-flex items-center gap-1 text-[0.6rem] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                    style={{ color: "rgba(255,200,50,0.9)", background: "rgba(255,200,50,0.08)", border: "1px solid rgba(255,200,50,0.25)" }}>
                    <Star size={9} fill="currentColor" /> Featured Achievement
                  </span>
                )}
              </div>
              <h3 className="font-black uppercase tracking-tight leading-none mb-1"
                style={{ color: "#D7E2EA", fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>{item.title}</h3>
              <p className="mb-1 font-light" style={{ color: "rgba(215,226,234,0.67)", fontSize: "0.85rem" }}>{item.org}</p>
              <p className="font-medium uppercase tracking-widest mb-4" style={{ color: "rgba(215,226,234,0.48)", fontSize: "0.6rem" }}>{item.metadata}</p>
              <p className="leading-relaxed mb-5 line-clamp-2" style={{ color: "rgba(215,226,234,0.76)", fontSize: "clamp(0.78rem, 1.1vw, 0.9rem)" }}>{item.summary}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {item.tags.slice(0, 5).map(tag => (
                  <span key={tag} className="text-[0.6rem] font-medium px-2 py-0.5 rounded-md uppercase tracking-wide"
                    style={{ color: "rgba(215,226,234,0.5)", background: "rgba(215,226,234,0.05)", border: "1px solid rgba(215,226,234,0.09)" }}>{tag}</span>
                ))}
              </div>
              <motion.div className="inline-flex items-center gap-1.5 text-[0.72rem] font-medium uppercase tracking-widest"
                style={{ color: accent.color }} animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
                View Case Study <ArrowRight size={12} strokeWidth={2} />
              </motion.div>
            </div>
            <div className="md:w-64 lg:w-80 flex-shrink-0">
              <CardImage item={item} accent={accent} featured />
            </div>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}

// ─── Standard card ─────────────────────────────────────────────────────────────
function CaseStudyCard({ item, index, onClick }: { item: CaseStudyItem; index: number; onClick: () => void }) {
  const accent = getAccent(item.category);
  const statusStyle = STATUS_STYLE[item.status];
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={index * 0.08} y={32}>
      <motion.div onClick={onClick} role="button" tabIndex={0}
        onKeyDown={e => e.key === "Enter" && onClick()}
        aria-label={`Open case study: ${item.title}`}
        whileHover={{ y: -5, transition: { duration: 0.22, ease: [0.22,1,0.36,1] } }}
        onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
        className="group relative rounded-2xl cursor-pointer overflow-hidden h-full"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? accent.border : "rgba(255,255,255,0.08)"}`,
          boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px ${accent.border}` : "0 4px 24px rgba(0,0,0,0.3)",
          transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)`, opacity: hovered ? 1 : 0.25, transition: "opacity 0.3s ease" }} />
        <div className="p-6 sm:p-7 flex flex-col h-full">
          <div className="mb-5"><CardImage item={item} accent={accent} /></div>
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <Badge label={item.category} {...accent} />
            <Badge label={item.status} {...statusStyle} />
            {item.featuredAchievement && (
              <span className="inline-flex items-center gap-1 text-[0.58rem] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ color: "rgba(255,200,50,0.9)", background: "rgba(255,200,50,0.08)", border: "1px solid rgba(255,200,50,0.22)" }}>
                <Star size={8} fill="currentColor" /> Achievement
              </span>
            )}
          </div>
          <h3 className="font-semibold leading-tight mb-0.5" style={{ color: "#D7E2EA", fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)" }}>{item.title}</h3>
          <p className="mb-0.5 font-light" style={{ color: "rgba(215,226,234,0.5)", fontSize: "0.8rem" }}>{item.org}</p>
          <p className="font-medium uppercase tracking-widest mb-3" style={{ color: "rgba(215,226,234,0.3)", fontSize: "0.58rem" }}>{item.metadata}</p>
          <p className="leading-relaxed mb-4 line-clamp-2 flex-1" style={{ color: "rgba(215,226,234,0.6)", fontSize: "clamp(0.73rem, 1vw, 0.84rem)" }}>{item.summary}</p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {item.tags.slice(0, 4).map(tag => (
              <span key={tag} className="text-[0.58rem] font-medium px-1.5 py-0.5 rounded-md uppercase tracking-wide"
                style={{ color: "rgba(215,226,234,0.57)", background: "rgba(215,226,234,0.05)", border: "1px solid rgba(215,226,234,0.08)" }}>{tag}</span>
            ))}
          </div>
          <motion.div className="inline-flex items-center gap-1.5 text-[0.68rem] font-medium uppercase tracking-widest mt-auto"
            style={{ color: accent.color }} animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
            Open Case Study <ArrowRight size={11} strokeWidth={2} />
          </motion.div>
        </div>
      </motion.div>
    </FadeIn>
  );
}

// ─── Modal helpers ────────────────────────────────────────────────────────────
function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h4 className="font-semibold uppercase tracking-widest mb-3 pb-2"
        style={{ color: "rgba(215,226,234,0.48)", fontSize: "0.62rem", letterSpacing: "0.16em", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {title}
      </h4>
      {children}
    </div>
  );
}

function BulletList({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul className="space-y-2">
      {items.map((c, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: accent }} />
          <span style={{ color: "rgba(215,226,234,0.82)", fontSize: "0.87rem" }}>{c}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function CaseStudyModal({ item, onClose }: { item: CaseStudyItem; onClose: () => void }) {
  const accent = getAccent(item.category);
  const statusStyle = STATUS_STYLE[item.status];
  const imgs = item.images ?? [];
  const labels = item.imageLabels ?? imgs.map((_, i) => `Image ${i + 1}`);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10"
      style={{ backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)", background: "rgba(0,0,0,0.78)" }}
      onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.93, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 28 }} transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl"
        style={{ background: "rgba(12,12,16,0.98)", border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: `0 40px 90px rgba(0,0,0,0.75), 0 0 0 1px ${accent.border}`,
          scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}>

        {/* Header */}
        <div className="relative px-7 pt-8 pb-6"
          style={{ background: `linear-gradient(135deg, ${accent.bg} 0%, transparent 65%)`, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={onClose} aria-label="Close modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(215,226,234,0.6)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)")}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)")}>
            <X size={13} />
          </button>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge label={item.category} {...accent} />
            <Badge label={item.status} {...statusStyle} />
            {item.statusNote && <Badge label={item.statusNote} color="rgba(220,160,40,0.85)" bg="rgba(220,160,40,0.08)" border="rgba(220,160,40,0.22)" />}
            {item.featuredAchievement && (
              <span className="inline-flex items-center gap-1 text-[0.6rem] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                style={{ color: "rgba(255,200,50,0.9)", background: "rgba(255,200,50,0.08)", border: "1px solid rgba(255,200,50,0.25)" }}>
                <Star size={9} fill="currentColor" /> Featured Achievement
              </span>
            )}
          </div>
          <h2 className="font-black uppercase tracking-tight leading-none mb-1"
            style={{ color: "#D7E2EA", fontSize: "clamp(1.5rem, 3.2vw, 2.2rem)" }}>{item.title}</h2>
          <p style={{ color: "rgba(215,226,234,0.5)", fontSize: "0.85rem" }}>{item.org}</p>
          <p className="mt-0.5 font-medium uppercase tracking-widest" style={{ color: "rgba(215,226,234,0.3)", fontSize: "0.6rem" }}>{item.metadata}</p>
        </div>

        {/* Body */}
        <div className="px-7 py-7">
          <ModalSection title="Overview"><p className="leading-relaxed" style={{ color: "rgba(215,226,234,0.82)", fontSize: "0.88rem" }}>{item.overview}</p></ModalSection>
          <ModalSection title="Problem"><p className="leading-relaxed" style={{ color: "rgba(215,226,234,0.82)", fontSize: "0.88rem" }}>{item.problem}</p></ModalSection>
          <ModalSection title="My Role"><p className="leading-relaxed" style={{ color: "rgba(215,226,234,0.82)", fontSize: "0.88rem" }}>{item.myRole}</p></ModalSection>
          {item.contributions.length > 0 && <ModalSection title="Key Contributions"><BulletList items={item.contributions} accent={accent.color} /></ModalSection>}
          <ModalSection title="Technologies & Skills">
            <div className="flex flex-wrap gap-2">
              {item.technologies.map(t => (
                <span key={t} className="text-[0.7rem] font-medium px-3 py-1 rounded-lg uppercase tracking-wide"
                  style={{ color: "rgba(215,226,234,0.76)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>{t}</span>
              ))}
            </div>
          </ModalSection>
          {item.challenges.length > 0 && <ModalSection title="Challenges"><BulletList items={item.challenges} accent={accent.color} /></ModalSection>}
          <ModalSection title="Key Learnings">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {item.keyLearnings.map((l, i) => (
                <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: accent.color }} />
                  <span style={{ color: "rgba(215,226,234,0.76)", fontSize: "0.8rem" }}>{l}</span>
                </div>
              ))}
            </div>
          </ModalSection>
          {item.deliverables.length > 0 && (
            <ModalSection title="Deliverables">
              <div className="flex flex-wrap gap-2">
                {item.deliverables.map(d => (
                  <span key={d} className="text-[0.72rem] px-3 py-1 rounded-lg"
                    style={{ color: "rgba(215,226,234,0.6)", background: accent.bg, border: `1px solid ${accent.border}` }}>{d}</span>
                ))}
              </div>
            </ModalSection>
          )}

          {/* Gallery */}
          {imgs.length > 0 && (
            <ModalSection title={imgs.length === 1 ? "Image" : "Gallery"}>
              <ModalGallery images={imgs} labels={labels} accent={accent} />
            </ModalSection>
          )}

          {item.certificateNote && (
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl mb-8"
              style={{ background: "rgba(182,0,168,0.07)", border: "1px solid rgba(182,0,168,0.18)" }}>
              <span style={{ color: "rgba(182,0,168,0.8)", fontSize: "0.75rem" }}>ℹ</span>
              <p style={{ color: "rgba(215,226,234,0.67)", fontSize: "0.78rem" }}>{item.certificateNote}</p>
            </div>
          )}

          {item.links.length > 0 && (
            <ModalSection title="Resources">
              <div className="flex flex-wrap gap-3">
                {item.links.map(link => link.disabled ? (
                  <span key={link.label} className="inline-flex items-center gap-1.5 rounded-full font-medium uppercase tracking-widest text-[0.63rem] px-5 py-2 cursor-not-allowed"
                    style={{ color: "rgba(215,226,234,0.28)", border: "1.5px solid rgba(215,226,234,0.1)", background: "rgba(215,226,234,0.02)" }}>{link.label}</span>
                ) : (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full font-medium uppercase tracking-widest text-[0.63rem] px-5 py-2 transition-opacity duration-150 hover:opacity-90"
                    style={{ color: "#ffffff", background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)", boxShadow: "0px 4px 4px rgba(181,1,167,0.25), 4px 4px 12px #7721B1 inset" }}>
                    <ExternalLink size={10} strokeWidth={2} />{link.label}
                  </a>
                ))}
              </div>
            </ModalSection>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ExperienceSection() {
  const [active, setActive] = useState<CaseStudyItem | null>(null);
  const open = useCallback((item: CaseStudyItem) => setActive(item), []);
  const close = useCallback(() => setActive(null), []);
  const featured = CASE_STUDIES.find(c => c.featured);
  const rest = CASE_STUDIES.filter(c => !c.featured);

  return (
    <>
      <section id="experience" className="px-4 sm:px-6 md:px-9 py-20 sm:py-24 md:py-28" style={{ backgroundColor: "#0C0C0C" }}>
        <FadeIn y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={{ fontSize: "clamp(2.4rem, 10vw, 130px)" }}>
            Experience &amp; Research
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} y={20}>
          <p className="text-center mx-auto mt-5 mb-14 sm:mb-16 md:mb-20 leading-relaxed"
            style={{ color: "rgba(215,226,234,0.54)", fontSize: "clamp(0.78rem, 1.1vw, 0.95rem)", maxWidth: "540px" }}>
            A selection of professional work, engineering projects, and research that have shaped my journey as a software engineer.
          </p>
        </FadeIn>
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5">
          {featured && <FeaturedCard item={featured} onClick={() => open(featured)} />}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {rest.map((item, i) => (
                <CaseStudyCard key={item.id} item={item} index={i + 1} onClick={() => open(item)} />
              ))}
            </div>
          )}
        </div>
      </section>
      <AnimatePresence>
        {active && <CaseStudyModal item={active} onClose={close} />}
      </AnimatePresence>
    </>
  );
}
