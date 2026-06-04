import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { GOLD, TEXT, TEAL, GREEN, CARD, BORDER_STRONG, FONT_CG, FONT_DM, FONT_SM, STAGGER, FADE_OUT_F } from '../constants';
import { SharedBg } from '../SharedBg';

// ── helpers ──────────────────────────────────────────────────────────
function fu(frame: number, start: number, dur = 20) {
  return {
    opacity: interpolate(frame, [start, start + 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    transform: `translateY(${interpolate(frame, [start, start + dur], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
  };
}

// Star SVG
const StarFull: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={GOLD}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
  </svg>
);

// ── Testimonials data ─────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: 'Carlos M.',
    role: 'Dueño · Restaurante Mar de Fondo',
    avatar: '👨‍🍳',
    quote: '"Pasamos de 3 a 11 reservas diarias en solo 3 semanas. El equipo de Mastexo transformó nuestra presencia digital por completo."',
    metric: '+267%',
    metricLabel: 'reservas',
    stars: 5,
  },
  {
    name: 'Valentina R.',
    role: 'Directora · Eventos Ópalo',
    avatar: '👩‍💼',
    quote: '"Nuestros eventos se agenda con meses de anticipación gracias a las campañas que diseñaron. ROI increíble desde el primer mes."',
    metric: '4.2×',
    metricLabel: 'ROI',
    stars: 5,
  },
];

// ── Scene 7 — TESTIMONIOS (82-98s, 480 frames) ────────────────────────
export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const sceneOpacity = interpolate(
    frame,
    [durationInFrames - FADE_OUT_F, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const s = STAGGER;

  // Pulse on the verification badge
  const pulseSc = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1], [0.94, 1.06],
  );

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <SharedBg orbs={['gold-center']} />

      <AbsoluteFill style={{ flexDirection: 'column', justifyContent: 'center', padding: '0 72px', gap: 48 }}>

        {/* Header */}
        <div style={fu(frame, 0)}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: 50, padding: '10px 24px', marginBottom: 28,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: GOLD }} />
            <span style={{ fontFamily: FONT_SM, fontSize: 18, color: GOLD, letterSpacing: 1.5 }}>
              LO QUE DICEN NUESTROS CLIENTES
            </span>
          </div>
          <div style={{ fontFamily: FONT_CG, fontSize: 88, fontWeight: 300, color: GOLD, fontStyle: 'italic', lineHeight: 0.95 }}>
            Resultados<br />que hablan
          </div>
        </div>

        {/* Testimonial cards */}
        {TESTIMONIALS.map((t, i) => {
          const cardSpring = spring({ frame: Math.max(0, frame - (s * 3 + i * 18)), fps, config: { damping: 16, stiffness: 65 } });

          return (
            <div
              key={t.name}
              style={{
                opacity: interpolate(frame, [s * 3 + i * 18, s * 3 + i * 18 + 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                transform: `translateY(${interpolate(frame, [s * 3 + i * 18, s * 3 + i * 18 + 22], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px) scale(${cardSpring})`,
                background: CARD,
                border: `1px solid ${BORDER_STRONG}`,
                borderRadius: 20,
                padding: '36px 40px',
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
              }}
            >
              {/* Author row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: 'rgba(201,168,76,0.12)', border: `1px solid ${GOLD}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30,
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT_DM, fontSize: 24, fontWeight: 600, color: TEXT }}>{t.name}</div>
                    <div style={{ fontFamily: FONT_SM, fontSize: 13, color: 'rgba(240,237,232,0.4)', marginTop: 4 }}>{t.role}</div>
                  </div>
                </div>

                {/* Metric badge */}
                <div style={{
                  background: 'rgba(52,211,153,0.1)', border: `1px solid rgba(52,211,153,0.3)`,
                  borderRadius: 14, padding: '12px 24px', textAlign: 'center',
                }}>
                  <div style={{ fontFamily: FONT_CG, fontSize: 48, fontWeight: 300, color: GREEN, lineHeight: 1 }}>{t.metric}</div>
                  <div style={{ fontFamily: FONT_SM, fontSize: 12, color: 'rgba(52,211,153,0.6)', letterSpacing: 1 }}>{t.metricLabel.toUpperCase()}</div>
                </div>
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: 4 }}>
                {Array.from({ length: t.stars }).map((_, si) => <StarFull key={si} size={24} />)}
              </div>

              {/* Quote */}
              <div style={{
                fontFamily: FONT_CG, fontSize: 26, fontStyle: 'italic',
                color: 'rgba(240,237,232,0.75)', lineHeight: 1.55,
                borderLeft: `3px solid ${GOLD}`, paddingLeft: 20,
              }}>
                {t.quote}
              </div>
            </div>
          );
        })}

        {/* Verified row */}
        <div style={{
          ...fu(frame, s * 8),
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
        }}>
          <div style={{ transform: `scale(${pulseSc})` }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill={TEAL}>
              <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" stroke={TEAL} fill="none" strokeLinecap="round" />
              <path d="M9 12l2 2 4-4" stroke={TEAL} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontFamily: FONT_SM, fontSize: 15, color: 'rgba(45,212,191,0.6)', letterSpacing: 1 }}>
            TESTIMONIOS VERIFICADOS · CLIENTES REALES
          </span>
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
