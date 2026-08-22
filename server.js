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

// ─── Global Error Resilience ──────────────────────────────────────────
process.on('uncaughtException', (err, origin) => {
  console.error('⚠️ Caught Unhandled Exception:', err.stack || err.message, 'Origin:', origin);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('⚠️ Caught Unhandled Rejection:', reason?.stack || reason);
});

process.on('exit', (code) => {
  console.log(`[PROCESS EXIT] Node process exiting with code: ${code}`);
});

process.on('SIGINT', () => {
  console.log('[PROCESS SIGNAL] Received SIGINT');
});

process.on('SIGTERM', () => {
  console.log('[PROCESS SIGNAL] Received SIGTERM');
});

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
    connectionLimit: 10,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
    idleTimeout: 60000
  });

  if (dbPool && dbPool.pool) {
    dbPool.pool.on('error', (err) => {
      console.warn('⚠️ TiDB Connection Pool notice:', err.message);
    });
    dbPool.pool.on('connection', (connection) => {
      connection.on('error', (err) => {
        console.warn('⚠️ TiDB Connection socket notice:', err.message);
      });
    });
  }

  console.log('⚡ Connected to TiDB Cloud Database Pool!');
} catch (err) {
  console.error('❌ Failed to initialize TiDB Pool:', err.message);
}

// Keep standard input and event loop anchored
if (process.stdin.isTTY) {
  try { process.stdin.resume(); } catch (e) {}
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

// ─── Direct TLS Gmail SMTP Mailer with Timeout & Cleanup ─────────────
function sendGmailSMTP({ to, subject, body }) {
  return new Promise((resolve, reject) => {
    let resolved = false;
    const socket = tls.connect(465, 'smtp.gmail.com', () => {
      let step = 0;
      function send(cmd) {
        if (!socket.destroyed) {
          socket.write(cmd + '\r\n');
        }
      }

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
          if (!resolved) {
            resolved = true;
            resolve({ success: true, message: 'Email sent successfully via Gmail SMTP' });
          }
        } else if (response.startsWith('5')) {
          if (!resolved) {
            resolved = true;
            reject(new Error(`SMTP Error: ${response.trim()}`));
          }
        }
      });

      socket.setTimeout(12000, () => {
        socket.destroy();
        if (!resolved) {
          resolved = true;
          reject(new Error('SMTP connection timed out.'));
        }
      });

      socket.on('error', (err) => {
        if (!resolved) {
          resolved = true;
          reject(err);
        }
      });
    });

    socket.on('error', (err) => {
      if (!resolved) {
        resolved = true;
        reject(err);
      }
    });
  });
}

