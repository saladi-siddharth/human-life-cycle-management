/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE MASTER AUTHENTICATION PAGE
   Features:
   - Spring Physics Pull Lamp (Starts OFF by default, interactive turn ON)
   - Cute Eye-Tracking & Cover/Peek Eyes Panda Avatar
   - Password Visibility Toggle with Animated Eye Icon
   - Real-time Email Format Recognition
   - 6-Digit OTP Email Verification via Gmail SMTP
   - Strict TiDB/LocalDB Credential Authentication
   - Compact Single-Frame Layout
   ═══════════════════════════════════════════════════════════════════ */

function LoginPage() {
  setTimeout(() => {
    initLampSpringPhysics();
    initPandaInteractivity();
    switchAuthMode('email');
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
        <linearGradient id="beadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="100%" stop-color="#f59e0b" />
        </linearGradient>
      </defs>
    </svg>

    <!-- Lamp starts OFF by default -->
    <div class="room" id="room" style="padding:20px 16px 20px; min-height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center;">
      
      <!-- 🧭 TOP NAVIGATION BAR -->
      <div style="display:flex; justify-content:space-between; align-items:center; width:100%; max-width:960px; margin:0 auto 12px auto; padding:0 8px; position:relative; z-index:100;">
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/')" style="display:inline-flex; align-items:center; gap:8px; background:rgba(15,23,42,0.75); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.14); color:#fff; border-radius:999px; padding:7px 16px; font-weight:600; cursor:pointer;">
          <i class="fas fa-arrow-left"></i> Back to Home
        </button>
        <div style="display:flex; align-items:center; gap:10px; background:rgba(15,23,42,0.75); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.14); border-radius:999px; padding:5px 12px;">
          <span id="top-auth-switch-text" style="font-size:12.5px; color:#94a3b8;">Don't have an account?</span>
          <button id="top-auth-switch-btn" class="btn btn-outline btn-sm" onclick="toggleLoginRegister()" style="border-radius:999px; padding:5px 12px; font-size:12px; font-weight:700; color:var(--emerald); border-color:var(--emerald); background:rgba(16,185,129,0.1);">
            <i class="fas fa-user-plus"></i> Sign Up
          </button>
        </div>
      </div>

      <div class="lamp-room-stage" style="gap:36px; max-width:960px; width:100%; align-items:center;">
        
        <!-- 👈 LEFT COLUMN: PULL LAMP WITH SPRING PHYSICS -->
        <div class="lamp-left-column" style="height:380px; flex:0 0 280px;">
          <div class="lamp-svg-container" style="width:280px; height:340px;">
            <svg id="lamp-svg" viewBox="0 0 320 400" style="width:100%; height:100%;">
              <defs>
                <radialGradient id="lampConeGlow" cx="40%" cy="0%" r="95%">
                  <stop offset="0%" stop-color="#fef08a" stop-opacity="0.85" />
                  <stop offset="30%" stop-color="#fbbf24" stop-opacity="0.45" />
                  <stop offset="65%" stop-color="#6366f1" stop-opacity="0.15" />
                  <stop offset="100%" stop-color="#000000" stop-opacity="0" />
                </radialGradient>
              </defs>

              <polygon class="lamp_light" points="160,110 -200,600 850,600" fill="url(#lampConeGlow)" />
              <line x1="160" y1="0" x2="160" y2="70" stroke="#64748b" stroke-width="3.5" />
              <path class="lamp__head" d="M120 110 C120 75 200 75 200 110 Z" fill="#1e293b" stroke="#fbbf24" stroke-width="2.5" />
              <circle cx="160" cy="112" r="12" fill="#fef08a" class="lamp_light" style="filter:drop-shadow(0 0 16px #fbbf24);" />

              <g class="pull" id="pull-cord" role="button" tabindex="0" aria-pressed="false" aria-controls="signin">
                <path class="rope" id="rope-path" d="M 210 100 Q 210 160 210 220" />
                <circle class="ropehit" id="rope-hit" cx="210" cy="220" r="32" />
                <ellipse class="bead" id="bead" cx="210" cy="220" rx="10" ry="17" />
              </g>
            </svg>
          </div>

          <div class="lamp-hint-tag" id="lamp-hint" style="margin-top:8px; font-size:12px; padding:6px 14px; text-align:center;">
            <i class="fas fa-lightbulb"></i> Pull cord or click to turn ON lamp & unlock form!
          </div>
        </div>

        <!-- 👉 RIGHT COLUMN: CUTE PANDA & COMPACT LIQUID GLASS CARD -->
        <div class="liquid-glass-wrapper" style="max-width:440px;">
          
          <!-- Cute Interactive Panda Avatar -->
          <div class="panda-container" id="panda-avatar" style="width:100px; height:85px; margin:0 auto -14px auto;">
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

          <section class="card liquid-glass-card" id="signin" style="padding:24px 24px 18px; border-radius:24px;">
            
            <div style="text-align:center; margin-bottom:14px;">
              <h2 style="font-size:22px; font-weight:800; color:#fff; margin:0; background: linear-gradient(135deg, #ffffff 0%, #fbbf24 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">BioVerse Authentication</h2>
              <p style="color:#94a3b8; font-size:12px; margin-top:2px;">Turn lamp ON to activate sign in or register</p>
            </div>

            <!-- 🌟 Google OAuth SSO Component 🌟 -->
            <div style="margin-bottom: 14px;">
              <button type="button" class="btn-google-oauth" id="google-auth-btn" onclick="handleGoogleAuth()" style="width:100%; display:flex; align-items:center; justify-content:center; gap:12px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.18); border-radius:14px; padding:11px 16px; color:#fff; font-size:13.5px; font-weight:700; cursor:pointer; transition:all 0.25s ease; backdrop-filter:blur(10px); box-shadow:0 4px 16px rgba(0,0,0,0.3);">
                <svg viewBox="0 0 48 48" width="20" height="20">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.79l7.97-6.2z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span id="google-btn-text">Sign in with Google</span>
              </button>
              <div style="display:flex; align-items:center; gap:10px; margin:12px 0 10px 0;">
                <div style="flex:1; height:1px; background:rgba(255,255,255,0.1);"></div>
                <span style="font-size:10px; color:#94a3b8; font-weight:700; letter-spacing:0.8px; text-transform:uppercase;">or continue with email</span>
                <div style="flex:1; height:1px; background:rgba(255,255,255,0.1);"></div>
              </div>
            </div>

            <!-- Mode Tabs -->
            <div class="lamp-auth-tabs" style="padding:3px; margin-bottom:16px;">
              <button class="lamp-auth-tab active" id="tab-btn-email" onclick="switchAuthMode('email')" style="padding:8px 6px; font-size:12px;">
                <i class="fas fa-envelope"></i> Login
              </button>
              <button class="lamp-auth-tab" id="tab-btn-phone" onclick="switchAuthMode('phone')" style="padding:8px 6px; font-size:12px;">
                <i class="fas fa-mobile-alt"></i> Phone
              </button>
              <button class="lamp-auth-tab" id="tab-btn-register" onclick="switchAuthMode('register')" style="padding:8px 6px; font-size:12px;">
                <i class="fas fa-user-plus"></i> Sign Up
              </button>
            </div>

            <!-- MODE 1: LOGIN (EMAIL & PASSWORD) -->
            <div id="mode-email" class="auth-mode-content">
              <div class="form-group" style="margin-bottom:12px;">
                <label class="form-label" style="font-size:12px; color:#cbd5e1; display:block; margin-bottom:4px;">Email Address</label>
                <input type="email" class="form-input" id="email-input" placeholder="you@example.com" value="" style="padding:10px 12px; font-size:13px;">
              </div>

              <div class="form-group" style="position:relative; margin-bottom:12px;">
                <label class="form-label" style="font-size:12px; color:#cbd5e1; display:block; margin-bottom:4px;">Password</label>
                <input type="password" class="form-input" id="password-input" placeholder="••••••••••••" value="" style="padding:10px 12px; padding-right:40px; font-size:13px;">
                <button type="button" class="password-toggle" onclick="togglePandaPassword('password-input', this)" style="position:absolute; right:12px; top:28px; background:none; border:none; color:#94a3b8; cursor:pointer; font-size:14px; padding:4px;">
                  <i class="fas fa-eye"></i>
                </button>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                <label style="cursor:pointer; display:flex; align-items:center; gap:6px;">
                  <input type="checkbox" checked style="accent-color:#fbbf24;"> 
                  <span style="font-size:12px; color:#94a3b8;">Remember me</span>
                </label>
                <a style="font-size:12px; color:#fbbf24; cursor:pointer;" onclick="Router.navigate('/auth/forgot-password')">Forgot password?</a>
              </div>

              <button type="button" class="btn btn-primary btn-full" onclick="handleUserSignIn('email')" style="border-radius:12px; font-weight:800; padding:11px; font-size:13.5px; background:linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color:#0f172a; border:none; box-shadow:0 6px 20px rgba(251,191,36,0.35);">
                <i class="fas fa-sign-in-alt"></i> Sign In to BioVerse
              </button>

              <div style="text-align:center; margin-top:14px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.08);">
                <span style="color:#94a3b8; font-size:12.5px;">New to BioVerse?</span>
                <button type="button" class="btn btn-outline btn-sm" onclick="switchAuthMode('register')" style="margin-left:8px; border-radius:999px; border-color:var(--emerald); color:var(--emerald); background:rgba(16,185,129,0.08); font-weight:700; font-size:11.5px; padding:4px 10px;">
                  <i class="fas fa-user-plus"></i> Create Account
                </button>
              </div>
            </div>

            <!-- MODE 2: PHONE OTP -->
            <div id="mode-phone" class="auth-mode-content" style="display:none;">
              <div class="form-group" style="margin-bottom:12px;">
                <label class="form-label" style="font-size:12px; color:#cbd5e1; display:block; margin-bottom:4px;">Mobile Phone Number</label>
                <div class="phone-input-group">
                  <select class="phone-prefix-select" style="padding:8px 10px; font-size:12px;">
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                  </select>
                  <input type="tel" class="form-input" id="phone-number" placeholder="98765 43210" value="" style="flex:1; padding:8px 12px; font-size:13px;">
                </div>
              </div>

              <div class="code__field" id="otp-code-field" style="margin-bottom:12px;">
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

              <button type="button" class="btn btn-primary btn-full" onclick="handleUserSignIn('phone')" style="border-radius:12px; font-weight:800; padding:11px; font-size:13.5px; margin-top:8px;">
                <i class="fas fa-shield-alt"></i> Verify Phone & Login
              </button>
            </div>

            <!-- MODE 3: SIGN UP WITH MANDATORY 6-DIGIT EMAIL OTP VERIFICATION -->
            <div id="mode-register" class="auth-mode-content" style="display:none;">
              
              <!-- Register Form Step 1: User Details -->
              <div id="reg-step-1">
                <div class="form-group" style="margin-bottom:8px;">
                  <label class="form-label" style="font-size:11.5px; color:#cbd5e1; margin-bottom:2px; display:block;">Full Name</label>
                  <input type="text" class="form-input" id="reg-name-input" placeholder="e.g. Aarav Sharma" value="" style="padding:7px 10px; font-size:12.5px;">
                </div>

                <div class="form-group" style="margin-bottom:8px;">
                  <label class="form-label" style="font-size:11.5px; color:#cbd5e1; margin-bottom:2px; display:flex; justify-content:space-between;">
                    <span>Email Address</span>
                    <span id="reg-email-status" style="font-size:10.5px;"></span>
                  </label>
                  <input type="email" class="form-input" id="reg-email-input" oninput="validateRegEmail(this.value)" placeholder="you@example.com" value="" style="padding:7px 10px; font-size:12.5px;">
                </div>

                <div class="form-group" style="margin-bottom:8px;">
                  <label class="form-label" style="font-size:11.5px; color:#cbd5e1; margin-bottom:2px; display:block;">Primary Track</label>
                  <select class="form-select" id="reg-identity-select" style="background:rgba(15,23,42,0.9); color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:10px; padding:6px 10px; width:100%; font-size:12px;">
                    <option value="student">🎓 Student (Colleges, Cutoffs & Scholarships)</option>
                    <option value="employee">💼 Employee / Professional (Salary & Wealth)</option>
                    <option value="business">🏢 Business Owner / Founder (Scale & Ops)</option>
                  </select>
                </div>

                <div class="form-group" style="position:relative; margin-bottom:8px;">
                  <label class="form-label" style="font-size:11.5px; color:#cbd5e1; margin-bottom:2px; display:block;">Create Password</label>
                  <input type="password" class="form-input" id="reg-password-input" onkeydown="if(event.key==='Enter') handleUserSignUp()" oninput="updatePasswordVaultStrength(this.value)" placeholder="Create a strong password..." value="" style="padding:7px 10px; padding-right:38px; font-size:12.5px;">
                  <button type="button" class="password-toggle" onclick="togglePandaPassword('reg-password-input', this)" style="position:absolute; right:10px; top:24px; background:none; border:none; color:#94a3b8; cursor:pointer; font-size:13px; padding:4px;">
                    <i class="fas fa-eye"></i>
                  </button>
                </div>

                <!-- Streamlined Entropy Bar -->
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; font-size:11px; color:#94a3b8;">
                  <span>Security: <strong id="entropy-tier-name" style="color:#10b981;">Biometric Encrypted</strong></span>
                  <span id="entropy-badge" style="color:#10b981;"><i class="fas fa-lock"></i> Strong</span>
                </div>

                <!-- Primary Sign Up Action Button: Dispatches OTP to Email -->
                <button type="button" id="btn-submit-signup" class="btn btn-primary btn-full" onclick="handleUserSignUp()" style="border-radius:12px; font-weight:800; padding:11px; font-size:13.5px; background:linear-gradient(135deg, #10b981 0%, #059669 100%); color:#fff; border:none; box-shadow:0 6px 20px rgba(16,185,129,0.35); cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; margin-bottom:6px;">
                  <i class="fas fa-paper-plane"></i> Sign Up & Verify Email OTP
                </button>
              </div>

              <!-- Register Form Step 2: Email OTP Verification Card -->
              <div id="reg-step-2" style="display:none; padding:14px; background:rgba(0,242,254,0.06); border:1px solid rgba(0,242,254,0.3); border-radius:14px; margin-bottom:10px; text-align:center;">
                <div style="font-size:24px; margin-bottom:4px;">📬</div>
                <h4 style="font-size:14px; color:#00f2fe; margin:0 0 4px 0; font-weight:700;">Verify Your Email Address</h4>
                <p style="font-size:11.5px; color:#94a3b8; margin:0 0 10px 0; line-height:1.4;">
                  Enter the 6-digit code sent to <strong id="reg-target-email" style="color:#fbbf24;">your email</strong>
                  <br><a onclick="backToRegisterStep1()" style="color:#38bdf8; font-size:11px; cursor:pointer; text-decoration:underline;">Change email</a>
                </p>

                <input type="text" maxlength="6" class="form-input" id="reg-otp-input" onkeydown="if(event.key==='Enter') handleVerifyRegistrationOtp()" placeholder="• • • • • •" style="letter-spacing:8px; text-align:center; font-size:20px; font-weight:900; color:#fbbf24; background:rgba(15,23,42,0.9); border:2px solid #fbbf24; border-radius:12px; padding:8px 12px; width:180px; margin:0 auto 10px auto; display:block;">

                <button type="button" id="btn-verify-reg-otp" class="btn btn-success btn-full" onclick="handleVerifyRegistrationOtp()" style="border-radius:12px; font-weight:800; padding:10px; font-size:13px; background:linear-gradient(135deg, #10b981, #059669); color:#fff; border:none; box-shadow:0 4px 16px rgba(16,185,129,0.4); margin-bottom:8px;">
                  <i class="fas fa-check-circle"></i> Verify OTP & Start Onboarding
                </button>

                <button type="button" id="btn-resend-reg-otp" class="btn btn-ghost btn-sm" onclick="handleResendRegistrationOtp()" style="font-size:11.5px; color:#94a3b8; padding:4px 8px;">
                  <i class="fas fa-redo"></i> Resend code (<span id="reg-countdown">30</span>s)
                </button>
              </div>

              <div style="text-align:center; margin-top:8px; padding-top:6px; border-top:1px solid rgba(255,255,255,0.08);">
                <span style="color:#94a3b8; font-size:12px;">Already registered?</span>
                <button type="button" class="btn btn-outline btn-sm" onclick="switchAuthMode('email')" style="margin-left:8px; border-radius:999px; border-color:var(--amber); color:var(--amber); background:rgba(251,191,36,0.08); font-weight:700; font-size:11px; padding:3px 8px;">
                  <i class="fas fa-sign-in-alt"></i> Sign In
                </button>
              </div>
            </div>

            <!-- Footer Badge -->
            <div style="text-align:center; margin-top:10px; font-size:11px; color:#64748b; display:flex; align-items:center; justify-content:center; gap:6px;">
              <i class="fas fa-shield-alt" style="color:#10b981;"></i> BioVerse 256-Bit SSL Encrypted
            </div>
          </section>
        </div>
      </div>
    </div>
  `;
}

function RegisterPage() {
  setTimeout(() => {
    switchAuthMode('register');
  }, 100);
  return LoginPage();
}

function ForgotPasswordPage() {
  return `
    <div class="room is-on" style="min-height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:20px 16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; width:100%; max-width:440px; margin:0 auto 16px auto; padding:0 8px;">
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/')" style="display:inline-flex; align-items:center; gap:8px; background:rgba(15,23,42,0.75); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.14); color:#fff; border-radius:999px; padding:7px 16px; font-weight:600; cursor:pointer;">
          <i class="fas fa-arrow-left"></i> Home
        </button>
        <button class="btn btn-outline btn-sm" onclick="Router.navigate('/auth/login')" style="display:inline-flex; align-items:center; gap:6px; border-radius:999px; padding:6px 14px; font-weight:700; color:var(--amber); border-color:var(--amber); background:rgba(251,191,36,0.1);">
          <i class="fas fa-sign-in-alt"></i> Back to Login
        </button>
      </div>

      <div class="liquid-glass-wrapper" style="max-width:440px; margin:0 auto; width:100%;">
        <div class="liquid-glass-card" style="padding:28px 24px; border-radius:24px;">
          <div style="text-align:center; margin-bottom:16px;">
            <div style="font-size:36px; margin-bottom:6px;">🔑</div>
            <h2 style="font-size:22px; font-weight:800; color:#fff; margin:0;">Reset Password</h2>
            <p style="color:#94a3b8; font-size:12.5px; margin-top:4px;">We'll send a 6-digit OTP verification code to your email</p>
          </div>

          <!-- Step 1: Email Form -->
          <div id="forgot-step-1">
            <div class="form-group" style="margin-bottom:16px;">
              <label class="form-label" style="font-size:12px; color:#cbd5e1; display:block; margin-bottom:4px;">Registered Email Address</label>
              <input type="email" class="form-input" id="forgot-email" onkeydown="if(event.key==='Enter') handleSendForgotOtp()" placeholder="you@example.com" value="" style="padding:10px 12px; font-size:13px;">
            </div>

            <button type="button" id="btn-forgot-send-otp" class="btn btn-primary btn-full" onclick="handleSendForgotOtp()" style="border-radius:12px; font-weight:800; padding:11px; font-size:13.5px; background:linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color:#0f172a; border:none; box-shadow:0 4px 16px rgba(251,191,36,0.35);">
              <i class="fas fa-paper-plane"></i> Send 6-Digit Reset Code
            </button>
          </div>

          <!-- Step 2: OTP & New Password Form -->
          <div id="forgot-step-2" style="display:none;">
            <div style="background:rgba(251,191,36,0.06); border:1px dashed rgba(251,191,36,0.3); border-radius:14px; padding:12px; margin-bottom:14px; text-align:center;">
              <p style="font-size:12px; color:#cbd5e1; margin:0 0 6px 0;">
                Code sent to <strong id="forgot-target-email" style="color:#fbbf24;"></strong>
              </p>
              <a onclick="backToForgotStep1()" style="color:#00f2fe; font-size:11px; cursor:pointer; text-decoration:underline;">Change email</a>
            </div>

            <div class="form-group" style="margin-bottom:12px; text-align:center;">
              <label class="form-label" style="font-size:12px; color:#cbd5e1; display:block; margin-bottom:6px;">Enter 6-Digit OTP</label>
              <input type="text" maxlength="6" class="form-input" id="forgot-otp-input" placeholder="• • • • • •" style="letter-spacing:8px; text-align:center; font-size:20px; font-weight:800; color:#fbbf24; padding:8px 12px; width:180px; margin:0 auto; display:block;">
            </div>

            <div class="form-group" style="position:relative; margin-bottom:12px;">
              <label class="form-label" style="font-size:12px; color:#cbd5e1; display:block; margin-bottom:4px;">New Password</label>
              <input type="password" class="form-input" id="forgot-new-password" placeholder="Min 6 characters..." style="padding:10px 12px; padding-right:38px; font-size:13px;">
              <button type="button" class="password-toggle" onclick="togglePandaPassword('forgot-new-password', this)" style="position:absolute; right:10px; top:26px; background:none; border:none; color:#94a3b8; cursor:pointer; font-size:13px; padding:4px;">
                <i class="fas fa-eye"></i>
              </button>
            </div>

            <div class="form-group" style="position:relative; margin-bottom:16px;">
              <label class="form-label" style="font-size:12px; color:#cbd5e1; display:block; margin-bottom:4px;">Confirm New Password</label>
              <input type="password" class="form-input" id="forgot-confirm-password" onkeydown="if(event.key==='Enter') handleSaveNewPassword()" placeholder="Repeat new password..." style="padding:10px 12px; padding-right:38px; font-size:13px;">
              <button type="button" class="password-toggle" onclick="togglePandaPassword('forgot-confirm-password', this)" style="position:absolute; right:10px; top:26px; background:none; border:none; color:#94a3b8; cursor:pointer; font-size:13px; padding:4px;">
                <i class="fas fa-eye"></i>
              </button>
            </div>

            <button type="button" id="btn-forgot-save-pass" class="btn btn-success btn-full" onclick="handleSaveNewPassword()" style="border-radius:12px; font-weight:800; padding:11px; font-size:13.5px; margin-bottom:10px;">
              <i class="fas fa-check-circle"></i> Save New Password & Continue
            </button>

            <div style="text-align:center;">
              <button type="button" id="btn-forgot-resend" class="btn btn-ghost btn-sm" onclick="handleSendForgotOtp(true)" style="font-size:11.5px; color:#94a3b8;">
                <i class="fas fa-redo"></i> Resend code (<span id="forgot-countdown">30</span>s)
              </button>
            </div>
          </div>

          <div style="text-align:center; margin-top:16px; font-size:12.5px;">
            Remember password? <a onclick="Router.navigate('/auth/login')" style="color:#fbbf24; cursor:pointer; font-weight:600;">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════════════════════
   SPRING PHYSICS ENGINE — LAMP STARTS OFF BY DEFAULT
   ═══════════════════════════════════════════════════════════════════ */
function initLampSpringPhysics() {
  const room = document.getElementById('room');
  const card = document.getElementById('signin');
  const ropePath = document.getElementById('rope-path');
  const ropeHit = document.getElementById('rope-hit');
  const bead = document.getElementById('bead');
  const pullCord = document.getElementById('pull-cord');
  const lampHint = document.getElementById('lamp-hint');

  if (!pullCord || !ropePath) return;

  const REST = { x: 210, y: 220 };
  let by = REST.y;
  let vy = 0;
  let isDragging = false;
  let lastTime = performance.now();
  let isOn = false; // Starts OFF by default

  // Start with form disabled until lamp light is turned ON
  if (card) {
    card.inert = true;
    card.style.opacity = '0.5';
    card.style.pointerEvents = 'none';
  }

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
      if (room) room.classList.add('is-on');
      if (card) {
        card.inert = false;
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
      }
      pullCord.setAttribute('aria-pressed', 'true');
      if (lampHint) {
        lampHint.innerHTML = '<i class="fas fa-check-circle" style="color:#10b981;"></i> Lamp Light ON! Form is unlocked.';
        lampHint.style.background = 'rgba(16,185,129,0.18)';
        lampHint.style.borderColor = 'rgba(16,185,129,0.5)';
        lampHint.style.color = '#10b981';
      }
      if (typeof UI !== 'undefined') UI.toast('info', '💡 Lamp Light ON', 'Form illuminated & unlocked. You can now fill details!');
    } else {
      if (room) room.classList.remove('is-on');
      if (card) {
        card.inert = true;
        card.style.opacity = '0.5';
        card.style.pointerEvents = 'none';
      }
      pullCord.setAttribute('aria-pressed', 'false');
      if (lampHint) {
        lampHint.innerHTML = '<i class="fas fa-lightbulb"></i> Pull cord or click to turn ON lamp & unlock form!';
        lampHint.style.background = 'rgba(251,191,36,0.18)';
        lampHint.style.borderColor = 'rgba(251,191,36,0.5)';
        lampHint.style.color = '#fbbf24';
      }
      if (typeof UI !== 'undefined') UI.toast('warning', '💡 Lamp Light OFF', 'Pull string to turn on light and unlock form.');
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

/* ═══════════════════════════════════════════════════════════════════
   PANDA AVATAR INTERACTIVITY
   ═══════════════════════════════════════════════════════════════════ */
function initPandaInteractivity() {
  const pandaAvatar = document.getElementById('panda-avatar');
  const pupilLeft = document.getElementById('pupil-left');
  const pupilRight = document.getElementById('pupil-right');
  const passwordInputs = ['password-input', 'reg-password-input'];

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

  passwordInputs.forEach(id => {
    const input = document.getElementById(id);
    if (input && pandaAvatar) {
      input.addEventListener('focus', () => {
        if (input.type === 'password') {
          pandaAvatar.classList.remove('peeking');
          pandaAvatar.classList.add('covering');
        }
      });
      input.addEventListener('blur', () => {
        pandaAvatar.classList.remove('covering', 'peeking');
      });
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════
   PASSWORD VISIBILITY TOGGLE (EYE ICON FIX)
   ═══════════════════════════════════════════════════════════════════ */
function togglePandaPassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const pandaAvatar = document.getElementById('panda-avatar');
  if (!input) return;

  const icon = btn ? btn.querySelector('i') : null;

  if (input.type === 'password') {
    input.type = 'text';
    if (icon) {
      icon.className = 'fas fa-eye-slash';
      icon.style.color = '#fbbf24';
    }
    if (pandaAvatar) {
      pandaAvatar.classList.remove('covering');
      pandaAvatar.classList.add('peeking');
    }
  } else {
    input.type = 'password';
    if (icon) {
      icon.className = 'fas fa-eye';
      icon.style.color = '#94a3b8';
    }
    if (pandaAvatar) {
      pandaAvatar.classList.remove('peeking');
      pandaAvatar.classList.add('covering');
    }
  }
}
window.togglePandaPassword = togglePandaPassword;

/* ═══════════════════════════════════════════════════════════════════
   REAL-TIME EMAIL VALIDATION
   ═══════════════════════════════════════════════════════════════════ */
function validateRegEmail(email) {
  const statusEl = document.getElementById('reg-email-status');
  if (!statusEl) return;
  const val = (email || '').trim();
  if (!val) {
    statusEl.innerHTML = '';
    return;
  }
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  if (isValid) {
    statusEl.innerHTML = '<span style="color:#10b981;font-weight:700;"><i class="fas fa-check-circle"></i> Valid</span>';
  } else {
    statusEl.innerHTML = '<span style="color:#ef4444;font-weight:700;"><i class="fas fa-exclamation-circle"></i> Invalid format</span>';
  }
}
window.validateRegEmail = validateRegEmail;

/* ═══════════════════════════════════════════════════════════════════
   PASSWORD ENTROPY CALCULATOR
   ═══════════════════════════════════════════════════════════════════ */
function updatePasswordVaultStrength(password) {
  const tierLabel = document.getElementById('entropy-tier-name');
  const entropyBadge = document.getElementById('entropy-badge');
  if (!tierLabel || !entropyBadge) return;

  if (!password) {
    tierLabel.textContent = 'Enter password';
    tierLabel.style.color = '#94a3b8';
    entropyBadge.innerHTML = '<i class="fas fa-shield-alt"></i> Empty';
    entropyBadge.style.color = '#94a3b8';
    return;
  }

  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(password)) pool += 32;

  const len = password.length;
  const bits = pool > 0 ? len * Math.log2(pool) : 0;

  if (bits < 30) {
    tierLabel.textContent = 'Weak';
    tierLabel.style.color = '#ef4444';
    entropyBadge.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Weak';
    entropyBadge.style.color = '#ef4444';
  } else if (bits < 50) {
    tierLabel.textContent = 'Moderate';
    tierLabel.style.color = '#f59e0b';
    entropyBadge.innerHTML = '<i class="fas fa-shield-alt"></i> Fair';
    entropyBadge.style.color = '#f59e0b';
  } else {
    tierLabel.textContent = 'Quantum Secured';
    tierLabel.style.color = '#10b981';
    entropyBadge.innerHTML = '<i class="fas fa-lock"></i> Strong';
    entropyBadge.style.color = '#10b981';
  }
}
window.updatePasswordVaultStrength = updatePasswordVaultStrength;

/* ═══════════════════════════════════════════════════════════════════
   MODE SWITCHER & NAVIGATION
   ═══════════════════════════════════════════════════════════════════ */
function switchAuthMode(mode) {
  document.querySelectorAll('.lamp-auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-mode-content').forEach(c => c.style.display = 'none');

  const tabBtn = document.getElementById(`tab-btn-${mode}`);
  const modeContent = document.getElementById(`mode-${mode}`);

  if (tabBtn) tabBtn.classList.add('active');
  if (modeContent) modeContent.style.display = 'block';

  // Synchronize Google SSO Button Text
  const googleBtnText = document.getElementById('google-btn-text');
  if (googleBtnText) {
    googleBtnText.textContent = mode === 'register' ? 'Sign up with Google' : 'Sign in with Google';
  }

  // Synchronize Top Bar Mode Switcher
  const topText = document.getElementById('top-auth-switch-text');
  const topBtn = document.getElementById('top-auth-switch-btn');
  if (topText && topBtn) {
    if (mode === 'register') {
      topText.textContent = 'Already have an account?';
      topBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
      topBtn.style.color = 'var(--amber)';
      topBtn.style.borderColor = 'var(--amber)';
      topBtn.style.background = 'rgba(251,191,36,0.1)';
    } else {
      topText.textContent = "Don't have an account?";
      topBtn.innerHTML = '<i class="fas fa-user-plus"></i> Sign Up';
      topBtn.style.color = 'var(--emerald)';
      topBtn.style.borderColor = 'var(--emerald)';
      topBtn.style.background = 'rgba(16,185,129,0.1)';
    }
  }
}
window.switchAuthMode = switchAuthMode;

/* ═══════════════════════════════════════════════════════════════════
   GOOGLE OAUTH / SSO MODAL & AUTHENTICATOR
   ═══════════════════════════════════════════════════════════════════ */
let googlePendingAccount = null;
let googleCountdownInterval = null;

async function handleGoogleAuth() {
  const storedName = Store.get('profile.name') || 'Saladi Siddharth';
  const storedEmail = Store.get('profile.email') || 'saladisiddharth@gmail.com';
  const defaultName = storedName !== 'Google User' ? storedName : 'Saladi Siddharth';
  const defaultEmail = storedEmail !== 'google_user@bioverse.ai' ? storedEmail : 'saladisiddharth@gmail.com';

  const modalHtml = `
    <div style="padding:22px 18px; text-align:center; max-width:400px; margin:0 auto; color:#fff;">
      <div style="display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; background:rgba(255,255,255,0.06); border-radius:50%; margin-bottom:12px; border:1px solid rgba(255,255,255,0.15); box-shadow:0 6px 20px rgba(0,0,0,0.3);">
        <svg viewBox="0 0 48 48" width="30" height="30">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.79l7.97-6.2z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
      </div>
      <h3 style="font-size:19px; font-weight:800; margin:0 0 6px 0; color:#fff;">Google Authentication</h3>
      <p style="font-size:12px; color:#94a3b8; margin:0 0 18px 0; line-height:1.4;">Sign up or sign in securely with your Google email verification</p>

      <!-- Google Step 1: Account Selection & Input -->
      <div id="g-step-1">
        <div onclick="selectGoogleAccount('${defaultName}', '${defaultEmail}')" style="display:flex; align-items:center; gap:12px; padding:12px 14px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15); border-radius:14px; cursor:pointer; margin-bottom:14px; text-align:left; transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">
          <div style="width:38px; height:38px; border-radius:50%; background:linear-gradient(135deg, #00f2fe, #6366f1); display:flex; align-items:center; justify-content:center; font-weight:800; font-size:15px; color:#fff;">${defaultName[0]}</div>
          <div style="flex:1;">
            <div style="font-size:13px; font-weight:700; color:#fff;">${defaultName}</div>
            <div style="font-size:11.5px; color:#94a3b8;">${defaultEmail}</div>
          </div>
          <i class="fas fa-check-circle" style="color:#10b981; font-size:15px;"></i>
        </div>

        <div style="margin-bottom:14px; text-align:left;">
          <label style="font-size:11px; color:#cbd5e1; display:block; margin-bottom:4px;">Or enter any Google email address:</label>
          <input type="email" class="form-input" id="g-custom-email" placeholder="you@gmail.com" value="" style="padding:9px 12px; font-size:13px;">
        </div>

        <button type="button" id="btn-g-send-otp" class="btn btn-primary btn-full" onclick="handleSendGoogleOtp()" style="border-radius:12px; font-weight:800; padding:11px; font-size:13px; margin-bottom:8px; background:linear-gradient(135deg, #00f2fe, #6366f1); color:#fff; border:none; box-shadow:0 4px 16px rgba(0,242,254,0.35);">
          <i class="fas fa-paper-plane"></i> Send OTP Verification Code
        </button>

        <button type="button" class="btn btn-ghost btn-full btn-sm" onclick="handleInstantGoogleDevLogin('${defaultName}', '${defaultEmail}')" style="font-size:11.5px; color:#00f2fe; padding:6px;">
          <i class="fas fa-bolt"></i> Instant Google One-Click Login
        </button>
      </div>

      <!-- Google Step 2: OTP Verification -->
      <div id="g-step-2" style="display:none; text-align:center;">
        <div style="background:rgba(0,242,254,0.06); border:1px dashed rgba(0,242,254,0.3); border-radius:12px; padding:10px; margin-bottom:14px;">
          <p style="font-size:12px; color:#cbd5e1; margin:0 0 4px 0;">Verification code sent to <strong id="g-target-email" style="color:#fbbf24;"></strong></p>
          <a onclick="backToGoogleStep1()" style="color:#00f2fe; font-size:11px; cursor:pointer; text-decoration:underline;">Change account</a>
        </div>

        <input type="text" maxlength="6" id="g-otp-input" onkeydown="if(event.key==='Enter') handleVerifyGoogleOtp()" placeholder="• • • • • •" style="letter-spacing:8px; text-align:center; font-size:20px; font-weight:900; color:#fbbf24; background:rgba(15,23,42,0.9); border:2px solid #fbbf24; border-radius:12px; padding:8px 12px; width:180px; margin:0 auto 12px auto; display:block;">

        <button type="button" id="btn-g-verify-otp" class="btn btn-success btn-full" onclick="handleVerifyGoogleOtp()" style="border-radius:12px; font-weight:800; padding:11px; font-size:13px; margin-bottom:8px; background:linear-gradient(135deg, #10b981, #059669); color:#fff; border:none; box-shadow:0 4px 16px rgba(16,185,129,0.4);">
          <i class="fas fa-check-circle"></i> Verify OTP & Sign In
        </button>

        <button type="button" id="btn-g-resend" class="btn btn-ghost btn-sm" onclick="handleSendGoogleOtp(true)" style="font-size:11px; color:#94a3b8;">
          <i class="fas fa-redo"></i> Resend code (<span id="g-countdown">30</span>s)
        </button>
      </div>
    </div>
  `;

  if (typeof UI !== 'undefined' && UI.modal) {
    UI.modal(modalHtml);
  }
}
window.handleGoogleAuth = handleGoogleAuth;

function selectGoogleAccount(name, email) {
  const input = document.getElementById('g-custom-email');
  if (input) input.value = email;
  handleSendGoogleOtp();
}
window.selectGoogleAccount = selectGoogleAccount;

async function handleSendGoogleOtp(isResend = false) {
  const customEmail = document.getElementById('g-custom-email')?.value?.trim();
  const defaultEmail = Store.get('profile.email') || 'saladisiddharth@gmail.com';
  const targetEmail = customEmail || defaultEmail;
  const targetName = customEmail ? customEmail.split('@')[0] : (Store.get('profile.name') || 'Google User');

  if (!targetEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail)) {
    if (typeof UI !== 'undefined') UI.toast('warning', 'Valid Email Required', 'Please enter a valid Google email address.');
    document.getElementById('g-custom-email')?.focus();
    return;
  }

  googlePendingAccount = { name: targetName, email: targetEmail };

  const btn = isResend ? document.getElementById('btn-g-resend') : document.getElementById('btn-g-send-otp');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending code...';
  }

  const res = await Store.sendRegistrationOtp(targetEmail, targetName);
  if (res.success) {
    if (typeof UI !== 'undefined') UI.toast('success', 'Verification Code Sent', `6-digit code sent to ${targetEmail}`);
    const step1 = document.getElementById('g-step-1');
    const step2 = document.getElementById('g-step-2');
    if (step1) step1.style.display = 'none';
    if (step2) step2.style.display = 'block';

    const targetEl = document.getElementById('g-target-email');
    if (targetEl) targetEl.textContent = targetEmail;

    const otpInput = document.getElementById('g-otp-input');
    if (otpInput) {
      otpInput.value = '';
      otpInput.focus();
    }

    startGoogleCountdown();
  } else {
    if (typeof UI !== 'undefined') UI.toast('error', 'Failed to Send Code', res.error || 'Failed to dispatch email verification');
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = isResend ? '<i class="fas fa-redo"></i> Resend code' : '<i class="fas fa-paper-plane"></i> Send OTP Verification Code';
    }
  }
}
window.handleSendGoogleOtp = handleSendGoogleOtp;

function startGoogleCountdown() {
  let seconds = 30;
  const countEl = document.getElementById('g-countdown');
  const btn = document.getElementById('btn-g-resend');
  if (btn) btn.disabled = true;
  if (googleCountdownInterval) clearInterval(googleCountdownInterval);

  googleCountdownInterval = setInterval(() => {
    seconds--;
    if (countEl) countEl.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(googleCountdownInterval);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-redo"></i> Resend code';
      }
    }
  }, 1000);
}

function backToGoogleStep1() {
  const step1 = document.getElementById('g-step-1');
  const step2 = document.getElementById('g-step-2');
  if (step1) step1.style.display = 'block';
  if (step2) step2.style.display = 'none';
}
window.backToGoogleStep1 = backToGoogleStep1;

async function handleVerifyGoogleOtp() {
  const otp = document.getElementById('g-otp-input')?.value?.trim();
  if (!otp || otp.length < 6) {
    if (typeof UI !== 'undefined') UI.toast('warning', 'Enter 6-Digit OTP', 'Please enter the 6-digit verification code.');
    document.getElementById('g-otp-input')?.focus();
    return;
  }

  const btn = document.getElementById('btn-g-verify-otp');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
  }

  const email = googlePendingAccount?.email || 'saladisiddharth@gmail.com';
  const name = googlePendingAccount?.name || email.split('@')[0];

  const res = await Store.verifyRegistrationOtp(email, otp, name, 'GOOGLE_AUTH_VERIFIED', 'student');
  if (res.success) {
    if (typeof UI !== 'undefined') {
      UI.closeModal();
      UI.toast('success', `🌟 Welcome, ${name}!`, 'Google account verified! Starting your onboarding...');
    }
    if (typeof ActionPhysics !== 'undefined') {
      ActionPhysics.cyberShieldUnlock(name);
    }
    setTimeout(() => {
      if (typeof Router !== 'undefined') {
        Router.navigate(Store.isOnboarded() ? '/dashboard' : '/onboarding/identity');
      }
    }, 450);
  } else {
    if (typeof UI !== 'undefined') UI.toast('error', 'Verification Failed', res.error || 'Invalid OTP code.');
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-check-circle"></i> Verify OTP & Sign In';
    }
  }
}
window.handleVerifyGoogleOtp = handleVerifyGoogleOtp;

