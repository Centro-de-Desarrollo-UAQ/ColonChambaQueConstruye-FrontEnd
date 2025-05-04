import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Variantes de estilo y tamaño del componente Button.
 *
 * - `variant`: define el estilo visual del botón.
 * - `size`: define las dimensiones del botón.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      /**
       * Estilos visuales disponibles para el botón.
       *
       * - `primary`: Botón con fondo sólido y texto destacado.
       * - `secondary`: Botón con solo texto, sombra en hover.
       * - `edit`: Botón con sombra interna activa.
       * - `ghost`: Fondo claro, hover suave.
       * - `mono`: Solo modifica el color del texto en hover.
       */
      variant: {
        primary: "text-base font-bold",
        secondary: "text-base font-normal hover:drop-shadow-lg",
        edit: "text-base font-normal shadow-md active:shadow-none active:shadow-[0px_6px_10px_rgba(0,_0,_0,_0.20)_inset]",
        ghost: "bg-zinc-100 text-base font-bold hover:bg-zinc-200",
        mono: "text-zinc-800",
      },
      /**
       * Tamaños disponibles para el botón.
       *
       * - `default`: Medidas estándar.
       * - `sm`: Botón compacto.
       * - `lg`: Botón grande.
       * - `icon`: Botón cuadrado ideal para íconos.
       */
      size: {
        default: "px-4 py-3 rounded-md",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "p-3 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

/**
 * Propiedades aceptadas por el componente Button.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Si se establece en `true`, el botón renderiza como un elemento hijo (`Slot`)
   * en lugar de un `<button>`, permitiendo usar elementos como `<Link>` de Next.js.
   *
   * @default false
   */
  asChild?: boolean

  /**
   * Define la paleta de color que se aplica sobre la variante seleccionada.
   * Afecta fondo, texto y/o borde dependiendo de la combinación con `variant`.
   *
   * Valores permitidos:
   * - `brand` (default): Color institucional principal.
   * - `accent`: Color secundario o de énfasis.
   * - `danger`: Indica acción destructiva o de alerta.
   * - `gray`: Estilo neutro o desactivado.
   *
   * @default "brand"
   */
  color?: "brand" | "accent" | "danger" | "gray"
}

/**
 * Componente `Button`
 *
 * Botón reutilizable y completamente estilizado que admite múltiples variantes,
 * tamaños, colores y comportamientos. Compatible con accesibilidad, íconos,
 * composición con otros elementos y estilos dinámicos.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color = "brand", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    /**
     * Mapa de clases por variante y color.
     * Determina el estilo final del botón combinando ambas propiedades.
     */
    const colorClasses = {
      primary: {
        brand: "bg-uaq-brand text-zinc-50 hover:bg-uaq-brand-hover",
        accent: "bg-uaq-accent text-zinc-50 hover:bg-uaq-accent-hover",
        danger: "bg-uaq-danger text-zinc-50 hover:bg-uaq-danger-hover",
        gray: "bg-zinc-100 text-zinc-800 hover:bg-zinc-200",
      },
      secondary: {
        brand: "text-uaq-brand",
        accent: "text-uaq-accent",
        danger: "text-uaq-danger",
        gray: "text-zinc-800",
      },
      edit: {
        brand: "bg-uaq-brand text-zinc-50 border border-uaq-brand-hover",
        accent: "bg-uaq-accent text-zinc-50 border border-uaq-accent-hover",
        danger: "bg-uaq-danger text-zinc-50 border border-uaq-danger-hover",
        gray: "bg-zinc-100 text-zinc-800 border border-zinc-200",
      },
      ghost: {
        brand: "text-uaq-brand",
        accent: "text-uaq-accent",
        danger: "text-uaq-danger",
        gray: "text-zinc-800",
      },
      mono: {
        brand: "hover:text-uaq-brand",
        accent: "hover:text-uaq-accent",
        danger: "hover:text-uaq-danger",
        gray: "hover:text-zinc-500",
      },
    }

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          colorClasses[variant ?? "primary"]?.[color],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }