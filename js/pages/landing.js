/* ═══════════════════════════════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════════════════════════════ */

function LandingPage() {
  return `
    <div class="landing-page" style="position:relative;overflow:hidden;">
      ${UI.publicTopbar()}
      ${UI.aurora()}

      <!-- HERO SECTION -->
      <section class="hero" style="position:relative;z-index:2;">
        <div class="hero-grid"></div>
        ${UI.particles(25)}
        ${UI.meteors(18)}
        <div class="orb orb-indigo" style="top:-100px;right:-100px;"></div>
        <div class="orb orb-violet" style="bottom:-150px;left:-100px;"></div>

        <div class="hero-content">
          <div class="hero-badge animated-gradient" style="box-shadow:0 0 20px rgba(99,102,241,0.4);">
            <span class="animate-bounce">✨</span>
            <span>Aceternity UI & Magic UI Powered Platform</span>
          </div>
          <h1>
            Your <span class="text-gradient">BioVerse</span> for<br>
            Career, Health & Indian Ecosystem
          </h1>
          <p class="hero-subtitle">
            One intelligent platform built for Indian Students, Employees, and Business Owners —
            guiding your path with real-time AI roadmaps, top tier Indian NIRF college rankings, Govt & CSR scholarships, and financial growth.
          </p>

          <div class="hero-actions">
            <button class="btn btn-shiny btn-primary btn-xl" onclick="Router.navigate('/auth/register')">
              <i class="fas fa-rocket"></i> Start Free — It Takes 60 Seconds
            </button>
            <button class="btn btn-secondary btn-xl" onclick="Router.navigate('/pricing')">
              <i class="fas fa-play-circle"></i> View Plans & Features
            </button>
          </div>

          <!-- MAGIC UI MARQUEE LOOP -->
          <div style="width:100%;max-width:900px;margin-top:20px;">
            ${UI.marquee([
              { icon: '🇮🇳', text: 'IIT Bombay & IIT Delhi Placement Prep', sub: 'NIRF #1' },
              { icon: '🏛️', text: 'NITI Aayog & Govt Internship Portal', sub: 'Govt Exposure' },
              { icon: '🚀', text: 'ISRO Space Tech Student Program', sub: 'Govt Research' },
              { icon: '💰', text: 'NSP & Reliance CSR Scholarships', sub: 'Up to ₹2 Lakh' },
              { icon: '⚡', text: 'Google India & Razorpay Off-Campus', sub: '₹23.5 LPA Avg' },
              { icon: '🏆', text: 'IIM Ahmedabad & CAT Prep Roadmap', sub: 'Management' }
            ])}
          </div>

          <div class="hero-stats" style="margin-top:24px;">
            <div class="hero-stat-item">
              <div class="hero-stat-value" data-count="75000">0</div>
              <div class="hero-stat-label">Indian Achievers</div>
            </div>
            <div class="hero-stat-item">
              <div class="hero-stat-value" data-count="320">0</div>
              <div class="hero-stat-label">Colleges & Govt Schemes</div>
            </div>
            <div class="hero-stat-item">
              <div class="hero-stat-value">4.95<span style="font-size:0.6em;opacity:0.7;">/5</span></div>
              <div class="hero-stat-label">User Rating</div>
            </div>
            <div class="hero-stat-item">
              <div class="hero-stat-value" data-count="100">0</div>
              <div class="hero-stat-label">% Free Access</div>
            </div>
          </div>
        </div>
      </section>

      <!-- IDENTITY SECTION -->
      <section class="section" style="background:var(--bg-secondary);position:relative;z-index:2;">
        <div class="container">
          <div class="section-header reveal">
            <span class="section-label">Tailored For Every Stage in India</span>
            <h2>Who Are You <span class="text-gradient">Today?</span></h2>
            <p>Your answer shapes your entire experience — personalized roadmaps, NIRF college directory, PM schemes, and salary intelligence.</p>
          </div>
          <div class="features-grid" style="max-width:1000px;">
            <div class="feature-card tilt-card hover-lift reveal delay-1" onclick="Router.navigate('/auth/register')">
              <div class="feature-icon" style="background:rgba(99,102,241,0.12);font-size:32px;">🎓</div>
              <h3>Student</h3>
              <p>Top Tier 1-4 Indian college selection, NSP & PMSS scholarships, NITI Aayog & PM Internship Scheme tracker, and GATE/JEE/CAT roadmaps.</p>
              <div style="margin-top:16px;">
                <span class="badge badge-primary">IIT / AIIMS Directory</span>
                <span class="badge badge-info">Govt Scholarships</span>
              </div>
            </div>
            <div class="feature-card tilt-card hover-lift reveal delay-2" onclick="Router.navigate('/auth/register')">
              <div class="feature-icon" style="background:rgba(16,185,129,0.12);font-size:32px;">💼</div>
              <h3>Employee</h3>
              <p>Indian IT & corporate salary negotiation, promotion predictor, Nifty 50 SIP calculator, EPF tracker, and burnout prevention.</p>
              <div style="margin-top:16px;">
                <span class="badge badge-success">Salary Intel (INR)</span>
                <span class="badge badge-warning">Promotion Track</span>
              </div>
            </div>
            <div class="feature-card tilt-card hover-lift reveal delay-3" onclick="Router.navigate('/auth/register')">
              <div class="feature-icon" style="background:rgba(245,158,11,0.12);font-size:32px;">🏢</div>
              <h3>Business Owner</h3>
              <p>Startup India incubator guidance, fundraising CRM, GST/tax optimization, team management, and scale playbooks.</p>
              <div style="margin-top:16px;">
                <span class="badge badge-warning">Startup India</span>
                <span class="badge badge-danger">Fundraising CRM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- DOMAINS SECTION -->
      <section class="section" style="position:relative;z-index:2;">
        <div class="container">
          <div class="section-header reveal">
            <span class="section-label">5 Life Domains. One Platform.</span>
            <h2>Holistic <span class="text-gradient-accent">Intelligence</span></h2>
            <p>BioVerse connects your career, health, finances, productivity, and personal vision into a unified dashboard.</p>
          </div>
          <div class="features-grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr));max-width:1200px;">
            ${[
              { icon: '🚀', title: 'Career', desc: 'IIT/IIM roadmaps, skills, ATS resume analyzer, interview prep', color: '#6366f1' },
              { icon: '💪', title: 'Health', desc: 'Ayurveda & modern fitness, water intake, sleep, calorie tracking', color: '#10b981' },
              { icon: '💰', title: 'Finance', desc: 'INR Budget, Mutual Fund SIP, 80C Tax, Emergency Fund', color: '#f59e0b' },
              { icon: '⚡', title: 'Work', desc: 'Pomodoro focus timer, Eisenhower matrix, task prioritization', color: '#06b6d4' },
              { icon: '🌟', title: 'Life Success', desc: 'Vision board, happiness tracker, bucket list, family retreat goals', color: '#ec4899' },
            ].map((d, i) => `
              <div class="feature-card tilt-card hover-lift reveal delay-${i + 1}" style="text-align:center;">
                <div style="font-size:40px;margin-bottom:12px;">${d.icon}</div>
                <h3 style="color:${d.color};">${d.title}</h3>
                <p>${d.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- HOW IT WORKS -->
      <section class="section" style="background:var(--bg-secondary);position:relative;z-index:2;">
        <div class="container">
          <div class="section-header reveal">
            <span class="section-label">Simple Start. Massive Impact.</span>
            <h2>How It <span class="text-gradient">Works</span></h2>
          </div>
          <div class="how-steps reveal">
            <div class="how-step tilt-card">
              <div class="how-step-number animated-gradient" style="color:white;">1</div>
              <h3>Choose Your Identity</h3>
              <p style="color:var(--text-muted);font-size:14px;">Select Student, Employee, or Business Owner to unlock tailored Indian tools & roadmaps.</p>
            </div>
            <div class="how-step tilt-card">
              <div class="how-step-number" style="background:rgba(6,182,212,0.15);color:var(--cyan);">2</div>
              <h3>Get Your Life Roadmap</h3>
              <p style="color:var(--text-muted);font-size:14px;">AI constructs your custom 5/10-year growth plan across Career, Health, Finance & Personal Goals.</p>
            </div>
            <div class="how-step tilt-card">
              <div class="how-step-number" style="background:rgba(16,185,129,0.15);color:var(--emerald);">3</div>
              <h3>Grow With AI Coaching</h3>
              <p style="color:var(--text-muted);font-size:14px;">Real-time AI alerts, scholarship deadlines, placement prep, and adaptive score tracking.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- AI COACH PREVIEW -->
      <section class="section" style="position:relative;z-index:2;">
        <div class="container">
          <div class="section-header reveal">
            <span class="section-label">24/7 AI Life Coach</span>
            <h2>Your Personal <span class="text-gradient-warm">AI Companion</span></h2>
            <p>Ask anything about GATE/CAT preparation, software developer stipends, tax savings under Section 80C, or workout plans.</p>
          </div>
          <div class="card-glass tilt-card reveal" style="max-width:700px;margin:0 auto;padding:32px;border:1px solid rgba(99,102,241,0.25);">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
              <div class="coach-avatar"><span>🤖</span></div>
              <div>
                <div style="font-weight:700;">BioVerse AI Coach</div>
                <div class="coach-status"><span class="coach-status-dot"></span> Always Online</div>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px;">
              <div class="chat-bubble ai">
                Namaste! I'm your AI Life Coach. I can help with Indian college admissions, scholarship applications, career growth, financial planning, and health goals. What's on your mind today? 😊
              </div>
              <div class="chat-bubble user">
                I'm in 3rd year B.Tech. Should I prepare for GATE or focus on off-campus placements for tech companies like Razorpay & Google India?
              </div>
              <div class="chat-bubble ai">
                Great question! Based on current Indian tech hiring trends, top product companies like Razorpay and Google offer average packages of <strong>₹23.5 LPA</strong> for SDE roles. If your goal is high industry impact, focus 70% on DSA + System Design and apply for the PM Internship Scheme. I can build a 6-month weekly study schedule for you right now!
              </div>
            </div>
            <div style="margin-top:16px;text-align:center;">
              <button class="btn btn-shiny btn-primary" onclick="Router.navigate('/auth/register')">
                <i class="fas fa-comments"></i> Talk to AI Coach Free
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- TESTIMONIALS -->
      <section class="section" style="background:var(--bg-secondary);position:relative;z-index:2;">
        <div class="container">
          <div class="section-header reveal">
            <span class="section-label">Loved by Indian Achievers</span>
            <h2>Success <span class="text-gradient">Stories</span></h2>
          </div>
          <div class="testimonials-grid reveal">
            <div class="testimonial-card tilt-card hover-lift">
              <div class="testimonial-stars">★★★★★</div>
              <p class="testimonial-text">"BioVerse completely transformed my career trajectory. I went from a Tier-3 college student to landing a ₹24 LPA Software Engineer offer at Google India using their placement roadmap and scholarship tracker!"</p>
              <div class="testimonial-author">
                <div class="avatar" style="background:linear-gradient(135deg,#6366f1,#06b6d4);">RK</div>
                <div><div class="testimonial-name">Rohan Sharma</div><div class="testimonial-role">Software Engineer at Google India</div></div>
              </div>
            </div>
            <div class="testimonial-card tilt-card hover-lift">
              <div class="testimonial-stars">★★★★★</div>
              <p class="testimonial-text">"As a startup founder in Bengaluru, juggling team management, Startup India compliance, and fundraising was chaotic. BioVerse gave me clarity and helped me raise our seed round."</p>
              <div class="testimonial-author">
                <div class="avatar" style="background:linear-gradient(135deg,#f59e0b,#f43f5e);">PS</div>
                <div><div class="testimonial-name">Priya Sharma</div><div class="testimonial-role">Founder & CEO, NexaTech India</div></div>
              </div>
            </div>
            <div class="testimonial-card tilt-card hover-lift">
              <div class="testimonial-stars">★★★★★</div>
              <p class="testimonial-text">"The holistic approach connecting career growth to physical fitness and Nifty 50 SIP investing has been a game-changer. My personal finance score jumped from 50 to 88."</p>
              <div class="testimonial-author">
                <div class="avatar" style="background:linear-gradient(135deg,#10b981,#06b6d4);">AM</div>
                <div><div class="testimonial-name">Ankit Mehta</div><div class="testimonial-role">Senior Consultant, Deloitte India</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA SECTION -->
      <section class="cta-section" style="position:relative;z-index:2;">
        <div class="orb orb-indigo" style="top:-100px;left:50%;transform:translateX(-50%);opacity:0.15;"></div>
        <div class="cta-box reveal gradient-border tilt-card">
          <h2>Ready to Map Your <span class="text-gradient">Life Journey?</span></h2>
          <p>Join 75,000+ Indian students, professionals, and entrepreneurs transforming their careers, health, and wealth with BioVerse.</p>
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
            <button class="btn btn-shiny btn-primary btn-xl" onclick="Router.navigate('/auth/register')">
              <i class="fas fa-rocket"></i> Get Started Free Today
            </button>
            <button class="btn btn-secondary btn-xl" onclick="Router.navigate('/pricing')">View All Plans</button>
          </div>
          <p style="margin-top:16px;font-size:13px;color:var(--text-dim);">No credit card required. Free forever access available.</p>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="landing-footer" style="position:relative;z-index:2;">
        <div class="footer-grid">
          <div>
            <div class="footer-brand"><span class="text-gradient">🧬 BioVerse India</span></div>
            <p class="footer-desc">The premier intelligent life management platform for India. Empowering Students, Employees, and Business Owners across Career, Health, Finance, Work & Life Success.</p>
          </div>
          <div>
            <div class="footer-title">Product</div>
            <div class="footer-links">
              <a onclick="Router.navigate('/pricing')">Pricing</a>
              <a onclick="Router.navigate('/auth/register')">Get Started</a>
              <a onclick="Router.navigate('/student/colleges')">Indian Colleges</a>
              <a onclick="Router.navigate('/student/scholarships')">Govt Scholarships</a>
            </div>
          </div>
          <div>
            <div class="footer-title">Identity Tracks</div>
            <div class="footer-links">
              <a onclick="Router.navigate('/auth/register')">Student Track</a>
              <a onclick="Router.navigate('/auth/register')">Employee Track</a>
              <a onclick="Router.navigate('/auth/register')">Business Track</a>
              <a onclick="Router.navigate('/dashboard/coach')">AI Life Coach</a>
            </div>
          </div>
          <div>
            <div class="footer-title">Legal</div>
            <div class="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} BioVerse India. All rights reserved. Built with ❤️ for dreamers, doers, and achievers in India.</p>
        </div>
      </footer>
    </div>
  `;
}
