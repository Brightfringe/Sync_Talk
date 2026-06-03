import type { ConnectionStatus, WirePayload } from "./types";

export interface ChatClientOptions {
  backendUrl: string;
  onStatus: (status: ConnectionStatus) => void;
  onMessage: (payload: WirePayload) => void;
  onUsers: (users: string[]) => void;
}

export interface ChatClient {
  activate: (name?: string) => void;
  deactivate: () => Promise<void>;
  send: (payload: WirePayload) => boolean;
}

export async function createChatClient({
  backendUrl,
  onStatus,
  onMessage,
  onUsers,
}: ChatClientOptions): Promise<ChatClient> {
  const { Client } = await import("@stomp/stompjs");

  const wsUrl = backendUrl
    .replace(/^http/, "ws")
    .replace(/\/$/, "") + "/chat/websocket";

  let hasConnectedOnce = false;
  let username = "";

  const client = new Client({
    brokerURL: wsUrl,
    reconnectDelay: 3000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
    debug: () => {},
    onConnect: () => {
      hasConnectedOnce = true;
      onStatus("connected");

      // Subscribe to messages
      client.subscribe("/topic/message", (frame) => {
        try {
          const parsed = JSON.parse(frame.body) as WirePayload;
          if (parsed && typeof parsed.sender === "string" && typeof parsed.content === "string") {
            onMessage(parsed);
          }
        } catch {
          // ignore malformed payloads
        }
      });

      // Subscribe to online users
      client.subscribe("/topic/users", (frame) => {
        try {
          const users = JSON.parse(frame.body) as string[];
          onUsers(users);
        } catch {
          // ignore
        }
      });

      // Announce join
      if (username) {
        client.publish({
          destination: "/app/join",
          body: JSON.stringify({ sender: username, content: "", type: "JOIN" }),
        });
      }
    },
    onWebSocketClose: () => {
      if (client.active) {
        onStatus(hasConnectedOnce ? "reconnecting" : "connecting");
      } else {
        onStatus("disconnected");
      }
    },
    onStompError: () => {
      onStatus("reconnecting");
    },
  });

  return {
    activate(name?: string) {
      if (name) username = name;
      onStatus("connecting");
      client.activate();
    },
    async deactivate() {
      // Announce leave
      if (username && client.connected) {
        client.publish({
          destination: "/app/leave",
          body: JSON.stringify({ sender: username, content: "", type: "LEAVE" }),
        });
      }
      await client.deactivate();
      onStatus("disconnected");
    },
    send(payload) {
      if (!client.connected) return false;
      client.publish({
        destination: "/app/sendMessage",
        body: JSON.stringify(payload),
      });
      return true;
    },
  };
}