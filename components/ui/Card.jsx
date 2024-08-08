import React from "react";
import Image from "next/image";
import { stables } from "@/stables/stables";


const Card = ({ beca, openModal }) => {
  const { nombre, institucion, tipo, inicio_postulacion, fin_postulacion } =
    beca;
  const fechaActual = new Date();
  const fechaInicio = new Date(inicio_postulacion);
  const fechaFin = new Date(fin_postulacion);

  const estaVigente = fechaActual >= fechaInicio && fechaActual <= fechaFin;

  const tipoData = tipo[0] || [];

  const imagenFondoUrl = tipoData.imagen_fondo?.filename
    ? `${stables.BASE_URL}${tipoData.imagen_fondo.filename}`
    : "";

  const iconoUrl = tipoData.icono?.filename
    ? `${stables.BASE_URL}${tipoData.icono.filename}`
    : "";
  return (
    <button
      onClick={() => openModal(beca)}
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
          className={`absolute text-left z-10 top-0 left-0 p-4`}
          style={{ color: tipoData.textColor ? tipoData.textColor : "#FFFFFF" }}
        >
          <h2 className="font-bold text-md md:text-xl">{nombre}</h2>
          <span className="font-light text-xs md:text-base">{institucion}</span>
        </div>
        {estaVigente ? (
          <div
            className={`text-xs font-bold z-10 absolute bottom-3 right-3 px-2 py-1 rounded-2xl`}
            style={{ backgroundColor: tipoData.color }}
          >
            ¡Inscribite Hoy!
          </div>
        ) : (
          <div
            className={`text-xs gap-1 flex flex-col z-10 absolute bottom-3 right-3 text-white`}
          >
            {tipo.map((t) => (
              <div
                key={t.id}
                className=" lowercase px-2 py-1 rounded-2xl"
                style={{ backgroundColor: tipoData.color }}
              >
                {t.nombre}
              </div>
            ))}
          </div>
        )}

        <div
          className={`text-xs z-10 absolute bottom-3 left-3 text-white px-2 py-1 rounded-2xl`}
        >
          {tipoData.icono && (
            <Image
              src={iconoUrl}
              width={tipoData.icono.width}
              height={tipoData.icono.height}
              alt={`${tipoData.nombre} icon`}
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
