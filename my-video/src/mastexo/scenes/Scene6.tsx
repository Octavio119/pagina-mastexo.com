import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { GOLD, TEXT, TEAL, CARD, BORDER, BORDER_STRONG, FONT_CG, FONT_DM, FONT_SM, STAGGER, FADE_OUT_F } from '../constants';
import { SharedBg } from '../SharedBg';

// ── helpers ──────────────────────────────────────────────────────────
function fu(frame: number, start: number, dur = 20) {
  return {
    opacity: interpolate(frame, [start, start + 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    transform: `translateY(${interpolate(frame, [start, start + dur], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
  };
}

// ── Scene 6 — EL PROCESO (68-82s, 420 frames) ────────────────────────
const STEPS = [
  { n: '01', title: 'Diagnóstico', sub: 'Auditoría digital completa en 24h', icon: '🔍' },
  { n: '02', title: 'Estrategia',  sub: 'Plan personalizado con KPIs claros',  icon: '🗺️' },
  { n: '03', title: 'Ejecución',   sub: 'Campañas activas en 72 horas',         icon: '⚡' },
  { n: '04', title: 'Resultados',  sub: 'Reportes en tiempo real 24/7',          icon: '📈' },
];

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const sceneOpacity = interpolate(
    frame,
    [durationInFrames - FADE_OUT_F, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const s = STAGGER;

  // Progress bar that fills over 80 frames
  const progressW = interpolate(frame, [s * 2, s * 2 + 80], [0, 100], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 2),
  });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <SharedBg orbs={['gold-tr', 'teal-bl']} />

      <AbsoluteFill style={{ flexDirection: 'column', justifyContent: 'center', padding: '0 72px', gap: 48 }}>

        {/* Header */}
        <div style={fu(frame, 0)}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(45,212,191,0.08)', border: '1px solid rgba(45,212,191,0.25)',
            borderRadius: 50, padding: '10px 24px', marginBottom: 28,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: TEAL }} />
            <span style={{ fontFamily: FONT_SM, fontSize: 18, color: TEAL, letterSpacing: 1.5 }}>
              EL PROCESO
            </span>
          </div>
          <div style={{ fontFamily: FONT_CG, fontSize: 96, fontWeight: 300, color: GOLD, fontStyle: 'italic', lineHeight: 0.95 }}>
            4 pasos hacia<br />tus resultados
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ ...fu(frame, s * 2), height: 4, background: 'rgba(201,168,76,0.12)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ width: `${progressW}%`, height: '100%', background: `linear-gradient(90deg, ${GOLD}, ${TEAL})`, borderRadius: 2 }} />
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {STEPS.map((step, i) => {
            const cardSpring = spring({ frame: Math.max(0, frame - (s * 3 + i * s)), fps, config: { damping: 18, stiffness: 70 } });
            const isActive = frame > s * 3 + i * s + 10;
            return (
              <div
                key={step.n}
                style={{
                  opacity: interpolate(frame, [s * 3 + i * s, s * 3 + i * s + 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                  transform: `translateX(${interpolate(frame, [s * 3 + i * s, s * 3 + i * s + 20], [-60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px) scale(${cardSpring})`,
                  display: 'flex', alignItems: 'center', gap: 28,
                  background: isActive ? CARD : 'transparent',
                  border: `1px solid ${isActive ? BORDER_STRONG : 'transparent'}`,
                  borderRadius: 16, padding: '28px 32px',
                  transition: 'background 0.3s',
                }}
              >
                {/* Number */}
                <span style={{ fontFamily: FONT_SM, fontSize: 13, color: GOLD, letterSpacing: 1, minWidth: 28 }}>
                  {step.n}
                </span>

                {/* Icon */}
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: 'rgba(201,168,76,0.1)', border: `1px solid ${BORDER}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
                }}>
                  {step.icon}
                </div>

                {/* Text */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONT_DM, fontSize: 30, fontWeight: 600, color: TEXT }}>{step.title}</div>
                  <div style={{ fontFamily: FONT_DM, fontSize: 20, color: 'rgba(240,237,232,0.5)', marginTop: 4 }}>{step.sub}</div>
                </div>

                {/* Connector dot */}
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: isActive ? TEAL : 'rgba(45,212,191,0.2)',
                }} />
              </div>
            );
          })}
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