async function handleInstantGoogleDevLogin(name = 'Saladi Siddharth', email = 'saladisiddharth@gmail.com') {
  const customEmail = document.getElementById('g-custom-email')?.value?.trim();
  const targetEmail = customEmail || email;
  const targetName = customEmail ? customEmail.split('@')[0] : name;

  if (typeof UI !== 'undefined') UI.closeModal();

  const googleProfile = {
    name: targetName,
    email: targetEmail,
    googleId: 'goog_dev_' + Date.now(),
    picture: 'https://lh3.googleusercontent.com/a/default-user=s96-c'
  };

  const res = await Store.loginWithGoogle(googleProfile);
  if (res.success) {
    if (typeof ActionPhysics !== 'undefined') {
      ActionPhysics.cyberShieldUnlock(targetName);
    }
    if (typeof UI !== 'undefined') {
      UI.toast('success', '🌟 Google Authentication Verified!', `Signed in as ${targetName}!`);
    }
    setTimeout(() => {
      if (typeof Router !== 'undefined') {
        Router.navigate(Store.isOnboarded() ? '/dashboard' : '/onboarding/identity');
      }
    }, 450);
  }
}
window.handleInstantGoogleDevLogin = handleInstantGoogleDevLogin;

function toggleLoginRegister() {
  const isRegister = document.getElementById('mode-register')?.style.display !== 'none';
  if (isRegister) {
    switchAuthMode('email');
    if (typeof Router !== 'undefined') Router.navigate('/auth/login');
  } else {
    switchAuthMode('register');
    if (typeof Router !== 'undefined') Router.navigate('/auth/register');
  }
}
window.toggleLoginRegister = toggleLoginRegister;

