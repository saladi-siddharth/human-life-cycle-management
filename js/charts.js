/* ═══════════════════════════════════════════════════════════════════
   LIFEGPS CHARTS — Canvas-based Chart Rendering
   ═══════════════════════════════════════════════════════════════════ */

const Charts = {
  // ─── Line Chart ──────────────────────────────────────
  line(canvasId, data, options = {}) {
    setTimeout(() => {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = (options.height || 200) * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = (options.height || 200) + 'px';
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = options.height || 200;
      const pad = { top: 20, right: 20, bottom: 30, left: 50 };
      const cw = w - pad.left - pad.right;
      const ch = h - pad.top - pad.bottom;

      const values = data.values;
      const labels = data.labels;
      const maxVal = Math.max(...values) * 1.15;
      const minVal = Math.min(0, Math.min(...values));

      // Grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = pad.top + (ch / 4) * i;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(w - pad.right, y);
        ctx.stroke();
        ctx.fillStyle = '#64748b';
        ctx.font = '11px Inter';
        ctx.textAlign = 'right';
        const val = maxVal - ((maxVal - minVal) / 4) * i;
        ctx.fillText(Math.round(val).toLocaleString(), pad.left - 8, y + 4);
      }

      // Labels
      ctx.fillStyle = '#64748b';
      ctx.font = '11px Inter';
      ctx.textAlign = 'center';
      labels.forEach((label, i) => {
        const x = pad.left + (cw / (labels.length - 1)) * i;
        ctx.fillText(label, x, h - 8);
      });

      // Line + gradient fill
      const colors = options.colors || ['#6366f1', '#8b5cf6'];
      const gradient = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
      gradient.addColorStop(0, colors[0] + '40');
      gradient.addColorStop(1, colors[0] + '00');

      const points = values.map((v, i) => ({
        x: pad.left + (cw / (values.length - 1)) * i,
        y: pad.top + ch - ((v - minVal) / (maxVal - minVal)) * ch
      }));

      // Fill area
      ctx.beginPath();
      ctx.moveTo(points[0].x, h - pad.bottom);
      points.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(points[points.length - 1].x, h - pad.bottom);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Line
      ctx.beginPath();
      ctx.strokeStyle = colors[0];
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();

      // Dots
      points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = colors[0];
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#0a0e1a';
        ctx.fill();
      });
    }, 200);
  },

  // ─── Bar Chart ───────────────────────────────────────
  bar(canvasId, data, options = {}) {
    setTimeout(() => {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = (options.height || 200) * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = (options.height || 200) + 'px';
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = options.height || 200;
      const pad = { top: 20, right: 20, bottom: 30, left: 50 };
      const cw = w - pad.left - pad.right;
      const ch = h - pad.top - pad.bottom;

      const { values, labels, colors } = data;
      const maxVal = Math.max(...values) * 1.15;
      const barWidth = (cw / values.length) * 0.6;
      const barGap = (cw / values.length) * 0.4;

      // Grid
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      for (let i = 0; i <= 4; i++) {
        const y = pad.top + (ch / 4) * i;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(w - pad.right, y);
        ctx.stroke();
        ctx.fillStyle = '#64748b';
        ctx.font = '11px Inter';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxVal - (maxVal / 4) * i), pad.left - 8, y + 4);
      }

      // Bars
      values.forEach((v, i) => {
        const barH = (v / maxVal) * ch;
        const x = pad.left + (cw / values.length) * i + barGap / 2;
        const y = pad.top + ch - barH;
        const color = colors ? colors[i % colors.length] : '#6366f1';

        const grad = ctx.createLinearGradient(x, y, x, y + barH);
        grad.addColorStop(0, color);
        grad.addColorStop(1, color + '80');

        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barH, [4, 4, 0, 0]);
        ctx.fillStyle = grad;
        ctx.fill();

        // Label
        ctx.fillStyle = '#64748b';
        ctx.font = '11px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], x + barWidth / 2, h - 8);
      });
    }, 200);
  },

  // ─── Doughnut Chart ──────────────────────────────────
  doughnut(canvasId, data, options = {}) {
    setTimeout(() => {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const size = options.size || 180;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = size + 'px';
      canvas.style.height = size + 'px';
      ctx.scale(dpr, dpr);

      const cx = size / 2;
      const cy = size / 2;
      const radius = size / 2 - 10;
      const lineWidth = options.lineWidth || 20;
      const total = data.values.reduce((s, v) => s + v, 0);

      let startAngle = -Math.PI / 2;
      data.values.forEach((v, i) => {
        const angle = (v / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, startAngle, startAngle + angle);
        ctx.strokeStyle = data.colors[i];
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();
        startAngle += angle + 0.04;
      });

      // Center text
      if (options.centerText) {
        ctx.fillStyle = '#f1f5f9';
        ctx.font = 'bold 24px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(options.centerText, cx, cy - 6);
        if (options.centerSub) {
          ctx.fillStyle = '#64748b';
          ctx.font = '11px Inter';
          ctx.fillText(options.centerSub, cx, cy + 14);
        }
      }
    }, 200);
  },

  // ─── Sparkline ───────────────────────────────────────
  sparkline(canvasId, values, color = '#6366f1', h = 40) {
    setTimeout(() => {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);

      const max = Math.max(...values);
      const min = Math.min(...values);
      const range = max - min || 1;
      const step = w / (values.length - 1);

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      values.forEach((v, i) => {
        const x = i * step;
        const y = h - 4 - ((v - min) / range) * (h - 8);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Gradient fill
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, color + '30');
      gradient.addColorStop(1, color + '00');
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }, 200);
  },

  // ─── 5-Pillar Life Wheel Radar Chart ─────────────────────
  radar(canvasId, data, options = {}) {
    setTimeout(() => {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      const size = options.size || Math.min(rect.width, 360);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = size + 'px';
      canvas.style.height = size + 'px';
      ctx.scale(dpr, dpr);

      const cx = size / 2;
      const cy = size / 2;
      const radius = size / 2 - 40;
      const labels = data.labels || ['Growth', 'Relationships', 'Purpose', 'Adventure', 'Legacy'];
      const values = data.values || [80, 75, 85, 70, 78];
      const count = labels.length;
      const angleStep = (Math.PI * 2) / count;

      // Concentric background polygon levels
      const levels = 5;
      for (let level = 1; level <= levels; level++) {
        const r = (radius / levels) * level;
        ctx.beginPath();
        for (let i = 0; i < count; i++) {
          const a = i * angleStep - Math.PI / 2;
          const x = cx + r * Math.cos(a);
          const y = cy + r * Math.sin(a);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Level percentage marker
        ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.font = '9px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`${level * 20}%`, cx, cy - r + 10);
      }

      // Spoke radial lines
      for (let i = 0; i < count; i++) {
        const a = i * angleStep - Math.PI / 2;
        const x = cx + radius * Math.cos(a);
        const y = cy + radius * Math.sin(a);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Outer Pillar Labels
        const labelRadius = radius + 22;
        const lx = cx + labelRadius * Math.cos(a);
        const ly = cy + labelRadius * Math.sin(a);
        ctx.fillStyle = '#f1f5f9';
        ctx.font = 'bold 11px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labels[i], lx, ly);

        // Value text
        ctx.fillStyle = '#38bdf8';
        ctx.font = '10px Inter';
        ctx.fillText(`${values[i]}%`, lx, ly + 13);
      }

      // Data polygon fill
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const a = i * angleStep - Math.PI / 2;
        const valRatio = Math.max(0, Math.min(100, values[i])) / 100;
        const r = radius * valRatio;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      const gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.5)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0.25)');
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Vertex highlight dots
      for (let i = 0; i < count; i++) {
        const a = i * angleStep - Math.PI / 2;
        const valRatio = Math.max(0, Math.min(100, values[i])) / 100;
        const r = radius * valRatio;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);

        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#00f2fe';
        ctx.fill();
        ctx.strokeStyle = '#0a0e1a';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }, 200);
  },

  // ─── SIP Compound Wealth Dual-Area Growth Chart ───────────
  sipArea(canvasId, sipData, options = {}) {
    setTimeout(() => {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      const h = options.height || 220;
      const w = rect.width;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);

      const pad = { top: 25, right: 20, bottom: 30, left: 65 };
      const cw = w - pad.left - pad.right;
      const ch = h - pad.top - pad.bottom;

      const labels = sipData.labels || [];
      const invested = sipData.investedSeries || [];
      const futureVal = sipData.totalSeries || [];

      if (!labels.length) return;

      const maxVal = Math.max(...futureVal) * 1.12 || 100000;

      // Horizontal grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = pad.top + (ch / 4) * i;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(w - pad.right, y);
        ctx.stroke();

        const val = maxVal - (maxVal / 4) * i;
        ctx.fillStyle = '#64748b';
        ctx.font = '10px Inter';
        ctx.textAlign = 'right';
        ctx.fillText(`₹${(val / 100000).toFixed(1)}L`, pad.left - 8, y + 3);
      }

      // X-Axis Labels
      labels.forEach((label, i) => {
        if (i % Math.ceil(labels.length / 6) === 0 || i === labels.length - 1) {
          const x = pad.left + (cw / (labels.length - 1)) * i;
          ctx.fillStyle = '#64748b';
          ctx.font = '10px Inter';
          ctx.textAlign = 'center';
          ctx.fillText(label, x, h - 8);
        }
      });

      // 1. Shaded Future Value Area (Wealth Growth - Emerald)
      const gradFV = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
      gradFV.addColorStop(0, 'rgba(16, 185, 129, 0.45)');
      gradFV.addColorStop(1, 'rgba(16, 185, 129, 0.02)');

      ctx.beginPath();
      ctx.moveTo(pad.left, h - pad.bottom);
      futureVal.forEach((v, i) => {
        const x = pad.left + (cw / (labels.length - 1)) * i;
        const y = pad.top + ch - (v / maxVal) * ch;
        ctx.lineTo(x, y);
      });
      ctx.lineTo(pad.left + cw, h - pad.bottom);
      ctx.closePath();
      ctx.fillStyle = gradFV;
      ctx.fill();

      // Future Value Line
      ctx.beginPath();
      futureVal.forEach((v, i) => {
        const x = pad.left + (cw / (labels.length - 1)) * i;
        const y = pad.top + ch - (v / maxVal) * ch;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // 2. Shaded Invested Capital Area (Purple/Indigo)
      const gradInv = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
      gradInv.addColorStop(0, 'rgba(99, 102, 241, 0.35)');
      gradInv.addColorStop(1, 'rgba(99, 102, 241, 0.02)');

      ctx.beginPath();
      ctx.moveTo(pad.left, h - pad.bottom);
      invested.forEach((v, i) => {
        const x = pad.left + (cw / (labels.length - 1)) * i;
        const y = pad.top + ch - (v / maxVal) * ch;
        ctx.lineTo(x, y);
      });
      ctx.lineTo(pad.left + cw, h - pad.bottom);
      ctx.closePath();
      ctx.fillStyle = gradInv;
      ctx.fill();

      // Invested Line
      ctx.beginPath();
      invested.forEach((v, i) => {
        const x = pad.left + (cw / (labels.length - 1)) * i;
        const y = pad.top + ch - (v / maxVal) * ch;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.stroke();
    }, 200);
  }
};
