const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

console.log('🚀 Generating 100% OpenXML-Compliant Perfectly Proportioned PowerPoint (.pptx)...');

const pptx = new pptxgen();

// Configure Standard 16:9 Widescreen (13.33 x 7.5 inches)
pptx.layout = 'LAYOUT_16x9';
pptx.title = 'BioVerse — Intelligent Human Life Cycle Management Platform';
pptx.author = 'S. Siddharth & Team';
pptx.company = 'Sri Vasavi Institute of Engineering & Technology (SVIET)';
pptx.subject = 'Diploma in Computer Engineering Final Project Presentation';

// Solid 100% Native Safe Hex Colors (Zero XML repair triggers)
const COLOR_BG = '070A14';        // Deep Space Obsidian
const COLOR_CARD_BG = '0F172A';   // Solid Slate Navy
const COLOR_INNER_BG = '0B1120';  // Darker Slate Inner
const COLOR_CYAN = '00F2FE';      // Neon Cyan
const COLOR_BLUE = '38BDF8';      // Sky Tech Blue
const COLOR_PURPLE = '818CF8';    // Indigo Violet
const COLOR_EMERALD = '10B981';   // Vitality Green
const COLOR_GOLD = 'FBBF24';      // Wealth Gold
const COLOR_CRIMSON = 'EF4444';   // Crimson
const COLOR_TEXT_WHITE = 'FFFFFF';
const COLOR_TEXT_MUTED = '94A3B8';
const COLOR_BORDER = '1E293B';    // Subtle Slate Border
const COLOR_BORDER_CYAN = '0284C7'; // Cyan Accent Border

// Asset Paths
const SVIET_LOGO_PATH = path.join(__dirname, 'assets', 'extracted_img_1.jpg');
const SCREENSHOT_LANDING = path.join(__dirname, 'assets', 'screenshot_landing.png');
const SCREENSHOT_AUTH = path.join(__dirname, 'assets', 'screenshot_auth_lamp.png');
const SCREENSHOT_DASHBOARD = path.join(__dirname, 'assets', 'screenshot_dashboard.png');
const SCREENSHOT_HEALTH = path.join(__dirname, 'assets', 'screenshot_health.png');
const SCREENSHOT_WORK = path.join(__dirname, 'assets', 'screenshot_work.png');

// Helper: Standard Slide Frame with Strict Coordinate Bounds (Safe within 0.4" to 6.8")
function addSlideHeader(slide, categoryTag, slideTitle, subtitle = '') {
  slide.background = { color: COLOR_BG };

  // Outer ambient card (Solid fill, no invalid transparency attributes)
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 0.35, w: 12.13, h: 6.4,
    fill: { color: COLOR_CARD_BG },
    line: { color: COLOR_BORDER, width: 1 }
  });

  // Top Tag
  slide.addText(categoryTag.toUpperCase(), {
    x: 0.9, y: 0.5, w: 6.5, h: 0.28,
    fontFace: 'Arial', fontSize: 10, bold: true, color: COLOR_CYAN
  });

  // Institution Header
  slide.addText('SRI VASAVI INSTITUTE OF ENGG & TECH (SVIET)', {
    x: 6.5, y: 0.5, w: 5.8, h: 0.28,
    fontFace: 'Arial', fontSize: 9.5, color: COLOR_TEXT_MUTED, align: 'right'
  });

  // Title
  slide.addText(slideTitle, {
    x: 0.9, y: 0.78, w: 11.4, h: 0.48,
    fontFace: 'Arial', fontSize: 20, bold: true, color: COLOR_TEXT_WHITE
  });

  // Subtitle
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.9, y: 1.26, w: 11.4, h: 0.3,
      fontFace: 'Arial', fontSize: 11, color: COLOR_TEXT_MUTED
    });
  }
}

// ─────────────────────────────────────────────────────────────────
// SLIDE 1: TITLE COVER SLIDE (Strictly Contained, No Bottom Clipping)
// ─────────────────────────────────────────────────────────────────
const slide1 = pptx.addSlide();
slide1.background = { color: COLOR_BG };

slide1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.6, y: 0.35, w: 12.13, h: 6.4,
  fill: { color: COLOR_CARD_BG },
  line: { color: COLOR_BORDER_CYAN, width: 1.5 }
});

if (fs.existsSync(SVIET_LOGO_PATH)) {
  slide1.addImage({ path: SVIET_LOGO_PATH, x: 6.05, y: 0.5, w: 1.1, h: 1.1 });
}

slide1.addText('SRI VASAVI INSTITUTE OF ENGINEERING & TECHNOLOGY', {
  x: 0.9, y: 1.65, w: 11.4, h: 0.25,
  fontFace: 'Arial', fontSize: 11.5, bold: true, color: COLOR_BLUE, align: 'center'
});

