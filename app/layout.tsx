import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Becas Uruguay | Ministerio de Educacion y Cultura",
  description: "Descubre la beca perfecta que se adapte a tus necesidades y metas académicas en una amplia variedad de campos y niveles de estudio",
  keywords: "becas, uruguay, educacion, cultura, ministerio, estudio, financiamiento, educativo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        {children}
        </body>
    </html>
  );
}
