'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Cross, ShoppingBag, Send, ArrowRight, type LucideIcon } from 'lucide-react'

/* ═══════════════════════ DATA ═══════════════════════ */

type BusinessId = 'farmacia' | 'tienda'

interface Business {
  id: BusinessId
  name: string
  icon: LucideIcon
  welcome: string
  suggestions: string[]
}

const BUSINESSES: Record<BusinessId, Business> = {
  farmacia: {
    id: 'farmacia',
    name: 'Farmacia Vida',
    icon: Cross,
    welcome: 'Hola 👋 Soy el asistente virtual de Farmacia Vida. ¿En qué puedo ayudarte hoy?',
    suggestions: ['¿Qué horario tienen?', '¿Hacen delivery?', '¿Tienen ibuprofeno?', '¿Miden la presión?'],
  },
  tienda: {
    id: 'tienda',
    name: 'Boutique Nova',
    icon: ShoppingBag,
    welcome: '¡Hola! 👋 Bienvenida a Boutique Nova. ¿Qué estás buscando hoy?',
    suggestions: ['¿Qué tallas tienen?', '¿Hacen cambios?', '¿Tienen ropa de mujer?', '¿Cuál es el horario?'],
  },
}

const MAX_SESSION_MESSAGES = 20

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  synthetic?: boolean
}

/* ═══════════════════════ COMPONENTS ═══════════════════════ */

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 bg-[#2a1f3d] rounded-2xl rounded-bl-sm w-fit">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  )
}

function ChatBubble({ role, content, initial }: { role: Message['role']; content: string; initial: string }) {
  const isUser = role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-[#7C3AED] flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
          {initial}
        </div>
      )}
      <div
        className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-[#7C3AED] text-white rounded-2xl rounded-br-sm'
            : 'bg-[#2a1f3d] text-white rounded-2xl rounded-bl-sm'
        }`}
      >
        {content}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════ PAGE ═══════════════════════ */

export default function DemoChatbot() {
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessId | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  const business = selectedBusiness ? BUSINESSES[selectedBusiness] : null
  const limitReached = messages.length >= MAX_SESSION_MESSAGES

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const selectBusiness = useCallback((id: BusinessId) => {
    setSelectedBusiness(id)
    setInput('')
    setMessages([{ id: 'welcome', role: 'assistant', content: BUSINESSES[id].welcome, synthetic: true }])
  }, [])

  const handleSend = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!selectedBusiness || !trimmed || isLoading || messages.length >= MAX_SESSION_MESSAGES) return

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: trimmed }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setInput('')
    setIsLoading(true)

    try {
      const history = nextMessages
        .filter((m) => !m.synthetic)
        .map((m) => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/demo-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, business: selectedBusiness }),
      })

      if (!res.ok) throw new Error('request failed')
      const data = await res.json()
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: data.message }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'assistant', content: 'Ups, hubo un problema para responder. Intenta de nuevo en un momento.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [selectedBusiness, messages, isLoading])

  return (
    <>
      <Navbar />

      <main className="bg-[#111111] min-h-screen">

        {/* ── HERO ── */}
        <section className="pt-32 pb-12 px-4 sm:px-6 max-w-4xl mx-auto text-center">
          <span className="brand-badge mb-5 inline-flex">Demo en vivo · IA real</span>
          <h1 className="section-heading">
            Tu negocio, con asistente
            <br />
            <span className="gradient-text">inteligente 24/7</span>
          </h1>
          <p className="mt-5 text-[#888888] text-lg max-w-xl mx-auto">
            Elige un negocio de ejemplo y chatea con su asistente de IA en tiempo real. Es el mismo tipo de chatbot que podemos construir para el tuyo.
          </p>
        </section>

        {/* ── SELECTOR DE NEGOCIO ── */}
        <section className="px-4 sm:px-6 max-w-md mx-auto mb-10">
          <div className="grid grid-cols-2 gap-4">
            {Object.values(BUSINESSES).map((b) => {
              const Icon = b.icon
              const active = selectedBusiness === b.id
              return (
                <button
                  key={b.id}
                  onClick={() => selectBusiness(b.id)}
                  className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    active
                      ? 'border-[#7C3AED] bg-[rgba(124,58,237,0.08)]'
                      : 'border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#7C3AED]/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${active ? 'bg-[#7C3AED]' : 'bg-[rgba(124,58,237,0.1)]'}`}>
                    <Icon size={22} className={active ? 'text-white' : 'text-[#7C3AED]'} />
                  </div>
                  <span className="font-[family-name:var(--font-space-grotesk)] font-semibold text-white text-sm">
                    {b.name}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* ── VENTANA DE CHAT ── */}
        <section className="px-4 sm:px-6 max-w-[600px] mx-auto pb-20">
          {business ? (
            <div className="bg-[#1A1A1A] border border-[#2a1f3d] rounded-2xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[#2a1f3d]">
                <div className="w-9 h-9 rounded-full bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
                  <business.icon size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-space-grotesk)] font-semibold text-white text-sm">
                    {business.name}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-[#888888]">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    En línea
                  </p>
                </div>
              </div>

              {/* Mensajes */}
              <div className="flex flex-col gap-4 p-5 overflow-y-auto" style={{ maxHeight: 420, minHeight: 240 }}>
                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <ChatBubble key={m.id} role={m.role} content={m.content} initial={business.name[0]} />
                  ))}
                </AnimatePresence>
                {isLoading && <TypingDots />}
                <div ref={endRef} />
              </div>

              {/* Input o CTA de límite */}
              {limitReached ? (
                <div className="border-t border-[#2a1f3d] p-5 text-center">
                  <p className="text-sm text-[#888888] mb-3">Llegaste al límite de mensajes de esta demo.</p>
                  <Link
                    href="/#contacto"
                    className="inline-flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
                  >
                    Quiero esto para mi negocio <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <>
                  <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(input) }}
                    className="flex items-center gap-2 border-t border-[#2a1f3d] p-3"
                  >
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={isLoading}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 bg-[#111111] border border-[#2A2A2A] rounded-full px-4 py-2.5 text-sm text-white outline-none focus:border-[#7C3AED] transition-colors duration-200 disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="w-10 h-10 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-40 flex items-center justify-center flex-shrink-0 transition-colors duration-200 cursor-pointer"
                      aria-label="Enviar mensaje"
                    >
                      <Send size={16} className="text-white" />
                    </button>
                  </form>

                  <div className="flex flex-wrap gap-2 px-3 pb-4">
                    {business.suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSend(s)}
                        disabled={isLoading}
                        className="text-xs text-[#A78BFA] bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.25)] px-3 py-1.5 rounded-full hover:bg-[rgba(124,58,237,0.15)] transition-colors duration-200 disabled:opacity-40 cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="text-center text-[#555555] text-sm py-16 border border-dashed border-[#2A2A2A] rounded-2xl">
              Selecciona un negocio arriba para comenzar la conversación.
            </div>
          )}
        </section>

        {/* ── CTA FINAL ── */}
        <section
          className="py-20 px-4 sm:px-6 text-center"
          style={{ background: 'linear-gradient(180deg, #111111 0%, #2A1A4A 55%, #7C3AED 150%)' }}
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Quieres este chatbot para tu negocio?
            </h2>
            <p className="text-white/80 text-lg mb-9">
              Lo configuramos con la información real de tu negocio en pocos días.
            </p>
            <Link
              href="/#contacto"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#7C3AED] font-[family-name:var(--font-space-grotesk)] font-bold text-base px-8 py-4 rounded-full hover:bg-white/90 transition-colors duration-200"
            >
              Quiero un chatbot así <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
