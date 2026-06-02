export type ConnectionStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected";

export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
}

export interface WirePayload {
  sender: string;
  content: string;
}