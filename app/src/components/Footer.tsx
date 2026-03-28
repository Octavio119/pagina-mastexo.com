"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* Marca */}
        <div>
          <div className="mb-5">
            <Image
              src="/logo.png"
              alt="Mastexo Digital"
              width={130}
              height={48}
              className="h-11 w-auto object-contain"
              style={{ filter: "brightness(0) invert(1) opacity(0.9)" }}
            />
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-5">
            Soluciones digitales para negocios que quieren crecer en internet sin complicaciones.
          </p>
          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/mastexo.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center border border-white/10 text-gray-400 transition-all hover:border-[#D4A853]/40 hover:text-[#D4A853]"
              aria-label="Instagram"
            >
              {/* Instagram icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
            <a
              href={`https://wa.me/56929709420?text=${encodeURIComponent("Hola, acabo de solicitar un diagnóstico en Mastexo.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center border border-white/10 text-gray-400 transition-all hover:border-[#25D366]/40 hover:text-[#25D366]"
              aria-label="WhatsApp"
            >
              {/* WhatsApp icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Navegación */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">
            Navegación
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="hover:text-white transition-colors"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#soluciones"
                onClick={(e) => { e.preventDefault(); document.getElementById("soluciones")?.scrollIntoView({ behavior: "smooth" }); }}
                className="hover:text-white transition-colors"
              >
                Soluciones
              </a>
            </li>
            <li>
              <a
                href="#proceso"
                onClick={(e) => { e.preventDefault(); document.getElementById("proceso")?.scrollIntoView({ behavior: "smooth" }); }}
                className="hover:text-white transition-colors"
              >
                Proceso
              </a>
            </li>
          </ul>
        </div>

        {/* Contacto + Legal */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">
            Contacto
          </h4>
          <ul className="space-y-2 text-sm text-gray-400 mb-6">
            <li>
              <a
                href="mailto:contactos@mastexo.com"
                className="hover:text-white transition-colors"
              >
                📧 contactos@mastexo.com
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/56929709420?text=${encodeURIComponent("Hola, acabo de solicitar un diagnóstico en Mastexo.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                📱 +56 9 2970 9420
              </a>
            </li>
          </ul>
          <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-3">
            Legal
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/privacidad" className="hover:text-[#D4A853] transition-colors">
                Política de Privacidad
              </Link>
            </li>
            <li>
              <Link href="/terminos" className="hover:text-[#D4A853] transition-colors">
                Términos de Servicio
              </Link>
            </li>
          </ul>
        </div>

      </div>

      <div className="text-center text-xs text-gray-500 mt-10 border-t border-white/5 pt-8">
        © {new Date().getFullYear()} Mastexo Digital. Todos los derechos reservados.
      </div>
    </footer>
  );
}
