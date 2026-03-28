import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos de Servicio",
  description: "Términos y condiciones del servicio de Mastexo Digital.",
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-2xl px-6 py-20">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#D4A853] hover:text-[#E8C87A] transition-colors mb-12"
        >
          ← Volver al inicio
        </Link>

        <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4A853] mb-3">Legal</p>
        <h1 className="text-3xl md:text-4xl font-light text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Términos de Servicio
        </h1>
        <p className="text-white/40 text-sm mb-12">Última actualización: enero 2026</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/70 leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Aceptación de los términos</h2>
            <p>
              Al utilizar el sitio web <strong className="text-white">mastexo.com</strong> y solicitar
              cualquiera de nuestros servicios, aceptas los presentes Términos de Servicio.
              Si no estás de acuerdo con alguno de los puntos, te pedimos que no uses nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Descripción del servicio</h2>
            <p>
              Mastexo Digital ofrece servicios de marketing digital, gestión de redes sociales,
              publicidad pagada y presencia online para negocios locales (restaurantes, barberías,
              salones, tiendas, cafeterías y similares). Los servicios específicos, plazos y
              condiciones económicas se acuerdan de forma individual con cada cliente.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Diagnóstico gratuito</h2>
            <p>
              El diagnóstico gratuito ofrecido en el sitio web no genera ninguna obligación de
              contratación por parte del cliente ni de Mastexo Digital. Es un servicio de evaluación
              sin costo ni compromiso.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Responsabilidades del cliente</h2>
            <p>El cliente se compromete a:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Proporcionar información veraz y actualizada sobre su negocio</li>
              <li>Facilitar acceso a las plataformas necesarias para prestar el servicio</li>
              <li>Responder en tiempos razonables a las comunicaciones del equipo</li>
              <li>Respetar los plazos de pago acordados (en caso de contratación)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Resultados y garantías</h2>
            <p>
              Mastexo Digital trabaja orientado a resultados y se compromete a aplicar las mejores
              prácticas disponibles. Sin embargo, <strong className="text-white">no garantizamos resultados
              específicos</strong>, ya que el rendimiento de las campañas depende de factores externos
              como el mercado, la competencia, la estacionalidad y la calidad del negocio.
            </p>
            <p className="mt-3">
              Los casos de éxito y estadísticas mostradas en el sitio son reales pero corresponden
              a clientes específicos y pueden no replicarse en todos los casos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Propiedad intelectual</h2>
            <p>
              Todo el contenido creado por Mastexo Digital para un cliente (textos, diseños,
              campañas, estrategias) pasa a ser propiedad del cliente una vez que se hayan
              completado los pagos correspondientes. Mastexo Digital puede utilizar los
              resultados como referencia en su portfolio, salvo indicación expresa en contrario.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Confidencialidad</h2>
            <p>
              Mastexo Digital trata con confidencialidad toda la información del negocio del cliente
              y no la comparte con terceros ajenos a la prestación del servicio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Cancelación</h2>
            <p>
              Cualquiera de las partes puede cancelar los servicios con un aviso previo de
              <strong className="text-white"> 15 días corridos</strong>. Los servicios prestados hasta la
              fecha de cancelación se facturan de forma proporcional. Los pagos realizados no
              son reembolsables salvo acuerdo expreso por escrito.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Limitación de responsabilidad</h2>
            <p>
              Mastexo Digital no se hace responsable de pérdidas indirectas, lucro cesante ni daños
              consecuentes derivados del uso o la imposibilidad de uso de los servicios. En ningún
              caso la responsabilidad total superará el monto pagado por el cliente en los últimos
              3 meses de servicio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Legislación aplicable</h2>
            <p>
              Estos términos se rigen por las leyes de la República de Chile. Cualquier disputa
              se resolverá preferentemente mediante negociación directa. En caso de no llegar a
              acuerdo, las partes se someten a los tribunales ordinarios de justicia de Santiago, Chile.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">11. Contacto</h2>
            <p>
              Para cualquier consulta sobre estos términos, puedes contactarnos en{" "}
              <a href="mailto:contactos@mastexo.com" className="text-[#D4A853] hover:underline">
                contactos@mastexo.com
              </a>{" "}
              o por WhatsApp al{" "}
              <a
                href="https://wa.me/56929709420"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4A853] hover:underline"
              >
                +56 9 2970 9420
              </a>.
            </p>
          </section>

        </div>

        <div className="mt-16 border-t border-white/8 pt-8 flex gap-6 text-sm">
          <Link href="/" className="text-white/40 hover:text-white transition-colors">← Inicio</Link>
          <Link href="/privacidad" className="text-white/40 hover:text-white transition-colors">Política de Privacidad →</Link>
        </div>

      </div>
    </main>
  );
}
