import { useState } from "react";
import Questionnaire from "@/components/Questionnaire";
import Roadmap from "@/components/Roadmap";
import UploadSection from "@/components/UploadSection";
import { useModals } from "@/hooks/useModals";
import axios from "axios";
export default function QuizComp() {
  const [step, setStep] = useState<"upload" | "questionnaire" | "loading-roadmap" | "roadmap">("upload");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [recommendedField, setRecommendedField] = useState<string | null>(null);
  const { isOpen, openModal, closeModal } = useModals();

  const handleUploadComplete = () => {
    setStep("questionnaire");
    openModal("login");
  };

  const handleQuestionnaireComplete = async () => {
    setStep("loading-roadmap");
    openModal("satisfaction");
  
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      if (!token) {
        console.error("Token manquant !");
        setRecommendedField("Token manquant");
        return;
      }
  
      // Send request to the backend with the token
      const response = await axios.post(
        "http://localhost:8080/quiz/submit", 
        {
          responses: answers, // Send the correct request body
        }, 
        {
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` // Include the token in the request headers
          }
        }
      );
  
      // Check if the response contains the 'filiere' field
      if (response.data && response.data.filiere) {
        setRecommendedField(response.data.filiere);
      } else {
        setRecommendedField("Aucune filière trouvée");
      }
    } catch (error) {
      // Handle error (token might be invalid or expired)
      console.error("Erreur lors de l'envoi des réponses:", error);
      setRecommendedField("Erreur de connexion");
    }
  
    // After 4 seconds, move to the 'roadmap' step
    setTimeout(() => {
      setStep("roadmap");
    }, 4000);
  };
  
  
  
  

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  return (
    <div>
      {step === "upload" && <UploadSection onComplete={handleUploadComplete} />}
      {step === "questionnaire" && <Questionnaire onAnswer={handleAnswer} onComplete={handleQuestionnaireComplete} />}
      {step === "loading-roadmap" && (
        <div className="text-center">
          <button disabled type="button" className="mt-40 py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
            <svg aria-hidden="true" className="inline w-4 h-4 animate-spin text-gray-200" viewBox="0 0 100 101">
              <path d="M100 50.59C100 78.2 77.61 100.59 50 100.59S0 78.2 0 50.59C0 22.98 22.39 0.59 50 0.59S100 22.98 100 50.59Z" fill="currentColor"/>
              <path d="M93.97 39.04c2.42-.64 3.89-3.13 3.03-5.49C95.29 28.82 92.87 24.37 89.81 20.35 85.85 15.12 80.88 10.72 75.21 7.41c-5.67-3.31-11.94-5.47-18.44-6.36-5.01-.68-10.08-.61-15.04.17-2.48.41-3.93 2.92-3.29 5.35.67 2.46 3.14 3.88 5.6 3.29 3.8-.56 7.67-.56 11.49 0 5.32.77 10.44 2.55 15.06 5.26 4.62 2.71 8.68 6.3 11.92 10.58 2.33 3.07 4.21 6.46 5.59 10.03 1.03 2.38 3.49 3.83 5.91 3.19Z" fill="#1C64F2"/>
            </svg>
            Loading the best field for you...
          </button>
        </div>
      )}
      {step === "roadmap" && <Roadmap recommendedField={recommendedField} />}
    </div>
  );
}