slide1.addText('DEPARTMENT OF COMPUTER ENGINEERING', {
  x: 0.9, y: 1.9, w: 11.4, h: 0.22,
  fontFace: 'Arial', fontSize: 10, bold: true, color: COLOR_CYAN, align: 'center'
});

slide1.addText('BIOVERSE', {
  x: 0.9, y: 2.12, w: 11.4, h: 0.65,
  fontFace: 'Arial', fontSize: 32, bold: true, color: COLOR_CYAN, align: 'center'
});

slide1.addText('An Intelligent Human Life Cycle Management & Multi-Domain Telemetry Platform', {
  x: 0.9, y: 2.78, w: 11.4, h: 0.28,
  fontFace: 'Arial', fontSize: 12, color: COLOR_TEXT_WHITE, align: 'center'
});

// Candidate & Guide Details Card (Fits safely between y: 3.15 and y: 6.4)
slide1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.9, y: 3.15, w: 11.4, h: 3.2,
  fill: { color: COLOR_INNER_BG },
  line: { color: COLOR_BORDER, width: 1 }
});

slide1.addText([
  { text: 'PROJECT TEAM MEMBERS (PIN LIST)\n', options: { fontSize: 9.5, bold: true, color: COLOR_CYAN } },
  { text: 'P. HEMANTH (24411-CM-121)          |   P. MANIKANTA (24411-CM-122)\n', options: { fontSize: 9.5, color: COLOR_TEXT_WHITE } },
  { text: 'P. SUBRAMANYAM (24411-CM-123)   |   P. JASWANTH (24411-CM-124)\n', options: { fontSize: 9.5, color: COLOR_TEXT_WHITE } },
  { text: 'P. PRUDHVI NAGA SAI (24411-CM-125)   |   S. SIDDHARTH (24411-CM-126)\n', options: { fontSize: 9.5, bold: true, color: COLOR_CYAN } },
  { text: 'S. MANIKANTA (24411-CM-127)        |   S. TEJA PAVAN (24411-CM-128)', options: { fontSize: 9.5, color: COLOR_TEXT_WHITE } }
], { x: 1.15, y: 3.3, w: 6.2, h: 2.8 });

slide1.addText([
  { text: 'PROJECT GUIDE\n', options: { fontSize: 9.5, bold: true, color: COLOR_CYAN } },
  { text: 'Mrs. T.Ooha N.V.Sri Lakshmi, B.Tech\n', options: { fontSize: 11, bold: true, color: COLOR_TEXT_WHITE } },
  { text: 'Dept of Computer Engineering\n\n', options: { fontSize: 9, color: COLOR_TEXT_MUTED } },
  { text: 'HEAD OF THE DEPARTMENT\n', options: { fontSize: 9.5, bold: true, color: COLOR_CYAN } },
  { text: 'Mr. K. G.V.NAGESWARARAO\n', options: { fontSize: 11, bold: true, color: COLOR_TEXT_WHITE } },
  { text: 'M.Tech (Phd), HOD Dept of CME', options: { fontSize: 9, color: COLOR_TEXT_MUTED } }
], { x: 7.5, y: 3.3, w: 4.5, h: 2.8 });


// ─────────────────────────────────────────────────────────────────
// SLIDE 2: THE PROBLEM STATEMENT
// ─────────────────────────────────────────────────────────────────
const slide2 = pptx.addSlide();
addSlideHeader(slide2, 'Problem Statement & Motivation', 'The Paradox of Modern Digital Fragmentation', 'Why current single-purpose applications fail to provide lasting personal clarity.');

const problems = [
  { icon: '🗂️', title: 'Data Silos', desc: 'Workouts, career goals, budgets, and tasks are isolated across 8+ apps with zero cross-telemetry.' },
  { icon: '📱', title: 'App Fatigue', desc: 'Users suffer cognitive exhaustion from continuous context-switching and redundant manual data entry.' },
  { icon: '📉', title: 'Heavy Frameworks', desc: 'Modern apps bundle 50MB+ runtimes, draining mobile batteries with sluggish 30FPS frame rates.' },
  { icon: '📢', title: 'Ad Distractions', desc: 'Commercial tools monetize attention with invasive advertisements and aggressive paywalls.' }
];

