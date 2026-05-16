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
    default: "Mastexo — Resultados, no complicaciones",
    template: "%s | Mastexo",
  },
  description:
    "Diseñamos páginas web y soluciones digitales que convierten visitantes en clientes reales. Para restaurantes, barberías, salones y tiendas en LATAM.",
  keywords: [
    "marketing digital Chile",
    "páginas web negocios LATAM",
    "más clientes para restaurantes",
    "publicidad barberías",
    "marketing salones belleza",
    "negocios locales Chile",
    "leads clientes nuevos",
    "Mastexo Digital",
  ],
  authors: [{ name: "Mastexo", url: BASE_URL }],
  creator: "Mastexo",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: BASE_URL,
    siteName: "Mastexo",
    title: "Mastexo — Resultados digitales, no complicaciones",
    description:
      "Más clientes en 14 días para restaurantes, barberías, salones y tiendas. Sin complicaciones técnicas.",
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
    title: "Mastexo — Resultados digitales, no complicaciones",
    description:
      "Más clientes en 14 días. Sin complicaciones técnicas. Para negocios locales en LATAM.",
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
    "Marketing digital para restaurantes",
    "Páginas web para barberías",
    "Marketing para salones de belleza",
    "Publicidad en Facebook e Instagram",
    "Google Maps para negocios locales",
    "Marketing digital LATAM",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Marketing Digital",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Diseño de páginas web para negocios locales",
          description: "Páginas web optimizadas para SEO local, reservas online y captación de clientes en Chile y LATAM",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Publicidad en Facebook e Instagram",
          description: "Campañas de Meta Ads geolocalizadas para restaurantes, barberías y negocios locales",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Optimización de Google Maps y SEO local",
          description: "Posicionamiento en Google Maps y búsquedas locales para negocios en Chile",
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
