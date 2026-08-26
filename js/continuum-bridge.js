/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE CONTINUUM BRIDGE — SaaS Telemetry & Spatial 3D Dispatcher
   - Manages Cross-Pillar Telemetry Actions (XP, Wealth, Health, Habits)
   - Dispatches Custom Telemetry Events for 3D Continuum Pavilion
   ═══════════════════════════════════════════════════════════════════ */

const ContinuumBridge = {
  initialized: false,

  init() {
    if (this.initialized) return;

    // Clean up any legacy background canvas for pristine, razor-sharp SaaS frame
    const legacyCanvas = document.getElementById('continuum-bg-canvas');
    if (legacyCanvas) legacyCanvas.remove();

    // Telemetry Event Listener
    window.addEventListener('bioverse:action', (e) => this.onTelemetryAction(e.detail));

    this.initialized = true;
  },

  syncToRoute(route) {
    // Route state synchronization
  },

  onTelemetryAction(detail) {
    const { type, amount, magnitude = 1.0 } = detail || {};
    // Trigger micro-visual feedback or pass telemetry to external 3D pavilion if connected
    if (typeof window !== 'undefined' && window.__continuumPavilion) {
      try {
        window.__continuumPavilion.postMessage({ type, amount, magnitude }, '*');
      } catch (e) {}
    }
  }
};

window.ContinuumBridge = ContinuumBridge;
ContinuumBridge.init();
