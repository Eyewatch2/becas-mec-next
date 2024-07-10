import { stables } from "@/stables/stables";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NoticiaCard = ({ title, img, link }) => {
  return (
    <article className="w-full hover:scale-105 transition bg-green-500 border rounded-2xl overflow-hidden">
      <Link aria-label={`Link externo al artículo sobre ${"a"}`} target="_blank" href={link}>
        <Image
          src={`${stables.BASE_URL}${img.filename}`}
          width={img.width}
          height={img.height}
          alt={title}
          className="w-full aspect-square object-cover"
        />
        <div className="py-2 px-3">
          <h3 className="text-sm min-h-[calc(2em+0.5rem)] font-lg text-left text-white font-bold line-clamp-2">
            {title}
          </h3>
        </div>
      </Link>
    </article>
  );
};

export default NoticiaCard;
