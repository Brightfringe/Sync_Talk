
# SyncTalk — Premium Real-Time Chat Frontend

## Stack reality check (important)

Your spec asks for **plain React + Vite + Vercel**, but this Lovable project is scaffolded on **TanStack Start v1 + Vite 7 + Cloudflare Workers** (file-based routing under `src/routes/`, SSR shell in `__root.tsx`). I'll build the entire app inside this stack — it's still React + TypeScript + Tailwind + Vite under the hood, and your STOMP/SockJS client code runs identically. Two practical notes:

- **Deployment target**: the template deploys to Cloudflare (Lovable's hosting), not Vercel. The published URL works out of the box. If you specifically need Vercel, that's a separate eject — tell me and I'll document it, but I won't add a `vercel.json` that doesn't match the actual build.
- **WebSocket client is browser-only**: SockJS touches `window`, so the chat component will be guarded to render client-side only (no SSR crash).

If you'd rather I scaffold a fresh plain Vite+React+Vercel repo instead of using this TanStack project, say the word before I start.

## Design direction

Soft feminine-modern, Apple-polish. Palette locked to your 5 pinks/lilacs:
`#d6b4fc #e0bcf5 #eac3ee #f4cae7 #ffd1df`. Tokens defined in `src/styles.css` as oklch (per project rules), with a primary gradient `linear-gradient(135deg, #d6b4fc, #ffd1df)` driving CTAs, own-message bubbles, and the animated landing background. Glassmorphism cards (`backdrop-blur`, translucent white, soft inner border), 20px radius default, layered shadows tinted with primary. Typography: **Fraunces** (display) + **Inter** (body) from Google Fonts. Framer Motion for all motion.

## Routes & structure

```
src/
  routes/
    __root.tsx          (already exists — add font links + single <main>)
    index.tsx           (landing → on connect, navigates to /chat)
    chat.tsx            (chat interface, client-only render)
  components/
    landing/
      HeroBackground.tsx     (animated gradient blobs)
      JoinCard.tsx           (glass card, username input, connect button)
      Logo.tsx               (SyncTalk wordmark + glyph)
    chat/
      Sidebar.tsx            (logo, connection pill, user profile, online dot)
      ChatHeader.tsx         (mobile)
      MessageList.tsx        (auto-scroll, empty state)
      MessageBubble.tsx      (own vs other variants)
      MessageInput.tsx       (textarea, send btn, char counter, Enter to send)
      ConnectionStatus.tsx   (animated dot + label)
      EmptyState.tsx         (illustration + copy)
    ui/                      (existing shadcn primitives reused)
  lib/
    chat/
      stomp-client.ts        (SockJS+STOMP service, reconnect, subscribe/publish)
      use-chat.ts            (hook wrapping client: messages, status, send)
      types.ts               (ChatMessage, ConnectionStatus enum)
    session.ts               (sessionStorage username persistence)
```

## WebSocket service layer (`lib/chat/stomp-client.ts`)

- Singleton-per-hook `Client` from `@stomp/stompjs` with `webSocketFactory: () => new SockJS(\`${BACKEND_URL}/chat\`)`.
- `BACKEND_URL` read from `import.meta.env.VITE_BACKEND_URL` (browser-safe).
- `reconnectDelay: 3000`, exposes status callbacks: `connecting | connected | reconnecting | disconnected`.
- On `onConnect`: subscribe to `/topic/message`, parse JSON `{sender, content}`, append with client-side `id` + `timestamp` (backend payload has no timestamp, so we stamp on receive).
- `send(content)` publishes to `/app/sendMessage` with `JSON.stringify({sender, content})`.
- Clean teardown on unmount.

## `useChat` hook

Returns `{ status, messages, send, username, connect, disconnect }`. Owns the client lifecycle. Distinguishes own vs other messages by comparing `sender` to local username.

## Landing (`/`)

- Full-viewport animated gradient: 3 blurred blobs cycling positions via Framer Motion (`animate` loop, 18–24s).
- Centered glass `JoinCard`: logo, tagline "Conversations, in sync.", username input (2–20 chars, validated), big gradient "Join the chat" button with subtle hover lift + tap scale.
- On submit: store username, navigate to `/chat`.

## Chat (`/chat`)

- Desktop: 2-column grid `[280px sidebar | 1fr chat]`. Tablet: collapsible sidebar via Sheet. Mobile: sidebar hidden, top `ChatHeader` shows logo + status + profile.
- `MessageList`: auto-scrolls to bottom on new message unless user has scrolled up (track with intersection of bottom sentinel). Each `MessageBubble` enters with `initial={{opacity:0, y:8, scale:0.98}}` → `animate`. Own bubbles right-aligned with primary gradient + white text; other bubbles left-aligned glass card with sender name above and timestamp inline-muted.
- `MessageInput`: auto-resizing textarea (max 4 rows), Enter sends / Shift+Enter newline, send button disabled when empty or disconnected, live character counter (e.g. 0/500), shake animation on over-limit.
- Connection status pill in sidebar: colored dot + label + pulsing ring when connecting/reconnecting.
- Empty state: soft illustration (inline SVG with palette gradients) + "No messages yet — say hi 👋".

## Accessibility

- Single `<main>` per route, semantic landmarks (`<aside>`, `<header>`, `<form>`).
- All icon-only buttons get `aria-label`.
- Status pill has `role="status"` + `aria-live="polite"`.
- Message list region has `aria-live="polite"` for new-message announcements.
- Focus rings use `--ring` token tuned to lilac. Keyboard: Tab through input → send; Enter submits.

## Tailwind / tokens (`src/styles.css`)

Add palette as `--brand-lilac-1..5`, semantic remaps:
- `--primary` → lilac mid, `--primary-foreground` → white
- `--background` → near-white with warm pink tint
- `--card` → `oklch(1 0 0 / 0.6)` for glass
- `--gradient-primary`, `--gradient-soft-bg`, `--shadow-elegant`, `--shadow-glow` custom properties used inline.

## Dependencies to install

`@stomp/stompjs`, `sockjs-client`, `@types/sockjs-client`, `framer-motion` (verify if already present; install only what's missing).

## Env & docs

- `.env.example` with `VITE_BACKEND_URL=http://localhost:8080`.
- Update README: env setup, local dev (`bun dev`), how the STOMP destinations map to the Spring backend, and the deployment-target note above.

## Out of scope (will not do unless asked)

- Auth, persistence beyond sessionStorage, message history fetch (backend spec has no REST), typing indicators, multiple rooms, emoji picker, file upload, Vercel-specific config.

Ready for your go-ahead — and confirm whether to stay on TanStack Start (recommended, fastest) or eject to plain Vite+React for Vercel.
