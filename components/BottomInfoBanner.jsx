import Link from "next/link";

const BottomInfoBanner = () => {
  return (
    <section
      className="max-w-screen-lg overflow-hidden w-full mx-auto px-10 pb-16 relative min-h-[60svh] md:min-h-[45svh] lg:min-h-[80svh] 2xl:min-h-[60svh] bg-cover grid place-content-center bg-center "
      style={{ backgroundImage: `url("/images/FOOTER_IMG.png")` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="absolute inset-0 w-full z-10 text-center justify-center md:text-right flex flex-col gap-8 items-center">
        <h2 className="text-2xl text-center md:text-3xl w-[calc(100%-1.25rem)] font-extrabold text-white">
          ¿Buscas información sobre becas de estudio?
        </h2>
        <p className="text-white text-center text-base  w-[calc(100%-1.25rem)] md:w-2/3 md:text-xl">
          Descargá nuestra guía completa de becas de estudio y encontrá la que
          se ajuste a tus necesidades. ¡No te quedes sin tu beca!
        </p>
        <Link
          scroll
          href="#"
          className="text-white block font-bold text-center w-full md:w-fit bg-green-500 transition-colors ease-in-out px-12 py-3 rounded-full hover:bg-green-600"
        >
          ¡Descargá ya!
        </Link>
      </div>
    </section>
  );
};

export default BottomInfoBanner;
