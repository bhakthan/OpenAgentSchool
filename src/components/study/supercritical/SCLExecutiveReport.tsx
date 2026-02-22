/**
 * SCL Executive Report – Professional print-ready report generator
 * 
 * Opens a new window with a curated executive-style HTML document featuring:
 * - Branded header with OAS logo treatment
 * - Executive summary dashboard with KPIs and risk/opportunity gauges
 * - SVG dependency graph showing effect connections
 * - Structured sections with icons for each finding category
 * - FMEA heatmap and projection tables (if deep dive data exists)
 * - Print-optimised CSS with page-break controls
 */

import type {
  SCLSession as SCLSessionType,
  SCLEffectNode,
  SCLEdge,
  SCLLeap,
  SecondaryFindings,
  TertiaryFindings,
} from '@/types/supercritical';

// ── Colour Palette (print-safe) ────────────────────────────────────────────
const PALETTE = {
  primary: '#3b82f6',
  primaryDark: '#1d4ed8',
  accent: '#8b5cf6',
  success: '#059669',
  warning: '#d97706',
  danger: '#dc2626',
  muted: '#6b7280',
  bg: '#ffffff',
  cardBg: '#f8fafc',
  border: '#e2e8f0',
  text: '#1e293b',
  textSecondary: '#475569',
};

