"use client";
import { stables } from "@/stables/stables";
import Link from "next/link";
import { useEffect, useState } from "react";

const DownloadBtn = () => {
  const [pdf, setPdf] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  useEffect(() => {
    const fetchPdf = async () => {
      setPdfLoading(true);
      try {
        const response = await fetch(
          `${stables.API_URL}/config`
        );
        const data = await response.json();
        setPdf(data.docs[0]);
      } catch (error) {
        console.error("Error fetching becas:", error);
      }
      setPdfLoading(false);
    };

    fetchPdf();
  }, []);

  return (
    <Link
      href={pdf ? `${stables.BASE_URL}${pdf.pdf.filename}` : "#"}
      target="_blank"
      className="border border-white/60 text-white block font-bold text-center w-11/12 md:w-fit bg-green-500 transition-colors ease-in-out px-12 py-3 rounded-full hover:bg-green-600"
    >
      {pdfLoading ? "Cargando..." : "¡Descargá ya!"}
    </Link>
  );
};

export default DownloadBtn;
