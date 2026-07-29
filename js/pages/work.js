/* ═══════════════════════════════════════════════════════════════════
   WORK & PRODUCTIVITY PAGE — Eisenhower Matrix, Pomodoro Timer & Anti-Burnout
   ═══════════════════════════════════════════════════════════════════ */

function WorkPage() {
  const tasks = Store.get('tasks') || [];
  const scores = Store.get('scores') || {};

  const q1Tasks = tasks.filter(t => t.quadrant === 'q1'); // Do First
  const q2Tasks = tasks.filter(t => t.quadrant === 'q2'); // Schedule
  const q3Tasks = tasks.filter(t => t.quadrant === 'q3'); // Delegate
  const q4Tasks = tasks.filter(t => t.quadrant === 'q4'); // Eliminate

  const completedCount = tasks.filter(t => t.completed).length;

  // Recommendation
  let recIcon = '⚡';
  let recTitle = 'High-Impact Focus';
  let recText = `You have ${q1Tasks.filter(t=>!t.completed).length} Urgent & Important tasks pending. Start a 25-min Pomodoro session to tackle them!`;

  const content = `
    <div class="work-page">
      ${UI.sectionHeader(
        'Productivity & Execution System',
        'Master your daily workflow with the Eisenhower Matrix, Pomodoro Focus Sprints, and Burnout Prevention.',
        `<button class="btn btn-primary btn-sm" onclick="openTaskModal()"><i class="fas fa-plus"></i> New Task</button>`
      )}

      <!-- Real-Time Recommendation -->
      ${UI.recommendationBanner(recIcon, recTitle, recText, 'Start Focus Sprint', 'startPomodoroTimer()')}

      <!-- Main Grid: Pomodoro & Burnout Meter -->
      <div class="grid grid-2" style="gap:24px;margin-bottom:24px;">
        
        <!-- Integrated Pomodoro Focus Timer -->
        <div class="card card-glass" style="text-align:center;">
          <h3 style="margin:0;display:flex;align-items:center;justify-content:center;gap:8px;"><i class="fas fa-stopwatch" style="color:var(--cyan);"></i> Pomodoro Focus Timer</h3>
          <div class="pomodoro-display" id="pomo-timer">25:00</div>
          <div style="display:flex;justify-content:center;gap:12px;">
            <button class="btn btn-primary" id="pomo-start-btn" onclick="togglePomodoro()"><i class="fas fa-play"></i> Start Focus</button>
            <button class="btn btn-secondary" onclick="resetPomodoro()"><i class="fas fa-redo"></i> Reset</button>
          </div>
        </div>

        <!-- Work Score & Burnout Index -->
        <div class="card card-glass">
          <h3 style="margin:0 0 16px 0;display:flex;align-items:center;gap:8px;"><i class="fas fa-fire-alt" style="color:var(--orange);"></i> Productivity & Recovery</h3>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:16px;background:var(--bg-tertiary);border-radius:var(--radius-md);margin-bottom:12px;">
            <div>
              <div style="font-weight:700;font-size:18px;color:var(--cyan);">Work Score: ${scores.work || 78}/100</div>
              <div style="font-size:var(--text-xs);color:var(--text-secondary);">${completedCount} of ${tasks.length} total tasks completed</div>
            </div>
            <span class="badge badge-success">High Throughput</span>
          </div>

          <div style="padding:12px;background:var(--bg-tertiary);border-radius:var(--radius-md);border:1px solid var(--glass-border);">
            <div style="font-weight:600;font-size:var(--text-xs);color:var(--text-muted);">Burnout Risk Meter</div>
            <div class="progress-bar" style="margin:8px 0;">
              <div class="progress-fill" style="width:25%;background:var(--emerald);"></div>
            </div>
            <div style="font-size:11px;color:var(--emerald);">Low Risk (25%) — Healthy work-life boundary maintained.</div>
          </div>
        </div>

      </div>

      <!-- Eisenhower Priority Matrix -->
      <h3 style="margin:0 0 16px 0;">Eisenhower Priority Matrix</h3>
      <div class="eisenhower-grid">
        
        <!-- Q1: Urgent & Important -->
        <div class="eisenhower-quadrant eisenhower-q1">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <strong style="color:var(--red);"><i class="fas fa-exclamation-circle"></i> DO FIRST (Urgent & Important)</strong>
            <span class="badge badge-danger">${q1Tasks.length}</span>
          </div>
          ${renderQuadrantTasks(q1Tasks)}
        </div>

        <!-- Q2: Not Urgent & Important -->
        <div class="eisenhower-quadrant eisenhower-q2">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <strong style="color:var(--indigo-light);"><i class="fas fa-calendar-alt"></i> SCHEDULE (Not Urgent, Important)</strong>
            <span class="badge badge-info">${q2Tasks.length}</span>
          </div>
          ${renderQuadrantTasks(q2Tasks)}
        </div>

        <!-- Q3: Urgent & Not Important -->
        <div class="eisenhower-quadrant eisenhower-q3">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <strong style="color:var(--amber);"><i class="fas fa-user-friends"></i> DELEGATE (Urgent, Not Important)</strong>
            <span class="badge badge-warning">${q3Tasks.length}</span>
          </div>
          ${renderQuadrantTasks(q3Tasks)}
        </div>

        <!-- Q4: Not Urgent & Not Important -->
        <div class="eisenhower-quadrant eisenhower-q4">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <strong style="color:var(--text-muted);"><i class="fas fa-trash-alt"></i> ELIMINATE (Neither)</strong>
            <span class="badge badge-neutral">${q4Tasks.length}</span>
          </div>
          ${renderQuadrantTasks(q4Tasks)}
        </div>

      </div>
    </div>
  `;

  return UI.dashboardLayout('/dashboard/work', content);
}

