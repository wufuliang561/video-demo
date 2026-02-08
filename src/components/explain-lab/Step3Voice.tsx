import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step3VoiceProps {
    onNext: () => void
    onBack: () => void
}

const VOICES = [
    { id: "male_youth", name: "青年男声", gender: "male", style: "活力", tags: ["阳光", "快节奏"] },
    { id: "female_gentle", name: "温柔女声", gender: "female", style: "温和", tags: ["治愈", "舒缓"] },
    { id: "male_pro", name: "专业男声", gender: "male", style: "沉稳", tags: ["纪录片", "深度"] },
    { id: "female_lively", name: "活力女声", gender: "female", style: "活泼", tags: ["亲切", "新闻"] },
    { id: "male_deep", name: "低沉男声", gender: "male", style: "磁性", tags: ["电影感", "叙事"] },
    { id: "female_intellect", name: "知性女声", gender: "female", style: "理性", tags: ["科技", "教育"] },
]

export function Step3Voice({ onNext, onBack }: Step3VoiceProps) {
    const [selectedVoice, setSelectedVoice] = React.useState<string>("male_pro")
    const [playingVoice, setPlayingVoice] = React.useState<string | null>(null)

    const togglePlay = (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        if (playingVoice === id) {
            setPlayingVoice(null)
        } else {
            setPlayingVoice(id)
            setTimeout(() => setPlayingVoice(null), 3000) // Mock play duration
        }
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl font-bold font-hand">选择旁白音色</h2>
                <p className="text-slate-500">为你的视频选择最合适的 AI 配音演员</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {VOICES.map((voice) => {
                    const isSelected = selectedVoice === voice.id
                    const isPlaying = playingVoice === voice.id

                    return (
                        <Card
                            key={voice.id}
                            className={cn(
                                "cursor-pointer transition-all hover:shadow-md relative overflow-hidden group",
                                isSelected ? "border-2 border-primary bg-cyan-50/50 shadow-md transform -translate-y-1" : "border border-slate-200 hover:border-slate-300"
                            )}
                            onClick={() => setSelectedVoice(voice.id)}
                        >
                            {isSelected && (
                                <div className="absolute top-0 right-0 bg-primary text-white p-1 rounded-bl-lg z-10">
                                    <Check className="w-4 h-4" />
                                </div>
                            )}

                            <CardContent className="p-6 relative z-0">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-1">
                                        <div className="font-bold text-lg text-slate-800">{voice.name}</div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wide">{voice.gender === 'male' ? 'Male' : 'Female'} • {voice.style}</div>
                                    </div>
                                    <div
                                        className={cn(
                                            "rounded-full p-2 transition-colors",
                                            isPlaying ? "bg-primary text-white" : "bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary"
                                        )}
                                        onClick={(e) => togglePlay(voice.id, e)}
                                    >
                                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-4">
                                    {voice.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="bg-white border border-slate-100 text-slate-500 font-normal">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Audio Wave Animation Mock */}
                                {isPlaying && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/20 overflow-hidden">
                                        <div className="h-full bg-primary animate-progress-bar w-full origin-left" />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center text-slate-600 italic">
                "你有没有想过，当你在手机上发一条消息，背后到底发生了什么？"
            </div>
        </div>
    )
}
