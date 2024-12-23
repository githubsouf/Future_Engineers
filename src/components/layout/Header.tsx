import { motion } from 'framer-motion'
import { useModals } from '@/hooks/useModals'

export default function Header() {
  const { openModal } = useModals()

  return (
    <motion.header 
      className="bg-white/90 backdrop-blur-sm shadow-sm fixed w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          className="text-2xl font-bold text-gray-800"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Future Engineers
        </motion.div>
        <motion.button
          onClick={() => openModal("login")}
          className="px-4 py-2 rounded-md border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 transition-colors"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Login
        </motion.button>
      </nav>
    </motion.header>
  )
}