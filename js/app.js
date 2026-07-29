/* ═══════════════════════════════════════════════════════════════════
   LIFEGPS APP INITIALIZATION
   ═══════════════════════════════════════════════════════════════════ */

// Register all routes
Router.register('/', LandingPage);
Router.register('/pricing', PricingPage);

// Auth
Router.register('/auth/login', LoginPage);
Router.register('/auth/register', RegisterPage);
Router.register('/auth/forgot-password', ForgotPasswordPage);

// Onboarding
Router.register('/onboarding/identity', IdentityPage);
Router.register('/onboarding/profile', ProfilePage);
Router.register('/onboarding/goals', GoalsPage);
Router.register('/onboarding/complete', OnboardingCompletePage);

// Dashboard Main Domains
Router.register('/dashboard', DashboardPage);
Router.register('/dashboard/career', CareerPage);
Router.register('/dashboard/health', HealthPage);
Router.register('/dashboard/finance', FinancePage);
Router.register('/dashboard/work', WorkPage);
Router.register('/dashboard/life', LifePage);

// Dashboard Tools
Router.register('/dashboard/coach', CoachPage);
Router.register('/dashboard/notifications', NotificationsPage);
Router.register('/dashboard/settings', SettingsPage);
Router.register('/dashboard/billing', BillingPage);

// Identity Specific — Student
Router.register('/student/colleges', StudentCollegesPage);
Router.register('/student/scholarships', StudentScholarshipsPage);
Router.register('/student/internships', StudentInternshipsPage);

// Identity Specific — Employee
Router.register('/employee/jobs', EmployeeJobsPage);
Router.register('/employee/salary', EmployeeSalaryPage);
Router.register('/employee/mobility', EmployeeMobilityPage);

// Identity Specific — Business
Router.register('/business/overview', BusinessOverviewPage);
Router.register('/business/fundraising', BusinessFundraisingPage);
Router.register('/business/team', BusinessTeamPage);

// Admin
Router.register('/admin', AdminPage);

// Initialize Router & Global Micro-Interactions on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  // Hide loading screen
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }
  }, 800);

  // Cursify Custom Cursor Glow Overlay
  const cursorGlow = document.createElement('div');
  cursorGlow.id = 'cursor-glow';
  document.body.appendChild(cursorGlow);

  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  });

  // Aceternity UI 3D Card Tilt Interaction & Spotlight
  document.addEventListener('mousemove', (e) => {
    const tiltCards = document.querySelectorAll('.tilt-card, .feature-card, .card-glass');
    tiltCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        if (card.classList.contains('tilt-card')) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -6;
          const rotateY = ((x - centerX) / centerX) * 6;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        }
      } else if (card.classList.contains('tilt-card')) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      }
    });
  });

  Router.init();
});
