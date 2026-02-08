import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Pencil, Clock, GripVertical } from "lucide-react"

interface Step2ScriptProps {
    onNext: () => void
    onBack: () => void
}

interface ScriptItem {
    id: string
    title: string
    duration: string
    voiceover: string
    visuals: { type: string; label: string }[]
}

const MOCK_SCRIPT: ScriptItem[] = [
    {
        id: "01",
        title: "开场 hook",
        duration: "10s",
        voiceover: "你有没有想过，当你在手机上发一条消息，背后到底发生了什么？这个过程比你想象的要复杂得多。",
        visuals: [
            { type: "text", label: "消息是怎么传递的？" },
            { type: "icon", label: "手机图标" },
            { type: "icon", label: "问号" },
        ]
    },
    {
        id: "02",
        title: "核心概念引入",
        duration: "15s",
        voiceover: "这就涉及到了网络通信的核心——TCP/IP 协议族。它就像是一个巨大的物流系统，确保你的包裹（数据）能准确送达。",
        visuals: [
            { type: "card", label: "TCP/IP 协议图解" },
            { type: "icon", label: "卡车/物流" },
        ]
    },
    {
        id: "03",
        title: "数据封包",
        duration: "12s",
        voiceover: "当你按下发送键，你的文字首先被‘打包’。就像把信装进信封，写上地址。在计算机里，这叫封装。",
        visuals: [
            { type: "anim", label: "信封动画" },
            { type: "text", label: "封装 Encapsulation" }
        ]
    }
]

export function Step2Script({ onNext, onBack }: Step2ScriptProps) {
    const [script, setScript] = React.useState(MOCK_SCRIPT)
    const [editingId, setEditingId] = React.useState<string | null>(null)

    const handleEdit = (id: string, newText: string) => {
        setScript(script.map(item => item.id === id ? { ...item, voiceover: newText } : item))
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold font-hand">视频剧本</h2>
                    <p className="text-slate-500 text-sm">AI 已根据文档生成分镜脚本，共 {script.length} 个镜头，预计时长 37s</p>
                </div>
            </div>

            <div className="space-y-4">
                {script.map((item, index) => (
                    <div key={item.id} className="relative group">
                        <div className="absolute -left-10 top-6 text-slate-300 font-bold text-xl font-hand hidden md:block">
                            {item.id}
                        </div>
                        <Card className="border-2 border-slate-100 shadow-sm hover:border-slate-300 hover:shadow-md transition-all group-hover:translate-x-1">
                            <CardContent className="p-4 flex gap-4">
                                {/* Drag Handle */}
                                <div className="cursor-grab text-slate-300 hover:text-slate-500 flex flex-col justify-center">
                                    <GripVertical className="h-5 w-5" />
                                </div>

                                <div className="flex-1 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-slate-700">{item.title}</span>
                                            <Badge variant="secondary" className="text-xs bg-cyan-100 text-cyan-800 hover:bg-cyan-200">
                                                <Clock className="w-3 h-3 mr-1 inline" />
                                                {item.duration}
                                            </Badge>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-slate-400 hover:text-primary"
                                            onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        {editingId === item.id ? (
                                            <Textarea
                                                value={item.voiceover}
                                                onChange={(e) => handleEdit(item.id, e.target.value)}
                                                className="bg-white"
                                                autoFocus
                                            />
                                        ) : (
                                            <p className="text-slate-700 leading-relaxed font-medium">
                                                {item.voiceover}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex gap-2 flex-wrap">
                                        {item.visuals.map((vis, i) => (
                                            <Badge key={i} variant="outline" className="border-slate-200 text-slate-500 hover:border-primary hover:text-primary transition-colors bg-white">
                                                {vis.type === 'text' && '📝 '}
                                                {vis.type === 'icon' && '🖼️ '}
                                                {vis.type === 'card' && '🃏 '}
                                                {vis.type === 'anim' && '🎬 '}
                                                {vis.label}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        {index < script.length - 1 && (
                            <div className="h-6 w-0.5 bg-slate-200 mx-auto my-[-4px] relative z-0 left-[-20px] hidden md:block" />
                        )}
                    </div>
                ))}
            </div>

            {/* Footer is handled by Layout, but passing onNext will trigger it */}
        </div>
    )
}
