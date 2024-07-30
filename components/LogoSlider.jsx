"use client";

import React from "react";
import { logosAsociados } from "@/data/logosAsociadosData";

import "swiper/css";
import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
const LogoSlider = () => {
  return (
    <section className="w-full bg-[#024b99] h-[15vh] flex items-center justify-center">
      <div className="swiper logoSwiper mx-auto max-w-xl h-fit p-4">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={3.1}
          loop={true}
            autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {logosAsociados.map((logo) => (
            <SwiperSlide
              key={logo.name}
              className={` ${
                logo.double ? "min-w-[64.5%] md:min-w-[calc(50%-30px)]" : "w-full"
              } `}
            >
              <Image
                width={logo.double ? 800 : 400}
                height={400}
                src={logo.src}
                alt={logo.alt}
                className={`invert brightness-0 object-contain`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default LogoSlider;
