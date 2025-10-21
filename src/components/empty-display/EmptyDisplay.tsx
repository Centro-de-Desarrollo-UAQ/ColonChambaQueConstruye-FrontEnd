import React, { ReactNode } from 'react';

interface EmptyDisplayProps {
  icon: ReactNode;
  firstLine: string;
  secondline?: string;
}

const EmptyDisplay = ({ icon, firstLine, secondline }: EmptyDisplayProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {icon}
      <p className="text-base text-neutral-400">
        {firstLine}
        <br />
        {secondline}
      </p>
    </div>
  );
};

export default EmptyDisplay;