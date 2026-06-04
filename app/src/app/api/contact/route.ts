import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

// Rate limiting — 3 envíos por IP por hora
const rateMap = new Map<string, { count: number; resetAt: number }>()

function checkRate(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 3_600_000 })
    return true
  }
  if (entry.count >= 3) return false
  entry.count++
  return true
}

function esc(s: string) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')
}

export async function POST(req: Request) {
  // ── DEBUG ──
  console.log('[contact] ▶ API hit')
  console.log('[contact] API Key existe:', !!process.env.RESEND_API_KEY)
  console.log('[contact] API Key prefix:', process.env.RESEND_API_KEY?.slice(0, 10))

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (!checkRate(ip)) {
    console.log('[contact] Rate limit hit para IP:', ip)
    return NextResponse.json(
      { success: false, error: 'Demasiados intentos. Espera una hora.' },
      { status: 429 }
    )
  }

  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    console.log('[contact] Error parseando body')
    return NextResponse.json(
      { success: false, error: 'Petición inválida.' },
      { status: 400 }
    )
  }

  const { nombre, negocio, servicio, clientes, contacto, mensaje } = body

  console.log('[contact] Datos recibidos:', { nombre, negocio, servicio, clientes, contacto })

  if (!nombre || !negocio || !servicio || !contacto) {
    console.log('[contact] Faltan campos requeridos')
    return NextResponse.json(
      { success: false, error: 'Faltan campos requeridos.' },
      { status: 400 }
    )
  }

  console.log('[contact] Enviando email via Resend...')
  const { data, error } = await resend.emails.send({
    from: 'Mastexo Web <onboarding@resend.dev>',
    to: ['farahfo4715@gmail.com'],
    subject: `🔥 Nuevo lead: ${nombre} — ${negocio}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#111111;color:#fff;padding:32px;border-radius:12px;">
        <div style="background:#7C3AED;padding:16px 24px;border-radius:8px;margin-bottom:24px;">
          <h1 style="margin:0;font-size:20px;color:#fff;">🚀 Nuevo lead en Mastexo</h1>
        </div>

        <table style="width:100%;border-collapse:collapse;">
          <tr style="border-bottom:1px solid #2a2a2a;">
            <td style="padding:12px 0;color:#888888;width:160px;">Nombre</td>
            <td style="padding:12px 0;color:#fff;font-weight:600;">${esc(nombre)}</td>
          </tr>
          <tr style="border-bottom:1px solid #2a2a2a;">
            <td style="padding:12px 0;color:#888888;">Negocio</td>
            <td style="padding:12px 0;color:#fff;font-weight:600;">${esc(negocio)}</td>
          </tr>
          <tr style="border-bottom:1px solid #2a2a2a;">
            <td style="padding:12px 0;color:#888888;">Servicio</td>
            <td style="padding:12px 0;color:#7C3AED;font-weight:600;">${esc(servicio)}</td>
          </tr>
          <tr style="border-bottom:1px solid #2a2a2a;">
            <td style="padding:12px 0;color:#888888;">Clientes actuales</td>
            <td style="padding:12px 0;color:#fff;">${esc(clientes ?? 'No especificado')}</td>
          </tr>
          <tr style="border-bottom:1px solid #2a2a2a;">
            <td style="padding:12px 0;color:#888888;">Contacto</td>
            <td style="padding:12px 0;color:#fff;">${esc(contacto)}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#888888;">Mensaje</td>
            <td style="padding:12px 0;color:#fff;">${esc(mensaje || 'Sin mensaje adicional')}</td>
          </tr>
        </table>

        <div style="margin-top:24px;padding:16px;background:#1a1a1a;border-radius:8px;border-left:3px solid #7C3AED;">
          <p style="margin:0;color:#888888;font-size:12px;">
            Lead recibido desde mastexo.com &middot; ${new Date().toLocaleString('es-CL')}
          </p>
        </div>
      </div>
    `,
  })

  console.log('[contact] Resend response → data:', JSON.stringify(data))
  console.log('[contact] Resend response → error:', JSON.stringify(error))

  if (error) {
    console.error('[contact] ✕ Resend falló:', error)
    return NextResponse.json({ success: false, error }, { status: 400 })
  }

  console.log('[contact] ✓ Email enviado. ID:', data?.id)
  return NextResponse.json({ success: true, data })
}