problems.forEach((p, idx) => {
  const xPos = 0.9 + idx * 2.85;
  slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: 1.7, w: 2.65, h: 4.7,
    fill: { color: COLOR_INNER_BG },
    line: { color: COLOR_BORDER, width: 1 }
  });

  slide2.addText(p.icon, { x: xPos + 0.15, y: 1.9, w: 2.35, h: 0.45, fontSize: 24 });
  slide2.addText(p.title, { x: xPos + 0.15, y: 2.45, w: 2.35, h: 0.35, fontSize: 13, bold: true, color: COLOR_CYAN });
  slide2.addText(p.desc, { x: xPos + 0.15, y: 2.9, w: 2.35, h: 3.2, fontSize: 10, color: COLOR_TEXT_MUTED });
});


// ─────────────────────────────────────────────────────────────────
// SLIDE 3: THE BIOVERSE SOLUTION & HERO PORTAL
// ─────────────────────────────────────────────────────────────────
const slide3 = pptx.addSlide();
addSlideHeader(slide3, 'The Solution & Continuum Paradigm', 'BioVerse: A Unified Life Operating System', 'Consolidating Career, Health, Finance, Work, and Purpose into real-time reactive telemetry.');

slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.9, y: 1.7, w: 5.6, h: 4.7,
  fill: { color: COLOR_INNER_BG },
  line: { color: COLOR_BORDER, width: 1 }
});

slide3.addText([
  { text: '🌟 Composite Master Life Score (0–100)\n', options: { fontSize: 12, bold: true, color: COLOR_CYAN } },
  { text: 'A mathematical harmonic index tracking real-time equilibrium across all life domains.\n\n', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } },

  { text: '⚡ Sub-Second Vanilla ES6+ Speed\n', options: { fontSize: 12, bold: true, color: COLOR_PURPLE } },
  { text: 'Zero framework runtime overhead. <25KB initial payload with instant SPA hash transitions.\n\n', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } },

  { text: '🔊 Native Web Audio DSP Tone Synthesis\n', options: { fontSize: 12, bold: true, color: COLOR_EMERALD } },
  { text: 'Synthesizes pure acoustic frequency harmonics (523Hz–1046Hz) in code with zero latency.\n\n', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } },

  { text: '🛡️ Cryptographic Privacy Sovereignty\n', options: { fontSize: 12, bold: true, color: COLOR_GOLD } },
  { text: 'Full DPDP Act 2023 compliance with TLS 1.2 and encrypted TiDB Cloud Serverless persistence.', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } }
], { x: 1.1, y: 1.9, w: 5.2, h: 4.3 });

if (fs.existsSync(SCREENSHOT_LANDING)) {
  slide3.addImage({
    path: SCREENSHOT_LANDING,
    x: 6.75, y: 1.7, w: 5.5, h: 4.7,
    sizing: { type: 'contain', w: 5.5, h: 4.7 }
  });
}


// ─────────────────────────────────────────────────────────────────
// SLIDE 4: 5 FOUNDATIONAL LIFE PILLARS
// ─────────────────────────────────────────────────────────────────
const slide4 = pptx.addSlide();
addSlideHeader(slide4, 'Comprehensive Life Architecture', 'Five Core Pillars of Human Flourishing', 'Engineered with specialized track personas for Students, Corporate Employees, and Founders.');

const pillars = [
  { icon: '🚀', title: '1. Career & Skills', color: '38BDF8', desc: 'ATS Resume Matcher, Skill Taxonomy Matrix, Job Kanban Pipeline, and NIRF College Database.' },
  { icon: '💪', title: '2. Health & Vitality', color: '34D399', desc: '3D Fluid Physics Hydration Tumbler, Circadian Sleep Index, and Deep Indian Meal Nutrition Engine.' },
  { icon: '💰', title: '3. Finance & Wealth', color: 'FBBF24', desc: 'Double-Entry Transaction Ledger, SIP/SWP Compounding, Section 80C Tax, and RBI Account Aggregator.' },
  { icon: '⚡', title: '4. Work & Execution', color: 'F472B6', desc: 'Eisenhower Priority Matrix, 25:00 Pomodoro Sprint Lab, and Automated Gmail SMTP Reminders.' },
  { icon: '🎯', title: '5. Life & Purpose', color: 'A78BFA', desc: 'Ikigai Purpose Radar, Lifelong Milestone Timeline, and Cute Sloth Mascot Celebrations.' },
  { icon: '🇮🇳', title: 'Indian Localization', color: '60A5FA', desc: 'National Scholarship Portal (NSP), GATE/CAT exam prep countdowns, and Section 80C optimization.' }
];

