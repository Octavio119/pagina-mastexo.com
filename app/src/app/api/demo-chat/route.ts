import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPTS = {
  farmacia: `Eres el asistente virtual de Farmacia Vida, farmacia chilena moderna. Respondes en español chileno, amable y profesional.

INFO:
- Horario: Lunes-Viernes 8:30-21:00, Sábado 9:00-20:00, Domingo 10:00-18:00
- Servicios: medicamentos con/sin receta, suplementos, cosmética, medición presión arterial (gratis), medición glicemia, delivery a domicilio (gratis sobre $15.000, $2.500 bajo ese monto)
- Pago: efectivo, débito, crédito, transferencia
- NO puedes recetar ni diagnosticar

Sé breve y útil. Máximo 2-3 oraciones por respuesta.`,

  tienda: `Eres el asistente virtual de Boutique Nova, tienda de ropa chilena moderna. Respondes en español chileno, cercano y con estilo.

INFO:
- Horario: Lunes-Sábado 10:00-20:00, Domingo 11:00-18:00
- Productos: ropa mujer, hombre y niños, accesorios, calzado
- Tallas: XS al XXL en mayoría de productos
- Cambios: 30 días con boleta, producto sin uso
- Pago: efectivo, débito, crédito, cuotas sin interés BCI y Santander
- Delivery: todo Chile 3-5 días hábiles $3.990, gratis sobre $39.990

Sé amable y entusiasta. Máximo 2-3 oraciones por respuesta.`,
} as const

type BusinessId = keyof typeof SYSTEM_PROMPTS
type ChatRole = 'user' | 'assistant'
interface ChatMessage {
  role: ChatRole
  content: string
}

// ── Rate limiting simple por IP — 20 mensajes / hora ──────────────────────
const RATE_LIMIT = 20
const RATE_WINDOW_MS = 60 * 60 * 1000
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

function isValidMessages(value: unknown): value is ChatMessage[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > 40) return false
  return value.every(
    (m) =>
      m &&
      typeof m === 'object' &&
      (m.role === 'user' || m.role === 'assistant') &&
      typeof m.content === 'string' &&
      m.content.length > 0 &&
      m.content.length <= 2000
  )
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  if (!checkRateLimit(ip))
    return NextResponse.json(
      { error: 'Límite de mensajes alcanzado. Intenta en 1 hora.' },
      { status: 429 }
    )

  const body = await req.json().catch(() => null)
  if (!body)
    return NextResponse.json({ error: 'Petición inválida' }, { status: 400 })

  const { messages, business } = body as { messages: unknown; business: unknown }

  const systemPrompt = SYSTEM_PROMPTS[business as BusinessId]
  if (!systemPrompt)
    return NextResponse.json({ error: 'Negocio no válido' }, { status: 400 })

  if (!isValidMessages(messages))
    return NextResponse.json({ error: 'Mensajes inválidos' }, { status: 400 })

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      system: systemPrompt,
      messages: messages.slice(-10),
    })

    const block = response.content[0]
    const text = block?.type === 'text' ? block.text : 'No pude generar una respuesta, intenta de nuevo.'

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error('[demo-chat] error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
