import { indicators } from "@/constants";

export function Indicators() {
  return (
    <div className="flex flex-col items-center gap-12 px-6 sm:px-12 lg:px-48 py-10 sm:py-16 lg:py-20">
      <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-center">
        Nuestros indicadores
      </h2>
      <div className="flex flex-wrap gap-6 sm:gap-8 lg:gap-12 justify-center">
        {indicators.map((ind) => (
          <div
            key={ind.title}
            className="bg-white flex flex-col flex-1 min-w-[280px] max-w-sm gap-6 p-8 sm:p-6 rounded-2xl shadow-md"
          >
            <h3 className="text-xl sm:text-xl lg:text-2xl font-bold">{ind.title}</h3>
            <p className="text-lg lg:text-lg leading-loose">{ind.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}