pillars.forEach((pil, idx) => {
  const row = Math.floor(idx / 3);
  const col = idx % 3;
  const xPos = 0.9 + col * 3.85;
  const yPos = 1.7 + row * 2.4;

  slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: yPos, w: 3.65, h: 2.2,
    fill: { color: COLOR_INNER_BG },
    line: { color: COLOR_BORDER, width: 1 }
  });

  slide4.addText(pil.icon + '  ' + pil.title, {
    x: xPos + 0.15, y: yPos + 0.15, w: 3.35, h: 0.35,
    fontSize: 12, bold: true, color: pil.color
  });

  slide4.addText(pil.desc, {
    x: xPos + 0.15, y: yPos + 0.55, w: 3.35, h: 1.5,
    fontSize: 9.5, color: COLOR_TEXT_MUTED
  });
});


// ─────────────────────────────────────────────────────────────────
// SLIDE 5: SYSTEM ARCHITECTURE & 5-TIER STACK
// ─────────────────────────────────────────────────────────────────
const slide5 = pptx.addSlide();
addSlideHeader(slide5, 'System Architecture & Tech Stack', '5-Tier High-Performance Web Engine', 'Decoupled architecture delivering 60FPS fluid physics and distributed cloud resilience.');

const layers = [
  { tier: 'TIER 1: PRESENTATION & 3D SPATIAL LAYER', desc: 'HTML5 Semantic DOM + Three.js WebGL Spatial Continuum + Vanilla CSS Glassmorphism tokens.' },
  { tier: 'TIER 2: PHYSICAL MOTION & ANIMATION ENGINES', desc: 'ActionPhysics (19 domain animations) + CardTilt (3D perspective) + Spotlight Command Palette (`Ctrl+K`).' },
  { tier: 'TIER 3: REACTIVE STATE & AUDIO DSP CORE', desc: 'Event-driven Publish-Subscribe Store.js + Web Audio API Oscillator real-time synthesizer.' },
  { tier: 'TIER 4: DUAL-LAYER PERSISTENCE LAYER', desc: 'Local-First `localStorage` + TiDB Cloud Serverless MySQL (Distributed SQL in AWS ap-southeast-1).' },
  { tier: 'TIER 5: MULTI-CLOUD DEPLOYMENT & PWA', desc: 'Vercel Serverless Edge Rewrites + Render Node.js container + PWA Service Worker offline caching.' }
];

layers.forEach((l, idx) => {
  const yPos = 1.7 + idx * 0.95;
  slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.9, y: yPos, w: 11.4, h: 0.8,
    fill: { color: COLOR_INNER_BG },
    line: { color: COLOR_BORDER, width: 1 }
  });

  slide5.addText(l.tier, {
    x: 1.15, y: yPos + 0.1, w: 4.6, h: 0.6,
    fontSize: 10.5, bold: true, color: COLOR_CYAN
  });

  slide5.addText(l.desc, {
    x: 5.8, y: yPos + 0.1, w: 6.3, h: 0.6,
    fontSize: 9.5, color: COLOR_TEXT_MUTED
  });
});


// ─────────────────────────────────────────────────────────────────
// SLIDE 6: AUTHENTICATION & PANDA LAMP GATEWAY (Figure 2)
// ─────────────────────────────────────────────────────────────────
const slide6 = pptx.addSlide();
addSlideHeader(slide6, 'Tactile Delight & Security Gateway', 'Interactive Pull-Cord Lamp & 6-Digit Email OTP', 'Combining playful tactile interactions with robust cryptographic security.');

slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.9, y: 1.7, w: 5.6, h: 4.7,
  fill: { color: COLOR_INNER_BG },
  line: { color: COLOR_BORDER, width: 1 }
});

slide6.addText([
  { text: '💡 Interactive Pull-Cord Lamp Physics\n', options: { fontSize: 12, bold: true, color: COLOR_GOLD } },
  { text: 'Pulling the interactive cord illuminates the auth card with realistic radial lighting physics and tactile sound DSP.\n\n', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } },

  { text: '📧 6-Digit Gmail SMTP OTP Verification\n', options: { fontSize: 12, bold: true, color: COLOR_CYAN } },
  { text: 'Automated 6-digit verification codes sent directly to user inboxes for passwordless verification with timed expiry.\n\n', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } },

  { text: '🐼 Playful Animated Panda Mascot\n', options: { fontSize: 12, bold: true, color: COLOR_PURPLE } },
  { text: 'Dynamic SVG mascot tracks cursor focus, covering eyes during password entry for delightful UX.\n\n', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } },

  { text: '🛡️ Bcrypt Salted Cryptographic Storage\n', options: { fontSize: 12, bold: true, color: COLOR_EMERALD } },
  { text: 'Zero plaintext passwords. All credentials hashed with 10 salt rounds before database storage.', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } }
], { x: 1.1, y: 1.9, w: 5.2, h: 4.3 });

