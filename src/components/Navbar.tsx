import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "../data/nav";

// ─── Types ───────────────────────────────────────────────────────────────────
type NavLink = (typeof NAV_LINKS)[number];

// ─── Constants ───────────────────────────────────────────────────────────────
const PILL_GRADIENT =
  "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)";
const PILL_SHADOW =
  "0px 2px 12px rgba(182,0,168,0.35), inset 4px 4px 10px #7721B1";

// ─── Component ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [hovered, setHovered] = useState<NavLink | null>(null);
  const [active, setActive] = useState<NavLink | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Sync active state with scroll position
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.toLowerCase())
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const match = NAV_LINKS.find((l) => l.toLowerCase() === id);
            if (match) setActive(match);
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  const handleNavClick = (link: NavLink) => {
    setActive(link);
    setMobileOpen(false);
    const el = document.getElementById(link.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      ref={navRef}
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex justify-center pt-5 md:pt-7 px-4 relative z-50"
    >
      {/* ── Desktop Nav ───────────────────────────────────────────────────── */}
      <nav
        className="hidden md:flex items-center gap-1 px-3 py-2 rounded-2xl relative"
        style={{
          background: "rgba(15,15,20,0.45)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.06) inset",
          maxWidth: "min(79%, 800px)",
        }}
      >
        {NAV_LINKS.map((link) => {
          const isHovered = hovered === link;
          const isActive = active === link;

          return (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link);
              }}
              onMouseEnter={() => setHovered(link)}
              onMouseLeave={() => setHovered(null)}
              className="relative px-4 py-1.5 rounded-xl cursor-pointer select-none"
              style={{ textDecoration: "none" }}
            >
              {/* Sliding hover pill */}
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    layoutId="nav-pill"
                    key="nav-pill"
                    className="absolute inset-0 rounded-xl"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: PILL_GRADIENT,
                      boxShadow: PILL_SHADOW,
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Active underline dot */}
              {isActive && !isHovered && (
                <motion.span
                  layoutId="nav-active-dot"
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: "#B600A8" }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              )}

              <span
                className="relative z-10 font-medium uppercase tracking-wider text-[0.73rem] lg:text-[0.82rem] transition-colors duration-150"
                style={{
                  color: isHovered ? "#ffffff" : isActive ? "#ffffff" : "#D7E2EA",
                  textShadow: isActive && !isHovered ? "0 0 12px rgba(182,0,168,0.5)" : undefined,
                }}
              >
                {link}
              </span>
            </a>
          );
        })}
      </nav>

      {/* ── Mobile Nav ────────────────────────────────────────────────────── */}
      <div className="md:hidden w-full flex justify-between items-center px-1">
        {/* Brand / logo text */}
        <span
          className="font-black uppercase tracking-widest text-[0.75rem]"
          style={{ color: "#D7E2EA" }}
        >
          Dhwani
        </span>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          className="relative w-8 h-8 flex flex-col justify-center items-center gap-[5px] focus:outline-none"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="block w-5 h-[1.5px] rounded-full origin-center"
            style={{ background: "#D7E2EA" }}
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.15 }}
            className="block w-5 h-[1.5px] rounded-full"
            style={{ background: "#D7E2EA" }}
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="block w-5 h-[1.5px] rounded-full origin-center"
            style={{ background: "#D7E2EA" }}
          />
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full mt-2 right-1 rounded-2xl overflow-hidden flex flex-col py-2 min-w-[160px]"
              style={{
                background: "rgba(15,15,20,0.82)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link);
                  }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.18,
                    delay: i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="px-5 py-2.5 font-medium uppercase tracking-wider text-[0.72rem] transition-colors duration-150"
                  style={{
                    color: active === link ? "#ffffff" : "#D7E2EA",
                    background: active === link ? "rgba(182,0,168,0.12)" : "transparent",
                    textShadow: active === link ? "0 0 12px rgba(182,0,168,0.5)" : undefined,
                    textDecoration: "none",
                  }}
                >
                  {link}
                </motion.a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
