import { motion } from 'framer-motion'
// import { useModals } from '@/hooks/useModals'
import { Link } from 'react-router-dom'

export default function Header() {
  // const { openModal } = useModals()


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
        <div className='flex items-stretch  hover:items-center space-x-8'>
            <div className="text-dark hover:items-center">Home</div>
            <div className="text-dark hover:items-center">Our partners </div>
            <div className="text-dark hover:items-center">Our fields </div>
            <div className="text-dark hover:items-center">Contact us</div>
            </div>
        <div className="flex items-center space-x-4">
            <Link to="/auth">
              <motion.button
                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Sign up
              </motion.button>
            </Link>
        </div>
      </nav>
    </motion.header>
  )
}
