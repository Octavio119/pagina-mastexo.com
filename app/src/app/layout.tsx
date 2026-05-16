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

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Mastexo Digital",
  url: "https://mastexo.com",
  logo: "https://mastexo.com/og-image.png",
  description:
    "Agencia de marketing digital en LATAM. Ayudamos a restaurantes, barberías, salones y tiendas locales a conseguir más clientes con presencia digital efectiva.",
  telephone: "+56929709420",
  email: "contactos@mastexo.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CL",
    addressRegion: "O'Higgins",
    addressLocality: "Rancagua",
  },
  areaServed: { "@type": "Country", name: "Chile" },
  sameAs: ["https://www.instagram.com/mastexo.digital"],
  priceRange: "$$",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#07080C]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
