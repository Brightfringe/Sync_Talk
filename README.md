# SyncTalk

Live Demo


Java Spring Boot React TypeScript Firebase TailwindCSS PostgreSQL Vercel

## 💡 What is SyncTalk?
SyncTalk is a full-stack real-time chat application where users sign in with Google, pick a display name, and instantly start chatting with everyone in the room — no refresh needed, no delays.

It's built on a Spring Boot WebSocket backend and a React + TypeScript frontend, communicating over the STOMP protocol for blazing-fast, bidirectional messaging.

Think of it as a lightweight, open chat room — join, say hi, and leave whenever you want.

## ✨ Features
| Feature | Description |
|---|---|
| 🔐 Google Sign-In | Secure OAuth via Firebase — no passwords needed |
| ⚡ Real-time Messaging | Instant delivery using WebSockets + STOMP |
| 👥 Live Online Users | See who's in the room, updated in real time |
| ✏️ Custom Display Name | Set your name after login before entering |
| 🚪 Clean Logout | Firebase sign-out clears session and redirects |
| 📱 Responsive UI | Works smoothly on desktop and mobile |
| 💾 Message Persistence | Chat history saved to PostgreSQL — survives server restarts |
| 📜 Chat History | Last 50 messages load automatically when you join |
| 🔔 Join/Leave Notifications | See when someone joins or leaves the chat room |

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
│   Firebase Auth     │         │   PostgreSQL Database    │
│   (Google OAuth)    │         │   (Railway)              │
└─────────────────────┘         └──────────────────────────┘
```

### Flow
1. User visits the app → signs in with Google via Firebase
2. After login → sets a custom display name
3. Frontend fetches last 50 messages from `/api/messages/history`
4. Frontend connects to Spring Boot via WebSocket (STOMP)
5. On join → backend saves JOIN event to DB, broadcasts "X joined the chat room" to all clients
6. Messages go to `/app/sendMessage` → saved to PostgreSQL → broadcast to all via `/topic/message`
7. On logout → backend saves LEAVE event, broadcasts "X left the chat room" and updates the online list for everyone

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Java 21 | Core language |
| Spring Boot 4 | Application framework |
| Spring WebSocket | WebSocket server |
| Spring Data JPA | Database ORM |
| STOMP Protocol | Messaging protocol over WebSocket |
| SockJS | WebSocket fallback support |
| PostgreSQL | Persistent message storage |
| Hibernate | ORM / schema auto-generation |
| Lombok | Boilerplate reduction |
| Maven | Build tool |

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite 7 | Build tool |
| TanStack Router | Client-side routing |
| @stomp/stompjs | STOMP WebSocket client |
| Firebase Auth | Google OAuth |
| Tailwind CSS v4 | Styling |

## 📡 WebSocket API Reference
| Destination | Direction | Description |
|---|---|---|
| `/app/sendMessage` | Client → Server | Send a chat message (saved to DB) |
| `/app/join` | Client → Server | Announce user joined (saved to DB) |
| `/app/leave` | Client → Server | Announce user left |
| `/topic/message` | Server → Client | Receive chat messages + join/leave events |
| `/topic/users` | Server → Client | Receive online users list |

## 🗄️ REST API Reference
| Endpoint | Method | Description |
|---|---|---|
| `/api/messages/history` | GET | Returns last 50 messages from PostgreSQL |

## 🗃️ Database Schema
```
messages
├── id         BIGSERIAL PRIMARY KEY
├── sender     VARCHAR(255)
├── content    TEXT
├── type       VARCHAR(10)  -- 'CHAT', 'JOIN', 'LEAVE'
└── sent_at    TIMESTAMP
```

## 📂 Project Structure
```
Sync_Talk/
├── backend/
│   └── chatApp/
│       ├── src/main/java/com/example/chatApp/
│       │   ├── config/
│       │   │   └── WebSocketConfig.java      # STOMP + WebSocket config
│       │   ├── controller/
│       │   │   └── ChatController.java       # Message handlers + history endpoint
│       │   ├── model/
│       │   │   ├── ChatMessage.java          # Message entity (JPA)
│       │   │   └── UserTracker.java          # Online users tracker
│       │   ├── repository/
│       │   │   └── MessageRepository.java    # JPA repository for messages
│       │   └── service/
│       │       └── MessageService.java       # Business logic for saving/fetching messages
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
            │       ├── MessageList.tsx        # Chat messages + join/leave notifications
            │       └── MessageInput.tsx       # Message composer
            ├── lib/
            │   ├── chat/
            │   │   ├── stomp-client.ts        # WebSocket/STOMP client
            │   │   └── use-chat.ts            # React hook for chat state + history loading
            │   └── firebase.ts               # Firebase setup + auth
            └── routes/
                ├── __root.tsx                 # App root + providers
                ├── index.tsx                  # Auth flow + routing
                └── chat.tsx                   # Chat room page
