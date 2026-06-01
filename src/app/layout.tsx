import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Queen Makeup Artistry | Signature Soft Glams & Bridal MUA",
    template: "%s | Queen Makeup Artistry",
  },
  description: "Queen Makeup Artistry by Queen Bamiyo - Signature Soft Glams and Luxury Bridal Makeup services in Derby, Midlands, and London. Book your glam today.",
  keywords: ["MUA", "Makeup Artist", "Bridal Makeup", "Soft Glam", "Derby MUA", "London MUA", "Queen Makeup Artistry", "Queen Bamiyo", "Esthetician"],
  authors: [{ name: "Queen Makeup Artistry" }],
  metadataBase: new URL("https://queenmakeupartistry.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Queen Makeup Artistry | Queen of Soft Glams",
    description: "Elevating natural beauty. Discover professional makeup services and luxury bridal glams by Queen Bamiyo.",
    url: "https://queenmakeupartistry.com",
    siteName: "Queen Makeup Artistry",
    images: [
      {
        url: "/assets/images/hero_glam_shoot.png",
        width: 1200,
        height: 630,
        alt: "Editorial Bridal Makeup Look by Queen MUA",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        {/* FontAwesome for Icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          precedence="default"
        />
      </head>
      <body className="font-sans antialiased text-obsidian bg-champagne">
        <CustomCursor />
        <Header />
        <main className="min-height-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
