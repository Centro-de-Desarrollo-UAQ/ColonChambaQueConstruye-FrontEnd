import { InfoCircle } from '@solar-icons/react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface AlertCardProps {
  title: string;
  content: ReactNode;
}

export default function AlertCard({ title, content }: AlertCardProps) {
  return (
    <div
      className={cn(
        'flex fixed right-8 bottom-8 p-6 gap-4 justify-between rounded-lg border-1 bg-background',
        'border-uaq-danger w-fit'
      )}
    >
      <div className="">
        <InfoCircle size={20} weight="Linear" className="text-uaq-danger" />
      </div>
      <div className="gap-2">
        <h3 className="text-lg font-semibold text-uaq-danger">{title}</h3>
        <div className='text-uaq-danger'>{content}</div>
      </div>
      
    </div>
  );
}