import React from "react";

interface StepperProps {
  size: number;
  activeStep: number;
}

function Stepper({ size, activeStep }: StepperProps) {
  const steps = Array.from({ length: size }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between w-full relative">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10
              ${step < activeStep ? "bg-uaq-brand" : ""}
              ${step === activeStep ? "bg-uaq-brand" : ""}
              ${step > activeStep ? "bg-gray-300" : ""} 
              text-white font-bold`}
            >
              {step}
            </div>
            <span
              className={`text-sm mt-2 ${
                step === activeStep
                  ? "font-bold text-uaq-brand"
                  : step < activeStep
                  ? "text-uaq-brand"
                  : "text-gray-500"
              }`}
            >
              Paso {step}
            </span>
          </div>

          <div
            className={`absolute top-1/4 left-2 right-2 h-1 bg-zinc-300 -translate-y-1/4 z-0`}
          ></div>
          <div
            className={`absolute top-1/4 left-2 h-1 bg-uaq-brand -translate-y-1/4 z-0 transition-all duration-300`}
            style={{
              width: `${((activeStep - 1) / (size - 1)) * 100}%`,
              maxWidth: "calc(100% - 42px)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default Stepper;
