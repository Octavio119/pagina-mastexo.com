import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de uso del sitio web y los servicios de Mastexo Digital. Legislación chilena aplicable.',
  alternates: { canonical: 'https://mastexo.com/legal/terminos' },
}

const SECTIONS = [
  { id: 'aceptacion',     title: '1. Aceptación de los términos' },
  { id: 'servicio',       title: '2. Descripción del servicio' },
  { id: 'propiedad',      title: '3. Propiedad intelectual' },
  { id: 'responsabilidad',title: '4. Limitación de responsabilidad' },
  { id: 'exactitud',      title: '5. Exactitud de la información' },
  { id: 'links',          title: '6. Links externos' },
  { id: 'modificaciones', title: '7. Modificaciones del servicio' },
  { id: 'ley',            title: '8. Ley aplicable' },
  { id: 'contacto',       title: '9. Contacto' },
]

const prose = 'text-sm sm:text-base leading-[1.75] text-[#E5E5E5]'
const h2 = 'mb-4 border-l-2 border-[#7C3AED] pl-4 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white'
const divider = 'border-[#2A2A2A]'

export default function TerminosPage() {
  return (
    <LegalPage
      title="Términos y Condiciones"
      lastUpdated="8 de junio de 2026"
      sections={SECTIONS}
    >
      <section id="aceptacion" className="scroll-mt-28">
        <h2 className={h2}>1. Aceptación de los términos</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            Al acceder y utilizar el sitio web <strong className="text-white">mastexo.com</strong>, el usuario acepta expresamente estos Términos y Condiciones en su totalidad. Si no estás de acuerdo con alguno de los puntos aquí descritos, te pedimos que no uses el sitio ni solicites nuestros servicios.
          </p>
          <p>
            El uso continuo del sitio tras la publicación de actualizaciones a estos términos implica la aceptación de los cambios realizados.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="servicio" className="scroll-mt-28">
        <h2 className={h2}>2. Descripción del servicio</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            <strong className="text-white">Mastexo Digital</strong> es una agencia de servicios digitales especializada en pymes de Chile y América Latina. Nuestros servicios incluyen:
          </p>
          <ul className="ml-4 list-disc space-y-1.5 marker:text-[#7C3AED]">
            <li>Diseño y desarrollo de sitios web profesionales</li>
            <li>Automatización de procesos digitales (WhatsApp, CRM, reservas)</li>
            <li>SEO local y posicionamiento en buscadores</li>
            <li>Seguridad web y protección digital</li>
          </ul>
          <p>
            Los detalles específicos de cada servicio, plazos, entregables y condiciones económicas se acuerdan de forma individual con cada cliente mediante propuesta comercial escrita.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="propiedad" className="scroll-mt-28">
        <h2 className={h2}>3. Propiedad intelectual</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            Todo el contenido presente en mastexo.com —incluyendo textos, gráficos, logotipos, íconos, imágenes, código fuente y diseño— es propiedad exclusiva de <strong className="text-white">Mastexo Digital</strong> o de sus respectivos titulares, y está protegido por la legislación chilena e internacional sobre propiedad intelectual.
          </p>
          <p>
            Queda prohibida la reproducción, distribución, modificación o uso comercial de cualquier contenido de este sitio sin autorización previa y escrita de Mastexo Digital.
          </p>
          <p>
            Los entregables creados por Mastexo Digital para un cliente (sitio web, diseños, estrategias) pasan a ser propiedad del cliente una vez completados íntegramente los pagos acordados. Mastexo Digital se reserva el derecho de utilizar los resultados como referencia en su portafolio, salvo acuerdo expreso en contrario.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="responsabilidad" className="scroll-mt-28">
        <h2 className={h2}>4. Limitación de responsabilidad</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            Mastexo Digital no se responsabiliza por daños directos, indirectos, incidentales, lucro cesante ni pérdidas de datos derivados del uso o la imposibilidad de uso del sitio mastexo.com o de los servicios contratados, incluyendo —pero sin limitarse a— interrupciones del servicio, errores técnicos o accesos no autorizados.
          </p>
          <p>
            En ningún caso la responsabilidad total de Mastexo Digital superará el monto efectivamente pagado por el cliente durante los últimos tres meses de servicio.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="exactitud" className="scroll-mt-28">
        <h2 className={h2}>5. Exactitud de la información</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            Mastexo Digital se esfuerza por mantener el contenido de este sitio actualizado y preciso. Sin embargo, no garantizamos que toda la información sea siempre completa, exacta o libre de errores. Los casos de éxito y estadísticas presentados corresponden a clientes reales, pero los resultados pueden variar según las circunstancias de cada negocio.
          </p>
          <p>
            Nos reservamos el derecho de modificar o retirar contenido del sitio en cualquier momento sin previo aviso.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="links" className="scroll-mt-28">
        <h2 className={h2}>6. Links externos</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            Este sitio puede contener enlaces a sitios web de terceros. Mastexo Digital no controla el contenido ni las prácticas de privacidad de dichos sitios y no asume ninguna responsabilidad por ellos. Los enlaces se proporcionan únicamente como referencia informativa.
          </p>
          <p>
            Te recomendamos revisar las políticas de privacidad de cualquier sitio externo antes de proporcionar información personal.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="modificaciones" className="scroll-mt-28">
        <h2 className={h2}>7. Modificaciones del servicio</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            Mastexo Digital se reserva el derecho de modificar, suspender o discontinuar cualquier servicio —o parte de él— en cualquier momento, con o sin previo aviso, sin que ello genere responsabilidad alguna frente al usuario.
          </p>
          <p>
            Asimismo, podemos actualizar estos Términos y Condiciones periódicamente. La versión vigente siempre estará disponible en esta página con su fecha de actualización.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="ley" className="scroll-mt-28">
        <h2 className={h2}>8. Ley aplicable</h2>
        <div className={`${prose} space-y-3`}>
          <p>
            Estos Términos y Condiciones se rigen e interpretan conforme a la legislación vigente en la <strong className="text-white">República de Chile</strong>. Cualquier controversia derivada de su interpretación o aplicación será resuelta preferentemente mediante negociación directa entre las partes.
          </p>
          <p>
            En caso de no llegarse a un acuerdo, ambas partes se someten a la jurisdicción de los tribunales ordinarios de justicia de la ciudad de <strong className="text-white">Rancagua, Chile</strong>.
          </p>
        </div>
      </section>

      <hr className={divider} />

      <section id="contacto" className="scroll-mt-28">
        <h2 className={h2}>9. Contacto</h2>
        <div className={`${prose} space-y-3`}>
          <p>Para consultas sobre estos Términos y Condiciones:</p>
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
          <Link href="/legal/privacidad" className="text-[#A78BFA] hover:text-white transition-colors">Política de Privacidad</Link>
          {' · '}
          <Link href="/legal/cookies" className="text-[#A78BFA] hover:text-white transition-colors">Política de Cookies</Link>
        </p>
      </div>
    </LegalPage>
  )
}
