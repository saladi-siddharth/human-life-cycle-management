/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE GAMIFICATION, XP, STREAKS & SOCIAL ACCOUNTABILITY PODS
   ═══════════════════════════════════════════════════════════════════ */

const GamificationEngine = {
  BADGES: [
    { id: 'b_hydration', name: 'Hydration Titan', icon: '💧', desc: 'Achieved 100% hydration target for 3 consecutive days', color: '#00f2fe' },
    { id: 'b_deepwork', name: 'Deep Work Monk', icon: '⚡', desc: 'Completed 5 deep focus Pomodoro sprints without distraction', color: '#ec4899' },
    { id: 'b_wealth', name: 'Wealth Sovereign', icon: '💰', desc: 'Allocated systematic monthly SIP and analyzed tax deductions', color: '#f59e0b' },
    { id: 'b_academic', name: 'Academic Vanguard', icon: '🎓', desc: 'Researched Tier-1 colleges, NIRF cutoffs & NSP scholarships', color: '#6366f1' },
    { id: 'b_sattvic', name: 'Sattvic Vitality Master', icon: '🥗', desc: 'Logged 3 precision nutrition meals via AI Camera Vision', color: '#10b981' },
    { id: 'b_resume', name: 'ATS Resume Architect', icon: '📄', desc: 'Optimized resume and achieved >85% ATS match score', color: '#8b5cf6' }
  ],

  PODS: [
    {
      id: 'pod_iit',
      name: 'IIT JEE & B.Tech Placement Pod',
      tag: 'STUDENT',
      members: 1420,
      avgLifeScore: 84,
      streakAvg: '18 Days',
      icon: '🏛️',
      desc: 'Top engineering candidates preparing for Google India, Microsoft & GATE 2027.'
    },
    {
      id: 'pod_founders',
      name: 'Bengaluru AI Founders & Builders',
      tag: 'BUSINESS',
      members: 680,
      avgLifeScore: 88,
      streakAvg: '24 Days',
      icon: '🚀',
      desc: 'Seed-stage founders executing sprints, cap table splits, and product shipping.'
    },
    {
      id: 'pod_fintech',
      name: 'Nifty 50 Wealth Compounding Circle',
      tag: 'FINANCE',
      members: 2190,
      avgLifeScore: 81,
      streakAvg: '14 Days',
      icon: '📈',
      desc: 'Disciplined compounding through index SIPs, emergency funds & tax optimization.'
    }
  ],

  init() {
    const state = Store.getState();
    if (!state.gamification) {
      state.gamification = {
        xp: 450,
        level: 3,
        streakDays: 6,
        lastActiveDate: new Date().toISOString().split('T')[0],
        unlockedBadges: ['b_hydration', 'b_wealth', 'b_sattvic'],
        joinedPods: ['pod_iit']
      };
      Store._save();
    }
  },

  calculateLevel(xp) {
    return Math.floor(Math.sqrt(xp / 50)) + 1;
  },

  getXPProgress() {
    const state = Store.getState();
    const xp = state.gamification?.xp || 450;
    const currentLevel = this.calculateLevel(xp);
    const currentLevelBaseXP = Math.pow(currentLevel - 1, 2) * 50;
    const nextLevelBaseXP = Math.pow(currentLevel, 2) * 50;
    const levelXP = xp - currentLevelBaseXP;
    const levelRequiredXP = nextLevelBaseXP - currentLevelBaseXP;
    const percentage = Math.min(100, Math.round((levelXP / levelRequiredXP) * 100));

    return {
      xp,
      currentLevel,
      percentage,
      nextLevelXP: nextLevelBaseXP
    };
  },

  awardXP(amount, reason = 'Achievement completed') {
    const state = Store.getState();
    if (!state.gamification) this.init();

    const oldLevel = this.calculateLevel(state.gamification.xp);
    state.gamification.xp += amount;
    const newLevel = this.calculateLevel(state.gamification.xp);
    state.gamification.level = newLevel;

    Store._save();
    Store._notify();

    UI.toast('success', `+${amount} XP Earned!`, reason);

    if (newLevel > oldLevel) {
      this.celebrateLevelUp(newLevel);
    }
  },

  celebrateLevelUp(level) {
    if (typeof ActionPhysics !== 'undefined') {
      ActionPhysics.levelUpBlast(level);
    }
    UI.toast('success', `🎉 LEVEL UP: LEVEL ${level}!`, 'You unlocked higher prestige and new milestone perks.');
  },

  toggleJoinPod(podId) {
    const state = Store.getState();
    if (!state.gamification) this.init();
    if (!state.gamification.joinedPods) state.gamification.joinedPods = [];

    const idx = state.gamification.joinedPods.indexOf(podId);
    if (idx >= 0) {
      state.gamification.joinedPods.splice(idx, 1);
      UI.toast('info', 'Left Pod', 'You have left this accountability pod.');
    } else {
      state.gamification.joinedPods.push(podId);
      this.awardXP(50, 'Joined new Peer Accountability Pod');
      UI.toast('success', 'Joined Pod! 👥', 'You are now synced with this peer cohort.');
    }

    Store._save();
    Store._notify();

    if (typeof Router !== 'undefined' && Router.render) {
      Router.render();
    }
  },

  /**
   * Renders the Gamification & Pods Widget
   */
  renderDashboardWidget() {
    this.init();
    const state = Store.getState();
    const g = state.gamification;
    const progress = this.getXPProgress();
    const unlocked = g.unlockedBadges || [];
    const joined = g.joinedPods || [];

    return `
      <div class="card card-glass" style="margin-bottom:24px; padding:22px; border:1px solid rgba(0,242,254,0.25); border-radius:18px; background:linear-gradient(135deg, rgba(0,242,254,0.06) 0%, rgba(15,23,42,0.92) 100%);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:16px;">
          <!-- Level & XP Badge -->
          <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:54px; height:54px; border-radius:16px; background:linear-gradient(135deg, #00f2fe, #6366f1); display:flex; flex-direction:column; align-items:center; justify-content:center; box-shadow:0 0 20px rgba(0,242,254,0.4); font-weight:900; color:#070a14;">
              <span style="font-size:10px; text-transform:uppercase; font-weight:800;">LVL</span>
              <span style="font-size:22px; line-height:1;">${progress.currentLevel}</span>
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:8px;">
                <h3 style="margin:0; font-size:17px; font-weight:800;">BioVerse Vanguard Prestige</h3>
                <span class="badge badge-primary" style="font-size:10px;">⚡ ${g.streakDays}-Day Active Streak</span>
              </div>
              <div style="font-size:12px; color:#cbd5e1; margin-top:2px;">
                <strong>${progress.xp} XP</strong> total • ${progress.percentage}% toward Level ${progress.currentLevel + 1} (${progress.nextLevelXP} XP)
              </div>
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div style="display:flex; gap:8px;">
            <button class="btn btn-secondary btn-sm" onclick="VisionEngine.openMealScanner()"><i class="fas fa-camera"></i> +20 XP Meal Scan</button>
            <button class="btn btn-outline btn-sm" onclick="VisionEngine.openResumeScanner()"><i class="fas fa-file-alt"></i> +30 XP Resume ATS</button>
          </div>
        </div>

        <!-- Level Progress Bar -->
        <div style="background:rgba(255,255,255,0.06); height:8px; border-radius:999px; overflow:hidden; margin-bottom:20px;">
          <div style="background:linear-gradient(90deg, #00f2fe, #6366f1); width:${progress.percentage}%; height:100%; border-radius:999px; transition:width 1s ease;"></div>
        </div>

        <!-- Badges & Peer Pods Grid -->
        <div class="grid grid-2" style="gap:16px;">
          <!-- Badges Showcase -->
          <div style="background:#070a14; border:1px solid #1e293b; border-radius:14px; padding:16px;">
            <div style="font-size:12px; font-weight:800; color:#38bdf8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:10px;">
              🏆 Milestone Achievements (${unlocked.length}/${this.BADGES.length})
            </div>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              ${this.BADGES.map(b => {
                const isUnlocked = unlocked.includes(b.id);
                return `
                  <div class="card-hover" title="${b.name}: ${b.desc}" style="width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:20px; background:${isUnlocked ? 'rgba(0,242,254,0.15)' : 'rgba(255,255,255,0.02)'}; border:1px solid ${isUnlocked ? b.color : '#1e293b'}; opacity:${isUnlocked ? 1 : 0.35}; cursor:pointer;">
                    ${b.icon}
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Peer Accountability Pods -->
          <div style="background:#070a14; border:1px solid #1e293b; border-radius:14px; padding:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <div style="font-size:12px; font-weight:800; color:#10b981; text-transform:uppercase; letter-spacing:0.5px;">
                👥 Social Accountability Circles
              </div>
              <span style="font-size:11px; color:#94a3b8;">${joined.length} Active Pods</span>
            </div>

            <div style="display:flex; flex-direction:column; gap:8px;">
              ${this.PODS.slice(0, 2).map(pod => {
                const isJoined = joined.includes(pod.id);
                return `
                  <div style="display:flex; align-items:center; justify-content:space-between; background:#0c1222; border:1px solid #1e293b; border-radius:8px; padding:8px 12px; font-size:12px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                      <span>${pod.icon}</span>
                      <div>
                        <div style="font-weight:700; color:#fff;">${pod.name}</div>
                        <div style="font-size:10.5px; color:#94a3b8;">${pod.members.toLocaleString('en-IN')} Members • Avg Streak: ${pod.streakAvg}</div>
                      </div>
                    </div>
                    <button class="btn ${isJoined ? 'btn-ghost' : 'btn-primary'} btn-sm" style="font-size:11px; padding:4px 10px;" onclick="GamificationEngine.toggleJoinPod('${pod.id}')">
                      ${isJoined ? 'Joined ✅' : 'Join Pod'}
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

window.GamificationEngine = GamificationEngine;
GamificationEngine.init();
