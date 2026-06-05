import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Mastexo Digital — Agencia Web para Pymes en Chile y LATAM'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#111111',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Purple glow top-right */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '600px',
            height: '400px',
            background:
              'radial-gradient(ellipse at top right, rgba(124,58,237,0.35) 0%, transparent 70%)',
          }}
        />

        {/* Grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <span style={{ color: '#ffffff', fontSize: '36px', fontWeight: 700, letterSpacing: '0.08em' }}>
            MASTE
          </span>
          <span style={{ color: '#7C3AED', fontSize: '36px', fontWeight: 700, letterSpacing: '0.08em' }}>
            X
          </span>
          <span style={{ color: '#ffffff', fontSize: '36px', fontWeight: 700, letterSpacing: '0.08em' }}>
            O
          </span>
          <span
            style={{
              marginLeft: '12px',
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(124,58,237,0.4)',
              borderRadius: '999px',
              padding: '4px 14px',
              color: '#A78BFA',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            Digital
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: '62px',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.05,
            marginBottom: '28px',
            maxWidth: '800px',
          }}
        >
          Agencia Web para{' '}
          <span style={{ color: '#7C3AED' }}>Pymes</span>
          <br />
          en Chile y LATAM
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: '24px',
            color: '#888888',
            marginBottom: '48px',
          }}
        >
          Sitios web · Automatización · SEO · Seguridad
        </div>

        {/* Pills */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {['+85 negocios', '14 días al 1er cliente', 'Sin tecnicismos'].map((t) => (
            <div
              key={t}
              style={{
                background: 'rgba(124,58,237,0.12)',
                border: '1px solid rgba(124,58,237,0.3)',
                borderRadius: '999px',
                padding: '8px 20px',
                color: '#A78BFA',
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              {t}
            </div>
          ))}
        </div>

        {/* URL bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '80px',
            color: '#555555',
            fontSize: '18px',
          }}
        >
          mastexo.com
        </div>
      </div>
    ),
    { ...size }
  )
}
