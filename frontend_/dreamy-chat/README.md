# SyncTalk

A premium, real-time chat frontend for a Spring Boot + STOMP + SockJS backend.
Soft feminine-modern UI, Apple-level polish, glassmorphism, Framer Motion micro-interactions.

## Stack

- React 19 + TypeScript
- TanStack Start (Vite 7, file-based routing under `src/routes/`)
- Tailwind CSS v4 (tokens in `src/styles.css`)
- `@stomp/stompjs` + `sockjs-client`
- Framer Motion

## Configure the backend URL

Copy the example env file and point it at your Spring Boot server:

```bash
cp .env.example .env
# edit .env
VITE_BACKEND_URL=http://localhost:8080
```

The frontend connects to:

| Purpose | Destination |
| --- | --- |
| SockJS endpoint | `${VITE_BACKEND_URL}/chat` |
| Subscribe topic | `/topic/message` |
| Publish destination | `/app/sendMessage` |
| Payload shape | `{ "sender": string, "content": string }` |

Reconnection is automatic (`reconnectDelay: 3000`).

## Local dev

```bash
bun install
bun dev
```

## Project layout

```
src/
  routes/
    __root.tsx       Root shell, fonts, head meta
    index.tsx        Landing (hero + JoinCard)
    chat.tsx         Chat room (client-only render)
  components/
    brand/Logo.tsx
    landing/         HeroBackground, JoinCard
    chat/            Sidebar, ChatHeader, MessageList,
                     MessageBubble, MessageInput,
                     ConnectionStatus, EmptyState
  lib/
    chat/types.ts        ChatMessage, ConnectionStatus
    chat/stomp-client.ts STOMP+SockJS service (lazy-loaded)
    chat/use-chat.ts     React hook wrapping the client
    session.ts           sessionStorage helpers for username
```

## Deployment

This template targets Cloudflare Workers (Lovable hosting). The published URL works
out of the box once `VITE_BACKEND_URL` points at a reachable Spring Boot server with
CORS configured for your frontend origin.

If you need Vercel specifically, you'll need to swap the TanStack Start adapter —
the chat code itself is portable.