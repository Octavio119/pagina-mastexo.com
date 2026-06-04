import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { GOLD, TEXT, CARD, BORDER, FONT_CG, FONT_DM, STAGGER, FADE_OUT_F } from '../constants';
import { SharedBg } from '../SharedBg';

function fu(frame: number, start: number, dur = 20) {
  return {
    opacity: interpolate(frame, [start, start + 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    transform: `translateY(${interpolate(frame, [start, start + dur], [36, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
  };
}

const CARDS = [
  { icon: '⏰', title: 'Sin tiempo para marketing', desc: 'Tu día no te deja horas para aprender publicidad digital.' },
  { icon: '📉', title: 'Dependes de apps externas', desc: 'Plataformas que cobran comisión por cada reserva.' },
  { icon: '🤯', title: 'Herramientas complejas', desc: 'Meta Ads, Google, Instagram… todo parece otro trabajo.' },
];

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const sceneOpacity = interpolate(frame, [durationInFrames - FADE_OUT_F, durationInFrames], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s = STAGGER;

  // Gold card spring scale
  const goldScale = spring({ frame: Math.max(0, frame - s * 5), fps, config: { damping: 14, stiffness: 90 } });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <SharedBg orbs={['red-center', 'teal-bl']} />

      <AbsoluteFill style={{ flexDirection: 'column', justifyContent: 'center', padding: '0 64px', gap: 44 }}>

        {/* Title */}
        <div style={fu(frame, 0)}>
          <div style={{ fontFamily: FONT_CG, fontSize: 96, fontWeight: 300, color: TEXT, lineHeight: 0.95 }}>
            Tu negocio merece
          </div>
          <div style={{ fontFamily: FONT_CG, fontSize: 96, fontWeight: 300, color: GOLD, fontStyle: 'italic', lineHeight: 0.95 }}>
            más clientes.
          </div>
        </div>

        {/* Problem cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {CARDS.map((card, i) => (
            <div key={card.title} style={{
              ...fu(frame, s * (i + 1)),
              background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18,
              padding: '36px 40px', display: 'flex', alignItems: 'flex-start', gap: 28,
            }}>
              <span style={{ fontSize: 44, lineHeight: 1 }}>{card.icon}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontFamily: FONT_DM, fontSize: 24, fontWeight: 500, color: TEXT }}>{card.title}</div>
                <div style={{ fontFamily: FONT_DM, fontSize: 20, color: 'rgba(240,237,232,0.5)', lineHeight: 1.5 }}>{card.desc}</div>
              </div>
            </div>
          ))}

          {/* Gold resolution card */}
          <div style={{
            opacity: interpolate(frame, [s * 4, s * 4 + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `scale(${goldScale})`,
            background: 'rgba(201,168,76,0.08)', border: `2px solid ${GOLD}`, borderRadius: 18,
            padding: '40px 44px', display: 'flex', alignItems: 'flex-start', gap: 28,
          }}>
            <span style={{ fontSize: 44, lineHeight: 1 }}>✅</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontFamily: FONT_DM, fontSize: 26, fontWeight: 600, color: GOLD, letterSpacing: 0.5 }}>MASTEXO LO RESUELVE</div>
              <div style={{ fontFamily: FONT_DM, fontSize: 20, color: 'rgba(240,237,232,0.7)', lineHeight: 1.5 }}>Nos encargamos de todo. Tú solo atiendes.</div>
            </div>
          </div>
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
