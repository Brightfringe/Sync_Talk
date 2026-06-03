import type { ConnectionStatus, WirePayload } from "./types";

export interface ChatClientOptions {
  backendUrl: string;
  onStatus: (status: ConnectionStatus) => void;
  onMessage: (payload: WirePayload) => void;
}

export interface ChatClient {
  activate: () => void;
  deactivate: () => Promise<void>;
  send: (payload: WirePayload) => boolean;
}

export async function createChatClient({
  backendUrl,
  onStatus,
  onMessage,
}: ChatClientOptions): Promise<ChatClient> {
  const { Client } = await import("@stomp/stompjs");

  const wsUrl = backendUrl
    .replace(/^http/, "ws")
    .replace(/\/$/, "") + "/chat/websocket";

  let hasConnectedOnce = false;

  const client = new Client({
    brokerURL: wsUrl,
    reconnectDelay: 3000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
    debug: () => {},
    onConnect: () => {
      hasConnectedOnce = true;
      onStatus("connected");
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
    activate() {
      onStatus("connecting");
      client.activate();
    },
    async deactivate() {
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