import Image from 'next/image';
import { Button } from '../ui/button';

export function Welcome() {
  return (
    <div className="relative flex flex-col items-center justify-between gap-8 p-10 md:flex-row md:px-16 lg:px-48">
        {/*<Image src="/Foto_Propuesta_JA.jpg"
            width={}
            height={}
            alt=""
            className=""
        />*/}
      <div className="flex w-full flex-col items-center gap-4 text-center md:w-[686px] md:items-start md:text-left bg-uaq-default-50/10 rounded-4xl p-5">
        <h1 className="text-4xl font-bold text-uaq-default-50">
          Publica tu oferta de empleo y encuentra al talento ideal para el puesto
        </h1>

        {/*<p className="w-[400px] text-zinc-800">
          Tu talento merece volar alto. 
          Esta plataforma es el puente entre lo que eres y lo que sueñas. 
          Explora vacantes, postúlate fácilmente y haz que tu historia profesional despegue con la fuerza UAQ.
        </p>*/}

        <div className="mt-12 flex gap-4">
          <Button variant="primary">Registra a tu empresa</Button>
        </div>
      </div>
    </div>
  );
}

