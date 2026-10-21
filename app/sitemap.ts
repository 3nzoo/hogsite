import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Menu, story and contact are sections of this page, not separate pages.
  return [{ url: new URL("/", siteUrl).href }];
}
