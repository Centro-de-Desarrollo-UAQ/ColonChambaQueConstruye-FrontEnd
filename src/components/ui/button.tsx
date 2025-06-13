// * Styles with customized color variants
import * as React from 'react';
import { Slot as SlotPrimitive } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Style and size variants of the Button component.
 *
 * - `variant`: defines the visual style of the button.
 * - `size`: defines the dimensions of the button.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      /**
       * Visual styles available for the button.
       *
       * - `primary`: Button with solid background and highlighted text.
       * - `secondary`: Button with only text, shadow on hover.
       * - `edit`: Button with active internal shadow.
       * - `ghost`: Clear background, soft hover.
       * - `mono`: It only modifies the color of the hover text.
       * - `combobox`: Button style for a combobox.
       */
      variant: {
        primary: 'text-base font-bold',
        secondary: 'text-base font-normal hover:drop-shadow-lg',
        edit: 'text-base font-normal shadow-md active:shadow-none active:shadow-[0px_6px_10px_rgba(0,_0,_0,_0.20)_inset]',
        ghost: 'bg-zinc-100 text-base font-bold hover:bg-zinc-200',
        mono: 'text-zinc-800',
        combobox: 'text-base border border-input bg-zinc-100',
      },
      /**
       * Available sizes for the button.
       *
       * - `default`: Standard measurements.
       * - `sm`: Compact button.
       * - `lg`: Large button.
       * - `icon`: Square button ideal for icons.
       * - `sm_icon`: Compact square button ideal for icons.
       */
      size: {
        default: 'px-4 py-3 rounded-md',
        sm: 'h-9 rounded-md px-3 text-sm',
        lg: 'h-10 rounded-md px-8',
        icon: 'p-3 rounded-md',
        sm_icon: 'size-9 p-3 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

/**
 * Properties accepted by the Button component.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * If set to `true`, the button renders as a child element (`SlotPrimitive.Slot`)
   * instead of a `<button>`, allowing elements such as `<Link>` to be used.
   *
   * @default false
   */
  asChild?: boolean;

  /**
   * Defines the color palette that is applied to the selected variant.
   * Affects background, text and/or border depending on the combination with `variant`.
   *
   * Allowable values:
   * - `brand` (default): Main institutional color.
   * - `accent`: Secondary or emphasis color.
   * - `danger`: Indicates destructive or warning action.
   * - `gray`: Neutral style.
   *
   * @default "brand"
   */
  color?: 'brand' | 'accent' | 'danger' | 'gray';
  'data-day'?: string;
  'data-selected-single'?: boolean;
  'data-range-start'?: boolean;
  'data-range-end'?: boolean;
  'data-range-middle'?: boolean;
}

/**
 * `Button` component.
 *
 * Reusable and fully stylized button that supports multiple variations,
 * sizes, colors and behaviors. Compatible with accessibility, icons,
 * composition with other elements and dynamic styles.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color = 'brand', asChild = false, ...props }, ref) => {
    const Comp = asChild ? SlotPrimitive.Slot : 'button';

    /**
     * Class map by variant and color.
     * Determines the final style of the button by combining both properties.
     */
    const colorClasses = {
      primary: {
        brand: 'bg-uaq-brand text-zinc-50 hover:bg-uaq-brand-hover',
        accent: 'bg-uaq-accent text-zinc-50 hover:bg-uaq-accent-hover',
        danger: 'bg-uaq-danger text-zinc-50 hover:bg-uaq-danger-hover',
        gray: 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200',
      },
      secondary: {
        brand: 'text-uaq-brand',
        accent: 'text-uaq-accent',
        danger: 'text-uaq-danger',
        gray: 'text-zinc-800',
      },
      edit: {
        brand: 'bg-uaq-brand text-zinc-50 border border-uaq-brand-hover',
        accent: 'bg-uaq-accent text-zinc-50 border border-uaq-accent-hover',
        danger: 'bg-uaq-danger text-zinc-50 border border-uaq-danger-hover',
        gray: 'bg-zinc-100 text-zinc-800 border border-zinc-200',
      },
      ghost: {
        brand: 'text-uaq-brand',
        accent: 'text-uaq-accent',
        danger: 'text-uaq-danger',
        gray: 'text-zinc-800',
      },
      mono: {
        brand: 'hover:text-uaq-brand',
        accent: 'hover:text-uaq-accent',
        danger: 'hover:text-uaq-danger',
        gray: 'hover:text-zinc-500',
      },
      combobox: {
        brand: 'text-uaq-brand',
        accent: 'text-uaq-accent',
        danger: 'text-uaq-danger',
        gray: 'text-zinc-800',
      },
    };

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          colorClasses[variant ?? 'primary']?.[color],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
