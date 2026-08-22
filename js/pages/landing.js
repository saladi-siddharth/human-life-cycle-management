/* ═══════════════════════════════════════════════════════════════════
   LANDING PAGE — EDITORIAL LUXURY (VELA ARMON AESTHETIC)
   Warm Editorial Minimalism • Liquid Glass UI • Cinematic Video
   ═══════════════════════════════════════════════════════════════════ */

function LandingPage() {
  // Schedule video fade system after render
  setTimeout(() => initEditorialVideo(), 100);

  return `
    <div class="editorial-landing">

      <!-- FULL-SCREEN BACKGROUND VIDEO -->
      <div class="editorial-video-container">
        <video
          id="editorial-bg-video"
          muted
          playsinline
          preload="auto"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
        ></video>
        <div class="editorial-video-overlay"></div>
      </div>

      <!-- LIQUID GLASS NAVIGATION -->
      <nav class="editorial-nav">
        <div class="editorial-nav-inner liquid-glass-v2">
          <div class="editorial-nav-brand" onclick="Router.navigate('/')">
            <span class="editorial-nav-brand-icon">🧬</span>
            <span class="editorial-nav-brand-text">BioVerse</span>
          </div>

          <div class="editorial-nav-links">
            <button class="editorial-nav-link" onclick="document.getElementById('editorial-journey')?.scrollIntoView({behavior:'smooth'})">Journey</button>
            <button class="editorial-nav-link" onclick="document.getElementById('editorial-pillars')?.scrollIntoView({behavior:'smooth'})">Pillars</button>
            <button class="editorial-nav-link" onclick="Router.navigate('/pricing')">Pricing</button>
          </div>

          <div class="editorial-nav-actions">
            <button class="editorial-nav-signup" onclick="Router.navigate('/auth/register')">Sign Up</button>
            <button class="editorial-nav-login liquid-glass-v2" onclick="Router.navigate('/auth/login')" style="border-radius:9999px;">Login</button>
          </div>
        </div>
      </nav>

      <!-- HERO SECTION -->
      <section class="editorial-hero">
        <h1 class="editorial-hero-heading">Built for the <em>curious</em> mind</h1>

        <p class="editorial-hero-subtitle">
          BioVerse is the intelligent life management platform for Indian students, professionals, and entrepreneurs.
          Navigate career, health, and wealth across every stage of your life journey — with real-time AI roadmaps,
          NIRF college intelligence, and financial growth tracking.
        </p>

        <div style="display:flex; align-items:center; justify-content:center; gap:16px; flex-wrap:wrap; margin-top:28px;">
          <button class="editorial-manifesto-btn liquid-glass-v2" onclick="document.getElementById('editorial-journey')?.scrollIntoView({behavior:'smooth'})" style="border-radius:9999px;">
            <i class="fas fa-feather-alt" style="opacity:0.7;"></i> Our Manifesto
          </button>
          <button class="editorial-manifesto-btn liquid-glass-v2" onclick="handleGoToDashboard()" style="border-radius:9999px; background:linear-gradient(135deg, rgba(0,242,254,0.3) 0%, rgba(79,70,229,0.3) 100%); border:1px solid rgba(0,242,254,0.6); box-shadow:0 8px 30px rgba(0,242,254,0.25); color:#fff; font-weight:700;">
            <i class="fas fa-chart-line" style="color:#00f2fe;"></i> Go to Dashboard <i class="fas fa-arrow-right" style="font-size:11px; margin-left:4px;"></i>
          </button>
        </div>
      </section>

      <!-- SOCIAL ICONS -->
      <div class="editorial-social-footer">
        <a class="editorial-social-btn liquid-glass-v2" href="#" style="border-radius:50%;" aria-label="Instagram">
          <i class="fab fa-instagram"></i>
        </a>
        <a class="editorial-social-btn liquid-glass-v2" href="#" style="border-radius:50%;" aria-label="Twitter">
          <i class="fab fa-twitter"></i>
        </a>
        <a class="editorial-social-btn liquid-glass-v2" href="#" style="border-radius:50%;" aria-label="Website">
          <i class="fas fa-globe"></i>
        </a>
      </div>

      <!-- WARM GRADIENT TRANSITION -->
      <div class="editorial-warmfade"></div>

      <!-- ═══════════════════════════════════════════════════════════
           BELOW THE FOLD — WARM CREAM EDITORIAL CONTENT
           ═══════════════════════════════════════════════════════════ -->
      <div class="editorial-sections">

        <!-- THE LIFE JOURNEY (4 ACTS) -->
        <section class="editorial-section" id="editorial-journey">
          <div class="editorial-section-label">The Life Architecture</div>
          <h2 class="editorial-section-title">Four seasons of a <em style="font-family:'Instrument Serif',serif;">purposeful</em> life</h2>
          <p class="editorial-section-body">
            Every great life unfolds in chapters. BioVerse maps your journey through four distinct seasons —
            from the raw curiosity of learning to the quiet wisdom of legacy — ensuring each stage is lived
            with intention, clarity, and balance.
          </p>

          <div class="editorial-acts-grid">
            <div class="editorial-act-card">
              <div class="editorial-act-number">ACT I</div>
              <h3 class="editorial-act-title">The Awakening</h3>
              <div class="editorial-act-age">Ages 18 – 25 · Foundation & Learning</div>
              <p class="editorial-act-body">
                A sun-drenched morning studio. Open notebooks, ceramic coffee, running shoes on wool.
                This is where baseline habits form — IIT/AIIMS roadmaps, NSP scholarships, GATE preparation,
                first micro-investments, and the discovery of your unique skill signature.
              </p>
            </div>

            <div class="editorial-act-card">
              <div class="editorial-act-number">ACT II</div>
              <h3 class="editorial-act-title">The Craft & Momentum</h3>
              <div class="editorial-act-age">Ages 26 – 38 · Career & Building</div>
              <p class="editorial-act-body">
                A wide gallery loft, warm afternoon light. Monolithic walnut work tables and architectural brass models.
                Career trajectories sharpen — Google & Razorpay placements, salary negotiation intelligence,
                Nifty 50 SIP compounding, and the discipline of deep work.
              </p>
            </div>

            <div class="editorial-act-card">
              <div class="editorial-act-number">ACT III</div>
              <h3 class="editorial-act-title">The Expansion & Balance</h3>
              <div class="editorial-act-age">Ages 39 – 54 · Scale & Mastery</div>
              <p class="editorial-act-body">
                An indoor-outdoor courtyard pavilion at golden hour. Olive trees, reflection pools, and sculptural lounges.
                Enterprise scale, venture intelligence, longevity biomarkers, and the art of balancing
                ambition with presence — wealth grows while the body stays resilient.
              </p>
            </div>

            <div class="editorial-act-card">
              <div class="editorial-act-number">ACT IV</div>
              <h3 class="editorial-act-title">The Horizon & Legacy</h3>
              <div class="editorial-act-age">Ages 55+ · Serenity & Freedom</div>
              <p class="editorial-act-body">
                An open-air stone terrace overlooking a mirror-calm sea. Limestone columns frame the infinite sky.
                Mentorship, philanthropy, estate planning, and the quiet joy of a life
                lived with intentional architecture — every pillar in harmonic convergence.
              </p>
            </div>
          </div>
        </section>

        <hr class="editorial-divider">

        <!-- THREE LIFE PILLARS -->
        <section class="editorial-section" id="editorial-pillars">
          <div class="editorial-section-label">The Three Pillars</div>
          <h2 class="editorial-section-title">Organic anchors for a <em style="font-family:'Instrument Serif',serif;">balanced</em> life</h2>
          <p class="editorial-section-body">
            Instead of abstract metrics, BioVerse grounds your progress in three tactile, living pillars —
            each woven into the physical architecture of your daily experience.
          </p>

          <div class="editorial-pillars-grid">
            <div class="editorial-pillar-card">
              <span class="editorial-pillar-icon">🌿</span>
              <h3 class="editorial-pillar-title">Health & Vitality</h3>
              <p class="editorial-pillar-body">
                Living green elements — potted olive trees, Japanese bonsai, smooth river stones,
                and trickling water channels. Track hydration, sleep recovery, metabolic conditioning,
                Ayurvedic wellness protocols, and physical resilience with serene precision.
              </p>
            </div>

            <div class="editorial-pillar-card">
              <span class="editorial-pillar-icon">🪵</span>
              <h3 class="editorial-pillar-title">Career & Mind</h3>
              <p class="editorial-pillar-body">
                Crafted natural materials — sculpted dark walnut desks, architectural sketches,
                and brushed brass drafting tools. AI-powered career roadmaps, ATS resume analysis,
                NIRF college intelligence, and skill mastery tracking for the ambitious mind.
              </p>
            </div>

            <div class="editorial-pillar-card">
              <span class="editorial-pillar-icon">✨</span>
              <h3 class="editorial-pillar-title">Wealth & Longevity</h3>
              <p class="editorial-pillar-body">
                Warm luxury materials — fluted travertine pedestals, champagne-gold geometric sculptures,
                and bespoke architectural vaults. SIP compounding, Section 80C optimization,
                emergency runway planning, and generational wealth architecture.
              </p>
            </div>
          </div>
        </section>

        <hr class="editorial-divider">

        <!-- IDENTITY TRACKS -->
        <section class="editorial-section">
          <div class="editorial-section-label">Tailored for Every Stage</div>
          <h2 class="editorial-section-title">Who are you <em style="font-family:'Instrument Serif',serif;">today?</em></h2>
          <p class="editorial-section-body">
            Your answer shapes your entire experience. BioVerse adapts its intelligence, roadmaps,
            and tools to match your current life stage — whether you're learning, building, or leading.
          </p>

          <div class="editorial-acts-grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr));">
            <div class="editorial-act-card" style="cursor:pointer;" onclick="Router.navigate('/auth/register')">
              <div class="editorial-act-number" style="font-size:28px;margin-bottom:8px;">🎓</div>
              <h3 class="editorial-act-title">Student</h3>
              <p class="editorial-act-body">
                IIT/AIIMS/IIM directory with NIRF rankings, NSP & PMSS scholarship tracking,
                NITI Aayog & PM Internship Scheme, GATE/JEE/CAT preparation roadmaps,
                and first-job placement intelligence.
              </p>
            </div>

            <div class="editorial-act-card" style="cursor:pointer;" onclick="Router.navigate('/auth/register')">
              <div class="editorial-act-number" style="font-size:28px;margin-bottom:8px;">💼</div>
              <h3 class="editorial-act-title">Professional</h3>
              <p class="editorial-act-body">
                Indian IT salary negotiation intelligence, promotion prediction models,
                Nifty 50 SIP calculators, EPF optimization, burnout prevention protocols,
                and career mobility analytics.
              </p>
            </div>

            <div class="editorial-act-card" style="cursor:pointer;" onclick="Router.navigate('/auth/register')">
              <div class="editorial-act-number" style="font-size:28px;margin-bottom:8px;">🏢</div>
              <h3 class="editorial-act-title">Entrepreneur</h3>
              <p class="editorial-act-body">
                Startup India incubator guidance, fundraising CRM, GST & tax optimization,
                team management dashboards, scale playbooks,
                and venture intelligence for the ambitious builder.
              </p>
            </div>
          </div>
        </section>

        <hr class="editorial-divider">

        <!-- TESTIMONIALS -->
        <section class="editorial-section">
          <div class="editorial-section-label">Voices of Trust</div>
          <h2 class="editorial-section-title">Stories from the <em style="font-family:'Instrument Serif',serif;">journey</em></h2>

          <div class="editorial-testimonials">
            <div class="editorial-testimonial-card">
              <div class="editorial-testimonial-stars">★★★★★</div>
              <p class="editorial-testimonial-text">
                "BioVerse transformed my trajectory. From a Tier-3 college to landing a ₹24 LPA offer at Google India
                using their placement roadmap and scholarship tracker. The calm, focused approach made all the difference."
              </p>
              <div class="editorial-testimonial-author">
                <div class="editorial-testimonial-avatar">RS</div>
                <div>
                  <div class="editorial-testimonial-name">Rohan Sharma</div>
                  <div class="editorial-testimonial-role">Software Engineer, Google India</div>
                </div>
              </div>
            </div>

            <div class="editorial-testimonial-card">
              <div class="editorial-testimonial-stars">★★★★★</div>
              <p class="editorial-testimonial-text">
                "As a startup founder in Bengaluru, BioVerse brought clarity to the chaos of fundraising,
                Startup India compliance, and team building. It felt like having a quiet, brilliant advisor."
              </p>
              <div class="editorial-testimonial-author">
                <div class="editorial-testimonial-avatar">PS</div>
                <div>
                  <div class="editorial-testimonial-name">Priya Sharma</div>
                  <div class="editorial-testimonial-role">Founder & CEO, NexaTech India</div>
                </div>
              </div>
            </div>

            <div class="editorial-testimonial-card">
              <div class="editorial-testimonial-stars">★★★★★</div>
              <p class="editorial-testimonial-text">
                "The holistic approach — connecting career growth to physical fitness and SIP investing —
                has been life-changing. My personal finance score went from 50 to 88 in four months."
              </p>
              <div class="editorial-testimonial-author">
                <div class="editorial-testimonial-avatar">AM</div>
                <div>
                  <div class="editorial-testimonial-name">Ankit Mehta</div>
                  <div class="editorial-testimonial-role">Senior Consultant, Deloitte India</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA SECTION -->
        <section class="editorial-cta-section">
          <h2 class="editorial-cta-title">Begin your <em style="font-family:'Instrument Serif',serif;">life architecture</em></h2>
          <p class="editorial-cta-body">
            Join 75,000+ Indian students, professionals, and entrepreneurs mapping their journey
            with intention, clarity, and balance.
          </p>
          <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
            <button class="editorial-cta-btn" onclick="Router.navigate('/auth/register')">
              <i class="fas fa-feather-alt"></i> Start Free Today
            </button>
            <a class="editorial-cta-btn-secondary" href="continuum.html">
              <i class="fas fa-cube"></i> 3D Life Journey
            </a>
            <button class="editorial-cta-btn-secondary" onclick="Router.navigate('/pricing')">
              View All Plans
            </button>
          </div>
          <p style="margin-top:20px;font-size:13px;color:#aaa;">No credit card required. Free forever access available.</p>
        </section>

        <!-- FOOTER -->
        <footer class="editorial-footer">
          <div class="editorial-footer-inner">
            <div>
              <div class="editorial-footer-brand">🧬 BioVerse</div>
              <p class="editorial-footer-desc">
                The premier intelligent life management platform for India. Empowering students, employees,
                and business owners across career, health, finance, and life success.
              </p>
            </div>
            <div>
              <div class="editorial-footer-title">Product</div>
              <a class="editorial-footer-link" onclick="Router.navigate('/pricing')">Pricing</a>
              <a class="editorial-footer-link" onclick="Router.navigate('/auth/register')">Get Started</a>
              <a class="editorial-footer-link" onclick="Router.navigate('/student/colleges')">Indian Colleges</a>
              <a class="editorial-footer-link" onclick="Router.navigate('/student/scholarships')">Govt Scholarships</a>
            </div>
            <div>
              <div class="editorial-footer-title">Experiences</div>
              <a class="editorial-footer-link" href="continuum.html">3D Life Journey</a>
              <a class="editorial-footer-link" onclick="Router.navigate('/dashboard/coach')">AI Life Coach</a>
              <a class="editorial-footer-link" onclick="Router.navigate('/dashboard')">Dashboard</a>
            </div>
            <div>
              <div class="editorial-footer-title">Legal</div>
              <a class="editorial-footer-link" href="#">Privacy Policy</a>
              <a class="editorial-footer-link" href="#">Terms of Service</a>
              <a class="editorial-footer-link" href="#">Cookie Policy</a>
              <a class="editorial-footer-link" href="#">Contact Us</a>
            </div>
          </div>
          <div class="editorial-footer-bottom">
            <p>© ${new Date().getFullYear()} BioVerse India. All rights reserved. Crafted with quiet intention for dreamers, doers, and architects of life.</p>
          </div>
        </footer>

      </div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════════════════════
   BACKGROUND VIDEO FADE SYSTEM
   Custom requestAnimationFrame-based fade (no CSS transitions)
   ═══════════════════════════════════════════════════════════════════ */
function initEditorialVideo() {
  const video = document.getElementById('editorial-bg-video');
  if (!video) return;

  let animFrameId = null;
  let fadingOutRef = false;

  function cancelAnim() {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  }

  function fadeIn(duration = 500) {
    cancelAnim();
    const start = performance.now();
    const startOpacity = parseFloat(video.style.opacity) || 0;
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      video.style.opacity = startOpacity + (1 - startOpacity) * progress;
      if (progress < 1) {
        animFrameId = requestAnimationFrame(step);
      } else {
        animFrameId = null;
      }
    }
    animFrameId = requestAnimationFrame(step);
  }

  function fadeOut(duration = 500) {
    cancelAnim();
    const start = performance.now();
    const startOpacity = parseFloat(video.style.opacity) || 1;
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      video.style.opacity = startOpacity * (1 - progress);
      if (progress < 1) {
        animFrameId = requestAnimationFrame(step);
      } else {
        animFrameId = null;
      }
    }
    animFrameId = requestAnimationFrame(step);
  }

  // On loadeddata -> play and fade in
  video.addEventListener('loadeddata', () => {
    video.play().catch(() => {});
    fadeIn(500);
  });

  // On timeupdate -> fade out 0.55s before end
  video.addEventListener('timeupdate', () => {
    if (video.duration && !fadingOutRef && video.currentTime > video.duration - 0.55) {
      fadingOutRef = true;
      fadeOut(500);
    }
  });

  // On ended -> reset and loop with fade
  video.addEventListener('ended', () => {
    video.style.opacity = '0';
    fadingOutRef = false;
    setTimeout(() => {
      video.currentTime = 0;
      video.play().catch(() => {});
      fadeIn(500);
    }, 100);
  });

  // Attempt autoplay
  video.play().catch(() => {
    // Autoplay blocked; will start on user interaction
    document.addEventListener('click', () => {
      video.play().catch(() => {});
      fadeIn(500);
    }, { once: true });
  });
}

function handleGoToDashboard() {
  if (typeof Store !== 'undefined' && Store.isLoggedIn()) {
    Router.navigate('/dashboard');
  } else {
    Router.navigate('/auth/login');
  }
}

window.handleGoToDashboard = handleGoToDashboard;

