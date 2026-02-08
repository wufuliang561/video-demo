import * as React from "react"
import { Stepper } from "./Stepper"
import { Logo } from "./Logo"
import { cn } from "@/lib/utils"

interface LayoutProps {
    children: React.ReactNode
    currentStep: number
    totalSteps: number
    steps: string[]
    onBack?: () => void
    onNext?: () => void
    isNextDisabled?: boolean
    nextLabel?: string
    backLabel?: string
    hideNavigation?: boolean
}

export function ExplainLabLayout({
    children,
    currentStep,
    totalSteps,
    steps,
    onBack,
    onNext,
    isNextDisabled = false,
    nextLabel = "下一步",
    backLabel = "上一步",
    hideNavigation = false,
}: LayoutProps) {
    return (
        <div className="min-h-screen bg-[#ECFEFF] flex flex-col font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 py-3 px-6 md:px-12 flex items-center shadow-sm sticky top-0 z-50">
                <Logo />
                <div className="ml-auto flex-1 flex justify-center">
                    <Stepper steps={steps} currentStep={currentStep} />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
                <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-modern min-h-[600px] p-8 relative overflow-hidden">
                    {children}
                </div>
            </main>

            {/* Footer Navigation */}
            {!hideNavigation && (
                <footer className="bg-white border-t border-slate-200 py-6 px-6 md:px-12 flex justify-between items-center sticky bottom-0 z-10">
                    <button
                        onClick={onBack}
                        disabled={currentStep === 1}
                        className={cn(
                            "px-6 py-2.5 rounded-lg border-2 border-slate-300 font-medium text-slate-600 transition-all hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed",
                            currentStep > 1 && "hover:border-slate-400 hover:-translate-y-0.5"
                        )}
                    >
                        {backLabel}
                    </button>

                    <button
                        onClick={onNext}
                        disabled={isNextDisabled}
                        className={cn(
                            "px-8 py-2.5 rounded-lg font-bold text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]",
                            isNextDisabled
                                ? "bg-slate-300 cursor-not-allowed shadow-none"
                                : "bg-primary hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0 active:shadow-none border-2 border-transparent"
                        )}
                    >
                        {nextLabel} →
                    </button>
                </footer>
            )}
        </div>
    )
}
