import React from "react";
import Image from "next/image";
import { stables } from "@/stables/stables";

const Card = ({ beca, openModal }) => {
  const { nombre, institucion, tipo, inicio_postulacion, fin_postulacion } =
    beca;
  /* const fechaActual = new Date();
  const fechaInicio = new Date(inicio_postulacion);
  const fechaFin = new Date(fin_postulacion);

  const estaVigente = fechaActual >= fechaInicio && fechaActual <= fechaFin; */

  const tipoData = tipo[0] || [];
  const hasMultipleTypes = tipo.length > 1;

  const imagenFondoUrl =
    !hasMultipleTypes && tipoData.imagen_fondo?.filename
      ? `${stables.BASE_URL}${tipoData.imagen_fondo.filename}`
      : "/images/otros.png";

  const iconoUrl =
    !hasMultipleTypes && tipoData.icono?.filename
      ? `${stables.BASE_URL}${tipoData.icono.filename}`
      : "/svg/otros.svg";

  // Función para enviar eventos personalizados a GA4
  const sendAnalyticsEvent = (nombreBeca) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "beca_click", {
        event_category: "Interacción Beca",
        event_label: nombreBeca,
      });
    }
  };

  return (
    <button
      onClick={() => {
        sendAnalyticsEvent(beca.nombre); // Enviar el nombre de la beca a GA
        openModal(beca);
      }}
      className={`w-full rounded-xl cursor-pointer md:w-[calc(31.5%)] md:hover:scale-110 transition-all ease-in-out md:px-0`}
    >
      <div
        className={`relative rounded-xl overflow-hidden pt-[35%] md:pt-[70%]`}
      >
        <div
          className={`absolute inset-0 bg-cover bg-center`}
          style={{ backgroundImage: `url(${imagenFondoUrl})` }}
        ></div>
        <div
          className={`absolute flex flex-col md:gap-2 text-left z-10 top-0 left-0 p-4`}
          style={{
            color: hasMultipleTypes
              ? "#f0fdfa"
              : tipoData.textColor
              ? tipoData.textColor
              : "#FFFFFF",
          }}
        >
          <h2 className="font-bold text-md md:text-xl line-clamp-3 md:line-clamp-4">
            {nombre}
          </h2>
          <span className="font-light text-xs md:text-base">{institucion}</span>
        </div>

        <div
          className={`text-xs gap-1 flex z-10 absolute bottom-3 right-3 text-white`}
        >
          {tipo.slice(0, 1).map((t) => (
            <div
              key={t.id}
              className=" lowercase px-2 py-1 rounded-2xl"
              style={{
                backgroundColor: hasMultipleTypes ? "#134e4a" : tipoData.color,
              }}
            >
              {t.nombre}
            </div>
          ))}
          {tipo.length > 2 && (
            <div
              className="lowercase px-3 py-1 rounded-2xl"
              style={{
                backgroundColor: hasMultipleTypes ? "#134e4a" : tipoData.color,
              }}
            >
              {`+${tipo.length - 1}`}
            </div>
          )}
        </div>

        <div
          className={`text-xs z-10 grid place-content-center pl-2 pb-1 absolute bottom-3 left-3 text-white rounded-2xl`}
        >
          {(tipoData.icono || hasMultipleTypes) && (
            <Image
              src={iconoUrl}
              width={tipoData.icono.width}
              height={tipoData.icono.height}
              alt={`${tipoData.nombre} icon`}
              className={`max-h-[24px] md:max-h-[30px] ${
                nombre.length > 40 && "hidden md:block"
              }`}
            />
          )}
        </div>
        <div
          className={`absolute w-full h-full bg-black bg-cover inset-0 bg-gradient-to-t`}
          style={{
            backgroundImage: `url(${imagenFondoUrl})`,
          }}
        ></div>
      </div>
    </button>
  );
};

export default Card;
