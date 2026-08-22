/* ═══════════════════════════════════════════════════════════════════
   JONATHAN DUNPHY APPROVED LOTTIE SUBMIT BUTTON SYSTEM
   Frame 0-10: Pill Morphs to Circle | 10-60: 720° Spin | 60-80: Draw Checkmark
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  let cachedLottieData = null;

  async function getLottieData() {
    if (cachedLottieData) return cachedLottieData;
    if (window.SUBMIT_LOTTIE_DATA) {
      cachedLottieData = window.SUBMIT_LOTTIE_DATA;
      return cachedLottieData;
    }
    try {
      const res = await fetch('assets/submit-approved.json');
      if (res.ok) {
        cachedLottieData = await res.json();
        window.SUBMIT_LOTTIE_DATA = cachedLottieData;
        return cachedLottieData;
      }
    } catch (e) {
      console.warn('Lottie json load fallback:', e);
    }
    return null;
  }

  // ─── Lottie Submit Button Controller ───────────────────────────
  class LottieSubmitController {
    constructor(container) {
      this.container = container;
      this.anim = null;
      this.isPlaying = false;
      this.init();
    }

    async init() {
      const box = this.container.querySelector('.lottie-canvas-box') || this.container;
      const data = await getLottieData();

      if (typeof lottie !== 'undefined' && data) {
        box.innerHTML = '';
        this.anim = lottie.loadAnimation({
          container: box,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          animationData: data
        });

        this.anim.goToAndStop(0, true);
      }

      this.bind();
    }

    bind() {
      this.container.addEventListener('click', (e) => {
        if (this.isPlaying) {
          e.preventDefault();
          return;
        }

        const customHandler = this.container.getAttribute('data-onclick');
        this.playSubmit(() => {
          if (customHandler && typeof window[customHandler] === 'function') {
            window[customHandler](e);
          }
        });
      });
    }

    playSubmit(callback) {
      if (this.isPlaying) return;
      this.isPlaying = true;
      this.container.setAttribute('data-state', 'submitting');

      if (this.anim) {
        this.anim.goToAndPlay(0, true);

        // At frame 64 is where checkmark draws
        setTimeout(() => {
          if (typeof ExtraordinaryButtons !== 'undefined' && ExtraordinaryButtons.haptics) {
            ExtraordinaryButtons.haptics.playSuccessChime();
          }
        }, 1200);

        this.anim.addEventListener('complete', () => {
          this.container.setAttribute('data-state', 'approved');
          setTimeout(() => {
            if (typeof callback === 'function') callback();
            setTimeout(() => {
              this.reset();
            }, 1800);
          }, 400);
        }, { once: true });
      } else {
        setTimeout(() => {
          if (typeof callback === 'function') callback();
          this.reset();
        }, 1500);
      }
    }

    reset() {
      this.isPlaying = false;
      this.container.setAttribute('data-state', 'idle');
      if (this.anim) {
        this.anim.goToAndStop(0, true);
      }
    }
  }

  function initLottieSubmitButtons() {
    document.querySelectorAll('.lottie-submit-btn:not([data-lottie-initialized])').forEach((el) => {
      el.setAttribute('data-lottie-initialized', 'true');
      new LottieSubmitController(el);
    });
  }

  window.LottieSubmit = {
    init: initLottieSubmitButtons,
    create({ id = '', onClick = '', width = '260px', height = '70px', extraClass = '', type = 'submit' } = {}) {
      const idAttr = id ? `id="${id}"` : '';
      const clickAttr = onClick ? `data-onclick="${onClick}"` : '';

      return `
        <div class="lottie-submit-btn ${extraClass}" ${idAttr} ${clickAttr} style="width:${width};height:${height};position:relative;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;margin:0 auto;">
          <div class="lottie-canvas-box" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;"></div>
          <button type="${type}" style="position:absolute;inset:0;opacity:0;cursor:pointer;border:none;background:transparent;z-index:5;" aria-label="Submit"></button>
        </div>
      `;
    }
  };

  // Run on load and mutation observer
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLottieSubmitButtons);
  } else {
    initLottieSubmitButtons();
  }

  const observer = new MutationObserver(() => {
    initLottieSubmitButtons();
  });
  observer.observe(document.body, { childList: true, subtree: true });

})();
