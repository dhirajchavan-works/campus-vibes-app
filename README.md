<div align="center">

# 🎓 CampusVibes

### The All-in-One Social Platform for College Students

[![License: MIT](https://img.shields.io/badge/License-MIT-7C3AED.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20+-6EE7B7.svg)](https://nodejs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-F59E0B.svg)](https://mysql.com)
[![Powered by Claude](https://img.shields.io/badge/AI-Claude%20Sonnet-A855F7.svg)](https://anthropic.com)

*Connect · Learn · Earn · Grow*

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Real-Time Features](#-real-time-features)
- [AI Integration](#-ai-integration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**CampusVibes** is a full-stack social media platform designed exclusively for college campus students. It combines a social feed, real-time chat, campus news, an academic marketplace, event calendar, and an AI-powered assistant — all in one responsive, mobile-friendly app.

> **Demo credentials:** `priya@pune.edu` / `demo123`

---

## ✨ Features

### 👥 Social Feed
- Create posts tagged as Events, News, Offers, or Problems
- Like, comment, save, and share posts
- Personalised feed ranked by relevance (college, branch, interests)
- Real-time post updates via WebSocket

### 📰 Campus News & Events
- Browse categorised campus news: Events, Programs, Offers, Problems, Announcements
- Interactive monthly calendar with RSVP for events
- College-specific filtering
- Featured news banner

### 💬 Real-Time Chat
- Direct messages between students
- Group chats for project teams / clubs
- Typing indicators and read receipts
- Online presence tracking
- Socket.io-powered — zero refresh needed

### 🛒 Marketplace (Earn from Knowledge)
- Sell lecture **notes**, solved **assignments**, **past exam papers**
- Free or paid listings with integrated download tracking
- Seller earnings dashboard
- Star ratings and reviews
- AI-powered search (full-text + semantic)

### 🔍 Explore People
- Search students by name, branch, or college
- Follow / unfollow
- Suggested connections based on college and branch match

### 🤖 AI Assistant (Claude-Powered)
- Contextual campus assistant that knows your branch, year, and interests
- Feed recommendations using interaction history analysis
- Smart multi-source search: users, posts, news, marketplace
- Automatic interest extraction from browsing behaviour

### ⚙️ Settings & Profile
- Edit profile: name, bio, college, branch
- Notification preferences
- Privacy controls
- Theme & appearance
- AI feed personalisation toggles

---

## 🛠 Tech Stack

| Layer       | Technology                             |
|-------------|----------------------------------------|
| **Frontend**| HTML5, CSS3, Vanilla JS (ES6+)         |
| **Backend** | Node.js 20, Express.js 4              |
| **Database**| MySQL 8.0                              |
| **Real-Time**| Socket.io 4                           |
| **AI**      | Anthropic Claude Sonnet (via API)      |
| **Auth**    | JWT (access + refresh tokens)          |
| **Upload**  | Multer (local disk / S3-ready)         |
| **Logging** | Winston                                |
| **DevOps**  | Docker, Docker Compose, Nginx          |

---

## 📁 Project Structure

```
campusvibes/
├── frontend/
│   ├── index.html                  # Main SPA (all pages)
│   └── assets/
│       ├── js/
│       │   ├── api.js              # REST API client
│       │   └── socket.js           # Socket.io client helper
│       ├── css/                    # (extend styles here)
│       └── img/
│
├── backend/
│   ├── server.js                   # Express + Socket.io entry point
│   ├── Dockerfile
│   ├── package.json
│   ├── .env.example
│   ├── config/
│   │   └── db.js                   # MySQL2 connection pool
│   ├── controllers/
│   │   ├── authController.js       # Register, login, JWT refresh
│   │   ├── postController.js       # CRUD posts, likes, comments
│   │   ├── userController.js       # Profiles, follow, search
│   │   ├── chatController.js       # Conversations & messages
│   │   ├── marketplaceController.js# Listings, purchases, earnings
│   │   ├── newsController.js       # Campus news CRUD
│   │   ├── eventController.js      # Events + RSVP
│   │   ├── notificationController.js
│   │   ├── feedController.js       # Personalised feed + trending
│   │   └── aiController.js         # Claude AI chat + recommendations
│   ├── routes/
│   │   ├── auth.js                 # POST /api/v1/auth/*
│   │   ├── posts.js                # GET/POST /api/v1/posts/*
│   │   ├── users.js                # GET /api/v1/users/*
│   │   ├── chat.js                 # GET/POST /api/v1/chat/*
│   │   ├── marketplace.js          # GET/POST /api/v1/marketplace/*
│   │   ├── news.js                 # GET /api/v1/news/*
│   │   ├── events.js               # GET/POST /api/v1/events/*
│   │   ├── notifications.js        # GET /api/v1/notifications/*
│   │   ├── feed.js                 # GET /api/v1/feed/*
│   │   └── ai.js                   # POST /api/v1/ai/*
│   ├── middleware/
│   │   ├── auth.js                 # JWT protect / restrict / optionalAuth
│   │   ├── upload.js               # Multer file uploads
│   │   └── validate.js             # express-validator error handler
│   └── utils/
│       ├── logger.js               # Winston logger
│       └── socketHandler.js        # Socket.io event handlers
│
├── database/
│   ├── schema.sql                  # Full MySQL schema + triggers
│   └── seeds/
│       └── seed_data.sql           # Realistic sample data
│
├── docs/
│   └── nginx.conf                  # Nginx reverse proxy config
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 20
- MySQL 8.0
- npm ≥ 9
- (Optional) Docker & Docker Compose

---

### Option A — Docker (Recommended, one command)

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/campusvibes.git
cd campusvibes

# 2. Create backend environment file
cp backend/.env.example backend/.env
# Edit backend/.env and set your ANTHROPIC_API_KEY

# 3. Start everything
docker compose up --build

# App will be available at:
#   Frontend  → http://localhost:3000
#   API       → http://localhost:5000
#   phpMyAdmin→ http://localhost:8080
```

---

### Option B — Manual Setup

#### 1. Clone & install

```bash
git clone https://github.com/yourusername/campusvibes.git
cd campusvibes/backend
npm install
```

#### 2. Configure environment

```bash
cp .env.example .env
# Open .env and fill in your MySQL credentials and Anthropic API key
```

#### 3. Set up the database

```bash
# Log in to MySQL
mysql -u root -p

# Run schema
mysql -u root -p < ../database/schema.sql

# Seed with sample data
mysql -u root -p campusvibes < ../database/seeds/seed_data.sql
```

#### 4. Start the backend

```bash
npm run dev    # Development (nodemon)
# or
npm start      # Production
```

#### 5. Open the frontend

Open `frontend/index.html` directly in a browser, or serve it with any static server:

```bash
# Python (simplest)
cd frontend && python3 -m http.server 3000

# OR npx serve
npx serve frontend -p 3000
```

> **Note:** The frontend uses `localStorage` for the demo mode and can also connect to the live backend by setting `window.CV_API_URL` before loading `api.js`.

---

## 🔐 Environment Variables

All variables are in `backend/.env` (copy from `.env.example`):

| Variable                | Required | Description                            |
|-------------------------|----------|----------------------------------------|
| `DB_HOST`               | ✅        | MySQL host (default: `localhost`)       |
| `DB_NAME`               | ✅        | Database name (`campusvibes`)           |
| `DB_USER`               | ✅        | MySQL username                         |
| `DB_PASSWORD`           | ✅        | MySQL password                         |
| `JWT_SECRET`            | ✅        | Secret for access tokens (min 32 chars)|
| `JWT_REFRESH_SECRET`    | ✅        | Secret for refresh tokens              |
| `ANTHROPIC_API_KEY`     | ✅        | Your Claude API key from console.anthropic.com |
| `PORT`                  | ❌        | API port (default: `5000`)             |
| `BCRYPT_SALT_ROUNDS`    | ❌        | Password hashing rounds (default: `12`)|
| `MAX_FILE_SIZE_MB`      | ❌        | Upload limit in MB (default: `10`)     |
| `SMTP_*`                | ❌        | Email credentials for notifications    |

---

## 📡 API Reference

All endpoints are prefixed with `/api/v1`. Protected routes require `Authorization: Bearer <token>`.

### Auth
| Method | Endpoint              | Auth | Description            |
|--------|-----------------------|------|------------------------|
| POST   | `/auth/register`      | ❌    | Create account         |
| POST   | `/auth/login`         | ❌    | Login → get JWT        |
| POST   | `/auth/logout`        | ✅    | Invalidate session     |
| POST   | `/auth/refresh-token` | ❌    | Refresh access token   |
| GET    | `/auth/me`            | ✅    | Get current user       |

### Posts
| Method | Endpoint                  | Auth | Description              |
|--------|---------------------------|------|--------------------------|
| GET    | `/posts`                  | ❌    | List posts (filterable)  |
| POST   | `/posts`                  | ✅    | Create post              |
| GET    | `/posts/:id`              | ❌    | Get single post          |
| PUT    | `/posts/:id`              | ✅    | Update post              |
| DELETE | `/posts/:id`              | ✅    | Delete post              |
| POST   | `/posts/:id/like`         | ✅    | Toggle like              |
| POST   | `/posts/:id/save`         | ✅    | Toggle save              |
| GET    | `/posts/:id/comments`     | ❌    | Get comments             |
| POST   | `/posts/:id/comments`     | ✅    | Add comment              |

### Users
| Method | Endpoint              | Auth | Description             |
|--------|-----------------------|------|-------------------------|
| GET    | `/users/search`       | ❌    | Search students         |
| GET    | `/users/suggested`    | ✅    | Suggested connections   |
| GET    | `/users/:identifier`  | ❌    | Get profile             |
| PUT    | `/users/me/profile`   | ✅    | Update my profile       |
| POST   | `/users/:id/follow`   | ✅    | Toggle follow           |
| GET    | `/users/:id/posts`    | ❌    | User's posts            |

### Marketplace
| Method | Endpoint                       | Auth | Description            |
|--------|--------------------------------|------|------------------------|
| GET    | `/marketplace`                 | ❌    | List items             |
| POST   | `/marketplace`                 | ✅    | Create listing         |
| GET    | `/marketplace/earnings`        | ✅    | Seller earnings        |
| POST   | `/marketplace/:id/purchase`    | ✅    | Purchase / download    |
| POST   | `/marketplace/:id/rate`        | ✅    | Rate item              |

### AI
| Method | Endpoint                   | Auth | Description                    |
|--------|----------------------------|------|--------------------------------|
| POST   | `/ai/chat`                 | ✅    | Campus AI assistant            |
| GET    | `/ai/recommendations`      | ✅    | AI-ranked feed suggestions     |
| POST   | `/ai/analyse-interests`    | ✅    | Extract interests from history |
| GET    | `/ai/search?q=`            | ✅    | Smart multi-source search      |

---

## 🗄 Database Schema

The MySQL schema includes **16 tables** with full referential integrity, indexes, and auto-update triggers:

| Table                    | Purpose                                      |
|--------------------------|----------------------------------------------|
| `users`                  | Accounts, profiles, counters                 |
| `sessions`               | JWT refresh token tracking                   |
| `posts`                  | Social feed posts with media                 |
| `comments`               | Threaded comments on posts                   |
| `likes`                  | Post and comment likes                       |
| `saves`                  | Saved/bookmarked posts                       |
| `followers`              | Follow graph                                 |
| `campus_news`            | Official college news and announcements      |
| `events`                 | Campus events with RSVP                      |
| `event_registrations`    | User event signups and waitlists             |
| `conversations`          | Direct and group chat threads                |
| `conversation_members`   | Chat participants with roles                 |
| `messages`               | Individual messages with read receipts       |
| `marketplace`            | Notes, assignments, and papers listings      |
| `marketplace_purchases`  | Transaction records                          |
| `marketplace_ratings`    | Item reviews and star ratings                |
| `notifications`          | In-app notification feed                     |
| `feed_interactions`      | View/like/skip tracking for AI               |
| `user_interests`         | AI-extracted interest weights                |
| `reports`                | Content moderation reports                   |
| `password_resets`        | Secure password reset tokens                 |

**Triggers** automatically maintain `likes_count`, `comments_count`, `followers_count`, `following_count`, and `posts_count` on every insert/delete — no manual counter updates needed.

---

## ⚡ Real-Time Features (Socket.io)

| Event (Client → Server)   | Description                        |
|---------------------------|------------------------------------|
| `join_conversation`       | Subscribe to a chat room           |
| `leave_conversation`      | Unsubscribe from chat room         |
| `join_post`               | Subscribe to live comments         |
| `typing_start`            | Broadcast typing indicator         |
| `typing_stop`             | Stop typing indicator              |
| `messages_read`           | Mark messages as read              |

| Event (Server → Client)   | Description                        |
|---------------------------|------------------------------------|
| `new_post`                | Live feed update                   |
| `new_message`             | Incoming chat message              |
| `new_comment`             | Live comment on a post             |
| `notification`            | In-app notification                |
| `user_online`             | Presence status change             |
| `user_typing`             | Typing indicator                   |
| `messages_read_by`        | Read receipt confirmation          |

---

## 🤖 AI Integration

CampusVibes uses **Anthropic Claude Sonnet** for three AI features:

### 1. Campus AI Assistant (`POST /ai/chat`)
Contextual multi-turn chat that knows the student's name, college, branch, year, and interests. Helps with study materials, events, placements, and campus life.

### 2. Feed Recommendations (`GET /ai/recommendations`)
- Fetches the student's recent interactions and interests from the database
- Sends candidate posts to Claude with user context
- Claude returns a ranked list of post IDs by relevance
- Falls back to engagement-based ranking if AI is unavailable

### 3. Interest Analysis (`POST /ai/analyse-interests`)
- Reads the last 50 feed interactions from the database
- Claude extracts topic interests with confidence weights
- Results are upserted to `user_interests` table
- Drives future feed personalisation automatically

---

## 🚢 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production` in `.env`
- [ ] Use a strong random `JWT_SECRET` (≥ 64 chars)
- [ ] Enable HTTPS (SSL certificate via Let's Encrypt)
- [ ] Set `CORS_ORIGINS` to your actual frontend domain
- [ ] Configure `SMTP_*` for real email notifications
- [ ] Move file uploads to AWS S3 or Cloudflare R2
- [ ] Set up MySQL backups (automated daily dumps)
- [ ] Add a process manager: `pm2 start server.js --name campusvibes`
- [ ] Configure Nginx as a reverse proxy (see `docs/nginx.conf`)
- [ ] Set up log rotation for Winston log files

### Quick Production Deploy (VPS)

```bash
# On your server
git clone https://github.com/yourusername/campusvibes.git
cd campusvibes/backend
npm ci --omit=dev
cp .env.example .env && nano .env   # fill in production values

# Start with PM2
npm install -g pm2
pm2 start server.js --name campusvibes
pm2 save && pm2 startup

# Nginx
sudo cp docs/nginx.conf /etc/nginx/sites-available/campusvibes
sudo ln -s /etc/nginx/sites-available/campusvibes /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

### Commit Convention
We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation changes
- `style:` — formatting, no logic change
- `refactor:` — code restructuring
- `test:` — adding tests
- `chore:` — build process, deps

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ for college students everywhere

**CampusVibes** — *Your entire college community, one platform*

</div>