function renderQuadrantTasks(taskList) {
  if (!taskList.length) return `<div style="font-size:var(--text-xs);color:var(--text-muted);padding:10px 0;">No tasks in quadrant</div>`;
  return taskList.map(t => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--bg-tertiary);border-radius:var(--radius-sm);margin-bottom:8px;border:1px solid var(--glass-border);">
      <div style="display:flex;align-items:center;gap:8px;">
        <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggleTaskDone('${t.id}')">
        <span style="font-size:var(--text-xs);${t.completed ? 'text-decoration:line-through;color:var(--text-muted);' : ''}">${t.title}</span>
      </div>
      <button class="btn btn-ghost btn-sm" style="padding:2px 6px;" onclick="deleteTaskItem('${t.id}')">✕</button>
    </div>
  `).join('');
}

// ─── Work Interactive Handlers ──────────────────────────────
function toggleTaskDone(id) {
  Store.toggleTask(id);
  Router.render();
}

function deleteTaskItem(id) {
  Store.deleteTask(id);
  Router.render();
}

function openTaskModal() {
  const html = `
    <h3>Create New Task</h3>
    <form onsubmit="saveTaskForm(event)" style="display:flex;flex-direction:column;gap:14px;margin-top:16px;">
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Task Description</label>
        <input type="text" id="task-title" class="chat-input" placeholder="e.g. Finalize Q3 Product Architecture" required>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Eisenhower Matrix Quadrant</label>
        <select id="task-quad" class="chat-input">
          <option value="q1">Q1: Do First (Urgent & Important)</option>
          <option value="q2" selected>Q2: Schedule (Not Urgent & Important)</option>
          <option value="q3">Q3: Delegate (Urgent & Not Important)</option>
          <option value="q4">Q4: Eliminate (Neither)</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Add Task</button>
    </form>
  `;
  UI.modal(html);
}

function saveTaskForm(e) {
  e.preventDefault();
  const title = document.getElementById('task-title').value;
  const quadrant = document.getElementById('task-quad').value;
  Store.addTask({ title, quadrant, domain: 'work' });
  EmailService.sendWorkAlert('Eisenhower Task Added', `New Task "${title}" assigned to Matrix ${quadrant.toUpperCase()}`);
  UI.closeModal();
  UI.toast('success', 'Task Created', 'Added new task to your matrix.');
  Router.render();
}

// Pomodoro Timer Logic
let pomoInterval = null;
let pomoSeconds = 25 * 60;

function togglePomodoro() {
  const btn = document.getElementById('pomo-start-btn');
  if (pomoInterval) {
    clearInterval(pomoInterval);
    pomoInterval = null;
    btn.innerHTML = '<i class="fas fa-play"></i> Resume Focus';
    return;
  }

  btn.innerHTML = '<i class="fas fa-pause"></i> Pause';
  pomoInterval = setInterval(() => {
    if (pomoSeconds > 0) {
      pomoSeconds--;
      updatePomoDisplay();
    } else {
      clearInterval(pomoInterval);
      pomoInterval = null;
      UI.toast('success', 'Pomodoro Completed!', 'Take a 5-minute break.');
      btn.innerHTML = '<i class="fas fa-play"></i> Start Focus';
      pomoSeconds = 25 * 60;
      updatePomoDisplay();
    }
  }, 1000);
}

function resetPomodoro() {
  if (pomoInterval) clearInterval(pomoInterval);
  pomoInterval = null;
  pomoSeconds = 25 * 60;
  updatePomoDisplay();
  const btn = document.getElementById('pomo-start-btn');
  if (btn) btn.innerHTML = '<i class="fas fa-play"></i> Start Focus';
}

function updatePomoDisplay() {
  const el = document.getElementById('pomo-timer');
  if (!el) return;
  const m = Math.floor(pomoSeconds / 60);
  const s = pomoSeconds % 60;
  el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function startPomodoroTimer() {
  togglePomodoro();
}

window.openTaskModal = openTaskModal;
window.saveTaskForm = saveTaskForm;
window.toggleTaskDone = toggleTaskDone;
window.deleteTaskItem = deleteTaskItem;
window.togglePomodoro = togglePomodoro;
window.resetPomodoro = resetPomodoro;
window.startPomodoroTimer = startPomodoroTimer;


