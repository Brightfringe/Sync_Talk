import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const MAX = 500;

interface Props {
  onSend: (text: string) => boolean;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "0px";
    ta.style.height = `${Math.min(ta.scrollHeight, 140)}px`;
  }, [value]);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    const ok = onSend(trimmed);
    if (ok) setValue("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const tooLong = value.length > MAX;
  const canSend = !disabled && value.trim().length > 0 && !tooLong;

  return (
    <div className="border-t border-white/60 bg-white/50 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-3xl items-end gap-2">
        <div className="glass-strong relative flex-1 rounded-2xl px-4 py-2 shadow-soft transition focus-within:ring-4 focus-within:ring-primary/20">
          <textarea
            ref={taRef}
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, MAX + 50))}
            onKeyDown={onKeyDown}
            rows={1}
            disabled={disabled}
            placeholder={disabled ? "Connecting…" : "Type a message — Enter to send, Shift+Enter for newline"}
            aria-label="Message"
            className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 outline-none disabled:opacity-60"
          />
          <div
            className={`mt-1 text-right text-[10px] tabular-nums ${tooLong ? "text-destructive" : "text-muted-foreground/70"}`}
          >
            {value.length}/{MAX}
          </div>
        </div>
        <motion.button
          whileHover={canSend ? { y: -1, scale: 1.04 } : undefined}
          whileTap={canSend ? { scale: 0.95 } : undefined}
          onClick={submit}
          disabled={!canSend}
          aria-label="Send message"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-primary text-white shadow-elegant transition disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          <Send className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  );
}