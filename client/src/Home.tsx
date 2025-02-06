import { useState } from "react"
import Header from "@/components/layout/Header"
import HeroBanner from "@/components/hero/HeroBanner"
import UploadSection from "@/components/UploadSection"
import Questionnaire from "@/components/Questionnaire"
import Partners from "@/components/sections/Partners"
import LoginModal from "@/components/modals/LoginModal"
import SatisfactionModal from "@/components/modals/SatisfactionModal"
import CareerRoadmap from "@/components/CareerRoadmap"
import { useModals } from "@/hooks/useModals"

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
      {/* <main className="container mx-auto px-4 py-8"> */}
        {step === "upload" && <UploadSection onComplete={handleUploadComplete} />}
        {step === "questionnaire" && (
          <Questionnaire
            onAnswer={handleAnswer}
            onComplete={handleQuestionnaireComplete}
          />
        )}
        {step === "roadmap" && <CareerRoadmap name="Future Engineer" answers={answers} />}

        <Partners />

        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
              <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
              <form action="#" className="space-y-8">
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                      <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                      <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required/>
                  </div>
                  <div className="sm:col-span-2">
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                      <textarea id="message"  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                  </div>
                  <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
              </form>
          </div>
        </section>
      

      <LoginModal isOpen={isOpen("login")} onClose={() => closeModal("login")} />
      <SatisfactionModal
        isOpen={isOpen("satisfaction")}
        onClose={() => closeModal("satisfaction")}
        onComplete={handleSatisfactionComplete}
      />
    </div>
  )
}