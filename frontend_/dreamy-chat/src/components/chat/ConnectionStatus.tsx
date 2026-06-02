import { motion } from "framer-motion";
import type { ConnectionStatus as Status } from "@/lib/chat/types";

const META: Record<Status, { label: string; dot: string; pulse: boolean }> = {
  idle: { label: "Idle", dot: "bg-muted-foreground/50", pulse: false },
  connecting: { label: "Connecting…", dot: "bg-amber-400", pulse: true },
  connected: { label: "Connected", dot: "bg-emerald-400", pulse: false },
  reconnecting: { label: "Reconnecting…", dot: "bg-amber-400", pulse: true },
  disconnected: { label: "Disconnected", dot: "bg-rose-400", pulse: false },
};

export function ConnectionStatusPill({ status }: { status: Status }) {
  const m = META[status];
  return (
    <div
      role="status"
      aria-live="polite"
      className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1.5 text-xs font-medium text-foreground/80 ring-1 ring-white/80 shadow-soft"
    >
      <span className="relative flex h-2 w-2">
        {m.pulse && (
          <motion.span
            className={`absolute inline-flex h-full w-full rounded-full ${m.dot} opacity-60`}
            animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${m.dot}`} />
      </span>
      {m.label}
    </div>
  );
}