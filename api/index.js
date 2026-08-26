/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE VERCEL SERVERLESS API HANDLER
   TiDB Cloud MySQL + Gmail SMTP + OTP Security + AI Assistant
   ═══════════════════════════════════════════════════════════════════ */

const tls = require('tls');
const fs = require('fs');
const path = require('path');
let mysql = null;
try {
  mysql = require('mysql2/promise');
} catch (e) {}
let bcrypt = null;
try {
  bcrypt = require('bcryptjs');
} catch (e) {}
let jwt = null;
try {
  jwt = require('jsonwebtoken');
} catch (e) {}

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const JWT_SECRET = process.env.JWT_SECRET || 'bioverse_dev_jwt_secret_change_in_production';
const BCRYPT_ROUNDS = 12;

// ─── TiDB Cloud Database Pool ─────────────────────────────────────────
let dbPool = null;

if (mysql) {
  try {
    const TIDB_HOST = process.env.TIDB_HOST;
    const TIDB_USER = process.env.TIDB_USER;
    const TIDB_PASSWORD = process.env.TIDB_PASSWORD;
    const TIDB_DATABASE = process.env.TIDB_DATABASE || 'test';
    dbPool = mysql.createPool({
      host: TIDB_HOST || 'localhost',
      port: Number(process.env.TIDB_PORT) || 4000,
      user: TIDB_USER || 'root',
      password: TIDB_PASSWORD || '',
      database: TIDB_DATABASE,
      ssl: TIDB_HOST ? { minVersion: 'TLSv1.2', rejectUnauthorized: true } : undefined,
      waitForConnections: true,
      connectionLimit: 5,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
      idleTimeout: 60000
    });
  } catch (err) {
    console.error('⚠️ TiDB Pool init notice:', err.message);
  }
}

