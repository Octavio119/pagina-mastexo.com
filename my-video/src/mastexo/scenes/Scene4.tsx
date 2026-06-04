import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { GOLD, TEXT, TEAL, GREEN, RED, CARD, BORDER, FONT_CG, FONT_DM, FONT_SM, STAGGER, FADE_OUT_F } from '../constants';
import { SharedBg } from '../SharedBg';

function fu(frame: number, start: number, dur = 20) {
  return {
    opacity: interpolate(frame, [start, start + 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    transform: `translateY(${interpolate(frame, [start, start + dur], [36, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
  };
}

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const sceneOpacity = interpolate(frame, [durationInFrames - FADE_OUT_F, durationInFrames], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s = STAGGER;

  // Count-up for 94 reservations
  const reservas = Math.floor(
    interpolate(frame, [s * 4, s * 4 + 50], [0, 94], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => 1 - Math.pow(1 - t, 3) })
  );

  // Card scale-in spring
  const cardScale = spring({ frame: Math.max(0, frame - s * 3), fps, config: { damping: 16, stiffness: 80 } });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <SharedBg orbs={['gold-tr', 'teal-bl']} />

      <AbsoluteFill style={{ flexDirection: 'column', justifyContent: 'center', padding: '0 64px', gap: 44 }}>

        {/* Pill + heading */}
        <div style={fu(frame, 0)}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(201,168,76,0.1)', border: `1px solid rgba(201,168,76,0.3)`,
            borderRadius: 50, padding: '10px 24px', marginBottom: 24,
          }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: GOLD }} />
            <span style={{ fontFamily: FONT_SM, fontSize: 18, color: GOLD, letterSpacing: 1.5 }}>CASO DE ÉXITO REAL</span>
          </div>
          <div style={{ fontFamily: FONT_CG, fontSize: 112, fontWeight: 300, color: GOLD, fontStyle: 'italic', lineHeight: 0.9, marginBottom: 20 }}>
            GastroGrowth<br />Dashboard
          </div>
          <div style={{ fontFamily: FONT_DM, fontSize: 30, color: 'rgba(240,237,232,0.65)' }}>
            Triplicó sus reservas en 30 días
          </div>
        </div>

        {/* Teal stats */}
        <div style={{ ...fu(frame, s * 2), display: 'flex', gap: 56 }}>
          {[{ num: '3×', label: 'MÁS RESERVAS' }, { num: '30', label: 'DÍAS' }].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontFamily: FONT_CG, fontSize: 96, fontWeight: 300, color: TEAL }}>{stat.num}</div>
              <div style={{ fontFamily: FONT_SM, fontSize: 16, color: 'rgba(45,212,191,0.6)', letterSpacing: 1 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Client card */}
        <div style={{
          opacity: interpolate(frame, [s * 3, s * 3 + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          transform: `scale(${cardScale})`,
          background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20,
          padding: '44px', display: 'flex', flexDirection: 'column', gap: 28,
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(201,168,76,0.12)', border: `1px solid ${GOLD}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30,
            }}>🍽️</div>
            <div>
              <div style={{ fontFamily: FONT_DM, fontSize: 24, fontWeight: 500, color: TEXT }}>Restaurante Don Pedro</div>
              <div style={{ fontFamily: FONT_SM, fontSize: 14, color: 'rgba(240,237,232,0.35)' }}>Ñuñoa, Santiago · Chile</div>
            </div>
          </div>

          {/* Before / After */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: FONT_SM, fontSize: 14, letterSpacing: 1.5, color: RED }}>ANTES</span>
              <span style={{ fontFamily: FONT_CG, fontSize: 56, fontWeight: 300, color: RED }}>28 reservas/mes</span>
            </div>
            <div style={{ height: 1, background: BORDER }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: FONT_SM, fontSize: 14, letterSpacing: 1.5, color: GREEN }}>DESPUÉS</span>
              <span style={{ fontFamily: FONT_CG, fontSize: 56, fontWeight: 300, color: GREEN }}>{reservas} reservas/mes</span>
            </div>
          </div>

          {/* Quote */}
          <div style={{
            fontFamily: FONT_CG, fontSize: 24, fontStyle: 'italic',
            color: 'rgba(240,237,232,0.7)', borderLeft: `3px solid ${GOLD}`,
            paddingLeft: 24, lineHeight: 1.6,
          }}>
            "Mis mesas se llenan los fines de semana sin depender de plataformas externas."
          </div>
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
