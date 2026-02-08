import { cn } from "@/lib/utils"

export function Logo({ className, showText = true }: { className?: string, showText?: boolean }) {
    return (
        <div className={cn("flex items-center gap-2.5", className)}>
            <div className="relative w-8 h-8 flex items-center justify-center">
                {/* Main Shape: Soft Square / Bubble */}
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-sm"
                >
                    <rect x="2" y="2" width="36" height="36" rx="10" className="fill-primary" />
                    <path d="M30 38L24 32" stroke="currentColor" strokeWidth="0" /> {/* Tail hint if needed, keeping simple for now */}

                    {/* Play Button */}
                    <path d="M15 12L28 20L15 28V12Z" className="fill-white" stroke="white" strokeWidth="2" strokeLinejoin="round" />

                    {/* Decorative Spark */}
                    <path d="M34 4L35.5 8L39 8.5L36 11L37 15L33 12.5L29 15L30 11L27 8.5L30.5 8L34 4Z" className="fill-yellow-300" stroke="white" strokeWidth="1" />
                </svg>
            </div>

            {showText && (
                <span className="font-bold text-xl tracking-tight text-slate-800 font-sans">
                    Explain<span className="text-primary">Lab</span>
                </span>
            )}
        </div>
    )
}
