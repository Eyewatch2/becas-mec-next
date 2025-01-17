import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://becas.edu.uy"),
  title: "Becas Uruguay | Ministerio de Educación y Cultura",
  description:
    "Descubre la beca perfecta que se adapte a tus necesidades y metas académicas en una amplia variedad de campos y niveles de estudio",
  keywords:
    "becas, uruguay, educación, cultura, ministerio, estudio, financiamiento, educativo",
  twitter: {
    card: "summary",
    images: [
      {
        url: "/images/og-image.png",
        width: 1920,
        height: 918,
        alt: "Becas Uruguay | Ministerio de Educación y Cultura",
      },
    ],
    description:
      "Descubre la beca perfecta que se adapte a tus necesidades y metas académicas en una amplia variedad de campos y niveles de estudio",
  },
  icons: {
    icon: "/favicon-32x32.png",
  },
  creator: "Nicestream",
  category: "Education",
  openGraph: {
    type: "website",
    locale: "es_UY",
    title: "Becas Uruguay | Ministerio de Educación y Cultura",
    images: [
      {
        url: "/images/og-image.png",
        width: 1920,
        height: 918,
        alt: "Becas Uruguay | Ministerio de Educación y Cultura",
      },
    ],
    siteName: "Becas Uruguay",
    countryName: "Uruguay",
    description:
      "Descubre la beca perfecta que se adapte a tus necesidades y metas académicas en una amplia variedad de campos y niveles de estudio",
    url: "https://becas.edu.uy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          rel="icon"
          href="/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={manrope.className}>
        <Header />
        {children}
      </body>
      <GoogleAnalytics gaId="G-PSCDPXCZFS" />
    </html>
  );
}
