/* ═══════════════════════════════════════════════════════════════════
   NOTIFICATIONS PAGE — Interactive Activity Stream & Real-Time Deep Links
   ═══════════════════════════════════════════════════════════════════ */

let currentNotifFilter = 'all';

function NotificationsPage() {
  const state = Store.getState();
  let notifications = state.notifications || [];
  const unreadCount = notifications.filter(n => n.unread).length;

  if (currentNotifFilter !== 'all') {
    notifications = notifications.filter(n => (n.type || '').toLowerCase() === currentNotifFilter);
  }

  const categories = [
    { id: 'all', label: 'All Notifications', icon: '⚡' },
    { id: 'career', label: 'Career & ATS', icon: '🚀' },
    { id: 'health', label: 'Health & Diet', icon: '💪' },
    { id: 'finance', label: 'Finance & AA', icon: '💰' },
    { id: 'work', label: 'Work & Tasks', icon: '🎯' },
    { id: 'life', label: 'Life Goals', icon: '🌟' }
  ];

  const content = `
    ${UI.sectionHeader('🔔 Notification & Activity Stream', `${unreadCount} unread system & habit notifications`, `
      <div style="display:flex;gap:8px;">
        <button class="btn btn-secondary btn-sm" onclick="markAllNotifsRead()"><i class="fas fa-check-double"></i> Mark All as Read</button>
        <button class="btn btn-primary btn-sm" onclick="sendTestNotification()"><i class="fas fa-bell"></i> Trigger Alert</button>
      </div>
    `)}

    <!-- Category Filter Tabs -->
    <div class="tabs" style="margin-bottom:20px; overflow-x:auto;">
      ${categories.map(c => `
        <button class="tab-item ${currentNotifFilter === c.id ? 'active' : ''}" onclick="setNotifCategory('${c.id}')" style="display:flex; align-items:center; gap:6px;">
          <span>${c.icon}</span>
          <span>${c.label}</span>
        </button>
      `).join('')}
    </div>

    <div class="card-glass">
      ${notifications.length === 0 ? `
        <div style="text-align:center; padding:40px; color:#94a3b8;">
          <div style="font-size:36px; margin-bottom:10px;">✨</div>
          <h4 style="margin:0 0 4px 0; color:#fff;">All Clear!</h4>
          <p style="font-size:12px; margin:0;">No notifications found under the <strong>${currentNotifFilter.toUpperCase()}</strong> filter.</p>
        </div>
      ` : `
        <div style="display:flex; flex-direction:column; gap:10px;">
          ${notifications.map((n, i) => {
            const routeMap = {
              career: '/dashboard/career',
              health: '/dashboard/health',
              finance: '/dashboard/finance',
              work: '/dashboard/work',
              life: '/dashboard/life'
            };
            const targetRoute = routeMap[n.type] || '/dashboard';
            return `
              <div class="card card-hover" id="notif-item-${i}" style="display:flex; justify-content:space-between; align-items:center; padding:14px 18px; border:1px solid ${n.unread ? 'rgba(0,242,254,0.3)' : 'rgba(255,255,255,0.06)'}; background:${n.unread ? 'rgba(0,242,254,0.04)' : '#070a14'}; border-radius:12px; transition:all 0.2s ease;">
                <div style="display:flex; align-items:center; gap:14px; flex:1; cursor:pointer;" onclick="handleNotifClick(${i}, '${targetRoute}')">
                  <div style="font-size:24px; width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.05); flex-shrink:0;">
                    ${n.icon || '🔔'}
                  </div>
                  <div>
                    <div style="display:flex; align-items:center; gap:8px;">
                      <span style="font-weight:700; font-size:13.5px; color:#fff;">${n.title}</span>
                      ${n.unread ? '<span class="badge badge-primary" style="font-size:9.5px;">NEW</span>' : ''}
                    </div>
                    <div style="font-size:12px; color:#94a3b8; margin-top:2px; line-height:1.4;">${n.text}</div>
                  </div>
                </div>

                <div style="display:flex; align-items:center; gap:12px;">
                  <span style="font-size:11px; color:#64748b; font-family:var(--font-mono); white-space:nowrap;">${n.time}</span>
                  <button class="btn btn-ghost btn-sm btn-icon" onclick="dismissNotif(${i})" title="Dismiss Notification">
                    <i class="fas fa-times" style="font-size:12px; color:#94a3b8;"></i>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;

  return UI.dashboardLayout('/dashboard/notifications', content);
}

function setNotifCategory(cat) {
  currentNotifFilter = cat;
  Router.render();
}

function markAllNotifsRead() {
  const state = Store.getState();
  if (state.notifications) {
    state.notifications.forEach(n => n.unread = false);
    Store._save();
    Store._notify();
  }
  UI.toast('success', 'Marked as Read', 'All notifications marked as read.');
  Router.render();
}

function handleNotifClick(index, route) {
  const state = Store.getState();
  if (state.notifications && state.notifications[index]) {
    state.notifications[index].unread = false;
    Store._save();
    Store._notify();
  }
  Router.navigate(route);
}

function dismissNotif(index) {
  const state = Store.getState();
  if (state.notifications) {
    state.notifications.splice(index, 1);
    Store._save();
    Store._notify();
  }
  UI.toast('info', 'Notification Dismissed', 'Removed notification from stream.');
  Router.render();
}

function sendTestNotification() {
  const state = Store.getState();
  if (!state.notifications) state.notifications = [];
  state.notifications.unshift({
    icon: '⚡',
    title: 'Precision Macro Goal Achieved',
    text: 'Your Sattvic lunch photo was logged via Vision AI (+20 XP). Hydration on track!',
    time: 'Just now',
    type: 'health',
    unread: true
  });
  Store._save();
  Store._notify();
  UI.toast('info', 'New Alert', 'Simulated real-time macro telemetry notification.');
  Router.render();
}

window.setNotifCategory = setNotifCategory;
window.markAllNotifsRead = markAllNotifsRead;
window.handleNotifClick = handleNotifClick;
window.dismissNotif = dismissNotif;
window.sendTestNotification = sendTestNotification;
