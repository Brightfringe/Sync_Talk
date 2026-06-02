import { createFileRoute } from "@tanstack/react-router";
import { HeroBackground } from "@/components/landing/HeroBackground";
import { JoinCard } from "@/components/landing/JoinCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SyncTalk — Real-time chat, beautifully soft" },
      { name: "description", content: "Join a real-time chat room in seconds. No accounts, no friction — powered by Spring WebSockets." },
      { property: "og:title", content: "SyncTalk — Real-time chat, beautifully soft" },
      { property: "og:description", content: "Join a real-time chat room in seconds. No accounts, no friction — powered by Spring WebSockets." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <HeroBackground />
      <JoinCard />
    </main>
  );
}
