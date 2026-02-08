import { cn } from "@/lib/utils"

export function Logo({ className, showText = true }: { className?: string, showText?: boolean }) {
    return (
        <div className={cn("flex items-center gap-3", className)}>
            <div className="relative w-10 h-10 flex items-center justify-center rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-white">
                <img
                    src="/logo.png"
                    alt="ExplainLab Logo"
                    className="w-full h-full object-cover"
                />
            </div>

            {showText && (
                <span className="font-bold text-xl tracking-tight text-slate-800 font-sans">
                    Explain<span className="text-primary">Lab</span>
                </span>
            )}
        </div>
    )
}
