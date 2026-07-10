/* ============================================================
   CHARTS — SVG-based Data Visualization
   ============================================================ */

const Charts = {
  // ── CIRCULAR PROGRESS / SCORE RING ──
  scoreRing(containerId, value, size = 120, strokeWidth = 8, color = '#6C5CE7') {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;
    const gradientId = `grad_${containerId}`;

    return `
      <div class="score-ring" style="width:${size}px; height:${size}px">
        <svg width="${size}" height="${size}" style="transform: rotate(-90deg)">
          <defs>
            <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${Charts._lightenColor(color, 40)};stop-opacity:1" />
            </linearGradient>
          </defs>
          <circle cx="${size/2}" cy="${size/2}" r="${radius}" 
            fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="${strokeWidth}" />
          <circle cx="${size/2}" cy="${size/2}" r="${radius}" 
            fill="none" stroke="url(#${gradientId})" stroke-width="${strokeWidth}" 
            stroke-linecap="round"
            stroke-dasharray="${circumference}" 
            stroke-dashoffset="${circumference}"
            style="transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);"
            data-target-offset="${offset}" />
        </svg>
        <div class="score-ring__text">
          <span class="score-ring__value" style="font-size:${size > 100 ? '1.75rem' : '1.25rem'}">${value}</span>
          <span class="score-ring__label">/ 100</span>
        </div>
      </div>
    `;
  },

  // ── RADAR CHART (Life Balance) ──
  radarChart(data, size = 250) {
    const center = size / 2;
    const radius = size / 2 - 30;
    const labels = Object.keys(data);
    const values = Object.values(data);
    const count = labels.length;
    const angleStep = (2 * Math.PI) / count;

    // Grid lines
    let gridLines = '';
    for (let level = 1; level <= 4; level++) {
      const r = (radius * level) / 4;
      let points = '';
      for (let i = 0; i < count; i++) {
        const angle = angleStep * i - Math.PI / 2;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        points += `${x},${y} `;
      }
      gridLines += `<polygon points="${points.trim()}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;
    }

    // Axis lines
    let axes = '';
    for (let i = 0; i < count; i++) {
      const angle = angleStep * i - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      axes += `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;
    }

    // Data polygon
    let dataPoints = '';
    let pointDots = '';
    for (let i = 0; i < count; i++) {
      const angle = angleStep * i - Math.PI / 2;
      const r = (radius * values[i]) / 100;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      dataPoints += `${x},${y} `;
      pointDots += `<circle cx="${x}" cy="${y}" r="4" fill="#6C5CE7" stroke="white" stroke-width="1.5"/>`;
    }

    // Labels
    let labelTexts = '';
    for (let i = 0; i < count; i++) {
      const angle = angleStep * i - Math.PI / 2;
      const x = center + (radius + 20) * Math.cos(angle);
      const y = center + (radius + 20) * Math.sin(angle);
      const anchor = x < center - 10 ? 'end' : x > center + 10 ? 'start' : 'middle';
      labelTexts += `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="middle" 
        fill="rgba(240,240,255,0.5)" font-size="11" font-family="Inter, sans-serif">${labels[i].charAt(0).toUpperCase() + labels[i].slice(1)}</text>`;
      labelTexts += `<text x="${x}" y="${y + 14}" text-anchor="${anchor}" dominant-baseline="middle" 
        fill="rgba(240,240,255,0.8)" font-size="12" font-weight="700" font-family="Outfit, sans-serif">${values[i]}%</text>`;
    }

    return `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <defs>
          <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#6C5CE7;stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:#00D2FF;stop-opacity:0.15" />
          </linearGradient>
        </defs>
        ${gridLines}
        ${axes}
        <polygon points="${dataPoints.trim()}" fill="url(#radarGrad)" stroke="#6C5CE7" stroke-width="2" stroke-linejoin="round"/>
        ${pointDots}
        ${labelTexts}
      </svg>
    `;
  },

  // ── BAR CHART ──
  barChart(data, labels, height = 120, colors = null) {
    const max = Math.max(...data);
    const defaultColors = ['#6C5CE7', '#00D2FF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    let bars = '';
    data.forEach((val, i) => {
      const h = (val / max) * 100;
      const color = colors ? colors[i % colors.length] : defaultColors[i % defaultColors.length];
      bars += `
        <div class="activity-bar" style="height: ${h}%; background: ${color}" 
          data-tooltip="${labels?.[i]}: ${val}" title="${labels?.[i]}: ${val}"></div>
      `;
    });

    let labelHtml = '';
    if (labels) {
      labelHtml = '<div class="activity-labels">' +
        labels.map(l => `<div class="activity-label">${l}</div>`).join('') +
        '</div>';
    }

    return `
      <div class="activity-chart" style="height: ${height}px">${bars}</div>
      ${labelHtml}
    `;
  },

  // ── DONUT CHART ──
  donutChart(segments, size = 180, centerText = '', centerLabel = '') {
    const center = size / 2;
    const radius = size / 2 - 20;
    const strokeWidth = 24;
    const circumference = 2 * Math.PI * radius;
    let currentAngle = 0;
    let arcs = '';

    segments.forEach(seg => {
      const segLength = (seg.percent / 100) * circumference;
      const gap = 4;
      arcs += `
        <circle cx="${center}" cy="${center}" r="${radius}" fill="none"
          stroke="${seg.color}" stroke-width="${strokeWidth}"
          stroke-dasharray="${segLength - gap} ${circumference - segLength + gap}"
          stroke-dashoffset="${-currentAngle}"
          transform="rotate(-90 ${center} ${center})"
          style="transition: stroke-dasharray 1s ease, stroke-dashoffset 1s ease;"
        />
      `;
      currentAngle += segLength;
    });

    return `
      <div class="donut-chart-container" style="width:${size}px;height:${size}px">
        <svg width="${size}" height="${size}">
          <circle cx="${center}" cy="${center}" r="${radius}" fill="none" 
            stroke="rgba(255,255,255,0.04)" stroke-width="${strokeWidth}"/>
          ${arcs}
        </svg>
        <div class="donut-chart__center">
          <div class="donut-chart__amount">${centerText}</div>
          <div class="donut-chart__label">${centerLabel}</div>
        </div>
      </div>
    `;
  },

  // ── LINE CHART (Simple) ──
  lineChart(data, labels, height = 160, color = '#6C5CE7') {
    const max = Math.max(...data.map(d => d.value || d));
    const min = Math.min(...data.map(d => d.value || d));
    const range = max - min || 1;
    const width = 100;
    const padding = 5;

    const points = data.map((d, i) => {
      const val = d.value || d;
      const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((val - min) / range) * (height - 2 * padding);
      return { x: (x / 100 * 100), y };
    });

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x}% ${p.y}`).join(' ');
    const areaD = pathD + ` L ${points[points.length-1].x}% ${height} L ${points[0].x}% ${height} Z`;

    return `
      <svg width="100%" height="${height}" viewBox="0 0 100 ${height}" preserveAspectRatio="none" style="overflow:visible">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0" />
          </linearGradient>
        </defs>
        <path d="${areaD}" fill="url(#lineGrad)" />
        <path d="${pathD}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
        ${points.map(p => `<circle cx="${p.x}%" cy="${p.y}" r="3" fill="${color}" stroke="var(--bg-base)" stroke-width="1.5" vector-effect="non-scaling-stroke"/>`).join('')}
      </svg>
      ${labels ? `<div class="activity-labels" style="margin-top:8px">${labels.map(l => `<div class="activity-label">${l}</div>`).join('')}</div>` : ''}
    `;
  },

  // ── ANIMATE SCORE RINGS ON VIEW ──
  animateRings() {
    setTimeout(() => {
      document.querySelectorAll('[data-target-offset]').forEach(circle => {
        circle.style.strokeDashoffset = circle.dataset.targetOffset;
      });
    }, 100);
  },

  // ── HELPER: Lighten Color ──
  _lightenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
  }
};
