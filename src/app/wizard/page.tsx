"use client"

import * as React from "react"
import { ExplainLabLayout } from "@/components/explain-lab/Layout"
import { Step1Input } from "@/components/explain-lab/Step1Input"
import { Step2Script } from "@/components/explain-lab/Step2Script"
import { Step3Voice } from "@/components/explain-lab/Step3Voice"
import { Step4Assets } from "@/components/explain-lab/Step4Assets"
import { Step5Generate } from "@/components/explain-lab/Step5Generate"
import { useRouter } from "next/navigation"

const STEPS = [
    "输入文档",
    "确认剧本",
    "选择音色",
    "确认素材",
    "生成视频"
]

export default function WizardPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = React.useState(1)
    const [documentContent, setDocumentContent] = React.useState("")

    // Handlers
    const nextStep = () => {
        if (currentStep < 5) {
            setCurrentStep(prev => prev + 1)
            window.scrollTo(0, 0)
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1)
            window.scrollTo(0, 0)
        }
    }

    // Render step content
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1Input
                        value={documentContent}
                        onChange={setDocumentContent}
                        onNext={nextStep}
                    />
                )
            case 2:
                return <Step2Script onNext={nextStep} onBack={prevStep} />
            case 3:
                return <Step3Voice onNext={nextStep} onBack={prevStep} />
            case 4:
                return <Step4Assets onNext={nextStep} onBack={prevStep} />
            case 5:
                return <Step5Generate onBack={prevStep} />
            default:
                return null
        }
    }

    // Navigation Logic
    const isNextDisabled = currentStep === 1 && documentContent.trim().length === 0

    // Custom labels
    let nextLabel = "下一步"
    if (currentStep === 1) nextLabel = "生成剧本 →"
    if (currentStep === 2) nextLabel = "确认剧本 →"
    if (currentStep === 3) nextLabel = "确认音色 →"
    if (currentStep === 4) nextLabel = "开始生成 →"

    // Hide default navigation for specific steps if they handle it internally
    // Step 5 handles it internally (it's the progress page)
    const hideNavigation = currentStep === 5

    return (
        <ExplainLabLayout
            currentStep={currentStep}
            totalSteps={5}
            steps={STEPS}
            onBack={prevStep}
            onNext={nextStep}
            isNextDisabled={isNextDisabled}
            nextLabel={nextLabel}
            hideNavigation={hideNavigation}
        >
            {renderStep()}
        </ExplainLabLayout>
    )
}
