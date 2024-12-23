"use client"

import StarField from './StarField'
import FloatingIcons from './FloatingIcons'
import EngineeringBackground from './EngineeringBackground'
import HeroContent from './HeroContent'

export default function HeroBanner() {
  return (
    <div className="relative h-[80vh] min-h-[600px] bg-gradient-to-b from-gray-900 via-purple-900/50 to-emerald-900/30 overflow-hidden">
      <StarField />
      <EngineeringBackground />
      <FloatingIcons />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
      <div className="relative h-full flex items-center justify-center px-4">
        <HeroContent />
      </div>
    </div>
  )
}