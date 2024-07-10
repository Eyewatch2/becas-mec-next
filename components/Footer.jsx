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
              <FaInstagram className="text-xl"/>
            </Link>
          </li>
        </ul>
      </div>
      <div className="max-w-screen-lg pb-8  text-sm mx-auto flex flex-col justify-between md:flex-row gap-5">
        <p className="text-left max-w-screen-md col-span-10 text-white">
          El Ministerio de Educación y Cultura no se hace responsable de la
          información presentada. Ante cualquier consulta, contactarse con la
          institución a cargo de la beca.
        </p>
        <Link href={"mailto:erro@becas.edu.uy"} aria-label="Reportar error" className="text-white rounded-xl w-fit self-end py-2 px-4 grid place-content-center hover:bg-red-800 transition bg-red-500">Reportar error</Link>
      </div>
    </footer>
  );
};

export default Footer;
