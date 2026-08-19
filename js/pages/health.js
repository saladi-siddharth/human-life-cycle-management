/* ═══════════════════════════════════════════════════════════════════
   HEALTH & WELLNESS PAGE — Interactive Trackers & Dynamic Score Engine
   ═══════════════════════════════════════════════════════════════════ */

function HealthPage() {
  const healthData = Store.get('health') || {};
  const scores = Store.get('scores') || {};
  const waterIntake = healthData.waterIntake || 0;
  const waterTarget = healthData.waterTarget || 2500;
  const fillPercent = Math.min(100, Math.round((waterIntake / waterTarget) * 100));

  const sleepLogs = healthData.sleepLogs || [];
  const workoutLogs = healthData.workoutLogs || [];
  const macroLogs = healthData.macroLogs || { protein: 140, carbs: 210, fat: 65 };

  // Calculate recommendation
  let recIcon = '💧';
  let recTitle = 'Hydration Alert';
  let recText = `You are at ${fillPercent}% of your daily water intake goal (${waterIntake}ml / ${waterTarget}ml). Drink 500ml now!`;
  if (fillPercent >= 100 && sleepLogs.length && sleepLogs[0].quality < 4) {
    recIcon = '😴';
    recTitle = 'Sleep Recovery Optimization';
    recText = 'Your sleep quality dropped last night. Avoid screens 1 hour before bed and keep bedroom at 68°F.';
  } else if (fillPercent >= 100) {
    recIcon = '🔥';
    recTitle = 'Peak Physical Conditioning';
    recText = 'Hydration target achieved! Complete a 30-min resistance training session to maintain high performance.';
  }

  const content = `
    <div class="health-page">
      ${UI.sectionHeader(
        'Health & Wellness Protocol',
        'Track hydration, sleep recovery, workouts, nutrition, and mental stress in real-time.',
        `<button class="btn btn-primary btn-sm" onclick="openWorkoutModal()"><i class="fas fa-plus"></i> Log Workout</button>`
      )}

      <!-- Real-Time Recommendation -->
      ${UI.recommendationBanner(recIcon, recTitle, recText, 'Log Hydration (+500ml)', 'quickAddWater(500)')}

      <!-- Domain Score Banner -->
      <div class="card card-glass" style="margin-bottom:var(--space-xl);display:flex;align-items:center;justify-content:space-between;padding:24px;">
        <div style="display:flex;align-items:center;gap:20px;">
          <div style="font-size:42px;background:rgba(16,185,129,0.15);width:70px;height:70px;border-radius:50%;display:flex;align-items:center;justify-content:center;">💪</div>
          <div>
            <h2 style="margin:0;font-size:24px;">Health Score: <span style="color:var(--emerald);">${scores.health || 80}/100</span></h2>
            <p style="margin:4px 0 0 0;color:var(--text-secondary);font-size:var(--text-sm);">Calculated dynamically from sleep consistency, water intake, and exercise frequency.</p>
          </div>
        </div>
        <div style="text-align:right;">
          <span class="badge badge-success">Optimal Vitality</span>
        </div>
      </div>

      <!-- 4 Core Sub-Component Grid -->
      <div class="grid grid-2" style="gap:24px;">
        
        <!-- 1. Hydration & Water Intake Tracker with 3D Fluid Physics -->
        <div>
          ${WaterPhysicsEngine.render3DWaterGlass()}
        </div>

        <!-- 2. Sleep & Recovery Analyzer -->
        <div class="card card-glass">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <h3 style="margin:0;display:flex;align-items:center;gap:8px;"><i class="fas fa-bed" style="color:var(--indigo-light);"></i> Sleep & Recovery</h3>
            <button class="btn btn-ghost btn-sm" onclick="openSleepModal()"><i class="fas fa-plus"></i> Log Sleep</button>
          </div>
          
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${sleepLogs.slice(0, 3).map((s, idx) => `
              <div id="sleep-row-${s.id || idx}" style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:var(--bg-tertiary);border-radius:var(--radius-md);border:1px solid var(--glass-border);transition:all 0.2s ease;">
                <div>
                  <div style="font-weight:600;">${s.hours} Hours (${'⭐'.repeat(s.quality)})</div>
                  <div style="font-size:var(--text-xs);color:var(--text-muted);">${s.date} • Bedtime: ${s.bedtime}</div>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <span class="badge ${s.hours >= 7.5 ? 'badge-success' : 'badge-warning'}">${s.hours >= 7.5 ? 'Recovered' : 'Sleep Debt'}</span>
                  <button class="btn-delete-epic btn-delete-sm" onclick="deleteSleepLogItem('${s.id || idx}', this.closest('#sleep-row-${s.id || idx}'))" data-tooltip="Crumple & Toss Sleep Log">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            `).join('') || '<p style="color:var(--text-muted);">No sleep logs recorded yet.</p>'}
          </div>
        </div>

        <!-- 3. Workout & Fitness Logger -->
        <div class="card card-glass">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <h3 style="margin:0;display:flex;align-items:center;gap:8px;"><i class="fas fa-running" style="color:var(--emerald);"></i> Fitness & Workouts</h3>
            <button class="btn btn-ghost btn-sm" onclick="openWorkoutModal()"><i class="fas fa-plus"></i> Add Session</button>
          </div>

          <div style="display:flex;flex-direction:column;gap:12px;">
            ${workoutLogs.map((w, idx) => `
              <div id="workout-row-${w.id || idx}" style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:var(--bg-tertiary);border-radius:var(--radius-md);border:1px solid var(--glass-border);transition:all 0.2s ease;">
                <div>
                  <div style="font-weight:600;">${w.type}</div>
                  <div style="font-size:var(--text-xs);color:var(--text-muted);">${w.duration} mins • ${w.calories} kcal burned</div>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <span class="badge badge-accent">${w.date}</span>
                  <button class="btn-delete-epic btn-delete-sm" onclick="deleteWorkoutLogItem('${w.id || idx}', this.closest('#workout-row-${w.id || idx}'))" data-tooltip="Crumple & Toss Workout Log">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            `).join('') || '<p style="color:var(--text-muted);">No workout logs recorded yet.</p>'}
          </div>
        </div>

        <!-- 4. Mindfulness & Stress Check-in -->
        <div class="card card-glass">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <h3 style="margin:0;display:flex;align-items:center;gap:8px;"><i class="fas fa-spa" style="color:var(--purple);"></i> Mind & Stress Relief</h3>
            <span class="badge badge-purple">4-7-8 Breathing</span>
          </div>

          <div style="text-align:center;padding:16px;background:var(--bg-tertiary);border-radius:var(--radius-md);border:1px solid var(--glass-border);">
            <div id="breathing-circle" style="width:80px;height:80px;border-radius:50%;background:rgba(168,85,247,0.2);border:3px solid var(--purple);margin:0 auto 16px auto;display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--purple);transition:all 4s ease;">
              Breathe
            </div>
            <button class="btn btn-outline btn-sm" id="breath-btn" onclick="toggleBreathingTimer()">Start 2-Min Reset</button>
          </div>
        </div>

      </div>
    </div>
  `;

  return UI.dashboardLayout('/dashboard/health', content);
}

