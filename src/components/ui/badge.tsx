import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { CloseCircle } from "@solar-icons/react"


const badgeVariants = cva(
    "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
    variants: {
      variant: {
        default:
          "border-uaq-success bg-uaq-success/50 text-uaq-success shadow",
        secondary:
          "border-uaq-warning bg-uaq-warning/50 text-uaq-warning",
        destructive:
          "border-uaq-danger bg-uaq-danger/50 text-uaq-danger",
        outline:
          "border-foreground text-foreground",

        // Variantes con el onClose
        defaultClosable:
          "border-uaq-success bg-uaq-success/50 text-uaq-success shadow",
        secondaryClosable:
          "border-uaq-warning bg-uaq-warning/50 text-uaq-warning",
        destructiveClosable:
          "border-uaq-danger bg-uaq-danger/50 text-uaq-danger",
        outlineClosable:
            "border-foreground text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  onClose?: () => void
}

function Badge({ className, variant, onClose, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {props.children}
      {onClose && (
        <CloseCircle
          onClick={onClose}
          size={14}
          weight="Bold"
          className="ml-2 cursor-pointer" 
        />
      )}
    </div>
  )
}

export { Badge, badgeVariants }
