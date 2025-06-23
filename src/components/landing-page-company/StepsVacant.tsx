import { stepsLandingPage } from '@/constants';
import { Fragment } from 'react';
import { ChevronRight } from 'lucide-react';

export function StepsVacant() {
  return (
    <div className="flex flex-col items-center gap-12 px-6 py-10 sm:px-12 sm:py-16 lg:px-48 lg:py-20">
      <h2 className="text-center text-2xl font-bold sm:text-2xl lg:text-3xl text-uaq-brand-hover">
        En tres simples pasos lo encontraras
      </h2>
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12">
        
        {stepsLandingPage.map((step, indice) => (
          <Fragment key={step.title}>
            <div className="flex max-w-sm min-w-[280px] flex-1 flex-col gap-6 rounded-2xl bg-uaq-brand p-8 shadow-md sm:p-6">
              <h3 className="text-xl font-bold sm:text-xl lg:text-2xl text-uaq-default-50">{step.title}</h3>
              <p className="text-lg leading-loose lg:text-lg text-uaq-default-50">{step.description}</p>
            </div>
            { indice !== stepsLandingPage.length-1 && <ChevronRight className="w-40 h-40 text-uaq-brand" /> }
          </Fragment>
        ))}
      </div>
    </div>
  );
}
