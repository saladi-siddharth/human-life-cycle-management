/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE GMAIL SMTP RELAY SERVER
   Configured with:
   EMAIL_USER=mahisiddharth721@gmail.com
   EMAIL_PASS=mqoqiqzpcfcqvnzp
   ═══════════════════════════════════════════════════════════════════ */

const http = require('http');
const tls = require('tls');
const fs = require('fs');
const path = require('path');

const EMAIL_USER = 'mahisiddharth721@gmail.com';
const EMAIL_PASS = 'mqoqiqzpcfcqvnzp';
const PORT = process.env.PORT || 3000;

/**
 * Direct SSL SMTP Socket Connection to smtp.gmail.com:465
 * Sends html email via native Node TLS without external dependencies.
 */
function sendGmailSMTP({ to, subject, body }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(465, 'smtp.gmail.com', () => {
      let step = 0;

      function send(cmd) {
        socket.write(cmd + '\r\n');
      }

      socket.on('data', (data) => {
        const response = data.toString();

        if (step === 0 && response.startsWith('220')) {
          step = 1;
          send(`EHLO localhost`);
        } else if (step === 1 && response.startsWith('250')) {
          step = 2;
          const authString = Buffer.from(`\0${EMAIL_USER}\0${EMAIL_PASS}`).toString('base64');
          send(`AUTH PLAIN ${authString}`);
        } else if (step === 2 && response.startsWith('235')) {
          step = 3;
          send(`MAIL FROM:<${EMAIL_USER}>`);
        } else if (step === 3 && response.startsWith('250')) {
          step = 4;
          send(`RCPT TO:<${to || EMAIL_USER}>`);
        } else if (step === 4 && response.startsWith('250')) {
          step = 5;
          send(`DATA`);
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
          step = 7;
          send(`QUIT`);
          resolve({ success: true, message: 'Email sent successfully via Gmail SMTP (465)' });
        } else if (response.startsWith('5')) {
          reject(new Error(`SMTP Authorization/Delivery Error: ${response.trim()}`));
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API Endpoint for Sending Emails via Gmail SMTP
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
        console.error('SMTP Delivery Error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
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
  console.log(`🚀 BioVerse SMTP Relay Server live at http://localhost:${PORT}`);
  console.log(`📧 Gmail Account: ${EMAIL_USER}`);
  console.log(`🔒 App Password: ${EMAIL_PASS}`);
  console.log(`==================================================\n`);
});
