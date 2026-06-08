import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Mastexo Digital. Cómo recopilamos, usamos y protegemos tus datos personales conforme a la Ley 19.628 de Chile.',
  alternates: { canonical: 'https://mastexo.com/legal/privacidad' },
}

const SECTIONS = [
  { id: 'introduccion',   title: '1. Introducción' },
  { id: 'leyes',          title: '2. Leyes aplicables' },
  { id: 'consentimiento', title: '3. Consentimiento' },
  { id: 'datos',          title: '4. Datos que recopilamos' },
  { id: 'uso',            title: '5. Cómo usamos los datos' },
  { id: 'compartir',      title: '6. Con quién compartimos' },
  { id: 'retencion',      title: '7. Tiempo de retención' },
  { id: 'proteccion',     title: '8. Protección de datos' },
  { id: 'menores',        title: '9. Menores de edad' },
  { id: 'derechos',       title: '10. Derechos del usuario' },
  { id: 'ejercer',        title: '11. Cómo ejercer tus derechos' },
  { id: 'modificaciones', title: '12. Modificaciones' },
  { id: 'contacto',       title: '13. Contacto' },
]

const prose = 'text-sm sm:text-base leading-[1.75] text-[#E5E5E5]'
const h2 = 'mb-4 border-l-2 border-[#7C3AED] pl-4 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white'
const divider = 'border-[#2A2A2A]'

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Política de Privacidad"
      lastUpdated="8 de junio de 2026"
      sections={SECTIONS}
    >
      <section id="introduccion" className="scroll-mt-28">
        <h2 className={h2}>1. Introducción</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            <strong className="text-white">Mastexo Digital</strong> es una agencia de servicios web para pymes en Chile y Latinoamérica, con sede en Rancagua, Chile. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos la información personal de los usuarios que visitan <strong className="text-white">mastexo.com</strong> o que nos contactan a través de nuestros formularios.
          </p>
          <p>
            Nos comprometemos a tratar tus datos con transparencia, responsabilidad y estricto apego a la normativa vigente. Te recomendamos leer este documento completo antes de usar nuestros servicios.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="leyes" className="scroll-mt-28">
        <h2 className={h2}>2. Leyes aplicables</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            El tratamiento de datos personales realizado por Mastexo Digital se rige principalmente por la <strong className="text-white">Ley N° 19.628 sobre Protección de la Vida Privada</strong> (Chile) y sus modificaciones posteriores. Como referencia de buenas prácticas internacionales, también nos alineamos con los principios del <strong className="text-white">Reglamento General de Protección de Datos (RGPD)</strong> de la Unión Europea.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="consentimiento" className="scroll-mt-28">
        <h2 className={h2}>3. Consentimiento</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            Al navegar por mastexo.com o completar cualquiera de nuestros formularios de contacto, el usuario acepta expresamente los términos de esta Política de Privacidad. Si no estás de acuerdo con su contenido, te pedimos que no utilices el sitio ni compartas tus datos con nosotros.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="datos" className="scroll-mt-28">
        <h2 className={h2}>4. Datos que recopilamos</h2>
        <div className={`${prose} space-y-4`}>
          <div>
            <p className="mb-2 font-semibold text-white">Datos recopilados automáticamente:</p>
            <ul className="ml-4 list-disc space-y-1.5 text-[#E5E5E5] marker:text-[#7C3AED]">
              <li>Dirección IP y geolocalización aproximada</li>
              <li>Tipo de dispositivo, sistema operativo y navegador</li>
              <li>Páginas visitadas y tiempo de permanencia</li>
              <li>Fuente de tráfico (búsqueda orgánica, redes sociales, acceso directo)</li>
            </ul>
          </div>
          <div>
            <p className="mb-2 font-semibold text-white">Datos proporcionados voluntariamente (formulario de contacto):</p>
            <ul className="ml-4 list-disc space-y-1.5 text-[#E5E5E5] marker:text-[#7C3AED]">
              <li>Nombre completo</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono o WhatsApp</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className={divider} />

      <section id="uso" className="scroll-mt-28">
        <h2 className={h2}>5. Cómo usamos los datos</h2>
        <div className={`${prose} space-y-3`}>
          <p>Utilizamos la información recopilada exclusivamente para:</p>
          <ul className="ml-4 list-disc space-y-1.5 marker:text-[#7C3AED]">
            <li>Analizar el tráfico del sitio y mejorar la experiencia de usuario</li>
            <li>Responder a consultas y solicitudes de diagnóstico</li>
            <li>Comunicar información relevante sobre nuestros servicios al usuario que lo solicitó</li>
            <li>Gestionar la relación comercial si el usuario decide contratar nuestros servicios</li>
          </ul>
          <p>
            <strong className="text-white">No utilizamos tus datos para publicidad de terceros ni los incluimos en listas de correo sin consentimiento explícito.</strong>
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="compartir" className="scroll-mt-28">
        <h2 className={h2}>6. Con quién compartimos los datos</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            Mastexo Digital no vende, arrienda ni cede tus datos personales a terceros con fines comerciales. El acceso a tus datos queda restringido a:
          </p>
          <ul className="ml-4 list-disc space-y-1.5 marker:text-[#7C3AED]">
            <li>Miembros del equipo interno de Mastexo Digital que requieren dicha información para prestarte el servicio</li>
            <li>Herramientas de análisis de tráfico web (como Google Analytics) bajo acuerdos de procesamiento de datos que impiden su uso comercial</li>
          </ul>
          <p>
            Solo divulgaremos información si así lo exige una autoridad competente mediante requerimiento legal formal.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="retencion" className="scroll-mt-28">
        <h2 className={h2}>7. Tiempo de retención</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            Los datos de contacto proporcionados voluntariamente se conservan por un período máximo de <strong className="text-white">90 días</strong> desde la última interacción, salvo que se establezca una relación comercial activa, en cuyo caso los datos se conservan durante la vigencia del servicio y hasta 12 meses después de su conclusión. Los datos analíticos se tratan de forma anónima y agregada.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="proteccion" className="scroll-mt-28">
        <h2 className={h2}>8. Protección de datos</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            Implementamos medidas técnicas y organizativas razonables para proteger tus datos personales frente a accesos no autorizados, pérdida, alteración o divulgación:
          </p>
          <ul className="ml-4 list-disc space-y-1.5 marker:text-[#7C3AED]">
            <li>Comunicaciones cifradas mediante HTTPS/TLS</li>
            <li>Acceso restringido a los datos solo al personal autorizado</li>
            <li>Cabeceras de seguridad HTTP (CSP, HSTS, X-Frame-Options)</li>
            <li>Revisiones periódicas de seguridad</li>
          </ul>
        </div>
      </section>

      <hr className={divider} />

      <section id="menores" className="scroll-mt-28">
        <h2 className={h2}>9. Menores de edad</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            Mastexo Digital dirige sus servicios a personas mayores de 14 años. Los menores de 14 años requieren el consentimiento expreso de su padre, madre o tutor legal para proporcionar cualquier dato personal a través de nuestro sitio. Si detectamos que hemos recopilado datos de un menor sin el consentimiento correspondiente, procederemos a eliminarlos de inmediato.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="derechos" className="scroll-mt-28">
        <h2 className={h2}>10. Derechos del usuario</h2>
        <div className={`${prose} space-y-3`}>
          <p>Conforme a la Ley N° 19.628 y los principios del RGPD, tienes los siguientes derechos sobre tus datos:</p>
          <ul className="ml-4 list-disc space-y-1.5 marker:text-[#7C3AED]">
            <li><strong className="text-white">Acceso:</strong> conocer qué datos tenemos sobre ti</li>
            <li><strong className="text-white">Rectificación:</strong> corregir datos inexactos o incompletos</li>
            <li><strong className="text-white">Eliminación:</strong> solicitar el borrado de tus datos personales</li>
            <li><strong className="text-white">Portabilidad:</strong> recibir tus datos en un formato estructurado y legible</li>
            <li><strong className="text-white">Oposición:</strong> oponerte al tratamiento de tus datos en determinadas circunstancias</li>
          </ul>
        </div>
      </section>

      <hr className={divider} />

      <section id="ejercer" className="scroll-mt-28">
        <h2 className={h2}>11. Cómo ejercer tus derechos</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            Para ejercer cualquiera de los derechos descritos, envía una solicitud escrita a{' '}
            <a href="mailto:contactos@mastexo.com" className="text-[#A78BFA] underline underline-offset-2 hover:text-white transition-colors">
              contactos@mastexo.com
            </a>{' '}
            indicando tu nombre, el derecho que deseas ejercer y la información necesaria para identificar los datos en cuestión. Responderemos en un plazo máximo de 15 días hábiles.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="modificaciones" className="scroll-mt-28">
        <h2 className={h2}>12. Modificaciones</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            Mastexo Digital se reserva el derecho de actualizar esta Política de Privacidad en cualquier momento para reflejar cambios en nuestras prácticas, en los servicios ofrecidos o en la legislación aplicable. La fecha de vigencia al inicio de este documento indica la versión más reciente. Te recomendamos revisarla periódicamente.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="contacto" className="scroll-mt-28">
        <h2 className={h2}>13. Contacto</h2>
        <div className={`${prose} space-y-3`}>
          <p>Para consultas sobre privacidad o ejercicio de derechos, puedes contactarnos por:</p>
          <ul className="ml-4 list-disc space-y-1.5 marker:text-[#7C3AED]">
            <li>
              <strong className="text-white">Email:</strong>{' '}
              <a href="mailto:contactos@mastexo.com" className="text-[#A78BFA] underline underline-offset-2 hover:text-white transition-colors">
                contactos@mastexo.com
              </a>
            </li>
            <li>
              <strong className="text-white">WhatsApp:</strong>{' '}
              <a href="https://wa.me/56929709420" target="_blank" rel="noopener noreferrer" className="text-[#A78BFA] underline underline-offset-2 hover:text-white transition-colors">
                +56 9 2970 9420
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
          <Link href="/legal/cookies" className="text-[#A78BFA] hover:text-white transition-colors">Política de Cookies</Link>
          {' · '}
          <Link href="/legal/terminos" className="text-[#A78BFA] hover:text-white transition-colors">Términos y Condiciones</Link>
        </p>
      </div>
    </LegalPage>
  )
}
