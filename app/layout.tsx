import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Becas Uruguay | Ministerio de Educacion y Cultura",
  description: "Este es un sitio donde puedes buscar y encontrar becas que se ajusten a tus necesidades y objetivos académicos. Ofrecemos una amplia variedad de becas en diferentes campos y niveles de estudio. Nuestro objetivo es ayudarte a alcanzar tus metas educativas sin la preocupación financiera.",
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
