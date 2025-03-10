import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Definimos los estilos base y variantes del botón usando class-variance-authority
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-uaq-brand text-uaq-default-50 shadow hover:bg-uaq-brand-hover border border-uaq-brand justify-center items-center gap-2.5 font-base-bold font-bold text-[1rem]", // Botón primario con colores de la marca UAQ
        destructive:
          "bg-uaq-danger text-uaq-default-50 shadow-sm hover:bg-uaq-danger-hover justify-center items-center gap-2.5 font-base-bold font-bold text-[1rem] ", // Botón para acciones destructivas
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground justify-center items-center gap-2.5 font-base-bold font-bold text-[1rem] ", // Botón con borde y fondo transparente
        secondary:
          "bg-uaq-accent text-uaq-default-50 shadow-sm hover:bg-uaq-accent-hover justify-center items-center gap-2.5 font-base-bold font-bold text-[1rem] ", // Botón secundario
        ghost: "hover:bg-uaq-default-200 text-uaq-brand justify-center items-center gap-2.5 font-base-bold font-bold text-[1rem] ", // Botón sin fondo, solo cambia el color al pasar el mouse
        edit: " bg-uaq-default-100 text-uaq-default-800 hover:bg-uaq-default-300 justify-center items-center gap-2.5 text-[1rem] ", // Botón estilo enlace
      },
      size: {
        default: "h-11 w-20 px-[0.937rem] py-[0.75rem] rounded-lg", // Tamaño por defecto
        sm: "h-8 rounded-md px-3 text-xs", // Tamaño pequeño
        lg: "h-10 rounded-md px-8", // Tamaño grande
        icon: "h-9 w-9", // Botón con solo icono
      },
    },
    defaultVariants: {
      variant: "default", // Variante por defecto
      size: "default", // Tamaño por defecto
    },
  }
)

// Definimos la interfaz de las props del botón
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean // Permite usar otro componente como base del botón
}

// Componente de botón principal
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button" // Si asChild es true, usa el componente Slot de Radix
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Aplica las variantes y estilos personalizados
        ref={ref}
        {...props} // Pasa todas las demás propiedades al botón
      />
    )
  }
)
Button.displayName = "Button" // Nombre del componente para debugging

export { Button, buttonVariants } // Exportamos el componente y las variantes
