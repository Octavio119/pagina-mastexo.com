import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { GOLD, TEXT, CARD, BORDER, FONT_CG, FONT_DM, STAGGER, FADE_OUT_F } from '../constants';
import { SharedBg } from '../SharedBg';

function fu(frame: number, start: number, dur = 20) {
  return {
    opacity: interpolate(frame, [start, start + 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    transform: `translateY(${interpolate(frame, [start, start + dur], [36, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
  };
}

const SERVICES = [
  { icon: '📱', name: 'Redes Sociales', desc: 'Instagram y Facebook gestionados completamente.' },
  { icon: '🎯', name: 'Publicidad Pagada', desc: 'Meta Ads y Google Ads optimizados.' },
  { icon: '🌐', name: 'Sitio Web Premium', desc: 'Reservas online + SEO local incluido.' },
  { icon: '🤖', name: 'Automatización', desc: 'Citas, confirmaciones y seguimiento automático.' },
  { icon: '📊', name: 'Dashboard', desc: 'Métricas en tiempo real de todo tu negocio.' },
];

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const sceneOpacity = interpolate(frame, [durationInFrames - FADE_OUT_F, durationInFrames], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s = STAGGER;

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <SharedBg orbs={['gold-tr', 'teal-bl']} />

      <AbsoluteFill style={{ flexDirection: 'column', justifyContent: 'center', padding: '0 64px', gap: 44 }}>

        {/* Title */}
        <div style={fu(frame, 0)}>
          <div style={{ fontFamily: FONT_CG, fontSize: 96, fontWeight: 300, color: TEXT, lineHeight: 0.95 }}>
            Todo lo que necesitas
          </div>
          <div style={{ fontFamily: FONT_CG, fontSize: 96, fontWeight: 300, color: GOLD, fontStyle: 'italic', lineHeight: 0.95 }}>
            para crecer.
          </div>
        </div>

        {/* Service cards 2-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          {SERVICES.map((svc, i) => (
            <div key={svc.name} style={{
              ...fu(frame, s * (i + 1)),
              background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16,
              padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <span style={{ fontSize: 36 }}>{svc.icon}</span>
              <div style={{ fontFamily: FONT_DM, fontSize: 20, fontWeight: 500, color: TEXT }}>{svc.name}</div>
              <div style={{ fontFamily: FONT_DM, fontSize: 16, color: 'rgba(240,237,232,0.5)', lineHeight: 1.5 }}>{svc.desc}</div>
            </div>
          ))}

          {/* Gold CTA card — full width */}
          <div style={{
            ...fu(frame, s * 6),
            gridColumn: '1 / -1',
            background: 'rgba(201,168,76,0.08)', border: `2px solid ${GOLD}`, borderRadius: 16,
            padding: '32px 36px', display: 'flex', alignItems: 'center', gap: 24,
          }}>
            <span style={{ fontSize: 40 }}>💬</span>
            <div>
              <div style={{ fontFamily: FONT_DM, fontSize: 24, fontWeight: 600, color: GOLD }}>Diagnóstico Gratuito</div>
              <div style={{ fontFamily: FONT_DM, fontSize: 18, color: 'rgba(240,237,232,0.6)' }}>Sin costo ni compromiso. Empieza hoy.</div>
            </div>
          </div>
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
