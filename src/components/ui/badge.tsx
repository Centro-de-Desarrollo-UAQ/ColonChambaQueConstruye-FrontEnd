// * Added badge component with variants and close button
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { CloseCircle } from '@solar-icons/react';

const badgeVariants = cva(
  'gap-1 flex items-center w-fit rounded-lg px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        success: 'bg-uaq-success/10 text-uaq-success-hover',
        warning: 'bg-uaq-warning/10 text-uaq-warning-hover',
        danger: 'bg-uaq-danger/10 text-uaq-danger-hover',
        outline: 'border border-zinc-800 text-foreground',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  onClose?: () => void;
}

function Badge({ className, variant, onClose, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {props.children}
      {onClose && (
        <CloseCircle onClick={onClose} size={14} weight="Bold" className="center cursor-pointer" />
      )}
    </div>
  );
}

export { Badge, badgeVariants };
