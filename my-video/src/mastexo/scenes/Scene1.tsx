import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { GOLD, TEXT, BORDER, FONT_CG, FONT_DM, FONT_SM, STAGGER, FADE_OUT_F } from '../constants';
import { SharedBg } from '../SharedBg';

// Fade-up helper (frame-relative)
function fu(frame: number, start: number, dur = 20) {
  return {
    opacity: interpolate(frame, [start, start + 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    transform: `translateY(${interpolate(frame, [start, start + dur], [36, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
  };
}

// Count-up value
function cv(frame: number, start: number, dur: number, target: number, decimals = 0) {
  const p = interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => 1 - Math.pow(1 - t, 3) });
  return (target * p).toFixed(decimals);
}

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Scene fade-out
  const sceneOpacity = interpolate(
    frame,
    [durationInFrames - FADE_OUT_F, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const s = STAGGER;

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <SharedBg orbs={['gold-tr', 'teal-bl']} />

      <AbsoluteFill style={{ flexDirection: 'column', justifyContent: 'center', padding: '0 72px', gap: 0 }}>

        {/* Badge */}
        <div style={{ ...fu(frame, s * 0), display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: GOLD }} />
          <span style={{ fontFamily: FONT_SM, fontSize: 20, color: GOLD, letterSpacing: 2 }}>
            MASTEXO DIGITAL · SERVICIOS
          </span>
        </div>

        {/* Eyebrow */}
        <div style={{ ...fu(frame, s * 1), fontFamily: FONT_SM, fontSize: 18, letterSpacing: 5, color: 'rgba(240,237,232,0.4)', textTransform: 'uppercase', marginBottom: 24 }}>
          SOLUCIONES PARA NEGOCIOS LOCALES
        </div>

        {/* Hero title */}
        <div style={{ ...fu(frame, s * 2), fontFamily: FONT_CG, fontSize: 128, fontWeight: 300, color: TEXT, lineHeight: 0.9, marginBottom: 0 }}>
          Resultados,
        </div>
        <div style={{ ...fu(frame, s * 3), fontFamily: FONT_CG, fontSize: 128, fontWeight: 300, color: GOLD, fontStyle: 'italic', lineHeight: 0.9, marginBottom: 44 }}>
          no herramientas.
        </div>

        {/* Subtitle */}
        <div style={{ ...fu(frame, s * 4), fontFamily: FONT_DM, fontSize: 30, fontWeight: 300, color: 'rgba(240,237,232,0.65)', lineHeight: 1.55, marginBottom: 72, maxWidth: 880 }}>
          Hacemos crecer tu negocio usando publicidad digital, redes sociales y automatización. Sin tecnicismos.
        </div>

        {/* Stats card */}
        <div style={{
          ...fu(frame, s * 5),
          border: `1px solid ${BORDER}`,
          borderRadius: 20,
          overflow: 'hidden',
        }}>
          {[
            { target: 85, suffix: '+', label: 'NEGOCIOS ACTIVOS' },
            { target: 14, suffix: ' días', label: 'AL PRIMER CLIENTE' },
            { target: 3, suffix: '×', label: 'MÁS RESERVAS' },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '32px 44px',
              borderBottom: i < 2 ? `1px solid ${BORDER}` : 'none',
            }}>
              <div style={{ fontFamily: FONT_CG, fontSize: 72, fontWeight: 300, color: GOLD }}>
                {cv(frame, s * 6 + i * 8, 40, stat.target)}{stat.suffix}
              </div>
              <div style={{ fontFamily: FONT_SM, fontSize: 16, color: 'rgba(240,237,232,0.4)', letterSpacing: 1, textAlign: 'right' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
