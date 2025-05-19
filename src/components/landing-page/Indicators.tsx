import { indicators } from '@/constants';

export function Indicators() {
  return (
    <div className="flex flex-col items-center gap-12 px-6 py-10 sm:px-12 sm:py-16 lg:px-48 lg:py-20">
      <h2 className="text-center text-2xl font-bold sm:text-2xl lg:text-3xl">
        Nuestros indicadores
      </h2>
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12">
        {indicators.map((ind) => (
          <div
            key={ind.title}
            className="flex max-w-sm min-w-[280px] flex-1 flex-col gap-6 rounded-2xl bg-white p-8 shadow-md sm:p-6"
          >
            <h3 className="text-xl font-bold sm:text-xl lg:text-2xl">{ind.title}</h3>
            <p className="text-lg leading-loose lg:text-lg">{ind.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
