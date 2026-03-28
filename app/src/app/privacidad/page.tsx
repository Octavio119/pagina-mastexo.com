import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad de Mastexo Digital. Cómo recopilamos, usamos y protegemos tu información personal.",
};

export default function PrivacidadPage() {
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
          Política de Privacidad
        </h1>
        <p className="text-white/40 text-sm mb-12">Última actualización: enero 2026</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/70 leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Responsable del tratamiento</h2>
            <p>
              <strong className="text-white">Mastexo Digital</strong> es el responsable del tratamiento de los datos personales
              recopilados a través del sitio web <strong className="text-white">mastexo.com</strong> y sus formularios de contacto.
              Para cualquier consulta sobre privacidad, puedes escribirnos a{" "}
              <a href="mailto:contactos@mastexo.com" className="text-[#D4A853] hover:underline">
                contactos@mastexo.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Datos que recopilamos</h2>
            <p>Cuando completas el formulario de diagnóstico, recopilamos:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Nombre completo</li>
              <li>Nombre del negocio</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de WhatsApp</li>
              <li>Categoría del negocio</li>
              <li>Descripción de lo que deseas mejorar</li>
              <li>Presupuesto estimado (opcional)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Finalidad del tratamiento</h2>
            <p>Utilizamos tus datos exclusivamente para:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Contactarte con el diagnóstico personalizado solicitado</li>
              <li>Ofrecerte información sobre nuestros servicios</li>
              <li>Gestionar la relación comercial si decides contratarnos</li>
            </ul>
            <p className="mt-3">
              <strong className="text-white">No vendemos ni cedemos tus datos a terceros</strong> bajo ningún concepto.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Base legal</h2>
            <p>
              El tratamiento de tus datos se basa en tu consentimiento expreso al enviar el formulario,
              y en el interés legítimo de prestarte el servicio solicitado.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Conservación de los datos</h2>
            <p>
              Conservamos tus datos durante el tiempo necesario para prestarte el servicio y cumplir
              con las obligaciones legales aplicables. Si no se establece una relación comercial,
              los eliminamos en un plazo máximo de 12 meses desde el primer contacto.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Cookies y analítica</h2>
            <p>
              Este sitio puede utilizar Google Analytics para medir el tráfico y comportamiento
              de los usuarios de forma anónima y agregada. Puedes desactivar el seguimiento
              desde la configuración de tu navegador o mediante herramientas como uBlock Origin.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Tus derechos</h2>
            <p>Tienes derecho a:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Acceder a los datos que tenemos sobre ti</li>
              <li>Rectificar datos incorrectos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al tratamiento de tus datos</li>
              <li>Solicitar la portabilidad de tus datos</li>
            </ul>
            <p className="mt-3">
              Para ejercer cualquiera de estos derechos, escríbenos a{" "}
              <a href="mailto:contactos@mastexo.com" className="text-[#D4A853] hover:underline">
                contactos@mastexo.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Seguridad</h2>
            <p>
              Implementamos medidas técnicas y organizativas razonables para proteger tus datos
              contra accesos no autorizados, pérdida o alteración. Las comunicaciones se realizan
              mediante conexiones cifradas (HTTPS).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Cambios en esta política</h2>
            <p>
              Podemos actualizar esta política periódicamente. La fecha de última actualización
              aparece al inicio del documento. Te recomendamos revisarla ocasionalmente.
            </p>
          </section>

        </div>

        <div className="mt-16 border-t border-white/8 pt-8 flex gap-6 text-sm">
          <Link href="/" className="text-white/40 hover:text-white transition-colors">← Inicio</Link>
          <Link href="/terminos" className="text-white/40 hover:text-white transition-colors">Términos de servicio →</Link>
        </div>

      </div>
    </main>
  );
}