/* ═══════════════════════════════════════════════════════════════════
   MANDATORY EMAIL OTP SIGN UP & ONBOARDING LAUNCHER
   ═══════════════════════════════════════════════════════════════════ */
let regCountdownInterval = null;

async function handleUserSignUp() {
  const name = document.getElementById('reg-name-input')?.value?.trim();
  const email = document.getElementById('reg-email-input')?.value?.trim();
  const password = document.getElementById('reg-password-input')?.value;

  if (!name) {
    if (typeof UI !== 'undefined') UI.toast('warning', 'Name Required', 'Please enter your full name.');
    document.getElementById('reg-name-input')?.focus();
    return;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (typeof UI !== 'undefined') UI.toast('warning', 'Valid Email Required', 'Please enter a valid email address.');
    document.getElementById('reg-email-input')?.focus();
    return;
  }
  if (!password || password.length < 6) {
    if (typeof UI !== 'undefined') UI.toast('warning', 'Password Too Short', 'Password must be at least 6 characters.');
    document.getElementById('reg-password-input')?.focus();
    return;
  }

  const btn = document.getElementById('btn-submit-signup');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending 6-Digit OTP...';
  }

  const panda = document.getElementById('panda-avatar');
  if (panda) {
    panda.style.transform = 'translateY(-12px) scale(1.08)';
    panda.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  }

  try {
    const res = await Store.sendRegistrationOtp(email, name);
    if (res.success) {
      if (typeof UI !== 'undefined') {
        UI.toast('success', 'Verification Code Sent', `6-digit verification code sent to ${email}. Check your inbox!`);
      }
      const step1 = document.getElementById('reg-step-1');
      const step2 = document.getElementById('reg-step-2');
      if (step1) step1.style.display = 'none';
      if (step2) step2.style.display = 'block';

      const targetEl = document.getElementById('reg-target-email');
      if (targetEl) targetEl.textContent = email;

      const otpInput = document.getElementById('reg-otp-input');
      if (otpInput) {
        otpInput.value = '';
        otpInput.focus();
      }

      startRegCountdown();
    } else {
      if (typeof UI !== 'undefined') {
        UI.toast('error', 'Failed to Send OTP', res.error || 'Please check your email address and try again.');
      }
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Sign Up & Verify Email OTP';
      }
    }
  } catch (err) {
    if (typeof UI !== 'undefined') UI.toast('error', 'Sign Up Error', err.message);
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Sign Up & Verify Email OTP';
    }
  }
}
window.handleUserSignUp = handleUserSignUp;

