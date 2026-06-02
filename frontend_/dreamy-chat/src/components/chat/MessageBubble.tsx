import { motion } from "framer-motion";
import type { ChatMessage } from "@/lib/chat/types";

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function MessageBubble({ message, isOwn }: { message: ChatMessage; isOwn: boolean }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`flex w-full gap-2 ${isOwn ? "justify-end" : "justify-start"}`}
    >
      {!isOwn && (
        <div
          className="mt-auto grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-primary text-[11px] font-semibold text-white shadow-soft"
          aria-hidden
        >
          {initials(message.sender)}
        </div>
      )}
      <div className={`flex max-w-[78%] flex-col ${isOwn ? "items-end" : "items-start"}`}>
        {!isOwn && (
          <span className="mb-1 px-1 text-[11px] font-medium text-foreground/70">
            {message.sender}
          </span>
        )}
        <div
          className={
            isOwn
              ? "rounded-2xl rounded-br-md bg-gradient-primary px-4 py-2.5 text-sm text-white shadow-soft"
              : "glass rounded-2xl rounded-bl-md px-4 py-2.5 text-sm text-foreground shadow-soft"
          }
        >
          <p className="whitespace-pre-wrap break-words leading-relaxed">{message.content}</p>
        </div>
        <span
          className={`mt-1 px-1 text-[10px] tabular-nums ${isOwn ? "text-foreground/50" : "text-muted-foreground"}`}
        >
          {formatTime(message.timestamp)}
        </span>
      </div>
    </motion.li>
  );
}