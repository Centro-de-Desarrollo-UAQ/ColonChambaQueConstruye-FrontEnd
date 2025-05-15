import Image from 'next/image';
import { Button } from '../button';

export function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-between gap-8 p-10 md:flex-row md:px-16 lg:px-48">
      <div className="flex w-full flex-col items-center gap-4 text-center md:w-[686px] md:items-start md:text-left">
        <h1 className="text-4xl font-bold text-zinc-800">
          Plataforma virtual de empleo y bolsa de trabajo UAQ
        </h1>

        <p className="w-[400px] text-zinc-800">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique non dolor sit
          amet dapibus. In et sollicitudin sapien. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Aliquam tristique non dolor sit amet dapibus. In et sollicitudin sapien.
        </p>

        <div className="mt-12 flex gap-4">
          <Button variant="default">Regístrate ahora</Button>
          <Button variant="ghost">Inicia sesión</Button>
        </div>
      </div>

      <div className="relative h-[406px] w-full md:h-[450px] md:w-[630px]">
        <Image
          src="/hero-image-2.png"
          width={320}
          height={336}
          alt=""
          className="absolute top-0 right-0"
        />

        <Image
          src="/hero-image-1.png"
          width={320}
          height={336}
          alt=""
          className="absolute bottom-0 bottom-[-80px] left-0"
        />
      </div>
    </div>
  );
}
