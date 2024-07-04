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
  "Apoyo Económico": "/images/apoyo_economico.png",
  Transporte: "/images/transporte.png",
  Alojamiento: "/images/alojamiento.png",
  Alimentación: "/images/alimentacion.png",
  "Material de estudio": "/images/material_de_estudio.png",
  Otros: "/images/otros.png",
};
const tagBgColorClass = {
  "Apoyo Económico": "bg-amber-900",
  Transporte: "bg-red-900",
  Alojamiento: "bg-blue-900",
  Alimentación: "bg-orange-900",
  "Material de estudio": "bg-purple-800",
  Otros: "bg-green-900",
};

const textByType = {
  "Apoyo Económico": "text-yellow-900",
  Transporte: "text-red-100",
  Alojamiento: "text-blue-100",
  Alimentación: "text-orange-900",
  "Material de estudio": "text-purple-100",
  Otros: "text-green-100",
};

const CardIcon = ({ tipo }) => {
  switch (tipo) {
    case "Apoyo Económico":
      return (
        <Image
          width={20}
          height={20}
          src={apoyo_economico}
          alt="Apoyo Económico"
        />
      );
    case "Transporte":
      return <Image width={20} height={20} src={transporte} alt="Transporte" />;
    case "Alojamiento":
      return (
        <Image width={20} height={20} src={alojamiento} alt="Alojamiento" />
      );
    case "Alimentación":
      return (
        <Image
          width={16}
          height={16}
          src={iconAlimentacion}
          alt="Alimentación"
        />
      );
    case "Material de estudio":
      return (
        <Image
          width={20}
          height={20}
          src={material_de_estudio}
          alt="Material de estudio"
        />
      );
    case "Otros":
      return <Image width={20} height={20} src={otros} alt="Otros" />;
    default:
      return <Image width={20} height={20} src={todas} alt="Todas" />;
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
      className="w-full bg-black rounded-xl cursor-pointer md:w-[calc(31.5%)] md:hover:scale-110 transition-all ease-in-out md:px-0"
    >
      <div
        className={`relative rounded-xl overflow-hidden pt-[35%] md:pt-[70%]`}
      >
        <div className="absolute inset-0 bg-cover bg-center"></div>
        <div
          className={`absolute text-left z-10 top-0 left-0 p-4  ${textByType[tipo]}`}
        >
          <h2 className="font-bold text-md md:text-xl">{nombre}</h2>
          <span className="font-light text-xs md:text-base">{institucion}</span>
        </div>
        {estaVigente ? (
          <div
            className={`text-xs font-bold z-10 absolute bottom-3 right-3 ${tagBgColorClass[tipo]} text-white px-2 py-1 rounded-2xl`}
          >
            ¡Inscribite Hoy!
          </div>
        ) : (
          <div
            className={`text-xs z-10 absolute bottom-3 right-3 lowercase ${tagBgColorClass[tipo]} text-white px-2 py-1 rounded-2xl`}
          >
            {tipo}
          </div>
        )}

        <div
          className={`text-xs z-10 absolute bottom-3 left-3 text-white px-2 py-1 rounded-2xl`}
        >
          {CardIcon({ tipo })}
        </div>
        <div
          className={`absolute w-full h-full bg-black bg-cover inset-0 bg-gradient-to-t`}
          style={{ backgroundImage: `url(${bgImageClass[tipo]})` }}
        ></div>
      </div>
    </button>
  );
};

export default Card;
