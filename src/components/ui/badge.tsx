// * Added badge component with variants and close button
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { CloseCircle } from '@solar-icons/react';

const badgeVariants = cva(
  'inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-[400] font-futura transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-uaq-success-transparent text-uaq-success',
        secondary: 'bg-uaq-warning-transparent text-uaq-warning',
        destructive: 'bg-uaq-danger-transparent text-uaq-danger',
        outline: 'border border-uaq-default-800 text-foreground',

        // Variantes con el onClose
        defaultClosable: 'bg-uaq-success-transparent text-uaq-success',
        secondaryClosable: 'bg-uaq-warning-transparent text-uaq-warning',
        destructiveClosable: 'bg-uaq-danger-transparent text-uaq-danger',
        outlineClosable: 'border border-uaq-default-800 text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
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
        <CloseCircle onClick={onClose} size={14} weight="Bold" className="ml-2 cursor-pointer" />
      )}
    </div>
  );
}

export { Badge, badgeVariants };
