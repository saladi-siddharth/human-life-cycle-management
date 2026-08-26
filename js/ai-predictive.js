/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE PREDICTIVE INTELLIGENCE & BURNOUT EARLY-WARNING ENGINE
   - Multi-Vector Telemetry Correlation (Sleep, Hydration, Task Sprints, Workouts)
   - Real-Time Burnout Risk Index (0 - 100%) Computation
   - Actionable Circadian Interventions & Recovery Recommendations
   - Action Telemetry Dispatcher to Continuum 3D Particle Vortex
   ═══════════════════════════════════════════════════════════════════ */

const PredictiveEngine = {
  calculateTelemetry() {
    const health = Store.get('health') || {};
    const tasks = Store.get('tasks') || [];
    const scores = Store.get('scores') || {};

    const water = health.waterIntake || 0;
    const waterTarget = health.waterTarget || 2500;
    const waterRatio = Math.min(1.0, water / waterTarget);

    const sleepLogs = health.sleepLogs || [];
    const latestSleep = sleepLogs.length > 0 ? sleepLogs[0].hours : 7.5;
    const sleepRatio = Math.min(1.0, latestSleep / 8.0);

    const q1Tasks = tasks.filter(t => !t.completed && (t.quadrant === 'q1' || t.priority === 'high'));
    const sprintStress = Math.min(1.0, q1Tasks.length / 5.0);

    // Compute Multi-Factor Burnout Risk (0 - 100)
    // Formula: (1 - sleep)*0.40 + (1 - water)*0.25 + sprintStress*0.35
    const rawBurnout = ((1.0 - sleepRatio) * 0.40) + ((1.0 - waterRatio) * 0.25) + (sprintStress * 0.35);
    const burnoutScore = Math.min(98, Math.max(12, Math.round(rawBurnout * 100)));

    // Vitality Recovery Factor
    const recoveryFactor = Math.min(100, Math.max(20, Math.round((sleepRatio * 0.5 + waterRatio * 0.5) * 100)));

    let statusLabel = 'Optimal Peak State';
    let statusColor = '#10b981';
    let recommendation = 'Your circadian rhythm and cognitive energy are in harmonious balance. Ideal for high-leverage focus work.';

    if (burnoutScore >= 65) {
      statusLabel = '⚠️ Elevated Burnout Risk';
      statusColor = '#ef4444';
      recommendation = `Sleep (${latestSleep}h) and hydration (${water}ml) are below target while ${q1Tasks.length} high-priority tasks are active. Take a 20-minute restorative walk and hydrate immediately.`;
    } else if (burnoutScore >= 45) {
      statusLabel = '⚡ Moderate Cognitive Load';
      statusColor = '#f59e0b';
      recommendation = 'Work velocity is high. Ensure you finish remaining tasks before 8:00 PM to protect deep sleep latency.';
    }

    return {
      burnoutScore,
      recoveryFactor,
      statusLabel,
      statusColor,
      recommendation,
      latestSleep,
      water,
      waterTarget,
      urgentCount: q1Tasks.length
    };
  },

  renderBurnoutWidget() {
    const data = this.calculateTelemetry();

    return `
      <div class="card card-glass" style="padding:18px 22px; margin-bottom:24px; border:1px solid ${data.statusColor}44; background:linear-gradient(135deg, ${data.statusColor}10 0%, rgba(15,23,42,0.95) 100%); border-radius:16px;">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:48px; height:48px; border-radius:50%; background:${data.statusColor}22; border:2px solid ${data.statusColor}; display:flex; align-items:center; justify-content:center; font-size:20px;">
              ${data.burnoutScore >= 65 ? '⚠️' : data.burnoutScore >= 45 ? '⚡' : '🧠'}
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:11px; font-weight:800; text-transform:uppercase; color:${data.statusColor}; letter-spacing:0.8px;">AI Lifestyle Predictor</span>
                <span class="badge" style="background:${data.statusColor}22; color:${data.statusColor}; font-size:10px; padding:2px 6px;">Risk: ${data.burnoutScore}%</span>
              </div>
              <div style="font-size:13.5px; font-weight:700; color:#fff; margin-top:2px;">${data.statusLabel}</div>
              <div style="font-size:12px; color:#cbd5e1; margin-top:2px; line-height:1.4;">${data.recommendation}</div>
            </div>
          </div>
          <div style="display:flex; gap:10px;">
            <button class="btn btn-outline btn-sm" onclick="Router.navigate('/dashboard/health')" style="border-color:${data.statusColor}; color:${data.statusColor}; font-size:11.5px; padding:6px 14px;">
              <i class="fas fa-heartbeat"></i> Recovery Hub
            </button>
          </div>
        </div>
      </div>
    `;
  },

  emitAction(type, magnitude = 1.0) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bioverse:action', {
        detail: { type, magnitude, timestamp: Date.now() }
      }));
    }
  }
};

window.PredictiveEngine = PredictiveEngine;
