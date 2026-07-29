/* ═══════════════════════════════════════════════════════════════════
   NOTIFICATIONS PAGE
   ═══════════════════════════════════════════════════════════════════ */

function NotificationsPage() {
  const notifications = Store.getState().notifications;
  const content = `
    ${UI.sectionHeader('🔔 Notifications', `${notifications.filter(n=>n.unread).length} unread notifications`, '<button class="btn btn-ghost btn-sm" onclick="markAllRead()"><i class="fas fa-check-double"></i> Mark All Read</button>')}

    <div class="tabs" style="margin-bottom:20px;">
      <button class="tab-item active">All</button>
      <button class="tab-item">Career</button>
      <button class="tab-item">Health</button>
      <button class="tab-item">Finance</button>
      <button class="tab-item">Work</button>
      <button class="tab-item">Life</button>
    </div>

    <div class="card-glass">
      ${notifications.length === 0 ? UI.emptyState('🔔', 'No Notifications', 'You\'re all caught up! New alerts will appear here.') : ''}
      ${notifications.map((n, i) => `
        <div class="notification-item ${n.unread ? 'unread' : ''}" id="notif-${i}">
          <div class="notification-icon-wrap" style="background:${
            n.type === 'career' ? 'rgba(99,102,241,0.12)' :
            n.type === 'health' ? 'rgba(16,185,129,0.12)' :
            n.type === 'finance' ? 'rgba(245,158,11,0.12)' :
            n.type === 'work' ? 'rgba(6,182,212,0.12)' :
            'rgba(236,72,153,0.12)'
          };">
            ${n.icon}
          </div>
          <div class="notification-body">
            <div class="notification-title">${n.title}</div>
            <div class="notification-text">${n.text}</div>
          </div>
          <div class="notification-time">${n.time}</div>
        </div>
      `).join('')}
    </div>
  `;
  return UI.dashboardLayout('/dashboard/notifications', content);
}

function markAllRead() {
  const state = Store.getState();
  state.notifications.forEach(n => n.unread = false);
  UI.toast('success', 'Done', 'All notifications marked as read.');
  Router.navigate('/dashboard/notifications');
}