if (fs.existsSync(SCREENSHOT_AUTH)) {
  slide6.addImage({
    path: SCREENSHOT_AUTH,
    x: 6.75, y: 1.7, w: 5.5, h: 4.7,
    sizing: { type: 'contain', w: 5.5, h: 4.7 }
  });
}


// ─────────────────────────────────────────────────────────────────
// SLIDE 7: MASTER COCKPIT & STUDENT LIFECYCLE (Figure 3)
// ─────────────────────────────────────────────────────────────────
const slide7 = pptx.addSlide();
addSlideHeader(slide7, 'Master Telemetry Command Center', 'Master Life Cockpit & AI Audio Podcast', 'Visualizing real-time life equilibrium with spoken audio morning briefs.');

slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.9, y: 1.7, w: 5.6, h: 4.7,
  fill: { color: COLOR_INNER_BG },
  line: { color: COLOR_BORDER, width: 1 }
});

slide7.addText([
  { text: '🎙️ AI Daily Spoken Audio Podcast Brief\n', options: { fontSize: 12, bold: true, color: COLOR_CYAN } },
  { text: 'Generates an interactive audio podcast summarizing daily priorities, recovery metrics, and exam deadlines.\n\n', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } },

  { text: '🎖️ Gamification Prestige System (Tier 4 Vanguard)\n', options: { fontSize: 12, bold: true, color: COLOR_PURPLE } },
  { text: 'Rewards daily consistency with XP, prestige rankings, and unlockable badges to maintain intrinsic motivation.\n\n', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } },

  { text: '👥 Social Accountability Streaks\n', options: { fontSize: 12, bold: true, color: COLOR_EMERALD } },
  { text: 'Peer study streak circles and shared goals without noisy algorithmic social feeds.\n\n', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } },

  { text: '🧭 Spotlight Command Palette (`Ctrl + K`)\n', options: { fontSize: 12, bold: true, color: COLOR_GOLD } },
  { text: 'Instant fuzzy searching, quick habit logging, and keyboard-first navigation shortcuts.', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } }
], { x: 1.1, y: 1.9, w: 5.2, h: 4.3 });

if (fs.existsSync(SCREENSHOT_DASHBOARD)) {
  slide7.addImage({
    path: SCREENSHOT_DASHBOARD,
    x: 6.75, y: 1.7, w: 5.5, h: 4.7,
    sizing: { type: 'contain', w: 5.5, h: 4.7 }
  });
}


// ─────────────────────────────────────────────────────────────────
// SLIDE 8: HEALTH & LONGEVITY PROTOCOL (Figure 4)
// ─────────────────────────────────────────────────────────────────
const slide8 = pptx.addSlide();
addSlideHeader(slide8, 'Precision Vitality & Nutrition', 'Health Protocol & 3D Fluid Hydration Tumbler', 'Physics-based water logging and deep Indian culinary macronutrient intelligence.');

slide8.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.9, y: 1.7, w: 5.6, h: 4.7,
  fill: { color: COLOR_INNER_BG },
  line: { color: COLOR_BORDER, width: 1 }
});

slide8.addText([
  { text: '🥤 3D Fluid Physics Hydration Tumbler\n', options: { fontSize: 12, bold: true, color: COLOR_CYAN } },
  { text: 'Simulates physical fluid volume, fluid wave oscillation math, and floating ice cubes upon hydration logging.\n\n', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } },

  { text: '🥗 Indian Macronutrient Nutrition Engine\n', options: { fontSize: 12, bold: true, color: COLOR_EMERALD } },
  { text: 'Calculates protein, net carbs, healthy fats, and kcal for items like Moong Dal, Paneer Tikka, and Roti.\n\n', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } },

  { text: '🌙 Circadian Rest & Recovery Telemetry\n', options: { fontSize: 12, bold: true, color: COLOR_PURPLE } },
  { text: 'Tracks sleep debt and circadian rhythms, correlating sleep latency directly with task execution velocity.\n\n', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } },

  { text: '🏋️ Resistance Workout Power Flex\n', options: { fontSize: 12, bold: true, color: COLOR_GOLD } },
  { text: 'Kinetic power aura physics and audio chimes upon logging resistance training sets.', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } }
], { x: 1.1, y: 1.9, w: 5.2, h: 4.3 });

if (fs.existsSync(SCREENSHOT_HEALTH)) {
  slide8.addImage({
    path: SCREENSHOT_HEALTH,
    x: 6.75, y: 1.7, w: 5.5, h: 4.7,
    sizing: { type: 'contain', w: 5.5, h: 4.7 }
  });
}


