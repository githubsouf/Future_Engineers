import { motion } from 'framer-motion'
import { Users, GraduationCap, Building2, TrendingUp } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: "120K+",
    label: "Engineering Students",
    description: "Currently enrolled in Moroccan universities"
  },
  {
    icon: GraduationCap,
    value: "25K+",
    label: "Annual Graduates",
    description: "New engineers entering the workforce yearly"
  },
  {
    icon: Building2,
    value: "1,500+",
    label: "Companies",
    description: "Actively hiring engineering talent"
  },
  {
    icon: TrendingUp,
    value: "92%",
    label: "Employment Rate",
    description: "Within 6 months of graduation"
  }
]

export default function EngineeringStats() {
  return (
    <section id="stats" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-purple-600 text-transparent bg-clip-text">
            Engineering in Morocco
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the growing impact of engineering in Morocco's development and future prospects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gradient-to-r from-emerald-500 to-purple-600">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="font-semibold text-gray-700 mb-2">{stat.label}</p>
              <p className="text-gray-500 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}