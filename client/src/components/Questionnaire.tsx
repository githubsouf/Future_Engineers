import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

interface Question {
  id: number;
  label: string;
}

interface QuestionnaireProps {
  onAnswer: (questionId: number, value: number) => void;
  onComplete: () => void;
}

export default function Questionnaire({ onAnswer, onComplete }: QuestionnaireProps) {
  const QUESTIONS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://127.0.0.1:8080/questions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: currentPage,
            size: QUESTIONS_PER_PAGE,
          },
        });

        // Trier les questions pour s'assurer qu'elles respectent l'ordre souhaité
        const sortedQuestions = res.data.content.sort((a: Question, b: Question) => a.id - b.id);
        setQuestions(sortedQuestions);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Erreur lors de la récupération des questions:", error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handleSelect = (questionId: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    onAnswer(questionId, value);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Fonction pour trier les réponses et les envoyer au backend
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      // Trier les réponses pour respecter l'ordre exact attendu
      const orderedAnswers: Record<string, number> = {};
      const expectedOrder = [
        "extraversion", "ouverture", "conscienciosite",
        "stabilite_emotionnelle", "agreabilite",
        "motivation", "interest", "fam"
      ];

      expectedOrder.forEach((trait) => {
        for (let i = 1; i <= 12; i++) {
          const key = `${trait}_${i}`;
          if (answers[key] !== undefined) {
            orderedAnswers[key] = answers[key];
          }
        }
      });

      const response = await axios.post(
        "http://127.0.0.1:8080/quiz/submit",
        { data: orderedAnswers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Réponses envoyées avec succès:", response.data);
      onComplete();
    } catch (error) {
      console.error("Erreur lors de l'envoi des réponses:", error);
    }
  };

  return (
    <div className="w-full p-8 min-h-screen">
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="space-y-12"
      >
        {questions.map((question) => (
          <div key={question.id} className="mb-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              {question.label}
            </h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex justify-between w-full max-w-3xl text-sm font-medium">
                <span className="text-emerald-600">Disagree</span>
                <span className="text-purple-600">Agree</span>
              </div>
              <div className="flex justify-between w-full max-w-3xl gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleSelect(question.id, value)}
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-200
                      ${
                        answers[question.id] === value
                          ? "border-emerald-500 bg-emerald-100"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    aria-label={`Choice ${value}`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-12">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            {currentPage === totalPages - 1 ? "Complete" : "Next"}
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center mt-4">
          Page {currentPage + 1} of {totalPages}
        </p>
      </motion.div>
    </div>
  );
}
