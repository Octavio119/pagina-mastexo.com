import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all crawlers general access
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      // Explicitly allow AI search bots for citation eligibility
      { userAgent: "GPTBot",        allow: "/" },
      { userAgent: "ChatGPT-User",  allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot",     allow: "/" },
      { userAgent: "anthropic-ai",  allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Bingbot",       allow: "/" },
    ],
    sitemap: "https://mastexo.com/sitemap.xml",
  };
}
