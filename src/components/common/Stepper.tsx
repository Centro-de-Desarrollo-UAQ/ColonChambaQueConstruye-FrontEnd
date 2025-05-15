import React from 'react';

interface StepperProps {
  size: number;
  activeStep: number;
}

function Stepper({ size, activeStep }: StepperProps) {
  const steps = Array.from({ length: size }, (_, i) => i + 1);

  return (
    <div className="relative flex w-full items-center justify-between">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors ${step < activeStep ? 'bg-uaq-brand' : ''} ${step === activeStep ? 'bg-uaq-brand' : ''} ${step > activeStep ? 'bg-gray-300' : ''} font-bold text-white`}
            >
              {step}
            </div>
            <span
              className={`mt-2 text-sm ${
                step === activeStep
                  ? 'text-uaq-brand font-bold'
                  : step < activeStep
                    ? 'text-uaq-brand'
                    : 'text-gray-500'
              }`}
            >
              Paso {step}
            </span>
          </div>

          <div
            className={`absolute top-1/4 right-2 left-2 z-0 h-1 -translate-y-1/4 bg-zinc-300`}
          ></div>
          <div
            className={`bg-uaq-brand absolute top-1/4 left-2 z-0 h-1 -translate-y-1/4 transition-all duration-300`}
            style={{
              width: `${((activeStep - 1) / (size - 1)) * 100}%`,
              maxWidth: 'calc(100% - 42px)',
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default Stepper;
