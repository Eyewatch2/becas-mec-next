"use client";
import { stables } from "@/stables/stables";
import React, { useMemo, useState, useEffect } from "react";

const ActiveBecasModal = () => {
  const [showModal, setShowModal] = useState(false);
  const today = useMemo(() => new Date(), []);
  const [content, setContent] = useState(null);
  const [configLoading, setConfigLoading] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      setConfigLoading(true);
      try {
        const response = await fetch(`${stables.API_URL}/config?limit=1000`);
        const data = await response.json();
        setContent(data.docs[0]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setConfigLoading(false);
    };
    fetchConfig();

    if (!configLoading) {
      const lastModalOpen = localStorage.getItem("lastModalOpen");
      if (lastModalOpen) {
        const lastModalOpenTime = new Date(lastModalOpen);
        const diffInMinutes = ((today - lastModalOpenTime) / 1000) / 60;
        if (diffInMinutes < 1) return;
      }

      const timeoutId = setTimeout(() => {
        localStorage.setItem("lastModalOpen", new Date().toISOString());
        setShowModal(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today]);

  const month = today.toLocaleString("default", { month: "long" });

  return (
    <>
      {!configLoading && content && content.modal && showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-5 max-w-xl rounded-xl w-11/12 md:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center text-lg uppercase tracking-[0.6rem] font-bold text-green-500">
              {content.modal_automated || !content.modal_group?.modal_title
                ? `¡BECAS DE ${month.toUpperCase()} ABIERTAS!`
                : content.modal_group.modal_title}
            </h2>
            <p className="mt-5">
              {content.modal_automated || !content.modal_group?.modal_text
                ? `¡No te pierdas la oportunidad de postularte a las becas de
                  ${" " + month}! Ingresa a la sección de becas para conocer más
                  detalles.`
                : content.modal_group.modal_text}
            </p>
            <div className="flex justify-center mt-5">
              <button
                autoFocus
                className="bg-red-800 red-button hover:bg-red-700 transition w-full md:w-1/2 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActiveBecasModal;
