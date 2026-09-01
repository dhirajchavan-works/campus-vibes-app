/**
 * CampusVibes Live Server
 * Real-time posts, chat, notifications via Socket.io
 * Admin: admin@campusvibes.com / admin123
 */

const express = require('express');
const http    = require('http');
const { Server } = require('socket.io');
const cors    = require('cors');
const path    = require('path');
const crypto  = require('crypto');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server, {
  cors: { origin: '*', methods: ['GET','POST'] }
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ══════════════════════════════════════════════
//  IN-MEMORY DATABASE
// ══════════════════════════════════════════════
const DB = {
  users: [
    { id:1, name:'Chavan Dhiraj',  email:'chavandhiraj.edu',             password:hash('dhiraj@14'),  role:'student', college:'Pune University', year:'3', branch:'Computer Science',       ini:'PS' },
    { id:2, name:'Rahul Mehta',   email:'rahul@iit.edu',              password:hash('demo123'),  role:'student', college:'IIT Bombay',       year:'2', branch:'Mechanical Engineering', ini:'RM' },
    { id:3, name:'Aisha Khan',    email:'aisha@vit.edu',              password:hash('demo123'),  role:'student', college:'VIT Pune',         year:'4', branch:'Electronics',            ini:'AK' },
    { id:4, name:'Dev Patel',     email:'dev@mit.edu',                password:hash('demo123'),  role:'student', college:'MIT Manipal',      year:'1', branch:'Information Technology', ini:'DP' },
    { id:5, name:'Neha Gupta',    email:'neha@spit.edu',              password:hash('demo123'),  role:'student', college:'SPIT Mumbai',      year:'3', branch:'Civil Engineering',      ini:'NG' },
    { id:6, name:'CampusVibes Admin', email:'admin@campusvibes.com',  password:hash('admin123'), role:'admin',   college:'CampusVibes HQ',  year:null, branch:null,                   ini:'AD' },
  ],
  posts: [
    { id:101, uid:2, content:'🚨 Placement portal is now OPEN for 2025 batch! Deadline: May 30th. Mandatory aptitude workshop this Friday 10AM — Seminar Hall 3.', tag:'event',        likes:89,  liked:false, comments:23, time:'2 hours ago',  ts: Date.now()-7200000  },
    { id:102, uid:3, content:'Canteen is offering 20% off on all combo meals this week! Also added 3 new vegetarian items. Valid till Sunday only 🍱',               tag:'offer',        likes:142, liked:false, comments:31, time:'4 hours ago',  ts: Date.now()-14400000 },
    { id:103, uid:1, content:'CS Dept hackathon next weekend (June 1–2). Theme: "Tech for Social Good". Prize pool: ₹50,000! Teams of 3–4. Register fast! 💻🔥',  tag:'event',        likes:234, liked:false, comments:67, time:'6 hours ago',  ts: Date.now()-21600000 },
    { id:104, uid:5, content:'Library WiFi has been down since yesterday and IT has not responded. This is affecting assignments. Can someone escalate? 😤',          tag:'problem',      likes:78,  liked:false, comments:45, time:'8 hours ago',  ts: Date.now()-28800000 },
    { id:105, uid:2, content:'Final exam timetable for even semester is OUT! Check the official student portal. Exams start June 10th. Good luck! 📚✊',             tag:'announcement', likes:312, liked:false, comments:88, time:'1 day ago',    ts: Date.now()-86400000 },
  ],
  onlineUsers: new Set(),
  sessions: {}
};

function hash(pw){ return crypto.createHash('sha256').update(pw).digest('hex'); }
function genToken(){ return crypto.randomBytes(32).toString('hex'); }
function nextId(arr){ return arr.length ? Math.max(...arr.map(x=>x.id))+1 : 1; }

function timeAgo(ts){
  const diff = Date.now()-ts;
  if(diff < 60000)   return 'Just now';
  if(diff < 3600000) return Math.floor(diff/60000)+'m ago';
  if(diff < 86400000)return Math.floor(diff/3600000)+'h ago';
  return Math.floor(diff/86400000)+'d ago';
}

// ══════════════════════════════════════════════
//  REST API
// ══════════════════════════════════════════════

// Auth: Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = DB.users.find(u => u.email === email && u.password === hash(password));
  if (!user) return res.status(401).json({ success:false, message:'Invalid credentials' });
  const token = genToken();
  DB.sessions[token] = user.id;
  const { password:_, ...safe } = user;
  res.json({ success:true, token, user: safe });
});

// Auth: Register
app.post('/api/register', (req, res) => {
  const { name, email, password, college, year, branch } = req.body;
  if (DB.users.find(u => u.email === email))
    return res.status(409).json({ success:false, message:'Email already registered' });
  const user = {
    id: nextId(DB.users), name, email, password: hash(password),
    role:'student', college, year, branch,
    ini: name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2)
  };
  DB.users.push(user);
  const token = genToken();
  DB.sessions[token] = user.id;
  const { password:_, ...safe } = user;
  res.status(201).json({ success:true, token, user: safe });
});

// Middleware: verify token
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  const uid   = DB.sessions[token];
  if (!uid) return res.status(401).json({ success:false, message:'Unauthorized' });
  req.user = DB.users.find(u => u.id === uid);
  next();
}

