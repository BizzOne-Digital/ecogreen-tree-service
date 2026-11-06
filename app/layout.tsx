import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({
  subsets: ["latin"], variable: "--font-montserrat", style: ["normal", "italic"], weight: ["600", "700", "800", "900"],
});

const title = "EcoGreen Tree Service LLC | Professional Tree Services";
const description = "Professional tree removal, tree trimming, brush removal, tree chipping and emergency tree services for residential properties.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: title, template: "%s | EcoGreen Tree Service LLC" },
  description,
  openGraph: {
    title, description, type: "website", siteName: "EcoGreen Tree Service LLC",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "EcoGreen Tree Service LLC logo" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
