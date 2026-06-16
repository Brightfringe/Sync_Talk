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

  // Convert https:// → wss://, http:// → ws://
  const wsUrl = backendUrl
    .replace(/\/$/, "")
    .replace(/^https:\/\//, "wss://")
    .replace(/^http:\/\//, "ws://")
    + "/chat/websocket";

  console.log("BACKEND_URL =", backendUrl);
  console.log("SOCKET_URL (ws) =", wsUrl);

  let hasConnectedOnce = false;
  let username = "";

  const client = new Client({
    brokerURL: wsUrl,   // ← raw WebSocket, no SockJS

    reconnectDelay: 3000,
    heartbeatIncoming: 25000,
    heartbeatOutgoing: 25000,

    debug: (msg) => {
      console.log("STOMP:", msg);
    },

    onConnect: () => {
      console.log("STOMP CONNECTED");

      hasConnectedOnce = true;
      onStatus("connected");

      client.subscribe("/topic/message", (frame) => {
        try {
          const parsed = JSON.parse(frame.body) as WirePayload;
if (parsed && typeof parsed.sender === "string") {
  onMessage(parsed);  
}
        } catch (e) {
          console.error("Message parse error:", e);
        }
      });

      client.subscribe("/topic/users", (frame) => {
        try {
          const users = JSON.parse(frame.body) as string[];
          onUsers(users);
        } catch (e) {
          console.error("Users parse error:", e);
        }
      });

      if (username) {
        client.publish({
          destination: "/app/join",
          body: JSON.stringify({
            sender: username,
            content: "",
            type: "JOIN",
          }),
        });
      }
    },

    onWebSocketError: (e) => {
      console.error("WS ERROR:", e);
    },

    onWebSocketClose: (e) => {
      console.log("WS CLOSED:", e);

      if (client.active) {
        onStatus(hasConnectedOnce ? "reconnecting" : "connecting");
      } else {
        onStatus("disconnected");
      }
    },

    onStompError: (frame) => {
      console.error("STOMP ERROR:", frame);
      onStatus("reconnecting");
    },
  });

  return {
    activate(name?: string) {
      if (name) username = name;
      console.log("Activating client for:", username);
      onStatus("connecting");
      client.activate();
    },

    async deactivate() {
      if (username && client.connected) {
        client.publish({
          destination: "/app/leave",
          body: JSON.stringify({
            sender: username,
            content: "",
            type: "LEAVE",
          }),
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