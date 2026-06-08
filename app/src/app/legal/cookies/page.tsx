import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies de Mastexo Digital. Qué cookies usamos, para qué y cómo puedes gestionarlas desde tu navegador.',
  alternates: { canonical: 'https://mastexo.com/legal/cookies' },
}

const SECTIONS = [
  { id: 'que-son',       title: '1. ¿Qué son las cookies?' },
  { id: 'tipos',         title: '2. Cookies que utilizamos' },
  { id: 'terceros',      title: '3. Cookies de terceros' },
  { id: 'gestionar',     title: '4. Cómo gestionarlas' },
  { id: 'consentimiento',title: '5. Consentimiento' },
  { id: 'contacto',      title: '6. Contacto' },
]

const prose = 'text-sm sm:text-base leading-[1.75] text-[#E5E5E5]'
const h2 = 'mb-4 border-l-2 border-[#7C3AED] pl-4 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white'
const divider = 'border-[#2A2A2A]'

export default function CookiesPage() {
  return (
    <LegalPage
      title="Política de Cookies"
      lastUpdated="8 de junio de 2026"
      sections={SECTIONS}
    >
      <section id="que-son" className="scroll-mt-28">
        <h2 className={h2}>1. ¿Qué son las cookies?</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo (ordenador, tablet o teléfono) cuando los visitas. Permiten al sitio recordar información sobre tu visita —como el idioma preferido o si ya has aceptado ciertos avisos— para mejorar tu experiencia en visitas futuras.
          </p>
          <p>
            Las cookies no contienen virus ni programas dañinos. Pueden ser de sesión (se eliminan al cerrar el navegador) o persistentes (permanecen durante un período determinado).
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="tipos" className="scroll-mt-28">
        <h2 className={h2}>2. Cookies que utilizamos</h2>
        <div className={`${prose} space-y-5`}>
          <div className="rounded-lg border border-[#2A2A2A] p-4">
            <p className="mb-1 font-semibold text-white">Cookies esenciales</p>
            <p className="text-[#888888] text-sm">
              Necesarias para el funcionamiento básico del sitio. Sin ellas, ciertas funciones como la navegación entre páginas o el envío de formularios no funcionarían correctamente. No pueden desactivarse.
            </p>
          </div>
          <div className="rounded-lg border border-[#2A2A2A] p-4">
            <p className="mb-1 font-semibold text-white">Cookies de analítica</p>
            <p className="text-[#888888] text-sm">
              Recopilan información anónima y agregada sobre cómo los usuarios navegan por el sitio: páginas más visitadas, tiempo de permanencia, fuente de tráfico. Utilizamos herramientas como Google Analytics. Estos datos ayudan a mejorar el contenido y la usabilidad del sitio. No identifican al usuario de forma personal.
            </p>
          </div>
          <div className="rounded-lg border border-[#2A2A2A] p-4">
            <p className="mb-1 font-semibold text-white">Cookies de preferencias</p>
            <p className="text-[#888888] text-sm">
              Almacenan configuraciones seleccionadas por el usuario (como el idioma o la región) para personalizar la experiencia de navegación en futuras visitas.
            </p>
          </div>
        </div>
      </section>

      <hr className={divider} />

      <section id="terceros" className="scroll-mt-28">
        <h2 className={h2}>3. Cookies de terceros</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            Algunas funcionalidades del sitio pueden ser proporcionadas por servicios externos que instalan sus propias cookies en tu dispositivo. Estas cookies están sujetas a las políticas de privacidad de cada proveedor:
          </p>
          <ul className="ml-4 list-disc space-y-1.5 marker:text-[#7C3AED]">
            <li>
              <strong className="text-white">Google Analytics</strong> — análisis de tráfico web (
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#A78BFA] hover:text-white transition-colors underline underline-offset-2">política de Google</a>)
            </li>
            <li>
              <strong className="text-white">Google Fonts</strong> — tipografías web alojadas en servidores de Google
            </li>
            <li>
              <strong className="text-white">Meta (Facebook/Instagram)</strong> — si visitas nuestros perfiles desde el sitio, pueden depositarse cookies de seguimiento de Meta
            </li>
          </ul>
          <p>
            Mastexo Digital no controla las cookies instaladas por estos terceros y no es responsable de su contenido ni de su uso. Te recomendamos revisar sus políticas de privacidad directamente.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="gestionar" className="scroll-mt-28">
        <h2 className={h2}>4. Cómo gestionar las cookies</h2>
        <div className={`${prose} space-y-4`}>
          <p>
            Puedes configurar tu navegador para aceptar, rechazar o eliminar cookies en cualquier momento. Ten en cuenta que desactivar ciertas cookies puede afectar el funcionamiento del sitio. Instrucciones por navegador:
          </p>
          <ul className="ml-4 list-disc space-y-2 marker:text-[#7C3AED]">
            <li>
              <strong className="text-white">Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios
            </li>
            <li>
              <strong className="text-white">Mozilla Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio
            </li>
            <li>
              <strong className="text-white">Safari (macOS/iOS):</strong> Preferencias → Privacidad → Gestionar datos del sitio web
            </li>
            <li>
              <strong className="text-white">Microsoft Edge:</strong> Configuración → Cookies y permisos del sitio → Administrar y eliminar cookies
            </li>
          </ul>
          <p>
            También puedes instalar extensiones de navegador como <strong className="text-white">uBlock Origin</strong> o <strong className="text-white">Privacy Badger</strong> para bloquear rastreadores de terceros de forma automática.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="consentimiento" className="scroll-mt-28">
        <h2 className={h2}>5. Consentimiento</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            Al continuar navegando por mastexo.com sin modificar la configuración de cookies de tu navegador, aceptas el uso de cookies según lo descrito en esta política. Si no estás de acuerdo, puedes configurar tu navegador para rechazarlas o abandonar el sitio.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="contacto" className="scroll-mt-28">
        <h2 className={h2}>6. Contacto</h2>
        <div className={`${prose} space-y-3`}>
          <p>Para cualquier consulta sobre el uso de cookies en este sitio:</p>
          <ul className="ml-4 list-disc space-y-1.5 marker:text-[#7C3AED]">
            <li>
              <strong className="text-white">Email:</strong>{' '}
              <a href="mailto:contactos@mastexo.com" className="text-[#A78BFA] underline underline-offset-2 hover:text-white transition-colors">
                contactos@mastexo.com
              </a>
            </li>
          </ul>
          <p className="text-[#888888] text-sm">
            Fecha de vigencia: 8 de junio de 2026
          </p>
        </div>
      </section>

      <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-5 text-sm text-[#888888]">
        <p>
          Ver también:{' '}
          <Link href="/legal/privacidad" className="text-[#A78BFA] hover:text-white transition-colors">Política de Privacidad</Link>
          {' · '}
          <Link href="/legal/terminos" className="text-[#A78BFA] hover:text-white transition-colors">Términos y Condiciones</Link>
        </p>
      </div>
    </LegalPage>
  )
}
