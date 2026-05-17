import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const BASE_URL = "https://mastexo.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Automatización Digital para Restaurantes y Negocios en Chile | Mastexo",
    template: "%s | Mastexo",
  },
  description:
    "Mastexo automatiza reservas, WhatsApp, CRM y marketing para restaurantes, barberías y tiendas en Chile. Primeros clientes en 14 días. Sin conocimientos técnicos.",
  keywords: [
    "automatización restaurantes Chile",
    "CRM para negocios Chile",
    "chatbot WhatsApp negocios",
    "automatización marketing digital LATAM",
    "POS restaurantes Chile",
    "más clientes para restaurantes Chile",
    "marketing digital negocios locales",
    "Mastexo Digital automatización",
  ],
  authors: [{ name: "Mastexo", url: BASE_URL }],
  creator: "Mastexo",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: BASE_URL,
    siteName: "Mastexo",
    title: "Automatización Digital para Restaurantes y Negocios en Chile | Mastexo",
    description:
      "Automatiza reservas, WhatsApp, CRM y marketing para tu restaurante o negocio en Chile. Primeros clientes en 14 días.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mastexo — Marketing digital para negocios locales en LATAM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automatización Digital para Restaurantes y Negocios en Chile | Mastexo",
    description:
      "Automatiza reservas, WhatsApp, CRM y marketing. Primeros clientes en 14 días. Para negocios en Chile y LATAM.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'es-CL': BASE_URL,
      'es-MX': BASE_URL,
      'es-AR': BASE_URL,
    },
  },
  verification: {
    google: "xbxi_pMfZwMVDOsFl7tC6N79Wi15w2DC07vWBBAwLSU",
  },
};

const schemaOrganization = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  name: "Mastexo Digital",
  url: "https://mastexo.com",
  logo: "https://mastexo.com/og-image.png",
  image: "https://mastexo.com/og-image.png",
  description:
    "Agencia de marketing digital en LATAM. Ayudamos a restaurantes, barberías, salones y tiendas locales a conseguir más clientes con presencia digital efectiva. Primeros clientes en 14 días.",
  telephone: "+56929709420",
  email: "contactos@mastexo.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CL",
    addressRegion: "O'Higgins",
    addressLocality: "Rancagua",
    streetAddress: "Rancagua",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -34.1703,
    longitude: -70.7394,
  },
  areaServed: [
    { "@type": "Country", name: "Chile" },
    { "@type": "Place", name: "América Latina" },
  ],
  sameAs: ["https://www.instagram.com/mastexo.digital"],
  priceRange: "$$",
  currenciesAccepted: "CLP",
  paymentAccepted: "Transferencia bancaria, tarjeta de crédito",
  openingHours: "Mo-Fr 09:00-18:00",
  knowsAbout: [
    "Automatización digital para restaurantes Chile",
    "CRM para negocios locales LATAM",
    "POS para restaurantes y cafeterías",
    "Chatbot WhatsApp para negocios",
    "WhatsApp automation para tiendas y restaurantes",
    "Marketing automation LATAM",
    "Dashboard analytics para negocios locales",
    "Websites para restaurantes y barberías",
    "Publicidad en Facebook e Instagram",
    "Google Maps para negocios locales Chile",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Ecosistema de Automatización Digital para Negocios",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "CRM para negocios locales en Chile",
          description: "Sistema de gestión de clientes con pipeline de ventas, seguimiento automático y reportes para restaurantes y negocios locales en Chile",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "POS Digital para Restaurantes",
          description: "Punto de venta digital para restaurantes y cafeterías con gestión de pedidos, mesas y pagos integrado",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Websites para Restaurantes y Negocios Locales",
          description: "Páginas web con reservas online, SEO local y captación de clientes para negocios en Chile y LATAM",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Chatbots para Atención 24/7",
          description: "Chatbots con inteligencia artificial que atienden clientes, toman reservas y responden preguntas automáticamente",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "WhatsApp Automation para Negocios",
          description: "Automatización de mensajes de WhatsApp Business para envío masivo, seguimiento de clientes y notificaciones automáticas",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dashboards y Analytics para Negocios",
          description: "Paneles de métricas en tiempo real para monitorear ventas, clientes y rendimiento del negocio",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Marketing Automation",
          description: "Automatización de campañas de email, SMS y redes sociales para restaurantes y negocios locales en LATAM",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Analytics e Inteligencia de Datos",
          description: "Análisis de datos de clientes y campañas para tomar decisiones basadas en métricas reales",
        },
      },
    ],
  },
};

const schemaFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cómo puede Mastexo ayudar a mi restaurante a conseguir más clientes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mastexo ayuda a restaurantes con páginas web con sistema de reservas online, anuncios geolocalizados en Facebook e Instagram, y optimización en Google Maps. Los restaurantes que trabajan con Mastexo promedian 3 veces más reservas en los primeros 30 días.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto tiempo tarda en ver resultados con marketing digital?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Con Mastexo, los primeros clientes reales llegan en promedio en 14 días desde el inicio. Esto se logra combinando una página web optimizada, campañas de publicidad pagada y posicionamiento en Google Maps.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué tipo de negocios trabajan con Mastexo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mastexo trabaja con negocios locales en Chile y LATAM: restaurantes, barberías, salones de belleza, cafeterías, food trucks, tiendas y cualquier negocio que quiera más clientes sin complicaciones técnicas.",
      },
    },
    {
      "@type": "Question",
      name: "¿Necesito saber de tecnología para trabajar con Mastexo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Mastexo se encarga de todo: diseño, publicidad, redes sociales y automatizaciones. El dueño del negocio solo necesita describir qué quiere mejorar. No se requiere conocimiento técnico.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta el marketing digital para un negocio local en Chile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mastexo ofrece diagnóstico gratuito sin costo ni compromiso. Los planes se personalizan según el tipo y tamaño del negocio. No hay contratos forzados y se puede cancelar en cualquier momento.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo conseguir más clientes para una barbería?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para conseguir más clientes en una barbería se recomienda: (1) crear un sistema de agenda online 24/7, (2) optimizar el perfil en Google Maps para aparecer en búsquedas locales, (3) activar recordatorios automáticos de citas, y (4) usar publicidad en Instagram con segmentación geográfica. Mastexo implementa todo esto para barberías en Chile.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué es Mastexo Digital?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mastexo Digital es una agencia de marketing digital especializada en negocios locales de Chile y LATAM. Diseña páginas web, gestiona publicidad en Meta y Google, y crea soluciones digitales para que restaurantes, barberías, salones y tiendas consigan más clientes sin necesitar conocimientos técnicos.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#06080F]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