// GET posts
app.get('/api/posts', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const uid   = DB.sessions[token] || 0;
  const posts = [...DB.posts]
    .sort((a,b) => b.ts - a.ts)
    .map(p => ({
      ...p,
      time: timeAgo(p.ts),
      author: (()=>{ const u=DB.users.find(x=>x.id===p.uid); return u?{name:u.name,ini:u.ini,college:u.college,id:u.id}:{name:'Unknown',ini:'?',college:'',id:0}; })(),
      liked_by_me: false
    }));
  res.json({ success:true, posts });
});

// POST new post
app.post('/api/posts', auth, (req, res) => {
  const { content, tag='general' } = req.body;
  if (!content?.trim()) return res.status(400).json({ success:false, message:'Content required' });
  const post = {
    id: nextId(DB.posts), uid: req.user.id,
    content, tag, likes:0, liked:false, comments:0,
    time:'Just now', ts: Date.now()
  };
  DB.posts.unshift(post);
  const postWithAuthor = {
    ...post,
    author: { name:req.user.name, ini:req.user.ini, college:req.user.college, id:req.user.id }
  };
  // Broadcast to ALL connected clients immediately
  io.emit('new_post', postWithAuthor);
  console.log(`📢 New post by ${req.user.name}: "${content.substring(0,50)}…"`);
  res.status(201).json({ success:true, post: postWithAuthor });
});

// LIKE post
app.post('/api/posts/:id/like', auth, (req, res) => {
  const post = DB.posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ success:false, message:'Not found' });
  post.likes++;
  io.emit('post_liked', { postId: post.id, likes: post.likes });
  res.json({ success:true, likes: post.likes });
});

// GET online users count
app.get('/api/online', (req, res) => {
  res.json({ success:true, count: DB.onlineUsers.size, users: DB.onlineUsers.size });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status:'ok', posts: DB.posts.length, online: DB.onlineUsers.size, uptime: Math.floor(process.uptime())+'s' });
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ══════════════════════════════════════════════
//  SOCKET.IO — REAL-TIME
// ══════════════════════════════════════════════
io.on('connection', (socket) => {
  let currentUser = null;

  // Auth via socket
  socket.on('auth', (token) => {
    const uid = DB.sessions[token];
    if (uid) {
      currentUser = DB.users.find(u => u.id === uid);
      if (currentUser) {
        DB.onlineUsers.add(currentUser.name);
        socket.join('campus');
        socket.emit('auth_ok', { name: currentUser.name });
        io.emit('online_count', { count: DB.onlineUsers.size });
        console.log(`🟢 ${currentUser.name} connected (${DB.onlineUsers.size} online)`);
      }
    }
  });

  // Real-time post creation
  socket.on('create_post', (data) => {
    if (!currentUser) return;
    const post = {
      id: nextId(DB.posts), uid: currentUser.id,
      content: data.content, tag: data.tag||'general',
      likes:0, liked:false, comments:0,
      time:'Just now', ts: Date.now(),
      author: { name:currentUser.name, ini:currentUser.ini, college:currentUser.college, id:currentUser.id }
    };
    DB.posts.unshift(post);
    io.emit('new_post', post);  // broadcast to EVERYONE
    console.log(`📢 [Socket] Post by ${currentUser.name}: "${data.content.substring(0,40)}…"`);
  });

  // Typing in chat
  socket.on('typing', ({ convId, name }) => {
    socket.to(`conv_${convId}`).emit('user_typing', { name, convId });
  });
  socket.on('stop_typing', ({ convId }) => {
    socket.to(`conv_${convId}`).emit('user_stop_typing', { convId });
  });

  // Join a conversation room
  socket.on('join_conv', (convId) => {
    socket.join(`conv_${convId}`);
  });

  // Send chat message (broadcast to room)
  socket.on('chat_msg', (data) => {
    if (!currentUser) return;
    io.to(`conv_${data.convId}`).emit('new_msg', {
      ...data,
      from: currentUser.id,
      senderName: currentUser.name,
      time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})
    });
  });

  // Disconnect
  socket.on('disconnect', () => {
    if (currentUser) {
      DB.onlineUsers.delete(currentUser.name);
      io.emit('online_count', { count: DB.onlineUsers.size });
      console.log(`🔴 ${currentUser.name} disconnected (${DB.onlineUsers.size} online)`);
    }
  });
});

// ══════════════════════════════════════════════
//  START
// ══════════════════════════════════════════════
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════╗');
  console.log('║     🎓  CampusVibes Live Server         ║');
  console.log('╠════════════════════════════════════════╣');
  console.log(`║  URL    →  http://localhost:${PORT}         ║`);
  console.log('║  Status →  /health                     ║');
  console.log('╠════════════════════════════════════════╣');
  console.log('║  ADMIN LOGIN:                          ║');
  console.log('║  Email  →  admin@campusvibes.com       ║');
  console.log('║  Pass   →  admin123                    ║');
  console.log('╠════════════════════════════════════════╣');
  console.log('║  DEMO STUDENT LOGIN:                   ║');
  console.log('║  Email  →  priya@pune.edu              ║');
  console.log('║  Pass   →  demo123                     ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
});
