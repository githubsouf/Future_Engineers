"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

interface Question {
  id: number
  text: string
}

interface QuestionnaireProps {
  questions?: Question[]
  onAnswer: (questionId: number, value: number) => void
  onComplete: () => void
}

const defaultQuestions: Question[] = [
  { id: 1, text: "You enjoy solving complex technical problems." },
  { id: 2, text: "You are interested in cybersecurity and protecting digital assets." },
  { id: 3, text: "You like working with cloud technologies and distributed systems." },
  { id: 4, text: "You are passionate about data analysis and statistical modeling." },
  { id: 5, text: "You are excited about artificial intelligence and machine learning." },
]

export default function Questionnaire({ questions = defaultQuestions, onAnswer, onComplete }: QuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})

  if (questions.length === 0) {
    return <div>No questions available.</div>
  }

  const handleSelect = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }))
    onAnswer(questions[currentQuestion].id, value)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1)
      }, 500)
    } else {
      onComplete()
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Card className="p-8 backdrop-blur-lg bg-white/90">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            {questions[currentQuestion].text}
          </h2>

          <div className="flex flex-col items-center space-y-6">
            <div className="flex justify-between w-full items-center text-sm font-medium">
              <span className="text-emerald-600">Agree</span>
              <span className="text-purple-600">Disagree</span>
            </div>

            <div className="flex justify-between w-full gap-2">
              {[3, 2, 1, 0, -1, -2, -3].map((value) => (
                <button
                  key={value}
                  onClick={() => handleSelect(value)}
                  className={`w-12 h-12 rounded-full border-2 transition-all duration-200
                    ${
                      answers[questions[currentQuestion].id] === value
                        ? value > 0
                          ? "border-emerald-500 bg-emerald-100"
                          : value < 0
                          ? "border-purple-500 bg-purple-100"
                          : "border-gray-400 bg-gray-100"
                        : value > 0
                        ? "border-emerald-200 hover:border-emerald-400"
                        : value < 0
                        ? "border-purple-200 hover:border-purple-400"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  aria-label={`${
                    value > 0
                      ? `Agree level ${value}`
                      : value < 0
                      ? `Disagree level ${Math.abs(value)}`
                      : "Neutral"
                  }`}
                />
              ))}
            </div>

            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-purple-500 h-full transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            <p className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
        </motion.div>
      </Card>
    </div>
  )
}