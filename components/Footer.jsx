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
              className="w-8 h-8 grid place-content-center md:hover:scale-110 transition-all ease-in-out bg-white aspect-square rounded-full"
            >
              <span className="sr-only">Enlace a Facebook</span>
              <FaFacebookF />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.instagram.com/mec_uruguay/"
              target="_blank"
              className="w-8 h-8 grid place-content-center md:hover:scale-110 transition-all ease-in-out bg-white aspect-square rounded-full"
            >
              <span className="sr-only">Enlace a Instagram</span>
              <FaInstagram />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
