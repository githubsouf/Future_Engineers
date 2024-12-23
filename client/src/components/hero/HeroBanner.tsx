import { motion } from 'framer-motion'
import StarField from './StarField'
import { FloatingIcons } from './BackgroundElements'

export default function HeroBanner() {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section')
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative h-[80vh] min-h-[600px] bg-gradient-to-b from-gray-900 via-purple-900/50 to-emerald-900/30 overflow-hidden">
      <StarField />
      <FloatingIcons />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
      
      <div className="relative h-full flex items-center justify-center px-4">
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
            tailored to your skills and interests. 🚀 💡 ⚡️ 🔧 💻 🛠️ 🎯 🌟 🔬
          </p>
          <motion.button
            onClick={scrollToUpload}
            className="bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-transform shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}