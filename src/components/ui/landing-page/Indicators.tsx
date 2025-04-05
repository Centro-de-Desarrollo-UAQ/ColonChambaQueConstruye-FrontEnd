import { indicators } from "@/constants";

export function Indicators() {
  return (
    <div className="flex flex-col items-center gap-12 px-48 p-20">
      <h2 className="text-3xl font-bold">Nuestros indicadores</h2>
      <div className="flex gap-12">
        {
          indicators.map(ind => (
            <div key={ind.title} className="bg-white flex flex-col flex-1 gap-6 p-6 rounded-2xl shadow-md">
              <h3 className="text-2xl font-bold">{ind.title}</h3>
              <p className="leading-loose">{ind.description}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}