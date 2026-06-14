import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatClient } from "./stomp-client";
import type { ChatMessage, ConnectionStatus } from "./types";

const BACKEND_URL =
  (import.meta.env.VITE_BACKEND_URL as string | undefined)?.replace(/\/$/, "") ||
  "http://localhost:8080";

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useChat(username: string | null) {
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const clientRef = useRef<ChatClient | null>(null);

  useEffect(() => {
    if (!username) return;
    if (typeof window === "undefined") return;

    let cancelled = false;
    setStatus("connecting");

    void import("./stomp-client").then(({ createChatClient }) =>
      createChatClient({
        backendUrl: BACKEND_URL,
        onStatus: setStatus,
        onUsers: setOnlineUsers,
        onMessage: (payload) => {
          setMessages((prev) => [
            ...prev,
            {
              id: makeId(),
              sender: payload.sender,
              content: payload.content,
              timestamp: Date.now(),
              type: payload.type ?? "CHAT",  // ✅ pass type through
            },
          ]);
        },
      }).then((client) => {
        if (cancelled) {
          void client.deactivate();
          return;
        }

        clientRef.current = client;

        // ✅ fetch history first, then activate WebSocket
        fetch(`${BACKEND_URL}/api/messages/history`)
          .then((res) => res.json())
          .then((history) => {
            const mapped = history.map((m: {
              id: number;
              sender: string;
              content: string;
              sentAt: string;
              type?: "CHAT" | "JOIN" | "LEAVE";
            }) => ({
              id: String(m.id),
              sender: m.sender,
              content: m.content,
              timestamp: new Date(m.sentAt).getTime(),
              type: m.type ?? "CHAT",
            }));
            setMessages(mapped);        // set history first
            client.activate(username);  // then connect
          })
          
          .catch((e) => {
            console.error("Failed to load history:", e);
            client.activate(username);  // connect anyway if history fails
          });
      }),
    );

    return () => {
      cancelled = true;
      void clientRef.current?.deactivate();
      clientRef.current = null;
    };
  }, [username]);

  const send = useCallback(
    (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || !username) return false;
      return clientRef.current?.send({ sender: username, content: trimmed }) ?? false;
    },
    [username],
  );

  return { status, messages, send, onlineUsers, backendUrl: BACKEND_URL };
}