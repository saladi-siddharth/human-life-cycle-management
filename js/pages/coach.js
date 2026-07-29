/* ═══════════════════════════════════════════════════════════════════
   AI COACH CHAT PAGE — Powered by AIService (Gemini & Fallback Engine)
   ═══════════════════════════════════════════════════════════════════ */

function CoachPage() {
  const profile = Store.get('profile') || {};
  const hasKey = !!Store.get('apiSettings.geminiKey');

  const content = `
    <div class="coach-page">
      <div class="coach-header">
        <div class="coach-avatar">🤖</div>
        <div>
          <div style="font-weight:700;display:flex;align-items:center;gap:8px;">
            LifeGPS AI Master Coach
            <span class="badge ${hasKey ? 'badge-success' : 'badge-primary'}">${hasKey ? 'Gemini 1.5 Live' : 'AI Assistant Active'}</span>
          </div>
          <div class="coach-status"><span class="coach-status-dot"></span> Always Online • Context Aware</div>
        </div>
        <div style="margin-left:auto;display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" onclick="clearChat()"><i class="fas fa-trash"></i> Clear</button>
        </div>
      </div>

      <div class="chat-messages" id="chat-messages">
        <div class="chat-bubble ai">
          Welcome back, <strong>${profile.name || 'Friend'}</strong>! 👋 I'm your AI Life GPS Coach.
          <br><br>
          I have real-time access to your 5 domain scores (Career, Health, Finance, Work, Life). Ask me anything:
          <br><br>
          • 🎯 <strong>Career</strong> — Resume ATS keyword optimization & salary negotiations<br>
          • 💪 <strong>Health</strong> — Custom 4-week workout splits & sleep debt recovery<br>
          • 💰 <strong>Finance</strong> — 50/30/20 budget optimization & savings acceleration<br>
          • ⚡ <strong>Work</strong> — Eisenhower matrix priorities & anti-burnout planning<br>
          <br>
          What milestone are we targeting today?
        </div>
      </div>

      <div class="chat-suggestions" id="chat-suggestions">
        ${[
          'Analyze my resume ATS score & skill gaps',
          'How can I optimize my financial savings rate?',
          'Create a 4-week workout & sleep protocol',
          'Help me prioritize my top work tasks today'
        ].map(s => `<button class="chat-suggestion" onclick="sendSuggestion('${s.replace(/'/g, "\\'")}')">${s}</button>`).join('')}
      </div>

      <div class="chat-input-area">
        <input type="text" class="chat-input" id="coach-input" placeholder="Ask your AI Life Coach anything..." onkeydown="if(event.key==='Enter')sendMessage()">
        <button class="chat-send-btn" onclick="sendMessage()"><i class="fas fa-paper-plane"></i></button>
      </div>
    </div>
  `;

  return UI.dashboardLayout('/dashboard/coach', content);
}

async function sendMessage() {
  const input = document.getElementById('coach-input');
  const message = input.value.trim();
  if (!message) return;
  input.value = '';

  const chatMessages = document.getElementById('chat-messages');

  // Add user bubble
  chatMessages.innerHTML += `<div class="chat-bubble user">${escapeHtml(message)}</div>`;

  // Hide suggestions
  const suggestions = document.getElementById('chat-suggestions');
  if (suggestions) suggestions.style.display = 'none';

  // Typing indicator
  chatMessages.innerHTML += `
    <div class="chat-bubble ai" id="typing-indicator">
      <div class="typing-indicator"><span></span><span></span><span></span></div>
    </div>
  `;
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Call AIService
  try {
    const aiText = await AIService.generateResponse(message);
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();

    const formatted = aiText
      .replace(/### (.*?)\n/g, '<h4 style="margin:8px 0;color:var(--cyan);">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code style="background:rgba(99,102,241,0.2);padding:2px 6px;border-radius:4px;color:var(--indigo-light); font-family:monospace;">$1</code>')
      .replace(/\n/g, '<br>');

    const bubbleId = 'b_' + Date.now();
    chatMessages.innerHTML += `
      <div class="chat-bubble ai" id="${bubbleId}">
        ${formatted}
        <div style="margin-top:12px;padding-top:8px;border-top:1px solid var(--glass-border);">
          <button class="btn btn-primary btn-sm" style="font-size:11px;" onclick="convertAIToTask('${escapeHtml(message)}')">
            <i class="fas fa-plus"></i> Add Recommendation to Action Matrix
          </button>
        </div>
      </div>
    `;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } catch (err) {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
    chatMessages.innerHTML += `<div class="chat-bubble ai">Sorry, I encountered an issue processing your request. Please try again!</div>`;
  }
}

function sendSuggestion(text) {
  document.getElementById('coach-input').value = text;
  sendMessage();
}

function convertAIToTask(msgText) {
  Store.addTask({ title: `AI Goal: Execute ${msgText}`, domain: 'work', quadrant: 'q2' });
  UI.toast('success', 'Goal Added!', 'Converted AI recommendation into an action item in your Eisenhower Matrix.');
}

function clearChat() {
  const chatMessages = document.getElementById('chat-messages');
  chatMessages.innerHTML = `<div class="chat-bubble ai">Chat history cleared. What else can I help you achieve? 😊</div>`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
