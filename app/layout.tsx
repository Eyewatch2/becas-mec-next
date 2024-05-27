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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={manrope.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
