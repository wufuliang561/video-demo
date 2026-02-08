import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Circle, Loader2, Play, RefreshCw, Share2, Download } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step5GenerateProps {
    onBack: () => void
}

const STEPS = [
    "生成 TTS 语音",
    "生成时间线",
    "生成字幕",
    "生成分镜数据",
    "渲染视频",
    "合成导出"
]

export function Step5Generate({ onBack }: Step5GenerateProps) {
    const [progress, setProgress] = React.useState(0)
    const [currentStepIndex, setCurrentStepIndex] = React.useState(0)
    const [completed, setCompleted] = React.useState(false)

    // Simulate progress
    React.useEffect(() => {
        if (completed) return

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setCompleted(true)
                    return 100
                }
                const increment = Math.random() * 5
                return Math.min(prev + increment, 100)
            })
        }, 300)

        return () => clearInterval(interval)
    }, [completed])

    // Update step index based on progress
    React.useEffect(() => {
        const step = Math.floor((progress / 100) * STEPS.length)
        setCurrentStepIndex(Math.min(step, STEPS.length - 1))
    }, [progress])

    if (completed) {
        return (
            <div className="space-y-8 animate-in zoom-in duration-500 text-center py-8">
                <div className="inline-block p-4 bg-green-100 rounded-full mb-4 shadow-sm animate-bounce">
                    <div className="text-4xl">🎬</div>
                </div>
                <h2 className="text-3xl font-bold font-hand text-slate-800">你的视频已就绪！</h2>

                <div className="max-w-3xl mx-auto bg-black rounded-lg overflow-hidden shadow-2xl aspect-video relative group">
                    <video
                        src="/template.mp4"
                        controls
                        className="w-full h-full object-cover"
                        poster="/placeholder-poster.png" // Optional
                        autoPlay
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-sm text-slate-500 bg-white p-4 rounded-lg border border-slate-200">
                    <div>
                        <span className="block font-bold text-slate-700">时长</span>
                        2分30秒
                    </div>
                    <div>
                        <span className="block font-bold text-slate-700">镜头</span>
                        12个
                    </div>
                    <div>
                        <span className="block font-bold text-slate-700">分辨率</span>
                        1080P
                    </div>
                    <div>
                        <span className="block font-bold text-slate-700">音色</span>
                        专业男声
                    </div>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                    <Button variant="default" size="lg" className="px-8 shadow-md">
                        <Download className="w-4 h-4 mr-2" />
                        下载 1080P
                    </Button>
                    <Button variant="outline" size="lg">
                        <Share2 className="w-4 h-4 mr-2" />
                        分享链接
                    </Button>
                    <Button variant="ghost" size="lg" onClick={onBack}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        重新生成
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-12 animate-in fade-in py-12 px-4 max-w-2xl mx-auto">
            <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold font-hand text-slate-700">正在生成你的视频...</h2>
                <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                        className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out flex items-center justify-end pr-2"
                        style={{ width: `${progress}%` }}
                    >
                        {progress > 10 && <span className="text-[10px] text-white font-bold">{Math.round(progress)}%</span>}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {STEPS.map((step, index) => {
                    const isCompleted = index < currentStepIndex
                    const isCurrent = index === currentStepIndex

                    return (
                        <div key={index} className="flex items-center space-x-4">
                            <div className="w-6 flex justify-center">
                                {isCompleted ? (
                                    <Check className="w-5 h-5 text-green-500" />
                                ) : isCurrent ? (
                                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                                ) : (
                                    <Circle className="w-3 h-3 text-slate-300" />
                                )}
                            </div>
                            <span className={cn(
                                "text-lg transition-colors",
                                isCompleted ? "text-slate-400 line-through" : isCurrent ? "text-slate-800 font-bold" : "text-slate-300"
                            )}>
                                {step}
                            </span>
                        </div>
                    )
                })}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center text-slate-400 text-sm">
                AI 正在渲染分镜，请勿关闭窗口...
            </div>
        </div>
    )
}
