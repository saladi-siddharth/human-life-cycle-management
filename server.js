/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE PLATFORM SERVER — TiDB Cloud Serverless MySQL + Local DB & Gmail SMTP
   ═══════════════════════════════════════════════════════════════════ */

require('dotenv').config();
const http = require('http');
const tls = require('tls');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const PORT = process.env.PORT || 3000;
const EMAIL_USER = process.env.EMAIL_USER || 'mahisiddharth721@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'mqoqiqzpcfcqvnzp';

// ─── Local Disk DB Fallback Storage ───────────────────────────────────
const DATA_DIR = path.join(__dirname, 'data');
const LOCAL_DB_FILE = path.join(DATA_DIR, 'bioverse_db.json');

if (!fs.existsSync(DATA_DIR)) {
  try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) {}
}

function getLocalDB() {
  try {
    if (fs.existsSync(LOCAL_DB_FILE)) {
      return JSON.parse(fs.readFileSync(LOCAL_DB_FILE, 'utf8'));
    }
  } catch (e) {}
  return { users: [], state: null, tasks: [], goals: [], transactions: [] };
}

function saveLocalDB(data) {
  try {
    fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('❌ Failed saving local DB file:', e.message);
  }
}

// ─── TiDB Cloud Database Pool ─────────────────────────────────────────
let dbPool = null;

try {
  dbPool = mysql.createPool({
    host: process.env.TIDB_HOST || 'gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com',
    port: Number(process.env.TIDB_PORT) || 4000,
    user: process.env.TIDB_USER || '3aposv8BwtQq1iQ.root',
    password: process.env.TIDB_PASSWORD || 'iV5raMCYdId3skvO',
    database: process.env.TIDB_DATABASE || 'test',
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true },
    waitForConnections: true,
    connectionLimit: 10
  });
  console.log('⚡ Connected to TiDB Cloud Database Pool!');
} catch (err) {
  console.error('❌ Failed to initialize TiDB Pool:', err.message);
}

