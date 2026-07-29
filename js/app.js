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

// Initialize Router on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  // Hide loading screen
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }
  }, 1000); // Small delay to show off the animation

  Router.init();
});
