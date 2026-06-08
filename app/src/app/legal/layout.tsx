import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButtonWrapper from '@/components/WhatsAppButtonWrapper'

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[72px]">
        {children}
      </main>
      <Footer />
      <WhatsAppButtonWrapper />
    </>
  )
}
