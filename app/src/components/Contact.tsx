'use client'

import { useState } from 'react'
import { MessageCircle, Mail, MapPin, Users, CheckCircle, Loader2 } from 'lucide-react'

const WA_PHONE = '56929709420'
const WA_CONTACT = `https://wa.me/${WA_PHONE}?text=Hola%20Mastexo%2C%20quiero%20un%20diagn%C3%B3stico%20gratuito.`

const SERVICES_LIST = [
  'Sitio Web profesional',
  'Automatización (WhatsApp / CRM)',
  'SEO local',
  'Seguridad Web',
  'Todo incluido',
  'No sé, necesito orientación',
]

const CLIENT_RANGES = [
  '0-10 clientes',
  '10-50 clientes',
  '50-200 clientes',
  '200+ clientes',
]

const CITIES = ['Santiago', 'México', 'Buenos Aires']

const INPUT_CLS =
  'bg-[#111111] border border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-white placeholder:text-[#555555] focus:outline-none focus:border-[#7C3AED] transition-colors duration-200 w-full'

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    negocio: '',
    servicio: '',
    clientes: '',
    contacto: '',
    mensaje: '',
  })
  const [enviado, setEnviado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (data.success) {
        setEnviado(true)
        setFormData({ nombre: '', negocio: '', servicio: '', clientes: '', contacto: '', mensaje: '' })

        // También abrir WhatsApp como respaldo
        const msg = `Hola Mastexo! Soy ${formData.nombre} de ${formData.negocio}. Me interesa ${formData.servicio}.`
        window.open(`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`, '_blank')
      } else {
        setErrorMsg(data.error ?? 'Error al enviar. Intenta de nuevo.')
      }
    } catch {
      setErrorMsg('Error de conexión. Escríbenos directamente por WhatsApp.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <section id="contacto" className="bg-[#111111] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── Left: Studio60 title ── */}
          <div className="flex flex-col gap-8">
            <h2
              className="font-[family-name:var(--font-space-grotesk)] leading-[1.0] text-white"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800 }}
            >
              Nos encantaría
              <br />
              hacer crecer
              <br />
              <span className="text-[#7C3AED]">tu negocio.</span>
            </h2>

            {/* Contact rows */}
            <div className="flex flex-col gap-4">
              <a
                href={WA_CONTACT}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366]/20 transition-colors duration-200">
                  <MessageCircle size={18} className="text-[#25D366]" />
                </div>
                <div>
                  <p className="text-xs text-[#555555]">WhatsApp</p>
                  <p className="text-sm font-medium text-white group-hover:text-[#25D366] transition-colors duration-200">
                    +56 9 2970 9420
                  </p>
                </div>
              </a>

              <a
                href="mailto:contactos@mastexo.com"
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)] flex items-center justify-center flex-shrink-0 group-hover:bg-[rgba(124,58,237,0.2)] transition-colors duration-200">
                  <Mail size={18} className="text-[#7C3AED]" />
                </div>
                <div>
                  <p className="text-xs text-[#555555]">Email</p>
                  <p className="text-sm font-medium text-white group-hover:text-[#A78BFA] transition-colors duration-200">
                    contactos@mastexo.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-[#888888]" />
                </div>
                <div>
                  <p className="text-xs text-[#555555]">Ciudades</p>
                  <p className="text-sm font-medium text-[#888888]">{CITIES.join(' · ')}</p>
                </div>
              </div>
            </div>

            {/* Guarantee box */}
            <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-6 py-5 flex flex-col gap-2">
              <p className="text-xs font-semibold text-[#7C3AED] uppercase tracking-widest">
                Nuestra garantía
              </p>
              {['Primer cliente en 14 días', 'Sin contratos de permanencia', 'Cancela cuando quieras'].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] flex-shrink-0" />
                    <span className="text-sm text-[#888888]">{item}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="card-dark p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white mb-1">
                Solicitar diagnóstico gratuito
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="nombre" className="text-xs font-medium text-[#888888]">
                    Nombre *
                  </label>
                  <input
                    id="nombre" name="nombre" type="text" required
                    value={formData.nombre} onChange={handleChange}
                    placeholder="Juan Pérez"
                    className={INPUT_CLS}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="negocio" className="text-xs font-medium text-[#888888]">
                    Negocio *
                  </label>
                  <input
                    id="negocio" name="negocio" type="text" required
                    value={formData.negocio} onChange={handleChange}
                    placeholder="Barbería / Café / Tienda..."
                    className={INPUT_CLS}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="servicio" className="text-xs font-medium text-[#888888]">
                  Servicio de interés *
                </label>
                <select
                  id="servicio" name="servicio" required
                  value={formData.servicio} onChange={handleChange}
                  className={`${INPUT_CLS} cursor-pointer appearance-none`}
                >
                  <option value="" disabled>Selecciona un servicio</option>
                  {SERVICES_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="clientes" className="text-xs font-medium text-[#888888] flex items-center gap-1.5">
                  <Users size={12} />
                  ¿Cuántos clientes tienes actualmente? *
                </label>
                <select
                  id="clientes" name="clientes" required
                  value={formData.clientes} onChange={handleChange}
                  className={`${INPUT_CLS} cursor-pointer appearance-none`}
                >
                  <option value="" disabled>Selecciona un rango</option>
                  {CLIENT_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contacto" className="text-xs font-medium text-[#888888]">
                  WhatsApp o Email *
                </label>
                <input
                  id="contacto" name="contacto" type="text" required
                  value={formData.contacto} onChange={handleChange}
                  placeholder="+56 9 1234 5678 o tu@correo.com"
                  className={INPUT_CLS}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="mensaje" className="text-xs font-medium text-[#888888]">
                  Mensaje <span className="text-[#555555]">(opcional)</span>
                </label>
                <textarea
                  id="mensaje" name="mensaje" rows={3}
                  value={formData.mensaje} onChange={handleChange}
                  placeholder="Cuéntanos sobre tu negocio y qué quieres lograr..."
                  className={`${INPUT_CLS} resize-none`}
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-400 text-center bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
                  {errorMsg}{' '}
                  <a
                    href={`https://wa.me/${WA_PHONE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-red-300"
                  >
                    Abrir WhatsApp
                  </a>
                </p>
              )}

              <button
                type="submit"
                disabled={cargando || enviado}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-full text-base font-semibold py-3.5 px-6 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed ${
                  enviado
                    ? 'bg-green-600 text-white'
                    : 'bg-[#7C3AED] hover:bg-[#5B21B6] text-white disabled:opacity-70'
                }`}
              >
                {cargando ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Enviando...
                  </>
                ) : enviado ? (
                  <>
                    <CheckCircle size={16} />
                    ✓ Mensaje enviado — Abriendo WhatsApp...
                  </>
                ) : (
                  <>
                    <MessageCircle size={16} />
                    Solicitar diagnóstico gratuito →
                  </>
                )}
              </button>

              <p className="text-xs text-[#555555] text-center">
                Email + WhatsApp · Sin spam · Sin compromiso
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
