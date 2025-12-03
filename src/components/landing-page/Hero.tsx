import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
export function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-between gap-8 p-10 md:flex-row md:px-16 lg:px-48">
      <div className="flex w-full flex-col items-center gap-4 text-center md:w-[686px] md:items-start md:text-left">
        <h1 className="text-4xl font-bold text-zinc-800">
          Plataforma virtual de empleo y bolsa de trabajo del Municipio  de Colón!
        </h1>

        <p className="w-[400px] text-zinc-800">
          Conecta con oportunidades laborales en tu municipio. Nuestra bolsa de trabajo en línea facilita el encuentro entre empresas 
          y buscadores de empleo, impulsando el desarrollo económico y profesional en Colón.
        </p>

        <div className="mt-12 flex gap-4">
          <Link href={"/signup/applicant"}>
              <Button variant="primary" color='terniary'>Regístrate ahora</Button>
          </Link>
        </div>
      </div>

      <div className="relative h-[575px] w-full md:h-[575px] md:w-[630px]">
        <Image
          src="/Hero-1.png"
          width={510}
          height={339}
          alt=""
          className="absolute top-0 right-0"
        />

        <Image
          src="/Hero-2.png"
          width={518}
          height={348}
          alt=""
          className="absolute bottom-0 bottom-[-80px] left-0"
        />
      </div>
    </div>
  );
}
