"use client";
import React, { useMemo, useState, useEffect } from "react";

const ActiveBecasModal = () => {
  const [showModal, setShowModal] = useState(false);
  const today = useMemo(() => new Date(), []);

  useEffect(() => {
    const lastModalOpen = localStorage.getItem("lastModalOpen");
    if (lastModalOpen) {
      const lastModalOpenTime = new Date(lastModalOpen);
      const diffInMinutes = (today - lastModalOpenTime) / (1000 * 60);
      if (diffInMinutes < 1) return;
    }

    const timeoutId = setTimeout(() => {
      localStorage.setItem("lastModalOpen", new Date().toISOString());
      setShowModal(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [today]);

  const month = today.toLocaleString("default", { month: "long" });

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-5 max-w-xl rounded-xl w-11/12 md:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center text-lg uppercase tracking-[0.6rem] font-bold text-green-500">
              ¡BECAS DE {month.toUpperCase()} ABIERTAS!
            </h2>
            <p className="mt-5">
              ¡No te pierdas la oportunidad de postularte a las becas de
              {" " + month}! Ingresa a la sección de becas para conocer más
              detalles.
            </p>
            <div className="flex justify-center mt-5">
              <button
                className="bg-red-500 hover:bg-red-600 transition w-full md:w-1/2 text-white px-4 py-2 rounded-lg"
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
