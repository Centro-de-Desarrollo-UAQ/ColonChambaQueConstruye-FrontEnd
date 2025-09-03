'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import clsx from 'clsx';
import router from 'next/router';

export function Metrics() {
  return (
    <div
    className="flex flex-col items-center gap-12 px-6 pt-10 pb-10 lg:flex-row lg:px-48 lg:pt-20 lg:pb-20"
    >
    <div
        className={clsx(
        'flex flex-1 flex-col gap-4 p-4 text-center lg:p-20 lg:text-left',
        'lg:order-1',
        )}
    >
        <h3 className="mt-[-5] mb-5 text-3xl font-bold">Existen más de 200 empresas</h3>
        {/* El siguiente texto deberia de ser un componente Link? o simplemente una etiqueta <h>? */}
        <Link href={""} className='text-uaq-brand hover:text-uaq-accent-hover transition duration-500'>Utilizan nuestra bolsa de trabajo</Link>
        <p className="mb-5 leading-loose">
            Nuestra plataforma les da la facilidad de poder publicar su empleo junto con otras empresas de prestigio como la suya
        </p>
        <Button
        onClick={() => router.push("")}
        variant="primary"
        className="mx-auto w-fit lg:mx-0"
        >
        Publica una vacante
        </Button>
    </div>

    {/*<Image
        src={"/Found_15.jpg"}
        fill
        alt=""
        className={clsx(
        'aspect-square flex-1 rounded-[32px] object-cover',
        'lg:order-1',
        )}
        sizes="(max-width: 768px) 100vw, 800px"
    />*/}
    <div className={clsx("relative flex-1 h-[450px]","lg:order-1")}>
      <Image
        src="/Found_15.jpg"
        alt=""
        fill
        //className="rounded-[32px] object-cover"
        className="rounded-[32px]"
      />
    </div>
    </div>
  );
}