import { useState } from "react"
import Header from "@/components/layout/Header"
import HeroBanner from "@/components/hero/HeroBanner"
import UploadSection from "@/components/UploadSection"
import Questionnaire from "@/components/Questionnaire"
import LoginModal from "@/components/modals/LoginModal"
import SatisfactionModal from "@/components/modals/SatisfactionModal"
import CareerRoadmap from "@/components/CareerRoadmap"
import { useModals } from "@/hooks/useModals"
import EngineeringStats from "@/components/sections/EngineeringStats"
import FieldsOverview from "@/components/sections/FieldsOverview"
import TestimonialSection from "@/components/sections/TestimonialSection"
import ContactSection from "@/components/sections/ContactSection"
import JobDiscovery from "@/components/sections/JobDiscovery"

export default function Home() {
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
      <main className="relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        
        <EngineeringStats />
        <FieldsOverview />
        
        {step === "upload" && <UploadSection onComplete={handleUploadComplete} />}
        {step === "questionnaire" && (
          <Questionnaire
            onAnswer={handleAnswer}
            onComplete={handleQuestionnaireComplete}
          />
        )}
        {step === "roadmap" && <CareerRoadmap name="Future Engineer" answers={answers} />}
        <JobDiscovery />
        <TestimonialSection />
        <ContactSection />
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