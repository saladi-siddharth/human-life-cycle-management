/* ═══════════════════════════════════════════════════════════════════
   PRICING PAGE
   ═══════════════════════════════════════════════════════════════════ */

function PricingPage() {
  const content = `
    <div class="landing-page">
      ${UI.publicTopbar()}

      <section class="section" style="padding-top:120px;">
        <div class="orb orb-cyan" style="top:50px;left:50%;transform:translateX(-50%);"></div>
        <div class="container text-center">
          <div class="section-label reveal">Simple, Transparent Pricing</div>
          <h1 class="reveal delay-1">Invest in Your <span class="text-gradient">Life Journey</span></h1>
          <p class="hero-subtitle reveal delay-2">Choose the plan that fits your current life stage. No hidden fees, cancel anytime.</p>

          <!-- Billing Toggle -->
          <div class="reveal delay-3" style="display:flex;justify-content:center;align-items:center;gap:12px;margin:40px 0;">
            <span style="font-weight:600;" id="bill-monthly-label">Monthly</span>
            <label class="toggle" style="transform:scale(1.2);">
              <input type="checkbox" id="billing-toggle" onchange="togglePricing()">
              <span class="toggle-slider"></span>
            </label>
            <span style="font-weight:600;color:var(--text-muted);" id="bill-annual-label">Annually <span class="badge badge-success" style="font-size:10px;margin-left:4px;">Save 20%</span></span>
          </div>

          <div class="pricing-grid reveal delay-4">
            <!-- Free Plan -->
            <div class="pricing-card">
              <div class="pricing-header">
                <h3>Starter</h3>
                <p>For individuals starting their journey</p>
                <div class="pricing-price">
                  <span class="currency">$</span><span class="amount">0</span><span class="period">/mo</span>
                </div>
              </div>
              <div class="pricing-features">
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Basic Life Score</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> 1 Active Goal per Domain</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Manual Tracker</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Community Support</div>
                <div class="feature-row disabled"><i class="fas fa-times text-muted"></i> AI Coach Access</div>
                <div class="feature-row disabled"><i class="fas fa-times text-muted"></i> Advanced Analytics</div>
              </div>
              <button class="btn btn-outline btn-full" onclick="Router.navigate('/auth/register')">Get Started Free</button>
            </div>

            <!-- Pro Plan -->
            <div class="pricing-card popular">
              <div class="pricing-badge">Most Popular</div>
              <div class="pricing-header">
                <h3>Growth</h3>
                <p>For professionals seeking serious growth</p>
                <div class="pricing-price">
                  <span class="currency">$</span><span class="amount price-val" data-monthly="9.99" data-annual="7.99">9.99</span><span class="period">/mo</span>
                </div>
              </div>
              <div class="pricing-features">
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Advanced Life Score</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Unlimited Goals</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> AI Coach (100 msgs/mo)</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Automated Tracking</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Smart Alerts</div>
                <div class="feature-row disabled"><i class="fas fa-times text-muted"></i> 1-on-1 Human Coaching</div>
              </div>
              <button class="btn btn-primary btn-full" onclick="Router.navigate('/auth/register')">Start 14-Day Free Trial</button>
            </div>

            <!-- Elite Plan -->
            <div class="pricing-card">
              <div class="pricing-header">
                <h3>Elite</h3>
                <p>For high-achievers and business owners</p>
                <div class="pricing-price">
                  <span class="currency">$</span><span class="amount price-val" data-monthly="29.99" data-annual="23.99">29.99</span><span class="period">/mo</span>
                </div>
              </div>
              <div class="pricing-features">
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Everything in Growth</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Unlimited AI Coach</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Priority Support</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Custom Data Integrations</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Advanced Market Intel</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> 1-on-1 Quarterly Review</div>
              </div>
              <button class="btn btn-outline btn-full" onclick="Router.navigate('/auth/register')">Upgrade to Elite</button>
            </div>
          </div>
          
          <div class="faq-section reveal" style="margin-top:80px;text-align:left;max-width:800px;margin-left:auto;margin-right:auto;">
            <h2 class="text-center" style="margin-bottom:40px;">Frequently Asked Questions</h2>
            <div class="card-glass" style="margin-bottom:16px;">
              <h4 style="margin-bottom:8px;">Can I switch between plans?</h4>
              <p style="color:var(--text-secondary);font-size:14px;">Yes, you can upgrade or downgrade your plan at any time. Prorated charges or credits will be applied automatically.</p>
            </div>
            <div class="card-glass" style="margin-bottom:16px;">
              <h4 style="margin-bottom:8px;">Is there a discount for students?</h4>
              <p style="color:var(--text-secondary);font-size:14px;">Yes! We offer a 50% discount on the Growth plan for verified students. Contact support with your .edu email address.</p>
            </div>
            <div class="card-glass" style="margin-bottom:16px;">
              <h4 style="margin-bottom:8px;">What happens when my free trial ends?</h4>
              <p style="color:var(--text-secondary);font-size:14px;">If you haven't added a payment method, your account will automatically downgrade to the free Starter plan. You won't lose your data, but premium features will be locked.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="landing-footer" style="margin-top:0;">
        <div class="footer-grid">
          <div>
            <div class="footer-brand"><span class="text-gradient">🧭 LifeGPS</span></div>
            <p class="footer-desc">The intelligent life management platform that grows with you from student to retiree.</p>
          </div>
          <div>
            <div class="footer-title">Product</div>
            <div class="footer-links">
              <a onclick="Router.navigate('/')">Home</a>
              <a onclick="Router.navigate('/auth/register')">Get Started</a>
            </div>
          </div>
          <div>
            <div class="footer-title">Legal</div>
            <div class="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `;
  
  // Attach toggle logic after render
  window.togglePricing = function() {
    const isAnnual = document.getElementById('billing-toggle').checked;
    const l1 = document.getElementById('bill-monthly-label');
    const l2 = document.getElementById('bill-annual-label');
    
    if (isAnnual) {
      l1.style.color = 'var(--text-muted)';
      l2.style.color = 'var(--text-primary)';
    } else {
      l1.style.color = 'var(--text-primary)';
      l2.style.color = 'var(--text-muted)';
    }
    
    document.querySelectorAll('.price-val').forEach(el => {
      el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
    });
  };

  return content;
}
