import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Sidebar } from "@/components/chat/Sidebar";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageList } from "@/components/chat/MessageList";
import { MessageInput } from "@/components/chat/MessageInput";
import { HeroBackground } from "@/components/landing/HeroBackground";
import { useChat } from "@/lib/chat/use-chat";
import { clearStoredUsername, getStoredUsername } from "@/lib/session";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "SyncTalk — Chat room" },
      { name: "description", content: "You're in. Send messages in real time over a Spring WebSocket connection." },
      { property: "og:title", content: "SyncTalk — Chat room" },
      { property: "og:description", content: "You're in. Send messages in real time over a Spring WebSocket connection." },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredUsername();
    if (!stored) {
      void navigate({ to: "/" });
      return;
    }
    setUsername(stored);
  }, [navigate]);

  if (!mounted || !username) {
    return (
      <main className="relative grid min-h-screen place-items-center">
        <HeroBackground />
        <div className="glass rounded-2xl px-5 py-3 text-sm text-muted-foreground shadow-soft">
          Preparing your room…
        </div>
      </main>
    );
  }

  return <ChatRoom username={username} onLeave={() => {
    clearStoredUsername();
    void navigate({ to: "/" });
  }} />;
}

function ChatRoom({ username, onLeave }: { username: string; onLeave: () => void }) {
  const { status, messages, send } = useChat(username);
  const canSend = status === "connected";

  return (
    <main className="relative flex h-[100dvh] w-full overflow-hidden">
      <HeroBackground />
      <Sidebar username={username} status={status} onLeave={onLeave} />
      <section className="flex h-full min-w-0 flex-1 flex-col">
        <ChatHeader status={status} onLeave={onLeave} />
        <MessageList messages={messages} currentUser={username} />
        <MessageInput onSend={send} disabled={!canSend} />
      </section>
    </main>
  );
}