/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE 3D CARD TILT & HOLOGRAPHIC SPECULAR SHEEN ENGINE
   Interactive Perspective Physics, Gyroscope & Dynamic Light Glare
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  const CardTilt = {
    init() {
      this.attachToCards();
      
      // Observe SPA dynamic view renders
      const observer = new MutationObserver(() => {
        this.attachToCards();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    },

    attachToCards() {
      const cards = document.querySelectorAll('.card-glass, .stats-card, .feature-card, .pillar-card, .cockpit-card');
      
      cards.forEach(card => {
        if (card.dataset.tiltInitialized) return;
        card.dataset.tiltInitialized = 'true';
        card.classList.add('card-tilt-target');

        // Create Holographic Glare Layer
        let glare = card.querySelector('.card-holographic-glare');
        if (!glare) {
          glare = document.createElement('div');
          glare.className = 'card-holographic-glare';
          card.appendChild(glare);
        }

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          // Calculate Tilt Angles (-8deg to 8deg)
          const rotateX = ((centerY - y) / centerY) * 7.5;
          const rotateY = ((x - centerX) / centerX) * 7.5;

          // Calculate Light Glare Coordinates
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
          glare.style.background = `radial-gradient(circle at ${glareX.toFixed(1)}% ${glareY.toFixed(1)}%, rgba(255, 255, 255, 0.18) 0%, rgba(0, 242, 254, 0.08) 35%, transparent 70%)`;
          glare.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
          glare.style.opacity = '0';
        });
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CardTilt.init());
  } else {
    CardTilt.init();
  }

  window.CardTilt = CardTilt;
})();
