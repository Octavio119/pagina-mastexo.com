import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import { Banner } from '@/components/ui/banner'
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
