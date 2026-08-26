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
                  <span class="currency">₹</span><span class="amount">0</span><span class="period">/mo</span>
                </div>
              </div>
              <div class="pricing-features">
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Basic Life Score (0-100)</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Manual Tracker & Daily Habits</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> 5 AI Coach Queries / day</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Community Support</div>
                <div class="feature-row disabled"><i class="fas fa-times text-muted"></i> Resume ATS Scanner</div>
                <div class="feature-row disabled"><i class="fas fa-times text-muted"></i> Camera Nutrition Vision</div>
              </div>
              <button class="btn btn-outline btn-full" onclick="Router.navigate('/auth/register')">Get Started Free</button>
            </div>

            <!-- Pro Plan -->
            <div class="pricing-card popular">
              <div class="pricing-badge">Most Popular</div>
              <div class="pricing-header">
                <h3>BioVerse Pro</h3>
                <p>For students & professionals seeking rapid growth</p>
                <div class="pricing-price">
                  <span class="currency">₹</span><span class="amount price-val" data-monthly="299" data-annual="249">299</span><span class="period">/mo</span>
                </div>
              </div>
              <div class="pricing-features">
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Unlimited AI Life Coach & Vision</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Resume ATS Keyword Matcher</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Camera Meal Nutrition Scanner</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Client-Side PDF Life Audit Export</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> All-India College NIRF Telemetry</div>
                <div class="feature-row disabled"><i class="fas fa-times text-muted"></i> 3D Spatial Pavilion Continuum</div>
              </div>
              <button class="btn btn-primary btn-full" onclick="BillingEngine.openCheckout('pro', document.getElementById('billing-toggle')?.checked ? 'annual' : 'monthly')">
                <i class="fas fa-bolt"></i> Upgrade to Pro (₹299)
              </button>
            </div>

            <!-- Sovereign Plan -->
            <div class="pricing-card">
              <div class="pricing-header">
                <h3>BioVerse Sovereign</h3>
                <p>For high-achievers, founders, and business owners</p>
                <div class="pricing-price">
                  <span class="currency">₹</span><span class="amount price-val" data-monthly="699" data-annual="580">699</span><span class="period">/mo</span>
                </div>
              </div>
              <div class="pricing-features">
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Everything in Pro</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> 3D Spatial Pavilion Continuum</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Indian Tax Regime Optimizer (Old vs New)</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Peer Accountability Pod Leadership</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Automated Daily Web Push Affirmations</div>
                <div class="feature-row"><i class="fas fa-check text-emerald"></i> Priority WhatsApp VIP Support</div>
              </div>
              <button class="btn btn-outline btn-full" onclick="BillingEngine.openCheckout('sovereign', document.getElementById('billing-toggle')?.checked ? 'annual' : 'monthly')">
                <i class="fas fa-crown"></i> Activate Sovereign (₹699)
              </button>
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