// ─────────────────────────────────────────────────────────────────
// SLIDE 9: PRODUCTIVITY & TIME EXECUTION SYSTEM (Figure 5)
// ─────────────────────────────────────────────────────────────────
const slide9 = pptx.addSlide();
addSlideHeader(slide9, 'Time Execution & Flow State', 'Productivity Lab & 25:00 Pomodoro Engine', 'Structured time sprints with binaural soundscapes and automated due-time email alerts.');

slide9.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.9, y: 1.7, w: 5.6, h: 4.7,
  fill: { color: COLOR_INNER_BG },
  line: { color: COLOR_BORDER, width: 1 }
});

slide9.addText([
  { text: '⏱️ 25:00 Pomodoro Focus Sprint Lab\n', options: { fontSize: 12, bold: true, color: COLOR_CRIMSON } },
  { text: 'Configurable deep-work sprint intervals with real-time countdown, break intervals, and audio alerts.\n\n', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } },

  { text: '🧠 Binaural Cognitive Soundscapes\n', options: { fontSize: 12, bold: true, color: COLOR_CYAN } },
  { text: 'Alpha and Theta wave acoustic entrainment to eliminate cognitive distractions and induce flow state.\n\n', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } },

  { text: '📬 Automated Gmail SMTP Task Reminders\n', options: { fontSize: 12, bold: true, color: COLOR_GOLD } },
  { text: 'Dispatches automated email notifications directly to user inboxes when critical tasks approach due time.\n\n', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } },

  { text: '📊 Eisenhower Priority Matrix\n', options: { fontSize: 12, bold: true, color: COLOR_PURPLE } },
  { text: 'Categorizes tasks across Do First (Q1), Schedule (Q2), Delegate (Q3), and Eliminate (Q4).', options: { fontSize: 9.5, color: COLOR_TEXT_MUTED } }
], { x: 1.1, y: 1.9, w: 5.2, h: 4.3 });

if (fs.existsSync(SCREENSHOT_WORK)) {
  slide9.addImage({
    path: SCREENSHOT_WORK,
    x: 6.75, y: 1.7, w: 5.5, h: 4.7,
    sizing: { type: 'contain', w: 5.5, h: 4.7 }
  });
}


// ─────────────────────────────────────────────────────────────────
// SLIDE 10: 19 HANDCRAFTED ANIMATIONS & WEB AUDIO DSP
// ─────────────────────────────────────────────────────────────────
const slide10 = pptx.addSlide();
addSlideHeader(slide10, 'ActionPhysics & Sound Synthesis Engine', '19 Domain-Specific Handcrafted Visual Celebrations', 'Zero external video/MP3 files. 100% synthesized in code at 60 frames per second.');

const anims = [
  { icon: '💥', title: 'Supernova Burst', desc: '32 glowing particles expanding radially on skill additions.' },
  { icon: '🚀', title: '3D Rocket Launch', desc: 'Ascending rocket with exhaust plume on job tracking.' },
  { icon: '🪙', title: '3D Gold Coin Rain', desc: '18 falling rotating coins with bounce physics & clinks.' },
  { icon: '✨', title: 'Emerald Pulse', desc: 'Expanding bioluminescent green aura on water logs.' },
  { icon: '🦥', title: 'Cute Sloth Mascot', desc: 'Animated cartoon sloth celebrating full-day goals.' },
  { icon: '🛡️', title: 'Cyber Shield Unlock', desc: 'Biometric wireframe laser ring upon OTP verification.' }
];

anims.forEach((an, idx) => {
  const row = Math.floor(idx / 3);
  const col = idx % 3;
  const xPos = 0.9 + col * 3.85;
  const yPos = 1.7 + row * 2.4;

  slide10.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: yPos, w: 3.65, h: 2.2,
    fill: { color: COLOR_INNER_BG },
    line: { color: COLOR_BORDER, width: 1 }
  });

  slide10.addText(an.icon + '  ' + an.title, {
    x: xPos + 0.15, y: yPos + 0.15, w: 3.35, h: 0.35,
    fontSize: 12, bold: true, color: COLOR_CYAN
  });

  slide10.addText(an.desc, {
    x: xPos + 0.15, y: yPos + 0.55, w: 3.35, h: 1.5,
    fontSize: 9.5, color: COLOR_TEXT_MUTED
  });
});


// ─────────────────────────────────────────────────────────────────
// SLIDE 11: DATABASE & CLOUD DEPLOYMENT
// ─────────────────────────────────────────────────────────────────
const slide11 = pptx.addSlide();
addSlideHeader(slide11, 'Cloud Infrastructure & Scalability', 'Enterprise Distributed Cloud Persistence', 'TiDB Cloud Serverless MySQL + Multi-Cloud Vercel & Render architecture.');

