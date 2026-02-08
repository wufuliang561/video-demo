import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepperProps {
    steps: string[]
    currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
    return (
        <div className="flex items-center justify-center w-full py-6">
            <div className="flex items-center space-x-2">
                {steps.map((step, index) => {
                    const stepNumber = index + 1
                    const isActive = stepNumber === currentStep
                    const isCompleted = stepNumber < currentStep
                    const isLast = index === steps.length - 1

                    return (
                        <React.Fragment key={step}>
                            <div className="flex items-center space-x-2">
                                <div
                                    className={cn(
                                        "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-bold transition-colors",
                                        isActive
                                            ? "border-primary bg-primary text-white shadow-[2px_2px_0px_0px_#000]"
                                            : isCompleted
                                                ? "border-primary bg-green-100 text-primary"
                                                : "border-slate-300 bg-white text-slate-400"
                                    )}
                                >
                                    {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
                                </div>
                                <span
                                    className={cn(
                                        "font-medium text-sm hidden sm:inline-block",
                                        isActive ? "text-foreground font-bold" : "text-slate-500"
                                    )}
                                >
                                    {step}
                                </span>
                            </div>
                            {!isLast && (
                                <div
                                    className={cn(
                                        "h-0.5 w-8 sm:w-16 mx-2 transition-colors",
                                        stepNumber < currentStep ? "bg-primary" : "bg-slate-200"
                                    )}
                                />
                            )}
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}
