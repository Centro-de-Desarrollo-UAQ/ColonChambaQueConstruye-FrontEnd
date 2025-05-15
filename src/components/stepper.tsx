'use client';
import { useState } from 'react';
import { Button } from './ui/button';

interface Step {
  title: string;
  content: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  activeColor?: string;
  inactiveColor?: string;
  textColor?: string;
  lineColor?: string;
  headerTitle?: string;
  headerSubtitle?: string;
}

interface StepPointProps {
  index: number;
  isActive: boolean;
  title: string;
  onClick: () => void;
  activeColor: string;
  inactiveColor: string;
  textColor: string;
}

function StepPoint({
  index,
  isActive,
  title,
  onClick,
  activeColor,
  inactiveColor,
  textColor,
}: StepPointProps) {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
          isActive ? activeColor : inactiveColor
        } ${textColor} mb-2 font-bold`}
      >
        {index + 1}
      </button>
      <span className={`text-sm ${isActive ? 'text-uaq-brand font-bold' : 'text-gray-500'}`}>
        {title}
      </span>
    </div>
  );
}

interface ProgressLineProps {
  progress: number;
  activeColor: string;
  lineColor: string;
}

function ProgressLine({ progress, activeColor, lineColor }: ProgressLineProps) {
  return (
    <>
      <div
        className={`absolute top-1/4 right-2 left-2 h-1 ${lineColor} z-0 -translate-y-1/4`}
      ></div>
      <div
        className={`absolute top-1/4 left-2 h-1 ${activeColor} z-0 -translate-y-1/4 transition-all duration-300`}
        style={{
          width: `${progress}%`,
          maxWidth: 'calc(100% - 42px)',
        }}
      ></div>
    </>
  );
}

interface StepperHeaderProps {
  title?: string;
  subtitle?: string;
}

function StepperHeader({
  title = 'Completa tu registro',
  subtitle = 'Rellena los campos para completar tu registro y acceder a todas las funciones que ofrece la plataforma',
}: StepperHeaderProps) {
  return (
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-bold">{title}</h2>
      <h3 className="mt-2 px-8 text-gray-600">{subtitle}</h3>
    </div>
  );
}

interface StepperControlsProps {
  activeStep: number;
  stepsLength: number;
  onPrev: () => void;
  onNext: () => void;
}

function StepperControls({ activeStep, stepsLength, onPrev, onNext }: StepperControlsProps) {
  return (
    <div className="flex justify-between">
      <Button
        onClick={onPrev}
        disabled={activeStep === 0}
        variant="secondary"
        color="brand"
        className="px-6 py-2"
      >
        Anterior
      </Button>

      <Button
        onClick={onNext}
        variant="primary"
        className="bg-uaq-brand hover:bg-uaq-brand-dark px-6 py-2"
      >
        {activeStep === stepsLength - 1 ? 'Finalizar' : 'Siguiente'}
      </Button>
    </div>
  );
}

export function Stepper({
  steps,
  activeColor = 'bg-uaq-brand',
  inactiveColor = 'bg-uaq-default-200',
  textColor = 'text-white',
  lineColor = 'bg-uaq-default-200',
  headerTitle,
  headerSubtitle,
}: StepperProps) {
  const [activeStep, setActiveStep] = useState(0);

  const handlePrev = () => setActiveStep((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-lg bg-white p-12 shadow-md">
        <StepperHeader title={headerTitle} subtitle={headerSubtitle} />

        {/* Barra de progreso */}
        <div className="relative mx-auto mb-8 w-3/4">
          <ProgressLine
            progress={(activeStep / (steps.length - 1)) * 100}
            activeColor={activeColor}
            lineColor={lineColor}
          />

          <div className="relative z-10 flex justify-between">
            {steps.map((step, index) => (
              <StepPoint
                key={index}
                index={index}
                isActive={index <= activeStep}
                title={step.title}
                onClick={() => setActiveStep(index)}
                activeColor={activeColor}
                inactiveColor={inactiveColor}
                textColor={textColor}
              />
            ))}
          </div>
        </div>

        {/* Step activo */}
        <div className="min-h-[300px] transition-all duration-300">{steps[activeStep].content}</div>

        {/* Props */}
        <StepperControls
          activeStep={activeStep}
          stepsLength={steps.length}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