function backToRegisterStep1() {
  const step1 = document.getElementById('reg-step-1');
  const step2 = document.getElementById('reg-step-2');
  if (step1) step1.style.display = 'block';
  if (step2) step2.style.display = 'none';
  const btn = document.getElementById('btn-submit-signup');
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Sign Up & Verify Email OTP';
  }
}
window.backToRegisterStep1 = backToRegisterStep1;

function startRegCountdown() {
  let seconds = 30;
  const countEl = document.getElementById('reg-countdown');
  const btn = document.getElementById('btn-resend-reg-otp');
  if (btn) btn.disabled = true;
  if (regCountdownInterval) clearInterval(regCountdownInterval);

  regCountdownInterval = setInterval(() => {
    seconds--;
    if (countEl) countEl.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(regCountdownInterval);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-redo"></i> Resend code';
      }
    }
  }, 1000);
}

async function handleResendRegistrationOtp() {
  const name = document.getElementById('reg-name-input')?.value?.trim();
  const email = document.getElementById('reg-email-input')?.value?.trim();
  if (!email) return;

  const btn = document.getElementById('btn-resend-reg-otp');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Resending...';
  }

  const res = await Store.sendRegistrationOtp(email, name);
  if (res.success) {
    if (typeof UI !== 'undefined') UI.toast('success', 'Code Resent', `New verification code sent to ${email}`);
    startRegCountdown();
  } else {
    if (typeof UI !== 'undefined') UI.toast('error', 'Resend Failed', res.error || 'Failed to resend code');
    if (btn) btn.disabled = false;
  }
}
window.handleResendRegistrationOtp = handleResendRegistrationOtp;

