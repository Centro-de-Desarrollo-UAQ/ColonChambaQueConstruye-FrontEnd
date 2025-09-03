import * as React from 'react';
import { Slot as SlotPrimitive } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'text-base font-bold',
        secondary: 'text-base font-normal hover:drop-shadow-lg',
        edit: 'text-base font-normal shadow-md active:shadow-none active:shadow-[0px_6px_10px_rgba(0,_0,_0,_0.20)_inset]',
        ghost: 'text-base font-bold hover:bg-zinc-200',
        mono: 'text-zinc-800',
        combobox: 'text-base border border-input bg-zinc-100',
      },
      size: {
        default: 'px-4 py-3 rounded-md',
        sm: 'h-9 rounded-md px-3 text-sm',
        lg: 'h-10 rounded-md px-8',
        icon: 'p-3 rounded-md',
        sm_icon: 'size-9 p-3 rounded-md',
      },
      color: {
        brand: null,
        'brand-tertiary': null,
        secondary: null,
        accent: null,
        danger: null,
        gray: null,
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      color: 'brand',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  color?: 'brand' | 'brand-tertiary' | 'secondary' | 'accent' | 'danger' | 'gray';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color = 'brand', asChild = false, ...props }, ref) => {
    const Comp = asChild ? SlotPrimitive.Slot : 'button';

    // Definir colores directamente en el componente
    const colorClasses: Record<string, Record<string, string>> = {
      primary: {
        brand: 'background:#470A68;color:#ffffff;',
        'brand-tertiary': 'background:#8028A2;color:#ffffff;',
        secondary: 'background:#FF7F40;color:#ffffff;',
        accent: 'background:#ffffff;color:#470A68;',
        danger: 'background:#D32F2F;color:#ffffff;',
        gray: 'background:#F5F5F5;color:#333333;',
      },
      secondary: {
        brand: 'background:#470A68;color:#ffffff;border:1px solid #470A68;',
        'brand-tertiary': 'background:#8028A2;color:#ffffff;border:1px solid #8028A2;',
        secondary: 'background:#FF7F40;color:#ffffff;border:1px solid #FF7F40;',
        accent: 'background:#ffffff;color:#470A68;border:1px solid #470A68;',
        danger: 'background:#D32F2F;color:#ffffff;border:1px solid #D32F2F;',
        gray: 'background:#F5F5F5;color:#333333;border:1px solid #333333;',
      },
      edit: {
        brand: 'background:#470A68;color:#ffffff;border:1px solid #8028A2;',
        'brand-tertiary': 'background:#8028A2;color:#ffffff;border:1px solid #470A68;',
        secondary: 'background:#FF7F40;color:#ffffff;border:1px solid #470A68;',
        accent: 'background:#ffffff;color:#470A68;border:1px solid #470A68;',
        danger: 'background:#D32F2F;color:#ffffff;border:1px solid #8028A2;',
        gray: 'background:#F5F5F5;color:#333333;border:1px solid #333333;',
      },
      ghost: {
        brand: 'background:transparent;color:#470A68;',
        'brand-tertiary': 'background:transparent;color:#8028A2;',
        secondary: 'background:transparent;color:#FF7F40;',
        accent: 'background:transparent;color:#ffffff;',
        danger: 'background:transparent;color:#D32F2F;',
        gray: 'background:transparent;color:#333333;',
      },
      mono: {
        brand: 'color:#470A68;',
        'brand-tertiary': 'color:#8028A2;',
        secondary: 'color:#FF7F40;',
        accent: 'color:#ffffff;',
        danger: 'color:#D32F2F;',
        gray: 'color:#333333;',
      },
      combobox: {
        brand: 'background:#470A68;color:#ffffff;border:1px solid #470A68;',
        'brand-tertiary': 'background:#8028A2;color:#ffffff;border:1px solid #8028A2;',
        secondary: 'background:#FF7F40;color:#ffffff;border:1px solid #FF7F40;',
        accent: 'background:#ffffff;color:#470A68;border:1px solid #470A68;',
        danger: 'background:#D32F2F;color:#ffffff;border:1px solid #D32F2F;',
        gray: 'background:#F5F5F5;color:#333333;border:1px solid #333333;',
      },
    };

    // Aplicar los estilos inline para los colores
    const style = { ...props.style, ...Object.fromEntries(
      (colorClasses[variant ?? 'primary'][color] || '')
        .split(';')
        .filter(Boolean)
        .map(s => s.split(':').map(x => x.trim()))
    )};

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, color }), className)}
        style={style}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
