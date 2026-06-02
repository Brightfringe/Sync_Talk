import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-soft-bg)" }} />
      <motion.div
        className="absolute -top-32 -left-24 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle at 30% 30%, #d6b4fc, transparent 65%)" }}
        animate={{ x: [0, 60, -20, 0], y: [0, 40, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 -right-32 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle at 60% 40%, #ffd1df, transparent 65%)" }}
        animate={{ x: [0, -50, 20, 0], y: [0, 60, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/3 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle at 50% 50%, #eac3ee, transparent 65%)" }}
        animate={{ x: [0, 40, -40, 0], y: [0, -30, 30, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(255,255,255,0.6))]" />
    </div>
  );
}