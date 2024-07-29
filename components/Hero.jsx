import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section
      className="hero relative bg-green-500 min-h-[60svh] md:min-h-[50svh] py-5 lg:min-h-[85svh] 2xl:min-h-[75svh] flex flex-col justify-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url("/images/HERO_IMG.png")` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="container z-10 max-w-screen-lg mx-auto h-full flex flex-col">
        <div className="hero-logo flex items-center">
          <h1 className="sr-only">
            Becas del Uruguay, alcanza tus metas educativas
          </h1>
          <Image
            src={"/images/LOGO_BECA2.png"}
            width={318}
            height={206}
            alt="Becas MEC"
            className="mx-5 xl:mx-0 w-1/2 md:w-1/4"
          />
        </div>
        <div className="hero-text flex flex-col gap-2 mx-5 xl:mx-0">
          <h2 className="text-3xl font-extrabold 2xl:text-4xl">
            ¡Te damos la bienvenida!
          </h2>
          <p className="text-sm md:w-2/3 2xl:text-lg">
            Sin importar en qué lugar del país te encuentres, Becas UY te
            permite conocer todos los beneficios para estudiantes que otorgan
            instituciones públicas de nuestro país. Para encontrar la beca que
            se ajusta a tus necesidades, contás con parámetros como edad, nivel
            académico a cursar y departamento donde se ofrece. Hacer realidad tu
            trayectoria educativa es posible, ¡animate!
          </p>
          <p className="block text-xs text-white/60">
            Desarrollado por el Ministerio de Educación y Cultura
          </p>
        </div>
        <div className="p-5 md:py-0 lg:p-0 w-full md:w-fit mt-5">
          <Link
            scroll
            href="#encontraTuBeca"
            className="text-white block font-bold text-center w-full md:w-fit border border-white/60 bg-green-500 transition-colors ease-in-out px-12 py-3 rounded-full hover:bg-green-600"
          >
            Buscar Becas
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
