import Link from 'next/link';
import Image from 'next/image';
import { faculties } from '@/constants';

export function UaqOffers() {
  return (
    <div className="flex flex-col items-center gap-12 px-6 sm:px-12 lg:px-48">
      <h3 className="text-center text-2xl font-bold sm:text-3xl lg:text-4xl">
        En la UAQ también creemos en ti
      </h3>

      <p className="mx-4 text-center text-sm leading-loose sm:mx-12 sm:text-base lg:mx-24 lg:text-lg">
        Un puente abierto para ti, que buscas crecer, conectar y encontrar un espacio donde tu
        talento cuente.
      </p>

      <Link
        href="https://www.uaq.mx/index.php/oferta-educativa/programas-educativos"
        className="text-uaq-brand text-sm underline transition-all hover:scale-105 sm:text-base lg:text-lg"
        target="_blank"
      >
        Ver oferta educativa UAQ
      </Link>

      <Image
        //src="https://wizi.academy/assets/img/landings/Fondo-UAQ.webp"
        src="/Foto_Propuesta_JA.jpg"
        alt="Oferta Educativa UAQ"
        width={700}
        height={400}
        className="mb-10 h-[400px] w-full rounded-3xl object-cover sm:w-[400px] md:w-[600] lg:w-[700px]"
      />

      <div className="flex flex-wrap justify-center gap-4 px-4 sm:px-12 lg:px-0">
        {faculties.map((fac) => (
          <Link
            key={fac.name}
            target="_blank"
            href={fac.href}
            className="flex w-[calc(100%-1rem)] items-center gap-4 transition-all hover:scale-105 sm:w-60 lg:w-80"
          >
            <span className={`block h-8 w-8 rounded-full ${fac.color}`}></span>
            <span className="line-clamp-1 text-sm sm:text-base lg:text-lg">{fac.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
