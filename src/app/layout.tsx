import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProfitBotWidget } from "@/components/bot/ProfitBotWidget";

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://figuremint.vercel.app"),
  title: {
    default: "FigureMint — 2026 Seller, Creator & Freelance Net Profit Calculators",
    template: "%s | FigureMint",
  },
  description:
    "Free 2026 fee, ROAS, and net profit calculators for TikTok Shop, Etsy, Shopify POD, Stripe vs. PayPal, and Upwork freelancers.",
  keywords: [
    "profit margin calculator",
    "tiktok shop fee calculator",
    "etsy fee calculator",
    "break even roas calculator",
    "stripe vs paypal fees",
    "freelance rate calculator",
  ],
  authors: [{ name: "FigureMint Editorial Team", url: "https://figuremint.vercel.app/about" }],
  publisher: "FigureMint",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://figuremint.vercel.app",
    siteName: "FigureMint",
    title: "FigureMint — 2026 Seller, Creator & Freelance Net Profit Calculators",
    description: "Audit true net margin after marketplace referral, affiliate, processing & ad fees.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FigureMint — 2026 Net Profit Calculators",
    description: "Accurate fee schedules and net profit calculations for online sellers and freelancers.",
  },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "XpEkjxiaQnTZQKMhrXKwcFTJOoXX2mcE8cpgnfZZEpE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  return (
    <html lang="en" data-comfort="fresh-light">
      <head>
        {adsenseId && (
          <Script
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ProfitBotWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
