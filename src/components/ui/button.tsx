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
        default: "bg-uaq-brand text-uaq-default-50 shadow hover:bg-uaq-brand-hover border border-uaq-brand font-base-bold font-bold text-[1rem]",
        destructive: "bg-uaq-danger text-uaq-default-50 shadow-sm hover:bg-uaq-danger-hover font-base-bold font-bold text-[1rem]",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground font-base-bold font-bold text-[1rem]",
        secondary: "bg-uaq-accent text-uaq-default-50 shadow-sm hover:bg-uaq-accent-hover font-base-bold font-bold text-[1rem]",
        ghost: "bg-uaq-default-50 hover:bg-uaq-default-200 hover:text-uaq-default-900 text-uaq-brand font-base-bold font-bold text-[1rem]",
        edit: "bg-uaq-default-100 text-uaq-default-800 hover:bg-uaq-default-300 hover:text-uaq-default-900 text-[1rem]",
      },
      size: {
        default: "h-11 px-[0.937rem] py-[0.75rem] rounded-lg",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
      hoverVariant: {
        default: "hover:variant-default",
        destructive: "hover:variant-destructive",
        outline: "hover:variant-outline",
        secondary: "hover:variant-secondary",
        ghost: "hover:variant-ghost",
        edit: "hover:variant-edit",
      }
    },
    compoundVariants: [
      {
        variant: "ghost",
        hoverVariant: "edit",
        className: "hover:bg-uaq-default-100 hover:text-uaq-default-800"
      },
      {
        variant: "edit",
        hoverVariant: "ghost",
        className: "hover:bg-uaq-default-50 hover:text-uaq-brand"
      }
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Definimos la interfaz de las props del botón
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  hoverVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "edit"
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
