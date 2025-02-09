import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: "Home", href: "#" },
    { label: "Engineering Fields", href: "#fields" },
    { label: "Statistics", href: "#stats" },
    { label: "Partners", href: "#partners" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <motion.header 
      className="bg-white/90 backdrop-blur-sm shadow-sm fixed w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">FE</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-purple-600 text-transparent bg-clip-text">
              Future Engineers
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              className="px-4 py-2 text-purple-600 hover:text-purple-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
            <Link to="/auth">
              <motion.button
                className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-purple-600 text-white hover:from-emerald-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-4 pb-3 space-y-3">
            {menuItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                whileHover={{ x: 10 }}
              >
                {item.label}
              </motion.a>
            ))}
            <div className="pt-4 space-y-2">
              <motion.button
                className="w-full px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                whileHover={{ x: 10 }}
              >
                Login
              </motion.button>
              <motion.button
                className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-purple-600 text-white rounded-lg hover:from-emerald-600 hover:to-purple-700 transition-colors"
                whileHover={{ x: 10 }}
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}