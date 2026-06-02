import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
}

const sizes = {
  sm: { glyph: 28, text: "text-lg" },
  md: { glyph: 36, text: "text-2xl" },
  lg: { glyph: 56, text: "text-4xl" },
} as const;

export function Logo({ size = "md", showWordmark = true }: LogoProps) {
  const s = sizes[size];
  return (
    <div className="flex items-center gap-3">
      <motion.div
        initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
        className="relative grid place-items-center rounded-2xl bg-gradient-primary shadow-soft"
        style={{ width: s.glyph, height: s.glyph }}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" width={s.glyph * 0.55} height={s.glyph * 0.55} fill="none">
          <path
            d="M7 9.5C7 7.567 8.567 6 10.5 6h6A3.5 3.5 0 0 1 20 9.5v2A3.5 3.5 0 0 1 16.5 15H12l-3.2 2.4A.5.5 0 0 1 8 17v-2a3.5 3.5 0 0 1-1-2.45V9.5Z"
            fill="white"
            opacity="0.95"
          />
          <circle cx="11" cy="10.8" r="1.1" fill="#d6b4fc" />
          <circle cx="14.5" cy="10.8" r="1.1" fill="#f4cae7" />
        </svg>
      </motion.div>
      {showWordmark && (
        <span className={`font-display font-semibold tracking-tight text-foreground ${s.text}`}>
          Sync<span className="text-gradient-primary">Talk</span>
        </span>
      )}
    </div>
  );
}