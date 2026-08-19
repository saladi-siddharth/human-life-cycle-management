/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE MASTER AUTHENTICATION PAGE
   Features:
   - Spring Physics Pull Lamp on Left Column
   - Cute Eye-Tracking & Cover Eyes Panda Avatar
   - Phone OTP tab with Integrated 6-Digit Slot Machine & Beam Cursor
   - Sign Up tab with Microchip Vault Lock Password Entropy Meter
   ═══════════════════════════════════════════════════════════════════ */

function LoginPage() {
  setTimeout(() => {
    initLampSpringPhysics();
    initPandaInteractivity();
  }, 60);

  return `
    <!-- SVG Laser Arc & Vault Gradients -->
    <svg style="width:0;height:0;position:absolute;" aria-hidden="true">
      <defs>
        <linearGradient id="slotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00f2fe" />
          <stop offset="50%" stop-color="#7928ca" />
          <stop offset="100%" stop-color="#4f46e5" />
        </linearGradient>
        <linearGradient id="vaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00f2fe" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>
    </svg>

    <div class="room is-on" id="room">
      <div class="lamp-room-stage">
        <!-- 👈 LEFT COLUMN: PROMINENT PULL LAMP WITH SPRING PHYSICS -->
        <div class="lamp-left-column">
          <div class="lamp-svg-container">
            <svg id="lamp-svg" viewBox="0 0 320 400">
              <defs>
                <radialGradient id="lampConeGlow" cx="40%" cy="0%" r="95%">
                  <stop offset="0%" stop-color="#fef08a" stop-opacity="0.85" />
                  <stop offset="30%" stop-color="#fbbf24" stop-opacity="0.45" />
                  <stop offset="65%" stop-color="#6366f1" stop-opacity="0.15" />
                  <stop offset="100%" stop-color="#000000" stop-opacity="0" />
                </radialGradient>
                <linearGradient id="beadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#fef08a" />
                  <stop offset="100%" stop-color="#f59e0b" />
                </linearGradient>
              </defs>

              <polygon class="lamp_light" points="160,110 -200,600 850,600" fill="url(#lampConeGlow)" />
              <line x1="160" y1="0" x2="160" y2="70" stroke="#64748b" stroke-width="3.5" />
              <path class="lamp__head" d="M120 110 C120 75 200 75 200 110 Z" fill="#1e293b" stroke="#fbbf24" stroke-width="2.5" />
              <circle cx="160" cy="112" r="12" fill="#fef08a" class="lamp_light" style="filter:drop-shadow(0 0 16px #fbbf24);" />

              <g class="pull" id="pull-cord" role="button" tabindex="0" aria-pressed="true" aria-controls="signin">
                <path class="rope" id="rope-path" d="M 210 100 Q 210 160 210 220" />
                <circle class="ropehit" id="rope-hit" cx="210" cy="220" r="32" />
                <ellipse class="bead" id="bead" cx="210" cy="220" rx="10" ry="17" />
              </g>
            </svg>
          </div>

          <div class="lamp-hint-tag" id="lamp-hint">
            <i class="fas fa-hand-pointer"></i> Pull string to switch light!
          </div>
        </div>

        <!-- 👉 RIGHT COLUMN: CUTE PANDA & LIQUID GLASS CARD -->
        <div class="liquid-glass-wrapper">
          <div class="panda-container" id="panda-avatar">
            <svg class="panda-svg" viewBox="0 0 130 120">
              <circle cx="28" cy="28" r="16" fill="#0f172a" />
              <circle cx="102" cy="28" r="16" fill="#0f172a" />
              <circle cx="28" cy="28" r="9" fill="#1e293b" />
              <circle cx="102" cy="28" r="9" fill="#1e293b" />
              <ellipse cx="65" cy="62" rx="46" ry="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
              <ellipse cx="46" cy="58" rx="13" ry="16" fill="#0f172a" transform="rotate(-12 46 58)" />
              <ellipse cx="84" cy="58" rx="13" ry="16" fill="#0f172a" transform="rotate(12 84 58)" />
              <g id="panda-pupils">
                <circle id="pupil-left" cx="47" cy="58" r="5" fill="#ffffff" />
                <circle id="pupil-right" cx="83" cy="58" r="5" fill="#ffffff" />
                <circle cx="48" cy="57" r="2" fill="#0f172a" />
                <circle cx="84" cy="57" r="2" fill="#0f172a" />
              </g>
              <ellipse cx="65" cy="68" rx="6" ry="4" fill="#0f172a" />
              <path d="M 61 74 Q 65 78 69 74" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" />
              <circle cx="34" cy="68" r="6" fill="#ff85a2" opacity="0.6" />
              <circle cx="96" cy="68" r="6" fill="#ff85a2" opacity="0.6" />
              <g class="panda-hand-left" id="hand-left">
                <ellipse cx="25" cy="98" rx="12" ry="18" fill="#0f172a" stroke="#334155" stroke-width="1.5" />
                <circle cx="25" cy="94" r="5" fill="#334155" />
              </g>
              <g class="panda-hand-right" id="hand-right">
                <ellipse cx="105" cy="98" rx="12" ry="18" fill="#0f172a" stroke="#334155" stroke-width="1.5" />
                <circle cx="105" cy="94" r="5" fill="#334155" />
              </g>
            </svg>
          </div>

          <div class="liquid-blob-1"></div>
          <div class="liquid-blob-2"></div>

          <section class="card liquid-glass-card" id="signin">
            <div style="text-align:center; margin-bottom:20px;">
              <h2 style="font-size:26px; font-weight:800; color:#fff; margin:0; background: linear-gradient(135deg, #ffffff 0%, #fbbf24 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Welcome to BioVerse</h2>
              <p style="color:#94a3b8; font-size:13.5px; margin-top:4px;">Intelligent life management suite</p>
            </div>

            <div class="lamp-auth-tabs">
              <button class="lamp-auth-tab active" id="tab-btn-email" onclick="switchAuthMode('email')">
                <i class="fas fa-envelope"></i> Email
              </button>
              <button class="lamp-auth-tab" id="tab-btn-phone" onclick="switchAuthMode('phone')">
                <i class="fas fa-mobile-alt"></i> Phone OTP
              </button>
              <button class="lamp-auth-tab" id="tab-btn-register" onclick="switchAuthMode('register')">
                <i class="fas fa-user-plus"></i> Sign Up
              </button>
            </div>

            <!-- MODE 1: EMAIL & PASSWORD -->
            <div id="mode-email" class="auth-mode-content">
              <div class="form-group" style="margin-bottom:16px;">
                <label class="form-label" style="font-size:13px; color:#cbd5e1; display:block; margin-bottom:6px;">Email Address</label>
                <input type="email" class="form-input" id="email-input" placeholder="you@example.com" value="siddharth@bioverse.ai">
              </div>

              <div class="form-group" style="position:relative; margin-bottom:16px;">
                <label class="form-label" style="font-size:13px; color:#cbd5e1; display:block; margin-bottom:6px;">Password</label>
                <input type="password" class="form-input" id="password-input" placeholder="••••••••••••" value="BioVerse2026!">
                <button class="password-toggle" type="button" onclick="togglePandaPassword('password-input', this)" style="position:absolute; right:14px; top:36px; background:none; border:none; color:#94a3b8; cursor:pointer;"><i class="fas fa-eye"></i></button>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <label style="cursor:pointer; display:flex; align-items:center; gap:8px;">
                  <input type="checkbox" checked style="accent-color:#fbbf24;"> 
                  <span style="font-size:13px; color:#94a3b8;">Remember me</span>
                </label>
                <a style="font-size:13px; color:#fbbf24; cursor:pointer;" onclick="Router.navigate('/auth/forgot-password')">Forgot password?</a>
              </div>

              <button onclick="handleMasterLogin('Email Sign In')" style="width:100%; padding:14px; border-radius:16px; background:linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); border:none; font-weight:800; color:#0f172a; cursor:pointer; font-size:15px; box-shadow:0 6px 20px rgba(251,191,36,0.4);">
                <i class="fas fa-sign-in-alt"></i> Sign In
              </button>
            </div>

            <!-- MODE 2: PHONE & INTEGRATED SLOT MACHINE OTP -->
            <div id="mode-phone" class="auth-mode-content" style="display:none;">
              <div class="form-group" style="margin-bottom:16px;">
                <label class="form-label" style="font-size:13px; color:#cbd5e1; display:block; margin-bottom:6px;">Mobile Phone Number</label>
                <div class="phone-input-group">
                  <select class="phone-prefix-select">
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+81">🇯🇵 +81</option>
                  </select>
                  <input type="tel" class="form-input" id="phone-number" placeholder="98765 43210" value="9876543210" style="flex:1;">
                </div>
              </div>

              <div style="text-align:center; margin-top:16px; margin-bottom:4px;">
                <label class="form-label" style="font-size:13px; color:#cbd5e1;">6-Digit Verification Code</label>
              </div>

              <div class="code__field" id="otp-code-field">
                <span class="code_cursor active" id="code-cursor"></span>
                <div class="slots__container" id="slots-container">
                  ${[0, 1, 2, 3, 4, 5].map(i => `
                    <label class="slot" data-index="${i}">
                      <input type="text" inputmode="numeric" maxlength="1" autocomplete="one-time-code" class="slot__input" id="otp-input-${i}">
                      <span class="slot__win">
                        <span class="slot__digit"></span>
                        <svg class="slot__park" viewBox="0 0 52 64">
                          <rect class="slot__arc" x="2" y="2" width="48" height="60" rx="14" pathLength="1" />
                        </svg>
                      </span>
                    </label>
                  `).join('')}
                </div>
              </div>

              <button class="btn-auto-fill" onclick="demoAutoFillOtp()" style="margin: 8px auto 16px;">
                <i class="fas fa-magic"></i> Auto-fill Demo Code (849201)
              </button>

              <button onclick="handleMasterLogin('Phone OTP')" style="width:100%; padding:14px; border-radius:16px; background:linear-gradient(135deg, #00f2fe 0%, #4f46e5 100%); border:none; font-weight:800; color:#fff; cursor:pointer; font-size:15px; box-shadow:0 6px 20px rgba(0,242,254,0.35);">
                <i class="fas fa-shield-alt"></i> Verify Phone & Login
              </button>
            </div>

            <!-- MODE 3: SIGN UP REGISTER WITH MICROCHIP VAULT LOCK STRENGTH METER -->
            <div id="mode-register" class="auth-mode-content" style="display:none;">
              <div class="form-group" style="margin-bottom:12px;">
                <label class="form-label" style="font-size:13px; color:#cbd5e1;">Full Name</label>
                <input type="text" class="form-input" placeholder="Siddharth Sharma">
              </div>

              <div class="form-group" style="margin-bottom:12px;">
                <label class="form-label" style="font-size:13px; color:#cbd5e1;">Email Address</label>
                <input type="email" class="form-input" placeholder="you@example.com">
              </div>

              <div class="form-group" style="position:relative; margin-bottom:12px;">
                <label class="form-label" style="font-size:13px; color:#cbd5e1;">Create Password</label>
                <input type="password" class="form-input" id="reg-password-input" oninput="updatePasswordVaultStrength(this.value)" placeholder="Type strong password...">
                <button class="password-toggle" type="button" onclick="togglePandaPassword('reg-password-input', this)" style="position:absolute; right:12px; top:32px; background:none; border:none; color:#94a3b8; cursor:pointer;"><i class="fas fa-eye"></i></button>
              </div>

              <!-- MICROCHIP VAULT LOCK & STRENGTH METER -->
              <div class="lock" id="vault-lock">
                <div class="chip">
                  <div class="door tier-1" id="door">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="4"/>
                      <circle cx="50" cy="50" r="30" fill="none" stroke="url(#vaultGradient)" stroke-width="4" stroke-dasharray="180" stroke-dashoffset="180" id="vault-ring"/>
                      <path d="M 40 45 L 40 38 C 40 30 60 30 60 38 L 60 45" fill="none" stroke="#fbbf24" stroke-width="4" stroke-linecap="round" id="vault-shackle"/>
                      <rect x="36" y="45" width="28" height="22" rx="6" fill="#0f172a" stroke="#fbbf24" stroke-width="2"/>
                      <circle cx="50" cy="54" r="3" fill="#fbbf24"/>
                    </svg>
                  </div>
                </div>
                <div class="meter" id="vault-meter">
                  <i class="seg" data-t="1"></i>
                  <i class="seg" data-t="2"></i>
                  <i class="seg" data-t="3"></i>
                  <i class="seg" data-t="4"></i>
                </div>
                <div class="entropy-label" id="entropy-label">
                  Security Entropy: <span id="entropy-tier-name" style="color:#ef4444;">Weak (Too Short)</span>
                </div>
              </div>

              <button onclick="handleMasterLogin('Account Registration')" style="width:100%; padding:14px; border-radius:16px; background:linear-gradient(135deg, #10b981 0%, #059669 100%); border:none; font-weight:800; color:#fff; cursor:pointer; font-size:15px; box-shadow:0 6px 20px rgba(16,185,129,0.35);">
                <i class="fas fa-user-plus"></i> Create Account
              </button>
            </div>

            <!-- GOOGLE AUTH BUTTON -->
            <div style="margin-top:18px;">
              <div style="text-align:center; color:#64748b; font-size:12px; margin-bottom:12px;">or sign in with</div>
              <button onclick="handleMasterLogin('Google OAuth')" style="width:100%; padding:12px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.16); border-radius:16px; color:#fff; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:10px; backdrop-filter:blur(10px);">
                <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
                Continue with Google
              </button>
            </div>

            <div style="text-align:center; margin-top:20px; font-size:12px; color:#64748b; display:flex; align-items:center; justify-content:center; gap:6px;">
              <i class="fas fa-shield-alt" style="color:#fbbf24;"></i> BioVerse 256-Bit SSL Encrypted
            </div>
          </section>
        </div>
      </div>
    </div>
  `;
}

