/* ═══════════════════════════════════════════════════════════════════
   WORK & PRODUCTIVITY PAGE — Eisenhower Matrix, Time-Based To-Do & Alerts
   ═══════════════════════════════════════════════════════════════════ */

function WorkPage() {
  const tasks = Store.get('tasks') || [
    { id: 't-1', title: 'Complete AI ATS Resume Review & Optimization', quadrant: 'q1', dueTime: '11:00 AM', priority: 'high', completed: false },
    { id: 't-2', title: 'Review 50/30/20 Mutual Fund SIP allocations', quadrant: 'q2', dueTime: '02:30 PM', priority: 'medium', completed: false },
    { id: 't-3', title: 'Hydration check & 30-min resistance training', quadrant: 'q2', dueTime: '05:00 PM', priority: 'medium', completed: true },
    { id: 't-4', title: 'Sort non-essential newsletter subscriptions', quadrant: 'q4', dueTime: '07:00 PM', priority: 'low', completed: false }
  ];
  const scores = Store.get('scores') || {};

  const q1Tasks = tasks.filter(t => t.quadrant === 'q1'); // Do First
  const q2Tasks = tasks.filter(t => t.quadrant === 'q2'); // Schedule
  const q3Tasks = tasks.filter(t => t.quadrant === 'q3'); // Delegate
  const q4Tasks = tasks.filter(t => t.quadrant === 'q4'); // Eliminate

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  // Real-Time Dynamic Work Score Calculation
  const computedWorkScore = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 75;

  // Dynamic Recommendation
  let recIcon = '⚡';
  let recTitle = 'Deep Focus & Task Velocity';
  let recText = `You have ${pendingCount} active tasks (${q1Tasks.filter(t=>!t.completed).length} high priority). Adding tasks automatically dispatches scheduled email reminders to your inbox!`;

  const workQuote = EmailService.getRandomQuote('work');

  const content = `
    <div class="work-page">
      ${UI.sectionHeader(
        'Productivity & Time Execution System',
        'Master your daily workflow with time-scheduled to-do lists, Eisenhower priority matrices, and Pomodoro focus sprints.',
        `<div style="display:flex;gap:8px;">
          <button class="btn btn-outline btn-sm" onclick="checkPendingTasksAlert()"><i class="fas fa-bell"></i> Check Overdue Tasks</button>
          <button class="btn btn-primary btn-sm" onclick="openTaskModal()"><i class="fas fa-plus"></i> New Time Task</button>
        </div>`
      )}

      <!-- Productivity Wisdom Quotation Card -->
      <div class="card card-glass" style="margin-bottom:20px; padding:18px 22px; border-radius:16px; border:1px solid rgba(0,242,254,0.3); background:linear-gradient(135deg, rgba(0,242,254,0.08) 0%, rgba(15,23,42,0.95) 100%);">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div style="display:flex; align-items:center; gap:14px;">
            <span style="font-size:28px;">⚡</span>
            <div>
              <div style="font-size:11px; font-weight:800; color:#00f2fe; text-transform:uppercase; letter-spacing:0.8px;">Deep Work & Execution Maxim</div>
              <div style="font-size:14px; font-weight:600; color:#fff; font-style:italic; margin-top:2px;">"${workQuote.text}"</div>
              <div style="font-size:11.5px; color:#cbd5e1; margin-top:2px;">— <strong>${workQuote.author}</strong></div>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="startPomodoroTimer()" style="color:#00f2fe; font-size:11.5px;">
            <i class="fas fa-play"></i> Start Deep Sprint
          </button>
        </div>
      </div>

      <!-- Real-Time Recommendation -->
      ${UI.recommendationBanner(recIcon, recTitle, recText, 'Start 25-Min Sprint', 'startPomodoroTimer()')}

      <!-- Hero Score Banner -->
      <div class="card card-glass" style="margin-bottom:var(--space-xl);display:flex;align-items:center;justify-content:space-between;padding:24px;flex-wrap:wrap;gap:16px;">
        <div style="display:flex;align-items:center;gap:20px;">
          <div style="font-size:42px;background:rgba(236,72,153,0.15);width:70px;height:70px;border-radius:50%;display:flex;align-items:center;justify-content:center;">⚡</div>
          <div>
            <h2 style="margin:0;font-size:24px;">Work Execution Score: <span style="color:var(--rose);">${scores.work || computedWorkScore}/100</span></h2>
            <p style="margin:4px 0 0 0;color:var(--text-secondary);font-size:var(--text-sm);">
              ${completedCount} completed of ${tasks.length} total tasks • ${pendingCount} pending action items
            </p>
          </div>
        </div>
        <div style="display:flex;gap:10px;">
          <button class="btn btn-outline" onclick="openTaskModal()"><i class="fas fa-clock"></i> Schedule Task</button>
          <button class="btn btn-primary" onclick="togglePomodoro()"><i class="fas fa-stopwatch"></i> Focus Sprint</button>
        </div>
      </div>

      <!-- Main 2-Column Grid: Pomodoro Focus & Daily Streaks -->
      <div class="grid grid-2" style="gap:24px;margin-bottom:24px;">
        
        <!-- 1. Pomodoro Focus Lab -->
        <div class="card card-glass" style="text-align:center;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <h3 style="margin:0;display:flex;align-items:center;gap:8px;"><i class="fas fa-stopwatch" style="color:var(--cyan);"></i> Pomodoro Focus Lab</h3>
            <div style="display:flex;gap:4px;">
              <button class="btn btn-ghost btn-sm" style="padding:2px 8px;font-size:11px;" onclick="setPomodoroPreset(25)">25m Sprint</button>
              <button class="btn btn-ghost btn-sm" style="padding:2px 8px;font-size:11px;" onclick="setPomodoroPreset(50)">50m Deep</button>
              <button class="btn btn-ghost btn-sm" style="padding:2px 8px;font-size:11px;" onclick="setPomodoroPreset(5)">5m Rest</button>
            </div>
          </div>

          <div class="pomodoro-display" id="pomo-timer" style="font-size:48px;font-weight:900;letter-spacing:2px;color:#00f2fe;margin:12px 0;">25:00</div>
          
          <div style="display:flex;justify-content:center;gap:12px;margin-bottom:14px;">
            <button class="btn btn-primary" id="pomo-start-btn" onclick="togglePomodoro()"><i class="fas fa-play"></i> Start Focus</button>
            <button class="btn btn-secondary" onclick="resetPomodoro()"><i class="fas fa-redo"></i> Reset</button>
          </div>

          <div style="font-size:11.5px;color:var(--text-muted);border-top:1px solid var(--glass-border);padding-top:10px;">
            ⚡ 25 minutes of unbroken single-tasking accelerates cognitive output by 300%.
          </div>
        </div>

        <!-- 2. Real-Time Scheduled To-Do List with Times -->
        <div class="card card-glass" id="work-todo-section">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <h3 style="margin:0;display:flex;align-items:center;gap:8px;"><i class="fas fa-clock" style="color:var(--emerald);"></i> Scheduled Tasks with Due Times</h3>
            <button class="btn btn-primary btn-sm" onclick="openTaskModal()"><i class="fas fa-plus"></i> Add Task</button>
          </div>

          <div style="display:flex;flex-direction:column;gap:8px;max-height:240px;overflow-y:auto;padding-right:4px;">
            ${tasks.map(t => `
              <div id="todo-task-${t.id}" style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:rgba(15,23,42,0.85);border-radius:10px;border:1px solid var(--glass-border);">
                <div style="display:flex;align-items:center;gap:10px;">
                  <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggleTaskDone('${t.id}')" style="width:16px;height:16px;cursor:pointer;">
                  <div>
                    <div style="font-size:12.5px;font-weight:700;color:#fff;${t.completed ? 'text-decoration:line-through;color:#64748b;' : ''}">
                      ${t.title}
                    </div>
                    <div style="font-size:10.5px;color:var(--text-muted);display:flex;gap:8px;margin-top:2px;">
                      <span style="color:var(--cyan);"><i class="fas fa-clock"></i> ${t.dueTime || '12:00 PM'}</span>
                      <span style="color:${t.priority === 'high' ? 'var(--rose)' : 'var(--emerald)'};">• ${t.priority ? t.priority.toUpperCase() : 'MEDIUM'}</span>
                    </div>
                  </div>
                </div>
                <div style="display:flex;align-items:center;gap:6px;">
                  <button class="btn btn-ghost btn-sm" style="font-size:10px;padding:3px 6px;" onclick="sendTaskPendingEmail('${t.id}')" title="Send reminder to email">
                    <i class="fas fa-envelope"></i>
                  </button>
                  <button class="btn-delete-epic btn-delete-sm" onclick="deleteTaskItem('${t.id}', this.closest('#todo-task-${t.id}'))" data-tooltip="Delete Task">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            `).join('') || '<div style="color:var(--text-muted);font-size:12px;">No scheduled tasks yet.</div>'}
          </div>
        </div>

      </div>

      <!-- 3. Eisenhower Priority Matrix -->
      <h3 style="margin:0 0 16px 0;display:flex;align-items:center;gap:8px;"><i class="fas fa-th-large" style="color:var(--indigo-light);"></i> Eisenhower Priority Matrix</h3>
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
    <div id="task-row-${t.id}" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--bg-tertiary);border-radius:var(--radius-sm);margin-bottom:8px;border:1px solid var(--glass-border);transition:all 0.2s ease;">
      <div style="display:flex;align-items:center;gap:8px;">
        <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggleTaskDone('${t.id}')">
        <span style="font-size:var(--text-xs);${t.completed ? 'text-decoration:line-through;color:var(--text-muted);' : ''}">
          ${t.title} <small style="color:var(--cyan);">(${t.dueTime || '12:00 PM'})</small>
        </span>
      </div>
      <button class="btn-delete-epic btn-delete-sm" onclick="deleteTaskItem('${t.id}', this.closest('#task-row-${t.id}'))" data-tooltip="Delete Task">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join('');
}

// ─── Work Interactive Handlers with Email Dispatch ──────────
function toggleTaskDone(id) {
  Store.toggleTask(id);
  // Recalculate score dynamically
  const tasks = Store.get('tasks') || [];
  const completed = tasks.filter(t => t.completed).length;
  const score = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 75;
  Store.set('scores.work', score);

  UI.toast('success', 'Task Updated', 'Live Work Score and 5-Pillar matrix synchronized.');
  Router.render();
}
window.toggleTaskDone = toggleTaskDone;

function deleteTaskItem(id, element) {
  const el = element || document.getElementById(`task-row-${id}`) || document.getElementById(`todo-task-${id}`);
  DeleteEngine.tossAndDelete(el, () => {
    Store.deleteTask(id);
    UI.toast('info', 'Task Removed', 'Task removed from your daily schedule.');
    Router.render();
  });
}
window.deleteTaskItem = deleteTaskItem;

function openTaskModal() {
  const html = `
    <h3>Create Scheduled Task</h3>
    <p style="font-size:12px;color:var(--text-muted);margin-bottom:14px;">Adding a task automatically sends a scheduled confirmation to your registered email.</p>
    <form onsubmit="saveTaskForm(event)" style="display:flex;flex-direction:column;gap:14px;">
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Task Description</label>
        <input type="text" id="task-title" class="chat-input" placeholder="e.g. Finalize System Design Architecture" required>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Scheduled Due Time</label>
          <input type="time" id="task-due-time" class="chat-input" value="14:00" required>
        </div>
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Priority Level</label>
          <select id="task-priority" class="chat-input">
            <option value="high">🔥 High Priority</option>
            <option value="medium" selected>⚡ Medium Priority</option>
            <option value="low">🌱 Low Priority</option>
          </select>
        </div>
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
      ${UI.pillButton({ text: 'Schedule Task', icon: '<i class="fas fa-calendar-check"></i>', theme: 'emerald', type: 'submit' })}
    </form>
  `;
  UI.modal(html);
}
window.openTaskModal = openTaskModal;

function saveTaskForm(e) {
  e.preventDefault();
  const title = document.getElementById('task-title')?.value;
  const dueTimeRaw = document.getElementById('task-due-time')?.value || '14:00';
  const priority = document.getElementById('task-priority')?.value || 'medium';
  const quadrant = document.getElementById('task-quad')?.value || 'q2';

  // Format time (e.g. 14:00 -> 02:00 PM)
  let formattedTime = dueTimeRaw;
  try {
    const [h, m] = dueTimeRaw.split(':');
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour % 12 || 12;
    formattedTime = `${h12}:${m} ${ampm}`;
  } catch (err) {}

  const newTask = {
    id: 't-' + Date.now(),
    title,
    dueTime: formattedTime,
    priority,
    quadrant,
    completed: false
  };

  const tasks = Store.get('tasks') || [];
  tasks.push(newTask);
  Store.set('tasks', tasks);
  UI.closeModal();

  // Send email alert to user's registered email
  const userEmail = Store.get('profile.email') || 'saladisiddharth@gmail.com';
  const htmlBody = `
    <div style="background:#070a14;border:1px solid #ec4899;border-radius:18px;padding:24px;color:#fff;font-family:sans-serif;max-width:540px;margin:0 auto;">
      <h2 style="color:#ec4899;margin:0 0 8px 0;">⚡ BioVerse Scheduled Task Alert</h2>
      <p style="color:#cbd5e1;font-size:14px;">A new task has been scheduled in your BioVerse productivity dashboard:</p>
      <div style="background:#0f172a;padding:16px;border-radius:12px;margin:16px 0;border:1px solid rgba(236,72,153,0.3);">
        <div style="font-size:18px;font-weight:700;color:#fff;">${title}</div>
        <div style="font-size:13px;color:#00f2fe;margin-top:4px;">⏰ Due Time: ${formattedTime}</div>
        <div style="font-size:12px;color:#fbbf24;margin-top:4px;">Priority: ${priority.toUpperCase()} (${quadrant.toUpperCase()})</div>
      </div>
      <p style="font-size:12px;color:#94a3b8;">Ensure timely completion to keep your daily execution velocity at 100%!</p>
    </div>
  `;
  Store.sendEmailNotification(`⏰ New Task Scheduled: ${title} (${formattedTime})`, htmlBody, userEmail);

  UI.toast('success', 'Task Scheduled & Alert Sent ⚡', `Scheduled "${title}" at ${formattedTime}.`);
  Router.render();
}
window.saveTaskForm = saveTaskForm;

function sendTaskPendingEmail(taskId) {
  const tasks = Store.get('tasks') || [];
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  const userEmail = Store.get('profile.email') || 'saladisiddharth@gmail.com';
  const htmlBody = `
    <div style="background:#070a14;border:1px solid #f59e0b;border-radius:18px;padding:24px;color:#fff;font-family:sans-serif;max-width:540px;margin:0 auto;">
      <h2 style="color:#fbbf24;margin:0 0 8px 0;">⚠️ Pending Task Reminder</h2>
      <p style="color:#cbd5e1;font-size:14px;">This is a reminder that your scheduled task in BioVerse is still pending:</p>
      <div style="background:#0f172a;padding:16px;border-radius:12px;margin:16px 0;border:1px solid rgba(251,191,36,0.3);">
        <div style="font-size:18px;font-weight:700;color:#fff;">${task.title}</div>
        <div style="font-size:13px;color:#f59e0b;margin-top:4px;">Scheduled Due Time: ${task.dueTime || 'Today'}</div>
      </div>
      <p style="font-size:12px;color:#94a3b8;">Mark it completed on your dashboard to increase your Work Execution score!</p>
    </div>
  `;
  Store.sendEmailNotification(`⚠️ Task Reminder: "${task.title}" is still pending`, htmlBody, userEmail);
  UI.toast('info', 'Reminder Dispatched', `Sent pending reminder for "${task.title}" to ${userEmail}`);
}
window.sendTaskPendingEmail = sendTaskPendingEmail;

function checkPendingTasksAlert() {
  const tasks = Store.get('tasks') || [];
  const pending = tasks.filter(t => !t.completed);
  if (!pending.length) {
    UI.toast('success', 'All Clear! 🎉', 'You have completed all scheduled tasks today.');
    return;
  }
  UI.toast('warning', `${pending.length} Pending Tasks`, `You have ${pending.length} tasks pending. Check your time schedule.`);
}
window.checkPendingTasksAlert = checkPendingTasksAlert;

// ─── Pomodoro Focus Engine ─────────────────────────────────
let pomoInterval = null;
let pomoSeconds = 25 * 60;
let pomoRunning = false;

function setPomodoroPreset(mins) {
  clearInterval(pomoInterval);
  pomoRunning = false;
  pomoSeconds = mins * 60;
  updatePomoDisplay();
  const btn = document.getElementById('pomo-start-btn');
  if (btn) btn.innerHTML = '<i class="fas fa-play"></i> Start Focus';
}
window.setPomodoroPreset = setPomodoroPreset;

function togglePomodoro() {
  const btn = document.getElementById('pomo-start-btn');
  if (pomoRunning) {
    clearInterval(pomoInterval);
    pomoRunning = false;
    if (btn) btn.innerHTML = '<i class="fas fa-play"></i> Resume Focus';
  } else {
    pomoRunning = true;
    if (btn) btn.innerHTML = '<i class="fas fa-pause"></i> Pause Focus';
    pomoInterval = setInterval(() => {
      pomoSeconds--;
      updatePomoDisplay();
      if (pomoSeconds <= 0) {
        clearInterval(pomoInterval);
        pomoRunning = false;
        if (typeof UI !== 'undefined') UI.toast('success', 'Focus Session Completed! 🏆', 'Great work! Take a 5-minute restorative rest.');
      }
    }, 1000);
  }
}
window.togglePomodoro = togglePomodoro;

function resetPomodoro() {
  clearInterval(pomoInterval);
  pomoRunning = false;
  pomoSeconds = 25 * 60;
  updatePomoDisplay();
  const btn = document.getElementById('pomo-start-btn');
  if (btn) btn.innerHTML = '<i class="fas fa-play"></i> Start Focus';
}
window.resetPomodoro = resetPomodoro;

function updatePomoDisplay() {
  const mins = Math.floor(pomoSeconds / 60);
  const secs = pomoSeconds % 60;
  const display = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  const el = document.getElementById('pomo-timer');
  if (el) el.textContent = display;
}
