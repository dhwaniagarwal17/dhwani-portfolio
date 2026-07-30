import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import FadeIn from "./FadeIn";

const CONTACTS = [
  {
    id: "email",
    icon: Mail,
    title: "Email",
    description: "Send me an email",
    value: "dhwaniagarwal.17@gmail.com",
    href: "mailto:dhwaniagarwal.17@gmail.com",
    newTab: false,
  },
  {
    id: "linkedin",
    icon: Linkedin,
    title: "LinkedIn",
    description: "Connect professionally",
    value: "linkedin.com/in/dhwani-agarwal",
    href: "https://www.linkedin.com/in/dhwani-agarwal-2b9166336",
    newTab: true,
  },
  {
    id: "github",
    icon: Github,
    title: "GitHub",
    description: "Explore my projects",
    value: "github.com/dhwaniagarwal17",
    href: "https://github.com/dhwaniagarwal17",
    newTab: true,
  },
] as const;

function ContactCard({ contact, index }: { contact: typeof CONTACTS[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = contact.icon;

  return (
    <FadeIn delay={0.1 + index * 0.08} y={24}>
      <motion.a
        href={contact.href}
        target={contact.newTab ? "_blank" : undefined}
        rel={contact.newTab ? "noopener noreferrer" : undefined}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -6, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
        className="flex flex-col items-center text-center rounded-2xl p-6 sm:p-7 cursor-pointer relative overflow-hidden"
        style={{
          background: hovered ? "rgba(182,0,168,0.08)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? "rgba(182,0,168,0.35)" : "rgba(255,255,255,0.08)"}`,
          boxShadow: hovered
            ? "0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(182,0,168,0.2)"
            : "0 4px 20px rgba(0,0,0,0.25)",
          transition: "background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
          textDecoration: "none",
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(182,0,168,0.7), transparent)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.25s ease",
          }}
        />

        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-250"
          style={{
            background: hovered ? "rgba(182,0,168,0.18)" : "rgba(215,226,234,0.07)",
            border: `1px solid ${hovered ? "rgba(182,0,168,0.35)" : "rgba(215,226,234,0.12)"}`,
          }}
        >
          <Icon
            size={20}
            strokeWidth={1.8}
            style={{ color: hovered ? "rgba(215,100,220,0.95)" : "rgba(215,226,234,0.7)" }}
          />
        </div>

        {/* Text */}
        <h3
          className="font-semibold uppercase tracking-widest mb-1"
          style={{ color: "#D7E2EA", fontSize: "0.8rem" }}
        >
          {contact.title}
        </h3>
        <p
          className="mb-2"
          style={{ color: "rgba(215,226,234,0.55)", fontSize: "0.75rem" }}
        >
          {contact.description}
        </p>
        <p
          className="font-medium"
          style={{ color: hovered ? "rgba(200,100,220,0.9)" : "rgba(215,226,234,0.35)", fontSize: "0.65rem", transition: "color 0.2s ease" }}
        >
          {contact.value}
        </p>
      </motion.a>
    </FadeIn>
  );
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="px-4 sm:px-6 md:px-12 py-20 md:py-28 border-t border-[#D7E2EA]/08 flex flex-col items-center text-center"
      style={{ backgroundColor: "#0C0C0C" }}
    >
      {/* Heading */}
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight mb-4"
          style={{ fontSize: "clamp(1.95rem, 5vw, 3.5rem)" }}
        >
          Let's Build Something Together
        </h2>
      </FadeIn>

      {/* Subheading */}
      <FadeIn delay={0.08} y={16}>
        <p
          className="max-w-lg mb-3 leading-relaxed font-light"
          style={{ color: "rgba(215,226,234,0.62)", fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)" }}
        >
          Open to internships, collaborations, freelance opportunities, and exciting software engineering projects.
        </p>
      </FadeIn>

      <FadeIn delay={0.12} y={12}>
        <p
          className="max-w-md mb-12 leading-relaxed"
          style={{ color: "rgba(215,226,234,0.4)", fontSize: "0.82rem", fontStyle: "italic" }}
        >
          Whether it's an internship, research collaboration, or just a conversation about technology and AI — I'd love to hear from you.
        </p>
      </FadeIn>

      {/* Contact cards */}
      <div className="w-full max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-14">
        {CONTACTS.map((contact, i) => (
          <ContactCard key={contact.id} contact={contact} index={i} />
        ))}
      </div>

      {/* Footer */}
      <p
        className="text-[0.62rem]"
        style={{ color: "rgba(215,226,234,0.22)" }}
      >
        © 2026 Dhwani Agarwal. All rights reserved.
      </p>
    </section>
  );
}
