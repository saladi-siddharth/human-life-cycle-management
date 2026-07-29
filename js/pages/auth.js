/* ═══════════════════════════════════════════════════════════════════
   AUTH PAGES — Login, Register, Forgot Password
   ═══════════════════════════════════════════════════════════════════ */

function LoginPage() {
  return `
    <div class="auth-page">
      <div class="orb orb-indigo" style="top:-100px;right:-100px;"></div>
      <div class="orb orb-violet" style="bottom:-100px;left:-100px;"></div>
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-logo" style="cursor:pointer;" onclick="Router.navigate('/')">🧭</div>
          <h2>Welcome Back</h2>
          <p>Sign in to continue your life journey</p>
        </div>

        <div class="auth-form" id="login-form">
          <button class="btn btn-google btn-full btn-lg" onclick="handleGoogleLogin()">
            <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            Continue with Google
          </button>

          <div class="divider-text">or sign in with email</div>

          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-input" id="login-email" placeholder="you@example.com" autocomplete="email">
          </div>

          <div class="form-group" style="position:relative;">
            <label class="form-label">Password</label>
            <input type="password" class="form-input" id="login-password" placeholder="Enter your password" autocomplete="current-password">
            <button class="password-toggle" type="button" onclick="togglePassword('login-password', this)" style="top:70%;"><i class="fas fa-eye"></i></button>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;">
            <label class="checkbox-group">
              <input type="checkbox" class="checkbox-input" checked> <span style="font-size:13px;color:var(--text-muted);">Remember me</span>
            </label>
            <a style="font-size:13px;" onclick="Router.navigate('/auth/forgot-password')">Forgot password?</a>
          </div>

          <button class="btn btn-primary btn-full btn-lg" onclick="handleLogin()">
            <i class="fas fa-sign-in-alt"></i> Sign In
          </button>
        </div>

        <div class="auth-footer">
          Don't have an account? <a onclick="Router.navigate('/auth/register')">Sign up free</a>
        </div>
      </div>
    </div>
  `;
}

function RegisterPage() {
  return `
    <div class="auth-page">
      <div class="orb orb-cyan" style="top:-80px;left:-80px;"></div>
      <div class="orb orb-violet" style="bottom:-120px;right:-120px;"></div>
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-logo" style="cursor:pointer;" onclick="Router.navigate('/')">🧭</div>
          <h2>Create Your Account</h2>
          <p>Start your journey to a better life</p>
        </div>

        <div class="auth-form" id="register-form">
          <button class="btn btn-google btn-full btn-lg" onclick="handleGoogleLogin()">
            <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            Sign up with Google
          </button>

          <div class="divider-text">or register with email</div>

          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-input" id="register-name" placeholder="John Doe" autocomplete="name">
          </div>

          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-input" id="register-email" placeholder="you@example.com" autocomplete="email">
          </div>

          <div class="form-group" style="position:relative;">
            <label class="form-label">Password</label>
            <input type="password" class="form-input" id="register-password" placeholder="Min. 8 characters" autocomplete="new-password">
            <button class="password-toggle" type="button" onclick="togglePassword('register-password', this)" style="top:70%;"><i class="fas fa-eye"></i></button>
          </div>

          <div class="form-group" style="position:relative;">
            <label class="form-label">Confirm Password</label>
            <input type="password" class="form-input" id="register-confirm" placeholder="Repeat your password" autocomplete="new-password">
          </div>

          <label class="checkbox-group">
            <input type="checkbox" class="checkbox-input" id="register-terms">
            <span style="font-size:13px;color:var(--text-muted);">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
          </label>

          <button class="btn btn-primary btn-full btn-lg" onclick="handleRegister()">
            <i class="fas fa-user-plus"></i> Create Account
          </button>
        </div>

        <div class="auth-footer">
          Already have an account? <a onclick="Router.navigate('/auth/login')">Sign in</a>
        </div>
      </div>
    </div>
  `;
}

function ForgotPasswordPage() {
  return `
    <div class="auth-page">
      <div class="orb orb-indigo" style="top:-100px;left:50%;transform:translateX(-50%);"></div>
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-logo">🔑</div>
          <h2>Reset Password</h2>
          <p>Enter your email and we'll send you a reset link</p>
        </div>

        <div class="auth-form">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-input" id="forgot-email" placeholder="you@example.com">
          </div>

          <button class="btn btn-primary btn-full btn-lg" onclick="handleForgotPassword()">
            <i class="fas fa-paper-plane"></i> Send Reset Link
          </button>
        </div>

        <div class="auth-footer">
          Remember your password? <a onclick="Router.navigate('/auth/login')">Sign in</a>
        </div>
      </div>
    </div>
  `;
}

// ─── Auth Handlers ─────────────────────────────────────
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon = btn.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fas fa-eye';
  }
}

function handleLogin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  if (!email || !password) {
    UI.toast('error', 'Missing Fields', 'Please enter your email and password.');
    return;
  }
  if (!email.includes('@')) {
    UI.toast('error', 'Invalid Email', 'Please enter a valid email address.');
    return;
  }
  Store.login(email, password);
  EmailService.sendSecurityAlert('Login Attempt', `Successful login for user ${email} at ${new Date().toLocaleTimeString()}`, email);
  UI.toast('success', 'Welcome Back!', 'You have been signed in successfully.');
  if (Store.isOnboarded()) {
    Router.navigate('/dashboard');
  } else {
    Router.navigate('/onboarding/identity');
  }
}

function handleGoogleLogin() {
  Store.loginWithGoogle();
  EmailService.sendSecurityAlert('Google OAuth Login', 'Successful Google Authentication on BioVerse platform.');
  UI.toast('success', 'Google Sign-In', 'Successfully signed in with Google.');
  if (Store.isOnboarded()) {
    Router.navigate('/dashboard');
  } else {
    Router.navigate('/onboarding/identity');
  }
}

function handleRegister() {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirm = document.getElementById('register-confirm').value;
  const terms = document.getElementById('register-terms').checked;

  if (!name || !email || !password) {
    UI.toast('error', 'Missing Fields', 'Please fill in all required fields.');
    return;
  }
  if (!email.includes('@')) {
    UI.toast('error', 'Invalid Email', 'Please enter a valid email address.');
    return;
  }
  if (password.length < 8) {
    UI.toast('error', 'Weak Password', 'Password must be at least 8 characters.');
    return;
  }
  if (password !== confirm) {
    UI.toast('error', 'Password Mismatch', 'Passwords do not match.');
    return;
  }
  if (!terms) {
    UI.toast('warning', 'Terms Required', 'Please agree to the Terms of Service.');
    return;
  }

  Store.register(name, email, password);
  EmailService.sendWelcomeEmail(name, email);
  UI.toast('success', 'Account Created!', 'Welcome to BioVerse! Let\'s set up your profile.');
  Router.navigate('/onboarding/identity');
}

function handleForgotPassword() {
  const email = document.getElementById('forgot-email').value;
  if (!email || !email.includes('@')) {
    UI.toast('error', 'Invalid Email', 'Please enter a valid email address.');
    return;
  }
  EmailService.sendSecurityAlert('Password Reset Request', `Password reset token requested for ${email}`, email);
  UI.toast('success', 'Reset Link Sent', `We've sent a password reset link to ${email}`);
  setTimeout(() => Router.navigate('/auth/login'), 2000);
}
