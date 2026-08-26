/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE AI MORNING SPOKEN AUDIO PODCAST BRIEFING ENGINE
   Dynamic Daily Voice Summary with Real-Time Audio Waveform
   ═══════════════════════════════════════════════════════════════════ */

const MorningBriefEngine = {
  isPlaying: false,
  speechRate: 1.0,
  currentUtterance: null,

  generateDailyScript() {
    const state = Store.getState();
    const name = state.profile?.name || state.user?.name || 'Explorer';
    const scores = state.scores || { life: 78, career: 75, health: 82, finance: 70, work: 80 };
    const tasks = state.tasks || [];
    const pendingTasks = tasks.filter(t => !t.completed);
    const topTask = pendingTasks.length > 0 ? pendingTasks[0].title : 'Reviewing quarterly goals';
    const quote = typeof EmailService !== 'undefined' ? EmailService.getRandomQuote('career') : { text: 'Consistency multiplies genius into legendary mastery.' };

    const dateStr = new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' });

    return `Good morning ${name}. Today is ${dateStr}. Welcome to your personalized BioVerse daily alignment. Your Master Life Score stands strong at ${scores.life} out of 100. In Career, your skill momentum is tracking at ${scores.career} percent. In Health, your target today is ${state.health?.waterTarget || 2500} milliliters of clean hydration alongside your 2,300 calorie Sattvic nutrition protocol. Your priority task for today is ${topTask}. Remember: ${quote.text}. Step forward with clarity, focus, and unstoppable energy. Have an extraordinary day.`;
  },

  playBriefing() {
    if (!('speechSynthesis' in window)) {
      UI.toast('warning', 'Speech Unsupported', 'Your browser does not support Web Speech Synthesis.');
      return;
    }

    if (this.isPlaying) {
      this.pauseBriefing();
      return;
    }

    window.speechSynthesis.cancel(); // clear previous

    const script = this.generateDailyScript();
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.rate = this.speechRate;
    utterance.pitch = 1.0;

    // Pick best English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.name.includes('Natural') || v.name.includes('Google'));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      this.isPlaying = true;
      this.updatePlayerUI();
      UI.toast('info', '🎙️ Spoken Briefing Live', 'Playing your personalized AI Morning Podcast.');
    };

    utterance.onend = () => {
      this.isPlaying = false;
      this.updatePlayerUI();
    };

    utterance.onerror = (err) => {
      console.warn('Speech synthesis error:', err);
      this.isPlaying = false;
      this.updatePlayerUI();
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  },

  pauseBriefing() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isPlaying = false;
    this.updatePlayerUI();
  },

  setSpeed(rate) {
    this.speechRate = rate;
    if (this.isPlaying) {
      this.playBriefing(); // restart with new speed
    }
  },

  updatePlayerUI() {
    const playBtn = document.getElementById('morning-brief-play-btn');
    const waveBars = document.querySelectorAll('.morning-brief-wave-bar');
    if (playBtn) {
      playBtn.innerHTML = this.isPlaying
        ? `<i class="fas fa-pause"></i> Pause Audio Brief`
        : `<i class="fas fa-play"></i> Play Spoken Briefing (60s)`;
      playBtn.className = this.isPlaying ? 'btn btn-secondary btn-sm' : 'btn btn-primary btn-sm';
    }
    waveBars.forEach(bar => {
      bar.style.animationPlayState = this.isPlaying ? 'running' : 'paused';
      bar.style.opacity = this.isPlaying ? '1' : '0.25';
    });
  },

  toggleTranscript() {
    const trans = document.getElementById('morning-brief-transcript');
    if (trans) {
      trans.classList.toggle('hidden');
    }
  },

  /**
   * Renders the interactive Morning Podcast Player on the Dashboard
   */
  renderDashboardWidget() {
    const script = this.generateDailyScript();

    return `
      <div class="card card-glass" style="margin-bottom:24px; padding:20px; border-radius:16px; border:1px solid rgba(168,85,247,0.3); background:linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(15,23,42,0.95) 100%);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px; margin-bottom:12px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:46px; height:46px; border-radius:14px; background:linear-gradient(135deg, #a855f7, #00f2fe); display:flex; align-items:center; justify-content:center; font-size:22px; box-shadow:0 0 16px rgba(168,85,247,0.4);">
              🎙️
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:8px;">
                <h3 style="margin:0; font-size:16px; font-weight:800; color:#fff;">AI Daily Spoken Audio Podcast</h3>
                <span class="badge badge-primary" style="font-size:10px; background:rgba(168,85,247,0.2); color:#c084fc; border:1px solid rgba(168,85,247,0.4);">60-Sec Brief</span>
              </div>
              <div style="font-size:12px; color:#cbd5e1; margin-top:2px;">
                Personalized morning audio digest: Master Life Score, top tasks & daily motivation.
              </div>
            </div>
          </div>

          <!-- Waveform & Play Button -->
          <div style="display:flex; align-items:center; gap:12px;">
            <!-- CSS Animated Audio Waveform -->
            <div style="display:flex; align-items:center; gap:3px; height:24px; padding:0 8px;">
              <span class="morning-brief-wave-bar" style="width:3px; height:12px; background:#a855f7; border-radius:2px; animation:waveBounce 0.8s ease-in-out infinite alternate; animation-play-state:paused; opacity:0.3;"></span>
              <span class="morning-brief-wave-bar" style="width:3px; height:20px; background:#00f2fe; border-radius:2px; animation:waveBounce 0.6s ease-in-out 0.2s infinite alternate; animation-play-state:paused; opacity:0.3;"></span>
              <span class="morning-brief-wave-bar" style="width:3px; height:16px; background:#38bdf8; border-radius:2px; animation:waveBounce 0.7s ease-in-out 0.4s infinite alternate; animation-play-state:paused; opacity:0.3;"></span>
              <span class="morning-brief-wave-bar" style="width:3px; height:24px; background:#a855f7; border-radius:2px; animation:waveBounce 0.5s ease-in-out 0.1s infinite alternate; animation-play-state:paused; opacity:0.3;"></span>
              <span class="morning-brief-wave-bar" style="width:3px; height:14px; background:#00f2fe; border-radius:2px; animation:waveBounce 0.9s ease-in-out 0.3s infinite alternate; animation-play-state:paused; opacity:0.3;"></span>
            </div>

            <button id="morning-brief-play-btn" class="btn btn-primary btn-sm" onclick="MorningBriefEngine.playBriefing()">
              <i class="fas fa-play"></i> Play Spoken Briefing (60s)
            </button>
            <button class="btn btn-ghost btn-sm btn-icon" title="View Full Text Transcript" onclick="MorningBriefEngine.toggleTranscript()">
              <i class="fas fa-file-alt" style="color:#c084fc;"></i>
            </button>
          </div>
        </div>

        <!-- Hidden Expandable Transcript -->
        <div id="morning-brief-transcript" class="hidden" style="background:#070a14; border:1px solid #1e293b; border-radius:10px; padding:14px; margin-top:10px; font-size:12px; color:#cbd5e1; line-height:1.5;">
          <div style="font-weight:700; color:#c084fc; margin-bottom:4px;">📜 Spoken Transcript:</div>
          "${script}"
        </div>
      </div>
    `;
  }
};

window.MorningBriefEngine = MorningBriefEngine;
