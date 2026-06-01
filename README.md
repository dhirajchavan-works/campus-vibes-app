# 🎓 CampusVibes — Live Server

Real-time college social platform with instant post broadcasting.

## 🔑 Login Credentials

| Role    | Email                     | Password   |
|---------|---------------------------|------------|
| Admin   | admin@campusvibes.com     | **admin123** |
| Student | priya@pune.edu            | demo123    |
| Student | rahul@iit.edu             | demo123    |
| Student | aisha@vit.edu             | demo123    |
| Student | dev@mit.edu               | demo123    |
| Student | neha@spit.edu             | demo123    |

> ⚠️ Admin is the ONLY user who can see the **DB Schema** button in sidebar.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the server
node server.js

# 3. Open in browser
open http://localhost:3000
```

---

## ⚡ Real-time Features

| Feature | How it works |
|---------|-------------|
| **New post** | Instantly appears on ALL connected browsers |
| **Live post count** | Updates in topbar as users connect |
| **Online counter** | Shows how many users are online right now |
| **Chat messages** | Delivered via Socket.io to conversation room |
| **Typing indicator** | Shown to other chat participants |
| **Like counts** | Sync across sessions in real-time |

---

## 📡 API Endpoints

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | /api/login | ❌ | Login → get token |
| POST | /api/register | ❌ | Register new user |
| GET | /api/posts | ❌ | All posts (newest first) |
| POST | /api/posts | ✅ | Create post (broadcasts live) |
| POST | /api/posts/:id/like | ✅ | Like a post |
| GET | /api/online | ❌ | Online user count |
| GET | /health | ❌ | Server health check |

---

## 🌐 Deploy to Production (free options)

### Render.com (easiest — free tier)
```bash
# 1. Push to GitHub
git init && git add . && git commit -m "CampusVibes"
git remote add origin https://github.com/YOUR_USERNAME/campusvibes
git push -u origin main

# 2. Go to render.com → New Web Service → connect GitHub repo
# 3. Build command: npm install
# 4. Start command: node server.js
# 5. Your URL: https://campusvibes.onrender.com
```

### Railway.app
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Fly.io
```bash
npm install -g flyctl
fly auth login
fly launch
fly deploy
```

---

## 🔧 Environment Variables (for deployment)

```env
PORT=3000
NODE_ENV=production
```

---

## 📁 File Structure

```
campusvibes-server/
├── server.js          ← Express + Socket.io live server
├── package.json
├── README.md
└── public/
    └── index.html     ← Complete single-file frontend
```
