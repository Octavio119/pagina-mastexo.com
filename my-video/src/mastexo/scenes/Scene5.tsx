import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { GOLD, TEAL, TEXT, GREEN, BG, CARD, BORDER, FONT_CG, FONT_DM, FONT_SM, FADE_OUT_F } from '../constants';

// ─── helpers ──────────────────────────────────────────
function fi(frame: number, start: number, dur = 14) {
  return interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
}

// ─── Line Chart (SVG) ─────────────────────────────────
// Data: Ene-Ago reservations
const DATA = [22, 25, 28, 35, 52, 68, 80, 94];
const LABELS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'];
const CW = 900, CH = 240; // chart dimensions
const PAD = { t: 20, r: 20, b: 40, l: 44 };
const YMAX = 110;

function getPoint(i: number, val: number) {
  const innerW = CW - PAD.l - PAD.r;
  const innerH = CH - PAD.t - PAD.b;
  const x = PAD.l + (i / (DATA.length - 1)) * innerW;
  const y = PAD.t + innerH - (val / YMAX) * innerH;
  return { x, y };
}

const POINTS = DATA.map((v, i) => getPoint(i, v));
const polyline = POINTS.map((p) => `${p.x},${p.y}`).join(' ');
const areaPath = [
  `M ${POINTS[0].x},${CH - PAD.b}`,
  ...POINTS.map((p) => `L ${p.x},${p.y}`),
  `L ${POINTS[POINTS.length - 1].x},${CH - PAD.b}`,
  'Z',
].join(' ');

const LineChart: React.FC<{ revealWidth: number }> = ({ revealWidth }) => (
  <svg width={CW} height={CH} style={{ overflow: 'visible' }}>
    <defs>
      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={GOLD} stopOpacity={0.28} />
        <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
      </linearGradient>
      <clipPath id="revealClip">
        <rect x={0} y={0} width={revealWidth} height={CH + 10} />
      </clipPath>
    </defs>

    {/* Y grid lines */}
    {[0, 25, 50, 75, 100].map((v) => {
      const y = PAD.t + (CH - PAD.t - PAD.b) - (v / YMAX) * (CH - PAD.t - PAD.b);
      return (
        <g key={v}>
          <line x1={PAD.l} y1={y} x2={CW - PAD.r} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
          <text x={PAD.l - 8} y={y + 4} textAnchor="end" fill="rgba(240,237,232,0.35)" fontSize={11} fontFamily={FONT_SM}>{v}</text>
        </g>
      );
    })}

    {/* X labels */}
    {POINTS.map((p, i) => (
      <text key={i} x={p.x} y={CH - PAD.b + 18} textAnchor="middle" fill="rgba(240,237,232,0.35)" fontSize={12} fontFamily={FONT_SM}>{LABELS[i]}</text>
    ))}

    {/* Area fill */}
    <path d={areaPath} fill="url(#areaGrad)" clipPath="url(#revealClip)" />

    {/* Line */}
    <polyline points={polyline} fill="none" stroke={GOLD} strokeWidth={2.5} strokeLinejoin="round" clipPath="url(#revealClip)" />

    {/* Dots */}
    {POINTS.map((p, i) => {
      const visible = p.x <= revealWidth;
      return visible ? (
        <circle key={i} cx={p.x} cy={p.y} r={5} fill={GOLD} stroke={BG} strokeWidth={2} />
      ) : null;
    })}
  </svg>
);

// ─── Doughnut Chart (SVG) ─────────────────────────────
const SEGMENTS = [
  { label: 'Instagram', pct: 38, color: GOLD },
  { label: 'Google', pct: 28, color: TEAL },
  { label: 'Web directa', pct: 22, color: '#60a5fa' },
  { label: 'WhatsApp', pct: 12, color: '#a78bfa' },
];
const DR = 120, DSW = 50, DC = 170;
const CIRC = 2 * Math.PI * DR;