// Auto Initialize Tables
async function initTables() {
  if (!dbPool) return;
  try {
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS bv_users (
        id VARCHAR(64) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        profile_json LONGTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS bv_state (
        id VARCHAR(64) PRIMARY KEY,
        user_id VARCHAR(64) DEFAULT 'default_user',
        state_json LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS bv_tasks (
        id VARCHAR(64) PRIMARY KEY,
        user_id VARCHAR(64),
        title VARCHAR(500) NOT NULL,
        domain VARCHAR(50),
        quadrant VARCHAR(10),
        priority VARCHAR(20),
        completed TINYINT(1) DEFAULT 0,
        due_date VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS bv_life_goals (
        id VARCHAR(64) PRIMARY KEY,
        user_id VARCHAR(64),
        category VARCHAR(100),
        title VARCHAR(500) NOT NULL,
        target_year VARCHAR(20),
        completed TINYINT(1) DEFAULT 0,
        progress INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS bv_transactions (
        id VARCHAR(64) PRIMARY KEY,
        user_id VARCHAR(64),
        type VARCHAR(20),
        amount DECIMAL(12, 2),
        category VARCHAR(100),
        date VARCHAR(50),
        note TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    console.log('✅ TiDB Cloud Database Tables Verified!');
  } catch (err) {
    console.error('⚠️ Warning initializing TiDB tables (Using Local File DB Fallback):', err.message);
  }
}

initTables();

// ─── Direct TLS Gmail SMTP Mailer ─────────────────────────────────────
function sendGmailSMTP({ to, subject, body }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(465, 'smtp.gmail.com', () => {
      let step = 0;
      function send(cmd) { socket.write(cmd + '\r\n'); }

      socket.on('data', (data) => {
        const response = data.toString();
        if (step === 0 && response.startsWith('220')) {
          step = 1; send(`EHLO localhost`);
        } else if (step === 1 && response.startsWith('250')) {
          step = 2;
          const authString = Buffer.from(`\0${EMAIL_USER}\0${EMAIL_PASS}`).toString('base64');
          send(`AUTH PLAIN ${authString}`);
        } else if (step === 2 && response.startsWith('235')) {
          step = 3; send(`MAIL FROM:<${EMAIL_USER}>`);
        } else if (step === 3 && response.startsWith('250')) {
          step = 4; send(`RCPT TO:<${to || EMAIL_USER}>`);
        } else if (step === 4 && response.startsWith('250')) {
          step = 5; send(`DATA`);
        } else if (step === 5 && response.startsWith('354')) {
          step = 6;
          const emailContent = [
            `From: "BioVerse Platform" <${EMAIL_USER}>`,
            `To: <${to || EMAIL_USER}>`,
            `Subject: ${subject}`,
            `MIME-Version: 1.0`,
            `Content-Type: text/html; charset=UTF-8`,
            ``,
            `<html><body style="font-family:sans-serif;background:#0a0e1a;color:#f1f5f9;padding:24px;">`,
            `<div style="max-width:600px;margin:0 auto;background:#111827;border:1px solid #6366f1;border-radius:12px;padding:24px;">`,
            `<h2 style="color:#6366f1;margin-top:0;">🧬 BioVerse Alert</h2>`,
            `<div style="font-size:15px;line-height:1.6;">${body}</div>`,
            `<hr style="border-color:#1e2642;margin:20px 0;">`,
            `<p style="font-size:12px;color:#64748b;">Automated alert from BioVerse Platform via Gmail SMTP (${EMAIL_USER}).</p>`,
            `</div></body></html>`,
            `.`
          ].join('\r\n');
          send(emailContent);
        } else if (step === 6 && response.startsWith('250')) {
          step = 7; send(`QUIT`);
          resolve({ success: true, message: 'Email sent successfully via Gmail SMTP' });
        } else if (response.startsWith('5')) {
          reject(new Error(`SMTP Error: ${response.trim()}`));
        }
      });
      socket.on('error', (err) => reject(err));
    });
  });
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // 🌐 API 1: TiDB & Backend Health Status
  if (req.method === 'GET' && req.url === '/api/health') {
    let dbStatus = 'disconnected';
    let tidbInfo = null;

    if (dbPool) {
      try {
        const [rows] = await dbPool.query('SELECT NOW() as now, VERSION() as ver');
        dbStatus = 'online';
        tidbInfo = { serverTime: rows[0].now, tidbVersion: rows[0].ver };
      } catch (err) {
        dbStatus = 'fallback_local_db';
      }
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'online',
      database: dbStatus === 'online' ? 'TiDB Cloud Serverless MySQL' : 'Local File Persistent DB Engine',
      tidbInfo,
      smtpRelay: EMAIL_USER
    }));
    return;
  }

  // 🔄 API 2: State Get & Sync Endpoints
  if (req.method === 'GET' && req.url === '/api/state/get') {
    let state = null;
    if (dbPool) {
      try {
        const [rows] = await dbPool.query('SELECT state_json FROM bv_state WHERE id = ?', ['global_state']);
        if (rows.length > 0) {
          state = JSON.parse(rows[0].state_json);
        }
      } catch (err) {}
    }

    if (!state) {
      const localDB = getLocalDB();
      state = localDB.state;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, state }));
    return;
  }

  if (req.method === 'POST' && req.url === '/api/state/sync') {
    let rawBody = '';
    req.on('data', chunk => rawBody += chunk.toString());
    req.on('end', async () => {
      try {
        const payload = JSON.parse(rawBody);
        const stateStr = JSON.stringify(payload.state || payload);

        let syncedToTiDB = false;
        if (dbPool) {
          try {
            await dbPool.query(
              'INSERT INTO bv_state (id, state_json) VALUES (?, ?) ON DUPLICATE KEY UPDATE state_json = VALUES(state_json)',
              ['global_state', stateStr]
            );
            syncedToTiDB = true;
          } catch (err) {}
        }

        const localDB = getLocalDB();
        localDB.state = payload.state || payload;
        saveLocalDB(localDB);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, syncedToTiDB, syncedToLocal: true }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // ✉️ API 3: Send Gmail SMTP Email
  if (req.method === 'POST' && req.url === '/api/send-email') {
    let rawBody = '';
    req.on('data', chunk => rawBody += chunk.toString());
    req.on('end', async () => {
      try {
        const payload = JSON.parse(rawBody);
        const result = await sendGmailSMTP({
          to: payload.to || EMAIL_USER,
          subject: payload.subject || 'BioVerse Alert',
          body: payload.body || 'No message content'
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // 🔑 API 4: TiDB Auth Register & Login
  if (req.method === 'POST' && req.url === '/api/auth/register') {
    let rawBody = '';
    req.on('data', chunk => rawBody += chunk.toString());
    req.on('end', async () => {
      try {
        const { name, email, password } = JSON.parse(rawBody);
        const userId = 'usr_' + Date.now();

        if (dbPool) {
          try {
            await dbPool.query(
              'INSERT INTO bv_users (id, email, name, password) VALUES (?, ?, ?, ?)',
              [userId, email, name, password]
            );
          } catch (err) {}
        }

        const localDB = getLocalDB();
        localDB.users.push({ id: userId, name, email, password });
        saveLocalDB(localDB);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, userId, name, email }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/api/auth/login') {
    let rawBody = '';
    req.on('data', chunk => rawBody += chunk.toString());
    req.on('end', async () => {
      try {
        const { email, password } = JSON.parse(rawBody);

        let user = null;
        if (dbPool) {
          try {
            const [rows] = await dbPool.query('SELECT * FROM bv_users WHERE email = ?', [email]);
            if (rows.length > 0) user = rows[0];
          } catch (err) {}
        }

        if (!user) {
          // Auto-provision user account if not yet registered in database
          const derivedName = email.includes('saladi') ? 'Saladi Siddharth' :
            email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          const userId = 'usr_' + Date.now();

          user = { id: userId, email, name: derivedName, password: password || 'defaultPass' };

          if (dbPool) {
            try {
              await dbPool.query(
                'INSERT INTO bv_users (id, email, name, password) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name)',
                [userId, email, derivedName, password || 'defaultPass']
              );
            } catch (err) {}
          }

          const localDB = getLocalDB();
          localDB.users.push(user);
          saveLocalDB(localDB);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          user: { id: user.id, name: user.name, email: user.email }
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // 🤖 API 5: Server-side AI Proxy Assistant
  if (req.method === 'POST' && req.url === '/api/ai/chat') {
    let rawBody = '';
    req.on('data', chunk => rawBody += chunk.toString());
    req.on('end', async () => {
      try {
        const { prompt, key } = JSON.parse(rawBody);
        const apiKey = key || process.env.GEMINI_API_KEY;

        if (apiKey) {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
          });
          const data = await response.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ reply }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          reply: `🧬 BioVerse AI Coach Assistant: Recieved your query "${prompt}". I recommend reviewing your daily hydration target, active task quadrant, and upcoming goals!`
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Serve static files
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'text/html';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(__dirname, 'index.html'), (err2, fallback) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(fallback, 'utf-8');
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 BioVerse Platform Server live at http://localhost:${PORT}`);
  console.log(`☁️ Database: TiDB Cloud Serverless MySQL (gateway01.ap-southeast-1.prod.aws.tidbcloud.com)`);
  console.log(`📁 Local DB Storage: ${LOCAL_DB_FILE}`);
  console.log(`📧 Gmail SMTP Relay: ${EMAIL_USER}`);
  console.log(`==================================================\n`);
});
