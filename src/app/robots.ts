import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      "https://parsatajik.com/sitemap.xml",
      "https://parsatajik.com/posts/sitemap.xml",
    ],
  };
}
