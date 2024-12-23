"use client"

import { motion } from 'framer-motion'
import { 
  Cpu, Database, Globe, Code, Brain, Shield, 
  Rocket, Cog, Laptop, Radio, Microscope, Atom,
  Wifi, Server, Cable, Wrench, Gauge, Lightbulb
} from 'lucide-react'

const icons = [
  { Icon: Cpu, delay: 0 },
  { Icon: Database, delay: 0.1 },
  { Icon: Globe, delay: 0.2 },
  { Icon: Code, delay: 0.3 },
  { Icon: Brain, delay: 0.4 },
  { Icon: Shield, delay: 0.5 },
  { Icon: Rocket, delay: 0.6 },
  { Icon: Cog, delay: 0.7 },
  { Icon: Laptop, delay: 0.8 },
  { Icon: Radio, delay: 0.9 },
  { Icon: Microscope, delay: 1.0 },
  { Icon: Atom, delay: 1.1 },
  { Icon: Wifi, delay: 1.2 },
  { Icon: Server, delay: 1.3 },
  { Icon: Cable, delay: 1.4 },
  { Icon: Wrench, delay: 1.5 },
  { Icon: Gauge, delay: 1.6 },
  { Icon: Lightbulb, delay: 1.7 }
]

export default function EngineeringIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay }, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * (window.innerHeight / 2),
            opacity: 0,
            rotate: Math.random() * 360
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Icon className="w-8 h-8 text-purple-300/50" />
        </motion.div>
      ))}
    </div>
  )
}