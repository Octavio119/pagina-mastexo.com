import type { Metadata } from "next";
import { Cormorant_Garamond, Syne } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const syne = Syne({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const BASE_URL = "https://mastexo.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Mastexo — Resultados, no herramientas",
    template: "%s | Mastexo",
  },
  description:
    "Escalamos tu negocio sin sistemas complejos. Leads que convierten, presencia que vende, clientes directo a tu WhatsApp. Para restaurantes, barberías, salones y tiendas en Chile.",
  keywords: [
    "marketing digital Chile",
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
    title: "Mastexo — Resultados, no herramientas",
    description:
      "Más clientes en 14 días para restaurantes, barberías, salones y tiendas. Sin complicaciones técnicas.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mastexo — Marketing digital para negocios locales en Chile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mastexo — Resultados, no herramientas",
    description:
      "Más clientes en 14 días. Sin complicaciones técnicas. Para negocios locales en Chile.",
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

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Mastexo Digital",
  url: "https://mastexo.com",
  logo: "https://mastexo.com/og-image.png",
  description:
    "Agencia de marketing digital en Chile. Ayudamos a restaurantes, barberías, salones y tiendas locales a conseguir más clientes con presencia digital efectiva.",
  telephone: "+56929709420",
  email: "contactos@mastexo.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CL",
    addressRegion: "O'Higgins",
    addressLocality: "Rancagua",
  },
  areaServed: {
    "@type": "Country",
    name: "Chile",
  },
  sameAs: ["https://www.instagram.com/mastexodigital/"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "18:00",
    },
  ],
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${syne.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0A0A0A]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
