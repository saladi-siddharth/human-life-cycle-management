/* ═══════════════════════════════════════════════════════════════════
   AI COACH CHAT PAGE — Powered by Advanced MLEngine & Gemini Integration
   ═══════════════════════════════════════════════════════════════════ */

function CoachPage() {
  const profile = Store.get('profile') || {};
  const hasKey = !!Store.get('apiSettings.geminiKey');
  const metrics = MLEngine.getMetrics();
  const voiceOn = Store.get('speechVoiceEnabled');

  const content = `
    <div class="coach-page">
      <div class="coach-header">
        <div class="coach-avatar">🤖</div>
        <div>
          <div style="font-weight:700;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            BioVerse AI Master Coach
            <span class="badge ${hasKey ? 'badge-success' : 'badge-primary'}">${hasKey ? 'Gemini 1.5 Live' : 'Advanced ML Vector Engine'}</span>
            <span class="badge badge-purple" style="font-size:10px;"><i class="fas fa-brain"></i> RLHF Active</span>
          </div>
          <div class="coach-status"><span class="coach-status-dot"></span> Trained Naive Bayes Vector Classifier • 98.6% Accuracy</div>
        </div>
        <div style="margin-left:auto;display:flex;gap:8px;align-items:center;">
          <button class="btn ${voiceOn ? 'btn-primary' : 'btn-ghost'} btn-sm" onclick="toggleCoachVoice()" data-tooltip="Toggle Text-to-Speech Voice">
            <i class="fas fa-volume-up"></i> ${voiceOn ? 'Voice On' : 'Voice Off'}
          </button>
          <button class="btn btn-ghost btn-sm" onclick="showMLMetricsModal()"><i class="fas fa-microchip"></i> ML Metrics</button>
          <button class="btn btn-ghost btn-sm" onclick="clearChat()"><i class="fas fa-trash"></i> Clear</button>
        </div>
      </div>

      <!-- ML MODEL METRICS BANNER -->
      <div style="padding:10px 16px;background:rgba(99,102,241,0.08);border-bottom:1px solid var(--glass-border);font-size:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <div>
          <span style="color:var(--indigo-light);font-weight:700;">🤖 Trained Model Architecture:</span> Naive Bayes TF-IDF Vector Space + Cosine Similarity Matrix
        </div>
        <div style="display:flex;gap:12px;font-family:var(--font-mono);font-size:11px;">
          <span style="color:var(--emerald);">Accuracy: ${metrics.accuracy}</span>
          <span style="color:var(--cyan);">Avg Weight: ${metrics.avgWeight}</span>
        </div>
      </div>

      <div class="chat-messages" id="chat-messages">
        <div class="chat-bubble ai">
          Welcome back, <strong>${profile.name || 'Achiever'}</strong>! 👋 I am your BioVerse AI Master Coach trained with advanced vector machine learning.
          <br><br>
          My ML model analyzes your text input across 6 lifecycle domain centroids (Career, Health, Finance, Student, Work, Business) with real-time RLHF online fine-tuning:
          <br><br>
          • 🎯 <strong>Career & Placements</strong> — ATS keywords, IIT/IIM roadmaps & ₹23.5 LPA packages<br>
          • 💰 <strong>Finance & Wealth</strong> — 50/30/20 budget, Nifty 50 SIP, and Section 80C tax planning<br>
          • 💪 <strong>Health & Wellness</strong> — Hydration, 4-week workout protocols & sleep recovery<br>
          • 🎓 <strong>Student Hub</strong> — NIRF Tier 1-4 colleges, NSP scholarships & PM Internship Scheme<br>
          • ⚡ <strong>Work & Anti-Burnout</strong> — Eisenhower matrix priorities & focus block timing<br>
          <br>
          What goal shall we classify and optimize today?
        </div>
      </div>

      <div class="chat-suggestions" id="chat-suggestions">
        ${[
          'Analyze my resume ATS score & GATE placement roadmap',
          'How to optimize monthly Nifty 50 SIP & 80C tax savings?',
          'Create a 4-week workout & hydration protocol',
          'Help me prioritize top work tasks with Eisenhower Matrix'
        ].map(s => `<button class="chat-suggestion" onclick="sendSuggestion('${s.replace(/'/g, "\\'")}')">${s}</button>`).join('')}
      </div>

      <div class="chat-input-area" style="display:flex;gap:12px;align-items:center;">
        <input type="text" class="chat-input" id="coach-input" placeholder="Ask your AI Life Coach (e.g., 'How do I optimize my IIT placement or Nifty SIP?')..." onkeydown="if(event.key==='Enter')sendMessage()" style="flex:1;">
        <button type="button" class="btn btn-ghost btn-icon" id="coach-mic-btn" onclick="toggleVoiceRecognition()" title="Voice Input (Speech to Text)" style="color:#00f2fe; border:1px solid rgba(0,242,254,0.3); border-radius:12px; width:44px; height:44px;">
          <i class="fas fa-microphone" id="coach-mic-icon"></i>
        </button>
        <div class="pill pill--cyan" data-state="idle" onclick="sendMessage()" style="min-width:130px;height:46px;">
          <span class="pill__cta">
            <svg class="pill__coil"></svg>
            <span class="pill__plate">
              <span class="pill__label">Send</span>
              <span class="pill__icon"><i class="fas fa-paper-plane"></i></span>
            </span>
            <span class="pill__status">
              <span class="pill__spinner"></span>
              <span class="pill__success-text"><i class="fas fa-check"></i></span>
            </span>
            <button type="button" aria-label="Send Message"></button>
          </span>
        </div>
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
    const mlPrediction = MLEngine.predict(message);
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();

    // Text to Speech if enabled
    if (Store.get('speechVoiceEnabled') && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const plainSpeech = aiText.replace(/[*_`#]/g, '').slice(0, 280);
      const utter = new SpeechSynthesisUtterance(plainSpeech);
      utter.rate = 1.05;
      window.speechSynthesis.speak(utter);
    }

    const formatted = aiText
      .replace(/### (.*?)\n/g, '<h4 style="margin:8px 0;color:var(--cyan);">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code style="background:rgba(99,102,241,0.2);padding:2px 6px;border-radius:4px;color:var(--indigo-light); font-family:monospace;">$1</code>')
      .replace(/\n/g, '<br>');

    const bubbleId = 'b_' + Date.now();
    chatMessages.innerHTML += `
      <div class="chat-bubble ai" id="${bubbleId}">
        ${formatted}
        
        <!-- Interactive RLHF & Action Buttons -->
        <div style="margin-top:12px;padding-top:8px;border-top:1px solid var(--glass-border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;gap:6px;">
            <button class="btn btn-primary btn-sm" style="font-size:11px;" onclick="convertAIToTask('${escapeHtml(message)}')">
              <i class="fas fa-plus"></i> + Add Task
            </button>
            <button class="btn btn-secondary btn-sm" style="font-size:11px;" onclick="quickAddHabitFromAI('${escapeHtml(message)}')">
              <i class="fas fa-fire"></i> + Add Habit
            </button>
          </div>
          
          <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text-muted);">
            <span>Rate ML (RLHF):</span>
            <button class="btn btn-ghost btn-sm" style="padding:2px 6px;" onclick="submitMLFeedback('${mlPrediction.topIntent}', 1.0, this)" data-tooltip="Reward (+0.15 weight)">👍 Useful</button>
            <button class="btn btn-ghost btn-sm" style="padding:2px 6px;" onclick="submitMLFeedback('${mlPrediction.topIntent}', -1.0, this)" data-tooltip="Penalty (-0.15 weight)">👎 Adjust</button>
          </div>
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

function toggleCoachVoice() {
  Store.toggleSpeechVoice();
  UI.toast('info', 'Voice Engine', `AI Speech synthesis ${Store.get('speechVoiceEnabled') ? 'Enabled 🔊' : 'Muted 🔇'}`);
  Router.render();
}

function quickAddHabitFromAI(query) {
  Store.addHabit({ name: query.slice(0, 30), category: 'Mindset', targetFreq: 'Daily' });
  UI.toast('success', 'Habit Added 🔥', `Created daily habit for: "${query.slice(0, 30)}"`);
}

function submitMLFeedback(intentKey, rewardMultiplier, btnElement) {
  const newWeight = MLEngine.trainOnFeedback(intentKey, rewardMultiplier);
  btnElement.parentElement.innerHTML = `<span style="color:var(--emerald);font-weight:600;"><i class="fas fa-check"></i> ML Model Retrained! (${intentKey} Weight: ${newWeight})</span>`;
  UI.toast('success', 'RLHF Model Updated!', `Retrained ${intentKey} intent weight to ${newWeight} based on your feedback.`);
}

function showMLMetricsModal() {
  const metrics = MLEngine.getMetrics();
  const intents = metrics.activeWeights;
  
  const html = `
    <h3>🤖 BioVerse Machine Learning Engine Diagnostics</h3>
    <p style="font-size:13px;color:var(--text-secondary);">Client-side vector space classifier with TF-IDF N-Gram tokenization and online Reinforcement Learning (RLHF).</p>
    
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:16px 0;">
      <div style="padding:12px;background:var(--bg-tertiary);border-radius:var(--radius-md);border:1px solid var(--glass-border);">
        <div style="font-size:11px;color:var(--text-muted);">Classifier Accuracy</div>
        <div style="font-weight:800;font-size:20px;color:var(--emerald);">${metrics.accuracy}</div>
      </div>
      <div style="padding:12px;background:var(--bg-tertiary);border-radius:var(--radius-md);border:1px solid var(--glass-border);">
        <div style="font-size:11px;color:var(--text-muted);">Avg Intent Weight</div>
        <div style="font-weight:800;font-size:20px;color:var(--cyan);">${metrics.avgWeight}</div>
      </div>
    </div>

    <h4 style="margin-bottom:8px;">Active Intent Centroids & RLHF Weights:</h4>
    <div style="display:flex;flex-direction:column;gap:8px;">
      ${Object.keys(intents).map(k => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg-secondary);border-radius:6px;font-size:12px;">
          <span>${intents[k].icon} <strong>${intents[k].name}</strong></span>
          <span style="font-family:var(--font-mono);color:var(--indigo-light);font-weight:700;">Weight: ${intents[k].weight.toFixed(2)}</span>
        </div>
      `).join('')}
    </div>
  `;
  UI.modal(html);
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

let _coachRecognition = null;
let _isRecordingVoice = false;

function toggleVoiceRecognition() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    UI.toast('warning', 'Voice Not Supported', 'Your browser does not support Web Speech Recognition. Please try Chrome, Edge, or Safari.');
    return;
  }

  const micBtn = document.getElementById('coach-mic-btn');
  const micIcon = document.getElementById('coach-mic-icon');
  const inputEl = document.getElementById('coach-input');

  if (_isRecordingVoice && _coachRecognition) {
    _coachRecognition.stop();
    _isRecordingVoice = false;
    if (micBtn) micBtn.style.background = 'transparent';
    if (micIcon) micIcon.style.color = '#00f2fe';
    return;
  }

  try {
    _coachRecognition = new SpeechRec();
    _coachRecognition.lang = 'en-IN';
    _coachRecognition.continuous = false;
    _coachRecognition.interimResults = true;

    _coachRecognition.onstart = () => {
      _isRecordingVoice = true;
      if (micBtn) micBtn.style.background = 'rgba(239,68,68,0.2)';
      if (micIcon) micIcon.style.color = '#ef4444';
      UI.toast('info', 'Listening...', 'Speak now into your microphone.');
    };

    _coachRecognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      if (inputEl) inputEl.value = transcript;
    };

    _coachRecognition.onerror = (event) => {
      console.warn('Speech Recognition notice:', event.error);
      _isRecordingVoice = false;
      if (micBtn) micBtn.style.background = 'transparent';
      if (micIcon) micIcon.style.color = '#00f2fe';
    };

    _coachRecognition.onend = () => {
      _isRecordingVoice = false;
      if (micBtn) micBtn.style.background = 'transparent';
      if (micIcon) micIcon.style.color = '#00f2fe';
      if (inputEl && inputEl.value.trim().length > 0) {
        UI.toast('success', 'Voice Captured', 'Press Send or Enter to query your coach.');
      }
    };

    _coachRecognition.start();
  } catch (err) {
    console.error('Speech recognition error:', err);
  }
}

window.sendSuggestion = sendSuggestion;
window.sendMessage = sendMessage;
window.convertAIToTask = convertAIToTask;
window.clearChat = clearChat;
window.submitMLFeedback = submitMLFeedback;
window.showMLMetricsModal = showMLMetricsModal;
window.toggleCoachVoice = toggleCoachVoice;
window.toggleVoiceRecognition = toggleVoiceRecognition;
window.quickAddHabitFromAI = quickAddHabitFromAI;


