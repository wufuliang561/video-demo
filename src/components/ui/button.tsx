import * as React from "react"
import { cn } from "@/lib/utils"

// Note: I am not installing class-variance-authority or @radix-ui/react-slot yet.
// I should use simple props or install them.
// For this demo, I will use simple props to avoid extra deps if possible,
// OR I will install them given they are standard in shadcn/ui which was recommended.
// The prompted plan didn't explicitly list them but `shadcn` implies them.
// I'll stick to simple implementation for now to save time, or install them.
// Actually, `clsx` and `tailwind-merge` are enough for a simple demo.
// I'll implement a simple Button component.

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "whiteboard"
    size?: "default" | "sm" | "lg" | "icon"
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        const Comp = "button"

        // Base styles
        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"

        // Variants
        const variants = {
            default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
            whiteboard: "bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] text-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        }

        // Sizes
        const sizes = {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
        }

        return (
            <Comp
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
