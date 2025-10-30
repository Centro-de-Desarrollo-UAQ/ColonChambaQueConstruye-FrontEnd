// components/ui/alertas/Alert.tsx
import {ReactElement} from "react";
import {DangerCircle} from '@solar-icons/react';

interface AlertProps {
  type: 'error' | 'warning';
  title: string;
  description: string;
}

export default function Alert({type, title, description}: AlertProps) {
  const styles = {
    error: {
      border: 'border-uaq-danger',
      text: 'text-uaq-danger',
      icon: <DangerCircle className="h-6 w-6 text-uaq-danger mr-4" />,
    },
    warning: {
      border: 'border-uaq-warning',
      text: 'text-uaq-warning',
      icon: <DangerCircle className="h-6 w-6 text-uaq-warning mr-4" />,
    },
  };

  const {border, text, icon} = styles[type];

  return (
    <div className={`m-5 p-4 ${border} border-2 rounded-xl flex bg-zinc-50 max-w-xl`}>
      {icon}
      <div className="flex flex-col gap-3">
        <span className={`flex font-bold ${text}`}>{title}</span>
        <p className={text}>{description}</p>
      </div>
    </div>
  );
}