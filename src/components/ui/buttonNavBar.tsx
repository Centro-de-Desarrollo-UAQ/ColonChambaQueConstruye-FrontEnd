import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-[400] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-full',
  {
    variants: {
      variant: {
        default:
          "bg-uaq-accent text-uaq-default-50 shadow-sm font-base-bold hover:after:content-[''] hover:after:block hover:after:h-[0.1875rem] hover:after:w-full hover:after:bg-uaq-default-200 hover:after:absolute hover:after:bottom-0 hover:after:left-0",
        hover:
          'bg-uaq-accent text-uaq-default-50 shadow-sm font-base-bold hover:bg-uaq-default-50 hover:text-uaq-accent [&_svg]:fill-uaq-accent', // Cambiar color de texto e icono en hover
        active:
          "bg-uaq-accent text-uaq-default-50 shadow-sm font-base-bold font-bold after:content-[''] after:block after:h-[0.1875rem] after:w-full after:bg-uaq-default-200 after:absolute after:bottom-0 after:left-0",
      },
      size: {
        default: 'px-3 py-8',
        sm: 'px-2 py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

// Definimos la interfaz de las props del botón
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// Componente de botón principal
const ButtonNavBar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
ButtonNavBar.displayName = 'Button';

export { ButtonNavBar, buttonVariants };
