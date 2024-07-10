import NoticiasSwiper from "./ui/NoticiasSwiper";
const BottomInfoBanner = () => {
  return (
    <section
      className="max-w-screen-lg w-full mx-auto px-10 pb-16 relative min-h-[80svh] md:min-h-[60svh] lg:min-h-[80svh] 2xl:min-h-[60svh] bg-cover grid place-content-center bg-center "
      style={{ backgroundImage: `url("/images/FOOTER_IMG.png")` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="absolute inset-0 w-full z-10 text-center justify-center md:text-right flex flex-col gap-8 items-center">
        <h2 className="text-3xl text-center md:text-5xl w-[calc(100%-1.25rem)] font-extrabold text-white">
          ¡Últimas Noticias!
        </h2>
        <NoticiasSwiper />
      </div>
    </section>
  );
};

export default BottomInfoBanner;
