"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import NoticiaCard from "./NoticiaCard";

import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { stables } from "@/stables/stables";

const NoticiasSwiper = () => {
  const [noticias, setNoticias] = useState([]);
  const [noticiasLoading, setNoticiasLoading] = useState(false);

  useEffect(() => {
    const fetchNoticias = async () => {
      setNoticiasLoading(true);
      try {
        const response = await fetch(`${stables.API_URL}/noticias?limit=1000`);
        const data = await response.json();
        setNoticias(data.docs);
      } catch (error) {
        console.error("Error fetching noticias:", error);
      }
      setNoticiasLoading(false);
    };
    fetchNoticias();
  }, []);

  return (
    <div className="w-full px-20 py-6">
      {noticiasLoading && <p className="text-xl text-white text-center">Cargando noticias...</p>}
      <Swiper
        containerMessage="Noticias"
        containerRoleDescriptionMessage="Noticias"
        enabled={true}
        itemRoleDescriptionMessage="Noticia {{index}} de {{total}}"
        lastSlideMessage="Última noticia"
        nextSlideMessage="Siguiente noticia"
        notificationClass="swiper-notification"
        paginationBulletMessage="Go to slide {{index}}"
        prevSlideMessage="Noticia anterior"
        slideLabelMessage="Noticia {{index}}"
        slideRoleDescriptionMessage="Noticia"
        slideRole="group"
        autoplay
        modules={[Navigation]}
        spaceBetween={50}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          }
        }}
      >
        {noticias.filter(b => b.mostrar).map((noticia) => (
          <SwiperSlide key={noticia.id} className="p-2">
            <NoticiaCard
              img={noticia.imagen}
              link={noticia.link}
              title={noticia.titulo}
            />
          </SwiperSlide>
        
        ))}
     
      </Swiper>
      <button
        aria-label="Siguiente noticia"
        className="absolute after:hidden hover:scale-125 transition disabled:!opacity-35 font-bold !text-white translate-y-full swiper-button-next"
      >
        <FaAngleRight />
      </button>
      <button
        aria-label="Noticia previa"
        className="absolute after:hidden font-bold !text-white translate-y-full swiper-button-prev"
      >
        <FaAngleLeft />
      </button>
    </div>
  );
};

export default NoticiasSwiper;
