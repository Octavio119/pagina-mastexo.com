import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { GOLD, TEAL, BG, FONT_CG, FONT_DM, FONT_SM, STAGGER, FADE_OUT_F } from '../constants';
import { SharedBg } from '../SharedBg';

// ── helpers ──────────────────────────────────────────────────────────
function fu(frame: number, start: number, dur = 20) {
  return {
    opacity: interpolate(frame, [start, start + 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    transform: `translateY(${interpolate(frame, [start, start + dur], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
  };
}

// Guarantees list
const GUARANTEES = [
  { icon: '✓', text: 'Sin permanencia — cancela cuando quieras' },
  { icon: '✓', text: 'Resultados visibles en los primeros 30 días' },
  { icon: '✓', text: 'Gestor dedicado disponible 24/7' },
];

// ── Scene 8 — CTA FINAL (98-115s, 510 frames) ────────────────────────
export const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const sceneOpacity = interpolate(
    frame,
    [durationInFrames - FADE_OUT_F, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const s = STAGGER;

  // Button glow pulse
  const glowAmt = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1], [0.4, 0.85],
  );

  // CTA button spring
  const btnSpring = spring({ frame: Math.max(0, frame - s * 6), fps, config: { damping: 14, stiffness: 60 } });

  // Urgency counter (spots left — counts down slowly)
  const spotsLeft = Math.max(
    1,
    Math.floor(interpolate(frame, [s * 7, s * 7 + 120], [7, 3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })),
  );

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <SharedBg orbs={['gold-center', 'teal-bl']} />

      <AbsoluteFill style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 72px', gap: 44, textAlign: 'center' }}>

        {/* Eyebrow pill */}
        <div style={{
          ...fu(frame, 0),
          display: 'flex', justifyContent: 'center',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: 50, padding: '10px 28px',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: GOLD }} />
            <span style={{ fontFamily: FONT_SM, fontSize: 18, color: GOLD, letterSpacing: 1.5 }}>
              EMPIEZA HOY
            </span>
          </div>
        </div>

        {/* Main headline */}
        <div style={fu(frame, s)}>
          <div style={{ fontFamily: FONT_CG, fontSize: 100, fontWeight: 300, color: GOLD, fontStyle: 'italic', lineHeight: 0.92 }}>
            ¿Listo para llenar<br />tu agenda?
          </div>
        </div>

        {/* Sub copy */}
        <div style={{ ...fu(frame, s * 2), maxWidth: 800 }}>
          <div style={{ fontFamily: FONT_DM, fontSize: 28, color: 'rgba(240,237,232,0.65)', lineHeight: 1.5 }}>
            Más de 120 restaurantes y eventos en Chile ya confían en Mastexo para crecer. El próximo puede ser el tuyo.
          </div>
        </div>

        {/* Guarantees */}
        <div style={{ ...fu(frame, s * 3), display: 'flex', flexDirection: 'column', gap: 14, alignSelf: 'stretch' }}>
          {GUARANTEES.map((g, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                opacity: interpolate(frame, [s * 3 + i * 6, s * 3 + i * 6 + 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
              }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'rgba(45,212,191,0.12)', border: '1px solid rgba(45,212,191,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FONT_SM, fontSize: 14, color: TEAL,
              }}>
                {g.icon}
              </div>
              <span style={{ fontFamily: FONT_DM, fontSize: 22, color: 'rgba(240,237,232,0.7)' }}>{g.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{
          opacity: interpolate(frame, [s * 6, s * 6 + 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          transform: `scale(${btnSpring})`,
        }}>
          <div style={{
            position: 'relative',
            background: `linear-gradient(135deg, ${GOLD} 0%, #e8c060 50%, ${GOLD} 100%)`,
            borderRadius: 20, padding: '36px 80px',
            boxShadow: `0 0 ${80 * glowAmt}px rgba(201,168,76,${glowAmt * 0.4}), 0 8px 40px rgba(201,168,76,0.25)`,
          }}>
            <div style={{ fontFamily: FONT_DM, fontSize: 34, fontWeight: 700, color: BG, letterSpacing: -0.5 }}>
              Agenda tu consulta GRATIS
            </div>
            <div style={{ fontFamily: FONT_SM, fontSize: 15, color: 'rgba(8,12,18,0.55)', marginTop: 8, letterSpacing: 1 }}>
              mastexo.com · SIN COMPROMISO
            </div>
          </div>
        </div>

        {/* Urgency */}
        <div style={{
          ...fu(frame, s * 7),
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            background: '#f87171',
            boxShadow: '0 0 12px rgba(248,113,113,0.7)',
          }} />
          <span style={{ fontFamily: FONT_SM, fontSize: 16, color: 'rgba(240,237,232,0.5)', letterSpacing: 0.5 }}>
            Solo quedan{' '}
            <span style={{ color: '#f87171', fontWeight: 700 }}>{spotsLeft} cupos</span>
            {' '}disponibles este mes
          </span>
        </div>

        {/* Domain / brand */}
        <div style={{ ...fu(frame, s * 9), marginTop: 8 }}>
          <div style={{ fontFamily: FONT_CG, fontSize: 52, fontWeight: 300, color: 'rgba(201,168,76,0.35)', letterSpacing: 4, fontStyle: 'italic' }}>
            mastexo.com
          </div>
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