// ─── Health Interactive Handlers ───────────────────────────
function quickAddWater(amount) {
  WaterPhysicsEngine.pourWater(amount);
  const healthData = Store.get('health') || {};
  if (healthData.waterIntake >= (healthData.waterTarget || 2500)) {
    EmailService.sendHealthAlert('Hydration Goal Achieved! 🎉', `You hit your 2,500ml daily target (${healthData.waterIntake}ml logged).`);
  }
  UI.toast('success', 'Hydration Logged', `Added +${amount}ml of water to your daily total.`);
  Router.render();
}

function openSleepModal() {
  const html = `
    <h3>Log Sleep Session</h3>
    <form onsubmit="saveSleepForm(event)" style="display:flex;flex-direction:column;gap:14px;margin-top:16px;">
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Sleep Duration (Hours)</label>
        <input type="number" step="0.5" id="sleep-hours" class="chat-input" value="7.5" required>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Quality Rating (1 to 5 Stars)</label>
        <select id="sleep-quality" class="chat-input">
          <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
          <option value="4" selected>⭐⭐⭐⭐ Good</option>
          <option value="3">⭐⭐⭐ Fair</option>
          <option value="2">⭐⭐ Poor</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Save Sleep Log</button>
    </form>
  `;
  UI.modal(html);
}

