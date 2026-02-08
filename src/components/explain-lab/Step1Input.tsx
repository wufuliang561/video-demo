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
        const example = `# OpenClaw 架构概览

本文档提供了对 OpenClaw 系统的全面分析，详细说明了它是如何处理消息和管理记忆的。

## 系统架构

OpenClaw 采用中心辐射型架构，**Gateway (网关)** 作为中央协调器，连接负责用户输入的外部 **Channels (渠道)** 和负责逻辑与记忆的内部 **Agents (智能体)**。

\`\`\`mermaid
graph TD
    User((用户)) <--> Channel[渠道插件\\n(WhatsApp/Slack/etc)]
    
    subgraph "OpenClaw 核心"
        Channel <--> Gateway[网关服务器]
        Gateway <--> SessionMgr[会话管理器]
        Gateway <--> AgentRuntime[智能体运行时]
    end
    
    subgraph "智能体大脑"
        AgentRuntime <--> LLM[LLM 推理]
        AgentRuntime <--> Tools[工具执行]
        Tools <--> MemoryIndex[记忆索引管理器]
    end
    
    subgraph "文件系统 / 记忆"
        MemoryIndex <--> MemoryFiles["MEMORY.md\\nmemory/*.md"]
        MemoryIndex <--> VectorDB[(SQLite 向量库)]
    end
\`\`\`

## 消息的生命周期

以下是从用户发送消息到收到回复的分步处理过程。

### 1. 消息接入 (Inbound: User -> System)
1.  **接收**: 用户发送消息（例如：“我们关于 API 的决定是什么？”）。**Channel Plugin**（如 WhatsApp）通过 Webhook 或 WebSocket 接收此消息。
2.  **标准化**: Channel 将特定平台的负载转换为标准的 OpenClaw 消息格式。
3.  **路由**: Channel 调用网关的 \`chat.send\` API。
4.  **策略检查**: 网关验证会话权限和频率限制。

### 2. 处理流程 (Processing: System -> Agent)
5.  **分发**: 网关识别该会话的活动 **Agent**。
6.  **上下文加载**: 网关加载该 Agent 对应的近期聊天记录。
7.  **调用**: Agent Runtime 接收消息和历史记录作为 Prompt。

### 3. 推理与记忆 (The "Brain")
8.  **思考**: Agent (LLM) 分析用户的意图。
9.  **记忆查找**: 识别到需要上下文，Agent 调用 \`memory_search\` 工具。
    *   **向量搜索**: \`MemoryIndexManager\` 在 SQLite 向量库中查询语义匹配项。
    *   **关键词搜索**: 同时运行全文搜索 (FTS)。
    *   **检索**: \`MEMORY.md\` 或 \`memory/*.md\` 中最相关的片段被返回给 Agent。
10. **合成**: Agent 结合用户的问题和检索到的记忆片段生成回复。

### 4. 消息触达 (Outbound: System -> User)
11. **流式传输**: Agent 将生成的回复以实时分块 (Deltas) 的形式流式传输回网关。
12. **广播**: 网关将这些事件广播给 Channel。
13. **投递**: Channel Plugin 将最终文本传输给外部平台 API。
14. **用户视图**: 用户看到回复，可能带有指向源记忆文件的引用。

## 关键组件

### 网关 (\`src/gateway\`)
系统的核心。负责：
- **协议**: 标准化节点间的通信。
- **安全**: 所有请求的身份验证和授权。
- **插件**: 加载和管理 Channel 及 Capability 插件。

### 智能体运行时 (\`src/agents\`)
智能的执行环境。它充当 LLM 的“操作系统”，为其提供：
- **工具**: 执行操作的接口（如 \`memory_search\`）。
- **身份**: 管理角色设定和系统提示词 (System Prompt)。

### 记忆系统 (\`src/memory\`)
以文件为核心的知识库。
- **存储**: 工作区中的纯 Markdown 文件。
- **索引**: 自动在后台将文件变更索引到向量库 (SQLite)。
- **检索**: 混合搜索 (向量 + 关键词)，确保高召回率和精确度。`
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
