"use client"

import { useState } from "react"
import Modal from "./Modal"
import { Star } from 'lucide-react'
import { Button } from "@/components/ui/button"

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
      <Button onClick={handleSubmit} className="w-full" disabled={rating === 0}>
        Submit
      </Button>
    </Modal>
  )
}