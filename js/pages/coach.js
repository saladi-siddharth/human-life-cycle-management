/* ============================================================
   AI COACH CHAT PAGE
   ============================================================ */

const CoachPage = {
  messages: [],

  render(container) {
    Navigation.setPageTitle('AI Coach');
    const type = Store.identityType || 'student';

    // Initialize with greeting if empty
    if (this.messages.length === 0) {
      this.messages.push({
        role: 'ai',
        text: AIResponses.getGreeting(type),
        time: this._formatTime()
      });
    }

    container.querySelector('.page-content').innerHTML = `
      <div class="glass-card" style="padding: 0; overflow: hidden;">
        <div class="chat-container">
          <!-- Chat Header -->
          <div style="padding: var(--space-4) var(--space-5); border-bottom: 1px solid var(--glass-border); display: flex; align-items: center; gap: var(--space-3);">
            <div class="avatar" style="background: var(--gradient-primary);">🤖</div>
            <div>
              <div style="font-weight: 600;">LifeGPS AI Coach</div>
              <div style="font-size: var(--text-xs); color: var(--color-accent); display: flex; align-items: center; gap: 4px;">
                <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent); display: inline-block;"></span>
                Online — Ready to help
              </div>
            </div>
            <div style="margin-left: auto;">
              <span class="badge badge--primary">AI Powered</span>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="chat-quick-actions">
            <div class="chat-quick-action" onclick="CoachPage.quickAction('career')">🎯 Career advice</div>
            <div class="chat-quick-action" onclick="CoachPage.quickAction('health')">💚 Health check</div>
            <div class="chat-quick-action" onclick="CoachPage.quickAction('finance')">💰 Finance review</div>
            <div class="chat-quick-action" onclick="CoachPage.quickAction('plan my week')">📅 Plan my week</div>
            <div class="chat-quick-action" onclick="CoachPage.quickAction('motivate me')">🔥 Motivate me</div>
          </div>

          <!-- Messages -->
          <div class="chat-messages" id="chatMessages">
            ${this.messages.map(msg => this._renderMessage(msg)).join('')}
          </div>

          <!-- Input Area -->
          <div class="chat-input-area">
            <textarea class="chat-input" id="chatInput" placeholder="Ask your AI Coach anything..." rows="1"
              onkeydown="if(event.key==='Enter' && !event.shiftKey){event.preventDefault(); CoachPage.send();}"></textarea>
            <button class="btn btn--primary" onclick="CoachPage.send()" style="height: 44px;">
              Send ↑
            </button>
          </div>
        </div>
      </div>
    `;

    this._scrollToBottom();
  },

  _renderMessage(msg) {
    if (msg.role === 'ai') {
      return `
        <div class="chat-message chat-message--ai">
          <div class="chat-message__avatar chat-message__avatar--ai">🤖</div>
          <div>
            <div class="chat-message__bubble">${this._formatMarkdown(msg.text)}</div>
            <div class="chat-message__time">${msg.time}</div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="chat-message chat-message--user">
          <div class="chat-message__avatar chat-message__avatar--user">${Store.userInitials}</div>
          <div>
            <div class="chat-message__bubble">${msg.text}</div>
            <div class="chat-message__time" style="text-align: right;">${msg.time}</div>
          </div>
        </div>
      `;
    }
  },

  _formatMarkdown(text) {
    // Simple markdown: **bold**, *italic*, \n, numbered lists
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n(\d+\.)/g, '<br>$1')
      .replace(/\n- /g, '<br>• ')
      .replace(/\n/g, '<br>');
  },

  send() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;

    // Add user message
    this.messages.push({
      role: 'user',
      text: text,
      time: this._formatTime()
    });

    input.value = '';
    this._reRenderMessages();

    // Show typing indicator
    setTimeout(() => {
      this._showTyping();
    }, 300);

    // AI response after delay
    setTimeout(() => {
      const type = Store.identityType || 'student';
      const response = AIResponses.getResponse(text, type);
      this.messages.push({
        role: 'ai',
        text: response,
        time: this._formatTime()
      });
      this._reRenderMessages();
    }, 1500 + Math.random() * 1000);
  },

  quickAction(topic) {
    const queries = {
      'career': 'Give me career advice based on my current situation',
      'health': 'How\'s my health looking? Any recommendations?',
      'finance': 'Can you review my financial situation?',
      'plan my week': 'Help me plan my week for maximum productivity',
      'motivate me': 'I need some motivation today!'
    };

    const input = document.getElementById('chatInput');
    if (input) {
      input.value = queries[topic] || topic;
      this.send();
    }
  },

  _showTyping() {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    const typingHtml = `
      <div class="chat-message chat-message--ai" id="typingIndicator">
        <div class="chat-message__avatar chat-message__avatar--ai">🤖</div>
        <div class="chat-message__bubble">
          <div class="typing-indicator">
            <div class="typing-indicator__dot"></div>
            <div class="typing-indicator__dot"></div>
            <div class="typing-indicator__dot"></div>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', typingHtml);
    this._scrollToBottom();
  },

  _reRenderMessages() {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    container.innerHTML = this.messages.map(msg => this._renderMessage(msg)).join('');
    this._scrollToBottom();
  },

  _scrollToBottom() {
    const container = document.getElementById('chatMessages');
    if (container) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 50);
    }
  },

  _formatTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }
};