```

## 🔧 Running Locally

### Prerequisites
- Java 21+
- Node.js 18+
- Maven
- PostgreSQL installed and running
- Firebase project with Google Auth enabled

### 1. Clone the repo
```bash
git clone https://github.com/Brightfringe/Sync_Talk.git
cd Sync_Talk
```

### 2. Create the database
```sql
CREATE DATABASE synctalk_db;
```

### 3. Start the Backend
```bash
cd backend/chatApp
./mvnw spring-boot:run
# Runs on http://localhost:8080
# Tables are auto-created by Hibernate on first run
```

### 4. Start the Frontend
```bash
cd frontend_/dreamy-chat
cp .env.example .env
# Fill in your Firebase config and backend URL
npm install
npm run dev
# Runs on http://localhost:8081
```

### 5. Environment Variables

**Backend** (`application.properties`):
```properties
spring.datasource.url=${SPRING_DATASOURCE_URL:jdbc:postgresql://localhost:5432/synctalk_db}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME:postgres}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD:yourpassword}
spring.jpa.hibernate.ddl-auto=update
```

**Frontend** (`.env`):
```
VITE_BACKEND_URL=http://localhost:8080
VITE_SOCKET_URL=http://localhost:8080/chat

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🔑 Key Technical Decisions

### PostgreSQL for Message Persistence
Messages are now saved to a PostgreSQL database on every send. When a user joins, the frontend fetches the last 50 messages via a REST endpoint (`/api/messages/history`) before connecting to the WebSocket — so chat history loads instantly without waiting for new messages.

### Native WebSocket over SockJS
SockJS depends on a Node.js global object that doesn't exist in modern Vite/browser environments, causing a `ReferenceError` at runtime. Switching to native WebSocket via `@stomp/stompjs` with `brokerURL` solved this cleanly — no polyfills needed.

### Firebase for Authentication
Firebase provides a simple, secure Google OAuth flow entirely on the frontend. This keeps the Spring Boot backend completely stateless — it never needs to manage users or sessions. User identity (display name) is passed with each message.

### TanStack Router over React Router
TanStack Router offers full TypeScript support with type-safe routes, which pairs well with the rest of the TypeScript-first stack.

### JOIN/LEAVE as System Notifications
Join and leave events are saved to the database with `type: JOIN/LEAVE` and displayed as centered system notices (e.g. "Shubhangi joined the chat room") rather than as chat bubbles — keeping the UI clean and distinct from real messages.

## 🚧 Known Limitations
- Single chat room — no private messaging or multiple rooms yet
- In-memory user tracking — online user list resets on server restart
- Last 50 messages loaded on join — older history not paginated yet

## 🔮 Roadmap
- [x] PostgreSQL for message persistence
- [x] Chat history loading on join
- [x] Join/Leave notifications
- [ ] Multiple chat rooms
- [ ] Private messaging
- [ ] Message reactions
- [ ] File and image sharing
- [ ] Typing indicators
- [ ] Pagination for older messages

## 👩‍💻 Author
**Shubhangi Sharma**

GitHub
