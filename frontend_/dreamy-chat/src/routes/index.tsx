import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { HeroBackground } from "@/components/landing/HeroBackground";
import { JoinCard } from "@/components/landing/JoinCard";
import LoginPage from "@/components/auth/LoginPage";
import SetNamePage from "@/components/auth/SetNamePage";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { setStoredUsername } from "@/lib/session";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SyncTalk — Real-time chat, beautifully soft" },
      { name: "description", content: "Join a real-time chat room in seconds." },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<"loading" | "unauthenticated" | "naming" | "ready">("loading");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setAuthState("naming");
      } else {
        setUser(null);
        setAuthState("unauthenticated");
      }
    });
  }, []);

  if (authState === "loading") {
    return (
      <main className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <HeroBackground />
        <div className="text-white text-lg">Loading...</div>
      </main>
    );
  }

  if (authState === "unauthenticated") {
    return <LoginPage />;
  }

  if (authState === "naming") {
    return (
      <SetNamePage
        onConfirm={(name) => {
          setStoredUsername(name);
          void navigate({ to: "/chat" });
        }}
      />
    );
  }

  // fallback
  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <HeroBackground />
      <JoinCard />
    </main>
  );
}