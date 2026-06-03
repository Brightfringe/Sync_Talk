# SyncTalk 💬
### Real-time chat application with Google Authentication

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green)
![React](https://img.shields.io/badge/React-18-blue)
![Firebase](https://img.shields.io/badge/Firebase-Auth-yellow)

A full-stack real-time chat application where users can sign in with Google, set a display name, and instantly chat with everyone in the room. Built with a Spring Boot WebSocket backend and a React frontend.

---

## ✨ Features

- 🔐 **Google Authentication** — Sign in securely with your Google account via Firebase
- 💬 **Real-time messaging** — Instant message delivery using WebSockets and STOMP protocol
- 👥 **Online users list** — See who's currently in the chat room in real time
- ✏️ **Custom display name** — Edit your name after login before entering the chat
- 🚪 **Proper logout** — Firebase sign-out clears session and redirects to login
- 📱 **Responsive design** — Works on desktop and mobile

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
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| TanStack Router | Client-side routing |
| @stomp/stompjs | STOMP client for WebSocket |
| Firebase Auth | Google authentication |
| Tailwind CSS | Styling |

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌──────────────────────┐
│                 │  HTTPS  │                      │
│  React Frontend │ ──────► │  Spring Boot Backend │
│  (Vercel)       │   WSS   │  (Railway)           │
│                 │ ◄─────► │                      │
└─────────────────┘         └──────────────────────┘
        │                              │
        ▼                              ▼
┌─────────────────┐         ┌──────────────────────┐
│  Firebase Auth  │         │  In-Memory           │
│  (Google OAuth) │         │  Message Broker      │
└─────────────────┘         └──────────────────────┘
```

### How it works
1. User visits the app and signs in with Google via Firebase Authentication
2. After login, user sets or edits their display name
3. Frontend connects to Spring Boot backend via WebSocket (STOMP over native WebSocket)
4. On join, backend adds user to the online users list and broadcasts it to all clients
5. Messages are published to `/app/sendMessage` and broadcast to all subscribers on `/topic/message`
6. When user leaves/logs out, backend removes them from the online list and broadcasts the update

---

## 🔧 Running Locally

### Prerequisites
- Java 21+
- Node.js 18+
- Maven
- Firebase project with Google Auth enabled

### Backend
```bash
cd backend/chatApp
./mvnw spring-boot:run
# Runs on http://localhost:8080
```

### Frontend
```bash
cd frontend_/dreamy-chat
cp .env.example .env
# Fill in your Firebase config and backend URL in .env
npm install
npm run dev
# Runs on http://localhost:8081
```

### Environment Variables (Frontend)
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

## 📡 WebSocket API

| Destination | Direction | Description |
|-------------|-----------|-------------|
| `/app/sendMessage` | Client → Server | Send a chat message |
| `/app/join` | Client → Server | Announce user joined |
| `/app/leave` | Client → Server | Announce user left |
| `/topic/message` | Server → Client | Receive chat messages |
| `/topic/users` | Server → Client | Receive online users list |

---

## 🔑 Key Technical Decisions

### Why native WebSocket instead of SockJS?
SockJS uses a Node.js global (`global`) that is not available in modern Vite/browser environments, causing a `ReferenceError` at runtime. Switching to native WebSocket via `@stomp/stompjs` with `brokerURL` resolved this without any polyfills.

### Why Firebase for Auth?
Firebase provides a simple, secure OAuth flow with Google that requires no backend user management. The frontend handles authentication entirely client-side, keeping the Spring Boot backend stateless.

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
            │   │   └── SetNamePage.tsx        # Name edit UI
            │   └── chat/
            │       ├── Sidebar.tsx            # Online users + nav
            │       ├── MessageList.tsx        # Chat messages
            │       └── MessageInput.tsx       # Message composer
            ├── lib/
            │   ├── chat/
            │   │   ├── stomp-client.ts        # WebSocket/STOMP client
            │   │   └── use-chat.ts            # React hook for chat
            │   └── firebase.ts               # Firebase setup + auth
            └── routes/
                ├── index.tsx                  # Auth flow + routing
                └── chat.tsx                   # Chat room page
```

---

## 🚧 Known Limitations

- Chat history is not persisted — messages are lost on server restart
- Single chat room — no private messaging or multiple rooms
- In-memory user tracking — resets on server restart

## 🔮 Future Improvements

- [ ] Add database (PostgreSQL) for message persistence
- [ ] Multiple chat rooms
- [ ] Private messaging
- [ ] Message reactions
- [ ] File/image sharing

---

## 👩‍💻 Author

**Shubhangi Sharma**  
[GitHub](https://github.com/Brightfringe)
