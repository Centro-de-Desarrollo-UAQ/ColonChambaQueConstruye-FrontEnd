import Link from "next/link";
import Image from "next/image";
import { faculties } from "@/constants";

export function UaqOffers() {
  return (
    <div className="flex flex-col gap-12 px-6 sm:px-12 lg:px-48 items-center">
      <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center">
        Conoce la oferta educativa de la UAQ
      </h3>

      <p className="mx-4 sm:mx-12 lg:mx-24 text-center leading-loose text-sm sm:text-base lg:text-lg">
        Explora la amplia gama de programas académicos que ofrecemos.
        Desde licenciaturas hasta maestrías y doctorados, nuestra universidad
        te brinda la educación de calidad que necesitas para alcanzar tus metas.
      </p>

      <Link
        href="https://www.uaq.mx/index.php/oferta-educativa/programas-educativos"
        className="text-uaq-brand underline hover:scale-105 transition-all text-sm sm:text-base lg:text-lg"
        target="_blank"
      >
        Ver oferta educativa UAQ
      </Link>

      <Image
        src="https://wizi.academy/assets/img/landings/Fondo-UAQ.webp"
        alt="Oferta Educativa UAQ"
        width={700} 
        height={400} 
        className="rounded-3xl w-full sm:w-[400px] md:w-[600] lg:w-[700px] h-[400px] object-cover mb-10"
       />

      <div className="flex flex-wrap justify-center gap-4 px-4 sm:px-12 lg:px-0">
        {faculties.map((fac) => (
          <Link
            key={fac.name}
            target="_blank"
            href={fac.href}
            className="flex gap-4 items-center w-[calc(100%-1rem)] sm:w-60 lg:w-80 hover:scale-105 transition-all"
          >
            <span
              className={`block w-8 h-8 rounded-full ${fac.color}`}
            ></span>
            <span className="line-clamp-1 text-sm sm:text-base lg:text-lg">
              {fac.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}