async function handleVerifyRegistrationOtp() {
  const name = document.getElementById('reg-name-input')?.value?.trim();
  const email = document.getElementById('reg-email-input')?.value?.trim();
  const identity = document.getElementById('reg-identity-select')?.value || 'student';
  const password = document.getElementById('reg-password-input')?.value;
  const otp = document.getElementById('reg-otp-input')?.value?.trim();

  if (!otp || otp.length < 6) {
    if (typeof UI !== 'undefined') UI.toast('warning', 'Enter 6-Digit OTP', 'Please enter the complete 6-digit verification code.');
    document.getElementById('reg-otp-input')?.focus();
    return;
  }

  const verifyBtn = document.getElementById('btn-verify-reg-otp');
  if (verifyBtn) {
    verifyBtn.disabled = true;
    verifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
  }

  const res = await Store.verifyRegistrationOtp(email, otp, name, password, identity);

  if (res.success) {
    if (typeof ActionPhysics !== 'undefined') {
      ActionPhysics.cyberShieldUnlock(name || 'New Member');
    }
    if (typeof UI !== 'undefined') {
      UI.toast('success', `🎉 Welcome to BioVerse, ${name || 'Explorer'}!`, 'Account verified! Starting your personalized life onboarding...');
    }

    setTimeout(() => {
      if (typeof Router !== 'undefined') {
        Router.navigate('/onboarding/identity');
      } else {
        window.location.href = 'index.html#/onboarding/identity';
      }
    }, 500);
  } else {
    if (typeof UI !== 'undefined') {
      UI.toast('error', 'Verification Failed', res.error || 'Invalid OTP code. Please verify and try again.');
    }
    if (verifyBtn) {
      verifyBtn.disabled = false;
      verifyBtn.innerHTML = '<i class="fas fa-check-circle"></i> Verify OTP & Start Onboarding';
    }
  }
}
window.handleVerifyRegistrationOtp = handleVerifyRegistrationOtp;

