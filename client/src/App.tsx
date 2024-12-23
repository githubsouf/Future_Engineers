import { useState } from "react"
import { motion } from "framer-motion"
import Header from "@/components/layout/Header"
import HeroBanner from "@/components/hero/HeroBanner"
import UploadSection from "@/components/UploadSection"
import Questionnaire from "@/components/Questionnaire"
import Partners from "@/components/sections/Partners"
import LoginModal from "@/components/modals/LoginModal"
import SatisfactionModal from "@/components/modals/SatisfactionModal"
import CareerRoadmap from "@/components/CareerRoadmap"
import { useModals } from "@/hooks/useModals"

export default function App() {
  const [step, setStep] = useState<"upload" | "questionnaire" | "roadmap">("upload")
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const { isOpen, openModal, closeModal } = useModals()

  const handleUploadComplete = () => {
    setStep("questionnaire")
    openModal("login")
  }

  const handleQuestionnaireComplete = () => {
    setStep("roadmap")
    openModal("satisfaction")
  }

  const handleSatisfactionComplete = () => {
    closeModal("satisfaction")
  }

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-purple-50">
      <Header />
      <HeroBanner />
      <main className="container mx-auto px-4 py-8">
        {step === "upload" && <UploadSection onComplete={handleUploadComplete} />}
        {step === "questionnaire" && (
          <Questionnaire
            onAnswer={handleAnswer}
            onComplete={handleQuestionnaireComplete}
          />
        )}
        {step === "roadmap" && <CareerRoadmap name="Future Engineer" answers={answers} />}

        <Partners />
      </main>

      <LoginModal isOpen={isOpen("login")} onClose={() => closeModal("login")} />
      <SatisfactionModal
        isOpen={isOpen("satisfaction")}
        onClose={() => closeModal("satisfaction")}
        onComplete={handleSatisfactionComplete}
      />
    </div>
  )
}