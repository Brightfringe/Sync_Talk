import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageBubble } from "./MessageBubble";
import { EmptyState } from "./EmptyState";
import type { ChatMessage } from "@/lib/chat/types";

interface Props {
  messages: ChatMessage[];
  currentUser: string;
}

function SystemNotice({ text }: { text: string }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-center justify-center gap-3 py-1"
    >
      <span className="h-px flex-1 bg-foreground/10" />
      <span className="text-[11px] font-medium text-foreground/40 select-none">
        {text}
      </span>
      <span className="h-px flex-1 bg-foreground/10" />
    </motion.li>
  );
}

export function MessageList({ messages, currentUser }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const distanceFromBottom =
      scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
    if (distanceFromBottom < 160) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div ref={scrollerRef} className="flex-1 overflow-y-auto">
        <EmptyState />
      </div>
    );
  }

  return (
    <div
      ref={scrollerRef}
      className="flex-1 overflow-y-auto px-4 py-6 sm:px-6"
      aria-live="polite"
      aria-relevant="additions"
    >
      <ul className="mx-auto flex max-w-3xl flex-col gap-3">
        <AnimatePresence initial={false}>
          {messages.map((m) => {
            if (m.type === "JOIN") {
              return (
                <SystemNotice
                  key={m.id}
                  text={`${m.sender} joined the chat room`}
                />
              );
            }
            if (m.type === "LEAVE") {
              return (
                <SystemNotice
                  key={m.id}
                  text={`${m.sender} left the chat room`}
                />
              );
            }
            return (
              <MessageBubble
                key={m.id}
                message={m}
                isOwn={m.sender === currentUser}
              />
            );
          })}
        </AnimatePresence>
      </ul>
      <div ref={bottomRef} />
    </div>
  );
}