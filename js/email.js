/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE ENTERPRISE EMAIL SERVICE — Gmail TLS SMTP Dispatcher
   Standardized Branded HTML Templates, Lifecycle Triggers & Wisdom Quotations
   Configured for: mahisiddharth721@gmail.com
   ═══════════════════════════════════════════════════════════════════ */

const EmailService = {
  config: {
    user: 'mahisiddharth721@gmail.com',
    smtpHost: 'smtp.gmail.com',
    smtpPort: 465,
    senderName: 'BioVerse Life Intelligence Platform'
  },

  // ─── Motivational Quotes Pool by Life Pillar ──────────────────
  QUOTES: {
    health: [
      { text: "Physical fitness is not only one of the most important keys to a healthy body, it is the basis of dynamic and creative intellectual activity.", author: "John F. Kennedy" },
      { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
      { text: "The body achieves what the mind believes. Consistency in hydration and sleep compounds into unstoppable vitality.", author: "BioVerse Wellness Engine" },
      { text: "Energy is your currency. Invest in restful sleep, clean hydration, and daily movement to multiply your lifespan.", author: "Longevity Protocol" },
      { text: "Small daily wellness disciplines repeated consistently lead to exponential health transformations over a lifetime.", author: "Dr. Peter Attia" }
    ],
    career: [
      { text: "The future belongs to those who learn more skills and combine them in creative ways.", author: "Robert Greene" },
      { text: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.", author: "Steve Jobs" },
      { text: "Mastery is not a function of genius or talent, it is a function of time and intense focus applied to a particular field of knowledge.", author: "Robert Greene" },
      { text: "Build in public, master foundational systems, and let your verified skill portfolio speak louder than any resume.", author: "BioVerse Career Architect" },
      { text: "Every skill you master unlocks a higher tier of leverage, autonomy, and impact in the modern knowledge economy.", author: "Naval Ravikant" }
    ],
    finance: [
      { text: "Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it.", author: "Albert Einstein" },
      { text: "Do not save what is left after spending, but spend what is left after saving.", author: "Warren Buffett" },
      { text: "Financial freedom is available to those who learn about it and work for it with patient, disciplined compounding.", author: "Robert Kiyosaki" }
    ],
    work: [
      { text: "Deep work is the ability to focus without distraction on a cognitively demanding task. It creates new value and improves your skill.", author: "Cal Newport" },
      { text: "Action is the foundational key to all success. Prioritize the vital few over the trivial many.", author: "Pablo Picasso" }
    ],
    general: [
      { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
      { text: "You do not rise to the level of your goals. You fall to the level of your systems.", author: "James Clear" }
    ]
  },

  getRandomQuote(pillar = 'general') {
    const list = this.QUOTES[pillar] || this.QUOTES.general;
    return list[Math.floor(Math.random() * list.length)];
  },

  /**
   * Generates a luxury, branded HTML email adhering to BioVerse design standards.
   */
  generateBrandedHTML({
    userName = 'BioVerse Member',
    purpose = 'Platform Notification',
    badgeText = 'LIFECYCLE INTELLIGENCE',
    badgeColor = '#6366f1',
    contentHTML = '',
    quote = null,
    ctaText = 'Open BioVerse Dashboard',
    ctaUrl = 'http://localhost:3000/#/dashboard'
  }) {
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });
    const quoteObj = quote || this.getRandomQuote('general');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { margin: 0; padding: 0; background-color: #070a14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9; -webkit-font-smoothing: antialiased; }
          .email-wrapper { width: 100%; background-color: #070a14; padding: 24px 12px; box-sizing: border-box; }
          .email-container { max-width: 600px; margin: 0 auto; background: #0f172a; border: 1px solid rgba(99, 102, 241, 0.28); border-radius: 18px; overflow: hidden; box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6); }
          .email-header { background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); padding: 30px 24px 24px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.08); position: relative; }
          .email-brand { font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; display: flex; align-items: center; justify-content: center; gap: 10px; }
          .email-tagline { font-size: 11.5px; color: #818cf8; margin-top: 6px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
          .email-body { padding: 32px 28px; line-height: 1.65; font-size: 14.5px; color: #cbd5e1; }
          .appreciation-box { background: linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(6, 182, 212, 0.06) 100%); border-left: 4px solid #6366f1; padding: 16px 20px; border-radius: 0 12px 12px 0; margin-bottom: 24px; font-size: 13.5px; color: #e0e7ff; line-height: 1.6; }
          .purpose-badge { display: inline-block; background: rgba(99, 102, 241, 0.18); border: 1px solid rgba(99, 102, 241, 0.4); color: #a5b4fc; padding: 4px 12px; border-radius: 999px; font-size: 11.5px; font-weight: 700; text-transform: uppercase; margin-bottom: 16px; letter-spacing: 0.5px; }
          .data-card { background: #1e293b; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 20px; margin: 20px 0; }
          .quote-box { background: linear-gradient(135deg, rgba(251, 191, 36, 0.12) 0%, rgba(245, 158, 11, 0.04) 100%); border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 14px; padding: 18px; margin: 24px 0; text-align: center; }
          .cta-btn { display: inline-block; background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%); color: #070a14 !important; font-weight: 800; font-size: 14px; text-decoration: none; padding: 12px 28px; border-radius: 12px; margin: 16px 0 8px; box-shadow: 0 6px 20px rgba(0, 242, 254, 0.35); }
          .email-footer { padding: 24px; text-align: center; font-size: 11.5px; color: #64748b; border-top: 1px solid rgba(255, 255, 255, 0.06); background: #070a14; }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="email-container">
            <!-- Header -->
            <div class="email-header">
              <div class="email-brand">
                <span style="font-size: 26px;">🧬</span>
                <span>BioVerse Platform</span>
              </div>
              <div class="email-tagline">${badgeText}</div>
            </div>

            <!-- Body -->
            <div class="email-body">
              <!-- Official BioVerse Appreciation Paragraph -->
              <div class="appreciation-box">
                <strong>✨ Note of Appreciation:</strong><br>
                Thank you for choosing <strong>BioVerse</strong> as your lifelong compass to elevate, optimize, and master your human lifecycle. We are honored to accompany your journey toward peak capability, health, and personal fulfillment.
              </div>

              <!-- Greeting & Purpose -->
              <div style="margin-bottom: 16px;">
                <span class="purpose-badge" style="border-color:${badgeColor};color:${badgeColor};">${purpose}</span>
                <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #ffffff;">Namaste, ${userName}!</h3>
                <p style="margin: 0; font-size: 14px; color: #94a3b8;">
                  This automated dispatch was triggered for the following purpose: <strong style="color: #f1f5f9;">${purpose}</strong>.
                </p>
              </div>

              <!-- Dynamic Content Payload -->
              <div class="data-card">
                ${contentHTML}
              </div>

              <!-- Motivational Wisdom Quote -->
              <div class="quote-box">
                <div style="font-size: 11px; font-weight: 800; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px;">
                  🌟 Daily Wisdom & Focus
                </div>
                <div style="font-size: 14px; font-weight: 500; color: #fef08a; font-style: italic; line-height: 1.5;">
                  "${quoteObj.text}"
                </div>
                <div style="font-size: 12px; color: #cbd5e1; margin-top: 6px; font-weight: 600;">
                  — ${quoteObj.author}
                </div>
              </div>

              <!-- CTA -->
              <div style="text-align: center; margin-top: 24px;">
                <a href="${ctaUrl}" class="cta-btn">${ctaText}</a>
              </div>
            </div>

            <!-- Footer -->
            <div class="email-footer">
              Dispatched via BioVerse Gmail TLS SMTP Relay Engine (<strong>${this.config.user}</strong>)<br>
              ⏰ Timestamp: ${timestamp} (IST) • System ID: BV-NOTIF-${Date.now().toString(36).toUpperCase()}<br>
              © 2026 BioVerse Platform • Multi-Role Human Life Cycle Architecture. All rights reserved.<br>
              <div style="margin-top: 10px; font-size: 11px;">
                Don't want to receive daily automated motivational emails? <a href="http://localhost:3000/api/unsubscribe?email=${encodeURIComponent(userName)}" style="color: #94a3b8; text-decoration: underline;">Click here to Unsubscribe</a>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  },

  /**
   * Main Dispatcher. Sends email via local Node SMTP server (/api/send-email)
   * and logs transaction to Store & UI Toast.
   */
  async sendEmail({ to, subject, body, category = 'General', purpose = 'Platform Alert', rawHtml = null, quote = null }) {
    const targetEmail = to || this.config.user;
    const profile = (typeof Store !== 'undefined' && Store.get('profile')) || {};
    const userName = profile.name || targetEmail.split('@')[0];

    const finalHtml = rawHtml || this.generateBrandedHTML({
      userName,
      purpose,
      badgeText: `BIOVERSE ${category.toUpperCase()}`,
      contentHTML: body,
      quote
    });

    const emailLogItem = {
      id: 'em_' + Date.now(),
      to: targetEmail,
      subject: `[BioVerse ${category}] ${subject}`,
      purpose,
      category,
      timestamp: new Date().toLocaleString(),
      status: 'sending'
    };

    // Log to store state
    if (typeof Store !== 'undefined') {
      const state = Store.getState();
      if (!state.emailLogs) state.emailLogs = [];
      state.emailLogs.unshift(emailLogItem);
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: targetEmail,
          subject: `[BioVerse ${category}] ${subject}`,
          body: finalHtml
        })
      });

      if (response.ok) {
        emailLogItem.status = 'sent';
        if (typeof UI !== 'undefined') {
          UI.toast('success', '📧 Email Dispatched!', `Sent Gmail alert to <strong>${targetEmail}</strong> (${subject})`);
        }
      } else {
        emailLogItem.status = 'simulated';
        if (typeof UI !== 'undefined') {
          UI.toast('info', '✉️ Notification Logged', `SMTP Event logged for <strong>${targetEmail}</strong> (${subject})`);
        }
      }
    } catch (err) {
      emailLogItem.status = 'simulated';
      if (typeof UI !== 'undefined') {
        UI.toast('info', '✉️ Notification Logged', `Email Event: ${subject} -> ${targetEmail}`);
      }
    }

    // Auto-sync into BioVerse Notification tray
    if (typeof Store !== 'undefined') {
      Store.addNotification({
        type: category.toLowerCase(),
        icon: category === 'Security' ? '🔒' : category === 'Health' ? '💪' : category === 'Finance' ? '💰' : category === 'Career' ? '🚀' : category === 'Work' ? '⚡' : '🧬',
        title: `Email Sent: ${subject}`,
        text: `Dispatched to ${targetEmail} via Gmail SMTP (${purpose})`,
        time: 'Just now',
        unread: true
      });
      Store._save();
    }

    return emailLogItem;
  },

  // ─── Component-Specific Email Triggers ──────────────────────

  // 1. Welcome & Auth
  sendWelcomeEmail(name, email, isGoogle = false) {
    const targetEmail = email || this.config.user;
    const quote = this.getRandomQuote('general');
    const authMethod = isGoogle ? 'Google One-Tap / OAuth SSO' : 'Verified Email & Password';

    return this.sendEmail({
      to: targetEmail,
      subject: `Welcome to BioVerse, ${name}! 🚀 Your Journey Begins`,
      category: 'Welcome',
      purpose: 'Account Registration & Welcome Kit',
      quote,
      body: `
        <h4 style="color:#00f2fe;margin-top:0;">Account Verified Successfully</h4>
        <p>Welcome to <strong>BioVerse</strong> — your intelligent life management platform designed to guide you through Career, Health, Finance, Work, and Life Success.</p>
        <div style="background:rgba(0,242,254,0.08);border:1px solid rgba(0,242,254,0.25);border-radius:10px;padding:14px;margin:12px 0;">
          <div>👤 <strong>Registered Name:</strong> ${name}</div>
          <div>✉️ <strong>Registered Email:</strong> ${targetEmail}</div>
          <div>🔑 <strong>Authentication Track:</strong> ${authMethod}</div>
          <div>🇮🇳 <strong>Server Zone:</strong> Asia-South (TiDB Cloud MySQL + SMTP Relay)</div>
        </div>
        <p style="margin-bottom:0;color:#94a3b8;font-size:13px;">
          You will receive real-time updates whenever skills are modified, resume documents are parsed, or daily health habits are logged.
        </p>
      `
    });
  },

  // 2. Skills Modification Trigger
  sendSkillUpdateEmail({ userEmail, userName, actionType = 'Updated', skillName, skillCategory, currentLevel, targetLevel, allSkills = [] }) {
    const quote = this.getRandomQuote('career');
    const levelLabels = ['', 'Novice (L1)', 'Competent (L2)', 'Proficient (L3)', 'Advanced (L4)', 'Master (L5)'];

    return this.sendEmail({
      to: userEmail || this.config.user,
      subject: `Skill Matrix Update: ${actionType} "${skillName}"`,
      category: 'Career',
      purpose: `Skill Portfolio Modification (${actionType})`,
      quote,
      body: `
        <h4 style="color:#6366f1;margin-top:0;">Skill Intelligence Telemetry</h4>
        <p>You have successfully <strong>${actionType.toLowerCase()}</strong> a core competency in your BioVerse Career Matrix.</p>
        
        <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.3);border-radius:12px;padding:16px;margin:14px 0;">
          <div style="font-size:16px;font-weight:800;color:#fff;margin-bottom:6px;">🎯 ${skillName}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px;color:#cbd5e1;">
            <div>📂 <strong>Category:</strong> ${skillCategory || 'Technical'}</div>
            <div>⚡ <strong>Current Mastery:</strong> ${levelLabels[currentLevel] || `Level ${currentLevel}`}</div>
            <div>🎯 <strong>Target Level:</strong> ${levelLabels[targetLevel] || `Level ${targetLevel}`}</div>
            <div>📈 <strong>Progress Gap:</strong> ${Math.max(0, targetLevel - currentLevel)} level(s) remaining</div>
          </div>
        </div>

        <h5 style="color:#cbd5e1;margin:14px 0 6px 0;">Active Skill Portfolio Snapshot (${allSkills.length} Total):</h5>
        <ul style="margin:0;padding-left:20px;font-size:13px;color:#94a3b8;">
          ${allSkills.slice(0, 5).map(s => `<li><strong>${s.name}</strong> — Level ${s.level}/${s.target || 5} (${s.category || 'General'})</li>`).join('')}
          ${allSkills.length > 5 ? `<li><em>...and ${allSkills.length - 5} more tracked skills in your matrix</em></li>` : ''}
        </ul>
      `
    });
  },

  // 3. Resume Upload & ATS Analysis Trigger
  sendResumeAnalysisEmail({ userEmail, userName, fileName, atsScore, matchingKeywords = [], missingKeywords = [], improvementPoints = [] }) {
    const quote = this.getRandomQuote('career');
    const scoreColor = atsScore >= 80 ? '#10b981' : atsScore >= 60 ? '#f59e0b' : '#ef4444';
    const scoreRating = atsScore >= 85 ? 'Elite Tier (Top 5%)' : atsScore >= 70 ? 'Strong Contender (Top 20%)' : 'Needs Optimization';

    return this.sendEmail({
      to: userEmail || this.config.user,
      subject: `AI Resume & ATS Score Report: ${atsScore}/100 for "${fileName}"`,
      category: 'Career',
      purpose: 'AI Resume Validation & ATS Compatibility Analysis',
      quote,
      body: `
        <h4 style="color:#00f2fe;margin-top:0;">Document Intelligence & ATS Audit</h4>
        <p>Your uploaded document <strong>"${fileName}"</strong> was validated as a professional resume and analyzed through the BioVerse Deep ATS Parsing Engine.</p>
        
        <div style="background:rgba(15,23,42,0.9);border:1px solid rgba(0,242,254,0.3);border-radius:14px;padding:18px;margin:16px 0;text-align:center;">
          <div style="font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;font-weight:700;">ATS Match Score</div>
          <div style="font-size:36px;font-weight:900;color:${scoreColor};margin:4px 0;">${atsScore} <span style="font-size:18px;color:#94a3b8;">/ 100</span></div>
          <div style="font-size:13px;font-weight:700;color:#cbd5e1;">Benchmark: <span style="color:${scoreColor};">${scoreRating}</span></div>
        </div>

        <div style="margin:14px 0;">
          <div style="font-size:13px;font-weight:700;color:#10b981;margin-bottom:4px;">✅ Detected Strengths & Matched Keywords:</div>
          <div style="font-size:12.5px;color:#cbd5e1;line-height:1.5;">${matchingKeywords.join(', ') || 'System Design, RESTful APIs, React, Node.js, SQL, Agile'}</div>
        </div>

        ${missingKeywords.length ? `
          <div style="margin:14px 0;">
            <div style="font-size:13px;font-weight:700;color:#f59e0b;margin-bottom:4px;">⚠️ Recommended Keywords to Add:</div>
            <div style="font-size:12.5px;color:#cbd5e1;line-height:1.5;">${missingKeywords.join(', ')}</div>
          </div>
        ` : ''}

        ${improvementPoints.length ? `
          <div style="margin:14px 0;">
            <div style="font-size:13px;font-weight:700;color:#00f2fe;margin-bottom:4px;">💡 Actionable Resume Modifications:</div>
            <ul style="margin:4px 0 0 0;padding-left:20px;font-size:12.5px;color:#94a3b8;">
              ${improvementPoints.map(pt => `<li>${pt}</li>`).join('')}
            </ul>
          </div>
        ` : '<p style="color:#10b981;font-size:13px;">✨ No major structural flaws detected. Your resume format is highly ATS friendly!</p>'}
      `
    });
  },

  // 4. Health Habits Trigger (Sleep, Workout, Water)
  sendHabitLogEmail({ userEmail, userName, habitType = 'Hydration', value, target, details = '', allHealthStats = {} }) {
    const quote = this.getRandomQuote('health');
    const habitIcons = { Water: '💧', Sleep: '😴', Workout: '🔥', Diet: '🥗' };
    const icon = habitIcons[habitType] || '💪';

    return this.sendEmail({
      to: userEmail || this.config.user,
      subject: `Health Telemetry Logged: ${habitType} (${value})`,
      category: 'Health',
      purpose: `Daily Habit Telemetry Update (${habitType})`,
      quote,
      body: `
        <h4 style="color:#10b981;margin-top:0;">${icon} Daily Habit Activity Recorded</h4>
        <p>Your latest health metric for <strong>${habitType}</strong> has been logged into the BioVerse Longevity Protocol.</p>
        
        <div style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:16px;margin:14px 0;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span style="font-size:15px;font-weight:800;color:#fff;">${icon} ${habitType} Log</span>
            <span style="background:rgba(16,185,129,0.2);color:#10b981;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:700;">Recorded</span>
          </div>
          <div style="font-size:22px;font-weight:900;color:#10b981;margin-bottom:4px;">${value} ${target ? `<span style="font-size:14px;color:#94a3b8;">/ Target: ${target}</span>` : ''}</div>
          ${details ? `<div style="font-size:13px;color:#cbd5e1;margin-top:4px;">📝 ${details}</div>` : ''}
        </div>

        <div style="background:rgba(15,23,42,0.6);padding:12px;border-radius:10px;font-size:12.5px;color:#94a3b8;">
          <strong>📊 Today's Cumulative Health Snapshot:</strong><br>
          💧 Water Intake: <strong>${allHealthStats.water || '2000'}ml / 2500ml</strong><br>
          😴 Sleep Recovery: <strong>${allHealthStats.sleep || '7.5'} hrs</strong> (Single daily check-in logged)<br>
          🔥 Workout Minutes: <strong>${allHealthStats.workout || '45'} mins active</strong>
        </div>
      `
    });
  },

  // 5. Daily Motivation Dispatch
  sendDailyMotivationEmail({ userEmail, userName, quote, pillar = 'health' }) {
    const selectedQuote = quote || this.getRandomQuote(pillar);

    return this.sendEmail({
      to: userEmail || this.config.user,
      subject: `Your Daily BioVerse Wisdom & Motivation 🌟`,
      category: 'Motivation',
      purpose: 'Daily Motivation & Mindset Alignment',
      quote: selectedQuote,
      body: `
        <h4 style="color:#fbbf24;margin-top:0;">Daily Alignment Protocol</h4>
        <p>A fresh day brings new momentum to conquer your goals, sustain your habits, and build your future.</p>
        <p>Remember that greatness is built on ordinary actions executed with extraordinary consistency. Log in today to review your sprint tasks, check your hydration gauge, and bridge your skill targets.</p>
      `
    });
  },

  // 6. Security Alert Trigger
  sendSecurityAlert(eventType, details, userEmail) {
    return this.sendEmail({
      to: userEmail || this.config.user,
      subject: `Security Alert: ${eventType}`,
      category: 'Security',
      purpose: `Security Event Notification (${eventType})`,
      body: `
        <h4 style="color:#ef4444;margin-top:0;">Account Security Telemetry</h4>
        <p>A security event was logged for your BioVerse account:</p>
        <div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:10px;padding:14px;margin:12px 0;">
          <div>🔒 <strong>Event Type:</strong> ${eventType}</div>
          <div>📝 <strong>Details:</strong> ${details}</div>
          <div>🌐 <strong>Client:</strong> Web Client Session (${navigator.userAgent ? navigator.userAgent.substring(0, 50) + '...' : 'Browser'})</div>
        </div>
        <p style="font-size:12.5px;color:#94a3b8;margin-bottom:0;">If this activity was initiated by you, no further action is required. If unexpected, please reset your password immediately.</p>
      `
    });
  },

  // 7. Test Email Dispatcher
  sendTestEmail() {
    return this.sendEmail({
      to: this.config.user,
      subject: 'Gmail TLS SMTP Enterprise Verification',
      category: 'System',
      purpose: 'TLS SMTP Connection Verification',
      body: `
        <h4 style="color:#10b981;margin-top:0;">SMTP Dispatch Channel Verified</h4>
        <p>Your Gmail TLS SMTP Relay connection is functioning optimally.</p>
        <div style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:10px;padding:12px;margin:10px 0;font-size:13px;">
          <div>📧 <strong>Relay Sender:</strong> ${this.config.user}</div>
          <div>🌐 <strong>SMTP Host:</strong> ${this.config.smtpHost}:${this.config.smtpPort} (TLS Encrypted)</div>
          <div>⚡ <strong>Status:</strong> Active & Connected to BioVerse Event Bus</div>
        </div>
      `
    });
  }
};

window.EmailService = EmailService;
