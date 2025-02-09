import { motion, useAnimationFrame } from 'framer-motion'
import { ArrowRight, Brain, Code, Cpu, Shield, Cog } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

const floatingIcons = [
  { Icon: Code, color: "text-blue-400" },
  { Icon: Shield, color: "text-red-400" },
  { Icon: Cpu, color: "text-purple-400" },
  { Icon: Brain, color: "text-emerald-400" },
  { Icon: Cog, color: "text-orange-400" }
]

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  angle: number
}

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Create new stars
      const newStars: Star[] = []
      const numStars = Math.floor((window.innerWidth * window.innerHeight) / 3000)
      
      for (let i = 0; i < numStars; i++) {
        newStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          opacity: Math.random(),
          speed: (Math.random() * 0.5 + 0.1) * (canvas.width / 1000),
          angle: (Math.random() * 60 - 30) * (Math.PI / 180) // -30 to 30 degrees in radians
        })
      }
      
      setStars(newStars)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useAnimationFrame((time) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    setStars(prevStars => 
      prevStars.map(star => {
        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

        // Update position
        const dx = Math.cos(star.angle) * star.speed
        const dy = Math.sin(star.angle) * star.speed
        let x = star.x - dx
        let y = star.y + dy

        // Wrap around screen
        if (x < 0) x = canvas.width
        if (x > canvas.width) x = 0
        if (y < 0) y = canvas.height
        if (y > canvas.height) y = 0

        // Pulse opacity based on time
        const opacity = 0.3 + (Math.sin(time / 1000 + star.x / 100) * 0.3)

        return { ...star, x, y, opacity }
      })
    )
  })

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ background: 'transparent' }}
    />
  )
}

export default function HeroBanner() {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section')
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/50 to-emerald-900/30 overflow-hidden">
      {/* Star Field Layer */}
      <StarField />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoMnYyaC0ydi0yem0wLTEyaDJ2MmgtMnYtMnptMCA2aDJ2MmgtMnYtMnptMCA2aDJ2MmgtMnYtMnptMCA2aDJ2MmgtMnYtMnptLTYtMjRoMnYyaC0ydi0yem0wIDEyaDJ2MmgtMnYtMnptMC02aDJ2MmgtMnYtMnptMCA2aDJ2MmgtMnYtMnptMCA2aDJ2MmgtMnYtMnptLTYtMjRoMnYyaC0ydi0yem0wIDEyaDJ2MmgtMnYtMnptMC02aDJ2MmgtMnYtMnptMCA2aDJ2MmgtMnYtMnptMCA2aDJ2MmgtMnYtMnptLTYtMjRoMnYyaC0ydi0yem0wIDEyaDJ2MmgtMnYtMnptMC02aDJ2MmgtMnYtMnptMCA2aDJ2MmgtMnYtMnptMCA2aDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5" />
        
        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.color}`}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
              scale: 0
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
              y: ["0%", "-50%", "0%"]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: index * 0.5
            }}
          >
            <item.Icon size={24 + Math.random() * 24} />
          </motion.div>
        ))}

        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-emerald-900/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Decorative Elements */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-purple-500/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.1, 0.8],
              opacity: [0.1, 0.3, 0.1],
              rotate: 360
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-emerald-500/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1.1, 0.8, 1.1],
              opacity: [0.1, 0.3, 0.1],
              rotate: -360
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 space-y-8"
          >
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Discover Your
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-purple-500 to-emerald-400 text-transparent bg-clip-text bg-300% animate-gradient">
                Engineering Path
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Join thousands of Moroccan students who found their perfect engineering specialization through our AI-powered career guidance platform.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                onClick={scrollToUpload}
                className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-purple-600 rounded-full text-white text-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </motion.button>

              <motion.a
                href="#fields"
                className="px-8 py-4 border border-white/20 rounded-full text-white text-lg font-semibold hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Fields
              </motion.a>
            </motion.div>

            {/* Stats Preview */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {[
                { value: "6+", label: "Engineering Fields" },
                { value: "92%", label: "Employment Rate" },
                { value: "25K+", label: "Annual Graduates" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ y: -5 }}
                >
                  <motion.p
                    className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 text-transparent bg-clip-text"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-gray-400 mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
    </div>
  )
}