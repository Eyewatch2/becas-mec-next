import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-500 text-green-500 px-5 xl:px-0">
      <div className="max-w-screen-lg mx-auto py-8 flex items-center justify-between">
        <Image
          width={180}
          height={86}
          src={"/images/LOGO_BLANCO.png"}
          className="w-1/4 md:w-1/6 lg:w-1/12"
          alt="Logo blanco"
        />
        <ul className="footer-links flex gap-4">
          <li>
            <Link
              href="https://www.facebook.com/MecUru/"
              target="_blank"
              aria-label="Enlace a Facebook en otra ventana"
              className="w-8 h-8 grid place-content-center md:hover:scale-110 transition-all ease-in-out bg-white aspect-square rounded-full"
            >
              <span className="sr-only">Enlace a Facebook</span>
              <FaFacebookF className="text-lg" />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.instagram.com/becas.uruguay"
              target="_blank"
              aria-label="Enlace a Instagram en otra ventana"
              className="w-8 h-8 grid place-content-center md:hover:scale-110 transition-all ease-in-out bg-white aspect-square rounded-full"
            >
              <span className="sr-only">Enlace a Instagram</span>
              <FaInstagram className="text-xl" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-2 text-white text-xs mx-auto flex flex-col justify-between md:flex-row gap-5">
        <div className="flex flex-col lg:flex-row justify-between max-w-screen-lg mx-auto items-center w-full">
          <p className="text-left col-span-10 md:w-3/4">
            El Ministerio de Educación y Cultura no se hace responsable de la
            información presentada. Ante cualquier consulta, contactarse con la
            institución a cargo de la beca.
          </p>
          <p className=" flex gap-2 items-center">
            ¿Encontraste un error?{" "}
            <Link
              href={"mailto:error@becas.edu.uy"}
              aria-label="Reportar error"
              className="underline grid place-content-center hover:text-red-500"
            >
              Reportar
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
