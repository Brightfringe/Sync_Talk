<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=SyncTalk&fontSize=80&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Conversations,%20in%20sync.&descAlignY=55&descSize=20" width="100%"/>

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-sync--talk--olive.vercel.app-blueviolet?style=for-the-badge)](https://sync-talk-olive.vercel.app)

<br/>

![Java](https://img.shields.io/badge/Java_21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 💡 What is SyncTalk?

**SyncTalk** is a full-stack real-time chat application where users sign in with Google, pick a display name, and instantly start chatting with everyone in the room — no refresh needed, no delays.

It's built on a **Spring Boot WebSocket backend** and a **React + TypeScript frontend**, communicating over the STOMP protocol for blazing-fast, bidirectional messaging.

> Think of it as a lightweight, open chat room — join, say hi, and leave whenever you want.

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🔐 **Google Sign-In** | Secure OAuth via Firebase — no passwords needed |
| ⚡ **Real-time Messaging** | Instant delivery using WebSockets + STOMP |
| 👥 **Live Online Users** | See who's in the room, updated in real time |
| ✏️ **Custom Display Name** | Set your name after login before entering |
| 🚪 **Clean Logout** | Firebase sign-out clears session and redirects |
| 📱 **Responsive UI** | Works smoothly on desktop and mobile |

---

## 🏗️ How It Works

```
┌─────────────────────┐         ┌──────────────────────────┐
│                     │  HTTPS  │                          │
│   React Frontend    │ ──────► │   Spring Boot Backend    │
│   (Vercel)          │   WSS   │   (Railway)              │
│                     │ ◄─────► │                          │
└─────────────────────┘         └──────────────────────────┘
          │                                  │
          ▼                                  ▼
┌─────────────────────┐         ┌──────────────────────────┐
│   Firebase Auth     │         │   In-Memory              │
│   (Google OAuth)    │         │   Message Broker (STOMP) │
└─────────────────────┘         └──────────────────────────┘
```

### Flow
1. User visits the app → signs in with **Google via Firebase**
2. After login → sets a **custom display name**
3. Frontend connects to Spring Boot via **native WebSocket (STOMP)**
4. On join → backend adds user to the **online users list** and broadcasts to all clients
5. Messages go to `/app/sendMessage` → broadcast to all via `/topic/message`
6. On logout → backend removes the user and updates the online list for everyone

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Java 21 | Core language |
| Spring Boot 3 | Application framework |
| Spring WebSocket | WebSocket server |
| STOMP Protocol | Messaging protocol over WebSocket |
| SockJS | WebSocket fallback support |
| Lombok | Boilerplate reduction |
| Maven | Build tool |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite 7 | Build tool |
| TanStack Router | Client-side routing |
| @stomp/stompjs | STOMP WebSocket client |
| Firebase Auth | Google OAuth |
| Tailwind CSS v4 | Styling |

---

## 📡 WebSocket API Reference

| Destination | Direction | Description |
|-------------|-----------|-------------|
| `/app/sendMessage` | Client → Server | Send a chat message |
| `/app/join` | Client → Server | Announce user joined |
| `/app/leave` | Client → Server | Announce user left |
| `/topic/message` | Server → Client | Receive chat messages |
| `/topic/users` | Server → Client | Receive online users list |

---

## 📂 Project Structure

```
Sync_Talk/
├── backend/
│   └── chatApp/
│       ├── src/main/java/com/example/chatApp/
│       │   ├── config/
│       │   │   └── WebSocketConfig.java      # STOMP + WebSocket config
│       │   ├── controller/
│       │   │   └── ChatController.java       # Message handlers
│       │   └── model/
│       │       ├── ChatMessage.java          # Message model
│       │       └── UserTracker.java          # Online users tracker
│       └── Dockerfile
└── frontend_/
    └── dreamy-chat/
        └── src/
            ├── components/
            │   ├── auth/
            │   │   ├── LoginPage.tsx          # Google sign-in UI
            │   │   └── SetNamePage.tsx        # Name setup UI
            │   └── chat/
            │       ├── Sidebar.tsx            # Online users + nav
            │       ├── MessageList.tsx        # Chat messages display
            │       └── MessageInput.tsx       # Message composer
            ├── lib/
            │   ├── chat/
            │   │   ├── stomp-client.ts        # WebSocket/STOMP client
            │   │   └── use-chat.ts            # React hook for chat state
            │   └── firebase.ts               # Firebase setup + auth
            └── routes/
                ├── __root.tsx                 # App root + providers
                ├── index.tsx                  # Auth flow + routing
                └── chat.tsx                   # Chat room page
```

---

## 🔧 Running Locally

### Prerequisites
- Java 21+
- Node.js 18+
- Maven
- Firebase project with Google Auth enabled

### 1. Clone the repo
```bash
git clone https://github.com/Brightfringe/Sync_Talk.git
cd Sync_Talk
```

### 2. Start the Backend
```bash
cd backend/chatApp
./mvnw spring-boot:run
# Runs on http://localhost:8080
```

### 3. Start the Frontend
```bash
cd frontend_/dreamy-chat
cp .env.example .env
# Fill in your Firebase config and backend URL
npm install
npm run dev
# Runs on http://localhost:8081
```

### 4. Environment Variables
```env
VITE_BACKEND_URL=http://localhost:8080

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 🔑 Key Technical Decisions

### Native WebSocket over SockJS
SockJS depends on a Node.js `global` object that doesn't exist in modern Vite/browser environments, causing a `ReferenceError` at runtime. Switching to native WebSocket via `@stomp/stompjs` with `brokerURL` solved this cleanly — no polyfills needed.

### Firebase for Authentication
Firebase provides a simple, secure Google OAuth flow entirely on the frontend. This keeps the Spring Boot backend completely stateless — it never needs to manage users or sessions.

### TanStack Router over React Router
TanStack Router offers full TypeScript support with type-safe routes, which pairs well with the rest of the TypeScript-first stack.

---

## 🚧 Known Limitations

- Chat history is **not persisted** — messages are lost on server restart
- **Single chat room** — no private messaging or multiple rooms yet
- **In-memory user tracking** — resets on server restart

---

## 🔮 Roadmap

- [ ] PostgreSQL for message persistence
- [ ] Multiple chat rooms
- [ ] Private messaging
- [ ] Message reactions
- [ ] File and image sharing
- [ ] Typing indicators

---

## 👩‍💻 Author

<div align="center">

**Shubhangi Sharma**

[![GitHub](https://img.shields.io/badge/GitHub-Brightfringe-181717?style=for-the-badge&logo=github)](https://github.com/Brightfringe)

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>

</div>