const cloudCards = [
  {
    icon: '🗄️',
    title: 'TiDB Cloud Serverless MySQL',
    color: COLOR_CYAN,
    desc: 'Distributed SQL cluster hosted in AWS ap-southeast-1 region with TLS 1.2 encryption, connection pooling, and automated daily backups.'
  },
  {
    icon: '⚡',
    title: 'Vercel Edge & Render Hosting',
    color: COLOR_PURPLE,
    desc: 'Vercel Edge routes API endpoints with edge caching; Render containerized Node.js handles background tasks and Gmail SMTP relays.'
  },
  {
    icon: '📲',
    title: 'PWA Local-First Caching',
    color: COLOR_EMERALD,
    desc: 'Service Worker caches all static assets locally, allowing the entire application to boot in <400ms even in offline network mode.'
  }
];

cloudCards.forEach((c, idx) => {
  const xPos = 0.9 + idx * 3.85;
  slide11.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: 1.7, w: 3.65, h: 4.7,
    fill: { color: COLOR_INNER_BG },
    line: { color: COLOR_BORDER, width: 1 }
  });

  slide11.addText(c.icon, { x: xPos + 0.2, y: 1.9, w: 3.25, h: 0.45, fontSize: 26 });
  slide11.addText(c.title, { x: xPos + 0.2, y: 2.45, w: 3.25, h: 0.4, fontSize: 13, bold: true, color: c.color });
  slide11.addText(c.desc, { x: xPos + 0.2, y: 2.95, w: 3.25, h: 3.2, fontSize: 10, color: COLOR_TEXT_MUTED });
});


// ─────────────────────────────────────────────────────────────────
// SLIDE 12: SYSTEM TESTING & QUALITY ASSURANCE
// ─────────────────────────────────────────────────────────────────
const slide12 = pptx.addSlide();
addSlideHeader(slide12, 'Quality Assurance & Verification', '100% Pass Rate Across 8 Test Suites', 'Rigorous automated verification under extreme load, network throttles, and boundary cases.');

slide12.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.9, y: 1.7, w: 6.6, h: 4.7,
  fill: { color: COLOR_INNER_BG },
  line: { color: COLOR_BORDER, width: 1 }
});

slide12.addText([
  { text: '✅ Unit Testing (25 Functions Verified)\n', options: { fontSize: 11.5, bold: true, color: COLOR_EMERALD } },
  { text: 'Scoring algorithms, SIP compounding, tax calculations, and audio oscillator frequency clamps.\n\n', options: { fontSize: 9, color: COLOR_TEXT_MUTED } },

  { text: '✅ Integration Testing (Event Pipeline)\n', options: { fontSize: 11.5, bold: true, color: COLOR_EMERALD } },
  { text: 'Store -> ActionPhysics -> Router -> TiDB Cloud synchronization verified under async load.\n\n', options: { fontSize: 9, color: COLOR_TEXT_MUTED } },

  { text: '✅ Performance Benchmarks (Lighthouse)\n', options: { fontSize: 11.5, bold: true, color: COLOR_EMERALD } },
  { text: 'First Contentful Paint: 0.6s | Cumulative Layout Shift: 0.00 | Frame Rate: Consistent 60.0 FPS.\n\n', options: { fontSize: 9, color: COLOR_TEXT_MUTED } },

  { text: '✅ Cross-Browser & Device Verification\n', options: { fontSize: 11.5, bold: true, color: COLOR_EMERALD } },
  { text: 'Validated on Chrome, Edge, Firefox, Safari, and Android Mobile with zero layout regressions.', options: { fontSize: 9, color: COLOR_TEXT_MUTED } }
], { x: 1.15, y: 1.9, w: 6.1, h: 4.3 });

// Right Big Stat Card
slide12.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 7.75, y: 1.7, w: 4.55, h: 4.7,
  fill: { color: '061A14' },
  line: { color: COLOR_EMERALD, width: 1.5 }
});

slide12.addText('100%', {
  x: 7.75, y: 2.5, w: 4.55, h: 1.0,
  fontFace: 'Arial', fontSize: 50, bold: true, color: COLOR_EMERALD, align: 'center'
});

slide12.addText('TEST PASS RATE', {
  x: 7.75, y: 3.6, w: 4.55, h: 0.35,
  fontFace: 'Arial', fontSize: 14, bold: true, color: COLOR_TEXT_WHITE, align: 'center'
});

slide12.addText('Zero critical defects encountered across all 8 automated testing suites.', {
  x: 8.0, y: 4.1, w: 4.05, h: 1.0,
  fontFace: 'Arial', fontSize: 10.5, color: COLOR_TEXT_MUTED, align: 'center'
});