const DoughnutChart: React.FC<{ progress: number }> = ({ progress }) => {
  let cumulative = 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <svg width={DC * 2} height={DC * 2} style={{ flexShrink: 0 }}>
        {/* Background ring */}
        <circle cx={DC} cy={DC} r={DR} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={DSW} />
        {SEGMENTS.map((seg) => {
          const segLen = (CIRC * seg.pct) / 100 * progress;
          const offset = CIRC - CIRC * (cumulative / 100) - CIRC / 4;
          const el = (
            <circle
              key={seg.label}
              cx={DC} cy={DC} r={DR}
              fill="none"
              stroke={seg.color}
              strokeWidth={DSW}
              strokeDasharray={`${segLen} ${CIRC}`}
              strokeDashoffset={offset}
              style={{ transition: 'none' }}
            />
          );
          cumulative += seg.pct;
          return el;
        })}
        {/* Center text */}
        <text x={DC} y={DC - 8} textAnchor="middle" fill={TEXT} fontSize={28} fontFamily={FONT_CG} fontWeight={300}>Origen</text>
        <text x={DC} y={DC + 20} textAnchor="middle" fill="rgba(240,237,232,0.4)" fontSize={14} fontFamily={FONT_SM}>reservas</text>
      </svg>
      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {SEGMENTS.map((seg) => (
          <div key={seg.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: seg.color, flexShrink: 0 }} />
            <span style={{ fontFamily: FONT_SM, fontSize: 13, color: 'rgba(240,237,232,0.6)' }}>{seg.label} {seg.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Sidebar tabs ─────────────────────────────────────
const TABS = ['📊 Resumen','📅 Reservas','💰 Ingresos','🎯 Campañas','📱 Redes','📍 Maps','⭐ Reseñas'];

// ─── Main Scene ───────────────────────────────────────
export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const sceneOpacity = interpolate(frame, [durationInFrames - FADE_OUT_F, durationInFrames], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Animation timings (frames after scene start)
  const T_HEADER   = 0;
  const T_TABS     = 6;
  const T_KPI      = 12;
  const T_LINE     = 24;
  const T_DOUGHNUT = 30;
  const T_TABLES   = 39;

  // Chart animations
  const lineReveal = interpolate(frame, [T_LINE, T_LINE + 48], [0, CW], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2 });
  const doughnutProg = interpolate(frame, [T_DOUGHNUT, T_DOUGHNUT + 36], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => 1 - Math.pow(1 - t, 2) });

  // KPI count-ups
  const reservas   = Math.floor(interpolate(frame, [T_KPI, T_KPI + 40], [0, 94], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => 1 - Math.pow(1 - t, 3) }));
  const ingresos   = interpolate(frame, [T_KPI + 3, T_KPI + 43], [0, 2.8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => 1 - Math.pow(1 - t, 3) }).toFixed(1);
  const seguidores = Math.floor(interpolate(frame, [T_KPI + 6, T_KPI + 46], [0, 1240], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => 1 - Math.pow(1 - t, 3) }));
  const rating     = interpolate(frame, [T_KPI + 9, T_KPI + 49], [0, 4.9], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => 1 - Math.pow(1 - t, 3) }).toFixed(1);

  // Bar widths
  const barProg = interpolate(frame, [T_TABLES, T_TABLES + 36], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => 1 - Math.pow(1 - t, 2) });
  const BARS = [
    { name: 'Lomo saltado', pct: 94, color: GOLD },
    { name: 'Ceviche', pct: 78, color: TEAL },
    { name: 'Pollo asado', pct: 62, color: '#60a5fa' },
    { name: 'Pastel de choclo', pct: 48, color: '#a78bfa' },
  ];
  const CAMPAIGNS = [
    { name: 'Fin de semana VIP',  reach: '12,400', roi: '4.2×' },
    { name: 'Almuerzo ejecutivo', reach: '8,200',  roi: '3.8×' },
    { name: 'Reserva online',     reach: '6,800',  roi: '3.1×' },
    { name: 'Cumpleaños especial',reach: '4,100',  roi: '2.9×' },
  ];

  const cardStyle = (delay: number): React.CSSProperties => ({
    background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14,
    padding: '18px 22px',
    opacity: fi(frame, delay, 14),
    transform: `translateY(${interpolate(frame, [delay, delay + 18], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
  });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity, background: BG, flexDirection: 'column' }}>

      {/* ── HEADER ── */}
      <div style={{
        background: '#0e1420', borderBottom: `1px solid ${BORDER}`,
        padding: '0 28px', height: 76, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        opacity: fi(frame, T_HEADER, 14),
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            background: 'rgba(201,168,76,0.15)', border: `1px solid rgba(201,168,76,0.4)`,
            borderRadius: 8, padding: '6px 14px',
            fontFamily: FONT_SM, fontSize: 14, color: GOLD, letterSpacing: 1,
          }}>GASTROGROWTH</div>
          <div>
            <div style={{ fontFamily: FONT_DM, fontSize: 18, fontWeight: 500, color: TEXT }}>Restaurante Don Pedro</div>
            <div style={{ fontFamily: FONT_SM, fontSize: 11, color: 'rgba(240,237,232,0.3)' }}>Dashboard Premium · Powered by Mastexo</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ fontFamily: FONT_SM, fontSize: 12, color: 'rgba(240,237,232,0.4)' }}>Abril 2025 — hoy</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: FONT_SM, fontSize: 13, color: GREEN }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: GREEN }} />
            En vivo
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(201,168,76,0.18)', border: `1px solid ${GOLD}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: FONT_SM, fontSize: 14, color: GOLD,
          }}>DP</div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{
        background: '#0e1420', borderBottom: `1px solid ${BORDER}`,
        display: 'flex', padding: '0 20px', flexShrink: 0, gap: 4,
        opacity: fi(frame, T_TABS, 12),
      }}>
        {TABS.map((tab, i) => (
          <div key={tab} style={{
            padding: '14px 18px',
            fontFamily: FONT_SM, fontSize: 12,
            color: i === 0 ? GOLD : 'rgba(240,237,232,0.4)',
            borderBottom: i === 0 ? `2px solid ${GOLD}` : '2px solid transparent',
            whiteSpace: 'nowrap',
          }}>{tab}</div>
        ))}
      </div>

      {/* ── CONTENT ── */}
      <div style={{ flex: 1, overflow: 'hidden', padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[
            { label: 'RESERVAS MES',    val: `${reservas}`,      delta: '↑ 236%', delay: T_KPI },
            { label: 'INGRESOS ESTIM.',  val: `$${ingresos}M`,   delta: '↑ 189%', delay: T_KPI + 3 },
            { label: 'NUEVOS SEG.',     val: `${seguidores.toLocaleString('es-CL')}`, delta: '↑ 3.4×', delay: T_KPI + 6 },
            { label: 'SATISFACCIÓN',    val: `${rating}★`,       delta: '↑ 0.4',  delay: T_KPI + 9 },
          ].map((kpi) => (
            <div key={kpi.label} style={{
              ...cardStyle(kpi.delay),
              display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              <div style={{ fontFamily: FONT_SM, fontSize: 11, color: 'rgba(240,237,232,0.35)', letterSpacing: 1 }}>{kpi.label}</div>
              <div style={{ fontFamily: FONT_CG, fontSize: 48, fontWeight: 300, color: TEXT, lineHeight: 1 }}>{kpi.val}</div>
              <div style={{ fontFamily: FONT_SM, fontSize: 12, color: GREEN }}>{kpi.delta}</div>
            </div>
          ))}
        </div>

        {/* Line Chart */}
        <div style={cardStyle(T_LINE)}>
          <div style={{ fontFamily: FONT_DM, fontSize: 14, color: 'rgba(240,237,232,0.5)', marginBottom: 12 }}>Reservas mensuales</div>
          <LineChart revealWidth={lineReveal} />
        </div>

        {/* Doughnut */}
        <div style={cardStyle(T_DOUGHNUT)}>
          <div style={{ fontFamily: FONT_DM, fontSize: 14, color: 'rgba(240,237,232,0.5)', marginBottom: 14 }}>Origen de reservas</div>
          <DoughnutChart progress={doughnutProg} />
        </div>

        {/* Bar table — Platos */}
        <div style={cardStyle(T_TABLES)}>
          <div style={{ fontFamily: FONT_DM, fontSize: 14, color: 'rgba(240,237,232,0.5)', marginBottom: 14 }}>Platos más pedidos</div>
          {BARS.map((bar) => (
            <div key={bar.name} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ fontFamily: FONT_DM, fontSize: 14, color: TEXT, minWidth: 170 }}>{bar.name}</div>
              <div style={{ flex: 1, height: 7, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: bar.color, borderRadius: 4, width: `${bar.pct * barProg}%`, transition: 'none' }} />
              </div>
              <div style={{ fontFamily: FONT_SM, fontSize: 11, color: 'rgba(240,237,232,0.4)', minWidth: 36 }}>{bar.pct}%</div>
            </div>
          ))}
        </div>

        {/* Campaigns table */}
        <div style={cardStyle(T_TABLES + 6)}>
          <div style={{ fontFamily: FONT_DM, fontSize: 14, color: 'rgba(240,237,232,0.5)', marginBottom: 12 }}>Campañas Meta Ads</div>
          <div style={{ display: 'flex', fontFamily: FONT_SM, fontSize: 11, color: 'rgba(240,237,232,0.3)', paddingBottom: 8, borderBottom: `1px solid ${BORDER}`, marginBottom: 8 }}>
            <div style={{ flex: 3 }}>Campaña</div>
            <div style={{ flex: 2, textAlign: 'right' }}>Alcance</div>
            <div style={{ flex: 1, textAlign: 'right' }}>ROI</div>
          </div>
          {CAMPAIGNS.map((c, i) => (
            <div key={c.name} style={{
              display: 'flex', fontFamily: FONT_SM, fontSize: 12,
              paddingBottom: 10, marginBottom: 10,
              borderBottom: i < CAMPAIGNS.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none',
              opacity: fi(frame, T_TABLES + 8 + i * 5, 12),
            }}>
              <div style={{ flex: 3, color: TEXT }}>{c.name}</div>
              <div style={{ flex: 2, textAlign: 'right', color: 'rgba(240,237,232,0.4)' }}>{c.reach}</div>
              <div style={{ flex: 1, textAlign: 'right', color: GREEN }}>{c.roi}</div>
            </div>
          ))}
        </div>

      </div>
    </AbsoluteFill>
  );
};
