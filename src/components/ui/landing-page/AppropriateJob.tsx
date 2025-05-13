'use client'
import { careers1, careers2 } from "@/constants";
import { Chip } from "@nextui-org/react";

export function AppropriateJob() {
  const repeatedCareers1 = [...careers1, ...careers1];
  const repeatedCareers2 = [...careers2, ...careers2];

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      {/* Mobile Careers 1 */}
      <div className="block md:hidden w-full overflow-hidden">
        <div className="flex gap-2 animate-scroll">
          {repeatedCareers1.map((car, idx) => (
            <Chip className="bg-transparent box-border border-2 border-default py-5 px-4 text-zinc-400 flex-shrink-0" key={`careers1-${idx}`}>
              {car}
            </Chip>
          ))}
        </div>
      </div>

      {/* Desktop Careers 1 */}
      <div className="hidden md:flex flex-wrap max-w-[460px] gap-2 items-start">
        {careers1.map(car => (
          <Chip className="bg-transparent box-border border-2 border-default py-5 px-4 text-zinc-400" key={car}>
            {car}
          </Chip>
        ))}
      </div>

      {/* Principal Text */}
      <div className="flex flex-col flex-1 items-center justify-center gap-8 text-center">
        <h2 className="text-3xl font-bold">Encuentra el empleo adecuado</h2>
        <p className="leading-loose">
          En la era moderna, encontrar el empleo perfecto puede ser un desafío, pero no tiene por qué serlo. 
          Nuestra plataforma de bolsa de trabajo, especialmente diseñada para la comunidad universitaria, 
          está aquí para facilitar tu búsqueda y conectar talento con oportunidades.
        </p>
      </div>

      {/* Mobile Careers 2 */}
      <div className="block md:hidden w-full overflow-hidden">
        <div className="flex gap-2 animate-scroll-reverse">
          {repeatedCareers2.map((car, idx) => (
            <Chip className="bg-transparent box-border border-2 border-default py-5 px-4 text-zinc-400 flex-shrink-0" key={`careers2-${idx}`}>
              {car}
            </Chip>
          ))}
        </div>
      </div>

      {/* Desktop Careers 2 */}
      <div className="hidden md:flex flex-wrap max-w-[460px] gap-2 justify-end">
        {careers2.map(car => (
          <Chip className="bg-transparent box-border border-2 border-default py-5 px-4 text-zinc-400" key={car}>
            {car}
          </Chip>
        ))}
      </div>
    </div>
  );
}
