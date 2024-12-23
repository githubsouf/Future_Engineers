import { useState } from "react"
import Modal from "./Modal"
import { Star } from 'lucide-react'
import { motion } from "framer-motion"

interface SatisfactionModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (rating: number) => void
}

export default function SatisfactionModal({ isOpen, onClose, onComplete }: SatisfactionModalProps) {
  const [rating, setRating] = useState(0)

  const handleSubmit = () => {
    if (rating > 0) {
      onComplete(rating)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          How satisfied are you with the questionnaire?
        </h2>
        <div className="flex justify-center space-x-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={32}
              onClick={() => setRating(star)}
              className={`cursor-pointer transition-colors ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className={`w-full py-2 rounded-md transition-colors ${
            rating > 0
              ? "bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </motion.div>
    </Modal>
  )
}