import React from 'react';

import { useState } from "react"
import { motion } from "framer-motion"
import { Card} from "../components/ui/card";

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
  // Agreeableness
  { id: 1, text: "I find it easy to empathize with other people's feelings." },
  { id: 2, text: "I often go out of my way to help someone in need." },
  { id: 3, text: "I am considerate of others' opinions, even if I disagree." },
  { id: 4, text: "I enjoy collaborating with others to achieve a common goal." },
  { id: 5, text: "I avoid unnecessary conflicts in social situations." },
  { id: 6, text: "I value harmony and try to mediate disagreements." },
  { id: 7, text: "I enjoy making people feel included in group activities." },
  { id: 8, text: "I believe it's important to support my friends and family emotionally." },
  { id: 9, text: "I tend to trust others unless they give me a reason not to." },
  { id: 10, text: "I feel satisfaction when I make others happy." },

  // Conscientiousness
  { id: 11, text: "I make detailed plans and stick to them." },
  { id: 12, text: "I usually complete tasks before deadlines." },
  { id: 13, text: "I pay close attention to details when working on a project." },
  { id: 14, text: "I prefer organizing my schedule rather than being spontaneous." },
  { id: 15, text: "I am persistent when working toward my goals." },
  { id: 16, text: "I often double-check my work for mistakes." },
  { id: 17, text: "I believe in setting high standards for myself." },
  { id: 18, text: "I dislike leaving tasks unfinished." },
  { id: 19, text: "I find it rewarding to follow rules and guidelines." },
  { id: 20, text: "I can be relied upon to keep my promises." },

  // Extroversion
  { id: 21, text: "I enjoy meeting new people and making new friends." },
  { id: 22, text: "I feel energized when spending time with others." },
  { id: 23, text: "I prefer working in a group rather than alone." },
  { id: 24, text: "I find it easy to start conversations with strangers." },
  { id: 25, text: "I enjoy being the center of attention in social situations." },
  { id: 26, text: "I feel comfortable expressing my thoughts and opinions openly." },
  { id: 27, text: "I enjoy attending events or gatherings with large groups of people." },
  { id: 28, text: "I often take the lead when working on group projects." },
  { id: 29, text: "I feel motivated in lively and dynamic environments." },
  { id: 30, text: "I look forward to participating in group activities or discussions." },

  // Openness
  { id: 31, text: "I enjoy trying out new hobbies or activities." },
  { id: 32, text: "I am drawn to creative and artistic pursuits." },
  { id: 33, text: "I like exploring new ideas and concepts, even if they challenge my beliefs." },
  { id: 34, text: "I often imagine different possibilities or alternative solutions." },
  { id: 35, text: "I am curious about how things work in the world around me." },
  { id: 36, text: "I enjoy reading or learning about abstract topics like philosophy or science." },
  { id: 37, text: "I am comfortable adapting to new or unfamiliar situations." },
  { id: 38, text: "I appreciate unique and unconventional perspectives." },
  { id: 39, text: "I value innovation and think outside the box." },
  { id: 40, text: "I like taking risks to explore uncharted territory." },

  // Stress Tolerance
  { id: 41, text: "I stay calm and composed in stressful situations." },
  { id: 42, text: "I can handle criticism without taking it personally." },
  { id: 43, text: "I am able to focus on tasks even under pressure." },
  { id: 44, text: "I don’t let small setbacks ruin my entire day." },
  { id: 45, text: "I find it easy to adapt when unexpected challenges arise." },
  { id: 46, text: "I avoid overreacting when things don’t go as planned." },
  { id: 47, text: "I tend to look for solutions rather than dwelling on problems." },
  { id: 48, text: "I can keep my emotions in check during disagreements." },
  { id: 49, text: "I don’t let frustration affect my performance or behavior." },
  { id: 50, text: "I believe I can overcome any difficulties with persistence." },
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
