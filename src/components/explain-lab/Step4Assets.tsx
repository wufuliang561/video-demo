import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, AlertTriangle, Wand2, Upload } from "lucide-react"

interface Step4AssetsProps {
    onNext: () => void
    onBack: () => void
}

const EXISTING_ASSETS = [
    { label: "Phone", icon: "📱" },
    { label: "Robot", icon: "🤖" },
    { label: "Question", icon: "❓" },
    { label: "Shield", icon: "🛡️" },
    { label: "Arrow", icon: "➡️" },
]

const MISSING_ASSETS = [
    { id: "gateway", label: "Gateway", location: "镜头 03" },
    { id: "sorting-center", label: "Sorting Center", location: "镜头 05" },
    { id: "conveyor", label: "Conveyor Belt", location: "镜头 07" },
]

export function Step4Assets({ onNext, onBack }: Step4AssetsProps) {
    const [missing, setMissing] = React.useState(MISSING_ASSETS)
    const [generating, setGenerating] = React.useState<string | null>(null)

    const handleGenerate = (id: string) => {
        setGenerating(id)
        setTimeout(() => {
            setMissing(prev => prev.filter(item => item.id !== id))
            setGenerating(null)
        }, 1500)
    }

    const handleGenerateAll = () => {
        setGenerating('all')
        setTimeout(() => {
            setMissing([])
            setGenerating(null)
        }, 3000)
    }

    return (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold font-hand">确认素材</h2>
                    <p className="text-slate-500">检查视频所需的 SVG 图标素材</p>
                </div>
                {missing.length === 0 ? (
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold flex items-center shadow-sm animate-in zoom-in">
                        <Check className="w-5 h-5 mr-2" />
                        所有素材已就绪
                    </div>
                ) : (
                    <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-bold flex items-center shadow-sm">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        需要处理 {missing.length} 个缺失素材
                    </div>
                )}
            </div>

            {/* Existing */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 flex items-center">
                    已有素材 ({EXISTING_ASSETS.length})
                    <span className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded ml-2">Checked</span>
                </h3>
                <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {EXISTING_ASSETS.map((asset, i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:translate-y-[-2px] transition-transform">
                            <div className="text-2xl mb-2">{asset.icon}</div>
                            <div className="text-xs text-slate-400 font-mono">{asset.label}</div>
                            <div className="absolute top-1 right-1 text-green-500">
                                <Check className="w-3 h-3" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Missing */}
            {missing.length > 0 && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-slate-700">缺失素材 ({missing.length})</h3>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleGenerateAll}
                            disabled={!!generating}
                            className="bg-primary/10 text-primary hover:bg-primary/20"
                        >
                            {generating === 'all' ? (
                                <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Wand2 className="w-4 h-4 mr-2" />
                            )}
                            全部 AI 生成
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {missing.map((item) => (
                            <Card key={item.id} className="border-2 border-dashed border-amber-200 bg-amber-50/30">
                                <CardContent className="p-4 space-y-4">
                                    <div className="flex justify-between">
                                        <div className="font-mono font-bold text-slate-700">{item.label}</div>
                                        <div className="text-xs bg-white px-2 py-0.5 rounded border text-slate-400">
                                            {item.location}
                                        </div>
                                    </div>

                                    <div className="aspect-square bg-slate-100/50 rounded flex items-center justify-center border border-slate-200/50">
                                        <div className="text-slate-300 text-sm">暂无预览</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full text-xs"
                                            disabled={!!generating}
                                            onClick={() => handleGenerate(item.id)}
                                        >
                                            {generating === item.id ? <Wand2 className="w-3 h-3 animate-spin mr-1" /> : <Wand2 className="w-3 h-3 mr-1" />}
                                            AI 生成
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full text-xs"
                                            disabled={!!generating}
                                        >
                                            <Upload className="w-3 h-3 mr-1" />
                                            上传
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