/* ═══════════════════════════════════════════════════════════════════
   USER SIGN IN HANDLER (STRICT CREDENTIAL VALIDATION)
   ═══════════════════════════════════════════════════════════════════ */
async function handleUserSignIn(method = 'email') {
  let email = '';
  let password = '';

  if (method === 'email') {
    email = document.getElementById('email-input')?.value?.trim();
    password = document.getElementById('password-input')?.value;
  } else if (method === 'phone') {
    const phone = document.getElementById('phone-number')?.value || '9876543210';
    email = `${phone}@bioverse.phone`;
    password = 'BioVerse2026!';
  }

  if (!email) {
    if (typeof UI !== 'undefined') UI.toast('warning', 'Email Required', 'Please enter your registered email address.');
    document.getElementById('email-input')?.focus();
    return;
  }
  if (!password) {
    if (typeof UI !== 'undefined') UI.toast('warning', 'Password Required', 'Please enter your account password.');
    document.getElementById('password-input')?.focus();
    return;
  }

  const panda = document.getElementById('panda-avatar');
  if (panda) {
    panda.style.transform = 'translateY(-10px) scale(1.06)';
    panda.style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
  }

  const result = await Store.login(email, password);

  if (result.success) {
    if (typeof ActionPhysics !== 'undefined') {
      ActionPhysics.cyberShieldUnlock(result.user?.name || email);
    }
    if (typeof UI !== 'undefined') {
      UI.toast('success', 'Sign In Successful!', `Welcome back, ${result.user?.name || 'User'}!`);
    }
    setTimeout(() => {
      if (typeof Router !== 'undefined') {
        Router.navigate('/dashboard');
      } else {
        window.location.href = 'index.html#/dashboard';
      }
    }, 400);
  } else {
    if (typeof UI !== 'undefined') {
      UI.toast('error', 'Login Failed', result.error || 'Invalid email or password. Please check your credentials.');
    }
  }
}
window.handleUserSignIn = handleUserSignIn;

