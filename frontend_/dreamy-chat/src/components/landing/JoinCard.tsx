import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { setStoredUsername } from "@/lib/session";

export function JoinCard() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError("Please use at least 2 characters.");
      return;
    }
    if (trimmed.length > 20) {
      setError("Please keep it under 20 characters.");
      return;
    }
    setStoredUsername(trimmed);
    void navigate({ to: "/chat" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong relative w-full max-w-md rounded-3xl p-8 shadow-elegant"
    >
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-foreground/70 ring-1 ring-white/80">
        <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
        Real-time chat, beautifully soft
      </div>
      <h1 className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
        Conversations,
        <br />
        <span className="text-gradient-primary">in sync.</span>
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Drop in a name and join the room. No accounts, no friction — just talk.
      </p>

      <form onSubmit={onSubmit} className="mt-7 space-y-3">
        <label htmlFor="username" className="block text-xs font-medium text-foreground/70">
          Your display name
        </label>
        <input
          id="username"
          type="text"
          autoComplete="off"
          autoFocus
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(null);
          }}
          placeholder="e.g. Aurora"
          maxLength={20}
          aria-invalid={!!error}
          aria-describedby={error ? "username-error" : undefined}
          className="w-full rounded-2xl border border-white/80 bg-white/70 px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/70 shadow-soft outline-none transition focus:border-primary/60 focus:ring-4 focus:ring-primary/20"
        />
        {error && (
          <p id="username-error" className="text-xs text-destructive">
            {error}
          </p>
        )}

        <motion.button
          whileHover={{ y: -1, scale: 1.01 }}
          whileTap={{ scale: 0.985 }}
          type="submit"
          className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-primary px-5 py-3.5 text-base font-semibold text-white shadow-elegant transition"
        >
          <span className="relative z-10">Join the chat</span>
          <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
        </motion.button>
      </form>

      <p className="mt-5 text-center text-[11px] text-muted-foreground/80">
        Powered by Spring WebSocket · STOMP over SockJS
      </p>
    </motion.div>
  );
}