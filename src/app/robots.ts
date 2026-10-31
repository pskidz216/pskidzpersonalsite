import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/audit", "/bond-no-9", "/pristine-login", "/api/"],
      },
    ],
    sitemap: "https://www.paulskidmoreii.com/sitemap.xml",
  };
}
