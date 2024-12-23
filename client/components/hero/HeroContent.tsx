"use client"

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroContent() {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section')
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="inline-block relative">
          <motion.div
            className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-64 h-64 opacity-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1 }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                d="M 100 0 L 0 100 L 100 200 L 200 100 Z"
                className="fill-purple-500"
              />
            </svg>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Shape Your Future in
            <span className="bg-gradient-to-r from-emerald-400 to-purple-500 text-transparent bg-clip-text">
              {" "}Engineering
            </span>
          </h1>
        </div>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Discover your perfect engineering path with AI-powered career guidance
          tailored to your skills and interests. 🚀 💡 ⚡️ 🔧 💻 🛠️
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Button
            size="lg"
            onClick={scrollToUpload}
            className="bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white px-8 py-6 rounded-full text-lg transform hover:scale-105 transition-transform"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}