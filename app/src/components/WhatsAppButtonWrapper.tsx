'use client'

import dynamic from 'next/dynamic'

const WhatsAppButton = dynamic(() => import('./WhatsAppButton'), {
  ssr: false,
  loading: () => null,
})

export default function WhatsAppButtonWrapper() {
  return <WhatsAppButton />
}
