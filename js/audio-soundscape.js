/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE BINAURAL FOCUS AUDIO SOUNDSCAPE SYNTHESIZER
   Pure Web Audio API Digital Signal Processing (Zero External Audio Files)
   ═══════════════════════════════════════════════════════════════════ */

const AudioSoundscape = {
  ctx: null,
  isPlaying: false,
  currentPreset: 'gamma40',
  gainNode: null,
  activeNodes: [],

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  setVolume(volume0to1) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setTargetAtTime(volume0to1, this.ctx.currentTime, 0.05);
    }
  },

  stop() {
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch (e) {}
    });
    this.activeNodes = [];
    this.isPlaying = false;
    this.updateUIState();
  },

  play(preset = 'gamma40') {
    this.stop();
    this.initContext();
    this.currentPreset = preset;

    if (preset === 'gamma40') {
      this.generateBinauralBeats(210, 250); // 40Hz Gamma Focus
    } else if (preset === 'alpha10') {
      this.generateBinauralBeats(160, 170); // 10Hz Alpha Creative Flow
    } else if (preset === 'brownNoise') {
      this.generateBrownNoise();
    }

    this.isPlaying = true;
    this.updateUIState();
  },

  toggle(preset = 'gamma40') {
    if (this.isPlaying && this.currentPreset === preset) {
      this.stop();
    } else {
      this.play(preset);
    }
  },

  /**
   * Generates True Stereo Binaural Beats with Left/Right Channel Splitter
   */
  generateBinauralBeats(leftFreq, rightFreq) {
    const merger = this.ctx.createChannelMerger(2);

    // Left Ear Oscillator
    const oscL = this.ctx.createOscillator();
    oscL.type = 'sine';
    oscL.frequency.setValueAtTime(leftFreq, this.ctx.currentTime);

    // Right Ear Oscillator
    const oscR = this.ctx.createOscillator();
    oscR.type = 'sine';
    oscR.frequency.setValueAtTime(rightFreq, this.ctx.currentTime);

    oscL.connect(merger, 0, 0); // left to channel 0
    oscR.connect(merger, 0, 1); // right to channel 1

    merger.connect(this.gainNode);

    oscL.start();
    oscR.start();

    this.activeNodes.push(oscL, oscR, merger);
  },

  /**
   * Generates Deep Brownian Noise for Ambient Distraction Isolation
   */
  generateBrownNoise() {
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Gain boost
    }

    const whiteNoiseSource = this.ctx.createBufferSource();
    whiteNoiseSource.buffer = noiseBuffer;
    whiteNoiseSource.loop = true;

    // Low pass filter for soft deep rumble
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    whiteNoiseSource.connect(filter);
    filter.connect(this.gainNode);

    whiteNoiseSource.start();
    this.activeNodes.push(whiteNoiseSource, filter);
  },

  /**
   * Plays a harmonic Zen Singing Bowl chime on sprint completion
   */
  playZenBowlChime() {
    this.initContext();
    const osc = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, this.ctx.currentTime); // 528Hz Solfeggio frequency

    chimeGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3.5);

    osc.connect(chimeGain);
    chimeGain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 3.5);
  },

  updateUIState() {
    const btn = document.getElementById('soundscape-toggle-btn');
    const wave = document.getElementById('soundscape-waveform');
    if (btn) {
      btn.innerHTML = this.isPlaying
        ? `<i class="fas fa-pause"></i> Pause Audio`
        : `<i class="fas fa-play"></i> Play Soundscape`;
      btn.className = this.isPlaying ? 'btn btn-secondary btn-sm' : 'btn btn-primary btn-sm';
    }
    if (wave) {
      wave.style.opacity = this.isPlaying ? '1' : '0.2';
    }
  },

  /**
   * HTML Widget to embed in Pomodoro Work lab
   */
  renderPomodoroAudioWidget() {
    return `
      <div style="background:#070a14; border:1px solid #1e293b; border-radius:14px; padding:16px; margin-top:16px; text-align:left;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:18px;">🎧</span>
            <div>
              <div style="font-size:13px; font-weight:800; color:#00f2fe;">Binaural Cognitive Soundscapes</div>
              <div style="font-size:11px; color:#94a3b8;">Neural frequency entrainment synthesized in real-time</div>
            </div>
          </div>
          <button id="soundscape-toggle-btn" class="btn btn-primary btn-sm" onclick="AudioSoundscape.toggle(document.getElementById('soundscape-preset-sel').value)">
            <i class="fas fa-play"></i> Play Soundscape
          </button>
        </div>

        <div style="display:flex; gap:10px; align-items:center;">
          <select id="soundscape-preset-sel" class="form-input" style="font-size:12px; flex:1;" onchange="if(AudioSoundscape.isPlaying)AudioSoundscape.play(this.value)">
            <option value="gamma40">🧠 40Hz Gamma Waves (Laser Focus & Processing)</option>
            <option value="alpha10">🌊 10Hz Alpha Waves (Creative Flow & Calm)</option>
            <option value="brownNoise">🌧️ Deep Brown Noise (Distraction Isolation)</option>
          </select>
          <input type="range" min="0" max="1" step="0.05" value="0.25" style="width:80px;" onchange="AudioSoundscape.setVolume(parseFloat(this.value))" title="Volume">
        </div>
      </div>
    `;
  }
};

window.AudioSoundscape = AudioSoundscape;
