import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface GhostButtonProps {
  children: ReactNode;
  icon?: LucideIcon;
}

export default function GhostButton({ children, icon: Icon }: GhostButtonProps) {
  return (
    <button className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest text-[0.63rem] sm:text-[0.75rem] px-4 sm:px-6 py-1.5 sm:py-2 flex items-center gap-1.5 hover:bg-[#D7E2EA]/10 transition-colors duration-200">
      {children} {Icon && <Icon size={12} />}
    </button>
  );
}