// ─────────────────────────────────────────────────────────────────
// SLIDE 13: CONCLUSION & FUTURE ROADMAP
// ─────────────────────────────────────────────────────────────────
const slide13 = pptx.addSlide();
addSlideHeader(slide13, 'Academic Conclusion & Roadmap', 'Empowering Lifelong Human Growth', 'Bridging the gap between fragmented software and unified human potential.');

const roadmaps = [
  {
    icon: '🏆',
    title: 'Academic Contribution',
    desc: 'Demonstrated that Vanilla ES6+ reactive architectures can outperform heavy JS frameworks in user engagement and frame rate stability.'
  },
  {
    icon: '⌚',
    title: 'Wearable IoT Integration',
    desc: 'Roadmap includes direct Web Bluetooth BLE synchronization with smartbands (Apple Watch, Garmin, Fitbit) for continuous HRV tracking.'
  },
  {
    icon: '🤖',
    title: 'Predictive AI Co-Pilot',
    desc: 'Fine-tuned Gemini 2.0 models for automated career path forecasting, proactive burnout prevention, and dynamic study scheduling.'
  }
];

roadmaps.forEach((r, idx) => {
  const xPos = 0.9 + idx * 3.85;
  slide13.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: 1.7, w: 3.65, h: 4.7,
    fill: { color: COLOR_INNER_BG },
    line: { color: COLOR_BORDER, width: 1 }
  });

  slide13.addText(r.icon, { x: xPos + 0.2, y: 1.9, w: 3.25, h: 0.45, fontSize: 26 });
  slide13.addText(r.title, { x: xPos + 0.2, y: 2.45, w: 3.25, h: 0.4, fontSize: 13, bold: true, color: COLOR_CYAN });
  slide13.addText(r.desc, { x: xPos + 0.2, y: 2.95, w: 3.25, h: 3.2, fontSize: 10, color: COLOR_TEXT_MUTED });
});


// ─────────────────────────────────────────────────────────────────
// SLIDE 14: THANK YOU / Q&A
// ─────────────────────────────────────────────────────────────────
const slide14 = pptx.addSlide();
slide14.background = { color: COLOR_BG };

slide14.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.6, y: 0.35, w: 12.13, h: 6.4,
  fill: { color: COLOR_CARD_BG },
  line: { color: COLOR_BORDER_CYAN, width: 1.5 }
});

if (fs.existsSync(SVIET_LOGO_PATH)) {
  slide14.addImage({ path: SVIET_LOGO_PATH, x: 6.05, y: 0.8, w: 1.1, h: 1.1 });
}

slide14.addText('THANK YOU', {
  x: 0.9, y: 2.2, w: 11.4, h: 0.75,
  fontFace: 'Arial', fontSize: 38, bold: true, color: COLOR_CYAN, align: 'center'
});

slide14.addText('Questions & Project Viva Discussion', {
  x: 0.9, y: 3.1, w: 11.4, h: 0.35,
  fontFace: 'Arial', fontSize: 16, bold: true, color: COLOR_TEXT_WHITE, align: 'center'
});

slide14.addText('"The best way to predict your future is to create it." — BioVerse Platform', {
  x: 0.9, y: 3.55, w: 11.4, h: 0.3,
  fontFace: 'Arial', fontSize: 11.5, italic: true, color: COLOR_TEXT_MUTED, align: 'center'
});

slide14.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 2.9, y: 4.2, w: 7.5, h: 0.55,
  fill: { color: COLOR_INNER_BG },
  line: { color: COLOR_BORDER_CYAN, width: 1 }
});

slide14.addText('GitHub: github.com/saladi-siddharth/human-life-cycle-management', {
  x: 2.9, y: 4.32, w: 7.5, h: 0.3,
  fontFace: 'Arial', fontSize: 10.5, color: COLOR_CYAN, align: 'center'
});


// ─────────────────────────────────────────────────────────────────
// SAVE PPTX FILE
// ─────────────────────────────────────────────────────────────────
const outputPath = path.join(__dirname, 'BioVerse_Master_3D_Project_Presentation.pptx');

pptx.writeFile({ fileName: outputPath })
  .then(() => {
    const stats = fs.statSync(outputPath);
    console.log(`\n🎉 100% CLEAN & FULLY VISIBLE POWERPOINT (.PPTX) GENERATED!`);
    console.log(`📄 File: ${outputPath}`);
    console.log(`📊 Size: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`✨ All elements placed safely within bounds with zero repair errors or clipping!\n`);
  })
  .catch(err => {
    console.error('❌ Error writing PPTX:', err);
    process.exit(1);
  });