const DOMAIN_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  ops: { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
  product: { bg: '#ede9fe', text: '#5b21b6', border: '#c4b5fd' },
  security: { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
  org: { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
  cost: { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
  perf: { bg: '#cffafe', text: '#155e75', border: '#67e8f9' },
};

// ── SVG Icon Helpers (inline for print window) ─────────────────────────────
const SVG_ICONS = {
  shield: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><path d="M128,24,40,64V120c0,64.67,33.49,118.38,88,141.17C182.51,238.38,216,184.67,216,120V64Z" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warning: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><path d="M128,80v56" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><circle cx="128" cy="172" r="8" fill="currentColor"/><path d="M114.15,39.89,26.17,187.8A16,16,0,0,0,40,212H216a16,16,0,0,0,13.85-24.2L141.85,39.89A16,16,0,0,0,114.15,39.89Z" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  lightbulb: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><path d="M128,24A72,72,0,0,0,88,155.4V200a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V155.4A72,72,0,0,0,128,24Z" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="88" y1="232" x2="168" y2="232" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  target: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-width="16"/><circle cx="128" cy="128" r="64" fill="none" stroke="currentColor" stroke-width="16"/><circle cx="128" cy="128" r="32" fill="none" stroke="currentColor" stroke-width="16"/><circle cx="128" cy="128" r="8" fill="currentColor"/></svg>`,
  checkCircle: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-width="16"/><polyline points="88 136 112 160 168 104" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  trendUp: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><polyline points="232 56 136 152 96 112 24 184" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><polyline points="232 120 232 56 168 56" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chartBar: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><rect x="40" y="40" width="48" height="176" rx="8" fill="none" stroke="currentColor" stroke-width="16"/><rect x="104" y="104" width="48" height="112" rx="8" fill="none" stroke="currentColor" stroke-width="16"/><rect x="168" y="72" width="48" height="144" rx="8" fill="none" stroke="currentColor" stroke-width="16"/></svg>`,
  lightning: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><polygon points="160 16 48 136 120 136 96 240 208 120 136 120 160 16" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  wrench: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><path d="M210.69,34.18a4,4,0,0,0-6.57,1.11L180.37,84.76a4,4,0,0,1-4.49,2.13l-26.73-6.09a4,4,0,0,1-2.87-2.87l-6.09-26.73a4,4,0,0,1,2.13-4.49l49.47-23.75" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  network: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="24" fill="none" stroke="currentColor" stroke-width="16"/><circle cx="128" cy="48" r="24" fill="none" stroke="currentColor" stroke-width="16"/><circle cx="48" cy="200" r="24" fill="none" stroke="currentColor" stroke-width="16"/><circle cx="208" cy="200" r="24" fill="none" stroke="currentColor" stroke-width="16"/><line x1="128" y1="72" x2="128" y2="104" stroke="currentColor" stroke-width="16"/><line x1="110" y1="146" x2="66" y2="182" stroke="currentColor" stroke-width="16"/><line x1="146" y1="146" x2="190" y2="182" stroke="currentColor" stroke-width="16"/></svg>`,
  trophy: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><line x1="96" y1="224" x2="160" y2="224" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="128" y1="184" x2="128" y2="224" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><path d="M56,56H200V96a72,72,0,0,1-144,0Z" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

// ── Helper Functions ────────────────────────────────────────────────────────

function gaugeArc(value: number, radius = 40): string {
  // value 0-1 maps to a 180° arc (left to right)
  const clamp = Math.max(0, Math.min(1, value));
  const angle = Math.PI * clamp;
  const cx = 50;
  const cy = 55;
  const x = cx - radius * Math.cos(angle);
  const y = cy - radius * Math.sin(angle);
  const largeArc = clamp > 0.5 ? 1 : 0;
  return `M ${cx - radius} ${cy} A ${radius} ${radius} 0 ${largeArc} 1 ${x} ${y}`;
}

function gaugeColor(value: number): string {
  if (value >= 0.7) return PALETTE.success;
  if (value >= 0.4) return PALETTE.warning;
  return PALETTE.danger;
}

function impactColor(impact: number): string {
  if (impact >= 3) return PALETTE.success;
  if (impact >= 1) return '#16a34a';
  if (impact >= 0) return PALETTE.muted;
  if (impact >= -2) return PALETTE.warning;
  return PALETTE.danger;
}

function confidenceBadge(confidence: number): string {
  const pct = Math.round(confidence * 100);
  const color = gaugeColor(confidence);
  return `<span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;background:${color}15;color:${color};border:1px solid ${color}40">${pct}%</span>`;
}

function domainBadge(domain: string): string {
  const d = DOMAIN_COLORS[domain] ?? { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' };
  return `<span style="display:inline-block;padding:2px 10px;border-radius:12px;font-size:11px;font-weight:600;background:${d.bg};color:${d.text};border:1px solid ${d.border}">${domain.toUpperCase()}</span>`;
}

function orderBadge(order: number): string {
  const labels: Record<number, string> = { 1: '1st Order', 2: '2nd Order', 3: '3rd Order' };
  const colors: Record<number, string> = { 1: PALETTE.primary, 2: PALETTE.accent, 3: PALETTE.danger };
  const c = colors[order] ?? PALETTE.muted;
  return `<span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:600;background:${c}15;color:${c};border:1px solid ${c}40">${labels[order] ?? `${order}th`}</span>`;
}

// ── Dependency Graph SVG Generator ──────────────────────────────────────────

function generateDependencyGraphSVG(nodes: SCLEffectNode[], edges: SCLEdge[]): string {
  if (nodes.length === 0) return '';

  const WIDTH = 780;
  const NODE_H = 56;
  const NODE_W = 220;
  const LEVEL_GAP_Y = 90;
  const COL_GAP_X = 30;

  // Group nodes by order
  const byOrder: Record<number, SCLEffectNode[]> = {};
  nodes.forEach(n => {
    if (!byOrder[n.order]) byOrder[n.order] = [];
    byOrder[n.order].push(n);
  });
  const orders = Object.keys(byOrder).map(Number).sort();

  // Calculate positions
  const positions: Record<string, { x: number; y: number }> = {};
  orders.forEach((order, rowIdx) => {
    const row = byOrder[order];
    const totalWidth = row.length * NODE_W + (row.length - 1) * COL_GAP_X;
    const startX = (WIDTH - totalWidth) / 2;
    row.forEach((node, colIdx) => {
      positions[node.id] = {
        x: startX + colIdx * (NODE_W + COL_GAP_X),
        y: 30 + rowIdx * (NODE_H + LEVEL_GAP_Y),
      };
    });
  });

  const HEIGHT = 30 + orders.length * (NODE_H + LEVEL_GAP_Y) + 20;

  // Build edge paths
  const edgePaths = edges.map(e => {
    const from = positions[e.from];
    const to = positions[e.to];
    if (!from || !to) return '';
    const x1 = from.x + NODE_W / 2;
    const y1 = from.y + NODE_H;
    const x2 = to.x + NODE_W / 2;
    const y2 = to.y;
    const midY = (y1 + y2) / 2;
    const opacity = Math.max(0.3, e.confidence);
    const color = e.confidence >= 0.7 ? PALETTE.primary : e.confidence >= 0.4 ? PALETTE.warning : PALETTE.muted;
    return `
      <path d="M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}"
        fill="none" stroke="${color}" stroke-width="2" stroke-opacity="${opacity}"
        marker-end="url(#arrowhead)" />
      ${e.mechanism ? `<text x="${(x1 + x2) / 2}" y="${midY - 4}" text-anchor="middle" font-size="9" fill="${PALETTE.muted}" opacity="0.8">${e.mechanism.length > 30 ? e.mechanism.slice(0, 28) + '…' : e.mechanism}</text>` : ''}
    `;
  }).join('');

  // Build node rects
  const nodeRects = nodes.map(n => {
    const pos = positions[n.id];
    if (!pos) return '';
    const d = DOMAIN_COLORS[n.domain] ?? { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' };
    const orderColors: Record<number, string> = { 1: PALETTE.primary, 2: PALETTE.accent, 3: PALETTE.danger };
    const borderColor = orderColors[n.order] ?? d.border;
    const title = n.title.length > 26 ? n.title.slice(0, 24) + '…' : n.title;
    return `
      <g>
        <rect x="${pos.x}" y="${pos.y}" width="${NODE_W}" height="${NODE_H}" rx="8"
          fill="${d.bg}" stroke="${borderColor}" stroke-width="2" />
        <text x="${pos.x + 12}" y="${pos.y + 22}" font-size="12" font-weight="600" fill="${d.text}">${title}</text>
        <text x="${pos.x + 12}" y="${pos.y + 40}" font-size="10" fill="${PALETTE.muted}">
          Impact: ${n.impact > 0 ? '+' : ''}${n.impact} · Conf: ${Math.round(n.confidence * 100)}% · ${n.domain}
        </text>
      </g>
    `;
  }).join('');

  // Order level labels
  const levelLabels = orders.map((order, rowIdx) => {
    const labels: Record<number, string> = { 1: 'First-Order Effects', 2: 'Higher-Order Effects', 3: 'Tertiary Effects' };
    const y = 30 + rowIdx * (NODE_H + LEVEL_GAP_Y) + NODE_H / 2;
    return `<text x="8" y="${y}" font-size="10" fill="${PALETTE.muted}" font-weight="600" writing-mode="vertical-rl" text-orientation="mixed" opacity="0.6">${labels[order] ?? `${order}th Order`}</text>`;
  }).join('');

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" style="font-family:Inter,system-ui,sans-serif;max-width:100%">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="${PALETTE.primary}" opacity="0.7" />
        </marker>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="white" rx="8"/>
      ${levelLabels}
      ${edgePaths}
      ${nodeRects}
    </svg>
  `;
}

// ── Risk Heatmap SVG ────────────────────────────────────────────────────────

function generateRiskHeatmapSVG(nodes: SCLEffectNode[]): string {
  if (nodes.length === 0) return '';
  const negativeNodes = nodes.filter(n => n.impact < 0).sort((a, b) => a.impact - b.impact);
  const positiveNodes = nodes.filter(n => n.impact > 0).sort((a, b) => b.impact - a.impact);

  const WIDTH = 780;
  const BAR_HEIGHT = 28;
  const GAP = 6;
  const all = [...negativeNodes, ...positiveNodes];
  if (all.length === 0) return '';
  const HEIGHT = all.length * (BAR_HEIGHT + GAP) + 60;
  const maxAbs = Math.max(...all.map(n => Math.abs(n.impact)), 1);

  const bars = all.map((n, i) => {
    const y = 40 + i * (BAR_HEIGHT + GAP);
    const barWidth = (Math.abs(n.impact) / maxAbs) * 340;
    const isNeg = n.impact < 0;
    const barX = isNeg ? 390 - barWidth : 390;
    const color = isNeg ? PALETTE.danger : PALETTE.success;
    const title = n.title.length > 32 ? n.title.slice(0, 30) + '…' : n.title;
    const labelX = isNeg ? 394 + 8 : 390 - 8;
    const anchor = isNeg ? 'start' : 'end';
    return `
      <g>
        <rect x="${barX}" y="${y}" width="${barWidth}" height="${BAR_HEIGHT}" rx="4" fill="${color}" opacity="${0.2 + n.confidence * 0.6}"/>
        <text x="${labelX}" y="${y + 18}" font-size="11" fill="${PALETTE.text}" text-anchor="${anchor}" font-weight="500">${title}</text>
        <text x="${isNeg ? barX - 4 : barX + barWidth + 4}" y="${y + 18}" font-size="11" fill="${color}" font-weight="700" text-anchor="${isNeg ? 'end' : 'start'}">${n.impact > 0 ? '+' : ''}${n.impact}</text>
      </g>
    `;
  }).join('');

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" style="font-family:Inter,system-ui,sans-serif;max-width:100%">
      <rect width="${WIDTH}" height="${HEIGHT}" fill="white" rx="8"/>
      <line x1="390" y1="30" x2="390" y2="${HEIGHT - 10}" stroke="${PALETTE.border}" stroke-width="1" stroke-dasharray="4"/>
      <text x="200" y="22" font-size="11" fill="${PALETTE.danger}" font-weight="600" text-anchor="middle">← NEGATIVE IMPACT</text>
      <text x="580" y="22" font-size="11" fill="${PALETTE.success}" font-weight="600" text-anchor="middle">POSITIVE IMPACT →</text>
      ${bars}
    </svg>
  `;
}

// ── Score Gauge SVG ─────────────────────────────────────────────────────────

function generateScoreGaugeSVG(label: string, value: number, sublabel?: string): string {
  const color = gaugeColor(value);
  const pct = Math.round(value * 100);
  return `
    <svg width="120" height="90" viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg" style="font-family:Inter,system-ui,sans-serif">
      <path d="${gaugeArc(1)}" fill="none" stroke="#e2e8f0" stroke-width="8" stroke-linecap="round"/>
      <path d="${gaugeArc(value)}" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
      <text x="50" y="52" text-anchor="middle" font-size="20" font-weight="700" fill="${color}">${pct}</text>
      <text x="50" y="68" text-anchor="middle" font-size="9" fill="${PALETTE.muted}">${label}</text>
      ${sublabel ? `<text x="50" y="80" text-anchor="middle" font-size="8" fill="${PALETTE.muted}">${sublabel}</text>` : ''}
    </svg>
  `;
}

// ── Main Report Generator ───────────────────────────────────────────────────

export function generateExecutiveReportHTML(session: SCLSessionType): string {
  const { effectGraph, synthesis, leaps, score, deepDives, mode, seeds, constraints, audit } = session;
  const nodes = effectGraph.nodes;
  const edges = effectGraph.edges;
  const modeLabel = mode.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // Summary stats
  const totalEffects = nodes.length;
  const firstOrder = nodes.filter(n => n.order === 1).length;
  const higherOrder = nodes.filter(n => n.order >= 2).length;
  const avgConfidence = nodes.length > 0 ? nodes.reduce((s, n) => s + n.confidence, 0) / nodes.length : 0;
  const avgImpact = nodes.length > 0 ? nodes.reduce((s, n) => s + n.impact, 0) / nodes.length : 0;
  const riskCount = synthesis.risks.length;
  const oppCount = synthesis.opportunities.length;
  const overallScore = Object.values(score).reduce((sum, val) => sum + (val as number), 0) / Object.keys(score).length;

  // Domain distribution for mini pie
  const domainCounts: Record<string, number> = {};
  nodes.forEach(n => { domainCounts[n.domain] = (domainCounts[n.domain] || 0) + 1; });

  // Deep dive data
  const hasSecondary = deepDives?.some(d => d.level === 'secondary') ?? false;
  const hasTertiary = deepDives?.some(d => d.level === 'tertiary') ?? false;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>SCL Executive Report – ${modeLabel} Analysis</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      color: ${PALETTE.text};
      background: ${PALETTE.bg};
      line-height: 1.6;
      font-size: 14px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    @page {
      size: A4;
      margin: 0.6in 0.5in;
    }

    @media print {
      body { font-size: 11pt; }
      .no-print { display: none !important; }
      .page-break { page-break-before: always; }
      .avoid-break { page-break-inside: avoid; break-inside: avoid; }
      section { page-break-inside: avoid; }
    }

    .container { max-width: 820px; margin: 0 auto; padding: 0 20px; }

    /* ── Cover / Header ─────────────────────────── */
    .report-cover {
      background: linear-gradient(135deg, ${PALETTE.primary} 0%, ${PALETTE.accent} 100%);
      color: white;
      padding: 40px 0;
      margin-bottom: 32px;
    }
    .report-cover .container { display: flex; justify-content: space-between; align-items: center; }
    .report-cover h1 { font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
    .report-cover .subtitle { font-size: 16px; opacity: 0.9; margin-top: 4px; font-weight: 400; }
    .report-cover .meta { text-align: right; font-size: 13px; opacity: 0.85; }
    .report-cover .meta .mode-badge {
      display: inline-block; padding: 4px 14px; border-radius: 20px;
      background: rgba(255,255,255,0.2); font-weight: 600; margin-bottom: 6px;
    }

    /* ── Section Headings ───────────────────────── */
    .section-header {
      display: flex; align-items: center; gap: 10px;
      margin: 32px 0 16px; padding-bottom: 10px;
      border-bottom: 2px solid ${PALETTE.border};
    }
    .section-header .icon { color: ${PALETTE.primary}; flex-shrink: 0; }
    .section-header h2 { font-size: 18px; font-weight: 700; color: ${PALETTE.text}; }
    .section-header .count {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 24px; height: 24px; border-radius: 12px; font-size: 12px; font-weight: 700;
      background: ${PALETTE.primary}15; color: ${PALETTE.primary}; padding: 0 8px;
    }

    /* ── Dashboard Grid ─────────────────────────── */
    .dashboard { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
    .stat-card {
      background: ${PALETTE.cardBg}; border: 1px solid ${PALETTE.border}; border-radius: 12px;
      padding: 16px; text-align: center;
    }
    .stat-card .value { font-size: 28px; font-weight: 800; color: ${PALETTE.primary}; }
    .stat-card .label { font-size: 12px; color: ${PALETTE.muted}; font-weight: 500; margin-top: 4px; }
    .stat-card.risk .value { color: ${PALETTE.warning}; }
    .stat-card.danger .value { color: ${PALETTE.danger}; }
    .stat-card.success .value { color: ${PALETTE.success}; }

    /* ── Gauge Row ──────────────────────────────── */
    .gauge-row { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin: 16px 0 24px; background: ${PALETTE.cardBg}; border-radius: 12px; padding: 20px; border: 1px solid ${PALETTE.border}; }
    .gauge-item { text-align: center; }

    /* ── Cards ──────────────────────────────────── */
    .card { background: ${PALETTE.cardBg}; border: 1px solid ${PALETTE.border}; border-radius: 12px; padding: 16px; margin-bottom: 12px; }
    .card-bordered-left { border-left: 4px solid; }
    .card h4 { font-size: 14px; font-weight: 600; margin-bottom: 8px; }

    /* ── Effect Cards ──────────────────────────── */
    .effect-card {
      display: flex; gap: 12px; padding: 14px; border: 1px solid ${PALETTE.border};
      border-radius: 10px; margin-bottom: 8px; background: white;
      page-break-inside: avoid;
    }
    .effect-card .order-indicator {
      width: 4px; border-radius: 4px; flex-shrink: 0;
    }
    .effect-body { flex: 1; min-width: 0; }
    .effect-title { font-weight: 600; font-size: 13px; margin-bottom: 4px; }
    .effect-meta { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-bottom: 6px; }
    .effect-justification { font-size: 12px; color: ${PALETTE.textSecondary}; line-height: 1.5; }
    .effect-stats { display: flex; gap: 16px; font-size: 11px; color: ${PALETTE.muted}; margin-top: 6px; }
    .effect-stats strong { font-weight: 700; }
    .effect-stats .positive { color: ${PALETTE.success}; }
    .effect-stats .negative { color: ${PALETTE.danger}; }

    /* ── Leap/Warning Cards ────────────────────── */
    .leap-card {
      border: 1px solid ${PALETTE.danger}40; background: ${PALETTE.danger}08;
      border-radius: 10px; padding: 16px; margin-bottom: 10px; border-left: 4px solid ${PALETTE.danger};
      page-break-inside: avoid;
    }
    .leap-card h4 { color: ${PALETTE.danger}; font-size: 14px; }
    .leap-card .mechanism { font-size: 12px; color: ${PALETTE.textSecondary}; font-style: italic; margin-top: 6px; }

    /* ── List Items ─────────────────────────────── */
    .list-item { display: flex; gap: 8px; align-items: flex-start; padding: 6px 0; font-size: 13px; }
    .list-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
    .list-number {
      width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 700; flex-shrink: 0; color: white;
    }

    /* ── Tables ─────────────────────────────────── */
    .data-table { width: 100%; border-collapse: collapse; font-size: 12px; margin: 12px 0; }
    .data-table th { background: ${PALETTE.cardBg}; text-align: left; padding: 10px 12px; font-weight: 600; color: ${PALETTE.muted}; border-bottom: 2px solid ${PALETTE.border}; }
    .data-table td { padding: 10px 12px; border-bottom: 1px solid ${PALETTE.border}; vertical-align: top; }
    .data-table tr:hover { background: ${PALETTE.primary}05; }
    .rpn-high { color: ${PALETTE.danger}; font-weight: 700; }
    .rpn-med { color: ${PALETTE.warning}; font-weight: 600; }
    .rpn-low { color: ${PALETTE.success}; }

    /* ── Domain Distribution Inline ─────────────── */
    .domain-strip { display: flex; border-radius: 6px; overflow: hidden; height: 20px; margin: 8px 0; }
    .domain-strip div { transition: width 0.3s; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; color: white; }

    /* ── Connection List ────────────────────────── */
    .connection-item {
      display: flex; align-items: center; gap: 8px; padding: 8px 12px;
      border: 1px solid ${PALETTE.border}; border-radius: 8px; margin-bottom: 6px; font-size: 12px;
      background: white; page-break-inside: avoid;
    }
    .connection-arrow { color: ${PALETTE.primary}; font-weight: 700; font-size: 16px; }
    .connection-mechanism { color: ${PALETTE.muted}; font-size: 11px; font-style: italic; }

    /* ── Footer ─────────────────────────────────── */
    .report-footer {
      margin-top: 40px; padding-top: 16px; border-top: 1px solid ${PALETTE.border};
      text-align: center; font-size: 11px; color: ${PALETTE.muted};
    }

    /* ── Print button ──────────────────────────── */
    .print-bar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: white; border-bottom: 1px solid ${PALETTE.border};
      padding: 10px 20px; display: flex; justify-content: flex-end; gap: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .btn {
      padding: 8px 20px; border-radius: 8px; font-size: 13px; font-weight: 600;
      cursor: pointer; border: none; transition: all 0.2s;
    }
    .btn-primary { background: ${PALETTE.primary}; color: white; }
    .btn-primary:hover { background: ${PALETTE.primaryDark}; }
    .btn-outline { background: white; color: ${PALETTE.text}; border: 1px solid ${PALETTE.border}; }
    .btn-outline:hover { background: ${PALETTE.cardBg}; }
    .spacer-top { height: 56px; }
  </style>
</head>
<body>
  <!-- Print controls -->
  <div class="print-bar no-print">
    <button class="btn btn-outline" onclick="window.close()">Close</button>
    <button class="btn btn-primary" onclick="window.print()">🖨️ Print / Save PDF</button>
  </div>
  <div class="spacer-top no-print"></div>

  <!-- Cover -->
  <div class="report-cover">
    <div class="container">
      <div>
        <h1>Super Critical Learning</h1>
        <div class="subtitle">Executive Analysis Report</div>
      </div>
      <div class="meta">
        <div class="mode-badge">${modeLabel} Analysis</div>
        <div>${date} · ${time}</div>
        <div style="margin-top:4px;font-size:12px;opacity:0.7">Session ${session.id.slice(0, 8)}</div>
      </div>
    </div>
  </div>

  <div class="container">

    <!-- ═══════════════ EXECUTIVE SUMMARY ═══════════════ -->
    <div class="section-header">
      <span class="icon">${SVG_ICONS.chartBar}</span>
      <h2>Executive Summary</h2>
    </div>

    <div class="dashboard">
      <div class="stat-card">
        <div class="value">${totalEffects}</div>
        <div class="label">Total Effects</div>
      </div>
      <div class="stat-card">
        <div class="value">${edges.length}</div>
        <div class="label">Connections</div>
      </div>
      <div class="stat-card risk">
        <div class="value">${riskCount}</div>
        <div class="label">Identified Risks</div>
      </div>
      <div class="stat-card success">
        <div class="value">${oppCount}</div>
        <div class="label">Opportunities</div>
      </div>
    </div>

    <!-- Sub-stats row -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px">
      <div class="card" style="text-align:center">
        <div style="font-size:22px;font-weight:700;color:${PALETTE.primary}">${firstOrder}</div>
        <div style="font-size:11px;color:${PALETTE.muted}">1st Order Effects</div>
      </div>
      <div class="card" style="text-align:center">
        <div style="font-size:22px;font-weight:700;color:${PALETTE.accent}">${higherOrder}</div>
        <div style="font-size:11px;color:${PALETTE.muted}">Higher-Order Effects</div>
      </div>
      <div class="card" style="text-align:center">
        <div style="font-size:22px;font-weight:700;color:${PALETTE.danger}">${leaps.length}</div>
        <div style="font-size:11px;color:${PALETTE.muted}">Critical Leaps</div>
      </div>
    </div>

    <!-- Domain Distribution Bar -->
    <div class="card">
      <h4 style="margin-bottom:8px;font-size:13px">Domain Distribution</h4>
      <div class="domain-strip">
        ${Object.entries(domainCounts).map(([domain, count]) => {
          const d = DOMAIN_COLORS[domain] ?? { bg: '#94a3b8', text: '#334155', border: '#94a3b8' };
          const pct = (count / totalEffects) * 100;
          return `<div style="width:${pct}%;background:${d.text}" title="${domain}: ${count}">${pct >= 10 ? `${domain} (${count})` : ''}</div>`;
        }).join('')}
      </div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px">
        ${Object.entries(domainCounts).map(([domain, count]) => {
          const d = DOMAIN_COLORS[domain] ?? { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' };
          return `<span style="display:flex;align-items:center;gap:4px;font-size:11px"><span style="width:10px;height:10px;border-radius:3px;background:${d.text}"></span>${domain}: ${count}</span>`;
        }).join('')}
      </div>
    </div>

    <!-- Score Gauges -->
    <div class="gauge-row">
      ${generateScoreGaugeSVG('Overall', overallScore)}
      ${generateScoreGaugeSVG('Complete', score.completeness)}
      ${generateScoreGaugeSVG('Novelty', score.novelty)}
      ${generateScoreGaugeSVG('Feasibility', score.feasibility)}
      ${generateScoreGaugeSVG('Leap Quality', score.leapDetection)}
    </div>

    <!-- ═══════════════ DEPENDENCY GRAPH ═══════════════ -->
    <div class="page-break"></div>
    <div class="section-header">
      <span class="icon">${SVG_ICONS.network}</span>
      <h2>Effect Dependency Graph</h2>
    </div>
    <div class="card" style="padding:20px;overflow-x:auto">
      ${generateDependencyGraphSVG(nodes, edges)}
    </div>

    ${edges.length > 0 ? `
    <div style="margin-top:16px">
      <h4 style="font-size:13px;color:${PALETTE.muted};margin-bottom:8px">Connections Detail</h4>
      ${edges.map(e => {
        const fromNode = nodes.find(n => n.id === e.from);
        const toNode = nodes.find(n => n.id === e.to);
        if (!fromNode || !toNode) return '';
        return `<div class="connection-item">
          <span style="font-weight:600;font-size:12px">${fromNode.title}</span>
          <span class="connection-arrow">→</span>
          <span style="font-weight:600;font-size:12px">${toNode.title}</span>
          ${confidenceBadge(e.confidence)}
          ${e.mechanism ? `<span class="connection-mechanism">${e.mechanism}</span>` : ''}
        </div>`;
      }).join('')}
    </div>
    ` : ''}

    <!-- ═══════════════ IMPACT ANALYSIS ═══════════════ -->
    <div class="page-break"></div>
    <div class="section-header">
      <span class="icon">${SVG_ICONS.trendUp}</span>
      <h2>Impact Analysis</h2>
    </div>
    <div class="card" style="padding:20px;overflow-x:auto">
      ${generateRiskHeatmapSVG(nodes)}
    </div>

    <!-- ═══════════════ EFFECTS DETAIL ═══════════════ -->
    <div class="page-break"></div>
    <div class="section-header">
      <span class="icon">${SVG_ICONS.lightning}</span>
      <h2>Effects Catalogue</h2>
      <span class="count">${totalEffects}</span>
    </div>

    ${[1, 2, 3].map(order => {
      const orderNodes = nodes.filter(n => n.order === order);
      if (orderNodes.length === 0) return '';
      const labels: Record<number, string> = { 1: 'First-Order Effects', 2: 'Higher-Order Effects', 3: 'Tertiary Effects' };
      const colors: Record<number, string> = { 1: PALETTE.primary, 2: PALETTE.accent, 3: PALETTE.danger };
      return `
        <h3 style="font-size:15px;color:${colors[order]};margin:20px 0 10px;display:flex;align-items:center;gap:8px">
          <span style="width:8px;height:8px;border-radius:4px;background:${colors[order]}"></span>
          ${labels[order]} (${orderNodes.length})
        </h3>
        ${orderNodes.map(n => `
          <div class="effect-card avoid-break">
            <div class="order-indicator" style="background:${colors[n.order]}"></div>
            <div class="effect-body">
              <div class="effect-title">${n.title}</div>
              <div class="effect-meta">
                ${domainBadge(n.domain)}
                ${orderBadge(n.order)}
                ${confidenceBadge(n.confidence)}
              </div>
              <div class="effect-justification">${n.justification}</div>
              <div class="effect-stats">
                <span>Impact: <strong class="${n.impact >= 0 ? 'positive' : 'negative'}">${n.impact > 0 ? '+' : ''}${n.impact}</strong></span>
                <span>Likelihood: <strong>${Math.round(n.likelihood * 100)}%</strong></span>
                <span>Confidence: <strong>${Math.round(n.confidence * 100)}%</strong></span>
              </div>
            </div>
          </div>
        `).join('')}
      `;
    }).join('')}

    <!-- ═══════════════ CRITICAL DISCONTINUITIES ═══════════════ -->
    ${leaps.length > 0 ? `
    <div class="page-break"></div>
    <div class="section-header">
      <span class="icon" style="color:${PALETTE.danger}">${SVG_ICONS.warning}</span>
      <h2>Critical Discontinuities (Leaps)</h2>
      <span class="count" style="background:${PALETTE.danger}15;color:${PALETTE.danger}">${leaps.length}</span>
    </div>
    ${leaps.map(leap => `
      <div class="leap-card avoid-break">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <span style="color:${PALETTE.danger}">${SVG_ICONS.warning}</span>
          <h4>${leap.trigger}</h4>
          ${confidenceBadge(leap.confidence)}
        </div>
        <div style="font-size:13px;margin-bottom:6px"><strong>Threshold:</strong> ${leap.threshold}</div>
        <div style="font-size:13px;margin-bottom:6px"><strong>Result:</strong> ${leap.result}</div>
        <div class="mechanism"><strong>Mechanism:</strong> ${leap.mechanism}</div>
      </div>
    `).join('')}
    ` : ''}

    <!-- ═══════════════ RISKS ═══════════════ -->
    ${synthesis.risks.length > 0 ? `
    <div class="section-header">
      <span class="icon" style="color:${PALETTE.warning}">${SVG_ICONS.shield}</span>
      <h2>Key Risks</h2>
      <span class="count" style="background:${PALETTE.warning}15;color:${PALETTE.warning}">${synthesis.risks.length}</span>
    </div>
    <div class="card">
      ${synthesis.risks.map(r => `
        <div class="list-item">
          <div class="list-dot" style="background:${PALETTE.warning}"></div>
          <span>${r}</span>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- ═══════════════ OPPORTUNITIES ═══════════════ -->
    ${synthesis.opportunities.length > 0 ? `
    <div class="section-header">
      <span class="icon" style="color:${PALETTE.success}">${SVG_ICONS.lightbulb}</span>
      <h2>Opportunities</h2>
      <span class="count" style="background:${PALETTE.success}15;color:${PALETTE.success}">${synthesis.opportunities.length}</span>
    </div>
    <div class="card">
      ${synthesis.opportunities.map(o => `
        <div class="list-item">
          <div class="list-dot" style="background:${PALETTE.success}"></div>
          <span>${o}</span>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- ═══════════════ RECOMMENDED PRACTICES ═══════════════ -->
    ${synthesis.recommendedPractices.length > 0 ? `
    <div class="section-header">
      <span class="icon">${SVG_ICONS.target}</span>
      <h2>Recommended Practice Changes</h2>
    </div>
    <div class="card">
      ${synthesis.recommendedPractices.map(p => `
        <div class="list-item">
          <span style="color:${PALETTE.primary};font-size:16px;margin-top:2px;flex-shrink:0">→</span>
          <span>${p}</span>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- ═══════════════ KPIs ═══════════════ -->
    ${synthesis.kpis.length > 0 ? `
    <div class="section-header">
      <span class="icon">${SVG_ICONS.chartBar}</span>
      <h2>Key Performance Indicators</h2>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      ${synthesis.kpis.map(kpi => `
        <div class="card" style="display:flex;align-items:center;gap:10px">
          <span style="color:${PALETTE.primary}">${SVG_ICONS.target}</span>
          <span style="font-size:13px">${kpi}</span>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- ═══════════════ ACTION PLAN ═══════════════ -->
    ${synthesis.actionPlan.length > 0 ? `
    <div class="page-break"></div>
    <div class="section-header">
      <span class="icon">${SVG_ICONS.checkCircle}</span>
      <h2>Implementation Action Plan</h2>
    </div>
    <div class="card">
      ${synthesis.actionPlan.map((action, i) => `
        <div class="list-item" style="padding:8px 0">
          <div class="list-number" style="background:${PALETTE.primary}">${i + 1}</div>
          <span style="font-size:13px">${action}</span>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- ═══════════════ DEEP DIVE FINDINGS ═══════════════ -->
    ${(deepDives ?? []).length > 0 ? `
    <div class="page-break"></div>
    <div class="section-header">
      <span class="icon">${SVG_ICONS.lightning}</span>
      <h2>Deep Dive Findings</h2>
      <span class="count">${(deepDives ?? []).length}</span>
    </div>

    ${(deepDives ?? []).map(dive => {
      const isSecondary = dive.findings.kind === 'secondary';
      const levelColor = isSecondary ? PALETTE.primary : PALETTE.accent;
      return `
      <div class="card avoid-break" style="border-left:4px solid ${levelColor};margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
          <span style="display:inline-block;padding:3px 12px;border-radius:12px;font-size:12px;font-weight:700;background:${levelColor}15;color:${levelColor};text-transform:capitalize">${dive.level}</span>
          <span style="font-size:13px;font-weight:600">${dive.selectedNodes.map(n => n.title).join(' + ')}</span>
        </div>
        ${dive.userQuestion ? `<div style="font-size:12px;color:${PALETTE.muted};font-style:italic;margin-bottom:10px">Focus: "${dive.userQuestion}"</div>` : ''}

        ${dive.effects.length > 0 ? `
          <h4 style="font-size:13px;margin-bottom:8px;color:${levelColor}">Sub-Effects (${dive.effects.length})</h4>
          ${dive.effects.map(eff => `
            <div style="display:flex;gap:8px;align-items:flex-start;padding:6px 0;font-size:12px;border-bottom:1px solid ${PALETTE.border}">
              ${domainBadge(eff.domain)}
              <span style="flex:1">${eff.title}</span>
              <span style="color:${eff.impact >= 0 ? PALETTE.success : PALETTE.danger};font-weight:700">${eff.impact > 0 ? '+' : ''}${eff.impact}</span>
            </div>
          `).join('')}
        ` : ''}

        ${isSecondary ? (() => {
          const f = dive.findings as SecondaryFindings;
          return `
            ${f.hiddenRisks.length > 0 ? `
              <h4 style="font-size:13px;margin:12px 0 6px;color:${PALETTE.warning}">⚠️ Hidden Risks</h4>
              ${f.hiddenRisks.map(r => `<div class="list-item"><div class="list-dot" style="background:${PALETTE.warning}"></div><span style="font-size:12px">${r}</span></div>`).join('')}
            ` : ''}
            ${f.crossConnections.length > 0 ? `
              <h4 style="font-size:13px;margin:12px 0 6px;color:${PALETTE.primary}">🔗 Cross-Connections</h4>
              ${f.crossConnections.map(c => `<div class="list-item"><div class="list-dot" style="background:${PALETTE.primary}"></div><span style="font-size:12px">${c}</span></div>`).join('')}
            ` : ''}
            ${f.implementationSteps.length > 0 ? `
              <h4 style="font-size:13px;margin:12px 0 6px;color:${PALETTE.primary}">📋 Implementation Steps</h4>
              ${f.implementationSteps.map((s, i) => `<div class="list-item"><div class="list-number" style="background:${PALETTE.primary};width:20px;height:20px;font-size:10px">${i + 1}</div><span style="font-size:12px">${s}</span></div>`).join('')}
            ` : ''}
            ${f.revisedKPIs.length > 0 ? `
              <h4 style="font-size:13px;margin:12px 0 6px;color:${PALETTE.accent}">📊 Revised KPIs</h4>
              ${f.revisedKPIs.map(k => `<div class="list-item"><div class="list-dot" style="background:${PALETTE.accent}"></div><span style="font-size:12px">${k}</span></div>`).join('')}
            ` : ''}
          `;
        })() : ''}

        ${!isSecondary ? (() => {
          const f = dive.findings as TertiaryFindings;
          return `
            ${f.runbook.length > 0 ? `
              <h4 style="font-size:13px;margin:12px 0 6px;color:${PALETTE.primary}">📋 Operational Runbook</h4>
              ${f.runbook.map((step, i) => `<div class="list-item"><div class="list-number" style="background:${PALETTE.primary};width:20px;height:20px;font-size:10px">${i + 1}</div><span style="font-size:12px">${step}</span></div>`).join('')}
            ` : ''}

            ${f.toolRecommendations.length > 0 ? `
              <h4 style="font-size:13px;margin:12px 0 6px;color:${PALETTE.primary}">🔧 Tool Recommendations</h4>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                ${f.toolRecommendations.map(rec => `
                  <div style="padding:10px;border:1px solid ${PALETTE.border};border-radius:8px;font-size:12px;background:white">
                    <div style="font-weight:700">${rec.tool}</div>
                    <div style="color:${PALETTE.textSecondary};margin-top:4px">${rec.purpose}</div>
                    <div style="color:${PALETTE.muted};font-style:italic;margin-top:4px;font-size:11px">Tradeoffs: ${rec.tradeoffs}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${f.fmeaEntries.length > 0 ? `
              <h4 style="font-size:13px;margin:12px 0 6px;color:${PALETTE.danger}">🛡️ Failure Mode Analysis (FMEA)</h4>
              <table class="data-table">
                <thead>
                  <tr><th>Failure Mode</th><th>Cause</th><th style="text-align:center">S</th><th style="text-align:center">L</th><th style="text-align:center">D</th><th style="text-align:center">RPN</th><th>Mitigation</th></tr>
                </thead>
                <tbody>
                  ${f.fmeaEntries.map(e => `
                    <tr>
                      <td style="font-weight:600">${e.failureMode}</td>
                      <td style="color:${PALETTE.textSecondary}">${e.cause}</td>
                      <td style="text-align:center">${e.severity}</td>
                      <td style="text-align:center">${e.likelihood}</td>
                      <td style="text-align:center">${e.detection}</td>
                      <td style="text-align:center" class="${e.rpn >= 200 ? 'rpn-high' : e.rpn >= 100 ? 'rpn-med' : 'rpn-low'}">${e.rpn}</td>
                      <td style="color:${PALETTE.textSecondary}">${e.mitigation}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              <div style="font-size:10px;color:${PALETTE.muted};margin-top:4px">S = Severity, L = Likelihood, D = Detection difficulty (1–10). RPN = S × L × D. Higher = higher priority.</div>
            ` : ''}

            ${f.projections.length > 0 ? `
              <h4 style="font-size:13px;margin:12px 0 6px;color:${PALETTE.primary}">📈 Quantitative Projections</h4>
              <table class="data-table">
                <thead>
                  <tr><th>Metric</th><th>Baseline</th><th>Projected</th><th>Timeframe</th><th style="text-align:center">Confidence</th></tr>
                </thead>
                <tbody>
                  ${f.projections.map(p => `
                    <tr>
                      <td style="font-weight:600">${p.metric}</td>
                      <td style="color:${PALETTE.muted}">${p.baseline}</td>
                      <td>${p.projected}</td>
                      <td style="color:${PALETTE.muted}">${p.timeframe}</td>
                      <td style="text-align:center">${confidenceBadge(p.confidence)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            ` : ''}

            ${f.mitigationComparison.length > 0 ? `
              <h4 style="font-size:13px;margin:12px 0 6px;color:${PALETTE.primary}">⚖️ Mitigation Strategy Comparison</h4>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                ${f.mitigationComparison.map(m => {
                  const effortColor = m.effort === 'high' ? PALETTE.danger : m.effort === 'medium' ? PALETTE.warning : PALETTE.success;
                  const impactColor2 = m.impact === 'high' ? PALETTE.success : m.impact === 'medium' ? PALETTE.warning : PALETTE.danger;
                  return `
                    <div style="padding:10px;border:1px solid ${PALETTE.border};border-radius:8px;font-size:12px;background:white">
                      <div style="font-weight:700;margin-bottom:4px">${m.strategy}</div>
                      <div style="display:flex;gap:12px;font-size:11px">
                        <span>Effort: <strong style="color:${effortColor}">${m.effort}</strong></span>
                        <span>Impact: <strong style="color:${impactColor2}">${m.impact}</strong></span>
                      </div>
                      <div style="font-size:11px;color:${PALETTE.muted};margin-top:4px">Time to value: ${m.timeToValue}</div>
                      ${m.risks ? `<div style="font-size:11px;color:${PALETTE.muted};font-style:italic;margin-top:2px">Risks: ${m.risks}</div>` : ''}
                    </div>
                  `;
                }).join('')}
              </div>
            ` : ''}
          `;
        })() : ''}
      </div>
      `;
    }).join('')}
    ` : ''}

    <!-- ═══════════════ SESSION METADATA ═══════════════ -->
    <div class="section-header" style="margin-top:40px">
      <span class="icon" style="color:${PALETTE.muted}">${SVG_ICONS.trophy}</span>
      <h2 style="color:${PALETTE.muted}">Session Metadata</h2>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:12px;color:${PALETTE.textSecondary}">
      <div class="card">
        <div style="font-weight:600;margin-bottom:8px;color:${PALETTE.text}">Analysis Configuration</div>
        <div><strong>Mode:</strong> ${modeLabel}</div>
        <div><strong>Seeds:</strong> ${seeds.conceptIds.join(', ') || 'None'}</div>
        <div><strong>Patterns:</strong> ${seeds.patternIds.join(', ') || 'None'}</div>
        <div><strong>Practices:</strong> ${seeds.practices.join(', ') || 'None'}</div>
        <div><strong>Budget:</strong> ${constraints.budget}</div>
        <div><strong>Time Horizon:</strong> ${constraints.timeHorizon}</div>
      </div>
      <div class="card">
        <div style="font-weight:600;margin-bottom:8px;color:${PALETTE.text}">Generation Details</div>
        <div><strong>Model:</strong> ${audit.model || 'N/A'}</div>
        <div><strong>SCL Version:</strong> ${audit.version || 'N/A'}</div>
        <div><strong>Prompt Tokens:</strong> ${audit.promptTokens?.toLocaleString() ?? 'N/A'}</div>
        <div><strong>Response Tokens:</strong> ${audit.responseTokens?.toLocaleString() ?? 'N/A'}</div>
        <div><strong>Deep Dives:</strong> ${(deepDives ?? []).length} (${hasSecondary ? '✓ secondary' : ''}${hasTertiary ? ' ✓ tertiary' : ''})</div>
        <div><strong>Source:</strong> ${session.source ?? 'local'}</div>
      </div>
    </div>

    <!-- Footer -->
    <div class="report-footer">
      <div style="font-weight:600;margin-bottom:4px">Open Agent School</div>
      <div>openagentschool.org · Super Critical Learning Executive Report</div>
      <div style="margin-top:4px">Generated ${date} at ${time} · Session ${session.id}</div>
    </div>

  </div>
</body>
</html>`;
}

// ── Public API ──────────────────────────────────────────────────────────────

export function openExecutiveReport(session: SCLSessionType): void {
  const html = generateExecutiveReportHTML(session);
  const reportWindow = window.open('', '_blank');
  if (reportWindow) {
    reportWindow.document.write(html);
    reportWindow.document.close();
    reportWindow.focus();
  }
}
