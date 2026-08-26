/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE FINTECH & BILLING ENGINE — Razorpay / Stripe & Entitlements
   ═══════════════════════════════════════════════════════════════════ */

const BillingEngine = {
  TIERS: {
    starter: {
      id: 'starter',
      name: 'Starter Tier',
      badge: 'Free Explorer',
      priceMonthlyINR: 0,
      priceAnnualINR: 0,
      priceMonthlyUSD: 0,
      priceAnnualUSD: 0,
      features: [
        'Core 5-Pillar Dashboard',
        'Basic Life Score (0-100)',
        'Manual To-Do & Health Logging',
        '5 AI Coach Queries / day'
      ],
      limits: {
        aiQueriesPerDay: 5,
        canExportPDF: false,
        canUseVision: false,
        canUseSoundscape: true,
        canUsePods: true
      }
    },
    pro: {
      id: 'pro',
      name: 'BioVerse Pro',
      badge: 'Accelerated Track',
      priceMonthlyINR: 299,
      priceAnnualINR: 2499,
      priceMonthlyUSD: 9.99,
      priceAnnualUSD: 79.99,
      features: [
        'Unlimited Multi-Turn AI Life Coach',
        'Resume ATS Keyword Density Scanner',
        'Camera Meal Nutrition Macro Scanner',
        'Client-Side Life Audit PDF Dossiers',
        'All-India College & Scholarship Telemetry'
      ],
      limits: {
        aiQueriesPerDay: Infinity,
        canExportPDF: true,
        canUseVision: true,
        canUseSoundscape: true,
        canUsePods: true
      }
    },
    sovereign: {
      id: 'sovereign',
      name: 'BioVerse Sovereign',
      badge: 'Elite Founders & Execs',
      priceMonthlyINR: 699,
      priceAnnualINR: 5999,
      priceMonthlyUSD: 24.99,
      priceAnnualUSD: 199.99,
      features: [
        'Everything in BioVerse Pro',
        '3D Spatial Pavilion Continuum Master View',
        'Indian New vs Old Tax Regime Optimization',
        'Priority Peer Accountability Pod Leadership',
        'Automated Daily SMS / Web Push Affirmations'
      ],
      limits: {
        aiQueriesPerDay: Infinity,
        canExportPDF: true,
        canUseVision: true,
        canUseSoundscape: true,
        canUsePods: true
      }
    }
  },

  /**
   * Checks whether the current user has permission for a specific feature.
   */
  hasAccess(featureName) {
    const state = Store.getState();
    const currentTier = state.subscription?.tier || 'pro'; // default to pro in demo/test
    const tierConfig = this.TIERS[currentTier] || this.TIERS.starter;
    return Boolean(tierConfig.limits[featureName] ?? true);
  },

  getCurrentTier() {
    const state = Store.getState();
    const tierId = state.subscription?.tier || 'pro';
    return this.TIERS[tierId] || this.TIERS.pro;
  },

  /**
   * Launches Razorpay / UPI / Card Checkout modal.
   */
  openCheckout(tierId = 'pro', billingCycle = 'monthly') {
    const tier = this.TIERS[tierId] || this.TIERS.pro;
    const price = billingCycle === 'annual' ? tier.priceAnnualINR : tier.priceMonthlyINR;
    const gstAmount = Math.round(price * 0.18);
    const totalAmount = price + gstAmount;

    const modalHTML = `
      <div style="padding:10px 4px; color:#f8fafc;">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px; border-bottom:1px solid #1e293b; padding-bottom:12px;">
          <div style="width:44px; height:44px; border-radius:12px; background:linear-gradient(135deg, #00f2fe, #4facfe); display:flex; align-items:center; justify-content:center; font-size:22px;">
            💳
          </div>
          <div>
            <h3 style="margin:0; font-size:18px; font-weight:800;">Upgrade to ${tier.name}</h3>
            <div style="font-size:12px; color:#94a3b8;">Billed ${billingCycle === 'annual' ? 'Annually (Save 20%)' : 'Monthly'} • Secure Razorpay Payment</div>
          </div>
        </div>

        <!-- Order Summary -->
        <div style="background:#0c1222; border:1px solid #1e293b; border-radius:12px; padding:16px; margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px;">
            <span>Plan Subscription:</span>
            <strong>₹${price.toLocaleString('en-IN')}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px; color:#94a3b8;">
            <span>GST (18% Indian Tax):</span>
            <span>₹${gstAmount.toLocaleString('en-IN')}</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding-top:8px; border-top:1px solid #1e293b; font-size:15px; font-weight:800; color:#00f2fe;">
            <span>Total Payable:</span>
            <span>₹${totalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <!-- Payment Method Selector -->
        <div style="margin-bottom:20px;">
          <label style="font-size:12px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:10px;">Select Payment Rail</label>
          <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:10px;">
            <div class="card card-hover" id="pay-method-upi" onclick="BillingEngine.selectPayMethod('upi')" style="padding:12px; text-align:center; border:2px solid #00f2fe; background:rgba(0,242,254,0.08); border-radius:10px; cursor:pointer;">
              <div style="font-size:20px;">📱</div>
              <div style="font-size:12px; font-weight:700; margin-top:4px;">UPI / QR</div>
            </div>
            <div class="card card-hover" id="pay-method-card" onclick="BillingEngine.selectPayMethod('card')" style="padding:12px; text-align:center; border:1px solid #1e293b; background:#0c1222; border-radius:10px; cursor:pointer;">
              <div style="font-size:20px;">💳</div>
              <div style="font-size:12px; font-weight:700; margin-top:4px;">Debit / Credit</div>
            </div>
            <div class="card card-hover" id="pay-method-netbanking" onclick="BillingEngine.selectPayMethod('netbanking')" style="padding:12px; text-align:center; border:1px solid #1e293b; background:#0c1222; border-radius:10px; cursor:pointer;">
              <div style="font-size:20px;">🏛️</div>
              <div style="font-size:12px; font-weight:700; margin-top:4px;">NetBanking</div>
            </div>
          </div>
        </div>

        <!-- Simulated UPI / Card Interface -->
        <div id="pay-rail-content" style="background:#0c1222; border:1px solid #1e293b; border-radius:10px; padding:14px; margin-bottom:20px; text-align:center;">
          <div style="font-size:12px; color:#cbd5e1; margin-bottom:8px;">Instant UPI QR Auto-Debit (Google Pay / PhonePe / Paytm)</div>
          <div style="display:inline-block; padding:10px; background:#fff; border-radius:8px; margin:4px 0;">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=upi://pay?pa=bioverse@icici%26pn=BioVerse%20Technologies%26am=${totalAmount}%26cu=INR" alt="UPI QR" style="width:120px; height:120px; display:block;">
          </div>
          <div style="font-size:11px; color:#94a3b8; margin-top:6px;">Scan with any UPI App or click Confirm below</div>
        </div>

        <!-- Checkout Actions -->
        <div style="display:flex; justify-content:flex-end; gap:10px;">
          <button class="btn btn-ghost" onclick="UI.closeModal()">Cancel</button>
          <button class="btn btn-primary" onclick="BillingEngine.processPayment('${tierId}', '${billingCycle}', ${totalAmount})">
            <i class="fas fa-lock"></i> Pay ₹${totalAmount.toLocaleString('en-IN')} & Activate
          </button>
        </div>
      </div>
    `;

    UI.modal(modalHTML);
  },

  selectPayMethod(method) {
    const upiEl = document.getElementById('pay-method-upi');
    const cardEl = document.getElementById('pay-method-card');
    const netEl = document.getElementById('pay-method-netbanking');
    const container = document.getElementById('pay-rail-content');
    if (!container) return;

    [upiEl, cardEl, netEl].forEach(el => {
      if (el) {
        el.style.border = '1px solid #1e293b';
        el.style.background = '#0c1222';
      }
    });

    if (method === 'upi') {
      if (upiEl) {
        upiEl.style.border = '2px solid #00f2fe';
        upiEl.style.background = 'rgba(0,242,254,0.08)';
      }
      container.innerHTML = `
        <div style="font-size:12px; color:#cbd5e1; margin-bottom:8px;">Instant UPI Auto-Debit</div>
        <div style="display:flex; gap:8px; max-width:320px; margin:0 auto 8px auto;">
          <input type="text" class="form-input" placeholder="yourname@okhdfcbank" value="saladi@okaxis" style="font-size:12px;">
          <button class="btn btn-secondary btn-sm" onclick="UI.toast('info','UPI Request Sent','Approve request on your PhonePe/GPay app')">Verify</button>
        </div>
      `;
    } else if (method === 'card') {
      if (cardEl) {
        cardEl.style.border = '2px solid #00f2fe';
        cardEl.style.background = 'rgba(0,242,254,0.08)';
      }
      container.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:8px; max-width:340px; margin:0 auto; text-align:left;">
          <input type="text" class="form-input" placeholder="Card Number (4242 •••• •••• 4242)" value="•••• •••• •••• 4242" style="font-size:12px;">
          <div style="display:flex; gap:8px;">
            <input type="text" class="form-input" placeholder="MM/YY" value="12/28" style="font-size:12px;">
            <input type="password" class="form-input" placeholder="CVV" value="888" style="font-size:12px;">
          </div>
        </div>
      `;
    } else if (method === 'netbanking') {
      if (netEl) {
        netEl.style.border = '2px solid #00f2fe';
        netEl.style.background = 'rgba(0,242,254,0.08)';
      }
      container.innerHTML = `
        <div style="font-size:12px; color:#cbd5e1; margin-bottom:8px;">Popular Indian NetBanking Portals</div>
        <div style="display:flex; justify-content:center; gap:8px; flex-wrap:wrap;">
          <span class="badge badge-primary" style="cursor:pointer; padding:6px 12px;">HDFC Bank</span>
          <span class="badge badge-secondary" style="cursor:pointer; padding:6px 12px;">ICICI Bank</span>
          <span class="badge badge-secondary" style="cursor:pointer; padding:6px 12px;">State Bank of India</span>
          <span class="badge badge-secondary" style="cursor:pointer; padding:6px 12px;">Axis Bank</span>
        </div>
      `;
    }
  },

  /**
   * Finalizes payment, generates an invoice, updates Store, and fires a celebration.
   */
  async processPayment(tierId, billingCycle, totalAmount) {
    UI.toast('info', 'Processing Transaction', 'Contacting Razorpay gateway securely...');
    
    // Simulate backend verification delay
    await new Promise(r => setTimeout(r, 900));

    const state = Store.getState();
    const invoiceId = 'BV-INV-' + Date.now().toString().substring(6);
    const invoiceDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const renewDate = new Date(Date.now() + (billingCycle === 'annual' ? 365 : 30) * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    const newInvoice = {
      id: invoiceId,
      date: invoiceDate,
      tier: tierId,
      amount: '₹' + totalAmount.toLocaleString('en-IN'),
      status: 'Paid',
      billingCycle
    };

    if (!state.subscription) state.subscription = {};
    state.subscription.tier = tierId;
    state.subscription.active = true;
    state.subscription.billingCycle = billingCycle;
    state.subscription.renewsOn = renewDate;
    if (!state.subscription.invoices) state.subscription.invoices = [];
    state.subscription.invoices.unshift(newInvoice);

    Store._save();
    Store._notify();

    UI.closeModal();
    UI.toast('success', 'Plan Activated! 🎉', `Welcome to ${this.TIERS[tierId].name}. All pro features unlocked.`);

    // Trigger Continuum 3D fireworks celebration
    if (typeof ContinuumBridge !== 'undefined' && ContinuumBridge.onTelemetryAction) {
      ContinuumBridge.onTelemetryAction({ type: 'payment_success', tier: tierId });
    }

    if (typeof Router !== 'undefined' && (Router.currentRoute === '/dashboard/billing' || Router.currentRoute === '/pricing')) {
      Router.render();
    }
  },

  /**
   * Generates and downloads a branded GST Tax Invoice PDF for any payment.
   */
  async downloadInvoicePDF(invoiceId) {
    if (typeof html2pdf === 'undefined') {
      UI.toast('warning', 'PDF Engine', 'Loading PDF engine...');
      return;
    }

    const state = Store.getState();
    const profile = state.profile || {};
    const invoice = (state.subscription?.invoices || []).find(inv => inv.id === invoiceId) || {
      id: invoiceId || 'BV-INV-78921',
      date: new Date().toLocaleDateString('en-IN'),
      amount: '₹353',
      tier: 'pro'
    };

    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      left: -9999px;
      top: 0;
      width: 794px;
      background: #070a14;
      color: #f8fafc;
      font-family: 'Inter', sans-serif;
      padding: 40px;
      box-sizing: border-box;
    `;

    container.innerHTML = `
      <div style="border: 2px solid #1e293b; border-radius: 16px; padding: 32px; background: #0c1222;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 2px solid #1e293b; padding-bottom: 20px; margin-bottom: 24px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:26px;">🧬</span>
              <h1 style="margin:0; font-size:24px; font-weight:900; color:#00f2fe;">BioVerse Technologies Pvt Ltd</h1>
            </div>
            <div style="font-size:12px; color:#94a3b8; margin-top:4px;">GSTIN: 29AAACB1234F1Z5 • Karnataka, India</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:18px; font-weight:800; color:#10b981;">TAX INVOICE</div>
            <div style="font-size:12px; color:#94a3b8; margin-top:2px;">Invoice #: <strong>${invoice.id}</strong></div>
            <div style="font-size:12px; color:#94a3b8;">Date: ${invoice.date}</div>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; margin-bottom:24px; font-size:13px;">
          <div>
            <div style="font-weight:700; color:#94a3b8; margin-bottom:4px;">BILLED TO:</div>
            <div style="font-weight:800; font-size:15px; color:#fff;">${profile.name || 'Valued Member'}</div>
            <div style="color:#38bdf8;">${profile.email || 'member@bioverse.ai'}</div>
            <div style="color:#64748b;">India</div>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:700; color:#94a3b8; margin-bottom:4px;">PAYMENT STATUS:</div>
            <span style="background:rgba(16,185,129,0.15); color:#10b981; border:1px solid rgba(16,185,129,0.3); padding:4px 10px; border-radius:6px; font-weight:800;">PAID VIA RAZORPAY UPI</span>
          </div>
        </div>

        <!-- Table -->
        <table style="width:100%; border-collapse:collapse; margin-bottom:24px; font-size:13px;">
          <thead>
            <tr style="background:#131c31; border-bottom:1px solid #1e293b; text-align:left;">
              <th style="padding:10px;">Item Description</th>
              <th style="padding:10px;">HSN/SAC</th>
              <th style="padding:10px; text-align:right;">Base Price</th>
              <th style="padding:10px; text-align:right;">GST (18%)</th>
              <th style="padding:10px; text-align:right;">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #1e293b;">
              <td style="padding:12px 10px;">
                <strong>${this.TIERS[invoice.tier]?.name || 'BioVerse Pro Subscription'}</strong><br>
                <span style="font-size:11px; color:#94a3b8;">Unlimited AI Life Coach, Resume ATS Scanner & Spatial Continuum</span>
              </td>
              <td style="padding:12px 10px; color:#94a3b8;">998313</td>
              <td style="padding:12px 10px; text-align:right;">₹299.00</td>
              <td style="padding:12px 10px; text-align:right;">₹53.82</td>
              <td style="padding:12px 10px; text-align:right; font-weight:700; color:#00f2fe;">${invoice.amount}</td>
            </tr>
          </tbody>
        </table>

        <div style="border-top:1px solid #1e293b; padding-top:16px; display:flex; justify-content:space-between; font-size:11px; color:#64748b;">
          <div>This is a computer-generated tax invoice. No signature required.</div>
          <div style="color:#00f2fe;">https://bioverse.ai • Support: support@bioverse.ai</div>
        </div>
      </div>
    `;

    document.body.appendChild(container);
    try {
      await html2pdf().set({
        margin: [10, 10],
        filename: `${invoice.id}_BioVerse_Tax_Invoice.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, backgroundColor: '#070a14' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(container).save();
      UI.toast('success', 'Invoice Downloaded', 'Your GST tax invoice has been saved.');
    } catch (e) {
      UI.toast('error', 'Download Failed', e.message);
    } finally {
      container.remove();
    }
  }
};

window.BillingEngine = BillingEngine;
