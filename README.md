<div align="center">

# 🔄 SyncTalk

### *Real-time chat. No delays. No refresh. Just talk.*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-sync--talk--olive.vercel.app-6C63FF?style=for-the-badge&logoColor=white)](https://sync-talk-olive.vercel.app)
[![Backend](https://img.shields.io/badge/⚙️_Backend-railway.app-0B0D0E?style=for-the-badge&logoColor=white)](https://synctalk-production-8eba.up.railway.app)
[![GitHub](https://img.shields.io/badge/GitHub-Brightfringe-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Brightfringe/Sync_Talk)

<br/>

![Java](https://img.shields.io/badge/Java_21-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot_4-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=flat-square&logo=railway&logoColor=white)

<br/>

```
 ______     __  __     __   __     ______     ______   ______     __         __  __    
/\  ___\   /\ \_\ \   /\ "-.\ \   /\  ___\   /\__  _\ /\  __ \   /\ \       /\ \/ /   
\ \___  \  \ \____ \  \ \ \-.  \  \ \ \____  \/_/\ \/ \ \  __ \  \ \ \____  \ \  _"-.  
 \/\_____\  \/\_____\  \ \_\\"\_\  \ \_____\    \ \_\  \ \_\ \_\  \ \_____\  \ \_\ \_\ 
  \/_____/   \/_____/   \/_/ \/_/   \/_____/     \/_/   \/_/\/_/   \/_____/   \/_/\/_/ 
```

> **Sign in. Set your name. Start talking. Everyone's here.**

</div>

---

## 💡 What is SyncTalk?

SyncTalk is a **full-stack real-time chat application** where users sign in with Google, pick a display name, and instantly start chatting with everyone in the room — no refresh needed, no delays.

It's built on a **Spring Boot WebSocket backend** and a **React + TypeScript frontend**, communicating over the **STOMP protocol** for blazing-fast, bidirectional messaging. Messages are now **persisted in PostgreSQL** so your chat history is never lost.

Think of it as a lightweight, open chat room — join, say hi, and leave whenever you want.

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| 🔐 | **Google Sign-In** | Secure OAuth via Firebase — no passwords needed |
| ⚡ | **Real-time Messaging** | Instant delivery using WebSockets + STOMP |
| 💾 | **Message Persistence** | All messages saved to PostgreSQL — survive server restarts |
| 📜 | **Chat History** | Last 50 messages load automatically when you join |
| 🔔 | **Join/Leave Notifications** | See when someone joins or leaves the chat room |
| 👥 | **Live Online Users** | See who's in the room, updated in real time |
| ✏️ | **Custom Display Name** | Set your name after login before entering |
| 🚪 | **Clean Logout** | Firebase sign-out clears session and redirects |
| 📱 | **Responsive UI** | Works smoothly on desktop and mobile |

---

## 🏗️ How It Works

```
┌─────────────────────────┐         ┌──────────────────────────────┐
│                         │  HTTPS  │                              │
│    React Frontend       │ ──────► │    Spring Boot Backend       │
│    (Vercel)             │   WSS   │    (Railway)                 │
│                         │ ◄─────► │                              │
└─────────────────────────┘         └──────────────────────────────┘
           │                                       │
           ▼                                       ▼
┌─────────────────────────┐         ┌──────────────────────────────┐
│    Firebase Auth        │         │    PostgreSQL Database       │
│    (Google OAuth)       │         │    (Railway)                 │
└─────────────────────────┘         └──────────────────────────────┘
```

### 🔄 Request Flow

```
1. User visits app  ──►  Signs in with Google via Firebase
2. After login      ──►  Sets a custom display name
3. On page load     ──►  Frontend fetches last 50 messages from /api/messages/history
4. Connection       ──►  Frontend connects to Spring Boot via WebSocket (STOMP)
5. On join          ──►  Backend saves JOIN event → broadcasts "X joined the chat room"
6. On message       ──►  Saved to PostgreSQL → broadcast to all via /topic/message
7. On logout        ──►  Backend saves LEAVE event → broadcasts "X left the chat room"
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| ![Java](https://img.shields.io/badge/-Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white) | 21 | Core language |
| ![Spring Boot](https://img.shields.io/badge/-Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white) | 4.0 | Application framework |
| ![Spring WebSocket](https://img.shields.io/badge/-Spring_WebSocket-6DB33F?style=flat-square&logo=spring&logoColor=white) | - | WebSocket server |
| ![Spring Data JPA](https://img.shields.io/badge/-Spring_Data_JPA-6DB33F?style=flat-square&logo=spring&logoColor=white) | - | Database ORM |
| ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white) | 17 | Persistent message storage |
| ![Hibernate](https://img.shields.io/badge/-Hibernate-59666C?style=flat-square&logo=hibernate&logoColor=white) | 7.2 | ORM / schema auto-generation |
| STOMP Protocol | - | Messaging protocol over WebSocket |
| SockJS | - | WebSocket fallback support |
| Lombok | - | Boilerplate reduction |
| Maven | - | Build tool |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| ![React](https://img.shields.io/badge/-React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | 19 | UI framework |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | - | Type safety |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | 7 | Build tool |
| ![TailwindCSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) | v4 | Styling |
| ![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black) | - | Google OAuth |
| TanStack Router | - | Client-side routing |
| @stomp/stompjs | - | STOMP WebSocket client |

---

## 📡 API Reference

### WebSocket Endpoints (STOMP)
| Destination | Direction | Description |
|---|---|---|
| `/app/sendMessage` | Client → Server | Send a chat message (saved to DB) |
| `/app/join` | Client → Server | Announce user joined (saved to DB) |
| `/app/leave` | Client → Server | Announce user left |
| `/topic/message` | Server → Client | Receive chat messages + join/leave events |
| `/topic/users` | Server → Client | Receive online users list |

### REST Endpoints
| Endpoint | Method | Description |
|---|---|---|
| `/api/messages/history` | `GET` | Returns last 50 messages from PostgreSQL |

---

## 🗃️ Database Schema

```sql
CREATE TABLE messages (
    id       BIGSERIAL PRIMARY KEY,
    sender   VARCHAR(255),
    content  TEXT,
    type     VARCHAR(10),   -- 'CHAT', 'JOIN', 'LEAVE'
    sent_at  TIMESTAMP
);
```

---

## 📂 Project Structure

```
Sync_Talk/
├── backend/
│   └── chatApp/
│       ├── src/main/java/com/example/chatApp/
│       │   ├── config/
│       │   │   └── WebSocketConfig.java       # STOMP + WebSocket config
│       │   ├── controller/
│       │   │   └── ChatController.java        # Message handlers + /api/messages/history
│       │   ├── model/
│       │   │   ├── ChatMessage.java           # JPA Entity — maps to messages table
│       │   │   └── UserTracker.java           # In-memory online users tracker
│       │   ├── repository/
│       │   │   └── MessageRepository.java     # JPA repository (findTop50ByOrderBySentAtAsc)
│       │   └── service/
│       │       └── MessageService.java        # Save messages + fetch history
│       └── Dockerfile
└── frontend_/
    └── dreamy-chat/
        └── src/
            ├── components/
            │   ├── auth/
            │   │   ├── LoginPage.tsx           # Google sign-in UI
            │   │   └── SetNamePage.tsx         # Name setup UI
            │   └── chat/
            │       ├── Sidebar.tsx             # Online users + nav
            │       ├── MessageList.tsx         # Chat bubbles + join/leave notices
            │       └── MessageInput.tsx        # Message composer
            ├── lib/
            │   ├── chat/
            │   │   ├── stomp-client.ts         # WebSocket/STOMP client
            │   │   └── use-chat.ts             # Chat state hook + history fetching
            │   └── firebase.ts                # Firebase setup + auth
            └── routes/
                ├── __root.tsx                  # App root + providers
                ├── index.tsx                   # Auth flow + routing
                └── chat.tsx                    # Chat room page
```

---

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
# Hibernate auto-creates the messages table on first run
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

**Backend** — `src/main/resources/application.properties`:
```properties
spring.datasource.url=${SPRING_DATASOURCE_URL:jdbc:postgresql://localhost:5432/synctalk_db}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME:postgres}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD:yourpassword}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.open-in-view=false
```

**Frontend** — `.env`:
```env
VITE_BACKEND_URL=http://localhost:8080
VITE_SOCKET_URL=http://localhost:8080/chat

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 🔑 Key Technical Decisions

### 💾 PostgreSQL for Message Persistence
Messages are saved to PostgreSQL on every send using Spring Data JPA. When a user joins, the frontend fetches the last 50 messages via `/api/messages/history` before connecting to the WebSocket — so chat history loads instantly. JOIN and LEAVE events are also persisted with their message type.

### 🔌 Native WebSocket over SockJS
SockJS depends on a Node.js global object that doesn't exist in modern Vite/browser environments, causing a `ReferenceError` at runtime. Switching to native WebSocket via `@stomp/stompjs` with `brokerURL` solved this cleanly — no polyfills needed.

### 🔐 Firebase for Authentication
Firebase provides a simple, secure Google OAuth flow entirely on the frontend. This keeps the Spring Boot backend completely stateless — it never needs to manage users or sessions. User identity (display name) is passed with each message payload.

### 🗺️ TanStack Router over React Router
TanStack Router offers full TypeScript support with type-safe routes, which pairs well with the rest of the TypeScript-first stack.

### 🔔 JOIN/LEAVE as System Notifications
Join and leave events are persisted to the database with `type: JOIN` or `type: LEAVE` and rendered as centered system notices in the UI (e.g. *"Shubhangi joined the chat room"*) — keeping them visually distinct from regular chat messages.

---

## 🚧 Known Limitations

- Single chat room — no private messaging or multiple rooms yet
- In-memory user tracking — online user list resets on server restart
- Last 50 messages only — older history not paginated yet

---

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

---

## 👩‍💻 Author

<div align="center">

**Shubhangi Sharma**

[![GitHub](https://img.shields.io/badge/GitHub-Brightfringe-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Brightfringe)
[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-SyncTalk-6C63FF?style=for-the-badge)](https://sync-talk-olive.vercel.app)

</div>
