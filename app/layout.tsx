import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Becas Uruguay | Ministerio de Educación y Cultura",
  description:
    "Descubre la beca perfecta que se adapte a tus necesidades y metas académicas en una amplia variedad de campos y niveles de estudio",
  keywords:
    "becas, uruguay, educación, cultura, ministerio, estudio, financiamiento, educativo",
  twitter: {
    card: "summary",
    description:
      "Descubre la beca perfecta que se adapte a tus necesidades y metas académicas en una amplia variedad de campos y niveles de estudio",
  },
  icons: {
    icon: "/favicon.ico",
  },
  creator: "Nicestream",
  category: "Education",
  openGraph: {
    type: "website",
    locale: "es_UY",
    title: "Becas Uruguay | Ministerio de Educación y Cultura",
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
          href="/favicon.ico"
          type="image/x-icon"
          sizes="16x16"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={manrope.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
