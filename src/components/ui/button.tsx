import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer customPill",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white hover:bg-primary-hover shadow-xs hover:shadow-md",
        customPill:
          "bg-primary text-white hover:bg-primary-hover font-medium shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer px-4 py-4 inline-flex items-center justify-center rounded-[10px_10px_50%_50% / 50%_50%_10px_10px]",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-xs rounded-full",
        outline:
          "border border-gray-200 bg-white text-title hover:bg-gray-50 hover:border-gray-300 rounded-full",
        secondary:
          "bg-gray-100 text-title hover:bg-gray-200 rounded-full",
        ghost:
          "hover:bg-gray-100 text-title rounded-full",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 sm:h-12 px-7 sm:px-8 text-sm sm:text-base",
        sm: "h-9 px-4 text-xs sm:text-sm",
        lg: "h-13 sm:h-14 px-8 sm:px-10 text-base sm:text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "customPill",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }