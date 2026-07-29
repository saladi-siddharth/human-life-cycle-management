/* ═══════════════════════════════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════════════════════════════ */

function LandingPage() {
  return `
    <div class="landing-page">
      ${UI.publicTopbar()}

      <!-- HERO SECTION -->
      <section class="hero">
        <div class="hero-bg"></div>
        <div class="hero-grid"></div>
        ${UI.particles(25)}
        <div class="orb orb-indigo" style="top:-100px;right:-100px;"></div>
        <div class="orb orb-violet" style="bottom:-150px;left:-100px;"></div>

        <div class="hero-content">
          <div class="hero-badge">
            <span class="animate-bounce">✨</span>
            <span>AI-Powered Life Management Platform</span>
          </div>
          <h1>
            Your <span class="text-gradient">Life GPS</span> for<br>
            Career, Health & Success
          </h1>
          <p class="hero-subtitle">
            One intelligent platform that captures who you are — Student, Employee, or Business Owner —
            and guides your entire journey across Career, Health, Finance, Work & Life.
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary btn-xl" onclick="Router.navigate('/auth/register')">
              <i class="fas fa-rocket"></i> Start Free — It Takes 60 Seconds
            </button>
            <button class="btn btn-secondary btn-xl" onclick="Router.navigate('/pricing')">
              <i class="fas fa-play-circle"></i> See Plans
            </button>
          </div>
          <div class="hero-stats">
            <div class="hero-stat-item">
              <div class="hero-stat-value" data-count="50000">0</div>
              <div class="hero-stat-label">Active Users</div>
            </div>
            <div class="hero-stat-item">
              <div class="hero-stat-value" data-count="260">0</div>
              <div class="hero-stat-label">Smart Features</div>
            </div>
            <div class="hero-stat-item">
              <div class="hero-stat-value">4.9<span style="font-size:0.6em;opacity:0.7;">/5</span></div>
              <div class="hero-stat-label">User Rating</div>
            </div>
            <div class="hero-stat-item">
              <div class="hero-stat-value" data-count="45">0</div>
              <div class="hero-stat-label">Countries</div>
            </div>
          </div>
        </div>
      </section>

      <!-- IDENTITY SECTION -->
      <section class="section" style="background:var(--bg-secondary);">
        <div class="container">
          <div class="section-header reveal">
            <span class="section-label">One Question. Infinite Guidance.</span>
            <h2>Who Are You <span class="text-gradient">Today?</span></h2>
            <p>Your answer shapes your entire experience — personalized roadmaps, insights, and tools designed for your exact life stage.</p>
          </div>
          <div class="features-grid" style="max-width:1000px;">
            <div class="feature-card hover-lift reveal delay-1" onclick="Router.navigate('/auth/register')">
              <div class="feature-icon" style="background:rgba(99,102,241,0.12);font-size:32px;">🎓</div>
              <h3>Student</h3>
              <p>College selection, scholarship finder, internship tracker, campus placement prep, career path mapping, and academic excellence tools.</p>
              <div style="margin-top:16px;">
                <span class="badge badge-primary">Career Mapping</span>
                <span class="badge badge-info">Skill Gaps</span>
              </div>
            </div>
            <div class="feature-card hover-lift reveal delay-2" onclick="Router.navigate('/auth/register')">
              <div class="feature-icon" style="background:rgba(16,185,129,0.12);font-size:32px;">💼</div>
              <h3>Employee</h3>
              <p>Career growth engine, salary negotiation, promotion predictor, performance review prep, side hustle management, and burnout prevention.</p>
              <div style="margin-top:16px;">
                <span class="badge badge-success">Growth Track</span>
                <span class="badge badge-warning">Salary Intel</span>
              </div>
            </div>
            <div class="feature-card hover-lift reveal delay-3" onclick="Router.navigate('/auth/register')">
              <div class="feature-icon" style="background:rgba(245,158,11,0.12);font-size:32px;">🏢</div>
              <h3>Business Owner</h3>
              <p>Business dashboard, fundraising CRM, team management, growth playbooks, exit planning, and CEO development program.</p>
              <div style="margin-top:16px;">
                <span class="badge badge-warning">Scale Tools</span>
                <span class="badge badge-danger">Exit Plan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- DOMAINS SECTION -->
      <section class="section">
        <div class="container">
          <div class="section-header reveal">
            <span class="section-label">5 Life Domains. One Platform.</span>
            <h2>Holistic <span class="text-gradient-accent">Intelligence</span></h2>
            <p>Unlike fragmented apps, LifeGPS connects every domain — your career decisions consider your health, and your finances align with your life goals.</p>
          </div>
          <div class="features-grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr));max-width:1200px;">
            ${[
              { icon: '🚀', title: 'Career', desc: 'Roadmap, skills, certifications, resume builder, interview prep', color: '#6366f1' },
              { icon: '💪', title: 'Health', desc: 'Fitness plans, nutrition, sleep, mental health, preventive care', color: '#10b981' },
              { icon: '💰', title: 'Finance', desc: 'Budget, investments, debt elimination, tax optimization', color: '#f59e0b' },
              { icon: '⚡', title: 'Work', desc: 'Productivity, tasks, focus mode, meeting optimizer', color: '#06b6d4' },
              { icon: '🌟', title: 'Life Success', desc: 'Vision board, happiness tracker, legacy, relationships', color: '#ec4899' },
            ].map((d, i) => `
              <div class="feature-card hover-lift reveal delay-${i + 1}" style="text-align:center;">
                <div style="font-size:40px;margin-bottom:12px;">${d.icon}</div>
                <h3 style="color:${d.color};">${d.title}</h3>
                <p>${d.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- HOW IT WORKS -->
      <section class="section" style="background:var(--bg-secondary);">
        <div class="container">
          <div class="section-header reveal">
            <span class="section-label">Simple Start. Massive Impact.</span>
            <h2>How It <span class="text-gradient">Works</span></h2>
          </div>
          <div class="how-steps reveal">
            <div class="how-step">
              <div class="how-step-number animated-gradient" style="color:white;">1</div>
              <h3>Answer One Question</h3>
              <p style="color:var(--text-muted);font-size:14px;">Student, Employee, or Business Owner? That's all we need to start building your personalized experience.</p>
            </div>
            <div class="how-step">
              <div class="how-step-number" style="background:rgba(6,182,212,0.15);color:var(--cyan);">2</div>
              <h3>Get Your Life Roadmap</h3>
              <p style="color:var(--text-muted);font-size:14px;">Our AI builds your custom 5/10/20-year plan across all five life domains with actionable milestones.</p>
            </div>
            <div class="how-step">
              <div class="how-step-number" style="background:rgba(16,185,129,0.15);color:var(--emerald);">3</div>
              <h3>Grow With Intelligence</h3>
              <p style="color:var(--text-muted);font-size:14px;">Real-time AI coaching, predictive alerts, opportunity scanner, and adaptive goal tracking for life.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- AI COACH PREVIEW -->
      <section class="section">
        <div class="container">
          <div class="section-header reveal">
            <span class="section-label">24/7 AI Life Coach</span>
            <h2>Your Personal <span class="text-gradient-warm">AI Companion</span></h2>
            <p>Ask anything about career moves, financial decisions, health goals, or life balance. Get expert-level guidance instantly.</p>
          </div>
          <div class="card-glass reveal" style="max-width:700px;margin:0 auto;padding:32px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
              <div class="coach-avatar"><span>🤖</span></div>
              <div>
                <div style="font-weight:700;">LifeGPS AI Coach</div>
                <div class="coach-status"><span class="coach-status-dot"></span> Always Online</div>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px;">
              <div class="chat-bubble ai">
                Hi! I'm your AI Life Coach. I can help with career decisions, financial planning, health goals, and more. What's on your mind today? 😊
              </div>
              <div class="chat-bubble user">
                I'm thinking about switching careers from marketing to data science. Is it worth it?
              </div>
              <div class="chat-bubble ai">
                Great question! Based on market trends, data science roles have grown <strong>42% this year</strong> with an avg salary of <strong>$135K</strong>. Given your marketing analytics background, you already have 3/7 key skills. Here's a 6-month transition plan I'd recommend...
              </div>
            </div>
            <div style="margin-top:16px;text-align:center;">
              <button class="btn btn-primary" onclick="Router.navigate('/auth/register')">
                <i class="fas fa-comments"></i> Talk to AI Coach
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- TESTIMONIALS -->
      <section class="section" style="background:var(--bg-secondary);">
        <div class="container">
          <div class="section-header reveal">
            <span class="section-label">Loved by Thousands</span>
            <h2>Success <span class="text-gradient">Stories</span></h2>
          </div>
          <div class="testimonials-grid reveal">
            <div class="testimonial-card hover-lift">
              <div class="testimonial-stars">★★★★★</div>
              <p class="testimonial-text">"LifeGPS completely transformed my career trajectory. I went from confused engineering student to landing my dream job at Google — the AI career coach was like having a personal mentor 24/7."</p>
              <div class="testimonial-author">
                <div class="avatar" style="background:linear-gradient(135deg,#6366f1,#06b6d4);">RK</div>
                <div><div class="testimonial-name">Ravi Kumar</div><div class="testimonial-role">Software Engineer at Google</div></div>
              </div>
            </div>
            <div class="testimonial-card hover-lift">
              <div class="testimonial-stars">★★★★★</div>
              <p class="testimonial-text">"As a business owner, I was juggling a thousand things. LifeGPS gave me clarity on finances, health, and team management all in one place. My revenue grew 3x in one year."</p>
              <div class="testimonial-author">
                <div class="avatar" style="background:linear-gradient(135deg,#f59e0b,#f43f5e);">PS</div>
                <div><div class="testimonial-name">Priya Sharma</div><div class="testimonial-role">Founder & CEO, NexaTech</div></div>
              </div>
            </div>
            <div class="testimonial-card hover-lift">
              <div class="testimonial-stars">★★★★★</div>
              <p class="testimonial-text">"The holistic approach is what sets LifeGPS apart. It connected my career stress to health issues and financial anxiety — then gave me a plan to fix everything together."</p>
              <div class="testimonial-author">
                <div class="avatar" style="background:linear-gradient(135deg,#10b981,#06b6d4);">AM</div>
                <div><div class="testimonial-name">Ankit Mehta</div><div class="testimonial-role">Senior Manager, Deloitte</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA SECTION -->
      <section class="cta-section">
        <div class="orb orb-indigo" style="top:-100px;left:50%;transform:translateX(-50%);opacity:0.15;"></div>
        <div class="cta-box reveal gradient-border">
          <h2>Ready to Map Your <span class="text-gradient">Life Journey?</span></h2>
          <p>Join 50,000+ users who are transforming their careers, health, finances, and overall life satisfaction with LifeGPS.</p>
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
            <button class="btn btn-primary btn-xl" onclick="Router.navigate('/auth/register')">
              <i class="fas fa-rocket"></i> Get Started Free
            </button>
            <button class="btn btn-secondary btn-xl" onclick="Router.navigate('/pricing')">View Pricing</button>
          </div>
          <p style="margin-top:16px;font-size:13px;color:var(--text-dim);">No credit card required. Free forever plan available.</p>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="landing-footer">
        <div class="footer-grid">
          <div>
            <div class="footer-brand"><span class="text-gradient">🧭 LifeGPS</span></div>
            <p class="footer-desc">The intelligent life management platform that grows with you from student to retiree. Career, Health, Finance, Work & Life — all in one place.</p>
          </div>
          <div>
            <div class="footer-title">Product</div>
            <div class="footer-links">
              <a onclick="Router.navigate('/pricing')">Pricing</a>
              <a onclick="Router.navigate('/auth/register')">Get Started</a>
              <a href="#">AI Coach</a>
              <a href="#">Mobile App</a>
            </div>
          </div>
          <div>
            <div class="footer-title">Company</div>
            <div class="footer-links">
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
            </div>
          </div>
          <div>
            <div class="footer-title">Legal</div>
            <div class="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
              <a href="#">GDPR</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} LifeGPS. All rights reserved. Built with ❤️ for dreamers, doers, and achievers.</p>
        </div>
      </footer>
    </div>
  `;
}
