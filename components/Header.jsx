 import { FaFacebookF, FaInstagram } from "react-icons/fa";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="min-w-[10svh] px-5 xl:px-0 w-full border-b-4 border-green-500 bg-white">
      <div className="container max-w-screen-lg mx-auto font-manrope">
        <div className="flex justify-between items-center py-4">
          <div className="logo">
            <Image
              className="w-1/2"
              width={168}
              height={90}
              src={"/images/LOGO_BECA1.png"}
              alt="Becas MEC"
            />
          </div>
          <div className="seguinos flex gap-4 items-center">
            <p className="text-sm text-green-500 font-bold">Seguinos</p>
            <ul className="flex gap-2 text-white">
              <li>
                <Link
                  href="https://www.facebook.com/MecUru/"
                  target="_blank"
                  aria-label="Enlace a Facebook en otra ventana"
                  rel="noreferrer noopener"
                  className="w-8 h-8 grid place-content-center bg-green-500 hover:bg-green-600 transition-colors ease-in-out aspect-square rounded-full"
                >
                  <span className="sr-only">Enlace a Facebook</span>
                  <FaFacebookF className="w-full h-full text-lg" />
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.instagram.com/becas.uruguay"
                  target="_blank"
                  aria-label="Enlace a Instagram en otra ventana"
                  className="w-8 h-8 grid place-content-center bg-green-500 aspect-square hover:bg-green-600 transition-colors ease-in-out rounded-full"
                >
                  <span className="sr-only">Enlace a Instagram</span>
                  <FaInstagram className="w-full h-full text-xl" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