/* ═══════════════════════════════════════════════════════════════════
   FORGOT PASSWORD: OTP DISPATCH & RESET FLOW
   ═══════════════════════════════════════════════════════════════════ */
let forgotCountdownInterval = null;

async function handleSendForgotOtp(isResend = false) {
  const email = document.getElementById('forgot-email')?.value?.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (typeof UI !== 'undefined') UI.toast('warning', 'Valid Email Required', 'Please enter your registered email address.');
    document.getElementById('forgot-email')?.focus();
    return;
  }

  const btn = isResend ? document.getElementById('btn-forgot-resend') : document.getElementById('btn-forgot-send-otp');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending OTP code...';
  }

  const res = await Store.sendForgotPasswordOtp(email);

  if (res.success) {
    if (typeof UI !== 'undefined') {
      UI.toast('success', 'Reset Code Sent', `Verification code sent to ${email}. Check your inbox!`);
    }
    const step1 = document.getElementById('forgot-step-1');
    const step2 = document.getElementById('forgot-step-2');
    if (step1) step1.style.display = 'none';
    if (step2) step2.style.display = 'block';

    const targetEl = document.getElementById('forgot-target-email');
    if (targetEl) targetEl.textContent = email;

    const otpInput = document.getElementById('forgot-otp-input');
    if (otpInput) {
      otpInput.value = '';
      otpInput.focus();
    }

    startForgotCountdown();
  } else {
    if (typeof UI !== 'undefined') {
      UI.toast('error', 'Reset Failed', res.error || 'Failed to dispatch reset code.');
    }
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = isResend ? '<i class="fas fa-redo"></i> Resend code' : '<i class="fas fa-paper-plane"></i> Send 6-Digit Reset Code';
    }
  }
}
window.handleSendForgotOtp = handleSendForgotOtp;

