import { motion } from 'framer-motion'
import { 
  Cpu, Database, Globe, Code, Brain, Shield, 
  Rocket, Cog, Laptop, Radio, Microscope, Atom,
  Wifi, Server, Cable, Wrench, Gauge, Lightbulb
} from 'lucide-react'

const engineeringIcons = [
  { Icon: Cpu, label: "Processing" },
  { Icon: Database, label: "Data Storage" },
  { Icon: Globe, label: "Networking" },
  { Icon: Code, label: "Programming" },
  { Icon: Brain, label: "AI" },
  { Icon: Shield, label: "Security" },
  { Icon: Rocket, label: "Innovation" },
  { Icon: Cog, label: "Systems" },
  { Icon: Laptop, label: "Computing" }
]
 
export function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {engineeringIcons.map(({ Icon, label }, index) => (
        <motion.div
          key={label}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: index * 0.2,
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