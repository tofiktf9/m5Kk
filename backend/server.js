require('dotenv').config();
const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const JWT_SECRET = process.env.JWT_SECRET || 'm5k-change-me';

app.use(express.json({limit:'100kb'}));
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'..')));

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'm5k',
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4'
});

function tokenFor(user){
  return jwt.sign({id:user.id, username:user.username, email:user.email}, JWT_SECRET, {expiresIn:'30d'});
}
function auth(req,res,next){
  const h=req.headers.authorization||'';
  const token=h.startsWith('Bearer ')?h.slice(7):null;
  if(!token) return res.status(401).json({error:'تسجيل الدخول مطلوب.'});
  try { req.user=jwt.verify(token,JWT_SECRET); next(); }
  catch { return res.status(401).json({error:'جلسة الدخول انتهت، سجل الدخول من جديد.'}); }
}
function cleanUsername(v){return String(v||'').trim();}
function cleanEmail(v){return String(v||'').trim().toLowerCase();}
function cleanLogin(v){return String(v||'').trim();}

app.get('/api/health', async (req,res)=>{
  try { await pool.query('SELECT 1'); res.json({ok:true, database:true}); }
  catch(e){ res.status(503).json({ok:false,database:false,error:'تعذر الاتصال بقاعدة البيانات.'}); }
});

app.post('/api/auth/register', async (req,res)=>{
  try{
    const username=cleanUsername(req.body.username), email=cleanEmail(req.body.email), password=String(req.body.password||'');
    if(!/^[\p{L}\p{N}_ .-]{3,30}$/u.test(username)) return res.status(400).json({error:'اسم المستخدم يجب أن يكون بين 3 و30 حرفًا.'});
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({error:'البريد الإلكتروني غير صحيح.'});
    if(password.length<6) return res.status(400).json({error:'كلمة المرور يجب أن تكون 6 أحرف على الأقل.'});
    const [exists]=await pool.query('SELECT id FROM users WHERE email=? OR username=? LIMIT 1',[email,username]);
    if(exists.length) return res.status(409).json({error:'اسم المستخدم أو البريد مستخدم بالفعل.'});
    const hash=await bcrypt.hash(password,12);
    const [r]=await pool.query('INSERT INTO users(username,email,password_hash) VALUES(?,?,?)',[username,email,hash]);
    const user={id:r.insertId,username,email};
    res.status(201).json({user,token:tokenFor(user)});
  }catch(e){console.error(e);res.status(500).json({error:'حدث خطأ أثناء إنشاء الحساب.'});}
});

app.post('/api/auth/login', async (req,res)=>{
  try{
    const login=cleanLogin(req.body.login || req.body.email), password=String(req.body.password||'');
    const [rows]=await pool.query('SELECT id,username,email,password_hash,best_score,games_played,total_points,correct_answers FROM users WHERE email=? OR username=? LIMIT 1',[cleanEmail(login),login]);
    if(!rows.length || !(await bcrypt.compare(password,rows[0].password_hash))) return res.status(401).json({error:'البريد أو كلمة المرور غير صحيحة.'});
    const u=rows[0]; const user={id:u.id,username:u.username,email:u.email};
    res.json({user,token:tokenFor(user)});
  }catch(e){console.error(e);res.status(500).json({error:'حدث خطأ أثناء تسجيل الدخول.'});}
});

app.get('/api/me',auth,async(req,res)=>{
  const [rows]=await pool.query('SELECT id,username,email,best_score,games_played,total_points,correct_answers,created_at FROM users WHERE id=?',[req.user.id]);
  if(!rows.length) return res.status(404).json({error:'المستخدم غير موجود.'});
  res.json({user:rows[0]});
});

const liveFriends = new Map();
function pruneLiveFriends(){
  const now=Date.now();
  for(const [id,room] of liveFriends){ if(now-room.updatedAt > 12000) liveFriends.delete(id); }
}
app.get('/api/live/friends',(req,res)=>{
  pruneLiveFriends();
  const names=[];
  for(const room of liveFriends.values()) for(const name of (room.players||[])) if(name && !names.includes(name)) names.push(name);
  res.json({count:names.length,players:names.slice(0,24),rooms:liveFriends.size});
});
app.post('/api/live/friends/heartbeat',(req,res)=>{
  const clientId=String(req.body.clientId||'').slice(0,100);
  if(!clientId) return res.status(400).json({error:'clientId مطلوب.'});
  const players=Array.isArray(req.body.players) ? req.body.players.map(x=>String(x||'').trim().slice(0,30)).filter(Boolean).slice(0,6) : [];
  liveFriends.set(clientId,{players,updatedAt:Date.now()});
  pruneLiveFriends();
  res.json({ok:true});
});
app.post('/api/live/friends/leave',(req,res)=>{
  const clientId=String(req.body.clientId||'').slice(0,100);
  if(clientId) liveFriends.delete(clientId);
  res.json({ok:true});
});

app.post('/api/results',auth,async(req,res)=>{
  try{
    const mode=String(req.body.mode||'unknown').slice(0,40);
    const score=Math.max(0,Math.min(100000,Number(req.body.score)||0));
    const correct=Math.max(0,Math.min(1000,Number(req.body.correctAnswers)||0));
    const total=Math.max(0,Math.min(1000,Number(req.body.totalQuestions)||0));
    await pool.query('INSERT INTO game_results(user_id,mode,score,correct_answers,total_questions) VALUES(?,?,?,?,?)',[req.user.id,mode,score,correct,total]);
    await pool.query('UPDATE users SET best_score=GREATEST(best_score,?),games_played=games_played+1,total_points=total_points+?,correct_answers=correct_answers+? WHERE id=?',[score,score,correct,req.user.id]);
    res.status(201).json({ok:true});
  }catch(e){console.error(e);res.status(500).json({error:'تعذر حفظ النتيجة.'});}
});

app.get('/api/leaderboard',async(req,res)=>{
  try{
    const [rows]=await pool.query('SELECT username,best_score,games_played FROM users WHERE games_played>0 ORDER BY best_score DESC, total_points DESC, id ASC LIMIT 50');
    res.json({players:rows});
  }catch(e){console.error(e);res.status(500).json({error:'تعذر تحميل المتصدرين.'});}
});

app.get('/api/profile/:username',async(req,res)=>{
  try{
    const [rows]=await pool.query('SELECT username,best_score,games_played,total_points,correct_answers,created_at FROM users WHERE username=? LIMIT 1',[req.params.username]);
    if(!rows.length) return res.status(404).json({error:'المستخدم غير موجود.'});
    res.json({user:rows[0]});
  }catch(e){res.status(500).json({error:'تعذر تحميل الملف الشخصي.'});}
});

app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'..','index.html')));

app.listen(PORT,()=>console.log(`M5K Backend running: http://localhost:${PORT}`));
