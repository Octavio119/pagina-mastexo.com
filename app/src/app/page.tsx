import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import { Banner } from '@/components/ui/banner'
import { HeroPill } from '@/components/ui/hero-pill'
import ServicesOrbit from '@/components/ServicesOrbit'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Process from '@/components/Process'
import Nosotros from '@/components/Nosotros'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppButtonWrapper from '@/components/WhatsAppButtonWrapper'

/* Separador reutilizable entre secciones */
const SEPARATOR = (
  <Banner
    variant="rainbow"
    rainbowColors={[
      'rgba(124,58,237,0.5)',
      'rgba(139,92,246,0.3)',
      'transparent',
      'rgba(124,58,237,0.5)',
      'transparent',
      'rgba(167,139,250,0.4)',
      'transparent',
    ]}
    className="text-white/70 text-xs tracking-widest font-medium"
    speed={55}
  >
    ✦ SITIOS WEB ✦ AUTOMATIZACIÓN ✦ SEO ✦ SEGURIDAD ✦ SITIOS WEB ✦ AUTOMATIZACIÓN ✦ SEO ✦ SEGURIDAD ✦
  </Banner>
)

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* HeroPills — transición visual entre Hero y Orbit */}
        <div className="flex flex-col items-center gap-3 py-10 bg-[#111111]">
          <HeroPill
            href="#servicios"
            announcement="🚀 Nuevo"
            label="Automatización con IA para pymes LATAM"
            className="bg-purple-500/20 ring-purple-500/40 [&_div]:bg-purple-500 [&_div]:text-white [&_p]:text-purple-300 [&_svg_path]:fill-purple-300"
          />
          <HeroPill
            href="#resultados"
            announcement="📈 +214%"
            label="Reservas promedio en los primeros 60 días"
            className="bg-purple-500/10 ring-purple-500/30 [&_div]:bg-purple-700 [&_div]:text-white [&_p]:text-purple-400 [&_svg_path]:fill-purple-400"
          />
          <HeroPill
            href="#contacto"
            announcement="⚡ Gratis"
            label="Diagnóstico digital sin costo ni compromiso"
            className="bg-purple-500/10 ring-purple-500/30 [&_div]:bg-purple-700 [&_div]:text-white [&_p]:text-purple-400 [&_svg_path]:fill-purple-400"
          />
        </div>

        {SEPARATOR}
        <ServicesOrbit />
        {SEPARATOR}
        <Services />
        {SEPARATOR}
        <Portfolio />
        {SEPARATOR}
        <Process />
        {SEPARATOR}
        <Nosotros />
        {SEPARATOR}
        <Contact />
      </main>
      <Footer />
      <WhatsAppButtonWrapper />
    </>
  )
}
