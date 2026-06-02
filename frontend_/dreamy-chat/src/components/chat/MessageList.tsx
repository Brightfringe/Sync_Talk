import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { MessageBubble } from "./MessageBubble";
import { EmptyState } from "./EmptyState";
import type { ChatMessage } from "@/lib/chat/types";

interface Props {
  messages: ChatMessage[];
  currentUser: string;
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
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} isOwn={m.sender === currentUser} />
          ))}
        </AnimatePresence>
      </ul>
      <div ref={bottomRef} />
    </div>
  );
}