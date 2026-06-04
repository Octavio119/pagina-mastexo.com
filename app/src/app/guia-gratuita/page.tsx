import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckCircle, ArrowRight, Lightbulb, TrendingUp, Users, Globe, Zap, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Guía Gratuita — 7 Pasos para Crecer Digitalmente | Mastexo',
  description: 'Guía práctica con 7 pasos para que tu pyme crezca digitalmente en Chile y LATAM. Sin tecnicismos. Gratis.',
}

const TIPS = [
  {
    icon: Globe,
    number: '01',
    title: 'Tu sitio web es tu vendedor 24/7',
    content: 'La mayoría de pymes en Chile no tiene sitio web o tiene uno que no genera clientes. Tu sitio debe tener un CTA claro en los primeros 3 segundos: "Reservar ahora", "Pedir por WhatsApp" o "Ver menú". Si no tienes eso, estás perdiendo clientes cada hora.',
    tip: 'Prueba esto: abre tu sitio y pregunta "¿En 3 segundos sé qué hace este negocio y cómo contactarlos?". Si la respuesta es no, necesitas mejorarlo.',
  },
  {
    icon: TrendingUp,
    number: '02',
    title: 'Google Maps es tu mejor aliado gratuito',
    content: 'El 46% de búsquedas en Google tienen intención local. Cuando alguien busca "barbería cerca de mí" o "restaurante en Santiago centro", Google Maps decide quién aparece primero. Un perfil bien optimizado puede generar 10-30 llamadas extras al mes sin pagar publicidad.',
    tip: 'Acción inmediata: ve a google.com/business, completa tu perfil al 100%, sube 10 fotos de calidad y pide a tus 5 mejores clientes que dejen una reseña hoy.',
  },
  {
    icon: Users,
    number: '03',
    title: 'WhatsApp Business cambia las reglas',
    content: 'WhatsApp tiene 93% de penetración en Chile. Configurar WhatsApp Business con respuestas automáticas, catálogo de productos y mensajes de bienvenida puede triplicar tu tasa de conversión de consultas en clientes. Es gratis y toma 20 minutos configurarlo.',
    tip: 'Configura un mensaje de bienvenida automático: "Hola! Gracias por contactar a [Negocio]. Respondemos en minutos. Mientras tanto, puedes ver nuestro menú/servicios aquí: [link]"',
  },
  {
    icon: Lightbulb,
    number: '04',
    title: 'El contenido que convierte no es el bonito',
    content: 'Las fotos de platos perfectas no venden tanto como una foto de un cliente feliz con el texto "Mesa para este sábado: escríbenos". El contenido que convierte muestra resultados reales, procesos detrás del negocio y testimonios. Auténtico > Perfecto.',
    tip: 'Publica 3 tipos de contenido: (1) Resultado de un cliente real, (2) Tu proceso de trabajo, (3) Respuesta a una pregunta frecuente. Alterna estos 3 tipos cada semana.',
  },
  {
    icon: Zap,
    number: '05',
    title: 'Automatiza lo repetitivo',
    content: 'Un negocio promedio pierde 2-3 horas diarias en tareas repetitivas: responder las mismas preguntas, confirmar citas, enviar recordatorios. Un sistema de automatización básico — con herramientas gratuitas como WhatsApp Business, Google Calendar y Calendly — puede recuperar esas horas.',
    tip: 'Identifica las 3 preguntas que más te hacen por WhatsApp y configura respuestas rápidas. WhatsApp Business → Herramientas → Respuestas rápidas.',
  },
  {
    icon: Shield,
    number: '06',
    title: 'Las reseñas son dinero',
    content: '88% de consumidores confía en las reseñas online tanto como en una recomendación personal. Un negocio con 50 reseñas positivas puede cobrar hasta 20% más que uno con 5. No es casualidad — las reseñas son la prueba social más poderosa que existe para negocios locales.',
    tip: 'Sistema simple: después de cada servicio exitoso, envía este mensaje: "Hola [nombre], fue un gusto atenderte. Si quedaste contento/a, nos ayudaría mucho si dejas una reseña en Google: [link]. ¡Gracias!"',
  },
  {
    icon: ArrowRight,
    number: '07',
    title: 'Mide, o no existe',
    content: 'Lo que no se mide no mejora. Necesitas saber: cuántas personas ven tu perfil de Google Maps cada mes, cuántas visitas tiene tu sitio web, de dónde vienen tus clientes. Con Google Analytics (gratis) y Google Search Console (gratis) tienes toda la información que necesitas.',
    tip: 'Instala Google Analytics en tu sitio esta semana. Es gratis y tarda 15 minutos. En 30 días tendrás datos reales para tomar mejores decisiones.',
  },
]

export default function GuiaGratuitaPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#111111] min-h-screen">
        {/* Back */}
        <div className="pt-24 pb-0 px-4 sm:px-6 max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#888888] hover:text-[#7C3AED] transition-colors duration-200">
            ← Volver al inicio
          </Link>
        </div>

        {/* Hero */}
        <section className="pt-8 pb-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
          <span className="brand-badge mb-5 inline-flex">100% Gratis</span>
          <h1 className="section-heading mt-4 mb-6">
            7 pasos para que tu pyme
            <br />
            <span style={{ background: 'linear-gradient(135deg,#7C3AED,#A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              crezca digitalmente
            </span>
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto">
            Guía práctica para negocios en Chile y LATAM. Sin tecnicismos. Sin costos ocultos. Solo pasos que funcionan.
          </p>
        </section>

        {/* Tips */}
        <section className="pb-24 px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="flex flex-col gap-8">
            {TIPS.map(({ icon: Icon, number, title, content, tip }) => (
              <div key={number} className="card-dark p-8 flex flex-col sm:flex-row gap-6">
                {/* Left: number + icon */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <span className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#7C3AED]">
                    {number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[rgba(124,58,237,0.12)] border border-[rgba(124,58,237,0.2)] flex items-center justify-center">
                    <Icon size={18} className="text-[#7C3AED]" />
                  </div>
                </div>

                {/* Right: content */}
                <div className="flex flex-col gap-3">
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
                    {title}
                  </h2>
                  <p className="text-[#888888] text-sm leading-relaxed">{content}</p>
                  <div className="bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.2)] rounded-lg px-4 py-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-[#7C3AED] flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-[#A78BFA] leading-relaxed">
                        <strong className="font-semibold">Acción:</strong> {tip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="py-20 px-4 sm:px-6 border-t border-[#2A2A2A] text-center">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white mb-4">
            ¿Quieres que lo implementemos nosotros?
          </h2>
          <p className="text-[#888888] mb-8 max-w-xl mx-auto">
            Si prefieres que un equipo experto se encargue de todo esto por ti, agenda un diagnóstico gratuito. Sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/56929709420?text=Le%C3%AD%20la%20gu%C3%ADa%20gratuita%20de%20Mastexo%20y%20quiero%20un%20diagn%C3%B3stico."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-3.5"
            >
              Quiero diagnóstico gratis
            </a>
            <Link href="/#contacto" className="btn-outline px-8 py-3.5">
              Formulario de contacto
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
