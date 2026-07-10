/* ============================================================
   PRICING PAGE
   ============================================================ */

const PricingPage = {
  render(container) {
    const isInApp = Store.isOnboarded;

    if (isInApp) {
      Navigation.setPageTitle('Pricing');
      container.querySelector('.page-content').innerHTML = this._getContent();
    } else {
      container.innerHTML = `
        <div class="app-shell--public">
          <nav class="landing-nav landing-nav--scrolled">
            <a class="landing-nav__brand" href="#/">
              <div class="landing-nav__logo">🧭</div>
              <span class="landing-nav__name">LifeGPS</span>
            </a>
            <div class="landing-nav__links">
              <span class="landing-nav__link" onclick="Router.navigate('/')">Home</span>
              <button class="btn btn--primary btn--sm" onclick="Router.navigate('/identity')">Get Started</button>
            </div>
          </nav>
          <div style="padding: calc(72px + var(--space-8)) var(--space-6) var(--space-12);">
            ${this._getContent()}
          </div>
          <footer class="landing-footer">
            <p class="landing-footer__text">© 2026 LifeGPS — Your Life Navigator</p>
          </footer>
        </div>
      `;
    }
  },

  _getContent() {
    return `
      <div class="stagger-in">
        <div style="text-align: center; margin-bottom: var(--space-10);">
          <div class="label mb-4" style="color: var(--color-primary-light)">PRICING PLANS</div>
          <h2 style="margin-bottom: var(--space-3);">Invest in Your <span class="text-gradient">Entire Life</span></h2>
          <p class="text-secondary" style="max-width: 500px; margin-inline: auto;">
            Every plan includes AI-powered guidance across all 5 life domains. Upgrade for deeper insights and premium features.
          </p>
        </div>

        <div class="pricing-grid">
          <!-- Free -->
          <div class="pricing-card">
            <div class="pricing-card__name">Starter</div>
            <div class="pricing-card__price">$0<span>/mo</span></div>
            <div class="pricing-card__desc">Perfect for exploring what LifeGPS can do</div>
            <div class="pricing-card__features">
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Basic dashboard (all 5 domains)</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>AI Coach (5 messages/day)</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Goal tracking (3 active goals)</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Basic career roadmap</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Health habit tracker</span>
              </div>
            </div>
            <button class="btn btn--secondary btn--full" onclick="App.showToast('success', 'Already Free!', 'You are on the free plan.')">Current Plan</button>
          </div>

          <!-- Growth -->
          <div class="pricing-card">
            <div class="pricing-card__name">Growth</div>
            <div class="pricing-card__price">$9.99<span>/mo</span></div>
            <div class="pricing-card__desc">For serious self-improvers ready to level up</div>
            <div class="pricing-card__features">
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Everything in Starter</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Unlimited AI Coach</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Advanced analytics</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Career skill gap analysis</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Financial forecasting</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Unlimited goals</span>
              </div>
            </div>
            <button class="btn btn--primary btn--full" onclick="App.showToast('info', 'Coming Soon', 'Subscriptions launching soon!')">Upgrade →</button>
          </div>

          <!-- Pro (Featured) -->
          <div class="pricing-card pricing-card--featured">
            <div class="pricing-card__name">Pro</div>
            <div class="pricing-card__price">$29.99<span>/mo</span></div>
            <div class="pricing-card__desc">The complete life management experience</div>
            <div class="pricing-card__features">
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Everything in Growth</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>AI Career & Salary Coach</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Predictive life analytics</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Investment portfolio builder</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Peer benchmarking</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Priority support</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Accountability groups</span>
              </div>
            </div>
            <button class="btn btn--primary btn--full" onclick="App.showToast('info', 'Coming Soon', 'Subscriptions launching soon!')" style="box-shadow: var(--shadow-glow-primary)">Get Pro →</button>
          </div>

          <!-- Elite -->
          <div class="pricing-card">
            <div class="pricing-card__name">Elite</div>
            <div class="pricing-card__price">$99<span>/mo</span></div>
            <div class="pricing-card__desc">For executives and serious business owners</div>
            <div class="pricing-card__features">
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Everything in Pro</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>1:1 monthly coaching call</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Business financial dashboard</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>Exit strategy planning</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>White-glove onboarding</span>
              </div>
              <div class="pricing-card__feature">
                <span class="pricing-card__check">✓</span>
                <span>API access</span>
              </div>
            </div>
            <button class="btn btn--accent btn--full" onclick="App.showToast('info', 'Coming Soon', 'Subscriptions launching soon!')">Contact Sales →</button>
          </div>
        </div>

        <!-- FAQ -->
        <div style="max-width: 700px; margin: var(--space-16) auto 0; text-align: center;">
          <h3 style="margin-bottom: var(--space-8);">Frequently Asked Questions</h3>
          <div class="glass-card" style="text-align: left;">
            ${[
              { q: 'Can I switch plans anytime?', a: 'Yes! Upgrade or downgrade at any time. Changes take effect immediately.' },
              { q: 'Is there a free trial?', a: 'The Starter plan is free forever. Growth and Pro plans include a 14-day free trial.' },
              { q: 'What payment methods do you accept?', a: 'Credit cards, debit cards, and PayPal. Enterprise plans support invoicing.' },
              { q: 'Can I export my data?', a: 'Absolutely! Your data is yours. Export anytime from Settings.' }
            ].map(faq => `
              <div style="padding: var(--space-4) 0; border-bottom: 1px solid var(--glass-border);">
                <div style="font-weight: 600; font-size: var(--text-sm); margin-bottom: var(--space-2);">${faq.q}</div>
                <div style="font-size: var(--text-sm); color: var(--text-secondary);">${faq.a}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
};