function startForgotCountdown() {
  let seconds = 30;
  const countEl = document.getElementById('forgot-countdown');
  const btn = document.getElementById('btn-forgot-resend');
  if (btn) btn.disabled = true;
  if (forgotCountdownInterval) clearInterval(forgotCountdownInterval);

  forgotCountdownInterval = setInterval(() => {
    seconds--;
    if (countEl) countEl.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(forgotCountdownInterval);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-redo"></i> Resend code';
      }
    }
  }, 1000);
}

function backToForgotStep1() {
  const step1 = document.getElementById('forgot-step-1');
  const step2 = document.getElementById('forgot-step-2');
  if (step1) step1.style.display = 'block';
  if (step2) step2.style.display = 'none';
  const btn = document.getElementById('btn-forgot-send-otp');
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send 6-Digit Reset Code';
  }
}
window.backToForgotStep1 = backToForgotStep1;

async function handleSaveNewPassword() {
  const email = document.getElementById('forgot-email')?.value?.trim();
  const otp = document.getElementById('forgot-otp-input')?.value?.trim();
  const newPassword = document.getElementById('forgot-new-password')?.value;
  const confirmPassword = document.getElementById('forgot-confirm-password')?.value;

  if (!otp || otp.length < 6) {
    if (typeof UI !== 'undefined') UI.toast('warning', 'Enter OTP', 'Please enter the 6-digit OTP code.');
    document.getElementById('forgot-otp-input')?.focus();
    return;
  }
  if (!newPassword || newPassword.length < 6) {
    if (typeof UI !== 'undefined') UI.toast('warning', 'Password Too Short', 'Password must be at least 6 characters.');
    document.getElementById('forgot-new-password')?.focus();
    return;
  }
  if (newPassword !== confirmPassword) {
    if (typeof UI !== 'undefined') UI.toast('warning', 'Passwords Do Not Match', 'Please ensure both passwords match.');
    document.getElementById('forgot-confirm-password')?.focus();
    return;
  }

  const btn = document.getElementById('btn-forgot-save-pass');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating Password...';
  }

  const res = await Store.resetPassword(email, otp, newPassword);

  if (res.success) {
    if (typeof UI !== 'undefined') {
      UI.toast('success', '🎉 Password Updated!', 'Logging into your BioVerse dashboard...');
    }
    await Store.login(email, newPassword);
    setTimeout(() => {
      if (typeof Router !== 'undefined') {
        Router.navigate('/dashboard');
      } else {
        window.location.href = 'index.html#/dashboard';
      }
    }, 600);
  } else {
    if (typeof UI !== 'undefined') {
      UI.toast('error', 'Reset Failed', res.error || 'Invalid or expired OTP code.');
    }
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-check-circle"></i> Save New Password & Continue';
    }
  }
}
window.handleSaveNewPassword = handleSaveNewPassword;

function demoAutoFillOtp() {
  const sampleCode = "849201".split('');
  const container = document.getElementById('slots-container');
  if (!container) return;
  const slots = container.querySelectorAll('.slot');
  const inputs = container.querySelectorAll('.slot__input');

  sampleCode.forEach((digit, i) => {
    setTimeout(() => {
      if (inputs[i]) {
        inputs[i].value = digit;
        const slot = slots[i];
        const digitSpan = slot.querySelector('.slot__digit');
        if (digitSpan) digitSpan.textContent = digit;
        slot.classList.add('filled');
        if (i === sampleCode.length - 1) {
          setTimeout(() => handleUserSignIn('phone'), 300);
        }
      }
    }, i * 100);
  });
}
window.demoAutoFillOtp = demoAutoFillOtp;