// ─── Direct TLS Gmail SMTP Mailer ─────────────────────────────────────
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
          step = 1; send('EHLO localhost');
        } else if (step === 1 && response.startsWith('250')) {
          step = 2;
          const authString = Buffer.from(`\0${EMAIL_USER}\0${EMAIL_PASS}`).toString('base64');
          send(`AUTH PLAIN ${authString}`);
        } else if (step === 2 && response.startsWith('235')) {
          step = 3; send(`MAIL FROM:<${EMAIL_USER}>`);
        } else if (step === 3 && response.startsWith('250')) {
          step = 4; send(`RCPT TO:<${to || EMAIL_USER}>`);
        } else if (step === 4 && response.startsWith('250')) {
          step = 5; send('DATA');
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
          step = 7; send('QUIT');
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

      socket.setTimeout(10000, () => {
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

// In-Memory Storage for OTPs & fallbacks
const otpStorage = global.__otpStorage || (global.__otpStorage = new Map());
const inMemoryStore = global.__inMemoryStore || (global.__inMemoryStore = { users: [], state: null });

function parseBody(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    if (req.body && typeof req.body === 'string') {
      try { return resolve(JSON.parse(req.body)); } catch (e) { return resolve({}); }
    }
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try { resolve(JSON.parse(body || '{}')); } catch (e) { resolve({}); }
    });
    req.on('error', () => resolve({}));
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // Normalize URL Path
  const parsedUrl = (req.url || '/').split('?')[0];
  const cleanPath = parsedUrl.startsWith('/api') ? parsedUrl : `/api${parsedUrl}`;

  // 🌐 API 1: Health Status
  if (req.method === 'GET' && (cleanPath === '/api/health' || cleanPath === '/api')) {
    let dbStatus = 'disconnected';
    let tidbInfo = null;

    if (dbPool) {
      try {
        const [rows] = await dbPool.query('SELECT NOW() as now, VERSION() as ver');
        dbStatus = 'online';
        tidbInfo = { serverTime: rows[0].now, tidbVersion: rows[0].ver };
      } catch (err) {
        dbStatus = 'fallback_memory_db';
      }
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      status: 'online',
      platform: 'BioVerse Serverless on Vercel',
      database: dbStatus === 'online' ? 'TiDB Cloud Serverless MySQL' : 'In-Memory / Local Fallback Engine',
      tidbInfo,
      smtpRelay: EMAIL_USER
    }));
  }

  // 🔄 API 2a: State Get
  if (req.method === 'GET' && cleanPath === '/api/state/get') {
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
      state = inMemoryStore.state;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ success: true, state }));
  }

  // 🔄 API 2b: State Sync
  if (req.method === 'POST' && cleanPath === '/api/state/sync') {
    const payload = await parseBody(req);
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

    inMemoryStore.state = payload.state || payload;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ success: true, syncedToTiDB }));
  }

  // ✉️ API 3: Send Email
  if (req.method === 'POST' && cleanPath === '/api/send-email') {
    const payload = await parseBody(req);
    try {
      const result = await sendGmailSMTP({
        to: payload.to || EMAIL_USER,
        subject: payload.subject || 'BioVerse Alert',
        body: payload.body || 'No message content'
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(result));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  // 🔕 API 3a: 1-Click Unsubscribe Endpoint
  if (cleanPath === '/api/unsubscribe') {
    let emailToUnsub = '';

    if (req.method === 'GET') {
      try {
        const parsedUrl = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
        emailToUnsub = (parsedUrl.searchParams.get('email') || '').trim().toLowerCase();
      } catch (e) {}

      if (emailToUnsub && dbPool) {
        try {
          await dbPool.query('UPDATE bv_users SET unsubscribed = 1 WHERE email = ?', [emailToUnsub]);
        } catch (e) {}
      }

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Unsubscribed — BioVerse</title>
          <style>
            body { margin: 0; padding: 0; background: #070a14; color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
            .card { background: #0f172a; border: 1px solid rgba(99,102,241,0.3); border-radius: 20px; padding: 36px; max-width: 480px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.6); }
            .icon { font-size: 48px; margin-bottom: 12px; }
            h2 { color: #00f2fe; margin: 0 0 10px 0; font-size: 24px; }
            p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0; }
            .btn { display: inline-block; background: linear-gradient(135deg, #00f2fe, #6366f1); color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 999px; font-weight: 700; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="icon">🔕</div>
            <h2>Opt-Out Confirmed</h2>
            <p><strong>${emailToUnsub || 'Your email address'}</strong> has been successfully unsubscribed from daily automated motivational quotes.<br><br>You can opt back in anytime from your BioVerse profile settings.</p>
            <a href="/#/dashboard" class="btn">Return to BioVerse Dashboard</a>
          </div>
        </body>
        </html>
      `);
    } else if (req.method === 'POST') {
      const { email } = await parseBody(req);
      emailToUnsub = (email || '').trim().toLowerCase();
      if (emailToUnsub && dbPool) {
        try {
          await dbPool.query('UPDATE bv_users SET unsubscribed = 1 WHERE email = ?', [emailToUnsub]);
        } catch (e) {}
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, message: `Unsubscribed ${emailToUnsub} from daily quotes.` }));
    }
  }

  // 🔑 API 3b: Google OAuth Authenticator
  if (req.method === 'POST' && cleanPath === '/api/auth/google') {
    const { name, email, googleId, picture, identity } = await parseBody(req);
    const cleanEmail = (email || 'google_user@bioverse.ai').trim().toLowerCase();
    const userId = googleId ? `goog_${googleId.substring(0, 16)}` : `usr_goog_${Date.now()}`;
    const formattedName = name || cleanEmail.split('@')[0];

    if (dbPool) {
      try {
        await dbPool.query(
          'INSERT INTO bv_users (id, email, name, password) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name)',
          [userId, cleanEmail, formattedName, 'GOOGLE_OAUTH_VERIFIED']
        );
      } catch (err) {}
    }

    const userObj = {
      id: userId,
      name: formattedName,
      email: cleanEmail,
      password: 'GOOGLE_OAUTH_VERIFIED',
      identity: identity || 'student',
      picture: picture || '',
      provider: 'google'
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      success: true,
      user: userObj
    }));
  }

  // 📬 API 3c: Daily Digest Email Summary Generator
  if (req.method === 'POST' && cleanPath === '/api/daily-digest') {
    const payload = await parseBody(req);
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
      <p style="font-size:12px;color:#94a3b8;">Keep up the streak! Log in to your <a href="https://${req.headers.host || 'bioverse.vercel.app'}/#dashboard" style="color:#00f2fe;">BioVerse Dashboard</a> or explore your <a href="https://${req.headers.host || 'bioverse.vercel.app'}/continuum.html" style="color:#a855f7;">3D Life Journey</a>.</p>
    `;

    try {
      const result = await sendGmailSMTP({
        to: recipient,
        subject: `🌟 BioVerse Daily Digest: ${name} (Score: ${scores.life}/100)`,
        body: digestHtml
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(result));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  // ✉️ API 4a: Send 6-Digit Email OTP
  if (req.method === 'POST' && cleanPath === '/api/auth/send-otp') {
    const { email, name } = await parseBody(req);
    if (!email || !email.includes('@')) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: 'Valid email address is required.' }));
    }

    const cleanEmail = email.trim().toLowerCase();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;

    otpStorage.set(cleanEmail, { otp, expiresAt });

    const otpHtml = `
      <div style="background:#0b1120;border:1px solid #38bdf8;border-radius:16px;padding:24px;text-align:center;color:#fff;font-family:'Segoe UI',Roboto,sans-serif;">
        <h2 style="color:#00f2fe;margin:0 0 8px 0;">🧬 BioVerse Security Verification</h2>
        <p style="color:#cbd5e1;font-size:14px;margin-bottom:20px;">Hello <strong>${name || 'BioVerse Explorer'}</strong>, use the 6-digit OTP code below to verify your BioVerse account:</p>
        <div style="font-size:38px;font-weight:900;letter-spacing:10px;color:#fbbf24;background:rgba(251,191,36,0.12);border:2px dashed #fbbf24;border-radius:12px;padding:18px;margin:20px auto;max-width:320px;">
          ${otp}
        </div>
        <p style="font-size:12.5px;color:#94a3b8;margin-top:20px;">This code expires in 10 minutes. If you did not attempt this registration, please disregard this message.</p>
      </div>
    `;

    try {
      await sendGmailSMTP({
        to: cleanEmail,
        subject: `🔐 BioVerse Security Verification Code: ${otp}`,
        body: otpHtml
      });
    } catch (e) {
      console.warn('⚠️ SMTP send notice:', e.message);
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      success: true,
      message: `OTP sent to ${cleanEmail}`,
      devOtp: otp
    }));
  }

  // 🔑 API 4b: Verify OTP
  if (req.method === 'POST' && cleanPath === '/api/auth/verify-otp') {
    const { email, otp } = await parseBody(req);
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanOtp = (otp || '').toString().trim();

    const stored = otpStorage.get(cleanEmail);
    if (!stored) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: 'No OTP requested for this email or OTP expired.' }));
    }

    if (Date.now() > stored.expiresAt) {
      otpStorage.delete(cleanEmail);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: 'OTP has expired. Please request a new code.' }));
    }

    if (stored.otp !== cleanOtp) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: 'Invalid OTP code. Please check and try again.' }));
    }

    otpStorage.delete(cleanEmail);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      success: true,
      verified: true,
      message: 'Email successfully verified!'
    }));
  }

  // 📝 API 4c: Register
  if (req.method === 'POST' && cleanPath === '/api/auth/register') {
    const { name, email, password, profile } = await parseBody(req);
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanEmail || !password) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: 'Email and password are required.' }));
    }

    const userId = 'usr_' + Date.now();
    // Hash password with bcrypt before storage
    const hashedPassword = bcrypt ? await bcrypt.hash(password, BCRYPT_ROUNDS) : password;
    const userData = { id: userId, email: cleanEmail, name: name || cleanEmail.split('@')[0], password: hashedPassword, profile: profile || {} };

    if (dbPool) {
      try {
        await dbPool.query(
          'INSERT INTO bv_users (id, email, name, password, profile_json) VALUES (?, ?, ?, ?, ?)',
          [userId, cleanEmail, userData.name, hashedPassword, JSON.stringify(userData.profile)]
        );
      } catch (err) {}
    }

    inMemoryStore.users.push(userData);

    // Generate JWT token on registration
    const token = jwt ? jwt.sign({ userId, email: cleanEmail }, JWT_SECRET, { expiresIn: '7d' }) : null;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      success: true,
      token,
      user: { id: userId, email: cleanEmail, name: userData.name }
    }));
  }

  // 🚪 API 4d: Login
  if (req.method === 'POST' && cleanPath === '/api/auth/login') {
    const { email, password } = await parseBody(req);
    const cleanEmail = (email || '').trim().toLowerCase();

    let user = null;
    if (dbPool) {
      try {
        const [rows] = await dbPool.query('SELECT * FROM bv_users WHERE LOWER(email) = ?', [cleanEmail]);
        if (rows.length > 0) user = rows[0];
      } catch (err) {}
    }

    if (!user) {
      user = inMemoryStore.users.find(u => u.email && u.email.toLowerCase() === cleanEmail);
    }

    // Secure password comparison: bcrypt hash check with fallback for legacy plaintext
    let isValid = false;
    if (user) {
      if (bcrypt && user.password && user.password.startsWith('$2')) {
        // Password is bcrypt hashed
        isValid = await bcrypt.compare(password, user.password);
      } else {
        // Legacy plaintext comparison — auto-upgrade to hash on success
        isValid = user.password === password;
        if (isValid && bcrypt) {
          const upgradedHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
          user.password = upgradedHash;
          if (dbPool) {
            try {
              await dbPool.query('UPDATE bv_users SET password = ? WHERE id = ?', [upgradedHash, user.id]);
            } catch (err) {}
          }
        }
      }
    }

    if (!isValid) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: 'Invalid email or password.' }));
    }

    // Generate JWT session token
    const token = jwt ? jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' }) : null;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      success: true,
      token,
      user: { id: user.id, email: user.email, name: user.name }
    }));
  }

  // 🔔 API 4e: Login Notify
  if (req.method === 'POST' && cleanPath === '/api/auth/login-notify') {
    const { email, name, device, location } = await parseBody(req);
    const cleanEmail = (email || '').trim().toLowerCase();

    const notifyHtml = `
      <div style="background:#070a14;border:1px solid #10b981;border-radius:16px;padding:24px;color:#fff;font-family:sans-serif;">
        <h2 style="color:#10b981;margin:0 0 12px 0;">🛡️ BioVerse Login Detected</h2>
        <p style="color:#cbd5e1;font-size:14px;">Hello <strong>${name || 'Explorer'}</strong>, a successful sign-in to your BioVerse account was detected:</p>
        <div style="background:#0f172a;border-radius:8px;padding:12px;margin:16px 0;font-size:13px;line-height:1.6;">
          <div><strong>Device:</strong> ${device || 'Web Browser'}</div>
          <div><strong>Approx. Location:</strong> ${location || 'India'}</div>
          <div><strong>Timestamp:</strong> ${new Date().toUTCString()}</div>
        </div>
      </div>
    `;

    try {
      await sendGmailSMTP({
        to: cleanEmail,
        subject: `🛡️ New Sign-In to BioVerse (${name || 'Account'})`,
        body: notifyHtml
      });
    } catch (e) {}

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ success: true }));
  }

  // 🔑 API 4f: Forgot Password OTP
  if (req.method === 'POST' && cleanPath === '/api/auth/forgot-otp') {
    const { email } = await parseBody(req);
    const cleanEmail = (email || '').trim().toLowerCase();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    otpStorage.set(`forgot_${cleanEmail}`, { otp, expiresAt });

    const resetHtml = `
      <div style="background:#070a14;border:1px solid #f59e0b;border-radius:20px;padding:28px;max-width:540px;margin:0 auto;color:#fff;font-family:sans-serif;text-align:center;">
        <div style="font-size:36px;margin-bottom:8px;">🔑</div>
        <h2 style="color:#fbbf24;margin:0 0 10px 0;">BioVerse Password Reset Code</h2>
        <p style="color:#cbd5e1;font-size:13.5px;line-height:1.5;">Enter the 6-digit OTP code below to create your new password:</p>
        <div style="font-size:36px;font-weight:900;letter-spacing:10px;color:#fbbf24;background:rgba(251,191,36,0.12);border:2px dashed #fbbf24;border-radius:14px;padding:16px;margin:20px auto;max-width:300px;">
          ${otp}
        </div>
        <p style="font-size:12px;color:#94a3b8;">Valid for 10 minutes.</p>
      </div>
    `;

    try {
      await sendGmailSMTP({
        to: cleanEmail,
        subject: `🔑 BioVerse Password Reset Code: ${otp}`,
        body: resetHtml
      });
    } catch (e) {}

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      success: true,
      message: `Password reset code sent to ${cleanEmail}`,
      devOtp: otp
    }));
  }

  // 🔑 API 4g: Reset Password Execution
  if (req.method === 'POST' && cleanPath === '/api/auth/reset-password') {
    const { email, otp, newPassword } = await parseBody(req);
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

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      success: true,
      message: 'Password updated successfully! You can now sign in.'
    }));
  }

  // 🤖 API 5: Server-side AI Proxy
  if (req.method === 'POST' && cleanPath === '/api/ai/chat') {
    const { prompt, key } = await parseBody(req);
    const apiKey = key || process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ reply }));
      } catch (e) {}
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      reply: `🧬 BioVerse AI Coach Assistant: Received your query "${prompt}". I recommend reviewing your daily hydration target, active task quadrant, and upcoming goals!`
    }));
  }

  // 404 for unhandled API routes
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: `API endpoint ${cleanPath} not found` }));
};
