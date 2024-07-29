import React from "react";
import iconAlimentacion from "@/components/ui/svg/alimentacion.svg";
import alojamiento from "@/components/ui/svg/alojamiento.svg";
import apoyo_economico from "@/components/ui/svg/apoyo_economico.svg";
import material_de_estudio from "@/components/ui/svg/material_de_estudio.svg";
import otros from "@/components/ui/svg/otros.svg";
import todas from "@/components/ui/svg/todas.svg";
import transporte from "@/components/ui/svg/transporte.svg";
import Image from "next/image";

const bgImageClass = {
  "apoyo económico": "/images/apoyo_economico.png",
  transporte: "/images/transporte.png",
  alojamiento: "/images/alojamiento.png",
  alimentación: "/images/alimentacion.png",
  "material de estudio": "/images/material_de_estudio.png",
  otros: "/images/otros.png",
};
const tagBgColorClass = {
  "apoyo económico": "bg-amber-900",
  transporte: "bg-red-900",
  alojamiento: "bg-blue-900",
  alimentación: "bg-orange-900",
  "material de estudio": "bg-purple-800",
  otros: "bg-green-900",
};

const textByType = {
  "apoyo económico": "text-yellow-900",
  transporte: "text-red-100",
  alojamiento: "text-blue-100",
  alimentación: "text-orange-900",
  "material de estudio": "text-purple-100",
  otros: "text-green-100",
};

const bgByType = {
  "apoyo económico": "bg-white",
  transporte: "bg-black",
  alojamiento: "bg-black",
  alimentación: "bg-black",
  "material de estudio": "bg-black",
  otros: "bg-black",
};

const CardIcon = ({ tipo }) => {
  switch (tipo.toLowerCase()) {
    case "apoyo económico":
      return (
        <Image
          role="none"
          width={20}
          height={20}
          src={apoyo_economico}
          alt="apoyo económico"
        />
      );
    case "transporte":
      return (
        <Image
          role="none"
          width={20}
          height={20}
          src={transporte}
          alt="transporte"
        />
      );
    case "alojamiento":
      return (
        <Image
          role="none"
          width={20}
          height={20}
          src={alojamiento}
          alt="alojamiento"
        />
      );
    case "alimentación":
      return (
        <Image
          role="none"
          width={16}
          height={16}
          src={iconAlimentacion}
          alt="alimentación"
        />
      );
    case "material de estudio":
      return (
        <Image
          role="none"
          width={20}
          height={20}
          src={material_de_estudio}
          alt="material de estudio"
        />
      );
    case "otros":
      return (
        <Image role="none" width={20} height={20} src={otros} alt="otros" />
      );
    default:
      return (
        <Image role="none" width={20} height={20} src={todas} alt="Todas" />
      );
  }
};

const Card = ({ beca, openModal }) => {
  const { nombre, institucion, tipo, inicio_postulacion, fin_postulacion } =
    beca;
  const fechaActual = new Date();
  const fechaInicio = new Date(inicio_postulacion);
  const fechaFin = new Date(fin_postulacion);

  const estaVigente = fechaActual >= fechaInicio && fechaActual <= fechaFin;

  return (
    <button
      onClick={() => openModal(beca)}
      className={`w-full rounded-xl cursor-pointer md:w-[calc(31.5%)] md:hover:scale-110 transition-all ease-in-out md:px-0 ${bgByType[tipo]}`}
    >
      <div
        className={`relative rounded-xl overflow-hidden pt-[35%] md:pt-[70%]`}
      >
        <div className="absolute inset-0 bg-cover bg-center"></div>
        <div
          className={`absolute text-left z-10 top-0 left-0 p-4  ${
            textByType[tipo.toLowerCase()]
          }`}
        >
          <h2 className="font-bold text-md md:text-xl">{nombre}</h2>
          <span className="font-light text-xs md:text-base">{institucion}</span>
        </div>
        {estaVigente ? (
          <div
            className={`text-xs font-bold z-10 absolute bottom-3 right-3 ${
              tagBgColorClass[tipo.toLowerCase()]
            } text-white px-2 py-1 rounded-2xl`}
          >
            ¡Inscribite Hoy!
          </div>
        ) : (
          <div
            className={`text-xs z-10 absolute bottom-3 right-3 lowercase ${
              tagBgColorClass[tipo.toLowerCase()]
            } text-white px-2 py-1 rounded-2xl`}
          >
            {tipo}
          </div>
        )}

        <div
          className={`text-xs z-10 absolute bottom-3 left-3 text-white px-2 py-1 rounded-2xl`}
        >
          {CardIcon({ tipo })}
        </div>
        {tipo}
        <div
          className={`absolute w-full h-full bg-black bg-cover inset-0 bg-gradient-to-t`}
          style={{
            backgroundImage: `url(${bgImageClass[tipo.toLowerCase()]})`,
          }}
        ></div>
      </div>
    </button>
  );
};

export default Card;
