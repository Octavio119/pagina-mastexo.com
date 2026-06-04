import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const BASE_URL = "https://mastexo.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Mastexo Digital — Agencia Web LATAM",
    template: "%s | Mastexo Digital",
  },
  description:
    "Sitios web, automatización, SEO y seguridad para pymes en Chile y LATAM. Sin tecnicismos. Con resultados. Primeros clientes en 14 días.",
  keywords: [
    "agencia web Chile",
    "diseño web pymes Chile",
    "automatización digital LATAM",
    "SEO negocios locales Chile",
    "sitios web restaurantes Chile",
    "marketing digital pymes",
    "más clientes negocios Chile",
    "Mastexo Digital agencia",
    "desarrollo web Santiago Chile",
    "seguridad web negocios",
  ],
  authors: [{ name: "Mastexo Digital", url: BASE_URL }],
  creator: "Mastexo Digital",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: BASE_URL,
    siteName: "Mastexo Digital",
    title: "Mastexo Digital — Agencia Web LATAM",
    description:
      "Sitios web, automatización, SEO y seguridad para pymes en Chile y LATAM. Sin tecnicismos. Con resultados.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mastexo Digital — Agencia web para pymes en Chile y LATAM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agencia Web para Pymes en Chile | Mastexo Digital",
    description:
      "Sitios web, automatización y SEO. Primeros clientes en 14 días. Chile y LATAM.",
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
      "es-CL": BASE_URL,
      "es-MX": BASE_URL,
      "es-AR": BASE_URL,
    },
  },
  verification: {
    google: "xbxi_pMfZwMVDOsFl7tC6N79Wi15w2DC07vWBBAwLSU",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.svg",
    apple: "/mastexo-icon.svg",
  },
};

const schemaOrganization = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  name: "Mastexo Digital",
  url: "https://mastexo.com",
  logo: "https://mastexo.com/mastexo-logo-horizontal.svg",
  image: "https://mastexo.com/og-image.png",
  description:
    "Agencia digital especializada en pymes de Chile y LATAM. Diseñamos sitios web, automatizamos procesos y aplicamos SEO para que tu negocio consiga más clientes en 14 días.",
  telephone: "+56929709420",
  email: "contactos@mastexo.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CL",
    addressRegion: "O'Higgins",
    addressLocality: "Rancagua",
  },
  areaServed: [
    { "@type": "Country", name: "Chile" },
    { "@type": "Place", name: "América Latina" },
  ],
  sameAs: ["https://www.instagram.com/mastexo.digital"],
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-18:00",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios Digitales para Pymes",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Diseño y Desarrollo Web para Pymes",
          description:
            "Sitios web profesionales con diseño personalizado, optimizados para convertir visitantes en clientes.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Automatización de Procesos Digitales",
          description:
            "Automatizamos WhatsApp, CRM, reservas y marketing para que tu negocio funcione solo.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO Local para Negocios en Chile",
          description:
            "Posicionamiento en Google Maps y búsquedas locales para atraer clientes de tu zona.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Seguridad Web y Protección Digital",
          description:
            "Protegemos tu sitio web con SSL, firewalls y monitoreo 24/7 contra ataques.",
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
      name: "¿Cuánto tarda Mastexo en crear mi sitio web?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El proceso completo toma entre 7 y 14 días: diagnóstico gratuito (día 1-2), diseño y desarrollo (día 3-10), revisión y lanzamiento (día 11-14). Los primeros clientes reales llegan en promedio 14 días después del lanzamiento.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué incluye el diagnóstico gratuito?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El diagnóstico gratuito incluye análisis de tu presencia digital actual, revisión de competidores locales, identificación de oportunidades SEO y un plan de acción personalizado sin costo ni compromiso.",
      },
    },
    {
      "@type": "Question",
      name: "¿Trabajan con cualquier tipo de negocio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mastexo trabaja con pymes en Chile y LATAM: restaurantes, barberías, salones de belleza, cafeterías, food trucks, tiendas, clínicas y cualquier negocio que quiera crecer digitalmente.",
      },
    },
    {
      "@type": "Question",
      name: "¿Necesito saber de tecnología para trabajar con Mastexo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Mastexo se encarga de todo: diseño, desarrollo, SEO y automatización. Tú solo describes qué quieres lograr y nosotros lo implementamos.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta un sitio web con Mastexo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Los precios se personalizan según el tipo y tamaño del negocio. Ofrecemos diagnóstico gratuito sin compromiso para darte un presupuesto exacto. Contacta por WhatsApp al +56929709420.",
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
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaOrganization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#111111]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