function saveSleepForm(e) {
  e.preventDefault();
  const hours = document.getElementById('sleep-hours').value;
  const quality = document.getElementById('sleep-quality').value;
  Store.logSleep({ hours, quality });
  if (Number(hours) < 6.5 || Number(quality) <= 2) {
    EmailService.sendHealthAlert('Sleep Debt Alert ⚠️', `Recorded ${hours} hours of sleep (Rating: ${quality}/5 stars). Review your recovery protocol.`);
  } else {
    EmailService.sendHealthAlert('Sleep Logged 😴', `Recorded ${hours} hours of sleep with quality rating ${quality}/5 stars.`);
  }
  UI.closeModal();
  ActionPhysics.moonSleep(hours);
  UI.toast('success', 'Sleep Recorded 🌙', 'Floating moon and drifting Zzz recorded your sleep metrics.');
  Router.render();
}

function openWorkoutModal() {
  const html = `
    <h3>Log Exercise & Workout Session</h3>
    <form onsubmit="saveWorkoutForm(event)" style="display:flex;flex-direction:column;gap:14px;margin-top:16px;">
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Workout Type</label>
        <input type="text" id="workout-type" class="chat-input" placeholder="e.g. Resistance Training, Outdoor Run, Yoga" required>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Duration (Mins)</label>
          <input type="number" id="workout-dur" class="chat-input" value="45" required>
        </div>
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Calories Burned (kcal)</label>
          <input type="number" id="workout-cal" class="chat-input" value="300" required>
        </div>
      </div>
      <button type="submit" class="btn btn-success">Save Workout Session</button>
    </form>
  `;
  UI.modal(html);
}

function saveWorkoutForm(e) {
  e.preventDefault();
  const type = document.getElementById('workout-type').value;
  const duration = document.getElementById('workout-dur').value;
  const calories = document.getElementById('workout-cal').value;
  Store.logWorkout({ type, duration, calories });
  EmailService.sendHealthAlert('Workout Completed 💪', `Completed ${duration} mins of ${type} (${calories} kcal burned).`);
  UI.closeModal();
  ActionPhysics.dumbbellFlex(type);
  UI.toast('success', 'Workout Logged! 🏋️‍♂️⚡', `Great job! Power flex recorded ${duration} mins of ${type}.`);
  Router.render();
}

let breathInterval = null;
function toggleBreathingTimer() {
  const circle = document.getElementById('breathing-circle');
  const btn = document.getElementById('breath-btn');
  if (breathInterval) {
    clearInterval(breathInterval);
    breathInterval = null;
    btn.textContent = 'Start 2-Min Reset';
    circle.style.transform = 'scale(1)';
    circle.textContent = 'Breathe';
    return;
  }

  btn.textContent = 'Stop Exercise';
  let expanding = true;
  circle.textContent = 'Inhale';
  circle.style.transform = 'scale(1.5)';

  breathInterval = setInterval(() => {
    if (expanding) {
      circle.textContent = 'Exhale';
      circle.style.transform = 'scale(0.8)';
    } else {
      circle.textContent = 'Inhale';
      circle.style.transform = 'scale(1.5)';
    }
    expanding = !expanding;
  }, 4000);
}

function deleteWorkoutLogItem(id, element) {
  const el = element || document.getElementById(`workout-row-${id}`);
  DeleteEngine.tossAndDelete(el, () => {
    Store.deleteWorkoutLog(id);
    UI.toast('info', 'Workout Tossed', 'Workout log crumpled into paper ball and tossed!');
    Router.render();
  });
}

function deleteSleepLogItem(id, element) {
  const el = element || document.getElementById(`sleep-row-${id}`);
  DeleteEngine.tossAndDelete(el, () => {
    Store.deleteSleepLog(id);
    UI.toast('info', 'Sleep Log Tossed', 'Sleep log crumpled into paper ball and tossed!');
    Router.render();
  });
}

window.quickAddWater = quickAddWater;
window.openSleepModal = openSleepModal;
window.saveSleepForm = saveSleepForm;
window.openWorkoutModal = openWorkoutModal;
window.saveWorkoutForm = saveWorkoutForm;
window.toggleBreathingTimer = toggleBreathingTimer;
window.deleteWorkoutLogItem = deleteWorkoutLogItem;
window.deleteSleepLogItem = deleteSleepLogItem;