// ─── Static File Types ───────────────────────────────────────────────

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

  // 📬 API 3b: Daily Digest Email Summary Generator
  if (req.method === 'POST' && req.url === '/api/daily-digest') {
    let rawBody = '';
    req.on('data', chunk => rawBody += chunk.toString());
    req.on('end', async () => {
      try {
        const payload = JSON.parse(rawBody || '{}');
        const recipient = payload.email || EMAIL_USER;
        const name = payload.name || 'Saladi Siddharth';
        const scores = payload.scores || { life: 78, career: 75, health: 82, finance: 70, work: 80 };

        const digestHtml = `
          <h3 style="color:#00f2fe;margin-bottom:8px;">Daily BioVerse Performance Digest for ${name}</h3>
          <p style="font-size:13px;color:#94a3b8;margin-bottom:16px;">Here is your real-time life synchronization summary across all active pillars:</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
            <div style="background:#1e293b;padding:10px;border-radius:8px;"><strong>Life Score:</strong> <span style="color:#00f2fe;">${scores.life}/100</span></div>
            <div style="background:#1e293b;padding:10px;border-radius:8px;"><strong>Health Vitality:</strong> <span style="color:#10b981;">${scores.health}/100</span></div>
            <div style="background:#1e293b;padding:10px;border-radius:8px;"><strong>Career Matrix:</strong> <span style="color:#6366f1;">${scores.career}/100</span></div>
            <div style="background:#1e293b;padding:10px;border-radius:8px;"><strong>Finance & SIP:</strong> <span style="color:#fbbf24;">${scores.finance}/100</span></div>
          </div>
          <p style="font-size:12px;color:#94a3b8;">Keep up the streak! Log in to your <a href="http://${req.headers.host || `localhost:${PORT}`}/#dashboard" style="color:#00f2fe;">BioVerse Dashboard</a> or explore your <a href="http://${req.headers.host || `localhost:${PORT}`}/continuum.html" style="color:#a855f7;">3D Life Journey</a>.</p>
        `;

        const result = await sendGmailSMTP({
          to: recipient,
          subject: `🌟 BioVerse Daily Digest: ${name} (Score: ${scores.life}/100)`,
          body: digestHtml
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

  // 📱 OTP In-Memory Storage for Registration Verification
  const otpStorage = global.__otpStorage || (global.__otpStorage = new Map());

  // ✉️ API 4a: Send 6-Digit Email OTP
  if (req.method === 'POST' && req.url === '/api/auth/send-otp') {
    let rawBody = '';
    req.on('data', chunk => rawBody += chunk.toString());
    req.on('end', async () => {
      try {
        const { email, name } = JSON.parse(rawBody || '{}');
        if (!email || !email.includes('@')) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Valid email address is required.' }));
        }

        const cleanEmail = email.trim().toLowerCase();
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        otpStorage.set(cleanEmail, { otp, expiresAt });

        const otpHtml = `
          <div style="background:#0b1120;border:1px solid #38bdf8;border-radius:16px;padding:24px;text-align:center;color:#fff;font-family:'Segoe UI',Roboto,sans-serif;">
            <h2 style="color:#00f2fe;margin:0 0 8px 0;">🧬 BioVerse Security Verification</h2>
            <p style="color:#cbd5e1;font-size:14px;margin-bottom:20px;">Hello <strong>${name || 'BioVerse Explorer'}</strong>, use the 6-digit OTP code below to verify your BioVerse account registration:</p>
            <div style="font-size:38px;font-weight:900;letter-spacing:10px;color:#fbbf24;background:rgba(251,191,36,0.12);border:2px dashed #fbbf24;border-radius:12px;padding:18px;margin:20px auto;max-width:320px;">
              ${otp}
            </div>
            <p style="font-size:12.5px;color:#94a3b8;margin-top:20px;">This code expires in 10 minutes. If you did not attempt this registration, please disregard this message.</p>
          </div>
        `;

        try {
          await sendGmailSMTP({
            to: cleanEmail,
            subject: `🔐 Your BioVerse Verification Code: ${otp}`,
            body: otpHtml
          });
        } catch (smtpErr) {
          console.warn('⚠️ SMTP Send Warning (Demo fallback active):', smtpErr.message);
        }

        console.log(`🔑 Generated OTP for [${cleanEmail}]: ${otp}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: `Verification code sent to ${cleanEmail}`,
          // Demo development hint in case SMTP is in test mode
          devOtp: otp
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // 🔑 API 4b: Verify 6-Digit Email OTP & Complete Registration
  if (req.method === 'POST' && req.url === '/api/auth/verify-otp') {
    let rawBody = '';
    req.on('data', chunk => rawBody += chunk.toString());
    req.on('end', async () => {
      try {
        const { email, otp, name, password, identity, phone } = JSON.parse(rawBody || '{}');
        const cleanEmail = (email || '').trim().toLowerCase();
        const cleanOtp = (otp || '').toString().trim();

        const stored = otpStorage.get(cleanEmail);

        if (!stored || stored.otp !== cleanOtp || Date.now() > stored.expiresAt) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Invalid or expired OTP verification code.' }));
        }

        // Clean up OTP record
        otpStorage.delete(cleanEmail);

        const userId = 'usr_' + Date.now();
        const formattedName = name || cleanEmail.split('@')[0];

        if (dbPool) {
          try {
            await dbPool.query(
              'INSERT INTO bv_users (id, email, name, password) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), password=VALUES(password)',
              [userId, cleanEmail, formattedName, password || 'BioVerse2026!']
            );
          } catch (err) {
            console.warn('TiDB user insert notice:', err.message);
          }
        }

        const localDB = getLocalDB();
        const existingIdx = localDB.users.findIndex(u => u.email.toLowerCase() === cleanEmail);
        const newUserObj = { id: userId, name: formattedName, email: cleanEmail, password: password || 'BioVerse2026!', identity: identity || 'student', phone: phone || '' };
        if (existingIdx >= 0) {
          localDB.users[existingIdx] = newUserObj;
        } else {
          localDB.users.push(newUserObj);
        }
        saveLocalDB(localDB);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Account verified successfully!',
          user: { id: userId, name: formattedName, email: cleanEmail, identity: identity || 'student' }
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // 🔑 API 4c: Direct TiDB Auth Register
  if (req.method === 'POST' && req.url === '/api/auth/register') {
    let rawBody = '';
    req.on('data', chunk => rawBody += chunk.toString());
    req.on('end', async () => {
      try {
        const { name, email, password, identity, phone } = JSON.parse(rawBody || '{}');
        const cleanEmail = (email || '').trim().toLowerCase();
        const userId = 'usr_' + Date.now();
        const formattedName = name || cleanEmail.split('@')[0];

        if (dbPool) {
          try {
            await dbPool.query(
              'INSERT INTO bv_users (id, email, name, password) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), password=VALUES(password)',
              [userId, cleanEmail, formattedName, password]
            );
          } catch (err) {}
        }

        const localDB = getLocalDB();
        const existingIdx = localDB.users.findIndex(u => u.email.toLowerCase() === cleanEmail);
        const newUserObj = { id: userId, name: formattedName, email: cleanEmail, password, identity: identity || 'student', phone: phone || '' };
        if (existingIdx >= 0) {
          localDB.users[existingIdx] = newUserObj;
        } else {
          localDB.users.push(newUserObj);
        }
        saveLocalDB(localDB);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, user: { id: userId, name: formattedName, email: cleanEmail, identity } }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // 🔑 API 4d: Strict TiDB & LocalDB Auth Login Validation
  if (req.method === 'POST' && req.url === '/api/auth/login') {
    let rawBody = '';
    req.on('data', chunk => rawBody += chunk.toString());
    req.on('end', async () => {
      try {
        const { email, password } = JSON.parse(rawBody || '{}');
        const cleanEmail = (email || '').trim().toLowerCase();

        let user = null;

        // 1. Check TiDB Cloud Database
        if (dbPool) {
          try {
            const [rows] = await dbPool.query('SELECT * FROM bv_users WHERE LOWER(email) = ?', [cleanEmail]);
            if (rows.length > 0) user = rows[0];
          } catch (err) {}
        }

        // 2. Check Local File DB
        if (!user) {
          const localDB = getLocalDB();
          user = localDB.users.find(u => u.email && u.email.toLowerCase() === cleanEmail);
        }

        // 3. Fallback default account check for admin/demo user
        if (!user && (cleanEmail === 'saladisiddharth@gmail.com' || cleanEmail === 'siddharth@bioverse.ai')) {
          user = {
            id: 'usr_default_siddharth',
            email: cleanEmail,
            name: 'Saladi Siddharth',
            password: 'BioVerse2026!'
          };
          const localDB = getLocalDB();
          localDB.users.push(user);
          saveLocalDB(localDB);
        }

        // 4. If user is not found in registered accounts
        if (!user) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            success: false,
            error: 'No account found with this email address. Please Sign Up first.'
          }));
        }

        // 5. Check password match
        if (user.password !== password) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            success: false,
            error: 'Invalid password. Please check your credentials and try again.'
          }));
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

  // 🔔 API 4e: Login Security Alert Email Notification
  if (req.method === 'POST' && req.url === '/api/auth/login-notify') {
    let rawBody = '';
    req.on('data', chunk => rawBody += chunk.toString());
    req.on('end', async () => {
      try {
        const { email, name, userAgent } = JSON.parse(rawBody || '{}');
        const cleanEmail = (email || '').trim().toLowerCase();
        const formattedName = name || cleanEmail.split('@')[0];
        const loginTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        const loginAlertHtml = `
          <div style="background:#070a14;border:1px solid #1e293b;border-radius:20px;padding:28px;max-width:560px;margin:0 auto;color:#f8fafc;font-family:'Segoe UI',Roboto,Helvetica,sans-serif;box-shadow:0 20px 50px rgba(0,0,0,0.8);">
            <div style="text-align:center;margin-bottom:24px;">
              <div style="display:inline-flex;align-items:center;justify-content:center;width:60px;height:60px;border-radius:16px;background:linear-gradient(135deg,#00f2fe,#4facfe);font-size:30px;margin-bottom:12px;box-shadow:0 0 24px rgba(0,242,254,0.5);">
                🧬
              </div>
              <h2 style="margin:0;font-size:24px;font-weight:800;background:linear-gradient(135deg,#ffffff 0%,#00f2fe 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">BioVerse Security Alert</h2>
              <p style="margin:4px 0 0 0;font-size:13px;color:#94a3b8;">Intelligent Life Management Suite</p>
            </div>

            <div style="background:rgba(15,23,42,0.85);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:18px;margin-bottom:20px;">
              <div style="font-size:14px;color:#cbd5e1;margin-bottom:12px;">Hello <strong style="color:#ffffff;">${formattedName}</strong>,</div>
              <p style="font-size:13.5px;color:#94a3b8;line-height:1.6;margin:0 0 14px 0;">
                A new login was detected on your BioVerse account. Your real-time 5-pillar synchronization (Career, Health, Finance, Work & Life) is now active!
              </p>

              <div style="display:grid;grid-template-columns:1fr;gap:8px;font-size:12.5px;background:#0b1120;padding:12px 14px;border-radius:10px;border:1px solid rgba(0,242,254,0.2);">
                <div>📅 <strong>Time (IST):</strong> <span style="color:#00f2fe;">${loginTime}</span></div>
                <div>👤 <strong>Account:</strong> <span style="color:#fbbf24;">${cleanEmail}</span></div>
                <div>🔒 <strong>Session Status:</strong> <span style="color:#10b981;">Active & Encrypted (TLS 1.2)</span></div>
              </div>
            </div>

            <div style="text-align:center;margin-bottom:20px;">
              <a href="http://${req.headers.host || 'localhost:3000'}/#/dashboard" style="display:inline-block;background:linear-gradient(135deg,#00f2fe 0%,#6366f1 100%);color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 28px;border-radius:999px;box-shadow:0 8px 25px rgba(0,242,254,0.35);">
                Open BioVerse Dashboard →
              </a>
            </div>

            <div style="border-top:1px solid #1e293b;padding-top:14px;text-align:center;font-size:11.5px;color:#64748b;">
              If this was not you, please immediately reset your password on the login screen.<br>
              © 2026 BioVerse Platform • Automated security notification.
            </div>
          </div>
        `;

        try {
          await sendGmailSMTP({
            to: cleanEmail,
            subject: `🧬 BioVerse Login Alert: ${formattedName}`,
            body: loginAlertHtml
          });
        } catch (e) {
          console.warn('Login email warning:', e.message);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Login notification dispatched' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // 🔑 API 4f: Forgot Password OTP Dispatch
  if (req.method === 'POST' && req.url === '/api/auth/forgot-otp') {
    let rawBody = '';
    req.on('data', chunk => rawBody += chunk.toString());
    req.on('end', async () => {
      try {
        const { email } = JSON.parse(rawBody || '{}');
        const cleanEmail = (email || '').trim().toLowerCase();

        if (!cleanEmail || !cleanEmail.includes('@')) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Please provide a valid email address.' }));
        }

        let user = null;
        if (dbPool) {
          try {
            const [rows] = await dbPool.query('SELECT * FROM bv_users WHERE LOWER(email) = ?', [cleanEmail]);
            if (rows.length > 0) user = rows[0];
          } catch (err) {}
        }

        if (!user) {
          const localDB = getLocalDB();
          user = localDB.users.find(u => u.email && u.email.toLowerCase() === cleanEmail);
        }

        if (!user && (cleanEmail === 'saladisiddharth@gmail.com' || cleanEmail === 'siddharth@bioverse.ai')) {
          user = { email: cleanEmail, name: 'Saladi Siddharth' };
        }

        if (!user) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            success: false,
            error: 'No registered BioVerse account was found with this email address.'
          }));
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 10 * 60 * 1000;
        otpStorage.set(`forgot_${cleanEmail}`, { otp, expiresAt });

        const resetHtml = `
          <div style="background:#070a14;border:1px solid #f59e0b;border-radius:20px;padding:28px;max-width:540px;margin:0 auto;color:#fff;font-family:sans-serif;text-align:center;">
            <div style="font-size:36px;margin-bottom:8px;">🔑</div>
            <h2 style="color:#fbbf24;margin:0 0 10px 0;">BioVerse Password Reset Code</h2>
            <p style="color:#cbd5e1;font-size:13.5px;line-height:1.5;">Hello <strong>${user.name || 'User'}</strong>, enter the 6-digit OTP code below to create your new password:</p>
            
            <div style="font-size:36px;font-weight:900;letter-spacing:10px;color:#fbbf24;background:rgba(251,191,36,0.12);border:2px dashed #fbbf24;border-radius:14px;padding:16px;margin:20px auto;max-width:300px;">
              ${otp}
            </div>

            <p style="font-size:12px;color:#94a3b8;">This code is valid for 10 minutes. If you did not request this, your account remains secure.</p>
          </div>
        `;

        try {
          await sendGmailSMTP({
            to: cleanEmail,
            subject: `🔑 BioVerse Password Reset Code: ${otp}`,
            body: resetHtml
          });
        } catch (e) {
          console.warn('Reset email send error:', e.message);
        }

        console.log(`🔑 Generated Reset OTP for [${cleanEmail}]: ${otp}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: `Password reset code sent to ${cleanEmail}`,
          devOtp: otp
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // 🔑 API 4g: Reset Password Execution
  if (req.method === 'POST' && req.url === '/api/auth/reset-password') {
    let rawBody = '';
    req.on('data', chunk => rawBody += chunk.toString());
    req.on('end', async () => {
      try {
        const { email, otp, newPassword } = JSON.parse(rawBody || '{}');
        const cleanEmail = (email || '').trim().toLowerCase();
        const cleanOtp = (otp || '').toString().trim();

        const stored = otpStorage.get(`forgot_${cleanEmail}`);
        if (!stored || stored.otp !== cleanOtp || Date.now() > stored.expiresAt) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'Invalid or expired OTP reset code.' }));
        }

        if (!newPassword || newPassword.length < 6) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, error: 'New password must be at least 6 characters.' }));
        }

        otpStorage.delete(`forgot_${cleanEmail}`);

        if (dbPool) {
          try {
            await dbPool.query('UPDATE bv_users SET password = ? WHERE LOWER(email) = ?', [newPassword, cleanEmail]);
          } catch (err) {}
        }

        const localDB = getLocalDB();
        const user = localDB.users.find(u => u.email && u.email.toLowerCase() === cleanEmail);
        if (user) {
          user.password = newPassword;
        } else {
          localDB.users.push({
            id: 'usr_' + Date.now(),
            name: cleanEmail.split('@')[0],
            email: cleanEmail,
            password: newPassword
          });
        }
        saveLocalDB(localDB);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Password updated successfully! You can now sign in.'
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

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
  } else {
    console.error('❌ Server error:', err.message);
  }
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 BioVerse Platform Server live at http://localhost:${PORT}`);
    console.log(`☁️ Database: TiDB Cloud Serverless MySQL (gateway01.ap-southeast-1.prod.aws.tidbcloud.com)`);
    console.log(`📁 Local DB Storage: ${LOCAL_DB_FILE}`);
    console.log(`📧 Gmail SMTP Relay: ${EMAIL_USER}`);
    console.log(`==================================================\n`);
  });
}

module.exports = server;

