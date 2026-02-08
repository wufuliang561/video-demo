import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Upload, Wand2 } from "lucide-react"

interface Step1InputProps {
    value: string
    onChange: (value: string) => void
    onNext: () => void
}

export function Step1Input({ value, onChange, onNext }: Step1InputProps) {
    const [isDragging, setIsDragging] = React.useState(false)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        // Mock file read
        const file = e.dataTransfer.files[0]
        if (file) {
            onChange("（已读取文件内容...）\n" + value)
        }
    }

    const fillExample = () => {
        const example = `# 什么是 React Server Components?

React Server Components (RSC) 是 React 团队推出的一项新特性，旨在解决现代 Web 应用开发中的一些核心挑战。

## 核心概念

传统的 React 组件是在客户端渲染的（CSR），或者通过服务端渲染（SSR）生成 HTML Hydrate。而 RSC 允许我们在服务端运行组件，直接生成 UI 结构，发送给客户端。

## 优势

1. **零 Bundle Size**: 服务端组件的代码不会打包到客户端 bundle 中。
2. **直接访问后端资源**: 可以直接查询数据库、读取文件系统。
3. **自动代码分割**: 根据路由自动加载需要的客户端组件。

## 总结

RSC 代表了 React 架构的一次重大转变，它模糊了客户端和服务端的界限，让开发者能更灵活地构建高性能应用。`
        onChange(example)
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-900 font-hand">输入你的技术文档</h2>
                <p className="text-gray-500">把枯燥的技术文档变成生动的解说视频，仅需几秒钟。</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <Card className={`border-2 border-dashed transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-slate-300'}`}>
                        <CardContent
                            className="flex flex-col items-center justify-center py-12 text-center cursor-pointer hover:bg-slate-50 transition-colors"
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => onChange(value + "\n[模拟读取了上传的文件 content...]")}
                        >
                            <div className="p-4 rounded-full bg-slate-100 mb-4">
                                <Upload className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="font-semibold text-lg">点击或拖拽上传文档</h3>
                            <p className="text-sm text-slate-500 mt-1">支持 .md, .txt, .pdf (Max 10MB)</p>
                        </CardContent>
                    </Card>

                    <div className="flex justify-center">
                        <Button variant="ghost" className="text-slate-500" onClick={fillExample}>
                            <Wand2 className="w-4 h-4 mr-2" />
                            试试示例文档
                        </Button>
                    </div>
                </div>

                <div className="relative">
                    <Textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="或者直接在这里粘贴文档内容..."
                        className="min-h-[400px] font-mono text-sm leading-relaxed resize-none p-4 shadow-inner"
                    />
                    <div className="absolute bottom-4 right-4 text-xs text-slate-400 bg-white/80 px-2 py-1 rounded">
                        {value.length} 字
                    </div>
                </div>
            </div>

            {value.length > 0 && (
                <div className="flex justify-center pt-4">
                    <Button size="lg" onClick={onNext} className="animate-in zoom-in duration-300">
                        生成剧本 →
                    </Button>
                </div>
            )}
        </div>
    )
}
