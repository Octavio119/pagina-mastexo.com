import type { Metadata } from 'next'
import DemoChatbot from './DemoChatbot'

export const metadata: Metadata = {
  title: 'Demo Chatbot IA | Mastexo Digital',
  description: 'Prueba gratis un chatbot inteligente para tu negocio. Farmacia o tienda de ropa — responde preguntas reales de clientes 24/7.',
}

export default function DemoChatbotPage() {
  return <DemoChatbot />
}