function RegisterPage() {
  return LoginPage();
}

function ForgotPasswordPage() {
  return `
    <div class="room is-on">
      <div class="liquid-glass-wrapper" style="max-width:440px; margin:40px auto;">
        <div class="liquid-glass-card">
          <div style="text-align:center; margin-bottom:20px;">
            <div style="font-size:40px; margin-bottom:8px;">🔑</div>
            <h2 style="font-size:24px; font-weight:800; color:#fff;">Reset Password</h2>
            <p style="color:#94a3b8; font-size:13.5px;">We'll send password reset instructions to your email</p>
          </div>

          <div class="form-group" style="margin-bottom:20px;">
            <label class="form-label" style="font-size:13px; color:#cbd5e1;">Email Address</label>
            <input type="email" class="form-input" id="forgot-email" placeholder="you@example.com">
          </div>

          <button onclick="handleForgotPasswordSubmit()" style="width:100%; padding:14px; border-radius:16px; background:linear-gradient(135deg, #00f2fe 0%, #4f46e5 100%); border:none; font-weight:800; color:#fff; cursor:pointer;">
            <i class="fas fa-paper-plane"></i> Send Reset Code
          </button>

          <div style="text-align:center; margin-top:20px; font-size:13.5px;">
            Remember password? <a onclick="Router.navigate('/auth/login')" style="color:#fbbf24; cursor:pointer; font-weight:600;">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════════════════════
   SPRING PHYSICS ENGINE
   User Formula: k = 210, c = 8.4; vy += (-k*(by-REST.y) - c*vy) * dt; by += vy * dt;
   ═══════════════════════════════════════════════════════════════════ */
function initLampSpringPhysics() {
  const room = document.getElementById('room');
  const card = document.getElementById('signin');
  const ropePath = document.getElementById('rope-path');
  const ropeHit = document.getElementById('rope-hit');
  const bead = document.getElementById('bead');
  const pullCord = document.getElementById('pull-cord');

  if (!pullCord || !ropePath) return;

  const REST = { x: 210, y: 220 };
  let by = REST.y;
  let vy = 0;
  let isDragging = false;
  let lastTime = performance.now();
  let isOn = true;

  const k = 210;
  const c = 8.4;

  function physicsLoop(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.033);
    lastTime = now;

    if (!isDragging) {
      const springForce = -k * (by - REST.y) - c * vy;
      vy += springForce * dt;
      by += vy * dt;
    }

    if (ropePath) ropePath.setAttribute('d', `M ${REST.x} 100 Q ${REST.x} ${(100 + by) / 2} ${REST.x} ${by}`);
    if (ropeHit) ropeHit.setAttribute('cy', by);
    if (bead) bead.setAttribute('cy', by);

    requestAnimationFrame(physicsLoop);
  }
  requestAnimationFrame(physicsLoop);

  function toggleLampSwitch() {
    isOn = !isOn;
    if (isOn) {
      room.classList.add('is-on');
      if (card) card.inert = false;
      pullCord.setAttribute('aria-pressed', 'true');
      UI.toast('info', 'Lamp Light ON', 'Mood lighting activated!');
    } else {
      room.classList.remove('is-on');
      if (card) card.inert = true;
      pullCord.setAttribute('aria-pressed', 'false');
      UI.toast('warning', 'Lamp Light OFF', 'Pull string to switch light back on!');
    }
  }

  function startDrag(e) {
    isDragging = true;
    e.preventDefault();
  }

  function moveDrag(e) {
    if (!isDragging) return;
    const svg = document.getElementById('lamp-svg');
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const relativeY = (clientY - rect.top) * (400 / rect.height);
    by = Math.max(REST.y, Math.min(REST.y + 90, relativeY));
  }

  function endDrag() {
    if (isDragging) {
      isDragging = false;
      if (by - REST.y > 35) {
        toggleLampSwitch();
      }
    }
  }

  pullCord.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', moveDrag);
  window.addEventListener('mouseup', endDrag);

  pullCord.addEventListener('touchstart', startDrag);
  window.addEventListener('touchmove', moveDrag);
  window.addEventListener('touchend', endDrag);

  pullCord.addEventListener('click', () => {
    by = REST.y + 50;
    toggleLampSwitch();
  });
}

function initPandaInteractivity() {
  const pandaAvatar = document.getElementById('panda-avatar');
  const pupilLeft = document.getElementById('pupil-left');
  const pupilRight = document.getElementById('pupil-right');
  const passwordInput = document.getElementById('password-input');

  if (pandaAvatar && pupilLeft && pupilRight) {
    window.addEventListener('mousemove', (e) => {
      if (pandaAvatar.classList.contains('covering')) return;

      const rect = pandaAvatar.getBoundingClientRect();
      const pandaX = rect.left + rect.width / 2;
      const pandaY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - pandaY, e.clientX - pandaX);
      const dist = Math.min(3.5, Math.hypot(e.clientX - pandaX, e.clientY - pandaY) / 100);

      pupilLeft.setAttribute('cx', 47 + Math.cos(angle) * dist);
      pupilLeft.setAttribute('cy', 58 + Math.sin(angle) * dist);
      pupilRight.setAttribute('cx', 83 + Math.cos(angle) * dist);
      pupilRight.setAttribute('cy', 58 + Math.sin(angle) * dist);
    });
  }

  if (passwordInput && pandaAvatar) {
    passwordInput.addEventListener('focus', () => {
      pandaAvatar.classList.remove('peeking');
      pandaAvatar.classList.add('covering');
    });

    passwordInput.addEventListener('blur', () => {
      pandaAvatar.classList.remove('covering', 'peeking');
    });
  }
}

function toggleVaultLockerPassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const pandaAvatar = document.getElementById('panda-avatar');
  if (!input) return;

  if (input.type === 'password') {
    input.type = 'text';
    btn.classList.add('unlocked');
    if (pandaAvatar) {
      pandaAvatar.classList.remove('covering');
      pandaAvatar.classList.add('peeking');
    }
  } else {
    input.type = 'password';
    btn.classList.remove('unlocked');
    if (pandaAvatar) {
      pandaAvatar.classList.remove('peeking');
      pandaAvatar.classList.add('covering');
    }
  }
}

function bindVaultLockerKeypress() {
  ['password-input', 'reg-password-input'].forEach(id => {
    const inp = document.getElementById(id);
    if (!inp) return;
    inp.addEventListener('input', () => {
      const btn = inp.parentElement.querySelector('.vault-locker-btn');
      if (!btn) return;
      const needle = btn.querySelector('.dial-needle');
      const ticks = btn.querySelector('.dial-ticks');
      const angle = inp.value.length * 30;
      if (needle) needle.style.transform = `rotate(${angle}deg)`;
      if (ticks) ticks.style.transform = `rotate(${angle / 2}deg)`;
    });
  });
}


/* ═══════════════════════════════════════════════════════════════════
   CYBER MICROCHIP VAULT PASSWORD ENTROPY GAUGE
   User Formula: bits = len * Math.log2(pool);
   tier = bits < 30 ? 1 : bits < 50 ? 2 : bits < 70 ? 3 : 4;
   ═══════════════════════════════════════════════════════════════════ */
function updatePasswordVaultStrength(password) {
  const door = document.getElementById('door');
  const chip = document.getElementById('cyber-chip');
  const tierLabel = document.getElementById('entropy-tier-name');
  const entropyBadge = document.getElementById('entropy-badge');
  const entropyIcon = document.getElementById('entropy-icon');
  const segments = document.querySelectorAll('#vault-meter .seg');
  const vaultRing = document.getElementById('vault-ring');

  if (!door || !tierLabel) return;

  if (!password) {
    door.className = 'door tier-1';
    if (chip) chip.className = 'chip tier-1';
    tierLabel.textContent = 'Unsecured (0 bits)';
    if (entropyBadge) {
      entropyBadge.style.borderColor = 'rgba(239, 68, 68, 0.4)';
      entropyBadge.style.boxShadow = 'none';
      entropyBadge.style.color = '#ef4444';
    }
    if (entropyIcon) entropyIcon.className = 'fas fa-exclamation-triangle';
    segments.forEach(s => s.className = 'seg');
    if (vaultRing) vaultRing.style.strokeDashoffset = '264';
    return;
  }

  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(password)) pool += 32;

  const len = password.length;
  const bits = pool > 0 ? len * Math.log2(pool) : 0;
  const tier = bits < 30 ? 1 : (bits < 50 ? 2 : (bits < 70 ? 3 : 4));

  const tiers = {
    1: { name: `Weak Entropy (${Math.round(bits)} bits)`, color: '#ef4444', icon: 'fas fa-shield-alt' },
    2: { name: `Fair Cyber Guard (${Math.round(bits)} bits)`, color: '#f59e0b', icon: 'fas fa-shield-alt' },
    3: { name: `Quantum Encrypted (${Math.round(bits)} bits)`, color: '#00f2fe', icon: 'fas fa-user-shield' },
    4: { name: `Biometric Vault Sealed (${Math.round(bits)} bits)`, color: '#10b981', icon: 'fas fa-lock' }
  };

  door.className = `door tier-${tier}`;
  if (chip) chip.className = `chip tier-${tier}`;
  tierLabel.textContent = tiers[tier].name;

  if (entropyBadge) {
    entropyBadge.style.borderColor = tiers[tier].color;
    entropyBadge.style.boxShadow = `0 0 16px ${tiers[tier].color}50`;
    entropyBadge.style.color = tiers[tier].color;
  }

  if (entropyIcon) {
    entropyIcon.className = tiers[tier].icon;
    entropyIcon.style.color = tiers[tier].color;
  }

  if (vaultRing) {
    const offset = Math.max(0, 264 - (bits / 85) * 264);
    vaultRing.style.strokeDashoffset = offset;
    vaultRing.style.transition = 'stroke-dashoffset 0.4s ease';
    segments.forEach((seg, i) => {
        const segTier = i + 1;
        if (segTier <= tier) {
          seg.className = `seg active-${tier}`;
        } else {
          seg.className = 'seg';
        }
      });

      if (tier === 4) {
        celebrateVaultLockdown();
      } else {
        vaultAlreadyCelebrated = false;
      }
    }
}


function initOtpSlotSystem() {
  const container = document.getElementById('slots-container');
  if (!container) return;
  const cursor = document.getElementById('code-cursor');
  const slots = container.querySelectorAll('.slot');
  const inputs = container.querySelectorAll('.slot__input');

  function updateCursor(index) {
    if (index >= 0 && index < slots.length) {
      const activeSlot = slots[index];
      const containerRect = container.getBoundingClientRect();
      const slotRect = activeSlot.getBoundingClientRect();
      cursor.style.transform = `translateX(${slotRect.left - containerRect.left}px)`;
      cursor.classList.add('active');
    } else {
      cursor.classList.remove('active');
    }
  }

  inputs.forEach((input, idx) => {
    input.addEventListener('focus', () => updateCursor(idx));

    input.addEventListener('input', (e) => {
      const val = e.target.value.replace(/[^0-9]/g, '');
      e.target.value = val;
      const slot = slots[idx];
      const digitSpan = slot.querySelector('.slot__digit');

      if (val) {
        digitSpan.textContent = val;
        slot.classList.add('filled');

        const r = slot.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const dx = cx - (r.left + r.width / 2);

        slot.animate([
          { transform: 'none' },
          { transform: `translate(${dx}px) scale(.34)` },
          { transform: 'none' }
        ], { delay: 0, duration: 640, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });

        if (idx < inputs.length - 1) {
          inputs[idx + 1].focus();
          updateCursor(idx + 1);
        } else {
          setTimeout(() => handleMasterLogin('Phone OTP'), 300);
        }
      } else {
        digitSpan.textContent = '';
        slot.classList.remove('filled');
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && idx > 0) {
        inputs[idx - 1].focus();
        inputs[idx - 1].value = '';
        slots[idx - 1].querySelector('.slot__digit').textContent = '';
        slots[idx - 1].classList.remove('filled');
        updateCursor(idx - 1);
      }
    });
  });
}

function demoAutoFillOtp() {
  const sampleCode = "849201".split('');
  const container = document.getElementById('slots-container');
  if (!container) return;
  const slots = container.querySelectorAll('.slot');
  const inputs = container.querySelectorAll('.slot__input');
  const cursor = document.getElementById('code-cursor');

  sampleCode.forEach((digit, i) => {
    setTimeout(() => {
      if (inputs[i]) {
        inputs[i].value = digit;
        const slot = slots[i];
        const digitSpan = slot.querySelector('.slot__digit');
        digitSpan.textContent = digit;
        slot.classList.add('filled');

        const r = slot.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const dx = cx - (r.left + r.width / 2);

        slot.animate([
          { transform: 'none' },
          { transform: `translate(${dx}px) scale(.34)` },
          { transform: 'none' }
        ], { duration: 640, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });

        const slotRect = slot.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        cursor.style.transform = `translateX(${slotRect.left - containerRect.left}px)`;
        cursor.classList.add('active');

        if (i === sampleCode.length - 1) {
          setTimeout(() => handleMasterLogin('Phone OTP'), 400);
        }
      }
    }, i * 140);
  });
}

function switchAuthMode(mode) {
  document.querySelectorAll('.lamp-auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-mode-content').forEach(c => c.style.display = 'none');

  const tabBtn = document.getElementById(`tab-btn-${mode}`);
  const modeContent = document.getElementById(`mode-${mode}`);

  if (tabBtn) tabBtn.classList.add('active');
  if (modeContent) modeContent.style.display = 'block';

  if (mode === 'phone') {
    setTimeout(() => initOtpSlotSystem(), 60);
  }
}

function handleMasterLogin(methodName) {
  if (typeof UI !== 'undefined') {
    UI.toast('success', `${methodName} Successful!`, 'Welcome back to BioVerse!');
  }
  const panda = document.getElementById('panda-avatar');
  if (panda) {
    panda.style.transform = 'translateY(-14px) scale(1.1)';
    panda.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  }
  if (typeof Store !== 'undefined') {
    Store.login('user@bioverse.ai', 'authenticated');
  }
  setTimeout(() => {
    if (typeof Router !== 'undefined') {
      Router.navigate('/dashboard');
    } else {
      window.location.href = 'index.html';
    }
  }, 1000);
}

function handleForgotPasswordSubmit() {
  if (typeof UI !== 'undefined') {
    UI.toast('success', 'Reset Link Dispatched', 'Check your email inbox.');
  }
  setTimeout(() => {
    if (typeof Router !== 'undefined') Router.navigate('/auth/login');
  }, 1500);
}
