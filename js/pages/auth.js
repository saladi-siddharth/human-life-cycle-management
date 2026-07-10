/* ============================================================
   AUTHENTICATION PAGE
   ============================================================ */

const AuthPage = {
  isLoginMode: true,

  render(container) {
    // If user is already logged in and onboarded, redirect to dashboard
    if (Store.get('user') && Store.isOnboarded) {
      Router.navigate('/dashboard');
      return;
    }

    container.innerHTML = `
      <div class="identity-page">
        <div class="hero__bg">
          <div class="hero__orb hero__orb--1"></div>
          <div class="hero__orb hero__orb--2"></div>
          <div class="hero__orb hero__orb--3"></div>
          <div class="hero__grid"></div>
        </div>

        <div style="position: relative; z-index: 1; width: 100%; max-width: 480px; margin: 0 auto; padding: var(--space-4);">
          <div style="text-align: center; margin-bottom: var(--space-6);">
            <a href="#/" style="color: var(--text-tertiary); font-size: var(--text-sm); text-decoration: none;">🧭 Back to Home</a>
          </div>

          <div class="glass-card stagger-in" style="padding: var(--space-8); border-radius: var(--radius-xl);">
            <div style="text-align: center; margin-bottom: var(--space-6);">
              <div class="landing-nav__logo" style="font-size: var(--text-3xl); margin-bottom: var(--space-2);">🧭</div>
              <h2 id="authTitle" style="margin-bottom: var(--space-2);">${this.isLoginMode ? 'Welcome Back' : 'Create Account'}</h2>
              <p id="authSubtitle" class="text-secondary">${this.isLoginMode ? 'Enter details to access your LifeGPS navigator.' : 'Register to start tracking your life domains.'}</p>
            </div>

            <!-- Google Authentication Button -->
            <button class="btn btn--secondary btn--full mb-4" onclick="AuthPage.handleGoogleAuth()" style="display: flex; align-items: center; justify-content: center; gap: var(--space-3); height: 48px; font-weight: 500;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div style="text-align: center; margin: var(--space-5) 0; color: var(--text-tertiary); font-size: var(--text-xs); display: flex; align-items: center; gap: var(--space-2);">
              <div style="flex: 1; height: 1px; background: var(--glass-border);"></div>
              <span>OR EMAIL SECURELY</span>
              <div style="flex: 1; height: 1px; background: var(--glass-border);"></div>
            </div>

            <!-- Email & Password Inputs -->
            <div class="form-group mb-4">
              <label class="form-label" style="font-size: var(--text-xs); color: var(--text-secondary);">EMAIL ADDRESS</label>
              <input class="form-input" type="email" id="authEmail" placeholder="you@example.com" style="height: 48px; border-radius: var(--radius-md);">
            </div>
            <div class="form-group mb-5">
              <label class="form-label" style="font-size: var(--text-xs); color: var(--text-secondary);">PASSWORD</label>
              <input class="form-input" type="password" id="authPassword" placeholder="Minimum 6 characters" style="height: 48px; border-radius: var(--radius-md);" onkeydown="if(event.key==='Enter') AuthPage.handleAuth()">
            </div>

            <div id="authError" style="color: var(--color-danger); font-size: var(--text-sm); margin-bottom: var(--space-4); text-align: center; display: none;"></div>

            <button class="btn btn--primary btn--full mb-5" id="authSubmitBtn" onclick="AuthPage.handleAuth()" style="height: 48px; font-weight: 600; box-shadow: var(--shadow-glow-primary);">
              ${this.isLoginMode ? 'Sign In to Dashboard' : 'Create Lifetime Account'}
            </button>

            <div style="text-align: center; font-size: var(--text-sm);">
              <span class="text-secondary" id="authToggleText">${this.isLoginMode ? "Don't have an account?" : 'Already have an account?'}</span>
              <a href="#" style="color: var(--color-primary-light); text-decoration: none; font-weight: 500; margin-left: var(--space-1);" onclick="AuthPage.toggleAuthMode(); return false;" id="authToggleBtn">
                ${this.isLoginMode ? 'Sign up' : 'Log in'}
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  toggleAuthMode() {
    this.isLoginMode = !this.isLoginMode;
    document.getElementById('authTitle').textContent = this.isLoginMode ? 'Welcome Back' : 'Create Account';
    document.getElementById('authSubtitle').textContent = this.isLoginMode ? 'Enter details to access your LifeGPS navigator.' : 'Register to start tracking your life domains.';
    document.getElementById('authSubmitBtn').textContent = this.isLoginMode ? 'Sign In to Dashboard' : 'Create Lifetime Account';
    document.getElementById('authToggleText').textContent = this.isLoginMode ? "Don't have an account?" : 'Already have an account?';
    document.getElementById('authToggleBtn').textContent = this.isLoginMode ? 'Sign up' : 'Log in';
    document.getElementById('authError').style.display = 'none';
  },

  async handleAuth() {
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    const errorEl = document.getElementById('authError');
    const btn = document.getElementById('authSubmitBtn');

    if (!email || !password) {
      errorEl.textContent = 'Please fill in all fields.';
      errorEl.style.display = 'block';
      return;
    }

    errorEl.style.display = 'none';
    const originalText = btn.textContent;
    btn.textContent = 'Processing...';
    btn.disabled = true;

    try {
      let result;
      if (this.isLoginMode) {
        result = await supabaseClient.auth.signInWithPassword({ email, password });
      } else {
        result = await supabaseClient.auth.signUp({ email, password });
      }

      if (result.error) throw result.error;

      const session = result.data.session;
      if (session) {
        Store.set('user', session.user);
        
        // Check if there is an existing saved profile state
        if (session.user.user_metadata?.appState) {
          try {
            const savedState = JSON.parse(session.user.user_metadata.appState);
            Store._state = Store._deepMerge(Store._state, savedState);
            Store._persist();
          } catch(e) { console.error(e); }
        }

        // Navigate based on onboarding completion status
        if (Store.isOnboarded) {
          App.showToast('success', 'Logged In', 'Welcome back to LifeGPS!');
          Router.navigate('/dashboard');
        } else {
          Router.navigate('/identity');
        }
      } else {
        errorEl.textContent = 'Please check your email to confirm your account, then log in.';
        errorEl.style.display = 'block';
        this.isLoginMode = true;
        this.toggleAuthMode();
        this.toggleAuthMode(); // Ensure UI state matches mode
      }
    } catch (error) {
      errorEl.textContent = error.message;
      errorEl.style.display = 'block';
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  },

  async handleGoogleAuth() {
    try {
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + window.location.pathname
        }
      });
      if (error) throw error;
    } catch (error) {
      const errorEl = document.getElementById('authError');
      if (errorEl) {
        errorEl.textContent = error.message;
        errorEl.style.display = 'block';
      }
    }
  }
};
