"use client"

import { motion } from 'framer-motion'
import { Circuit } from 'lucide-react'

export default function EngineeringBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
        className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2"
      >
        <Circuit className="w-full h-full text-purple-500" />
      </motion.div>
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
        {Array.from({ length: 64 }).map((_, i) => (
          <motion.div
            key={i}
            className="border-[0.5px] border-purple-500/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.01 }}
          />
        ))}
      </div>
    </div>
  )
}