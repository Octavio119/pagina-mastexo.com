import type { Metadata } from 'next'
import ResultadosClient from './ResultadosClient'

export const metadata: Metadata = {
  title: 'Nuestro Trabajo | Portafolio Mastexo Digital',
  description: 'Proyectos reales de diseño web, sistemas y automatización para pymes en Chile. Mira lo que hemos construido para nuestros clientes.',
}

export default function ResultadosPage() {
  return <ResultadosClient />
}
