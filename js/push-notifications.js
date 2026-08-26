/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE WEB PUSH NOTIFICATION & DAILY ROUTINE DAEMON
   ═══════════════════════════════════════════════════════════════════ */

const PushNotificationEngine = {
  permission: typeof Notification !== 'undefined' ? Notification.permission : 'default',
  routineInterval: null,

  init() {
    if (typeof window === 'undefined') return;

    this.checkPermission();
    this.startRoutineDaemon();
  },

  checkPermission() {
    if (typeof Notification !== 'undefined') {
      this.permission = Notification.permission;
    }
  },

  async requestPermission() {
    if (typeof Notification === 'undefined') {
      UI.toast('warning', 'Unsupported', 'Web notifications are not supported in this browser.');
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      this.permission = result;
      if (result === 'granted') {
        UI.toast('success', 'Push Notifications Enabled', 'You will receive scheduled daily routines and hydration boosts.');
        this.sendNotification('🧬 BioVerse Notifications Active', {
          body: 'Your intelligent lifecycle routines and daily wisdom are now synced in real-time.',
          icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧭</text></svg>"
        });
        return true;
      } else {
        UI.toast('info', 'Notifications Blocked', 'You can enable them anytime from browser settings.');
        return false;
      }
    } catch (e) {
      console.warn('Notification permission error:', e.message);
      return false;
    }
  },

  sendNotification(title, options = {}) {
    if (this.permission !== 'granted') {
      // Fallback in-app toast
      UI.toast('info', title, options.body || '');
      return;
    }

    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then(reg => {
          reg.showNotification(title, {
            body: options.body || '',
            icon: options.icon || "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧭</text></svg>",
            badge: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧬</text></svg>",
            tag: options.tag || 'bioverse-routine',
            renotify: true
          });
        });
      } else {
        new Notification(title, options);
      }
    } catch (e) {
      UI.toast('info', title, options.body || '');
    }
  },

  /**
   * Background routine daemon checking scheduled timestamps
   */
  startRoutineDaemon() {
    if (this.routineInterval) clearInterval(this.routineInterval);

    this.routineInterval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Check hydration reminders at minute 0 every 2 hours between 9 AM and 9 PM
      if (minutes === 0 && hours >= 9 && hours <= 21 && hours % 2 === 1) {
        const state = Store.getState();
        const intake = state.health?.waterIntake || 0;
        const target = state.health?.waterTarget || 2500;
        if (intake < target) {
          this.sendNotification('💧 Hydration & Mental Clarity Pulse', {
            body: `You are at ${intake}ml / ${target}ml. Drink 250ml of clean water to maintain peak cognitive stamina.`,
            tag: 'hydration-pulse'
          });
        }
      }
    }, 60000); // check every minute
  },

  /**
   * Manual trigger for testing
   */
  triggerTestNotification() {
    this.sendNotification('⚡ Focus Block Complete', {
      body: 'Your 25-minute Pomodoro sprint is finished. Take 5 minutes to hydrate and stretch.',
      tag: 'test-notification'
    });
  }
};

window.PushNotificationEngine = PushNotificationEngine;
PushNotificationEngine.init();
