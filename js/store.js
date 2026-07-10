/* ============================================================
   STATE MANAGEMENT STORE — LocalStorage Persistence
   ============================================================ */

const Store = {
  _state: {},
  _listeners: [],
  _storageKey: 'lifeGPS_state',

  // Default state
  _defaults: {
    user: null,
    identityType: null, // 'student' | 'employee' | 'business'
    onboardingComplete: false,
    onboardingStep: 0,
    profile: {
      name: '',
      email: '',
      avatar: '',
      lifeStage: '',
      goalIntensity: 'balanced',
      riskTolerance: 50,
      timeAvailable: 10,
      painPoint: '',
      dreamVision: ''
    },
    // Student-specific
    student: {
      educationLevel: '',
      fieldOfStudy: '',
      gpa: '',
      careerAspiration: '',
      financialStatus: ''
    },
    // Employee-specific
    employee: {
      company: '',
      role: '',
      tenure: '',
      salary: '',
      satisfaction: 50,
      burnoutRisk: 30
    },
    // Business-specific
    business: {
      businessName: '',
      industry: '',
      stage: '',
      revenue: '',
      teamSize: '',
      fundingStatus: ''
    },
    // Dashboard metrics
    metrics: {
      lifeBalance: { career: 72, health: 65, finance: 58, work: 70, life: 75 },
      careerScore: 72,
      healthScore: 65,
      financeScore: 58,
      workScore: 70,
      lifeScore: 75,
      overallScore: 68
    },
    // Chat history
    chatHistory: [],
    // Settings
    settings: {
      theme: 'dark',
      notifications: true,
      emailDigest: true,
      dataSharing: false
    },
    // Tasks
    tasks: [],
    // Habits
    habits: []
  },

  init() {
    const saved = localStorage.getItem(this._storageKey);
    if (saved) {
      try {
        this._state = JSON.parse(saved);
        // Merge with defaults for any new fields
        this._state = this._deepMerge(this._defaults, this._state);
      } catch (e) {
        console.warn('Failed to parse stored state, using defaults');
        this._state = JSON.parse(JSON.stringify(this._defaults));
      }
    } else {
      this._state = JSON.parse(JSON.stringify(this._defaults));
    }
  },

  _deepMerge(defaults, saved) {
    const result = { ...defaults };
    for (const key of Object.keys(saved)) {
      if (saved[key] !== null && typeof saved[key] === 'object' && !Array.isArray(saved[key]) && defaults[key]) {
        result[key] = this._deepMerge(defaults[key], saved[key]);
      } else {
        result[key] = saved[key];
      }
    }
    return result;
  },

  get(path) {
    if (!path) return this._state;
    return path.split('.').reduce((obj, key) => obj?.[key], this._state);
  },

  set(path, value) {
    const keys = path.split('.');
    let current = this._state;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    this._persist();
    this._notify(path, value);
  },

  update(path, updater) {
    const current = this.get(path);
    this.set(path, updater(current));
  },

  _persist() {
    try {
      localStorage.setItem(this._storageKey, JSON.stringify(this._state));
    } catch (e) {
      console.warn('Failed to persist state:', e);
    }
  },

  subscribe(listener) {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter(l => l !== listener);
    };
  },

  _notify(path, value) {
    this._listeners.forEach(listener => {
      try {
        listener(path, value, this._state);
      } catch (e) {
        console.error('Store listener error:', e);
      }
    });
  },

  reset() {
    this._state = JSON.parse(JSON.stringify(this._defaults));
    this._persist();
    this._notify('*', null);
  },

  // Convenience getters
  get isOnboarded() {
    return this._state.onboardingComplete;
  },

  get identityType() {
    return this._state.identityType;
  },

  get userName() {
    return this._state.profile?.name || 'User';
  },

  get userInitials() {
    const name = this.userName;
    if (!name || name === 'User') return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  },

  getMetric(key) {
    return this._state.metrics?.[key] || 0;
  },

  // Generate smart metrics based on identity type
  generateMetrics() {
    const type = this._state.identityType;
    const base = {
      student: { career: 55, health: 70, finance: 40, work: 65, life: 72 },
      employee: { career: 72, health: 58, finance: 65, work: 68, life: 60 },
      business: { career: 80, health: 45, finance: 70, work: 55, life: 50 }
    };

    const scores = base[type] || base.student;
    // Add some randomness
    Object.keys(scores).forEach(k => {
      scores[k] = Math.min(100, Math.max(20, scores[k] + Math.floor(Math.random() * 20 - 10)));
    });

    const overall = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 5);

    this.set('metrics', {
      lifeBalance: scores,
      careerScore: scores.career,
      healthScore: scores.health,
      financeScore: scores.finance,
      workScore: scores.work,
      lifeScore: scores.life,
      overallScore: overall
    });
  }
};

// Initialize on load
Store.init();
