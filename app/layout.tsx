import type { Metadata, Viewport } from "next";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "House of Gyoza — Crisp Outside. Comfort Inside.",
  description: "Homemade gyoza, made by House of Gyoza in six signature flavors. Visit us in Quezon City or explore distributor opportunities across the Philippines.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "House of Gyoza — Crisp Outside. Comfort Inside.",
    description: "Homemade gyoza, familiar flavors, and a little something for every craving. Explore our menu and distributor opportunities across the Philippines.",
    siteName: "House of Gyoza",
    url: "/",
    type: "website",
    locale: "en_PH",
  },
};

export const viewport: Viewport = { themeColor: "#faf6ee" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Chrome on iOS injects __gCrRemoteFrameToken on <html> before hydration.
  // Allow browser-owned root attributes; descendants keep hydration checks.
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
