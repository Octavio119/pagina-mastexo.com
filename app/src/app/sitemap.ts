import { MetadataRoute } from "next";

const BASE_URL = "https://mastexo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date("2026-05-16"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/servicios/sitios-web`,
      lastModified: new Date("2026-06-05"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/servicios/automatizacion`,
      lastModified: new Date("2026-06-05"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/servicios/seo`,
      lastModified: new Date("2026-06-05"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/servicios/seguridad`,
      lastModified: new Date("2026-06-05"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/resultados`,
      lastModified: new Date("2026-06-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guia-gratuita`,
      lastModified: new Date("2026-06-05"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacidad`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terminos`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
